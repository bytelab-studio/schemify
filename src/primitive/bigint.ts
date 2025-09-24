import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface BigIntOptions extends RawOptions {
    min?: bigint;
    max?: bigint;
}

export function bigint<Options extends BigIntOptions>(options?: Options): ValidatorFunction<Options, bigint> {
    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, bigint> => {
        if (typeof value != "bigint") {
            throw new SchemaError("Value is not a bigint", context);
        }

        if (options?.min !== undefined) {
            if (value < options.min) {
                throw new SchemaError(`Value is less than ${options.min}`, context);
            }
        }
        if (options?.max !== undefined) {
            if (value > options.max) {
                throw new SchemaError(`Value is greater than ${options.max}`, context);
            }
        }

        return value;
    }, bigint, options);
}

bigint[isValidatorSymbol] = true;