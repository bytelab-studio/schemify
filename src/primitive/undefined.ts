import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface UndefinedOptions extends RawOptions {

}

export function undef<Options extends UndefinedOptions>(options?: Options): ValidatorFunction<Options, undefined> {
    options = options ?? {} as Options;
    options.optional = true;

    return raw((_: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, undefined> => {
        // we can only throw here, because if the value is undefined, it would already be returned by `raw`
        throw new SchemaError("Value is not undefined", context);
    }, options);
}

undef[isValidatorSymbol] = true;