---
sidebar_position: 980
title: 98 - Funcky.DiscriminatedUnion
description: Generating discriminated unions for C# 9.0 and above.
slug: /Funcky.DiscriminatedUnion
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFunctionalProgramming.mdx';

# Funcky.DiscriminatedUnion  by Polyadic


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Funcky.DiscriminatedUnion?label=Funcky.DiscriminatedUnion)](https://www.nuget.org/packages/Funcky.DiscriminatedUnion/)
[![GitHub last commit](https://img.shields.io/github/last-commit/polyadic/funcky-discriminated-union?label=updated)](https://github.com/polyadic/funcky-discriminated-union)
![GitHub Repo stars](https://img.shields.io/github/stars/polyadic/funcky-discriminated-union?style=social)

## Details

### Info
:::info

Name: **Funcky.DiscriminatedUnion**

A source generator that generates `Match` methods for all your discriminated unions needs. ✨

Author: Polyadic

NuGet: 
*https://www.nuget.org/packages/Funcky.DiscriminatedUnion/*   


You can find more details at https://github.com/polyadic/funcky-discriminated-union

Source: https://github.com/polyadic/funcky-discriminated-union

:::

### Original Readme
:::note

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


:::

### About
:::note

Generating discriminated unions for C# 9.0 and above.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Funcky.DiscriminatedUnion**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Funcky.DiscriminatedUnion" Version="1.1.0"  />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FUD\src\Union\Program.cs" label="Program.cs" >

  This is the use of **Funcky.DiscriminatedUnion** in *Program.cs*

```csharp showLineNumbers 
using Union;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);

Console.WriteLine(data.Match(ok => true, error => false));
data = SaveToDatabase.Save(1);
Console.WriteLine(data.Match(ok => true, error => false));

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FUD\src\Union\ResultSave.cs" label="ResultSave.cs" >

  This is the use of **Funcky.DiscriminatedUnion** in *ResultSave.cs*

```csharp showLineNumbers 
namespace Union;

[Funcky.DiscriminatedUnion]
public abstract partial record ResultSave
{
    public partial record Success(int Value): ResultSave;
    public partial record ValidationError(string Message):ResultSave;

    //public sealed partial record Ok(T Value) : ResultSave<T>;

    //public sealed partial record Error(Exception Exception) : ResultSave<T>;
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FUD\src\Union\SaveToDatabase.cs" label="SaveToDatabase.cs" >

  This is the use of **Funcky.DiscriminatedUnion** in *SaveToDatabase.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Union;
internal class SaveToDatabase
{
    public static ResultSave Save(int i)
    {
        if (i == 0)
        {
            return new ResultSave.ValidationError(" cannot save 0");
        }
        return new ResultSave.Success(i);
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FUD\src\Union\obj\GX\Funcky.DiscriminatedUnion.SourceGeneration\Funcky.DiscriminatedUnion.SourceGeneration.DiscriminatedUnionGenerator\DiscriminatedUnionAttribute.g.cs" label="DiscriminatedUnionAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace Funcky
{
    [global::System.Diagnostics.Conditional("Funcky_DiscriminatedUnion")]
    [global::System.AttributeUsage(global::System.AttributeTargets.Class)]
    internal sealed class DiscriminatedUnionAttribute : global::System.Attribute
    {
        /// <summary>Allow only consumers in the same assembly to use the exhaustive <c>Match</c> and <c>Switch</c> methods.</summary>
        public bool NonExhaustive { get; set; }

        /// <summary>Generates exhaustive <c>Match</c> and <c>Switch</c> methods for the entire type hierarchy.</summary>
        public bool Flatten { get; set; }

        /// <summary>Customized the generic type name used for the result in the generated <c>Match</c> methods. Defaults to <c>TResult</c>.</summary>
        public string? MatchResultTypeName { get; set; }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FUD\src\Union\obj\GX\Funcky.DiscriminatedUnion.SourceGeneration\Funcky.DiscriminatedUnion.SourceGeneration.DiscriminatedUnionGenerator\DiscriminatedUnionGenerator.g.cs" label="DiscriminatedUnionGenerator.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace Union
{
    partial record ResultSave
    {
        [global::System.CodeDom.Compiler.GeneratedCode("Funcky.DiscriminatedUnion.SourceGeneration", "1.1.0.0")]
        public abstract TResult Match<TResult>(global::System.Func<Success, TResult> success, global::System.Func<ValidationError, TResult> validationError);
        
        [global::System.CodeDom.Compiler.GeneratedCode("Funcky.DiscriminatedUnion.SourceGeneration", "1.1.0.0")]
        public abstract void Switch(global::System.Action<Success> success, global::System.Action<ValidationError> validationError);
        
        partial record Success
        {
            [global::System.CodeDom.Compiler.GeneratedCode("Funcky.DiscriminatedUnion.SourceGeneration", "1.1.0.0")]
            public override TResult Match<TResult>(global::System.Func<Success, TResult> success, global::System.Func<ValidationError, TResult> validationError) => success(this);
            
            [global::System.CodeDom.Compiler.GeneratedCode("Funcky.DiscriminatedUnion.SourceGeneration", "1.1.0.0")]
            public override void Switch(global::System.Action<Success> success, global::System.Action<ValidationError> validationError) => success(this);
        }
        
        partial record ValidationError
        {
            [global::System.CodeDom.Compiler.GeneratedCode("Funcky.DiscriminatedUnion.SourceGeneration", "1.1.0.0")]
            public override TResult Match<TResult>(global::System.Func<Success, TResult> success, global::System.Func<ValidationError, TResult> validationError) => validationError(this);
            
            [global::System.CodeDom.Compiler.GeneratedCode("Funcky.DiscriminatedUnion.SourceGeneration", "1.1.0.0")]
            public override void Switch(global::System.Action<Success> success, global::System.Action<ValidationError> validationError) => validationError(this);
        }
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Funcky.DiscriminatedUnion ](/sources/Funcky.DiscriminatedUnion.zip)

:::


### Share Funcky.DiscriminatedUnion 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFuncky.DiscriminatedUnion&quote=Funcky.DiscriminatedUnion" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFuncky.DiscriminatedUnion&text=Funcky.DiscriminatedUnion:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFuncky.DiscriminatedUnion" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFuncky.DiscriminatedUnion&title=Funcky.DiscriminatedUnion" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFuncky.DiscriminatedUnion&title=Funcky.DiscriminatedUnion&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFuncky.DiscriminatedUnion" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Funcky.DiscriminatedUnion

aaa
<SameCategory />

