import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface AnyOptions extends RawOptions {

}

export function any<Options extends AnyOptions>(options?: Options): ValidatorFunction<Options, any> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, _: ValidatorContext): ValidatorReturn<Options, any> => {
        return value;
    }, any, options);
}

any.module = "primitive";
any[isValidatorSymbol] = true;