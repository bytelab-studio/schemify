import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'bigint' validator", () => {
    describe("min option", () => {
        const validator = Schema.bigint({
            min: 5n
        });

        test("throws", () => {
            expect(() => validator.validate(1n)).throws();
        });

        test("pass", () => {
            expect(() => validator.validate(6n)).not.throws();
        });
    });

    describe("max option", () => {
        const validator = Schema.bigint({
            max: 5n
        });

        test("throws", () => {
            expect(() => validator.validate(6n)).throws();
        });

        test("pass", () => {
            expect(() => validator.validate(1n)).not.throws();
        });
    });
});