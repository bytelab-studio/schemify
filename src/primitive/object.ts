import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface ObjectOptions extends RawOptions {

}

export function object<Options extends ObjectOptions>(options?: Options): ValidatorFunction<Options, object> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, object> => {
        if (typeof value != "object" || Array.isArray(value) || value instanceof RegExp) {
            throw new SchemaError("Value is not an object", context);
        }

        return value;
    }, object, options);
}

object[isValidatorSymbol] = true;