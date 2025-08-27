---
sidebar_position: 1770
title: 177 - Equatable.Generator
description: Generating Equals from properties
slug: /Equatable.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEquals.mdx';

# Equatable.Generator  by Eden Prairie


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Equatable.Generator?label=Equatable.Generator)](https://www.nuget.org/packages/Equatable.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/loresoft/Equatable.Generator?label=updated)](https://github.com/loresoft/Equatable.Generator)
![GitHub Repo stars](https://img.shields.io/github/stars/loresoft/Equatable.Generator?style=social)

## Details

### Info
:::info

Name: **Equatable.Generator**

Source generator for Equals and GetHashCode

Author: Eden Prairie

NuGet: 
*https://www.nuget.org/packages/Equatable.Generator/*   


You can find more details at https://github.com/loresoft/Equatable.Generator

Source: https://github.com/loresoft/Equatable.Generator

:::

### Original Readme
:::note

# Equatable.Generator

Source generator for `Equals` and `GetHashCode` with attribute based control of equality implementation

[![Build Project](https://github.com/loresoft/Equatable.Generator/actions/workflows/dotnet.yml/badge.svg)](https://github.com/loresoft/Equatable.Generator/actions/workflows/dotnet.yml)

[![Coverage Status](https://coveralls.io/repos/github/loresoft/Equatable.Generator/badge.svg?branch=main)](https://coveralls.io/github/loresoft/Equatable.Generator?branch=main)

[![Equatable.Generator](https://img.shields.io/nuget/v/Equatable.Generator.svg)](https://www.nuget.org/packages/Equatable.Generator/)

## Features

- Override `Equals` and `GetHashCode`
- Implement `IEquatable<T>`
- Support `class`, `record` and `struct` types
- Support `EqualityComparer` per property via attribute
- Attribute based control of equality implementation. 
- Attribute comparers supported: String, Sequence, Dictionary, HashSet, Reference, and Custom
- No runtime dependencies.  Library is compile time dependence only.  

### Usage

#### Add package

Add the nuget package to your projects.

`dotnet add package Equatable.Generator`

Prevent including Equatable.Generator as a dependency

```xml
<PackageReference Include="Equatable.Generator" PrivateAssets="all" />
```

### Requirements

This library requires:

- Target framework .NET Standard 2.0 or greater
- Project C# `LangVersion` 8.0 or higher

### Equatable Attributes

Place `[Equatable]` attribute on a `class`, `record` or `struct`.  The source generator will create a partial with overrides for `Equals` and `GetHashCode` for all public properties.

- `[Equatable]` Marks the class to generate overrides for `Equals` and `GetHashCode`

 The default comparer used in the implementation of `Equals` and `GetHashCode` is `EqualityComparer<T>.Default`.  Customize the comparer used with the following attributes.

- `[IgnoreEquality]` Ignore property in `Equals` and `GetHashCode` implementations
- `[StringEquality]` Use specified `StringComparer` when comparing strings
- `[SequenceEquality]` Use `Enumerable.SequenceEqual` to determine whether enumerables are equal
- `[DictionaryEquality]` Use to determine if dictionaries are equal
- `[HashSetEquality]` Use `ISet<T>.SetEquals` to determine whether enumerables are equal
- `[ReferenceEquality]` Use `Object.ReferenceEquals` to determines whether instances are the same instance
- `[EqualityComparer]` Use the specified `EqualityComparer`

### Example Usage

Example of using the attributes to customize the source generation of `Equals` and `GetHashCode`

``` c#
[Equatable]
public partial class UserImport
{
    [StringEquality(StringComparison.OrdinalIgnoreCase)]
    public string EmailAddress { get; set; } = null!;

    public string? DisplayName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTimeOffset? LockoutEnd { get; set; }

    public DateTimeOffset? LastLogin { get; set; }

    [IgnoreEquality]
    public string FullName => $"{FirstName} {LastName}";

    [HashSetEquality]
    public HashSet<string>? Roles { get; set; }

    [DictionaryEquality]
    public Dictionary<string, int>? Permissions { get; set; }

    [SequenceEquality]
    public List<DateTimeOffset>? History { get; set; }
}
```


:::

### About
:::note

Generating Equals from properties


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Equatable.Generator**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Equatable.Generator" Version="2.0.0" />
  </ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Equatable.Generator\src\GeneratorEqualsDemo\Program.cs" label="Program.cs" >

  This is the use of **Equatable.Generator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using GeneratorEqualsDemo;
var p1 = new Person()
{
    ID = 1,
    FirstName = "Andrei",
    LastName = "Ignat"
};
var p2= new Person()
{
    ID = 2,
    FirstName = "aNdrei",
    LastName = "Ignat"
};
Console.WriteLine(p1==p2);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Equatable.Generator\src\GeneratorEqualsDemo\Person.cs" label="Person.cs" >

  This is the use of **Equatable.Generator** in *Person.cs*

```csharp showLineNumbers 
using Equatable.Attributes;

namespace GeneratorEqualsDemo;

[Equatable]
partial class Person
{
    [IgnoreEquality]
    public int ID { get; set; }
    [StringEquality(StringComparison.OrdinalIgnoreCase)]
    public string? FirstName { get; set; }
    [StringEquality(StringComparison.OrdinalIgnoreCase)]

    public string? LastName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Equatable.Generator\src\GeneratorEqualsDemo\obj\GX\Equatable.SourceGenerator\Equatable.SourceGenerator.EquatableGenerator\GeneratorEqualsDemo.Person.Equatable.g.cs" label="GeneratorEqualsDemo.Person.Equatable.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace GeneratorEqualsDemo
{
    partial class Person : global::System.IEquatable<global::GeneratorEqualsDemo.Person?>
    {
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Equatable.SourceGenerator", "2.0.0+10ad4b045a688eb10980afcd11ddb8e64505eda6")]
        public bool Equals(global::GeneratorEqualsDemo.Person? other)
        {
            return !(other is null)
                && global::System.StringComparer.OrdinalIgnoreCase.Equals(FirstName, other.FirstName)
                && global::System.StringComparer.OrdinalIgnoreCase.Equals(LastName, other.LastName);

        }

        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Equatable.SourceGenerator", "2.0.0+10ad4b045a688eb10980afcd11ddb8e64505eda6")]
        public override bool Equals(object? obj)
        {
            return Equals(obj as global::GeneratorEqualsDemo.Person);
        }

        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Equatable.SourceGenerator", "2.0.0+10ad4b045a688eb10980afcd11ddb8e64505eda6")]
        public static bool operator ==(global::GeneratorEqualsDemo.Person? left, global::GeneratorEqualsDemo.Person? right)
        {
            return global::System.Collections.Generic.EqualityComparer<global::GeneratorEqualsDemo.Person?>.Default.Equals(left, right);
        }

        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Equatable.SourceGenerator", "2.0.0+10ad4b045a688eb10980afcd11ddb8e64505eda6")]
        public static bool operator !=(global::GeneratorEqualsDemo.Person? left, global::GeneratorEqualsDemo.Person? right)
        {
            return !(left == right);
        }

        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Equatable.SourceGenerator", "2.0.0+10ad4b045a688eb10980afcd11ddb8e64505eda6")]
        public override int GetHashCode(){
            int hashCode = 1938039292;
            hashCode = (hashCode * -1521134295) + global::System.StringComparer.OrdinalIgnoreCase.GetHashCode(FirstName!);
            hashCode = (hashCode * -1521134295) + global::System.StringComparer.OrdinalIgnoreCase.GetHashCode(LastName!);
            return hashCode;

        }

    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Equatable.Generator ](/sources/Equatable.Generator.zip)

:::


### Share Equatable.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEquatable.Generator&quote=Equatable.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEquatable.Generator&text=Equatable.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEquatable.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEquatable.Generator&title=Equatable.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEquatable.Generator&title=Equatable.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEquatable.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Equatable.Generator

aaa
<SameCategory />

