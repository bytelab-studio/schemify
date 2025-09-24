import type {ValidatorConstructor, ValidatorFunction, ValidatorReturn} from "./types";
import {isValidatorSymbol} from "./types";
import {SchemaError, ValidatorContext} from "./utils";
import * as plugin from "./plugin";

export interface RawOptions {
    nullable?: boolean;
    optional?: boolean;
}

export function initValidatorFunction<Options extends RawOptions, TypeBase>(validator: ValidatorFunction<Options, TypeBase>, constructor: ValidatorConstructor): void {
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
    validator.constructor = constructor;
}

export function raw<Options extends RawOptions, TypeBase>(cb: (value: NonNullable<unknown>, context: ValidatorContext) => ValidatorReturn<Options, TypeBase>, constructor: ValidatorConstructor, options?: RawOptions): ValidatorFunction<Options, TypeBase> {
    options = options ?? {} as Options;

    const validator: ValidatorFunction<Options, TypeBase> = ((value: unknown, context: ValidatorContext): ValidatorReturn<Options, TypeBase> => {
        for (const plug of plugin.getRuntimePlugins()) {
            plugin.executeRuntimePlugin(plug, cb as ValidatorFunction<Options, TypeBase>);
        }

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

    initValidatorFunction(validator, constructor);

    return validator;
}

raw.module = "core";
raw[isValidatorSymbol] = true;