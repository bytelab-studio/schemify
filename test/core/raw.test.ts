import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'raw' validator", () => {
    describe("tryValidate", () => {
        const validator = Schema.string();

        test("returns true", () => {
            expect(validator.tryValidate("wasd")).toBe(true);
        });

        test("returns false", () => {
            expect(validator.tryValidate(123)).toBe(false);
        });

        test("forwards error", () => {
            const validator = Schema.raw(() => {
                throw new Error("Not a SchemaError")
            }, Schema.raw);
            expect(() => validator.tryValidate(0)).throws();
            try {
                validator.tryValidate(0);
            } catch (e) {
                expect(e).not.instanceOf(Schema.SchemaError);
                return;
            }

            // Should not reach this point
            expect(false).toBe(true);
        });
    });
});