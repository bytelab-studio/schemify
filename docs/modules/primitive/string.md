---
title: string
---

# `Schema.string`

## Description

Validates that the provided value is a `string`. Supports enforcing minimum and maximum length constraints.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.string();

schema.validate("hello");
schema.validate("");
```

## Options

| Options     | Type     | Default     | Description                   |
|-------------|----------|-------------|-------------------------------|
| `minLength` | `number` | `undefined` | Minimum length of the string. |
| `maxLength` | `number` | `undefined` | Maximum length of the string. |

### Definition

```ts
export interface StringOptions extends RawOptions {
    minLength?: number;
    maxLength?: number;
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)