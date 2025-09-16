import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'timeISO' validator", () => {
    describe("format parser", () => {
        test("hh", () => {
            const validator = Schema.timeISO({
                format: "hh"
            });

            for (let i: number = 0; i < 25; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong hh", () => {
            expect(() => Schema.timeISO({
                format: "h"
            })).throws();
            expect(() => Schema.timeISO({
                format: "hhh"
            })).throws();
        });

        test("mm", () => {
            const validator = Schema.timeISO({
                format: "mm"
            });

            for (let i: number = 0; i < 60; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong mm", () => {
            expect(() => Schema.timeISO({
                format: "m"
            })).throws();
            expect(() => Schema.timeISO({
                format: "mmm"
            })).throws();
        });

        test("ss", () => {
            const validator = Schema.timeISO({
                format: "ss"
            });

            for (let i: number = 0; i < 61; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong ss", () => {
            expect(() => Schema.timeISO({
                format: "s"
            })).throws();
            expect(() => Schema.timeISO({
                format: "sss"
            })).throws();
        });

        test(",f", () => {
            const validator = Schema.timeISO({
                format: ",f"
            });

            expect(() => validator.validate(",12345")).not.throws();
            expect(() => validator.validate(".12345")).throws();
        });

        test(".f", () => {
            const validator = Schema.timeISO({
                format: ".f"
            });

            expect(() => validator.validate(".12345")).not.throws();
            expect(() => validator.validate(",12345")).throws();
        });

        test("Wrong ,f or .f", () => {
            expect(() => Schema.timeISO({
                format: "f"
            })).throws();
            expect(() => Schema.timeISO({
                format: ","
            })).throws();
            expect(() => Schema.timeISO({
                format: "."
            })).throws();
        });

        test("':'", () => {
            const validator = Schema.timeISO({
                format: ":"
            });

            expect(() => validator.validate(":")).not.throws();
        });

        test("Double colon", () => {
            expect(() => Schema.timeISO({
                format: "::"
            })).throws();
        });

        test("Invalid characters", () => {
            expect(() => Schema.timeISO({
                format: "abcd"
            })).throws();
        });
    });

    describe("common formats", () => {
         test("hh:mm:ss", () => {
             const validator = Schema.timeISO();
             expect(() => validator.validate("12:34:56")).not.throws();
         });

        test("hhmmss", () => {
            const validator = Schema.timeISO({
                format: "hhmmss"
            });
            expect(() => validator.validate("123456")).not.throws();
        });

        test("hh:mm", () => {
            const validator = Schema.timeISO({
                format: "hh:mm"
            });
            expect(() => validator.validate("12:34")).not.throws();
        });

        test("hhmm", () => {
            const validator = Schema.timeISO({
                format: "hhmm"
            });
            expect(() => validator.validate("1234")).not.throws();
        });

        test("hh", () => {
            const validator = Schema.timeISO({
                format: "hh"
            });
            expect(() => validator.validate("12")).not.throws();
        });

        test("hh:mm:ss,f", () => {
            const validator = Schema.timeISO({
                format: "hh:mm:ss,f"
            });
            expect(() => validator.validate("12:34:56,789")).not.throws();
        });

        test("hh:mm:ss.f", () => {
            const validator = Schema.timeISO({
                format: "hh:mm:ss.f"
            });
            expect(() => validator.validate("12:34:56.789")).not.throws();
        });
    });
});