---
title: list
---

# `Schema.list`

## Description

Validates that the provided value is an array whose items are validated by the given item validator. Supports enforcing
minimum and maximum length constraints.

If the layout of the array is not important and item validation is not needed,
use [Schema.array](/modules/primitive/array) instead.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.list(Schema.number());

schema.validate([1, 2, 3]);
schema.validate([1, "abc"]); // <-- throws SchemaError
```

## Options

| Options     | Type     | Default     | Description                  |
|-------------|----------|-------------|------------------------------|
| `minLength` | `number` | `undefined` | Minimum length of the array. |
| `maxLength` | `number` | `undefined` | Maximum length of the array. |

### Definition

```ts
export interface ListOptions extends RawOptions {
    minLenght?: number;
    maxLenght?: number;
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)