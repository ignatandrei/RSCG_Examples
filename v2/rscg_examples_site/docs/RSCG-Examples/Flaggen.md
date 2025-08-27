---
sidebar_position: 2050
title: 205 - Flaggen
description: Explicit operations about flags with enums, and bitwise operations
slug: /Flaggen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# Flaggen  by Ricardo Boss


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Flaggen?label=Flaggen)](https://www.nuget.org/packages/Flaggen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ricardoboss/Flaggen?label=updated)](https://github.com/ricardoboss/Flaggen)
![GitHub Repo stars](https://img.shields.io/github/stars/ricardoboss/Flaggen?style=social)

## Details

### Info
:::info

Name: **Flaggen**

Package Description

Author: Ricardo Boss

NuGet: 
*https://www.nuget.org/packages/Flaggen/*   


You can find more details at https://github.com/ricardoboss/Flaggen

Source: https://github.com/ricardoboss/Flaggen

:::

### Original Readme
:::note

# Flaggen

A C# source generator that generates extension methods for flags enums.

## Usage

Install the package:

```shell
dotnet add package Flaggen
```

Suppose we have this enum:

```csharp
using System;

[Flags]
public enum LovelyColors {
    RoseGold = 1 << 0,
    SeaGreen = 1 << 1,
    SunshineYellow = 1 << 2,
    BrightRed = 1 << 3,
}
```

The source generator will notice the `[Flags]` attribute and generate extension methods
for this enum:

```csharp
// initalize with some value
var myColors = LovelyColors.RoseGold | LovelyColors.SeaGreen;

// manipulate the flags
myColors.Add(LovelyColors.BrightRed);
myColors.Remove(LovelyColors.RoseGold);
myColors.Toggle(LovelyColors.SeaGreen);

// check for flags
if (myColors.Has(LovelyColors.SunshineYellow))
    Console.WriteLine("So shiny!");

```

All the extension methods using bitwise operators (so no reflection!), which makes them pretty fast (I will not prove
this, but you get my trust-me-bro™️ guarantee).

## License

[MIT](https://github.com/ricardoboss/Flaggen/LICENSE.md)


:::

### About
:::note

Explicit operations about flags with enums, and bitwise operations


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Flaggen**
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
    <PackageReference Include="Flaggen" Version="1.1.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Flaggen\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **Flaggen** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
var color = Colors.Red ;
Console.WriteLine($"Selected Colors: {color}");
color.Add(Colors.Blue);
Console.WriteLine($"After Adding Blue: {color}");
color.Remove(Colors.Red);
Console.WriteLine($"After Removing Red: {color}");
color.Toggle(Colors.Green);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Flaggen\src\EnumDemo\Colors.cs" label="Colors.cs" >

  This is the use of **Flaggen** in *Colors.cs*

```csharp showLineNumbers 
namespace EnumDemo;

[Flags]
public enum Colors
{
    None = 0,
       Red = 1 << 0,
    Green = 1 << 1,
    Blue = 1 << 2,
    Yellow = 1 << 3,
    Black = 1 << 4,
    White = 1 << 5
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Flaggen\src\EnumDemo\obj\GX\Flaggen\Flaggen.FlaggenGenerator\Colors_FlaggenExtensions.g.cs" label="Colors_FlaggenExtensions.g.cs" >


```csharp showLineNumbers 
using System;

namespace EnumDemo
{
    public static class ColorsFlaggenExtensions
    {
        public static void Add(ref this Colors value, Colors flag)
        {
            value |= flag;
        }

        public static void Remove(ref this Colors value, Colors flag)
        {
            value &= ~flag;
        }

        public static void Toggle(ref this Colors value, Colors flag)
        {
            value ^= flag;
        }

        public static bool Has(ref this Colors value, Colors flag)
        {
            return (value & flag) == flag;
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Flaggen ](/sources/Flaggen.zip)

:::


### Share Flaggen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFlaggen&quote=Flaggen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFlaggen&text=Flaggen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFlaggen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFlaggen&title=Flaggen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFlaggen&title=Flaggen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFlaggen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Flaggen

aaa
<SameCategory />

