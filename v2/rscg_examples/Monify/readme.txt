# Monify [![NuGet](https://img.shields.io/nuget/v/Monify?logo=nuget)](https://www.nuget.org/packages/Monify/) [![GitHub](https://img.shields.io/github/license/MooVC/Monify)](LICENSE.md)

Monify, a .NET Roslyn source generator, automates the creation of strongly-typed wrappers around single values, improving semantic clarity, type safety, and maintainability.

## Requirements

- C# v2.0 or later.
- Visual Studio 2022 v17.4 or later, or any compatible IDE that supports Roslyn source generators.

## Installation

To install Monify, use the following command in your package manager console:

```shell
install-package Monify
```

## Usage

Monify turns a `class`, `record`, or `struct` into a strongly typed wrapper around a single value. To opt in, annotate a `partial` type with the `Monify` attribute and specify the encapsulated value type.

```csharp
using Monify;

[Monify<int>]
public partial struct Age;
```

For language versions earlier than C# 11:

```csharp
using Monify;

[Monify(Type = typeof(int))]
public partial struct Age;
```

### Generated Members

When applied, Monify generates the boilerplate needed for a lightweight value object:

- A private readonly field `_value` that stores the encapsulated value.
- A constructor accepting the underlying value: `Age(int value)`.
- Implicit conversion operators to and from the encapsulated type.
- Implementations of `IEquatable<Age>` and `IEquatable<int>`.
- Equality (`==`) and inequality (`!=`) operators for comparing with other instances or with the underlying value.
- Overrides of `Equals(object)`, `GetHashCode()`, and `ToString()`.

### Example

```csharp
Age age = 42;       // implicit conversion from int
int value = age;    // implicit conversion to int

if (age == value)
{
    // comparisons work with both Age and int
}
```

Classes annotated with `Monify` are `sealed` automatically to preserve immutability. Types must be `partial` and cannot declare additional state; the included analyzers will warn when these guidelines are not followed.

### Nested wrappers and circular guards

Monify also follows chains of nested wrappers and automatically emits the necessary implicit conversions so the outermost wrapper can convert directly to and from the innermost value type. For example, if `Money` wraps `Amount` and `Amount` wraps `decimal`, conversions will be generated for every hop, allowing callers to cast `Money` to `decimal` (and vice versa) without manual glue code.

To keep the generator safe, conversion discovery halts as soon as a type repeats in the chain. This prevents circular relationships (e.g. `Outer` wrapping `Inner` while `Inner` wraps `Outer`) from producing infinite loops or ambiguous operators while still supporting arbitrarily deep, non-circular nesting.

## Analyzers

Monify includes several analyzers to assist engineers with its usage. These are:

Rule ID                          | Category | Severity | Notes
:--------------------------------|:---------|:---------|:-------------------------------------------------------------------------
[MONFY01](docs/rules/MONFY01.md) | Usage    | Warning  | Type is not compatible with Monify
[MONFY02](docs/rules/MONFY02.md) | Usage    | Warning  | Type is not Partial
[MONFY03](docs/rules/MONFY03.md) | Design   | Error    | Type captures State
[MONFY04](docs/rules/MONFY04.md) | Design   | Error    | Self Referencing Type

## Contributing

Contributions are welcome - see the [CONTRIBUTING.md](/.github/CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.