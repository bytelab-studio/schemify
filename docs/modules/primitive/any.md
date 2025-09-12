---
title: any
---

# `Schema.any`

## Description

The `any` validator accepts **any value** without type restriction, while still allowing you to enforce whether the
value can be `null` or `undefined`.
It’s useful as a fallback or when you need to skip strict type validation but still control nullability and optionality.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.any();

schema.validate(1123);
schema.validate("wasd");
schema.validate(null); // <-- throws SchemaError
schema.validate(undefined); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface AnyOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)