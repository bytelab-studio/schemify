import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'pattern' validator", () => {
    describe("minLength option", () => {
        const validator = Schema.pattern(/\w+/, {
            minLength: 5
        });

        test("throws", () => {
            expect(() => validator.validate("abc")).throws();
        });

        test("pass", () => {
            expect(() => validator.validate("abcdef")).not.throws();
        });
    });

    describe("maxLength option", () => {
        const validator = Schema.pattern(/\w+/, {
            maxLength: 5
        });

        test("throws", () => {
            expect(() => validator.validate("abcdef")).throws();
        });

        test("pass", () => {
            expect(() => validator.validate("abc")).not.throws();
        });
    });

    describe("reflection", () => {
        test("getChildren", () => {
            const validator = Schema.pattern(/[A-Z]+/);
            const items: Schema.reflection.ASTChild[] = Array.from(Schema.reflection.getChildren(validator));
            expect(items.length).toBe(1);
            expect(items[0].kind).toBe(Schema.reflection.ASTChildKind.POSITIONAL);
            expect(items[0].key).toBe(0);
            expect(items[0].value).toBeInstanceOf(RegExp);
            expect(items[0].type).toBe(Schema.reflection.ASTChildType.PRIMITIVE);
        });
    });
});