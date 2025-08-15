import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface CallableOptions extends RawOptions {

}

export function callable<Options extends CallableOptions>(options?: Options): ValidatorFunction<Options, Function> {
    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, Function> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, Function>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, Function>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "function") {
            throw new SchemaError("Value is not a function", context);
        }

        return value;
    });
}

callable[isValidatorSymbol] = true;