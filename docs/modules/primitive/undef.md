---
title: undef 
---

# `Schema.undef`

## Description

Validates that the provided value is exactly `undefined`.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.undef();

schema.validate(undefined);
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UndefOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)