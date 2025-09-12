---
title: oneOf
---

# `Schema.oneOf`

## Description

Validates that the provided value is exactly equal to one of the specified literal values.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.oneOf([123, "abc"]);

schema.validate(123);
schema.validate("abc");
schema.validate("red"); // throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface OneOfOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)
