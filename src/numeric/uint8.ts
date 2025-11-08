import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface UInt8Options extends NumericOptions {

}

export function uint8<Options extends UInt8Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isUInt8(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a UInt8`, context);
        }

        return num;
    }, uint8, options);
}

uint8.module = "numeric";
uint8[isValidatorSymbol] = true;