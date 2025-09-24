import {ValidatorContext} from "./utils";
import type {RawOptions} from "./raw";
import type {ASTChild} from "./reflection";

export const isValidatorSymbol: unique symbol = Symbol("isValidatorSymbol");

export type ValidatorReturn<Options extends RawOptions, TypeBase> =
    TypeBase
    | (Options["nullable"] extends true ? null : never)
    | (Options["optional"] extends true ? undefined : never);

export interface ValidatorDefinition<Options extends RawOptions, TypeBase> {
    validate(value: unknown): ValidatorReturn<Options, TypeBase>;

    tryValidate(value: unknown): value is ValidatorReturn<Options, TypeBase>;

    constructor: ValidatorConstructor;

    getChildren?: () => Generator<ASTChild>;
}

export type ValidatorFunction<Options extends RawOptions, TypeBase> = ((value: unknown, context: ValidatorContext) => ValidatorReturn<Options, TypeBase>) & ValidatorDefinition<Options, TypeBase>;

export type UnknownValidatorFunction = ValidatorFunction<RawOptions, unknown>;

export type ValidatorConstructor = ((...args: any[]) => UnknownValidatorFunction) & {
    name: string;
    module: string;
};

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

export type IsAcceptable<A, B> = A extends B ? A : never;