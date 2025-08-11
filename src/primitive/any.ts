import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface AnyOptions extends RawOptions {

}

export function any<Options extends AnyOptions>(options?: Options): ValidatorFunction<Options, any> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, any> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, any>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, any>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        return value;
    });
}

any[isValidatorSymbol] = true;