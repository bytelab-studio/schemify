import {ValidatorContext} from "./utils";
import {RawOptions} from "./raw";

export const isValidatorSymbol: unique symbol = Symbol("isValidatorSymbol");

export type ValidatorReturn<Options extends RawOptions, TypeBase> =
    TypeBase
    | (Options["nullable"] extends true ? null : never)
    | (Options["optional"] extends true ? undefined : never);

export type ValidatorFunction<Options extends RawOptions, TypeBase> = (value: unknown, context: ValidatorContext) => ValidatorReturn<Options, TypeBase>;

export type InferSchema<T> =
    // simple
    T extends ValidatorFunction<any, any> ? ReturnType<T> :
    // tuple
    T extends readonly [any, ...any[]] ? { [K in keyof T]: InferSchema<T[K]> } :
    // array
    T extends Array<infer U> ? Array<InferSchema<U>> :
    // object
    T extends object ? { [K in keyof T]: InferSchema<T[K]> } :
    never;