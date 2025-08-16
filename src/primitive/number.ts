import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface NumberOptions extends RawOptions {
    min?: number;
    max?: number;
}

export function number<Options extends NumberOptions>(options?: Options): ValidatorFunction<Options, number> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, number> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, number>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, number>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "number") {
            throw new SchemaError("Value is not a number", context);
        }

        if (options.min !== undefined) {
            if (value < options.min) {
                throw new SchemaError(`Value is less than ${options.min}`, context);
            }
        }

        if (options.max !== undefined) {
            if (value > options.max) {
                throw new SchemaError(`Value is greater than ${options.max}`, context);
            }
        }

        return value;
    });
}

number[isValidatorSymbol] = true;