import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface UInt64Options extends NumericOptions {

}

export function uint64<Options extends UInt64Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isUInt64(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a UInt64`, context);
        }

        return num;
    }, uint64, options);
}

uint64.module = "numeric";
uint64[isValidatorSymbol] = true;