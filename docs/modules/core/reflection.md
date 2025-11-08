---
title: Plugins
---

# Reflection

The `Schema.reflection` module provides low-level introspection and inspection utilities for working with Schemify validators.

## Usage

```ts
import Schema from "@bytelab.studio/schemify";

const mySchema = Schema.any();

// later in code...
const options: Schema.AnyOptions = Schema.reflection.getOptions<Schema.AnyOptions>(mySchema);
```

## Validator Identity & Metadata

### `isValidator`

```ts
declare function isValidator(validator: UnknownValidatorFunction, module: string, name: string): boolean;
declare function isValidator(validator: UnknownValidatorFunction, id: string): boolean;
```

Check whether a validator matches a specific `module` + `name`, by either passing them seperatly or as id string with the format `"<module>.<name>"`.

### `getValidatorModule`

```ts
declare function getValidatorModule(validator: UnknownValidatorFunction): string;
```

Returns the module the validator belongs to.

```ts
import * as Schema from "@bytelab.studio/schemify";

Schema.reflection.getValidatorModule(Schema.any()), // "primitive"
Schema.reflection.getValidatorModule(Schema.list(Schema.string())) // "complex"
```

### `getValidatorName`

```ts
declare function getValidatorName(validator: UnknownValidatorFunction): string;
```

Returns the name of the validator.


```ts
import * as Schema from "@bytelab.studio/schemify";

Schema.reflection.getValidatorModule(Schema.any()), // "any"
Schema.reflection.getValidatorModule(Schema.list(Schema.string())) // "list"
```

### `getValidatorId`

```ts
declare function getValidatorId(validator: UnknownValidatorFunction): string;
```

Returns the full validator ID in `"<module>.<name>"` format

```ts
import * as Schema from "@bytelab.studio/schemify";

Schema.reflection.getValidatorModule(Schema.any()), // "core.any"
Schema.reflection.getValidatorModule(Schema.list(Schema.string())) // "complex.list"
```

## Validator configuration

### `getOptions`

```ts
declare function getOptions<Options extends RawOptions>(validator: ValidatorFunction<Options, unknown>): Options;
```

Returns the configuration of the passed validator

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.string({
    nullable: true
});

// Later...

const options: Schema.StringOptions = Schema.reflection.getOptions<Schema.StringOptions>(schema);
```


## AST Traversel

Schemify schemas form an **abstract syntax tree (AST)**. You can traverse it using the functions and types below.

### `getChildren`

```ts
declare function getChildren(validator: UnknownValidatorFunction): Generator<ASTChild>;
```

Returns a generator that yields child nodes of a given validator, if it supports children. Each yielded item conforms to the `ASTChild` type, which may represent either a validator node or a primitive value.

```ts
type ASTChild = ASTValidatorChild | ASTPrimitiveChild;
```

Represents a single child node within the AST. It can be either:
- A **validator child**, which wraps another validator.
- A **primitive child**, which wraps raw/primitive value (e.g the value from the literal validator).

---

```ts
enum ASTChildKind {
    PROPERTY,
    POSITIONAL,
    INFINITY
}
```

Describes the kind of the child's location within its parent:
- `PROPERTY`: A named key in a object schema.
- `POSITIONAL`: An indexed position a tuple like structure.
- `INFINITY`: Represents variadic or spread-like elements e.g for infinite arrays.

---

```ts
interface ASTValidatorChild {
    type: ASTChildType.VALIDATOR;
    key: string | number;
    value: UnknownValidatorFunction;
    kind: ASTChildKind;
}
```

Represents a child node that contains a nested validator.

- `type`: Always `ASTChildType.VALIDATOR`, for distinguish.
- `key`: The key or index identifying this child
- `value`: The nested validator instance.
- `kind`: The kind of the child (see `ASTChildKind`)

---

```ts
interface ASTPrimitiveChild {
    type: ASTChildType.PRIMITIVE;
    key: string | number;
    value: unknown;
    kind: ASTChildKind;
}
```

Represents a child node that contains a primitive value.

- `type`: Awalys `ASTChildType.PRIMITIVE`
- `key`: The key or index identifying this child
- `value`: The raw primitive value.
- `kind`: The kind of the child (see `ASTChildKind`)
