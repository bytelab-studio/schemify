---
title: int16
---

# `Schema.int16`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `int16` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.int16();

schema.validate(-1555);
schema.validate(2222);
schema.validate(-12345); // <-- throws SchemaError
schema.validate(54321); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface Int16Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)