import {
    BaseOptions,
    InferSchema, isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface EnumOptions extends BaseOptions {

}

type LiteralType = string | number | boolean | bigint;

export function oneOf<
    const Items extends readonly [LiteralType, ...LiteralType[]],
    Options extends EnumOptions
>(items: Items, options?: Options): ValidatorFunction<Options, Items[number]> {
    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, Items[number]> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, Items[number]>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, Items[number]>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (!items.includes(value as any)) {
            throw new SchemaError(`Value is not equal to one of ${items.join(", ")}`, context);
        }

        return value as ValidatorReturn<Options, Items[number]>;
    });
}

oneOf[isValidatorSymbol] = true;