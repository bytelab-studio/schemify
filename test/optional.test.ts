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

                expect(() => validator.validate(undefined)).not.throws();
                expect(validator.validate(undefined)).toBe(undefined);
            });

            if (validatorBox == Schema.undef) {
                return;
            }

            test("throw", () => {
                const validator = validatorBox();

                expect(() => validator.validate(undefined)).throws();
            });
        });
    }
});