---
title: Numeric
---

# Numeric

```typescript
type NumericNumber = number | bigint;
```

The `NumericNumber` type represents an integer value that can either be a JavaScript `number` or a `bigint`.

## Validation Functions

The namespace includes several utility functions to validate if a `NumericNumber` falls within the ranges of specific
integer types. Here is a summary of these functions:

| Function   | Description                          | Range                                             |
|------------|--------------------------------------|---------------------------------------------------|
| `isInt8`   | Validates an 8-bit signed integer.   | `-128` to `127`                                   |
| `isInt16`  | Validates a 16-bit signed integer.   | `-32768` to `32767`                               |
| `isInt32`  | Validates a 32-bit signed integer.   | `-2147483648` to `2147483647`                     |
| `isInt64`  | Validates a 64-bit signed integer.   | `-9223372036854775808n` to `9223372036854775807n` |
| `isUInt8`  | Validates an 8-bit unsigned integer. | `0` to `255`                                      |
| `isUInt16` | Validates a 16-bit unsigned integer. | `0` to `65535`                                    |
| `isUInt32` | Validates a 32-bit unsigned integer. | `0` to `4294967295`                               |
| `isUInt64` | Validates a 64-bit unsigned integer. | `0` to `18446744073709551615n`                    |

Each of these functions combines integer validation with range checks to ensure compliance with the type's constraints.

## Example

```typescript
import Schema from "@bytelab.studio/schemify";

if (Schema.Numeric.isUInt8(120)) {
    console.log("120 is in bounds of UInt8");
}

if (!Schema.Numeric.isUInt8(256)) {
    console.log("256 is not in bounds of UInt8");
}
```