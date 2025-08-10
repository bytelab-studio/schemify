import {
    BaseOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface BooleanOptions extends BaseOptions {

}

export function boolean<Options extends BooleanOptions>(options?: Options): ValidatorFunction<Options, boolean> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, boolean> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, boolean>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, boolean>;
            }
            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "boolean") {
            throw new SchemaError("Value is not a boolean", context);
        }

        return value;
    });
}

boolean[isValidatorSymbol] = true;