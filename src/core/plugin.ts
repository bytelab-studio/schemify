import {RawOptions} from "./raw";
import {ValidatorDefinition, ValidatorFunction} from "./types";

type DataKey = string | number | symbol;

interface ValidatorPluginDefiniton<Options extends RawOptions, TypeBase> extends ValidatorDefinition<Options, TypeBase> {
    metadata?: Record<symbol, Record<DataKey, unknown>>;
}

export interface SchemifyPlugin {
    name: string;
    usePlugin?: (this: SchemifyPluginContext, root: ValidatorFunction<RawOptions, unknown>) => void;
    onValidation?: (this: SchemifyPluginContext, validator: ValidatorFunction<RawOptions, unknown>) => void;
}

export interface SchemifyPluginContext {
    setData<T>(pluginSymbol: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: DataKey, data: T): void;
    getData<T>(pluginSymbol: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: DataKey): T | null;
    hasData(pluginSymbol: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: DataKey): boolean;
}

const usedPluginNames: Set<string> = new Set<string>();
const pluginRegistry: Record<symbol, SchemifyPlugin> = {};

export function registerPlugin(definition: SchemifyPlugin): symbol {
    if (usedPluginNames.has(definition.name)) {
        throw `Plugin with the name '${definition.name}' is already registered`;
    }

    usedPluginNames.add(definition.name);
    const dataSymbol: symbol = Symbol(definition.name);
    pluginRegistry[dataSymbol] = definition;
    return dataSymbol;
}

export function* getASTPlugins(names: string[] = []): Generator<SchemifyPlugin> {
    const plugins: SchemifyPlugin[] = Object.values(pluginRegistry);
    for (const plugin of plugins) {
        if (plugin.usePlugin && (names.length == 0 || names.includes(plugin.name))) {
            yield plugin;
        }
    }
}

export function* getRuntimePlugins(names: string[] = []): Generator<SchemifyPlugin> {
    const plugins: SchemifyPlugin[] = Object.values(pluginRegistry);
    for (const plugin of plugins) {
        if (plugin.onValidation && (names.length == 0 || names.includes(plugin.name))) {
            yield plugin;
        }
    }
}

export function executePlugin(type: "runtime" | "ast", plugin: SchemifyPlugin, validator: ValidatorFunction<RawOptions, unknown>): void {
    const func = type == "ast"
        ? plugin.usePlugin!
        : plugin.onValidation!;
    
    func.call({
        hasData,
        setData,
        getData
    }, validator);
}

export function plugin<T extends ValidatorFunction<RawOptions, unknown>>(validator: T, ...plugins: string[]): T {
    for (const plugin of getASTPlugins(plugins)) {
        executePlugin("ast", plugin, validator);
    }

    return validator;
}

function setData<T>(pluginSymbol: symbol, validator: ValidatorPluginDefiniton<RawOptions, unknown>, key: DataKey, data: T): void {
    if (!validator.metadata) {
        validator.metadata = {};
    }

    validator.metadata[pluginSymbol][key] = data;
}

function getData<T>(pluginSymbol: symbol, validator: ValidatorPluginDefiniton<RawOptions, unknown>, key: DataKey): T | null {
    if (!validator.metadata) {
        validator.metadata = {};
    }

    if (key in validator.metadata[pluginSymbol]) {
        return null;
    }

    return validator.metadata[pluginSymbol][key] as T;
}

function hasData(pluginSymbol: symbol, validator: ValidatorPluginDefiniton<RawOptions, unknown>, key: DataKey): boolean {
    if (!validator.metadata) {
        validator.metadata = {};
        return false;
    }

    return key in validator.metadata[pluginSymbol];
}
