import {
    RawOptions,
    InferSchema,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface NestedOptions extends RawOptions {

}

export function nested<Schema extends Record<string, ValidatorFunction<RawOptions, unknown>>, Options extends NestedOptions>(schema: Schema, options?: Options): ValidatorFunction<Options, InferSchema<Schema>> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Schema>> => {
        if (typeof value != "object" || Array.isArray(value)) {
            throw new SchemaError("Value is not an object", context);
        }

        for (const [key, validator] of Object.entries(schema)) {
            const ctx: ValidatorContext = context.createChild(key, key in value);
            const prop: unknown = key in value ? (value as any)[key]: undefined;
            validator(prop, ctx);
        }

        return value as ValidatorReturn<Options, InferSchema<Schema>>;
    }, options);
}

nested[isValidatorSymbol] = true;