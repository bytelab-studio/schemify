---
title: Getting started
---

# Getting Started

Schemify is a **modular, type-safe, and tree-shakable schema validation library** for JavaScript and TypeScript.

This guide will help you quickly set up and start validating your data.

## Installation

Install Schemify via npm or yarn:

```bash
npm install @bytelab.studio/schemify
# or
yarn add @bytelab.studio/schemify
```

## Basic Usage

Import the library and create a schema:

```ts
import * as Schema from "@bytelab.studio/schemify";

// Define a schema
const userSchema = Schema.object({
    name: Schema.string(),
    age: Schema.number({min: 18})
});

userSchema.validate({name: "Alice", age: 21}); // ✅ valid
userSchema.validate({name: "Bob", age: 15});   // ❌ throws SchemaError
```

## Triggering Validation

In Schemify, the **main way to validate a value** is using the `validate` or `tryValidate` methods bound to every
validator.

### `validate(value)`

Performs validation and returns the validated value, or throws a `SchemaError` if invalid.

### `tryValidate(value)`

Performs validation and returns a boolean indicating whether the value is valid. It also acts as
a [TypeScript type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), so
TypeScript can infer the validated type when `true` is returned. Catches `SchemaError` internally but rethrows other
unexpected errors.

### Example

```ts
import * as Schema from "@bytelab.studio/schemify";

const userSchema = Schema.nested({
  name: Schema.string(),
  age: Schema.number({ min: 18 })
});

// Using validate
try {
  const user = userSchema.validate({ name: "Alice", age: 21 }); // ✅ returns object
  userSchema.validate({ name: "Bob", age: 15 }); // ❌ throws SchemaError
} catch (err) {
  console.error(err.message);
}

// Using tryValidate as a type guard
const input: unknown = { name: "Alice", age: 21 };

if (userSchema.tryValidate(input)) {
  // TypeScript knows input is of type { name: string; age: number }
  console.log(input.name); // ✅ safe
} else {
  console.log("Invalid input");
}
```

## Type Inference

Schemify automatically infers TypeScript types from your schemas:

```ts
import * as Schema from "@bytelab.studio/schemify";

const userSchema = Schema.nested({
    name: Schema.string(),
    age: Schema.number({min: 18})
});

type User = Schema.InferSchema<typeof userSchema>;
/* Generates

type User = {
    name: string;
    age: number;
}

 */
```

## Creating Complex Schemas

You can easily create and validate complex schemas:

```ts
import * as Schema from "@bytelab.studio/schemify";

const complexSchema = Schema.nested({
    user: Schema.nested({
        name: Schema.string(),
        age: Schema.number({min: 18}),
        location: Schema.string({optional: true})
    }),
    isActive: Schema.boolean()
});

complexSchema.validate({
    user: {
        name: "Alice",
        age: 30
    },
    isActive: true
}); // ✅ valid
complexSchema.validate({
    user: {
        name: "Bob",
        age: 43,
        location: "Tokyo"
    },
    isActive: false
}); // ✅ valid

type Complex = Schema.InferSchema<typeof complexSchema>;
/* Generates

type Complex = {
    user: {
        name: string;
        age: number;
        location: string | undefined;  
    },
    isActive: boolean;
}

 */
```

Or split it in a more convenient way:

```ts
import * as Schema from "@bytelab.studio/schemify";

function user() {
    return Schema.nested({
        name: Schema.string(),
        age: Schema.number({min: 18}),
        location: Schema.string({optional: true})
    });
}

const complexSchema = Schema.nested({
    user: user(),
    isActive: Schema.boolean()
});
```

## Handling Validation Errors

All validation failures throw a [`SchemaError`](/modules/core/schemaError)

```ts
import * as Schema from "@bytelab.studio/schemify";

const userSchema = Schema.nested({
    name: Schema.string(),
    age: Schema.number({min: 18})
});

try {
    userSchema.validate({name: "Bob", age: 15});
} catch (e) {
    if (e instanceof Schema.SchemaError) {
        console.log(e.message);
    }
}
```

[`SchemaError`](/modules/core/schemaError) provides **path-aware messages** for nested schemas.

## Next Steps

- Explorer all [Validators](/modules/)