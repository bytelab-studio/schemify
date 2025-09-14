import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'datetimeISO' validator", () => {
    describe("format parser", () => {
        test("hh", () => {
            const validator = Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+hh"
            });

            expect(() => validator.validate("2025-09-14T12:00+02")).not.throws();
        });

        test("Wrong hh", () => {
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+h"
            })).throws();
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+hhh"
            })).throws();
        });

        test("mm", () => {
            const validator = Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+hh:mm"
            });

            expect(() => validator.validate("2025-09-14T12:00+02:00")).not.throws();
        });

        test("Wrong mm", () => {
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+hh:m"
            })).throws();
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+hh:mmm"
            })).throws();
        });

        test("Z", () => {
            const validator = Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mmZ"
            });

            expect(() => validator.validate("2025-09-14T12:00Z")).not.throws();
        });

        test("Wrong Z", () => {
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mmZZ"
            })).throws();
        });

        test("Double colon", () => {
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+hh::mm"
            })).throws();
        });

        test("Invalid characters", () => {
            expect(() => Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm+abcd"
            })).throws();
        });
    });

    describe("common formats", () => {
        /**
         * Because the date and time format are tested by their own validators
         * they are not important in this test and can be simplified to a minimum
         */

        test("YYYY-MM-DDThh:mm:ss", () => {
            const validator = Schema.datetimeISO({
                format: "YYYY-MM-DDThh:mm:ss"
            });
            expect(() => validator.validate("2025-09-14T12:00:00")).not.throws();
        });

        test("YYYYThhZ", () => {
            const validator = Schema.datetimeISO({
                format: "YYYYThhZ"
            });
            expect(() => validator.validate("2025T12Z")).not.throws();
        });

        test("YYYYThh+hh:mm", () => {
            const validator = Schema.datetimeISO({
                format: "YYYYThh+hh:mm"
            });
            expect(() => validator.validate("2025T12+00:00")).not.throws();
        });

        test("YYYYThh-hh:mm", () => {
            const validator = Schema.datetimeISO({
                format: "YYYYThh-hh:mm"
            });
            expect(() => validator.validate("2025T12-00:00")).not.throws();
        });
    });
});