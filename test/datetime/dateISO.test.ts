import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'dateISO' validator", () => {
    describe("format parser", () => {
        test("YYYY", () => {
            const validator = Schema.dateISO({
                format: "YYYY"
            });

            for (let i: number = 0; i < 10_000; i++) {
                const str: string = i.toString().padStart(4, "0");
                expect(() => validator.validate(str)).not.throws();
            }

            expect(() => validator.validate("-1234")).not.throws();
        });

        test("-YYYY", () => {
            const validator = Schema.dateISO({
                format: "-YYYY"
            });

            for (let i: number = 9999; i >= 0; i--) {
                const str: string = "-" + i.toString().padStart(4, "0");
                expect(() => validator.validate(str)).not.throws();
            }

            expect(() => validator.validate("1234")).throws();
        });

        test("+YYYY", () => {
            const validator = Schema.dateISO({
                format: "+YYYY"
            });

            expect(() => validator.validate("1234")).not.throws();
            expect(() => validator.validate("-1234")).throws();
        });

        test("Wrong YYYY", () => {
            expect(() => Schema.dateISO({
                format: "YYY"
            })).throws();
            expect(() => Schema.dateISO({
                format: "YYYYY"
            })).throws();
        });

        test("MM", () => {
            const validator = Schema.dateISO({
                format: "MM"
            });

            for (let i: number = 1; i < 13; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong MM", () => {
            expect(() => Schema.dateISO({
                format: "M"
            })).throws();
        });


        test("D", () => {
            const validator = Schema.dateISO({
                format: "D"
            });

            for (let i: number = 1; i < 8; i++) {
                const str: string = i.toString()
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("DD", () => {
            const validator = Schema.dateISO({
                format: "DD"
            });

            for (let i: number = 1; i < 32; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("DDD", () => {
            const validator = Schema.dateISO({
                format: "DDD"
            });

            for (let i: number = 1; i < 367; i++) {
                const str: string = i.toString().padStart(3, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Www", () => {
            const validator = Schema.dateISO({
                format: "Www"
            });

            for (let i: number = 1; i < 54; i++) {
                const str: string = "W" + i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong Www", () => {
            expect(() => Schema.dateISO({
                format: "W"
            })).throws();
        });

        test("'-'", () => {
            const validator = Schema.dateISO({
                format: "YYYY-"
            });

            expect(() => validator.validate("0000-")).not.throws();
        });

        test("Double dashes", () => {
            expect(() => Schema.dateISO({
                format: "YYYY--"
            })).throws();
        });

        test("Invalid characters", () => {
            expect(() => Schema.dateISO({
                format: "abcd"
            })).throws();
        });

        test("'+' or '-' must follows YYYY", () => {
            expect(() => Schema.dateISO({
                format: "-MM"
            })).throws();

            expect(() => Schema.dateISO({
                format: "+MM"
            })).throws();
        });
    });

    describe("common formats", () => {
        test("YYYY-MM-DD", () => {
            const validator = Schema.dateISO();
            expect(() => validator.validate("2025-09-14")).not.throws();
        });

        test("YYYYMMDD", () => {
            const validator = Schema.dateISO({
                format: "YYYYMMDD"
            });
            expect(() => validator.validate("20250914")).not.throws();
        });

        test("YYYY-MM", () => {
            const validator = Schema.dateISO({
                format: "YYYY-MM"
            });
            expect(() => validator.validate("2025-09")).not.throws();
        });

        test("YYYY-Www", () => {
            const validator = Schema.dateISO({
                format: "YYYY-Www"
            });
            expect(() => validator.validate("2025-W30")).not.throws();
        });

        test("YYYYWww", () => {
            const validator = Schema.dateISO({
                format: "YYYYWww"
            });
            expect(() => validator.validate("2025W30")).not.throws();
        });

        test("YYYYWww-D", () => {
            const validator = Schema.dateISO({
                format: "YYYYWww-D"
            });
            expect(() => validator.validate("2025W30-7")).not.throws();
        });

        test("YYYYWwwD", () => {
            const validator = Schema.dateISO({
                format: "YYYYWwwD"
            });
            expect(() => validator.validate("2025W307")).not.throws();
        });

        test("YYYY-DDD", () => {
            const validator = Schema.dateISO({
                format: "YYYY-DDD"
            });
            expect(() => validator.validate("2025-251")).not.throws();
        });

        test("YYYYDDD", () => {
            const validator = Schema.dateISO({
                format: "YYYYDDD"
            });
            expect(() => validator.validate("2025251")).not.throws();
        });
    });
});