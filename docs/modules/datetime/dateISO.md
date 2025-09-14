---
title: dateISO
---

# `Schema.dateISO`

## Description

Validates a **ISO 8601** date string. By default using the `YYYY-MM-DD` pattern.

### Format variables

| Variable | Value       | Description                                                                |
|----------|-------------|----------------------------------------------------------------------------|
| `YYYY`   | 0000 - 9999 | Full-Year                                                                  |
| `MM`     | 01 - 12     | Month                                                                      |
| `Www`    | 01 - 53     | Week of the Year                                                           |
| `D`      | 1 - 7       | Day of the Week. `1` is Monday, `7` is Sunday                              |
| `DD`     | 1 - 7       | Day of the Month. Validates not if the month has `31` or `30` or `28` days |
| `DDD`    | 001 - 366   | Day of the Year. Validates not if the year is a leap year                  |
| `-`      | &#8211;     | Allowed separator between two variable                                     |

## Usage

```ts-vue
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.dateISO();
schema.validate("{{ new Date().getFullYear() }}-{{ new Date().getMonth() + 1 }}-{{ new Date().getDate() }}");
```

```ts-vue
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.dateISO({
    format: "YYYYMMDD"
});
schema.validate("{{ new Date().getFullYear() }}{{ new Date().getMonth() + 1 }}{{ new Date().getDate() }}");
```

## Options

| Options  | Type     | Default      | Description                           |
|----------|----------|--------------|---------------------------------------|
| `format` | `string` | `YYYY-MM-DD` | A **ISO 8601** compatible date format |

### Definition

```ts
export interface DateISOOptions extends PatternOptions {

}
```

## Hierarchy

- [Schema.pattern](/modules/complex/pattern)
- [Schema.string](/modules/primitive/string)
- [Schema.raw](/modules/core/raw)