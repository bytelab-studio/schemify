import type {RawOptions} from "./raw";
import type {UnknownValidatorFunction, ValidatorConstructor, ValidatorFunction} from "./types";

export const enum Modules {
    Core = "core",
    Primitive = "primitive",
    Complex = "complex",
    Datetime = "datetime",
    Numeric = "numeric"
}

export function isValidator(validator: UnknownValidatorFunction, module: string | Modules, name: string): boolean;
export function isValidator(validator: UnknownValidatorFunction, validatorID: string): boolean;
export function isValidator(validator: UnknownValidatorFunction, ...args: string[]): boolean {
    if (args.length == 1) {
        const parts: string[] = args[0].split(".");
        if (parts.length != 2) {
            throw `'${args[0]}' is not a valid validator identification`;
        }

        const [module, name] = parts;
        return isValidator(validator, module, name);
    }

    const [module, name] = args;
    const constructor: ValidatorConstructor = validator.constructor;

    return constructor.module == module && constructor.name == name; 
}

export function getValidatorModule(validator: UnknownValidatorFunction): string | Modules {
    return validator.constructor.module;
}

export function getValidatorName(validator: UnknownValidatorFunction): string {
    return validator.constructor.name;
}

export function getValidatorId(validator: UnknownValidatorFunction): string {
    return `${validator.constructor.module}.${validator.constructor.name}`
}

export const enum ASTChildKind {
    PROPERTY,
    POSITIONAL,
    INFINITY
}

export const enum ASTChildType {
    VALIDATOR,
    PRIMITIVE
}

export interface ASTValidatorChild {
    type: ASTChildType.VALIDATOR;
    key: string | number;
    value: UnknownValidatorFunction;
    kind: ASTChildKind;
}

export interface ASTPrimitiveChild {
    type: ASTChildType.PRIMITIVE;
    key: string | number;
    value: unknown;
    kind: ASTChildKind;
}

export type ASTChild = ASTValidatorChild | ASTPrimitiveChild;

export function* getChildren(validator: UnknownValidatorFunction): Generator<ASTChild> {
    if (!validator.getChildren) {
        return;
    }

    yield* validator.getChildren();
}

export function getOptions<Options extends RawOptions>(validator: ValidatorFunction<Options, unknown>): Options {
    return validator.options as Options;
}