---
title: datetimeISO
---

# `Schema.datetimeISO`

## Description

Validates a **ISO 8601** datetime string. By default using the `YYYY-MM-DDThh:mm:ss` format.

The format is a combination of `<dateISO>T<timeISO>[<offset>]`

### Format variables

| Variable | Value   | Description                            |
|----------|---------|----------------------------------------|
| `hh`     | 00 - 24 | Hours in 24-format                     |
| `mm`     | 00 - 59 | Minutes                                |
| `:`      | &#8211; | Allowed separator between two variable |
| `Z`      | &#8211; | UTC timezone                           |
| `T`      | &#8211; | Delimiter between date and time format |

## Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.datetimeISO();

schema.validate("2025-09-14T12:34:56");
```

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.datetimeISO({
    format: "YYYY-MM-DDThh:mm+hh:mm"
});

schema.validate("2025-09-14T12:34:56+12:00");
```

## Options

| Options  | Type     | Default      | Description                               |
|----------|----------|--------------|-------------------------------------------|
| `format` | `string` | `"hh:mm:ss"` | A **ISO 8601** compatible datetime format |

### Definition

```ts
export interface DatetimeISOOptions extends PatternOptions {
    format?: string;
}
```

## Hierarchy

- [Schema.pattern](/modules/complex/pattern)
- [Schema.string](/modules/primitive/string)
- [Schema.raw](/modules/core/raw)