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

export interface UnionOptions extends RawOptions {

}

export function union<
    const Items extends readonly [UnknownValidatorFunction, ...UnknownValidatorFunction[]],
    Options extends UnionOptions
>(items: Items, options?: Options): ValidatorFunction<Options, InferSchema<Items>[number]> {
    options = options ?? {} as Options;

    if (items.length == 0) {
        throw new SchemaError("Union must have at least one item", new ValidatorContext());
    }

    const validator: ValidatorFunction<Options, InferSchema<Items>[number]> = raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Items>[number]> => {
        const errors: [string, SchemaError][] = [];

        for (const validator of items) {
            try {
                return validator(value, context);
            } catch (e) {
                if (e instanceof SchemaError) {
                    errors.push([validator.name, e]);
                    continue;
                }

                throw e;
            }
        }

        const reasonText: string = errors.map(([name, error]) => `- ${name}: ${error.message}`).join("\n");

        throw new SchemaError("Value does not match any of the union types\n" + reasonText, context);
    }, union, options);

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

union.module = "complex";
union[isValidatorSymbol] = true;