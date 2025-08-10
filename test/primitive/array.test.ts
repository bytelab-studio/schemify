import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'array' validator", () => {
    describe("minLength option", () => {
        const validator = Schema.array({
            minLength: 5
        });

        test("throws", () => {
            expect(() => validator([1, 2, 3], new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator([1, 2, 3, 4, 5], new Schema.ValidatorContext())).not.throws();
        });
    });

    describe("maxLength option", () => {
        const validator = Schema.array({
            maxLength: 5
        });

        test("throws", () => {
            expect(() => validator([1, 2, 3, 4, 5, 6], new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator([1, 2, 3], new Schema.ValidatorContext())).not.throws();
        });
    });
});