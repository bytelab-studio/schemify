---
title: uint32
---

# `Schema.uint32`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `uint32` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.uint32();

schema.validate(0);
schema.validate(2147483647);
schema.validate(-789); // <-- throws SchemaError
schema.validate(73709551615n); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UInt32Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)