import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'number' validator", () => {
    describe("min option", () => {
        const validator = Schema.number({
            min: 5
        });

        test("throws", () => {
            expect(() => validator(1, new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator(6, new Schema.ValidatorContext())).not.throws();
        });
    });

    describe("max option", () => {
        const validator = Schema.number({
            max: 5
        });

        test("throws", () => {
            expect(() => validator(6, new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator(1, new Schema.ValidatorContext())).not.throws();
        });
    });
});