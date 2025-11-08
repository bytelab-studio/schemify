import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction, ValidatorReturn} from "../core";
import {Numeric, numeric, NumericNumber, NumericOptions} from "./numeric";

export interface Int64Options extends NumericOptions {

}

export function int64<Options extends Int64Options>(options?: Options): ValidatorFunction<Options, NumericNumber> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, NumericNumber> => {
        const num: ValidatorReturn<Options, NumericNumber> = numeric(options)(value, context);

        if (!Numeric.isInt64(num as NumericNumber)) {
            throw new SchemaError(`Value '${value}' is not in bounds of a Int64`, context);
        }

        return num;
    }, int64, options);
}

int64.module = "numeric";
int64[isValidatorSymbol] = true;