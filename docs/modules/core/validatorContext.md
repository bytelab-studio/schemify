---
title: ValidatorContext
---

# `ValidatorContext`

`ValidatorContext` holds contextual information during validation. It tracks the **path of nested properties** being
validated and whether a value previously existed in the schema. This context is used internally by validators and by
[`SchemaError`](/modules/core/schemaError) to produce informative error messages.

## Constructor

```ts
declare class ValidatorContext {
    public constructor();
    public constructor(existed: boolean);
}
```

### Parameters

| Parameter | Type                   | Description                                                                                             |
|-----------|------------------------|---------------------------------------------------------------------------------------------------------|
| `existed` | `boolean \| undefined` | Whether the property existed in the object (distinguishes missing vs. `undefined`). Defaults to `true`. |

## Methods

### `createChild`

```ts
declare class ValidatorContext {
    public createChild(name: string | number, existed: boolean): ValidatorContext;
}
```

Creates a new `ValidatorContext` as a child of the current context, appending the given `name` to the validation path.

````ts
const childContext = parentContext.createChild("fieldName", true);
````

## Properties

| Property      | Type      | Description                                                                          |
|---------------|-----------|--------------------------------------------------------------------------------------|
| `get path`    | `string`  | Dot-separated path of the current context in nested schemas.                         |
| `get hasPath` | `boolean` | Returns `true` if the context has any path elements.                                 |
| `get existed` | `boolean` | Indicates the property existed in the object (distinguishes missing vs. `undefined`) |
