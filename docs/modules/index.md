---
title: Modules
---

# Modules

Schemify organizes functionality into **modules**. Each module groups together a set of validators or helpers that serve
a common purpose. This makes the library easier to extend, navigate, and use in real projects.

Note that the module structure is purely organizational. When you import from **Schemify**, all validators are flattened
into the top–level export. This means you don’t need to worry about which module a validator belongs to when using it in
your project — the module grouping only exists in the code and documentation for clarity.

## Module Structure

All modules follow the same principle:

1. **Composable** – you can nest and combine them freely.
2. **Isolated** - each module only does one thing well.
3. **Extensible** - you can add new modules without affecting existing ones.

- [**Core**](/modules/core/) \
  Contains the essential building blocks of Schemify.
  These are validators and utilities you will use in nearly every schema.
- [**Primitive**](/modules/primitive/) \
  Provides validators for basic data types such as strings, numbers, and booleans.
  These modules cover the most common use cases for validating raw values.
- [**Complex**](/modules/complex/) \
  Focuses on higher–level validators that combine or wrap primitives.
  Useful for structured data like arrays, objects, or custom constraints.
- [**Datetime**](/modules/datetime/) \
  Focuses on **ISO 8601** date and time validators.
- [**Numeric**](/modules/numeric/) \
  Focuses on advanced integer parsing.