---
title: instanceOf
---

# `Schema.instanceOf`

## Description

Validates that a value is an instance of a given class or constructor function.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.instanceOf(Date);

schema.validate(new Date());
schema.validate(new Map()); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface InstanceOfOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)