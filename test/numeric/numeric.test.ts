import * as Schema from "../../src";
import {describe, expect, test} from "vitest";

describe("Numeric", () => {
    describe("isInt8", () => {
        test("Valid Int8 number", () => {
            expect(Schema.Numeric.isInt8(-128)).toBe(true); // Minimum Int8 value
            expect(Schema.Numeric.isInt8(127)).toBe(true); // Maximum Int8 value
            expect(Schema.Numeric.isInt8(0n)).toBe(true); // Middle-point value
        });

        test("Fail on out of Int8 range", () => {
            expect(Schema.Numeric.isInt8(-129)).toBe(false); // One below minimum
            expect(Schema.Numeric.isInt8(128)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isInt8(1.5)).toBe(false); // Non-integer
            expect(Schema.Numeric.isInt8(Number.POSITIVE_INFINITY)).toBe(false); // Infinity
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isInt8("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt8(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt8(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt8({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt8([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isInt16", () => {
        test("Valid Int16 number", () => {
            expect(Schema.Numeric.isInt16(-32768)).toBe(true); // Minimum Int16 value
            expect(Schema.Numeric.isInt16(32767)).toBe(true); // Maximum Int16 value
            expect(Schema.Numeric.isInt16(0n)).toBe(true); // Middle-point value
        });

        test("Fail on out of Int16 range", () => {
            expect(Schema.Numeric.isInt16(-32769)).toBe(false); // One below minimum
            expect(Schema.Numeric.isInt16(32768)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isInt16(1.5)).toBe(false); // Non-integer
            expect(Schema.Numeric.isInt16(Number.POSITIVE_INFINITY)).toBe(false); // Infinity
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isInt16("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt16(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt16(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt16({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt16([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isInt32", () => {
        test("Valid Int32 number", () => {
            expect(Schema.Numeric.isInt32(-2147483648)).toBe(true); // Minimum Int32 value
            expect(Schema.Numeric.isInt32(2147483647)).toBe(true); // Maximum Int32 value
            expect(Schema.Numeric.isInt32(0n)).toBe(true); // Middle-point value
        });

        test("Fail on out of Int64 range", () => {
            expect(Schema.Numeric.isInt32(-2147483649)).toBe(false); // One below minimum
            expect(Schema.Numeric.isInt32(2147483648)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isInt32(1.5)).toBe(false); // Non-integer
            expect(Schema.Numeric.isInt32(Number.POSITIVE_INFINITY)).toBe(false); // Infinity
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isInt32("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt32(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt32(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt32({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt32([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isInt64", () => {
        test("Valid Int64 number", () => {
            expect(Schema.Numeric.isInt64(-9223372036854775808n)).toBe(true); // Minimum Int64 value
            expect(Schema.Numeric.isInt64(9223372036854775807n)).toBe(true); // Maximum Int64 value
            expect(Schema.Numeric.isInt64(0n)).toBe(true); // Middle-point value
        });

        test("Fail on out of Int64 range", () => {
            expect(Schema.Numeric.isInt64(-9223372036854775809n)).toBe(false); // One below minimum
            expect(Schema.Numeric.isInt64(9223372036854775808n)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isInt64(1.5)).toBe(false); // Non-integer
            expect(Schema.Numeric.isInt64(Number.POSITIVE_INFINITY)).toBe(false); // Infinity
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isInt64("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt64(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt64(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt64({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isInt64([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isUInt8", () => {
        test("Valid UInt8 number", () => {
            expect(Schema.Numeric.isUInt8(0)).toBe(true);
            expect(Schema.Numeric.isUInt8(255)).toBe(true); // Maximum UInt8 value
        });

        test("Fail on negative number", () => {
            expect(Schema.Numeric.isUInt8(-1)).toBe(false);
        });

        test("Fail on out of UInt8 range", () => {
            expect(Schema.Numeric.isUInt8(256)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isUInt8(1.5)).toBe(false);
            expect(Schema.Numeric.isUInt8(Number.POSITIVE_INFINITY)).toBe(false);
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isUInt8("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt8(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt8(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt8({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt8([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isUInt16", () => {
        test("Valid UInt16 number", () => {
            expect(Schema.Numeric.isUInt16(0)).toBe(true);
            expect(Schema.Numeric.isUInt16(65535)).toBe(true); // Maximum UInt16 value
        });

        test("Fail on negative number", () => {
            expect(Schema.Numeric.isUInt16(-1)).toBe(false);
        });

        test("Fail on out of UInt16 range", () => {
            expect(Schema.Numeric.isUInt16(65536)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isUInt16(1.5)).toBe(false);
            expect(Schema.Numeric.isUInt16(Number.POSITIVE_INFINITY)).toBe(false);
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isUInt16("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt16(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt16(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt16({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt16([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isUInt32", () => {
        test("Valid UInt32 number", () => {
            expect(Schema.Numeric.isUInt32(0)).toBe(true);
            expect(Schema.Numeric.isUInt32(4294967295)).toBe(true); // Maximum UInt32 value
        });

        test("Fail on negative number", () => {
            expect(Schema.Numeric.isUInt32(-1)).toBe(false);
        });

        test("Fail on out of UInt32 range", () => {
            expect(Schema.Numeric.isUInt32(4294967296)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isUInt32(1.5)).toBe(false);
            expect(Schema.Numeric.isUInt32(Number.POSITIVE_INFINITY)).toBe(false);
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isUInt32("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt32(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt32(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt32({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt32([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });

    describe("isUInt64", () => {
        test("Valid UInt64 number", () => {
            expect(Schema.Numeric.isUInt64(0)).toBe(true);
            expect(Schema.Numeric.isUInt64(18446744073709551615n)).toBe(true); // Maximum UInt64 value
        });

        test("Fail on negative number", () => {
            expect(Schema.Numeric.isUInt64(-1)).toBe(false);
        });

        test("Fail on out of UInt64 range", () => {
            expect(Schema.Numeric.isUInt64(18446744073709551616n)).toBe(false); // One above maximum
        });

        test("Fail for non-integer number", () => {
            expect(Schema.Numeric.isUInt64(1.5)).toBe(false);
            expect(Schema.Numeric.isUInt64(Number.POSITIVE_INFINITY)).toBe(false);
        });

        test("Fail for non-numeric types", () => {
            expect(Schema.Numeric.isUInt64("Some text" as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt64(null as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt64(undefined as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt64({} as unknown as Schema.NumericNumber)).toBe(false);
            expect(Schema.Numeric.isUInt64([] as unknown as Schema.NumericNumber)).toBe(false);
        });
    });
});

describe("'numeric' validator", () => {
    describe("allowNegativeZero option", () => {
        test("throws", () => {
            const validator = Schema.numeric();
            expect(() => validator.validate(-0)).throws();
        });

        test("pass", () => {
            const validator = Schema.numeric({
                allowNegativeZero: true
            });
            expect(() => validator.validate(-0)).not.throws();
        });
    });
});