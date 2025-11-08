---
title: int64
---

# `Schema.int64`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `int64` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.int64();

schema.validate(-92233720375808n);
schema.validate(9272036854775807n);
schema.validate(-9223372036854775809n); // <-- throws SchemaError
schema.validate(9223372036854775808n);  // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface Int64Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)