import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'dateISO' validator", () => {
    describe("format parser", () => {
        test("YYYY", () => {
            const validator = Schema.dateISO({
                pattern: "YYYY"
            });

            for (let i: number = 0; i < 10_000; i++) {
                const str: string = i.toString().padStart(4, "0");
                expect(() => validator.validate(str)).not.throws();
            }

            expect(() => validator.validate("-1234")).not.throws();
        });

        test("-YYYY", () => {
            const validator = Schema.dateISO({
                pattern: "-YYYY"
            });

            for (let i: number = 9999; i >= 0; i--) {
                const str: string = "-" + i.toString().padStart(4, "0");
                expect(() => validator.validate(str)).not.throws();
            }

            expect(() => validator.validate("1234")).throws();
        });

        test("+YYYY", () => {
            const validator = Schema.dateISO({
                pattern: "+YYYY"
            });

            expect(() => validator.validate("1234")).not.throws();
            expect(() => validator.validate("-1234")).throws();
        });

        test("Wrong YYYY", () => {
            expect(() => Schema.dateISO({
                pattern: "YYY"
            })).throws();
            expect(() => Schema.dateISO({
                pattern: "YYYYY"
            })).throws();
        });

        test("MM", () => {
            const validator = Schema.dateISO({
                pattern: "MM"
            });

            for (let i: number = 1; i < 13; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong MM", () => {
            expect(() => Schema.dateISO({
                pattern: "M"
            })).throws();
        });


        test("D", () => {
            const validator = Schema.dateISO({
                pattern: "D"
            });

            for (let i: number = 1; i < 8; i++) {
                const str: string = i.toString()
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("DD", () => {
            const validator = Schema.dateISO({
                pattern: "DD"
            });

            for (let i: number = 1; i < 32; i++) {
                const str: string = i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("DDD", () => {
            const validator = Schema.dateISO({
                pattern: "DDD"
            });

            for (let i: number = 1; i < 367; i++) {
                const str: string = i.toString().padStart(3, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Www", () => {
            const validator = Schema.dateISO({
                pattern: "Www"
            });

            for (let i: number = 1; i < 54; i++) {
                const str: string = "W" + i.toString().padStart(2, "0");
                expect(() => validator.validate(str)).not.throws();
            }
        });

        test("Wrong Www", () => {
            expect(() => Schema.dateISO({
                pattern: "W"
            })).throws();
        });

        test("'-'", () => {
            const validator = Schema.dateISO({
                pattern: "YYYY-"
            });

            expect(() => validator.validate("0000-")).not.throws();
        });

        test("Double dashes", () => {
            expect(() => Schema.dateISO({
                pattern: "YYYY--"
            })).throws();
        });

        test("Invalid characters", () => {
            expect(() => Schema.dateISO({
                pattern: "abcd"
            })).throws();
        });

        test("'+' or '-' must follows YYYY", () => {
            expect(() => Schema.dateISO({
                pattern: "-MM"
            })).throws();

            expect(() => Schema.dateISO({
                pattern: "+MM"
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
                pattern: "YYYYMMDD"
            });
            expect(() => validator.validate("20250914")).not.throws();
        });

        test("YYYY-MM", () => {
            const validator = Schema.dateISO({
                pattern: "YYYY-MM"
            });
            expect(() => validator.validate("2025-09")).not.throws();
        });

        test("YYYY-Www", () => {
            const validator = Schema.dateISO({
                pattern: "YYYY-Www"
            });
            expect(() => validator.validate("2025-W30")).not.throws();
        });

        test("YYYYWww", () => {
            const validator = Schema.dateISO({
                pattern: "YYYYWww"
            });
            expect(() => validator.validate("2025W30")).not.throws();
        });

        test("YYYYWww-D", () => {
            const validator = Schema.dateISO({
                pattern: "YYYYWww-D"
            });
            expect(() => validator.validate("2025W30-7")).not.throws();
        });

        test("YYYYWwwD", () => {
            const validator = Schema.dateISO({
                pattern: "YYYYWwwD"
            });
            expect(() => validator.validate("2025W307")).not.throws();
        });

        test("YYYY-DDD", () => {
            const validator = Schema.dateISO({
                pattern: "YYYY-DDD"
            });
            expect(() => validator.validate("2025-251")).not.throws();
        });

        test("YYYYDDD", () => {
            const validator = Schema.dateISO({
                pattern: "YYYYDDD"
            });
            expect(() => validator.validate("2025251")).not.throws();
        });
    });
});