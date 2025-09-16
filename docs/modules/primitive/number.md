---
title: number
---

# `Schema.number`

## Description

Validates that the provided value is a `number`. Supports enforcing minimum and maximum value constraints.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.number();

schema.validate(123);
schema.validate(12.34);
schema.validate(NaN);
```

## Options

| Options            | Type      | Default     | Description                                         |
|--------------------|-----------|-------------|-----------------------------------------------------|
| `min`              | `number`  | `undefined` | Minimum allowed value.                              |
| `max`              | `number`  | `undefined` | Maximum allowed value.                              |
| `disallowInfinity` | `boolean` | `false`     | Handles `Infinity` and `-Infinity` as faulty values |
| `disallowNaN`      | `boolean` | `false`     | Handles `NaN` as a faulty value.                    |

### Definition

```ts
export interface NumberOptions extends RawOptions {
    min?: number;
    max?: number;
    disallowInfinity?: boolean;
    disallowNaN?: boolean;
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)