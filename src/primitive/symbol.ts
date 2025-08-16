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

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, symbol> => {
        if (typeof value != "symbol") {
            throw new SchemaError("Value is not a symbol", context);
        }

        return value;
    }, options);
}

symbol[isValidatorSymbol] = true;