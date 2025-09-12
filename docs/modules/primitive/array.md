---
title: array
---

# `Schema.array`

## Description

Validates that the provided value is an array. Supports enforcing minimum and maximum length constraints.

If the array items should also be validated, use the [Schema.list](/modules/complex/list) validator instead.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.array();

schema.validate([1, 2, 3]);
schema.validate([1, "2", () => {
}]);
schema.validate([]);
```

## Options

| Options     | Type     | Default     | Description                  |
|-------------|----------|-------------|------------------------------|
| `minLength` | `number` | `undefined` | Minimum length of the array. |
| `maxLength` | `number` | `undefined` | Maximum length of the array. |

### Definition

```ts
export interface ArrayOptions extends RawOptions {
    minLength?: number;
    maxLength?: number;
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)