---
title: uint8
---

# `Schema.uint8`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `uint8` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.uint8();

schema.validate(0);
schema.validate(40);
schema.validate(-321); // <-- throws SchemaError
schema.validate(321); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UInt8Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)