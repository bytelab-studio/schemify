import {describe, test, expect} from "vitest";
import {getValidators} from "./utils";
import * as Schema from "../src";

describe("nullable", () => {
    for (const validatorBox of getValidators()) {
        if (validatorBox == Schema.never) {
            continue;
        }

        describe(`'${validatorBox.name}' validator`, () => {
            test("pass", () => {
                const validator = validatorBox({
                    nullable: true
                });

                expect(() => validator.validate(null)).not.throws();
                expect(validator.validate(null)).toBe(null);
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
