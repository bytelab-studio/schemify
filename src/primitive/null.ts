import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface NullOptions extends RawOptions {

}

export function nil<Options extends NullOptions>(options?: Options): ValidatorFunction<Options, null> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, null> => {
        if (options?.optional) {
            return undefined as ValidatorReturn<Options, null>;
        }

        if (value !== null) {
            throw new SchemaError("Value is not null", context);
        }

        return value;
    });
}

nil[isValidatorSymbol] = true;