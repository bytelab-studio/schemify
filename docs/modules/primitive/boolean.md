---
title: boolean
---

# `Schema.boolean`

## Description

Validates that the provided value is a `boolean`.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.boolean();

schema.validate(false);
schema.validate(true);
```

## Options

This validator does not define any options.

### Definition

```ts
export interface BooleanOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)