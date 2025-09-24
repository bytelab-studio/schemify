import {
    RawOptions,
    InferSchema,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn,
    UnknownValidatorFunction
} from "../core";

export interface TupleOptions extends RawOptions {

}

export function tuple<
    const Items extends readonly [UnknownValidatorFunction, ...UnknownValidatorFunction[]],
    Options extends TupleOptions
>(items: Items, options?: Options): ValidatorFunction<Options, InferSchema<Items>> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Items>> => {
        if (typeof value != "object" || !Array.isArray(value)) {
            throw new SchemaError("Value is not an array", context);
        }

        if (value.length != items.length) {
            throw new SchemaError(`Length of Array is not equal to ${items.length}`, context);
        }

        for (let i: number = 0; i < value.length; i++) {
            const ctx: ValidatorContext = context.createChild(i, true);

            const prop: unknown = value[i];
            items[i](prop, ctx);
        }

        return value as ValidatorReturn<Options, InferSchema<Items>>;
    }, tuple, options);
}

tuple.module = "complex";
tuple[isValidatorSymbol] = true;