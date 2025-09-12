---
title: never
---

# `Schema.never`

## Description

A validator that always fails when the value exists.
This is useful for explicitly disallowing certain fields in a schema.

## Usage
```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.never();

schema.validate(123); // <-- throws SchemaError
schema.validate("abc"); // <-- throws SchemaError
schema.validate(undefined) // <-- throws SchemaError
```

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.nested({
    protectedProp: Schema.never()
});

schema.validate({});
schema.validate({protectedProp: 123}); // <-- throws SchemaError
schema.validate({protectedProp: undefined}); // <-- throws SchemaError
```

## Options

This validator does not define any options.

::: info
`Schema.never` is the only Validator that don't extend from [`Schema.raw`](/modules/core/raw)
:::
