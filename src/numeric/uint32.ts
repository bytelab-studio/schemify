import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface UInt32Options extends NumericOptions {

}

export function uint32<Options extends UInt32Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isUInt32(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a UInt32`, context);
        }

        return num;
    }, uint32, options);
}

uint32.module = "numeric";
uint32[isValidatorSymbol] = true;