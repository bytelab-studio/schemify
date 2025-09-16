---
title: timeISO
---

# `Schema.timeISO`

## Description

Validates a **ISO 8601** time string. By default using the `hh:mm:ss` format.

### Format variables

| Variable     | Value   | Description                                            |
|--------------|---------|--------------------------------------------------------|
| `hh`         | 00 - 24 | Hours in 24-format                                     |
| `mm`         | 00 - 59 | Minutes                                                |
| `ss`         | 00 - 60 | Seconds                                                |
| `,f` \| `.f` | &#8211; | decimal fractions, usually of seconds of any precision |
| `:`          | &#8211; | Allowed separator between two variable                 |

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.timeISO();

schema.validate("12:34:56");
```

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.timeISO({
    format: "hh:mm"
});

schema.validate("12:34");
```

## Options

| Options  | Type     | Default      | Description                           |
|----------|----------|--------------|---------------------------------------|
| `format` | `string` | `"hh:mm:ss"` | A **ISO 8601** compatible time format |

### Definition

```ts
export interface TimeISOOptions extends PatternOptions {
    format?: string;
}
```

## Hierarchy

- [Schema.pattern](/modules/complex/pattern)
- [Schema.string](/modules/primitive/string)
- [Schema.raw](/modules/core/raw)