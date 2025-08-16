import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'list' validator", () => {
    describe("minLength option", () => {
        const validator = Schema.list(Schema.number(), {
            minLength: 5
        });

        test("throws", () => {
            expect(() => validator.validate([1, 2, 3])).throws();
        });

        test("pass", () => {
            expect(() => validator.validate([1, 2, 3, 4, 5])).not.throws();
        });
    });

    describe("maxLength option", () => {
        const validator = Schema.list(Schema.number(), {
            maxLength: 5
        });

        test("throws", () => {
            expect(() => validator.validate([1, 2, 3, 4, 5, 6])).throws();
        });

        test("pass", () => {
            expect(() => validator.validate([1, 2, 3])).not.throws();
        });
    });
});