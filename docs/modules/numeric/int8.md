---
title: int8
---

# `Schema.int8`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `int8` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.int8();

schema.validate(-20);
schema.validate(40);
schema.validate(-321); // <-- throws SchemaError
schema.validate(321); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface Int8Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)