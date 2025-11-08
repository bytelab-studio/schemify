import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'literal' validator", () => {
    describe("reflection", () => {
        test("getChildren", () => {
            const validator = Schema.literal("wasd");
            const items: Schema.reflection.ASTChild[] = Array.from(Schema.reflection.getChildren(validator));
            expect(items.length).toBe(1);
            expect(items[0].kind).toBe(Schema.reflection.ASTChildKind.POSITIONAL);
            expect(items[0].key).toBe(0);
            expect(items[0].value).toBe("wasd");
            expect(items[0].type).toBe(Schema.reflection.ASTChildType.PRIMITIVE);
        });
    });
});