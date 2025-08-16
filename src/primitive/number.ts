import {
    isValidatorSymbol,
    raw,
    RawOptions,
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

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, number> => {
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
    }, options);
}

number[isValidatorSymbol] = true;