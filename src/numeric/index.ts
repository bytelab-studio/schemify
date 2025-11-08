import type * as reflection from "../core/reflection";

export * from "./int8";
export * from "./int16";
export * from "./int32";
export * from "./int64";
export * from "./numeric";
export * from "./uint8";
export * from "./uint16";
export * from "./uint32";
export * from "./uint64";

type NumericValidatorsNames =
    | "int8"
    | "int16"
    | "int32"
    | "int64"
    | "numeric"
    | "uint8"
    | "uint16"
    | "uint32"
    | "uint64";

export type NumericValidatorIds = `${reflection.Modules.Numeric}.${NumericValidatorsNames}`;