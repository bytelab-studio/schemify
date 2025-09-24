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

    test("options are forwared", () => {
        const schema = Schema.any({
            nullable: true,
            optional: false
        });

        const options: Schema.RawOptions = Schema.reflection.getOptions(schema);
        expect(options.nullable).toBe(true);
        expect(options.optional).toBe(false);
    });
});