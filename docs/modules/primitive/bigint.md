---
title: bigint
---

# `Schema.bigint`

## Description

Validates that the provided value is a JavaScript `bigint`.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.bigint();

schema.validate(123n);
```

## Options

| Options | Type     | Default     | Description            |
|---------|----------|-------------|------------------------|
| `min`   | `bigint` | `undefined` | Minimum allowed value. |
| `max`   | `bigint` | `undefined` | Maximum allowed value. |

### Definition

```ts
export interface BigIntOptions extends RawOptions {
    min?: bigint;
    max?: bigint;
}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)