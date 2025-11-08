import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface UInt16Options extends NumericOptions {

}

export function uint16<Options extends UInt16Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isUInt16(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a UInt16`, context);
        }

        return num;
    }, uint16, options);
}

uint16.module = "numeric";
uint16[isValidatorSymbol] = true;