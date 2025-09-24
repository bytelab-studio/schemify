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
    options.nullable = true;

    return raw((_: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, null> => {
        // we can only throw here, because if the value is null, it would already be returned by `raw`
        throw new SchemaError("Value is not null", context);
    }, nil, options);
}

nil.module = "primitive";
nil[isValidatorSymbol] = true;