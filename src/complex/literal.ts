import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface LiteralOptions extends RawOptions {

}

type LiteralType = string | number | boolean | bigint;

export function literal<Type extends LiteralType, Options extends LiteralOptions>(constLiteral: Type, options?: Options): ValidatorFunction<Options, Type> {
    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, Type> => {
        if (value !== constLiteral) {
            throw new SchemaError(`Value is not equal to ${constLiteral}`, context);
        }

        return value as ValidatorReturn<Options, Type>;
    }, literal, options);
}

literal[isValidatorSymbol] = true;