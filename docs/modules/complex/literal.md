---
title: literal
---

# `Schema.literal`

## Description

Validates that the provided value is exactly equal to the specified literal value. Supports literals of type `string`,
`number`, `boolean`, or `bigint`.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.literal(123);

schema.validate(123);
schema.validate(312); // throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface LiteralOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)