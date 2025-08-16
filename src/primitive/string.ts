import {
    RawOptions,
    isValidatorSymbol,
    ValidatorFunction,
    ValidatorReturn,
    SchemaError,
    ValidatorContext,
    raw,
} from "../core";

export interface StringOptions extends RawOptions {
    maxLength?: number;
    minLength?: number;
}

export function string<Options extends StringOptions>(options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, string> => {
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
    }, options);
}

string[isValidatorSymbol] = true;