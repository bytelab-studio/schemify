import type {UnknownValidatorFunction, ValidatorConstructor} from "./types";

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