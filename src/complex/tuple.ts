import {
    RawOptions,
    InferSchema,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn,
    UnknownValidatorFunction,
    reflection
} from "../core";

export interface TupleOptions extends RawOptions {

}

export function tuple<
    const Items extends readonly [UnknownValidatorFunction, ...UnknownValidatorFunction[]],
    Options extends TupleOptions
>(items: Items, options?: Options): ValidatorFunction<Options, InferSchema<Items>> {
    options = options ?? {} as Options;

    const validator: ValidatorFunction<Options, InferSchema<Items>> = raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Items>> => {
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

    validator.getChildren = function*(): Generator<reflection.ASTChild> {
        for (let i: number = 0; i < items.length; i++) {
            yield {
                type: reflection.ASTChildType.VALIDATOR,
                key: i,
                value: items[i],
                kind: reflection.ASTChildKind.POSITIONAL
            }
        }
    }

    return validator;
}

tuple.module = "complex";
tuple[isValidatorSymbol] = true;