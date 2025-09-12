---
title: object
---

# `Schema.object`

## Description

Validates that the provided value is an object (but not an array).

If the layout (shape) of the object needs to be validated, use [Schema.nested](/modules/complex/nested) instead.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.object();

schema.validate({});
schema.validate({a: 1, b: 2});
schema.validate([]); // <-- throws SchemaError
schema.validate(/pattern/); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface ObjectOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)