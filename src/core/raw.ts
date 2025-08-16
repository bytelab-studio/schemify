import type {ValidatorFunction, ValidatorReturn} from "./types";
import {isValidatorSymbol} from "./types";
import {SchemaError, ValidatorContext} from "./utils";

export interface RawOptions {
    nullable?: boolean;
    optional?: boolean;
}

export function raw<Options extends RawOptions, TypeBase>(cb: (value: NonNullable<unknown>, context: ValidatorContext) => ValidatorReturn<Options, TypeBase>, options?: RawOptions): ValidatorFunction<Options, TypeBase> {
    options = options ?? {} as Options;

    const validator: ValidatorFunction<Options, TypeBase> = ((value: unknown, context: ValidatorContext): ValidatorReturn<Options, TypeBase> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, TypeBase>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, TypeBase>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        return cb(value, context);
    }) as ValidatorFunction<Options, TypeBase>;

    validator.validate = (value: unknown): ValidatorReturn<Options, TypeBase> => {
        return validator(value, new ValidatorContext());
    }
    validator.tryValidate = (value: unknown): value is ValidatorReturn<Options, TypeBase> => {
        try {
            validator(value, new ValidatorContext());
            return true;
        } catch (e) {
            if (e instanceof SchemaError) {
                return false;
            }

            throw e;
        }
    }

    return validator;
}

raw[isValidatorSymbol] = true;