import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'number' validator", () => {
    describe("min option", () => {
        const validator = Schema.number({
            min: 5
        });

        test("throws", () => {
            expect(() => validator.validate(1)).throws();
        });

        test("pass", () => {
            expect(() => validator.validate(6)).not.throws();
        });
    });

    describe("max option", () => {
        const validator = Schema.number({
            max: 5
        });

        test("throws", () => {
            expect(() => validator.validate(6)).throws();
        });

        test("pass", () => {
            expect(() => validator.validate(1)).not.throws();
        });
    });

    describe("disallowNaN option", () => {
        const validator = Schema.number({
            disallowNaN: true
        });

        test("throws", () => {
            expect(() => validator.validate(NaN)).throws();
        });

        test("pass", () => {
            expect(() => validator.validate(123)).not.throws();
        });
    });
});