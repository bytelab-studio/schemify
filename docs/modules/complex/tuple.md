---
title: tuple
---

# `Schema.tuple`

## Description

Validates that the provided value is an array with a fixed length, where each item is validated by its corresponding
validator in the tuple.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.tuple([Schema.string(), Schema.number()]);

schema.validate(["abc", 123]);
schema.validate([123, "abc"]); // throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface TupleOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)