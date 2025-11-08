import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'oneOf' validator", () => {
    describe("reflection", () => {
        test("getChildren", () => {
            const validator = Schema.oneOf(["ab", "cd"]);
            const items: Schema.reflection.ASTChild[] = Array.from(Schema.reflection.getChildren(validator));
            expect(items.length).toBe(2);
            expect(items[0].kind).toBe(Schema.reflection.ASTChildKind.POSITIONAL);
            expect(items[0].key).toBe(0);
            expect(items[0].value).toBe("ab");
            expect(items[0].type).toBe(Schema.reflection.ASTChildType.PRIMITIVE);
        
            expect(items[1].kind).toBe(Schema.reflection.ASTChildKind.POSITIONAL);
            expect(items[1].key).toBe(1);
            expect(items[1].value).toBe("cd");
            expect(items[1].type).toBe(Schema.reflection.ASTChildType.PRIMITIVE);
        });
    });
});