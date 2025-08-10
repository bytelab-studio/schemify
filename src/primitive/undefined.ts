import {
    BaseOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

interface UndefinedOptions extends BaseOptions {

}

export function undef<Options extends UndefinedOptions>(options?: Options): ValidatorFunction<Options, undefined> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, undefined> => {
        if (options?.nullable) {
            return null as ValidatorReturn<Options, undefined>;
        }

        if (value !== undefined) {
            throw new SchemaError("Value is not undefined", context);
        }

        return value;
    });
}

undef[isValidatorSymbol] = true;