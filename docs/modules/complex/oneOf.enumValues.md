---
title: oneOf.enumValues
---

# `Schema.oneOf.enumValues`

## Description

A specialized sub-function of `Schema.oneOf` that accepts a TypeScript enum and validates that the value matches one of
the enum’s values.

This validator extracts the numeric or string values from a TypeScript enum and uses Schema.oneOf internally to validate
that the input value matches one of those enum values.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

enum Color {
    Red,
    Green,
    Blue
}

const schema = Schema.oneOf.enumValues(Color);

schema.validate(Color.Red);
```

## Options

This validator does not define any options.

### Definition

```ts
export interface EnumValuesOptions extends OneOfOptions {
    
}
```

## Hierarchy

- [Schema.oneOf](/modules/complex/oneOf)
- [Schema.raw](/modules/core/raw)