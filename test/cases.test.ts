import * as Schema from "../src";
import {describe, test, expect} from "vitest";
import {getValidators, listMock, literalMock, nestedMock, oneOfMock, tupleMock, unionMock} from "./utils";

type Case = [any, Array<(options?: Schema.RawOptions) => Schema.ValidatorFunction<Schema.RawOptions, any>>];

export const cases: Case[] = [
    ["abc", [Schema.string, unionMock, Schema.any]],
    ["", [Schema.string, unionMock, Schema.any]],
    [-123, [Schema.number, unionMock, Schema.any]],
    [123, [Schema.number, unionMock, Schema.any]],
    [-0, [Schema.number, unionMock, Schema.any]],
    [0, [Schema.number, unionMock, Schema.any]],
    [NaN, [Schema.number, unionMock, Schema.any]],
    [Infinity, [Schema.number, unionMock, Schema.any]],
    [-Infinity, [Schema.number, unionMock, Schema.any]],
    [null, [Schema.nil]],
    [undefined, [Schema.undef]],
    [false, [Schema.boolean, Schema.any]],
    [true, [Schema.boolean, Schema.any]],
    [{}, [Schema.object, Schema.any]],
    [{prop1: 123}, [Schema.object, nestedMock, Schema.any]],
    [[], [Schema.array, listMock, Schema.any]],
    [[1, 2, 3], [Schema.array, listMock, Schema.any]],
    [[1, "abc", 3], [tupleMock, Schema.array, Schema.any]],
    ["literal", [literalMock, unionMock, oneOfMock, Schema.string, Schema.any]],
    ["literal2", [unionMock, oneOfMock, Schema.string, Schema.any]],
];

function positiveTest(testString: any, validator: Schema.ValidatorFunction<Schema.RawOptions, any>): void {
    test(`'${testString}' -> pass`, () => {
        const context = new Schema.ValidatorContext();
        expect(() => validator(testString, context)).not.throws();
    });
}

function negativeTest(testString: any, validator: Schema.ValidatorFunction<Schema.RawOptions, any>): void {
    test(`'${testString}' -> throw`, () => {
        const context = new Schema.ValidatorContext();
        expect(() => validator(testString, context)).throws();
    });
}

describe("cases", () => {
    for (const validatorBox of getValidators()) {
        for (const [testString, validators] of cases) {
            const testType = validators.includes(validatorBox) ? positiveTest : negativeTest;
            const validator = validatorBox();
            describe(`'${validatorBox.name}' validator`, () => {
                testType(testString, validator);
            });
        }
    }
});
