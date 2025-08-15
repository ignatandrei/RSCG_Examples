---
sidebar_position: 1750
title: 175 - Dolly
description: Clone objects with ease.
slug: /Dolly
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Dolly  by Peter Andersson


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Dolly?label=Dolly)](https://www.nuget.org/packages/Dolly/)
[![GitHub last commit](https://img.shields.io/github/last-commit/AnderssonPeter/Dolly?label=updated)](https://github.com/AnderssonPeter/Dolly)
![GitHub Repo stars](https://img.shields.io/github/stars/AnderssonPeter/Dolly?style=social)

## Details

### Info
:::info

Name: **Dolly**

Clone .net objects using source generation

Author: Peter Andersson

NuGet: 
*https://www.nuget.org/packages/Dolly/*   


You can find more details at https://github.com/AnderssonPeter/Dolly

Source: https://github.com/AnderssonPeter/Dolly

:::

### Original Readme
:::note

<p align="center">
  <a href="https://github.com/AnderssonPeter/Dolly">
    Dolly
  </a>

  <h3 align="center">Dolly</h3>

  <p align="center">
    Clone .net objects using source generation
    <br />
    <br />
    ·
    <a href="https://github.com/AnderssonPeter/Dolly/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnderssonPeter/Dolly/issues">Request Feature</a>
    ·
  </p>
</p>
<br />

[![NuGet version](https://badge.fury.io/nu/Dolly.svg)](https://www.nuget.org/packages/Dolly)
[![Nuget](https://img.shields.io/nuget/dt/Dolly)](https://www.nuget.org/packages/Dolly)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/AnderssonPeter/Dolly/main/LICENSE)

[![unit tests](https://img.shields.io/github/actions/workflow/status/AnderssonPeter/Dolly/test.yml?branch=main&style=flat-square&label=unit%20tests)](https://github.com/AnderssonPeter/Dolly/actions/workflows/test.yml)
[![Testspace tests](https://img.shields.io/testspace/tests/AnderssonPeter/AnderssonPeter:Dolly/main?style=flat-square)](https://anderssonpeter.testspace.com/spaces/293120/result_sets)
[![Coverage Status](https://img.shields.io/coveralls/github/AnderssonPeter/Dolly?style=flat-square)](https://coveralls.io/github/AnderssonPeter/Dolly)

## Table of Contents
* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
* [Example](#example)
* [Benchmarks](#Benchmarks)

## About The Project
Generate c# code to clone objects on the fly.

## Getting Started
* Add the `Dolly` nuget and add `[Clonable]` attribute to a class and ensure that the class is marked as `partial`.
* Add `[CloneIgnore]` to any property or field that you don't want to include in the clone.
* Call `DeepClone()` or `ShallowClone()` on the object.

### Example
```C#
[Clonable]
public partial class SimpleClass
{
    public string First { get; set; }
    public int Second { get; set; }
    [CloneIgnore]
    public float DontClone { get; set; }
}
```
Should generate
```C#
partial class SimpleClass : IClonable<SimpleClass>
{
    
    object ICloneable.Clone() => this.DeepClone();

    public SimpleClass DeepClone() =>
        new SimpleClass()
        {
            First = First,
            Second = Second
        };

    public SimpleClass ShallowClone() =>
        new SimpleClass()
        {
            First = First,
            Second = Second
        };
}
```

## Benchmarks

| Method          | Mean        | Error     | StdDev    | Ratio  | RatioSD | Gen0   | Gen1   | Allocated |
|---------------- |------------:|----------:|----------:|-------:|--------:|-------:|-------:|----------:|
| Dolly           |    124.5 ns |   1.59 ns |   1.49 ns |   1.00 |    0.02 | 0.0362 |      - |     608 B |
| DeepCloner      |    457.7 ns |   7.01 ns |   6.56 ns |   3.68 |    0.07 | 0.0830 |      - |    1392 B |
| CloneExtensions |    566.2 ns |   9.61 ns |   8.52 ns |   4.55 |    0.08 | 0.0896 |      - |    1504 B |
| NClone          |  4,308.0 ns |  62.01 ns |  58.01 ns |  34.61 |    0.61 | 0.5112 | 0.0076 |    8584 B |
| FastCloner      | 15,310.6 ns | 221.85 ns | 207.52 ns | 123.00 |    2.16 | 0.3967 |      - |    6800 B |
| AnyClone        | 19,011.9 ns | 354.27 ns | 347.94 ns | 152.74 |    3.25 | 2.4414 |      - |   41256 B |

:::

### About
:::note

Clone objects with ease.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Dolly**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Dolly" Version="0.0.7">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dolly\src\CloneData\Program.cs" label="Program.cs" >

  This is the use of **Dolly** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using CloneData;

Console.WriteLine("Hello, World!");
Person p = new ();
p.FirstName = "Andrei";
p.LastName = "Ignat";
p.Age = 54;
var p1=p.DeepClone();
Console.WriteLine(p1.Name());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dolly\src\CloneData\Person.cs" label="Person.cs" >

  This is the use of **Dolly** in *Person.cs*

```csharp showLineNumbers 

namespace CloneData;
[Dolly.Clonable]
public partial class Person
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    [Dolly.CloneIgnore]
    public int Age { get; set; }
    public string Name() => $"{FirstName} {LastName}";

    public Person[] Childs { get; set; } = [];
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dolly\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\ClonableAttribute.g.cs" label="ClonableAttribute.g.cs" >


```csharp showLineNumbers 
using System;

namespace Dolly
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct)]
    public class ClonableAttribute : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dolly\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\CloneIgnoreAttribute.g.cs" label="CloneIgnoreAttribute.g.cs" >


```csharp showLineNumbers 
using System;

namespace Dolly
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class CloneIgnoreAttribute : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dolly\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\IClonable.g.cs" label="IClonable.g.cs" >


```csharp showLineNumbers 
using System;
namespace Dolly
{
    public interface IClonable<T> : ICloneable
    {
        T DeepClone();
        T ShallowClone();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dolly\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 
using Dolly;
using System.Linq;
namespace CloneData;
partial class Person : IClonable<Person>
{
    object ICloneable.Clone() => this.DeepClone();
    public virtual Person DeepClone() =>
        new ()
        {
            FirstName = FirstName,
            LastName = LastName,
            Childs = Childs.Select(item => item.DeepClone()).ToArray()
        };

    public virtual Person ShallowClone() =>
        new ()
        {
            FirstName = FirstName,
            LastName = LastName,
            Childs = Childs.ToArray()
        };
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project Dolly ](/sources/Dolly.zip)

:::


### Share Dolly 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&quote=Dolly" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&text=Dolly:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&title=Dolly" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly&title=Dolly&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDolly" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Dolly

### In the same category (Clone) - 1 other generators


#### [CopyTo](/docs/CopyTo)

