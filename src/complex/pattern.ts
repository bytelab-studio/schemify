import {raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {string, StringOptions} from "../primitive"

interface PatternOptions extends StringOptions {

}

export function pattern<Options extends PatternOptions>(pattern: RegExp, options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, string> => {
        const str: ValidatorReturn<Options, string> = string(options)(value, context);

        if (str === null || str === undefined) {
            return str as ValidatorReturn<Options, string>;
        }

        if (!pattern.test(str)) {
            throw new SchemaError(`Value does not match pattern ${pattern}`, context);
        }

        return str;
    });
}