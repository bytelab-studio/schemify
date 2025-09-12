---
title: SchemaError
---

# `SchemaError`

`SchemaError` is the error type thrown by Schemify validators when a value fails validation. It extends the native
JavaScript `Error` object and includes additional context to help pinpoint the source of the error.

## Constructor

```ts
declare class SchemaError {
    public constructor(message: string, ctx: ValidatorContext);
}

```

### Parameters

| Parameter | Type                                                 | Description                                                                               |
|-----------|------------------------------------------------------|-------------------------------------------------------------------------------------------|
| `message` | `string`                                             | The error message describing what went wrong.                                             |
| `ctx`     | [`ValidatorContext`](/modules/core/validatorContext) | Context information for the validation, including the current path within nested schemas. |

## Behavior

If a nested validation is proceeded the error message is automatically prefixed with the validation path:

```
someField.someSubField: Expected to be a string
```

Otherwise, the error message is used as-is:

```
Expected to be a string
```

## Notes

- Use `SchemaError` to catch validation failures specifically.
- Provides **path-aware messages** to make debugging nested schemas easier.
- Some validators, such as [`Schema.union`](/modules/complex/union), specifically react to `SchemaError`.  
  If another type of error is thrown during validation, it is treated as a **fatal error** and immediately stops the
  validation process.