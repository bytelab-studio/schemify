---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Schemify"
  text: "Tree-shakable TypeScript schema validation"
  tagline: "A lean, modern alternative to Zod for validation and type-safety."
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View Validators
      link: /modules/

features:
  - title: 🪶 Lightweight & Tree-shakable
    details: Designed with modern bundlers in mind. Only ships the validators you actually use.
  - title: 🧩 Extensible by Design
    details: Build custom validators with <code>Schema.raw</code> — a clean and safe foundation for extension.
  - title: ⚡ TypeScript First
    details: Strongly typed with generics. Autocompletion, inference, and enum support built in.
  - title: 🛡️ Safe Validation
    details: Consistent error handling with <code>SchemaError</code>, optional nullability and optionality flags.
  - title: 🧰 Rich Validator Set
    details: Covers primitives, objects, arrays, unions, enums, patterns, records, tuples, and more.
  - title: 🔌 Familiar but Improved
    details: Inspired by libraries like Zod and Yup, but streamlined for performance and extensibility.
---