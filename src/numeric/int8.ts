import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface Int8Options extends NumericOptions {

}

export function int8<Options extends Int8Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isInt8(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a Int8`, context);
        }

        return num;
    }, int8, options);
}

int8.module = "numeric";
int8[isValidatorSymbol] = true;