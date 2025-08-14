import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface RegexOptions extends RawOptions {

}

export function regexp<Options extends RegexOptions>(options?: Options): ValidatorFunction<Options, RegExp> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, RegExp> => {
        if (value === null) {
            if (options.nullable) {
                return null as ValidatorReturn<Options, RegExp>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options.optional) {
                return undefined as ValidatorReturn<Options, RegExp>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "object" || !(value instanceof RegExp)) {
            throw new SchemaError("Value is not a RegExp", context);
        }

        return value;
    });
}

regexp[isValidatorSymbol] = true;