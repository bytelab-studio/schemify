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

export interface ListOptions extends RawOptions {
    minLength?: number;
    maxLength?: number;
}

export function list<Item extends UnknownValidatorFunction, Options extends ListOptions>(item: Item, options?: Options): ValidatorFunction<Options, Array<InferSchema<Item>>> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, InferSchema<Item>[]> => {
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
            const ctx: ValidatorContext = context.createChild(i, true);
            const prop: unknown = value[i];
            item(prop, ctx);
        }

        return value as ValidatorReturn<Options, InferSchema<Item>[]>;
    }, options);
}

list[isValidatorSymbol] = true;