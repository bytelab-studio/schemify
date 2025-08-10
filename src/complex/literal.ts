import {
    BaseOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface LiteralOptions extends BaseOptions {

}

type LiteralType = string | number | boolean | bigint;

export function literal<Type extends LiteralType, Options extends LiteralOptions>(literal: Type, options?: Options): ValidatorFunction<Options, Type> {
    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, Type> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, Type>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, Type>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (value !== literal) {
            throw new SchemaError(`Value is not equal to ${literal}`, context);
        }

        return value as ValidatorReturn<Options, Type>;
    });
}

literal[isValidatorSymbol] = true;