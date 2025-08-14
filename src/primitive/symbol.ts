import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";


interface SymbolOption extends RawOptions {

}

export function symbol<Options extends SymbolOption>(options?: Options): ValidatorFunction<Options, symbol> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, symbol> => {
        if (value === null) {
            if (options.nullable) {
                return null as ValidatorReturn<Options, symbol>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options.optional) {
                return undefined as ValidatorReturn<Options, symbol>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (typeof value != "symbol") {
            throw new SchemaError("Value is not a symbol", context);
        }

        return value;
    });
}

symbol[isValidatorSymbol] = true;