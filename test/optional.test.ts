import {describe, test, expect} from "vitest";
import {getValidators} from "./utils";
import * as Schema from "../src";

describe("optional", () => {
    for (const validatorBox of getValidators()) {
        if (validatorBox == Schema.never) {
            continue;
        }

        describe(`'${validatorBox.name}' validator`, () => {
            test("pass", () => {
                const validator = validatorBox({
                    optional: true
                });

                const context = new Schema.ValidatorContext();
                expect(() => validator(undefined, context)).not.throws();
                expect(validator(undefined, context)).toBe(undefined);
            });

            if (validatorBox == Schema.undef) {
                return;
            }

            test("throw", () => {
                const validator = validatorBox();

                const context = new Schema.ValidatorContext();
                expect(() => validator(undefined, context)).throws();
            });
        });
    }
});