# Schemify Built-in Validators

This document lists all available validators grouped by module.

## Table of Contents

- [core](#core-module)
    - [Schema.raw](#schemaraw)
- [primitive](#primitive-module)
    - [Schema.any](#schemaany)
    - [Schema.array](#schemaarray)
    - [Schema.boolean](#schemaboolean)
    - [Schema.nil](#schemanil)
    - [Schema.number](#schemanumber)
    - [Schema.object](#schemaobject)
    - [Schema.string](#schemastring)
    - [Schema.symbol](#schemasymbol)
    - [Schema.undef](#schemaundef)
- [complex](#complex-module)
    - [Schema.list](#schemalist)
    - [Schema.literal](#schemaliteral)
    - [Schema.nested](#schemanested)
    - [Schema.oneOf](#schemaoneof)
    - [Schema.oneOf.enumValues](#schemaoneofenumvalues)
    - [Schema.tuple](#schematuple)
    - [Schema.union](#schemaunion)

## `core` Module

### `Schema.raw`

Creates a custom validator from scratch. You provide your own validation logic as a callback, and the schema uses that
logic to determine whether a value is valid. This is the most flexible validator and serves as the foundation for
building specialized validators.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

interface IsEvenOptions extends Schema.RawOptions {
    // define options here...
    // all options must be optional
}

function isEven<Options extends IsEvenOptions>(options?: Options): Schema.ValidatorFunction<Options, boolean> {
    return raw<Options>((value: unknown, context: Schema.ValidatorContext) => {
        // Respect flags of the RawOptions interface...

        if (typeof value !== "number") {
            throw new Schema.SchemaError("Expected a number", context);
        }

        return value % 2 == 0;
    });
}

// Mark the validator as a validator.
isEven[Schema.isValidatorSymbol] = true;
```

#### Options

| Options    | Type    | Default | Description                                       |
|------------|---------|---------|---------------------------------------------------|
| `nullable` | boolean | false   | Whether `null` is accepted as a valid value.      |
| `optional` | boolean | false   | Whether `undefined` is accepted as a valid value. |

#### Notes

- The callback functions receive:
    - `value`: The raw value to validate. Should always consider as unknown type.
    - `context`: The validator context of the current validation progression e.g., validation path in nested objects.
- Always throw a `SchemaError` if the value is invalid. Otherwise, the Error will be misinterpreted by other validators.
- Always return a value on success validation of in the generic defined type.

## `primitive` Module

### `Schema.any`

The `any` validator accepts **any value** without type restriction, while still allowing you to enforce whether the
value can be `null` or `undefined`.
It’s useful as a fallback or when you need to skip strict type validation but still control nullability and optionality.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.any();

schema(1123);
schema("wasd");
schema(null); // <-- throws SchemaError
schema(undefined); // <-- throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.array`

Validates that the provided value is an array. Supports enforcing minimum and maximum length constraints.

If the array items should also be validated, use the [Schema.list](#schemalist) validator instead.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.array();

schema([1, 2, 3]);
schema([1, "2", () => {
}]);
schema([]);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

| Options     | Type   | Default   | Description                  |
|-------------|--------|-----------|------------------------------|
| `minLength` | number | undefined | Minimum length of the array. |
| `maxLength` | number | undefined | Maximum length of the array. |

### `Schema.boolean`

Validates that the provided value is a boolean.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.boolean();

schema(false);
schema(true);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.nil`

Validates that the provided value is exactly `null`.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.nil();

schema(null);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.number`

Validates that the provided value is a number. Supports enforcing minimum and maximum value constraints.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.number();

schema(123);
schema(12.34);
schema(NaN);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

| Options | Type   | Default   | Description            |
|---------|--------|-----------|------------------------|
| `min`   | number | undefined | Minimum allowed value. |
| `max`   | number | undefined | Maximum allowed value. |

### `Schema.object`

Validates that the provided value is an object (but not an array).

If the layout (shape) of the object needs to be validated, use [Schema.nested](#schemanested) instead.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.object();

schema({});
schema({a: 1, b: 2});
schema([]); // <-- throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.regex`

Validates that the provided value is a RegExp instance.

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.regex();

schema(/abc/);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.string`

Validates that the provided value is a string. Supports enforcing minimum and maximum length constraints.

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.string();

schema("hello");
schema("");
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

| Options     | Type   | Default   | Description                   |
|-------------|--------|-----------|-------------------------------|
| `minLength` | number | undefined | Minimum length of the string. |
| `maxLength` | number | undefined | Maximum length of the string. |

### `Schema.symbol`

Validates that the provided value is of type `symbol`.

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.symbol();

schema(Symbol("hello"));
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.undef`

Validates that the provided value is exactly `undefined`.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.undef();

schema(undefined);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

## `complex` Module

### `Schema.list`

Validates that the provided value is an array whose items are validated by the given item validator. Supports enforcing
minimum and maximum length constraints.

If the layout of the array is not important and item validation is not needed, use [Schema.array](#schemaarray) instead.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.list(Schema.number());

schema([1, 2, 3]);
schema([1, "abc"]); // <-- throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

| Options     | Type   | Default   | Description                  |
|-------------|--------|-----------|------------------------------|
| `minLength` | number | undefined | Minimum length of the array. |
| `maxLength` | number | undefined | Maximum length of the array. |

### `Schema.literal`

Validates that the provided value is exactly equal to the specified literal value. Supports literals of type `string`,
`number`, `boolean`, or `bigint`.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.literal(123);

schema(123);
schema(312); // throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.nested`

Validates that the provided value is an object matching the specified schema layout, where each property is validated by
its respective validator.

If the layout of the object is not important, use [Schema.object](#schemaobject) instead.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.nested({
    name: Schema.string(),
    age: Schema.number()
});

schema({
    name: "John",
    age: 30
});

Schema({
    age: 33
}); // <-- throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.oneOf`

Validates that the provided value is exactly equal to one of the specified literal values.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.oneOf([123, "abc"]);

schema(123);
schema("abc");
schema("red"); // throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.oneOf.enumValues`

A specialized sub-function of `Schema.oneOf` that accepts a TypeScript enum and validates that the value matches one of
the enum’s values.

This validator extracts the numeric or string values from a TypeScript enum and uses Schema.oneOf internally to validate
that the input value matches one of those enum values.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

enum Color {
    Red,
    Green,
    Blue
}

const schema = Schema.oneOf.enumValues(Color);

schema(Color.Red);
```

#### Options

Inherits options from [Schema.oneOf](#schemaoneof)

This validator does not define any options.

### `Schema.tuple`

Validates that the provided value is an array with a fixed length, where each item is validated by its corresponding
validator in the tuple.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.tuple([Schema.string(), Schema.number()]);

schema(["abc", 123]);
schema([123, "abc"]); // throws SchemaError
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.

### `Schema.union`

Validates that the provided value matches at least one of the given validators in the union.
Follows a first-match-return principle: the validators are checked in order, and validation stops as soon as one
validator passes. For example, in `[Schema.any(), Schema.number()]`, if the value is `123`, the `Schema.number`
validator is not called because `Schema.any` already succeeds.

#### Usage

```typescript
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.union([Schema.string(), Schema.number()]);

schema("hello");
schema(123);
```

#### Options

Inherits options from [Schema.raw](#schemaraw)

This validator does not define any options.
