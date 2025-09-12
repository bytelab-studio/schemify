---
title: unknown
---

# `Schema.unknown`

## Description

Validates that a value exists (not `null` or `undefined` unless explicitly allowed) but imposes no further type
restrictions.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.unknown();

schema("abc");
schema(123);
schema(null); // <-- throws SchemaError
schema(undefined); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UnknownOptions extends RawOptions {

}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)