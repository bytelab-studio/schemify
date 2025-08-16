import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'string' validator", () => {
    describe("minLength option", () => {
        const validator = Schema.string({
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
        const validator = Schema.string({
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