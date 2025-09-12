---
title: callable
---

# `Schema.callable`

## Description

Validates that the value is a JavaScript `function`.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.callable();

schema.validate(() => {});
schema.validate(function () {});
```

## Options

This validator does not define any options.

### Definition

```ts
export interface CallableOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)