import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn,
    reflection
} from "../core";

export interface LiteralOptions extends RawOptions {

}

type LiteralType = string | number | boolean | bigint;

export function literal<Type extends LiteralType, Options extends LiteralOptions>(constLiteral: Type, options?: Options): ValidatorFunction<Options, Type> {
    const validator: ValidatorFunction<Options, Type> = raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, Type> => {
        if (value !== constLiteral) {
            throw new SchemaError(`Value is not equal to ${constLiteral}`, context);
        }

        return value as ValidatorReturn<Options, Type>;
    }, literal, options);

    validator.getChildren = function*(): Generator<reflection.ASTChild> {
        yield {
            type: reflection.ASTChildType.PRIMITIVE,
            key: 0,
            value: constLiteral,
            kind: reflection.ASTChildKind.POSITIONAL
        }
    }

    return validator;
}

literal.module = "complex";
literal[isValidatorSymbol] = true;