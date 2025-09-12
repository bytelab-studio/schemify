---
title: record
---

# `Schema.record`

## Description

Validates that the provided value is a plain object whose keys and values both match the given validators.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.record(Schema.string(), Schema.number());

schema.validate({
    a: 1,
    b: 2,
    c: 3
});

schema.validate({
    a: 1,
    b: 2,
    c: "3"
}); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface RecordOptions extends ObjectOptions {
    
}
```

## Hierarchy

- [Schema.object](/modules/primitive/object)
- [Schema.raw](/modules/core/raw)