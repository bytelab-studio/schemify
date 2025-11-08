---
title: uint16
---

# `Schema.uint16`

## Description

Validates that the provided value is a `number` or `bigint` and is in bounds of a `uint16` integer

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.uint16();

schema.validate(0);
schema.validate(32145);
schema.validate(-321); // <-- throws SchemaError
schema.validate(70000); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UInt16Options extends NumericOptions {
    
}
```

## Hierarchy

- [Schema.numeric](/modules/numeric/numeric)
- [Schema.union](/modules/complex/union)
- [Schema.raw](/modules/core/raw)