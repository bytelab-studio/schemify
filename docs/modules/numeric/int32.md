---
title: int32
---

# `Schema.int32`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `int32` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.int32();

schema.validate(-0xCAFFE00);
schema.validate(0xCAFFE00);
schema.validate(-0xAFFEAFFE1234n); // <-- throws SchemaError
schema.validate(0xAFFEAFFE1234n);  // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface Int32Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)