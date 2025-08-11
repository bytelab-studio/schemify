import type {ValidatorFunction, ValidatorReturn} from "./types";
import {isValidatorSymbol} from "./types";
import {ValidatorContext} from "./utils";

export interface RawOptions {
    nullable?: boolean;
    optional?: boolean;
}

export function raw<Options extends RawOptions, TypeBase>(cb: (value: unknown, context: ValidatorContext) => ValidatorReturn<Options, TypeBase>): ValidatorFunction<Options, TypeBase> {
    return cb as ValidatorFunction<Options, TypeBase>;
}

raw[isValidatorSymbol] = true;