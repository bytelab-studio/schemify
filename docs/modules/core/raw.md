---
title: raw
---

# `Schema.raw`

## Description

Creates a custom validator from scratch. You provide your own validation logic as a callback, and the schema uses that
logic to determine whether a value is valid. This is the most flexible validator and serves as the foundation for
building specialized validators.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

// Extends RawOptions
export interface IsEvenOptions extends Schema.RawOptions {
    // define options here...
    // all options must be optional
}

export function isEven<Options extends IsEvenOptions>(options?: Options): Schema.ValidatorFunction<Options, boolean> {
    // Initialize options
    options = options ?? {} as Options

    return Schema.raw<Options>((value: NonNullable<unknown>, context: Schema.ValidatorContext) => {
        // Respect flags of the RawOptions interface...

        if (typeof value !== "number") {
            throw new Schema.SchemaError("Expected a number", context);
        }

        return value % 2 == 0;
    }, isEven, options);
}

isEven.module = "MyModule";
// Mark the validator as a validator.
isEven[Schema.isValidatorSymbol] = true;
```

#### Notes

- The callback functions receive:
    - `value`: The raw value to validate. Should always consider as unknown type that is not `null` or `undefined`.
    - `context`: The validator context of the current validation progression e.g., validation path in nested objects.
- Always throw a [`SchemaError`](/modules/core/schemaError) if the value is invalid. Otherwise, the Error will be misinterpreted by other validators.
- Always return a value on success validation of in the generic defined type.

## Options

| Options    | Type      | Default     | Description                                       |
|------------|-----------|-------------|---------------------------------------------------|
| `nullable` | `boolean` | `undefined` | Whether `null` is accepted as a valid value.      |
| `optional` | `boolean` | `undefined` | Whether `undefined` is accepted as a valid value. |

### Definition

```ts
export interface RawOptions {
    nullable?: boolean;
    optional?: boolean;
}
```