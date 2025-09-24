import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface BooleanOptions extends RawOptions {

}

export function boolean<Options extends BooleanOptions>(options?: Options): ValidatorFunction<Options, boolean> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, boolean> => {
        if (typeof value != "boolean") {
            throw new SchemaError("Value is not a boolean", context);
        }

        return value;
    }, boolean, options);
}

boolean[isValidatorSymbol] = true;