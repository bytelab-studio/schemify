import {
    BaseOptions,
    InferSchema, isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface ListOptions extends BaseOptions {
    minLength?: number;
    maxLength?: number;
}

export function list<Item extends ValidatorFunction<BaseOptions, unknown>, Options extends ListOptions>(item: Item, options?: Options): ValidatorFunction<Options, Array<InferSchema<Item>>> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Item>[]> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, InferSchema<Item>[]>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, InferSchema<Item>[]>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "object" || !Array.isArray(value)) {
            throw new SchemaError("Value is not an array", context);
        }

        if (options.minLength !== undefined) {
            if (value.length < options.minLength) {
                throw new SchemaError(`Length of Array is less than ${options.minLength}`, context);
            }
        }

        if (options.maxLength !== undefined) {
            if (value.length > options.maxLength) {
                throw new SchemaError(`Length of Array is greater than ${options.maxLength}`, context);
            }
        }

        for (let i: number = 0; i < value.length; i++) {
            const ctx: ValidatorContext = context.clone();
            ctx.pushPath(i);

            const prop: unknown = value[i];
            item(prop, ctx);
        }

        return value as ValidatorReturn<Options, InferSchema<Item>[]>;
    });
}

list[isValidatorSymbol] = true;