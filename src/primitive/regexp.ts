import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface RegexOptions extends RawOptions {

}

export function regexp<Options extends RegexOptions>(options?: Options): ValidatorFunction<Options, RegExp> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, RegExp> => {
        if (typeof value != "object" || !(value instanceof RegExp)) {
            throw new SchemaError("Value is not a RegExp", context);
        }

        return value;
    }, options);
}

regexp[isValidatorSymbol] = true;