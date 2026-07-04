---
sidebar_position: 2730
title: 273 - ScottEncodingGenerator
description: Usage 
slug: /ScottEncodingGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFunctionalProgramming.mdx';

# ScottEncodingGenerator  by Georgiy Petrov


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ScottEncodingGenerator?label=ScottEncodingGenerator)](https://www.nuget.org/packages/ScottEncodingGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Georgiy-Petrov/ScottEncodingGenerator?label=updated)](https://github.com/Georgiy-Petrov/ScottEncodingGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Georgiy-Petrov/ScottEncodingGenerator?style=social)

## Details

### Info
:::info

Name: **ScottEncodingGenerator**

Roslyn incremental source generator for partial interfaces and abstract partial classes that generates Match methods, nested case implementations, and companion module helpers for Scott-encoded types.

Author: Georgiy Petrov

NuGet: 
*https://www.nuget.org/packages/ScottEncodingGenerator/*   


You can find more details at https://github.com/Georgiy-Petrov/ScottEncodingGenerator

Source: https://github.com/Georgiy-Petrov/ScottEncodingGenerator

:::

### Author
:::note
Georgiy Petrov 
![Alt text](https://github.com/Georgiy-Petrov.png)
:::

## Original Readme
:::note

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
        public T Value \{ get; }
    }

    public sealed partial class None
    {
        public None() \{ }
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
        public int Value \{ get; }
    }

    public sealed partial class Add
    {
        public Add(Expr left, Expr right)
        {
            Left = left;
            Right = right;
        }

        public Expr Left \{ get; }
        public Expr Right \{ get; }
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
    public string Message \{ get; }
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
        public True() \{ }
    }

    public sealed partial class False
    {
        public False() \{ }
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

:::

### About
:::note

Usage 


1. You declare a union-like type as an abstract partial class and annotate it with ScottEncoding.


2. Inside it, you define each case as a sealed partial nested class (in this sample: Ok and None).


3. Your business logic returns one of those cases (Ok when save succeeds, None when it does not).


4. Consumer code can handle results either with normal C# pattern matching or with the generated functional matching API.





2. What the generator adds


1. A Match contract on the parent union type, plus per-case implementations that dispatch to the correct handler.


2. A companion module with factory helpers to construct each case (Ok / None) without directly calling constructors.


3. A fluent matching flow (IfOk(...).IfNone(...)) built on top of Match.


4. A generated ScottEncodingAttribute definition, so the attribute is available at compile time.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ScottEncodingGenerator**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="ScottEncodingGenerator" Version="1.0.0" />
	</ItemGroup>

	

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ScottEncodingGenerator\src\UnionTypesDemo\Program.cs" label="Program.cs" >

  This is the use of **ScottEncodingGenerator** in *Program.cs*

```csharp showLineNumbers 
using UnionTypesDemo;

Console.WriteLine("Save or not");
ResultSave<int> data = SaveToDatabase.Save(0);
var message= data switch
{
    ResultSave<int>.Ok ok => $"Saved {ok.Value}",
    ResultSave<int>.None => "Not found", 
};
Console.WriteLine(message);
data = SaveToDatabase.Save(1);
message = data.Match(

    ok => $"Saved {ok.Value}",
    none => "Not found"   
 );
Console.WriteLine(message);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ScottEncodingGenerator\src\UnionTypesDemo\ResultSave.cs" label="ResultSave.cs" >

  This is the use of **ScottEncodingGenerator** in *ResultSave.cs*

```csharp showLineNumbers 


namespace UnionTypesDemo;


[ScottEncoding]
public abstract partial class ResultSave<T>
{

    public sealed partial class Ok
    {
        public Ok(T value) => Value = value;
        public T Value \{ get; }
    }

    public sealed partial class None
    {
        public None() \{ }
    }

}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ScottEncodingGenerator\src\UnionTypesDemo\SaveToDatabase.cs" label="SaveToDatabase.cs" >

  This is the use of **ScottEncodingGenerator** in *SaveToDatabase.cs*

```csharp showLineNumbers 
namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave<int> Save(int i)
    {

        if (i == 0)
        {
            return new ResultSave<int>.None();
        }
        return new ResultSave<int>.Ok(i); 
    }
}



```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ScottEncodingGenerator\src\UnionTypesDemo\obj\GX\ScottEncodingGenerator\ScottEncodingGenerator.ScottEncodingGenerator\global__UnionTypesDemo_ResultSave_T_.ScottEncoding.g.cs" label="global__UnionTypesDemo_ResultSave_T_.ScottEncoding.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace UnionTypesDemo
{
    public abstract partial class ResultSave<T>
    {
        public abstract TResult Match<TResult>(global::System.Func<global::UnionTypesDemo.ResultSave<T>.Ok, TResult> ok, global::System.Func<global::UnionTypesDemo.ResultSave<T>.None, TResult> none);
    
        public sealed partial class Ok : global::UnionTypesDemo.ResultSave<T>
        {
            public override TResult Match<TResult>(global::System.Func<global::UnionTypesDemo.ResultSave<T>.Ok, TResult> ok, global::System.Func<global::UnionTypesDemo.ResultSave<T>.None, TResult> none) => ok(this);
        }
    
        public sealed partial class None : global::UnionTypesDemo.ResultSave<T>
        {
            public override TResult Match<TResult>(global::System.Func<global::UnionTypesDemo.ResultSave<T>.Ok, TResult> ok, global::System.Func<global::UnionTypesDemo.ResultSave<T>.None, TResult> none) => none(this);
        }
    }

    public static partial class ResultSaveModule
    {
        public static global::UnionTypesDemo.ResultSave<T> Ok<T>(T value) => new global::UnionTypesDemo.ResultSave<T>.Ok(value);
    
        public static global::UnionTypesDemo.ResultSave<T> None<T>() => new global::UnionTypesDemo.ResultSave<T>.None();
    
        public static MatchStep2<T, TResult> IfOk<T, TResult>(this global::UnionTypesDemo.ResultSave<T> value, global::System.Func<global::UnionTypesDemo.ResultSave<T>.Ok, TResult> ok) => new(value, ok);
    
        public readonly struct MatchStep2<T, TResult>
        {
            private readonly global::UnionTypesDemo.ResultSave<T> _value;
            private readonly global::System.Func<global::UnionTypesDemo.ResultSave<T>.Ok, TResult> _ok;
        
            public MatchStep2(global::UnionTypesDemo.ResultSave<T> value, global::System.Func<global::UnionTypesDemo.ResultSave<T>.Ok, TResult> ok)
            {
                _value = value;
                _ok = ok;
            }
        
            public TResult IfNone(global::System.Func<global::UnionTypesDemo.ResultSave<T>.None, TResult> none) => _value.Match(_ok, none);
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ScottEncodingGenerator\src\UnionTypesDemo\obj\GX\ScottEncodingGenerator\ScottEncodingGenerator.ScottEncodingGenerator\ScottEncodingAttribute.g.cs" label="ScottEncodingAttribute.g.cs" >
```csharp showLineNumbers 
using System;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = false, Inherited = false)]
internal sealed class ScottEncodingAttribute : Attribute
{
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ScottEncodingGenerator ](/sources/ScottEncodingGenerator.zip)

:::


### Share ScottEncodingGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FScottEncodingGenerator&quote=ScottEncodingGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FScottEncodingGenerator&text=ScottEncodingGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FScottEncodingGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FScottEncodingGenerator&title=ScottEncodingGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FScottEncodingGenerator&title=ScottEncodingGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FScottEncodingGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ScottEncodingGenerator

<SameCategory />

