import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'bigint' validator", () => {
    describe("min option", () => {
        const validator = Schema.bigint({
            min: 5n
        });

        test("throws", () => {
            expect(() => validator(1n, new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator(6n, new Schema.ValidatorContext())).not.throws();
        });
    });

    describe("max option", () => {
        const validator = Schema.bigint({
            max: 5n
        });

        test("throws", () => {
            expect(() => validator(6n, new Schema.ValidatorContext())).throws();
        });

        test("pass", () => {
            expect(() => validator(1n, new Schema.ValidatorContext())).not.throws();
        });
    });
});