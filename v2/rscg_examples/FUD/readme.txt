# Funcky Discriminated Unions
A source generator that generates `Match` methods for all your discriminated unions needs. ✨

[![NuGet package](https://buildstats.info/nuget/Funcky.DiscriminatedUnion)](https://www.nuget.org/packages/Funcky.DiscriminatedUnion)
[![Build](https://github.com/polyadic/funcky-discriminated-union/workflows/Build/badge.svg)](https://github.com/polyadic/funcky-discriminated-union/actions?query=workflow%3ABuild)
[![Licence: MIT](https://img.shields.io/badge/licence-MIT-green)](https://raw.githubusercontent.com/polyadic/funcky-discriminated-union/main/license-mit.txt)
[![Licence: Apache](https://img.shields.io/badge/licence-Apache-green)](https://raw.githubusercontent.com/polyadic/funcky-discriminated-union/main/license-apache.txt)

## Installation
Add `<ProjectReference Include="Funcky.DiscriminatedUnion" Version="..." PrivateAssets="all" />` to your project file.

## Usage
Apply the `[DiscriminatedUnion]` to an abstract class (or record) with nested types representing the variants.

## Example
```cs
using Funcky;

var result = Result<int>.Ok(42);
var resultOrFallback = result.Match(ok: ok => ok.Value, error: _ => 0);

[DiscriminatedUnion]
public abstract partial record Result<T>
    where T : notnull
{
    public sealed partial record Ok(T Value) : Result<T>;

    public sealed partial record Error(Exception Exception) : Result<T>;
}
```

## Minimum Required Versions
* Visual Studio 2022
* Roslyn 4.0.0
* .NET 6

## Settings
The attribute allows configuration of some aspects of source generation.

### `NonExhaustive`
The auto-generated `Match` and `Switch` methods are public by default.
When `NonExhaustive` is set to `true`, these methods are generated with `internal` visibility instead.

### `MatchResultTypeName`
The auto-generated `Match` method uses a generic type for the result. This type is named `TResult` by default.
This can cause conflict with generic types on the discriminated union itself. Use `MatchResultTypeName` to set a custom name for this type.

```cs
using Funcky;

[DiscriminatedUnion(MatchResultTypeName = "TMatchResult")]
public abstract partial record Result<TResult> { ... }

// Generated code
partial record Result<TResult>
{
    public abstract TMatchResult Match<TMatchResult>(...);

    ...
}
```

### `Flatten`
The auto-generated `Match` and `Switch` methods only accept one level of inheritance by default.
Set `Flatten` to `true` to include arbitrarily deep inherited types in these methods.

```cs
using Funcky;

SyntaxNode node = ...;
var nodeAsString = node.Match(
    keyword: keyword => keyword.Value,
    integer: integer => integer.Value.ToString(),
    double: @double => @double.Value.ToString());

[DiscriminatedUnion(Flatten = true)]
public abstract partial record SyntaxNode
{
    public sealed partial record Keyword(string Value) : SyntaxNode;

    public abstract partial record Literal : SyntaxNode;

    public abstract partial record Number : Literal;

    public sealed partial record Integer(int Value) : Number;

    public sealed partial record Double(double Value) : Number;
}
```

### `[JsonPolymorphic]`
System.Text.Json adds support for [serializing derived classes][json-polymorphism-docs] starting with .NET 7.
This generator supports this feature by generating the required `[JsonDerivedType]` attributes for you.

All missing `[JsonDerivedType]` attributes are generated if at least one `[JsonDerivedType]` or `[JsonPolymorphic]`
attribute is specified.

```cs
using Funcky;
using System.Text.Serialization;

[DiscriminatedUnion]
[JsonPolymorphic]
public abstract partial record Shape
{
    public sealed partial record Rectangle(double Width, double Length) : Shape;

    public sealed partial record Circle(double Radius) : Shape;

    public sealed partial record EquilateralTriangle(double SideLength) : Shape;
}
```

<details>

<summary>Generated code</summary>

```cs
using System.Text.Serialization;

[JsonDerivedType(typeof(Rectangle), typeDiscriminator: nameof(Rectangle))]
[JsonDerivedType(typeof(Circle), typeDiscriminator: nameof(Circle))]
[JsonDerivedType(typeof(EquilateralTriangle), typeDiscriminator: nameof(EquilateralTriangle))]
partial record Shape
{
    // ...
}
```

</details>


[json-polymorphism-docs]: https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/polymorphism
