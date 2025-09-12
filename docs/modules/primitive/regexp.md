---
title: regexp
---

# `Schema.regexp`

## Description

Validates that the provided value is a RegExp instance.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.regexp();

schema.validate(/abc/);
```

## Options

This validator does not define any options.

### Definition

```ts
export interface RegexpOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)