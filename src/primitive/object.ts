import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface ObjectOptions extends RawOptions {

}

export function object<Options extends ObjectOptions>(options?: Options): ValidatorFunction<Options, object> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, object> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, object>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, object>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "object" || Array.isArray(value)) {
            throw new SchemaError("Value is not an object", context);
        }

        return value;
    });
}

object[isValidatorSymbol] = true;