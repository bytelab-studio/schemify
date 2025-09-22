---
title: plugin
---

# `Schema.plugin`

## Description

Applies one or more AST plugins to a validator. Each plugin can modify the validator or attach metadata during schema
creation. Plugins are applied in the order provided, and each receives its configured arguments.

:::info
On first site `Schema.plugin` looks like a validator, which is a false conclusion.
`Schema.plugin` only applies the defined AST plugins on the schema and then returns the validator as-is. Therefore it
does not inherit from [`Schema.raw`](/modules/core/raw).
:::

[More about plugins](/plugins)

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";
import {OpenAPI} from "@bytelab-studio/schemify-openapi";

/**
 * Returns a validator and register
 * the Schema as OpenAPI spec Schema
 */
function user() {
    return Schema.plugin(Schema.nested({
        name: Schema.string(),
        age: Schema.number()
    }), OpenAPI("UserSchema"));
}

```