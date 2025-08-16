import {
    RawOptions,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface OneOfOptions extends RawOptions {

}

type LiteralType = string | number | boolean | bigint;

export function oneOf<
    const Items extends readonly [LiteralType, ...LiteralType[]],
    Options extends OneOfOptions
>(items: Items, options?: Options): ValidatorFunction<Options, Items[number]> {
    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, Items[number]> => {
        if (value === null) {
            if (options?.nullable) {
                return null as ValidatorReturn<Options, Items[number]>;
            }

            throw new SchemaError("Value is null", context);
        }
        if (value === undefined) {
            if (options?.optional) {
                return undefined as ValidatorReturn<Options, Items[number]>;
            }

            throw new SchemaError("Value is undefined", context);
        }

        if (!items.includes(value as any)) {
            throw new SchemaError(`Value is not equal to one of ${items.join(", ")}`, context);
        }

        return value as ValidatorReturn<Options, Items[number]>;
    });
}

oneOf[isValidatorSymbol] = true;

export declare namespace oneOf {
    export function enumValues<
        const Items extends Record<string, string | number>,
        Options extends OneOfOptions
    >(items: Items, options?: OneOfOptions): ValidatorFunction<Options, Items[keyof Items]>;

    export interface EnumValuesOptions extends OneOfOptions {

    }
}

function enumValues<
    const Items extends Record<string, string | number>,
    Options extends oneOf.EnumValuesOptions
>(items: Items, options?: Options): ValidatorFunction<Options, Items[keyof Items]> {
    return oneOf(Object.values(items) as [(string | number), ...(string | number)[]], options) as ValidatorFunction<Options, Items[keyof Items]>;
}

enumValues[isValidatorSymbol] = true;
oneOf.enumValues = enumValues;