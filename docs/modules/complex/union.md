---
title: union
---

# `Schema.union`

## Description

Validates that the provided value matches at least one of the given validators in the union.
Follows a first-match-return principle: the validators are checked in order, and validation stops as soon as one
validator passes. For example, in `[Schema.any(), Schema.number()]`, if the value is `123`, the `Schema.number`
validator is not called because `Schema.any` already succeeds.

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.union([Schema.string(), Schema.number()]);

schema.validate("hello");
schema.validate(123);
```

## Options

This validator does not define any options.

### Definition

```ts
export interface UnionOptions extends RawOptions {

}
```

## Hierarchy

- [Schema.raw](/modules/core/raw)