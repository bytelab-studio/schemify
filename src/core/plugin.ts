import {RawOptions} from "./raw";
import {ValidatorDefinition, ValidatorFunction} from "./types";

type DataKey = string | number | symbol;

interface ValidatorPluginDefinition<Options extends RawOptions, TypeBase> extends ValidatorDefinition<Options, TypeBase> {
    metadata?: Record<symbol, Record<DataKey, unknown>>;
}

export interface SchemifyPlugin<Arguments extends any[]> {
    name: string;
    usePlugin?: (this: SchemifyPluginContext, root: ValidatorFunction<RawOptions, unknown>, ...args: Arguments) => void;
    onValidation?: (this: SchemifyPluginContext, validator: ValidatorFunction<RawOptions, unknown>) => void;
}

interface PluginOptions {
    name: string;
    arguments: any[];
}

export type PluginActivationFunction<Arguments extends any[]> = (...args: Arguments) => PluginOptions;

export interface SchemifyPluginContext {
    setData<T>(pluginSymbol: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: DataKey, data: T): void;

    getData<T>(pluginSymbol: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: DataKey): T | null;

    hasData(pluginSymbol: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: DataKey): boolean;
}

const usedPluginNames: Set<string> = new Set<string>();
const pluginRegistry: Record<string, SchemifyPlugin<any[]>> = {};

export function registerPlugin<const Arguments extends any[]>(definition: SchemifyPlugin<Arguments>): [symbol, PluginActivationFunction<Arguments>] {
    if (usedPluginNames.has(definition.name)) {
        throw `Plugin with the name '${definition.name}' is already registered`;
    }

    usedPluginNames.add(definition.name);
    const dataSymbol: symbol = Symbol(definition.name);
    pluginRegistry[definition.name] = definition;
    return [
        dataSymbol,
        (...args: Arguments): PluginOptions => ({
            name: definition.name,
            arguments: args
        })
    ];
}

export function getASTPlugin(name: string): SchemifyPlugin<any[]> | null {
    if (!(name in pluginRegistry) || !pluginRegistry[name].usePlugin) {
        return null;
    }

    return pluginRegistry[name];
}

export function* getRuntimePlugins(names: string[] = []): Generator<SchemifyPlugin<any[]>> {
    const plugins: [string, SchemifyPlugin<any[]>][] = Object.entries(pluginRegistry);
    for (const [name, plugin] of plugins) {
        if (plugin.onValidation && (names.length == 0 || names.includes(name))) {
            yield plugin;
        }
    }
}

export function executeRuntimePlugin(plugin: SchemifyPlugin<any[]>, validator: ValidatorFunction<RawOptions, unknown>): void {
    if (!plugin.onValidation) {
        return;
    }

    plugin.onValidation.call({
        hasData,
        setData,
        getData
    }, validator);
}

export function plugin<T extends ValidatorFunction<RawOptions, unknown>>(validator: T, ...plugins: PluginOptions[]): T {
    if (plugins.length == 0) {
        return validator;
    }

    for (const option of plugins) {
        const plugin: SchemifyPlugin<any[]> | null = getASTPlugin(option.name);
        if (!plugin) {
            continue;
        }

        plugin.usePlugin!.call({
            hasData,
            setData,
            getData
        }, validator, ...option.arguments);
    }

    return validator;
}

function setData<T>(pluginSymbol: symbol, validator: ValidatorPluginDefinition<RawOptions, unknown>, key: DataKey, data: T): void {
    if (!validator.metadata) {
        validator.metadata = {};
    }
    if (!validator.metadata[pluginSymbol]) {
        validator.metadata[pluginSymbol] = {};
    }

    validator.metadata[pluginSymbol][key] = data;
}

function getData<T>(pluginSymbol: symbol, validator: ValidatorPluginDefinition<RawOptions, unknown>, key: DataKey): T | null {
    if (!hasData(pluginSymbol, validator, key)) {
        return null;
    }

    return validator.metadata![pluginSymbol][key] as T;
}

function hasData(pluginSymbol: symbol, validator: ValidatorPluginDefinition<RawOptions, unknown>, key: DataKey): boolean {
    if (!validator.metadata) {
        validator.metadata = {};
        return false;
    }
    if (!validator.metadata[pluginSymbol]) {
        validator.metadata[pluginSymbol] = {};
        return false;
    }

    return key in validator.metadata[pluginSymbol];
}
