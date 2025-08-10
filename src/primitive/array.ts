import {
    BaseOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface ArrayOptions extends BaseOptions {
    maxLength?: number;
    minLength?: number;
}

export function array<Options extends ArrayOptions>(options?: Options): ValidatorFunction<Options, unknown[]> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, unknown[]> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, unknown[]>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, unknown[]>;
            }

            throw new SchemaError("Value is undefined", context);
        }

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
    });
}

array[isValidatorSymbol] = true;