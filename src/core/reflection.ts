import type {UnknownValidatorFunction, ValidatorConstructor} from "./types";

export const enum Modules {
    Core = "core",
    Primitive = "primitive",
    Complex = "complex",
    Datetime = "datetime"
}

export function isValidator(validator: UnknownValidatorFunction, module: string, name: string): boolean;
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

export function getValidatorModule(validator: UnknownValidatorFunction): string {
    return validator.constructor.module;
}

export function getValidatorName(validator: UnknownValidatorFunction): string {
    return validator.constructor.name;
}

export function getValidatorId(validator: UnknownValidatorFunction): string {
    return `${validator.constructor.module}.${validator.constructor.name}`
}