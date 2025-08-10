import {
    BaseOptions, isValidatorSymbol, ValidatorFunction, ValidatorReturn, SchemaError, ValidatorContext, raw,
} from "../core";

interface StringOptions extends BaseOptions {
    maxLength?: number;
    minLength?: number;
}

export function string<Options extends StringOptions>(options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, string> => {
        if (value === null) {
            if (options.nullable) {
                return null as ValidatorReturn<Options, string>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options.optional) {
                return undefined as ValidatorReturn<Options, string>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "string") {
            throw new SchemaError("Value is not a string", context);
        }

        if (options.minLength !== undefined) {
            if (value.length < options.minLength) {
                throw new SchemaError(`Value length is less than ${options.minLength}`, context);
            }
        }

        if (options.maxLength !== undefined) {
            if (value.length > options.maxLength) {
                throw new SchemaError(`Value length is greater than ${options.maxLength}`, context);
            }
        }

        return value;
    });
}

string[isValidatorSymbol] = true;