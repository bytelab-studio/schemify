import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface Int32Options extends NumericOptions {

}

export function int32<Options extends Int32Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isInt32(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a Int32`, context);
        }

        return num;
    }, int32, options);
}

int32.module = "numeric";
int32[isValidatorSymbol] = true;