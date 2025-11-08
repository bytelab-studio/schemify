import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface Int16Options extends NumericOptions {

}

export function int16<Options extends Int16Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isInt16(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a Int16`, context);
        }

        return num;
    }, int16, options);
}

int16.module = "numeric";
int16[isValidatorSymbol] = true;