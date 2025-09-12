---
title: nested
---

# `Schema.nested`

## Description

Validates that the provided value is an object matching the specified schema layout, where each property is validated by
its respective validator.

If the layout of the object is not important, use [Schema.object](/modules/primitive/object) instead.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.nested({
    name: Schema.string(),
    age: Schema.number()
});

schema.validate({
    name: "John",
    age: 30
});

schema.validate({
    age: 33
}); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface NestedOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)