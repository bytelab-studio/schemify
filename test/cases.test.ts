import * as Schema from "../src";
import {describe, test, expect} from "vitest";
import {
    Enum,
    getValidators, instanceOfMock,
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
    ["abc", [Schema.string, unionMock, Schema.any, Schema.unknown]],
    ["", [Schema.string, unionMock, Schema.any, Schema.unknown]],
    [-123, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [123, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [-0, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [0, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [NaN, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [Infinity, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [-Infinity, [Schema.number, unionMock, Schema.any, Schema.unknown]],
    [null, [Schema.nil]],
    [undefined, [Schema.undef]],
    [false, [Schema.boolean, Schema.any, Schema.unknown]],
    [true, [Schema.boolean, Schema.any, Schema.unknown]],
    [{}, [Schema.object, recordMock, Schema.any, Schema.unknown]],
    [{prop1: 123}, [Schema.object, nestedMock, Schema.any, Schema.unknown]],
    [[], [Schema.array, listMock, Schema.any, Schema.unknown]],
    [[1, 2, 3], [Schema.array, listMock, Schema.any, Schema.unknown]],
    [[1, "abc", 3], [tupleMock, Schema.array, Schema.any, Schema.unknown]],
    ["literal", [literalMock, unionMock, oneOfMock, Schema.string, Schema.any, Schema.unknown]],
    ["literal2", [unionMock, oneOfMock, Schema.string, Schema.any, Schema.unknown]],
    [Enum.A, [unionMock, oneOfEnumMock, Schema.string, Schema.any, Schema.unknown]],
    [Enum.B, [unionMock, oneOfEnumMock, Schema.string, Schema.any, Schema.unknown]],
    [Symbol("symbol"), [Schema.symbol, Schema.any, Schema.unknown]],
    [/regexp/, [Schema.regexp, Schema.any, Schema.unknown]],
    [-123n, [Schema.bigint, Schema.any, Schema.unknown]],
    [123n, [Schema.bigint, Schema.any, Schema.unknown]],
    [-0n, [Schema.bigint, Schema.any, Schema.unknown]],
    [0n, [Schema.bigint, Schema.any, Schema.unknown]],
    ["pattern", [unionMock, patternMock, Schema.string, Schema.any, Schema.unknown]],
    [() => {}, [Schema.callable, Schema.any, Schema.unknown]],
    [function () {}, [Schema.callable, Schema.any, Schema.unknown]],
    [new Date(), [Schema.object, instanceOfMock, recordMock, Schema.any, Schema.unknown]]
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
