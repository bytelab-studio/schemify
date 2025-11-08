import type * as reflection from "../core/reflection";

export * from "./dateISO";
export * from "./datetimeISO";
export * from "./timeISO";

type DatetimeValidatorsNames =
    | "dateISO"
    | "datetimeISO"
    | "timeISO";

export type DatetimeValidatorIds = `${reflection.Modules.Datetime}.${DatetimeValidatorsNames}`;
