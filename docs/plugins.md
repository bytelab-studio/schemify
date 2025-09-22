---
title: Plugins
---

# Plugins

Schemify plugins allow you to **extend the behavior of validators**. They can attach metadata, or integrate with
external systems (e.g., OpenAPI generation, logging, custom formats). Plugins are applied to validators at the **AST
stage** and/or **runtime**.

## What is a plugin?

A plugin is a small, reusable piece of logic that can enhance validators. Key points:

- Plugins can act at runtime during validation (runtime plugins).
- Plugins can store metadata on a validator via a private symbol.
- AST plugins are activated via a factory function.

### Example Use Cases

- Adding OpenAPI metadata to a schema.
- Logging validation events.

## Defining a Plugin

Every required function and plugin utilities for defining plugins exists in the `Schema.pluginTools` namespace.

1. Use `registerPlugin` to define a plugin. It returns:
    - A `symbol` for storing metadata.
    - An **activator function** to configure and apply the AST plugin.

```ts
import Schema from "@bytelab.studio/schemify";

const [metadata, MyPlugin] = Schema.pluginTools.registerPlugin({
    name: "my-plugin", // must be unique
    onPlugin(root: Schema.ValidatorFunction<Schema.RawOptions, unknown>): void {
        // AST plugin
    },
    onValidation(validator: Schema.ValidatorFunction<Schema.RawOptions, unknown>): void {
        // Runtime plugin
    }
});

export {MyPlugin}
```

Both `onPlugin` and `onValidation` are optional, and need only to be defined when the plugin wants to focus that scope.

## Using a Plugin

Runtime plugins are applied automatically to each validator once registered. There always called before the actual
validation process starts. For example even when [`Schema.never`](/modules/primitive/never) gets called **all runtime
plugins** are executed and then the validation process fails, if the property exist.

On the other hand AST plugins are required to be explicit activated through [`Schema.plugin`](/modules/core/plugin) and
there activation function.

```ts
import Schema from "@bytelab.studio/schemify";
import {MyPlugin} from "my-plugin";

const validator = Schema.plugin(Schema.nested({
    name: Schema.string()
}), MyPlugin());
```

:::info
Functions can also be activated by passing a `PluginOptions` object as parameter. This is **not** recommended as
standard procedure, because of leaking type guards it is very error-prone and vulnerable to plugin name misspelling.

```ts
import Schema from "@bytelab.studio/schemify";
import {MyPlugin} from "my-plugin";

const validator = Schema.plugin(Schema.nested({
    name: Schema.string()
}), {
    name: "my-plugin",
    arguments: []
});
```

:::

## Define plugin parameters

Sometimes it is required to have additional configuration for an AST plugin. Therefore, it is possible to simply declare
additional arguments to the `onPlugin` callback. Those arguments definition get passed to the activation function by
TypeScript and are forwarded by the [`Schema.plugin`](/modules/core/plugin) function.

```ts
import Schema from "@bytelab.studio/schemify";

const [metadata, MyPlugin] = Schema.pluginTools.registerPlugin({
    name: "my-plugin", // must be unique
    onPlugin(
        root: Schema.ValidatorFunction<Schema.RawOptions, unknown>,
        message: string,
        repeat: number = 1
    ): void {
        for (let i = 0; i < repeat; i++) {
            console.log(message);
        }
    }
});

type MyPluginSignature = typeof MyPlugin;
/* Generates:
   type MyPluginSignature = (message: string, repeat?: number) => PluginOptions;
 */

export {MyPlugin}
```

```ts
import Schema from "@bytelab.studio/schemify";
import {MyPlugin} from "my-plugin";

const validator = Schema.plugin(Schema.nested({
    name: Schema.string()
}), MyPlugin("Hello World", 5), MyPlugin("Hello Universe"));
/* Prints:
Hello World
Hello World
Hello World
Hello World
Hello World
Hello Universe
 */
```

## Storing metadata

Schemify exposes an API to store metadata on each validator instance. Each plugin retrieves it own metadata `symbol`
when calling `registerPlugin`. This concept grants **isolated** data storage opportunity for each plugin. The following
methods can both be applied for **runtime** and **AST plugins**.

### `setData`

```ts
declare function setData<T>(plugin: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: string | number | symbol, value: T): void;
```

Can be used to set a `value` on the `validator` with the `key` in the scope of the `plugin`.

### `getData`

```ts
declare function getData<T>(plugin: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: string | number | symbol): T | null;
```

Retrieves a value of type `T` on the `validator` with the `key` in the scope of the `plugin` or else `null` if nothing
was stored in the `key` slot.

### `hasData`

```ts
declare function hasData(plugin: symbol, validator: ValidatorFunction<RawOptions, unknown>, key: string | number | symbol): boolean;
```

Determines if a slot on the `validator` with the `key` in the scope of the `plugin` exist.

---

All the functions above can be called by using `this` in the callback function.

```ts
const [metadata, MyPlugin] = Schema.pluginTools.registerPlugin({
    name: "my-plugin", // must be unique
    onValidation(validator: Schema.ValidatorFunction<Schema.RawOptions, unknown>): void {
        if (!this.hasData(metadata, validator, "called")) {
            this.setData(metadata, validator, "called", 1);
            return;
        }
        
        const called: number = this.getData(metadata, validator, "called");
        this.setData(metadata, validator, "called", called + 1);
    }
});
```