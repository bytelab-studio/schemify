---
title: pattern
---

# `Schema.pattern`

## Description

Validates that a string matches a given regular expression.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.pattern(/abc/);

schema.validate("abc");
schema.validate("123"); // <-- throws SchemaError
```

## Options

This validator does not define any options.

### Definition

```ts
export interface PatternOptions extends StringOptions {

}
```

## Hierarchy

- [Schema.string](/modules/primitive/string)
- [Schema.raw](/modules/core/raw)