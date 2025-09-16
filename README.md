<div align="center" style="padding: 1rem 0 ">
    <img width="150" height="150" src="docs/public/assets/logo.png"/>
</div>


[![codecov](https://codecov.io/github/bytelab-studio/schemify/branch/master/graph/badge.svg?token=K7Jq4afV6g)](https://codecov.io/github/bytelab-studio/schemify/tree/master)
![NPM Version](https://img.shields.io/npm/v/%40bytelab.studio%2Fschemify)
![NPM Version](https://img.shields.io/npm/l/%40bytelab.studio%2Fschemify)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/bytelab-studio/schemify/ci.yml?label=CI)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/bytelab-studio/schemify/cd.yml?label=CD)

# Schemify

**Schemify** is a modular, type-safe, and tree-shakable schema validation library designed for JavaScript and
TypeScript. It allows you to build powerful validation schemas with minimal overhead, while ensuring dead code
elimination for unused validators.

## ✨ Features

- 📦 **Tree-shakable** — Unused validators are removed from the bundle.
- 🧩 **Modular design** — Import only what you need.
- 🛠 **Type-safe** — Infers TypeScript types from your schemas automatically.
- 🔌 **Extensible** — Easily create and attach custom validators.
- 🧪 **Fully tested** with [Vitest](https://vitest.dev).

## 📦 Installation

```bash
npm install @bytelab.studio/schemify
# or
yarn add @bytelab.studio/schemify
```

## 🚀 Usage

```ts
import * as Schema from "@bytelab.studio/schemify";

const schema = Schema.object({
    name: Schema.string(),
    age: Schema.number({min: 18})
});

type User = Schema.InferType<typeof schema>;

schema({name: "Alice", age: 21}); // ✅ valid
schema({name: "Bob", age: 15});   // ❌ throws
```

## 📚 Documentation

See [Documentation](https://schemify.bytelab.studio/) for a list of all built-in validators grouped by module.

## 🧪 Testing

```bash
npm test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
