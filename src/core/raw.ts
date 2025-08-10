import type {BaseOptions, ValidatorFunction, ValidatorReturn} from "./types";
import {isValidatorSymbol} from "./types";
import {ValidatorContext} from "./utils";

export function raw<Options extends BaseOptions, TypeBase>(cb: (value: unknown, context: ValidatorContext) => ValidatorReturn<Options, TypeBase>): ValidatorFunction<Options, TypeBase> {
    return cb as ValidatorFunction<Options, TypeBase>;
}

raw[isValidatorSymbol] = true;