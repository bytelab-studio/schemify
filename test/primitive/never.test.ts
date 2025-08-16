import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("'never' validator", () => {
    describe("should not throw on a non existing property", () => {
        const validator = Schema.nested({
            notExist: Schema.never()
        });

        test("pass", () => {
            expect(() => validator.validate({})).not.throws();
        });

        test("throw", () => {
            expect(() => validator.validate({
                notExist: 1
            })).throws();
        });
    });

});