import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'record' validator", () => {
    describe("reflection", () => {
        test("getChildren", () => {
            const validator = Schema.record(Schema.string(), Schema.number());
            const items: Schema.reflection.ASTChild[] = Array.from(Schema.reflection.getChildren(validator));
            expect(items.length).toBe(2);
            expect(items[0].kind).toBe(Schema.reflection.ASTChildKind.POSITIONAL);
            expect(items[0].key).toBe(0);
            expect(items[0].value).toBeDefined();
            expect(Schema.reflection.isValidator(items[0].value as any, "primitive.string")).toBe(true);
            expect(items[0].type).toBe(Schema.reflection.ASTChildType.VALIDATOR);
        
            expect(items[1].kind).toBe(Schema.reflection.ASTChildKind.POSITIONAL);
            expect(items[1].key).toBe(1);
            expect(items[1].value).toBeDefined();
            expect(Schema.reflection.isValidator(items[1].value as any, "primitive.number")).toBe(true);
            expect(items[1].type).toBe(Schema.reflection.ASTChildType.VALIDATOR);
        });
    });
});