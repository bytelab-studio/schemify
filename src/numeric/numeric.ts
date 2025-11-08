import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {bigint, number} from "../primitive";
import {union, UnionOptions} from "../complex";

export type NumericNumber = number | bigint;

export namespace Numeric {
    function isInteger(value: unknown): value is NumericNumber {
        return (
            typeof value == "number" && Number.isSafeInteger(value) ||
            typeof value == "bigint"
        );
    }

    function inRange(value: NumericNumber, min: NumericNumber, max: NumericNumber): boolean {
        return value >= min && value <= max;
    }

    export function isInt8(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, -128, 127);
    }

    export function isInt16(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, -32768, 32767);
    }

    export function isInt32(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, -2147483648, 2147483647);
    }

    export function isInt64(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, -9223372036854775808n, 9223372036854775807n);
    }

    export function isUInt8(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, 0, 255);
    }

    export function isUInt16(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, 0, 65535);
    }

    export function isUInt32(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, 0, 4294967295);
    }

    export function isUInt64(value: NumericNumber): boolean {
        return isInteger(value) && inRange(value, 0, 18446744073709551615n);
    }
}

export interface NumericOptions extends UnionOptions {
    allowNegativeZero?: boolean
}

export function numeric<Options extends NumericOptions>(options?: NumericOptions): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = union([number(), bigint()], options)(value, context);

        if (typeof num == "number" && !Number.isSafeInteger(num)) {
            throw new SchemaError(`Value '${value}' is not an integer`, context);
        }

        if (typeof num == "number" && Object.is(num, -0) && !options.allowNegativeZero) {
            throw new SchemaError(`Value '${value}' is not an integer`, context);
        }

        return num;
    }, numeric, options);
}

numeric.module = "numeric";
numeric[isValidatorSymbol] = true;