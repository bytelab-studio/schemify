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
    return raw((value: NonNullable<unknown>, _: ValidatorContext): ValidatorReturn<Options, unknown> => {
        return value;
    }, unknown, options);
}

unknown[isValidatorSymbol] = true;