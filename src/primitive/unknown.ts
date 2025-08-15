import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface UnknownOptions extends RawOptions {

}

export function unknown<Options extends UnknownOptions>(options?: Options): ValidatorFunction<Options, unknown> {
    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, unknown> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, unknown>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, unknown>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        return value;
    });
}

unknown[isValidatorSymbol] = true;