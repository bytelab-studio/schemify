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

export function literal<Type extends LiteralType, Options extends LiteralOptions>(literal: Type, options?: Options): ValidatorFunction<Options, Type> {
    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, Type> => {
        if (value !== literal) {
            throw new SchemaError(`Value is not equal to ${literal}`, context);
        }

        return value as ValidatorReturn<Options, Type>;
    }, options);
}

literal[isValidatorSymbol] = true;