import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {string, StringOptions} from "../primitive"

export interface PatternOptions extends StringOptions {

}

export function pattern<Options extends PatternOptions>(patt: RegExp, options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, string> => {
        const str: ValidatorReturn<Options, string> = string(options)(value, context);

        if (!patt.test(str!)) {
            throw new SchemaError(`Value does not match pattern ${patt}`, context);
        }

        return str;
    }, pattern, options);
}

pattern[isValidatorSymbol] = true;