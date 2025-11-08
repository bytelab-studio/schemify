import type * as reflection from "./reflection";

export * as pluginTools from "./plugin";
export {plugin} from "./plugin";
export * from "./raw";
export * as reflection from "./reflection";
export * from "./types";
export * from "./utils";

type CoreValidatorsNames = "core";

export type CoreValidatorIds = `${reflection.Modules.Core}.${CoreValidatorsNames}`;