import type * as reflection from "../core/reflection";

export * from "./any";
export * from "./array";
export * from "./bigint";
export * from "./boolean";
export * from "./callable";
export * from "./never";
export * from "./nil";
export * from "./number";
export * from "./object";
export * from "./regexp";
export * from "./string";
export * from "./symbol";
export * from "./undef";
export * from "./unknown";

type PrimitiveValidatorsNames =
    | "any"
    | "array"
    | "bigint"
    | "boolean"
    | "callable"
    | "never"
    | "nil"
    | "number"
    | "object"
    | "regexp"
    | "string"
    | "symbol"
    | "undef"
    | "unkown";

export type PrimitiveValidatorIds = `${reflection.Modules.Primitive}.${PrimitiveValidatorsNames}`;
