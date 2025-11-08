import {isValidatorSymbol, raw, reflection, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {string, StringOptions} from "../primitive"

export interface PatternOptions extends StringOptions {

}

export function pattern<Options extends PatternOptions>(patt: RegExp, options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    const validator: ValidatorFunction<Options, string> = raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, string> => {
        const str: ValidatorReturn<Options, string> = string(options)(value, context);

        if (!patt.test(str!)) {
            throw new SchemaError(`Value does not match pattern ${patt}`, context);
        }

        return str;
    }, pattern, options);

    validator.getChildren = function*(): Generator<reflection.ASTChild> {
        yield {
            type: reflection.ASTChildType.PRIMITIVE,
            key: 0,
            value: patt,
            kind: reflection.ASTChildKind.POSITIONAL
        }
    }

    return validator;
}

pattern.module = "complex";
pattern[isValidatorSymbol] = true;