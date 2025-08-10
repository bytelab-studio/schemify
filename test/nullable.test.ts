import {describe, test, expect} from "vitest";
import {getValidators} from "./utils";
import * as Schema from "../src";

describe("nullable", () => {
    for (const validatorBox of getValidators()) {
        describe(`'${validatorBox.name}' validator`, () => {
            test("pass", () => {
                const validator = validatorBox({
                    nullable: true
                });

                const context = new Schema.ValidatorContext();
                expect(() => validator(null, context)).not.throws();
                expect(validator(null, context)).toBe(null);
            });

            if (validatorBox == Schema.nil) {
                return;
            }

            test("throw", () => {
                const validator = validatorBox();

                const context = new Schema.ValidatorContext();
                expect(() => validator(null, context)).throws();
            });
        });
    }
});
