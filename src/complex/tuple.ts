import {
    BaseOptions,
    InferSchema,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface TupleOptions extends BaseOptions {

}

export function tuple<Items extends readonly [ValidatorFunction<BaseOptions, unknown>, ...Array<ValidatorFunction<BaseOptions, unknown>>], Options extends TupleOptions>(items: Items, options?: Options): ValidatorFunction<Options, InferSchema<Items>> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Items>> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, InferSchema<Items>>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, InferSchema<Items>>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "object" || !Array.isArray(value)) {
            throw new SchemaError("Value is not an array", context);
        }

        if (value.length != items.length) {
            throw new SchemaError(`Length of Array is not equal to ${items.length}`, context);
        }

        for (let i: number = 0; i < value.length; i++) {
            const ctx: ValidatorContext = context.clone();
            ctx.pushPath(i);

            const prop: unknown = value[i];
            items[i](prop, ctx);
        }

        return value as ValidatorReturn<Options, InferSchema<Items>>;
    });
}

tuple[isValidatorSymbol] = true;