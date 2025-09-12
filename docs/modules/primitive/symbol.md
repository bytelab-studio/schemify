---
title: symbol
---

# `Schema.symbol`

## Description

Validates that the provided value is of type `symbol`.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.symbol();

schema(Symbol("hello"));
```

## Options

This validator does not define any options.

### Definition

```ts
export interface SymbolOptions extends RawOptions {
    
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)