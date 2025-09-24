import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface CallableOptions extends RawOptions {

}

export function callable<Options extends CallableOptions>(options?: Options): ValidatorFunction<Options, Function> {
    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, Function> => {
        if (typeof value != "function") {
            throw new SchemaError("Value is not a function", context);
        }

        return value;
    },  callable, options);
}

callable[isValidatorSymbol] = true;