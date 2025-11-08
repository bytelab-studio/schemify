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

    describe("reflection", () => {
        test("getChildren", () => {
            const validator = Schema.list(Schema.bigint());
            const items: Schema.reflection.ASTChild[] = Array.from(Schema.reflection.getChildren(validator));
            expect(items.length).toBe(1);
            expect(items[0].kind).toBe(Schema.reflection.ASTChildKind.INFINITY);
            expect(items[0].key).toBe(0);
            expect(items[0].value).toBeDefined();
            expect(Schema.reflection.isValidator(items[0].value as any, "primitive.bigint")).toBe(true);
            expect(items[0].type).toBe(Schema.reflection.ASTChildType.VALIDATOR);
        });
    });
});