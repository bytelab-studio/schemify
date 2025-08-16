import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface NilOptions extends RawOptions {

}

export function nil<Options extends NilOptions>(options?: Options): ValidatorFunction<Options, null> {
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