import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'union' validator", () => {
    test("empty list -> throws", () => {
        // @ts-expect-error
        expect(() => Schema.union([])).throws();
    });

    test("error is rethrown", () => {
        const validator = Schema.union([Schema.raw(() => {
            throw new Error("Not a SchemaError")
        })]);
        expect(() => validator(0, new Schema.ValidatorContext())).throws("");
        try {
            validator(0, new Schema.ValidatorContext());
        } catch (e) {
            expect(e).not.instanceOf(Schema.SchemaError);
            return;
        }
    });
});