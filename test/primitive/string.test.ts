import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'string' validator", () => {
    describe("minLength option", () => {
        const validator = Schema.string({
            minLength: 5
        });

        test("throws", () => {
            expect(() => validator("abc", new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator("abcdef", new Schema.ValidatorContext())).not.throws();
        });
    });

    describe("maxLength option", () => {
        const validator = Schema.string({
            maxLength: 5
        });

        test("throws", () => {
            expect(() => validator("abcdef", new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator("abc", new Schema.ValidatorContext())).not.throws();
        });
    });
});