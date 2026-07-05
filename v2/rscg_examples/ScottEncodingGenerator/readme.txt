# ScottEncodingGenerator

`ScottEncodingGenerator` is a C# source generator for defining closed sets of nested case types and generating a `Match` API for them.

It targets types marked with `[ScottEncoding]` and generates:

* a `Match<TResult>(...)` member on the target type
* per-case `Match` implementations on nested case types
* factory methods for constructing cases
* step-by-step extension methods for building a full match expression

The generator supports:

* `partial interface` targets
* `abstract partial class` targets

It does not support:

* structs as targets
* generic nested cases
* non-partial nested cases

[![NuGet](https://img.shields.io/nuget/v/ScottEncodingGenerator.svg?logo=nuget)](https://www.nuget.org/packages/ScottEncodingGenerator)

## Purpose

The generator is intended for code shaped like a discriminated union encoded with nested types.

Instead of manually writing:

* the common `Match` contract
* one implementation per case
* helper factory methods
* fluent matching helpers

the generator derives those from the target type and its nested case declarations.

## Example

### Input

```csharp
[ScottEncoding]
public abstract partial class Option<T>
{
    public sealed partial class Some
    {
        public Some(T value) => Value = value;
        public T Value { get; }
    }

    public sealed partial class None
    {
        public None() { }
    }
}
```

### Generated shape

The generator adds a `Match` member to the target:

```csharp
public abstract partial class Option<T>
{
    public abstract TResult Match<TResult>(
        Func<Option<T>.Some, TResult> some,
        Func<Option<T>.None, TResult> none);

    public sealed partial class Some : Option<T>
    {
        public override TResult Match<TResult>(
            Func<Option<T>.Some, TResult> some,
            Func<Option<T>.None, TResult> none)
            => some(this);
    }

    public sealed partial class None : Option<T>
    {
        public override TResult Match<TResult>(
            Func<Option<T>.Some, TResult> some,
            Func<Option<T>.None, TResult> none)
            => none(this);
    }
}
```

It also generates a companion helper type:

```csharp
public static partial class OptionModule
{
    public static Option<T> Some<T>(T value) => new Option<T>.Some(value);
    public static Option<T> None<T>() => new Option<T>.None();

    public static MatchStep2<T, TResult> IfSome<T, TResult>(
        this Option<T> value,
        Func<Option<T>.Some, TResult> some)
        => new(value, some);
}
```

Usage:

```csharp
Option<int> x = OptionModule.Some(10);

var text = x.Match(
    some => $"Some({some.Value})",
    none => "None");
```

Or with the generated step API:

```csharp
var text = x
    .IfSome(some => $"Some({some.Value})")
    .IfNone(_ => "None");
```

## Interface targets

The generator also supports interface targets.

### Input

```csharp
[ScottEncoding]
public partial interface Expr
{
    public sealed partial class Constant
    {
        public Constant(int value) => Value = value;
        public int Value { get; }
    }

    public sealed partial class Add
    {
        public Add(Expr left, Expr right)
        {
            Left = left;
            Right = right;
        }

        public Expr Left { get; }
        public Expr Right { get; }
    }
}
```

### Generated shape

For interfaces, the generator emits:

* a `Match<TResult>(...)` declaration on the interface
* nested case classes implementing the interface
* helper factories in `ExprModule`

Example use:

```csharp
Expr expr = ExprModule.Add(
    ExprModule.Constant(1),
    ExprModule.Constant(2));

var value = expr.Match(
    constant => constant.Value,
    add => add.Left.Match(
               l => l.Value,
               _ => 0) +
           add.Right.Match(
               r => r.Value,
               _ => 0));
```

## Rules

A target type must:

* be marked with `[ScottEncoding]`
* be `partial`
* be either:

  * an `abstract partial class`, or
  * a `partial interface`

A nested case type must:

* be declared inside the target
* be a non-generic class
* be `partial`
* be non-abstract
* expose at least one accessible instance constructor

For class targets, a nested case may:

* omit an explicit base type, or
* inherit from the target type

For interface targets, a nested case may:

* omit an explicit base type, or
* implement the target interface

A nested case must not specify an unrelated base type.

## Factories

For each accessible constructor on each case, the generator emits a factory method in `<TargetName>Module`.

Example:

```csharp
public sealed partial class Error
{
    public Error(string message) => Message = message;
    public string Message { get; }
}
```

Generates a factory similar to:

```csharp
public static Result<T> Error<T>(string message) => new Result<T>.Error(message);
```

If a case has multiple accessible constructors, additional factory methods are emitted with suffixes derived from constructor parameters or an index.

## Matching API

The generated `Match<TResult>(...)` method takes one delegate per case, in declaration order.

For a target with cases:

* `Success`
* `Failure`
* `Loading`

the generated signature is shaped like:

```csharp
TResult Match<TResult>(
    Func<Success, TResult> success,
    Func<Failure, TResult> failure,
    Func<Loading, TResult> loading);
```

The fluent step API follows the same order:

```csharp
value
    .IfSuccess(...)
    .IfFailure(...)
    .IfLoading(...);
```

## Diagnostics

The generator reports the following diagnostics.

### `SCOTT001`

Target is not valid.

Raised when the target is not:

* partial
* an interface
* or an abstract class

### `SCOTT002`

No valid cases were found.

Raised when the target does not declare any usable nested case types.

### `SCOTT003`

A nested case has an invalid shape.

Raised when a case is not a:

* partial class
* non-generic class
* non-abstract class

### `SCOTT004`

A nested case has no accessible instance constructor.

### `SCOTT005`

A nested case has an invalid relationship to the target.

Raised when a case declares an unrelated base type.

### `SCOTT006`

The target already declares a conflicting `Match` method.

## Generated files

The generator emits:

* `ScottEncodingAttribute.g.cs`
* one generated file per valid target, named from the target symbol

The generated code enables nullable references with:

```csharp
#nullable enable
```

## Notes

* Cases are processed in a stable order based on syntax location.
* The helper type is named `<TargetName>Module`.
* The helper type is generated as `static partial`.
* Matching delegates use fully qualified type names in generated code.
* The generated API preserves target type parameters and constraint clauses.

## Minimal example

```csharp
[ScottEncoding]
public abstract partial class BoolLike
{
    public sealed partial class True
    {
        public True() { }
    }

    public sealed partial class False
    {
        public False() { }
    }
}
```

Usage:

```csharp
BoolLike value = BoolLikeModule.True();

var result = value.Match(
    @true => 1,
    @false => 0);
```