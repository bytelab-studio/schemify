import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface ArrayOptions extends RawOptions {
    maxLength?: number;
    minLength?: number;
}

export function array<Options extends ArrayOptions>(options?: Options): ValidatorFunction<Options, unknown[]> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, unknown[]> => {
        if (typeof value != "object" || !Array.isArray(value)) {
            throw new SchemaError("Value is not an array", context);
        }

        if (options.minLength !== undefined) {
            if (value.length < options.minLength) {
                throw new SchemaError(`Length of Array is less than ${options.minLength}`, context);
            }
        }

        if (options.maxLength !== undefined) {
            if (value.length > options.maxLength) {
                throw new SchemaError(`Length of Array is greater than ${options.maxLength}`, context);
            }
        }

        return value;
    }, array, options);
}

array.module = "primitive";
array[isValidatorSymbol] = true;