import type * as reflection from "../core/reflection";

export * from "./oneOf";
export * from "./instanceOf";
export * from "./list";
export * from "./literal";
export * from "./nested";
export * from "./pattern";
export * from "./record";
export * from "./tuple";
export * from "./union";

type ComplexValidatorsNames =
    | "oneOf"
    | "instanceOf"
    | "list"
    | "literal"
    | "nested"
    | "pattern"
    | "record"
    | "tuple"
    | "union"

export type ComplexValidatorIds = `${reflection.Modules.Complex}.${ComplexValidatorsNames}`;