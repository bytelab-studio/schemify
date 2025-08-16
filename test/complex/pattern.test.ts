import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'pattern' validator", () => {
    describe("minLength option", () => {
        const validator = Schema.pattern(/\w+/, {
            minLength: 5
        });

        test("throws", () => {
            expect(() => validator.validate("abc")).throws();
        });

        test("pass", () => {
            expect(() => validator.validate("abcdef")).not.throws();
        });
    });

    describe("maxLength option", () => {
        const validator = Schema.pattern(/\w+/, {
            maxLength: 5
        });

        test("throws", () => {
            expect(() => validator.validate("abcdef")).throws();
        });

        test("pass", () => {
            expect(() => validator.validate("abc")).not.throws();
        });
    });
});