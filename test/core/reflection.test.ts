import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("reflection", () => {
    test("validator id construction and destruction works", () => {
        const schema = Schema.any();
        const schemaId: string = Schema.reflection.getValidatorId(schema);
        expect(schemaId).toBe("primitive.any");
        expect(Schema.reflection.isValidator(schema, schemaId)).toBe(true);
        expect(Schema.reflection.getValidatorModule(schema)).toBe(Schema.reflection.Modules.Primitive);
        expect(Schema.reflection.getValidatorName(schema)).toBe("any");
    });
});