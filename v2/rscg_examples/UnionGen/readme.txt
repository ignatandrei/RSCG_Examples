# Union Source Generator

Union Source Generator is a C# source generator that generates a union type for a set of types. The generated union type can hold any _one_ of the specified types.
Consuming the type can be done by _exhaustive_ pattern matching.

The main component is one **generic attribute**, `UnionAttribute`, which is used to specify the types that the union can hold, on a `struct`:

```csharp
[Union<Result<int>, NotFound>]
public readonly partial struct SimpleObj;
```

This will result in a generated `SimpleObj` type that can hold any of the specified types, **but only one at a time**.
It also provides compile time checked _exhaustive_ `Switch` and `Match` methods to handle the different types.
Implicit conversions operators are generated as well as equality members.

```csharp
SimpleObj simple = CreateSimple();
simple.Switch(
              r =>  Console.WriteLine($"Found: {r}"),
              _ => Console.WriteLine("not found"));
int result = simple.Match(r => r.Value * 2,
                          _ => -1);

SimpleObj CreateSimple() => new NotFound();
```

> While the generator itself has to be a `netstandard2.0` project, the generated code assumes C#12 / .NET 8 at this point.

> This project is _heavily_ influenced by the great [OneOf](https://github.com/mcintyre321/OneOf) library. All credit for the original concept to its authors!

## Opinionated Naming Scheme 

This library is **opinionated** as it will try to assign '_readable_' names to the properties based on the specified types:

```csharp
SimpleObj simple = new SimpleObj(new Result<int>(12));
bool found = simple.IsNotFound;
Result<int> result = simple.AsResultOfInt32();
```

It even will try to detect collections and assign names like `ListOfFoo` or `DictionaryOfStringAndInt64`.

The same is true for the lambda parameter names in the `Match` & `Switch` methods.
For `Switch` they will get names like `forString` (or `forNone`) and for `Match` ones like `withString` (or `withNone`).

That can work great in many scenarios but will probably lead to bad naming in some cases - that's the trade-off I'm willing to accept.

## Union Object Size

We try to be smart and use as little memory as possible for the union object.

- They are `readonly struct`s
- Only those fields actually needed are generated
  - e.g. only a single reference field which is used for all reference types
  - if there are no reference types, no reference field is generated
  - if there are no value types, no value field is generated
- A single `byte` is used for storing the state so that they union object knows _what_ it is

Plus padding for alignment done by the runtime.

## Motivation

My main motivation was to finally learn more about writing source generators by creating one myself.
I haven't found a lot of resources regarding _generic_ marker attributes in combination with source generators, so I'm not sure my approach is optimal, but maybe it can serve as a starting point for others.

As a first project I wanted something with a small scope and I was always a little annoyed by the property names (`T0`, `T1`, ...) in the `OneOf` library (which they have to use due to the types being generic - even when using their source generator).
So this is what I decided to tackle.

## Quality

This is a two-day toy project without much testing (and no serious automated tests).
I will probably use it in my own projects in the future to see how far I'll get and fix issues as they arise.

Feedback (and PRs 😉) to make the implementation more robust, efficient and generally better are welcome, of course!

> Don't expect production grade reliability here!