import * as Schema from "../src";
import {describe, test, expect} from "vitest";
import {
    Enum,
    getValidators,
    listMock,
    literalMock,
    nestedMock,
    oneOfEnumMock,
    oneOfMock, patternMock, recordMock,
    tupleMock,
    unionMock
} from "./utils";

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
    [{}, [Schema.object, recordMock, Schema.any]],
    [{prop1: 123}, [Schema.object, nestedMock, Schema.any]],
    [[], [Schema.array, listMock, Schema.any]],
    [[1, 2, 3], [Schema.array, listMock, Schema.any]],
    [[1, "abc", 3], [tupleMock, Schema.array, Schema.any]],
    ["literal", [literalMock, unionMock, oneOfMock, Schema.string, Schema.any]],
    ["literal2", [unionMock, oneOfMock, Schema.string, Schema.any]],
    [Enum.A, [unionMock, oneOfEnumMock, Schema.string, Schema.any]],
    [Enum.B, [unionMock, oneOfEnumMock, Schema.string, Schema.any]],
    [Symbol("symbol"), [Schema.symbol, Schema.any]],
    [/regexp/, [Schema.regexp, Schema.any]],
    [-123n, [Schema.bigint, Schema.any]],
    [123n, [Schema.bigint, Schema.any]],
    [-0n, [Schema.bigint, Schema.any]],
    [0n, [Schema.bigint, Schema.any]],
    ["pattern", [unionMock, patternMock, Schema.string, Schema.any]],
];

function valueToString(value: unknown): string {
    if (typeof value == "symbol") {
        return value.toString();
    }
    if (typeof value == "object" && value !== null) {
        return JSON.stringify(value);
    }

    return `${value}`;
}

function positiveTest(testString: any, validator: Schema.ValidatorFunction<Schema.RawOptions, any>): void {
    const key: string = valueToString(testString);

    test(`'${key}' -> pass`, () => {
        const context = new Schema.ValidatorContext();
        expect(() => validator(testString, context)).not.throws();
    });
}

function negativeTest(testString: any, validator: Schema.ValidatorFunction<Schema.RawOptions, any>): void {
    const key: string = valueToString(testString);

    test(`'${key}' -> throw`, () => {
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
