---
title: numeric
---

# `Schema.numeric`

## Description

Validates that the provided value is of type `number` or `bigint` and a valid integer.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.numeric();

schema.validate(123n);
schema.validate(-123n);
schema.validate(456);
schema.validate(-456);
schema.validate(2.41); // <-- throws SchemaError
schema.validate(-3.14); // <-- throws SchemaError
```

## Options

| Options             | Type      | Default     | Description                     |
|---------------------|-----------|-------------|---------------------------------|
| `allowNegativeZero` | `boolean` | `undefined` | Handles `-0` as a valid integer |

### Definition

```ts
export interface NumericOptions extends UnionOptions {
    allowNegativeZero?: boolean;
}
```

## Hierarchy

- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)