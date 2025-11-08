---
title: uint64
---

# `Schema.uint64`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `uint64` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.uint64();

schema.validate(0);
schema.validate(18446744073709551615n);
schema.validate(-789); // <-- throws SchemaError
schema.validate(18446744073709551616n); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UInt64Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)