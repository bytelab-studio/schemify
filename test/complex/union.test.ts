import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'union' validator", () => {
    test("empty list -> throws", () => {
        expect(() => Schema.union([])).throws();
    });

    test("error is rethrown", () => {
        const validator = Schema.union([Schema.raw(() => {
            throw new Error("Not a SchemaError")
        })]);
        expect(() => validator(0)).throws("");
        try {
            validator(0);
        } catch (e) {
            expect(e).not.instanceOf(Schema.SchemaError);
            return;
        }
    });
});