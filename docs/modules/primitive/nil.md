---
title: nil
---

# `Schema.nil`

## Description

Validates that the provided value is exactly `null`.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.nil();

schema.validate(null);
```

## Options

This validator does not define any options.

### Definition

```ts
export interface NilOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)