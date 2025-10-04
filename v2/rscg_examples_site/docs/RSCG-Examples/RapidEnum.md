---
sidebar_position: 2340
title: 234 - RapidEnum
description: Generate enum values without reflection
slug: /RapidEnum
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# RapidEnum  by hanachiru


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RapidEnum?label=RapidEnum)](https://www.nuget.org/packages/RapidEnum/)
[![GitHub last commit](https://img.shields.io/github/last-commit/hanachiru/RapidEnum?label=updated)](https://github.com/hanachiru/RapidEnum)
![GitHub Repo stars](https://img.shields.io/github/stars/hanachiru/RapidEnum?style=social)

## Details

### Info
:::info

Name: **RapidEnum**

Enum utility with SourceGenerator for C#/.NET

Author: hanachiru

NuGet: 
*https://www.nuget.org/packages/RapidEnum/*   


You can find more details at https://github.com/hanachiru/RapidEnum

Source: https://github.com/hanachiru/RapidEnum

:::

### Author
:::note
hanachiru 
![Alt text](https://github.com/hanachiru.png)
:::

### Original Readme
:::note

# RapidEnum

[![nuget](https://img.shields.io/nuget/v/RapidEnum)](https://www.nuget.org/packages/RapidEnum)
[![Releases](https://img.shields.io/github/release/hanachiru/RapidEnum.svg)](https://github.com/hanachiru/RapidEnum/releases)
[![license](https://img.shields.io/badge/LICENSE-MIT-green.svg)](https://github.com/hanachiru/RapidEnum/LICENSE)
[![test](https://github.com/hanachiru/RapidEnum/actions/workflows/test.yml/badge.svg)](https://github.com/hanachiru/RapidEnum/actions/workflows/test.yml)

[日本語版](https://github.com/hanachiru/RapidEnum/README.jp.md)

RapidEnum is a Source Generator that provides fast-running enum utilities for C#/.NET. It is faster than the [.NET API](https://learn.microsoft.com/en-us/dotnet/api/system.enum?view=net-8.0) and achieves zero allocation for all methods.

**Package - [RapidEnum](https://www.nuget.org/packages/RapidEnum)**

![PerformanceComparison](https://github.com/hanachiru/RapidEnum/Images/PerformanceComparison.png)

It performed better than .NET API. It is also faster than [FastEnum v1.8.0](https://github.com/xin9le/FastEnum/releases/tag/v1.8.0). For more information on performance comparisons, see [this](https://github.com/hanachiru/RapidEnum).

RapidEnum is heavily influenced by [FastEnum](https://github.com/xin9le/FastEnum). API is very similar to FastEnum. Thanks to [xin9le](https://github.com/xin9le) for creating a great library!

# Table of Contents

- [Requirements](#Requirements)
- [Installation](#Installation)
  - [NuGet](#NuGet)
  - [Unity](#Unity)
    - [asmdef settings](#asmdef-settings)
- [How to use](#How-to-use)
  - [Basic usage](#Basic-usage)
  - [How to use it for any enum](#How-to-use-it-for-any-enum)
  - [Get Name and Value as a pair](#Get-Name-and-Value-as-a-pair)
  - [Use EnumMemberAttribute](#Use-EnumMemberAttribute)
- [Performance comparison](#Performance-comparison)

# Requirements

- .NET Standard2.0 or newer
- Unity 2022.3.12f1 or newer

# Installation

## NuGet

```shell
$ dotnet add package RapidEnum
```

**nuget.org : [RapidEnum](https://www.nuget.org/packages/RapidEnum)**

## Unity

Add the following git URL from the Package Manager

```
https://github.com/hanachiru/RapidEnum.git?path=/RapidEnum.Unity/Packages/com.hanachiru.rapidenum
```

![UPM](https://github.com/hanachiru/RapidEnum/Images/UPM.png)

### asmdef settings
If you have created a `.asmdef`, you need to add `RapidEnum` to the Assembly Definition References.  
 
<img src="./Images/Asmdef.png" width="300" />

# How to use

## Basic usage

Attaching `[RapidEnum]` to the target enum generates an enum utility class. Note that this is only valid for `public` or `internal` enum.

```csharp
[RapidEnum]
public enum Weather
{
    Sun,
    Cloud,
    Rain,
    Snow
}
```

The `Enum name + EnumExtensions` class defines the relevant methods.

```csharp
// Sun,Cloud,Rain,Snow
IReadOnlyList<Weather> values = WeatherEnumExtensions.GetValues();

// Sun,Cloud,Rain,Snow
IReadOnlyList<string> names = WeatherEnumExtensions.GetNames();

// Rain
string name = WeatherEnumExtensions.GetName(Weather.Rain);

// Cloud
string str = Weather.Cloud.ToStringFast();

// True
bool defined = WeatherEnumExtensions.IsDefined("Sun");

// Sun
Weather parse = WeatherEnumExtensions.Parse("Sun");

// True
// Sun
bool tryParse = WeatherEnumExtensions.TryParse("Sun", out Weather value);
```

## How to use it for any enum

The `[RapidEnumWithType]` can be used to generate utility classes for any enum.

For `static partial class` that are `public` or `internal`, give them a `[RapidEnumWithType]` with the target enum as an argument. The class name can be any string, but `Enum name + EnumExtensions` is easier to understand.

```csharp
// System.DateTimeKind has Unspecified, Utc, Local
[RapidEnumWithType(typeof(DateTimeKind))]
public static partial class DateTimeKindEnumExtensions
{
}
```

There is no performance difference compared to using `[RapidEnum]`. Use `[RapidEnumWithType]` if `[RapidEnum]` cannot be given, such as an enum provided by a third-party library.

```csharp
// Unspecified,Utc,Local
IReadOnlyList<DateTimeKind> values = DateTimeKindEnumExtensions.GetValues();

// Unspecified,Utc,Local
IReadOnlyList<string> names = DateTimeKindEnumExtensions.GetNames();

// Local
string name = DateTimeKindEnumExtensions.GetName(DateTimeKind.Local);

// Local
string str = DateTimeKind.Local.ToStringFast();

// True
bool defined = DateTimeKindEnumExtensions.IsDefined("Local");

// Local
DateTimeKind parse = DateTimeKindEnumExtensions.Parse("Local");

// True
// Local
bool tryParse = DateTimeKindEnumExtensions.TryParse("Local", out DateTimeKind value);
```

## Get Name and Value as a pair

Use the `GetMembers` and `GetMember` methods if you want to get the Name and Value of enum in pairs.

```csharp
WeatherEnumExtensions.Member member = WeatherEnumExtensions.GetMember(Weather.Rain);
var (name, value) = member;

foreach (WeatherEnumExtensions.Member item in WeatherEnumExtensions.GetMembers())
{
    Console.WriteLine($"Name : {item.Name}, Value : {item.Value}");
}
```

## Use EnumMemberAttribute
If you use [EnumMemberAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.serialization.enummemberattribute?view=net-9.0), you can get the Value property of EnumMemberAttribute.
```csharp
[RapidEnum]
public enum Weather
{
    [EnumMember(Value = "sun")]
    Sun,
    [EnumMember]
    Cloud,
    [EnumMember(Value = "rain")]
    Rain,
    Snow
}
```
```csharp
// sun
string enumMemberValue = Weather.Sun.GetEnumMemberValue();

// null
string enumMemberValue = Weather.Cloud.GetEnumMemberValue();
```

# Performance comparison

| Method              |       Mean |     Error |    StdDev |     Median |   Gen0 | Allocated |
| ------------------- | ---------: | --------: | --------: | ---------: | -----: | --------: |
| RapidEnum_GetValues |  0.0042 ns | 0.0059 ns | 0.0052 ns |  0.0028 ns |      - |         - |
| FastEnum_GetValues  |  0.0083 ns | 0.0086 ns | 0.0081 ns |  0.0055 ns |      - |         - |
| NET_GetValues       | 64.4620 ns | 0.9908 ns | 0.9268 ns | 64.2767 ns | 0.0048 |      40 B |
| RapidEnum_GetNames  |  0.0006 ns | 0.0017 ns | 0.0015 ns |  0.0000 ns |      - |         - |
| FastEnum_GetNames   |  0.0025 ns | 0.0031 ns | 0.0028 ns |  0.0012 ns |      - |         - |
| NET_GetNames        | 12.3820 ns | 0.1086 ns | 0.1016 ns | 12.4076 ns | 0.0067 |      56 B |
| RapidEnum_GetName   |  0.0069 ns | 0.0085 ns | 0.0071 ns |  0.0039 ns |      - |         - |
| FastEnum_GetName    |  0.2530 ns | 0.0070 ns | 0.0065 ns |  0.2527 ns |      - |         - |
| NET_GetName         | 15.9190 ns | 0.0524 ns | 0.0490 ns | 15.9046 ns | 0.0029 |      24 B |
| RapidEnum_ToString  |  0.0103 ns | 0.0049 ns | 0.0046 ns |  0.0110 ns |      - |         - |
| FastEnum_ToString   |  0.4844 ns | 0.0062 ns | 0.0052 ns |  0.4845 ns |      - |         - |
| NET_ToString        |  6.1700 ns | 0.0451 ns | 0.0376 ns |  6.1493 ns | 0.0029 |      24 B |
| RapidEnum_IsDefines |  0.0026 ns | 0.0036 ns | 0.0034 ns |  0.0000 ns |      - |         - |
| FastEnum_IsDefines  |  4.6724 ns | 0.0583 ns | 0.0545 ns |  4.6434 ns |      - |         - |
| NET_IsDefines       | 14.5923 ns | 0.0355 ns | 0.0332 ns | 14.5996 ns |      - |         - |
| RapidEnum_Parse     |  0.9258 ns | 0.0161 ns | 0.0150 ns |  0.9240 ns |      - |         - |
| FastEnum_Parse      |  4.6223 ns | 0.0082 ns | 0.0073 ns |  4.6192 ns |      - |         - |
| NET_Parse           |  8.8707 ns | 0.0965 ns | 0.0903 ns |  8.8293 ns |      - |         - |
| RapidEnum_TryParse  |  0.7633 ns | 0.0097 ns | 0.0090 ns |  0.7657 ns |      - |         - |
| FastEnum_TryParse   |  4.6869 ns | 0.0254 ns | 0.0212 ns |  4.6852 ns |      - |         - |
| NET_TryParse        |  8.8433 ns | 0.0609 ns | 0.0569 ns |  8.8268 ns |      - |         - |

![PerformanceComparison](https://github.com/hanachiru/RapidEnum/Images/PerformanceComparison.png)

[Benchmark Source](https://github.com/hanachiru/RapidEnum/tree/main/RapidEnum.Benchmark)

```
BenchmarkDotNet v0.14.0, macOS Sonoma 14.4.1 (23E224) [Darwin 23.4.0]
Apple M2 Pro, 1 CPU, 12 logical and 12 physical cores
.NET SDK 8.0.303
[Host]     : .NET 8.0.7 (8.0.724.31311), Arm64 RyuJIT AdvSIMD
DefaultJob : .NET 8.0.7 (8.0.724.31311), Arm64 RyuJIT AdvSIMD
```


:::

### About
:::note

Generate enum values without reflection


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RapidEnum**
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
    <PackageReference Include="RapidEnum" Version="1.0.2" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RapidEnum\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **RapidEnum** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
Console.WriteLine("Car types:" + CarTypesEnumExtensions.GetValues().Count);
var cars = CarTypesEnumExtensions.GetValues();
foreach (var car in cars)
{
    Console.WriteLine(car.ToStringFast());
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RapidEnum\src\EnumDemo\CarTypes.cs" label="CarTypes.cs" >

  This is the use of **RapidEnum** in *CarTypes.cs*

```csharp showLineNumbers 

namespace EnumDemo;
[RapidEnum.RapidEnum]
public enum CarTypes 
{
    None,
    Dacia ,
    Tesla ,
    BMW ,
    Mercedes ,
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RapidEnum\src\EnumDemo\obj\GX\RapidEnum.Generators\RapidEnum.RapidEnumGenerator\CarTypesEnumExtensions.g.cs" label="CarTypesEnumExtensions.g.cs" >
```csharp showLineNumbers 
// <auto-generated />

namespace EnumDemo 
{
    
  public static partial class CarTypesEnumExtensions
  {
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static string ToStringFast(this global::EnumDemo.CarTypes value)
      {
          return value switch
          {
              global::EnumDemo.CarTypes.None => nameof(global::EnumDemo.CarTypes.None),
              global::EnumDemo.CarTypes.Dacia => nameof(global::EnumDemo.CarTypes.Dacia),
              global::EnumDemo.CarTypes.Tesla => nameof(global::EnumDemo.CarTypes.Tesla),
              global::EnumDemo.CarTypes.BMW => nameof(global::EnumDemo.CarTypes.BMW),
              global::EnumDemo.CarTypes.Mercedes => nameof(global::EnumDemo.CarTypes.Mercedes),
              _ => value.ToString()
          };
      }
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static bool IsDefined(global::EnumDemo.CarTypes value)
      {
          return value switch
          {
              global::EnumDemo.CarTypes.None => true,
              global::EnumDemo.CarTypes.Dacia => true,
              global::EnumDemo.CarTypes.Tesla => true,
              global::EnumDemo.CarTypes.BMW => true,
              global::EnumDemo.CarTypes.Mercedes => true,
              _ => false,
          };
      }
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static bool IsDefined(string name)
      {
          return name switch
          {
              nameof(global::EnumDemo.CarTypes.None) => true,
              nameof(global::EnumDemo.CarTypes.Dacia) => true,
              nameof(global::EnumDemo.CarTypes.Tesla) => true,
              nameof(global::EnumDemo.CarTypes.BMW) => true,
              nameof(global::EnumDemo.CarTypes.Mercedes) => true,
              _ => false,
          };
      }
      
      private static readonly global::System.Collections.ObjectModel.ReadOnlyCollection<global::EnumDemo.CarTypes> CacheValues = new global::System.Collections.ObjectModel.ReadOnlyCollection<global::EnumDemo.CarTypes>(new[]
      {
          global::EnumDemo.CarTypes.None,
          global::EnumDemo.CarTypes.Dacia,
          global::EnumDemo.CarTypes.Tesla,
          global::EnumDemo.CarTypes.BMW,
          global::EnumDemo.CarTypes.Mercedes,
      });
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static global::System.Collections.Generic.IReadOnlyList<global::EnumDemo.CarTypes> GetValues() => CacheValues;
  
      private static readonly global::System.Collections.ObjectModel.ReadOnlyCollection<string> CacheNames = new global::System.Collections.ObjectModel.ReadOnlyCollection<string>(new[]
      {
          nameof(global::EnumDemo.CarTypes.None),
          nameof(global::EnumDemo.CarTypes.Dacia),
          nameof(global::EnumDemo.CarTypes.Tesla),
          nameof(global::EnumDemo.CarTypes.BMW),
          nameof(global::EnumDemo.CarTypes.Mercedes),
      });
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static global::System.Collections.Generic.IReadOnlyList<string> GetNames() => CacheNames;
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static string GetName(global::EnumDemo.CarTypes value)
      {
          return value.ToStringFast();
      }
      
      private static readonly global::System.Collections.ObjectModel.ReadOnlyCollection<Member> CacheMembers =  new global::System.Collections.ObjectModel.ReadOnlyCollection<Member>(new[]
      {
          new Member(nameof(global::EnumDemo.CarTypes.None), global::EnumDemo.CarTypes.None),
          new Member(nameof(global::EnumDemo.CarTypes.Dacia), global::EnumDemo.CarTypes.Dacia),
          new Member(nameof(global::EnumDemo.CarTypes.Tesla), global::EnumDemo.CarTypes.Tesla),
          new Member(nameof(global::EnumDemo.CarTypes.BMW), global::EnumDemo.CarTypes.BMW),
          new Member(nameof(global::EnumDemo.CarTypes.Mercedes), global::EnumDemo.CarTypes.Mercedes),
      });
    
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static global::System.Collections.Generic.IReadOnlyList<Member> GetMembers() => CacheMembers;
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static Member GetMember(global::EnumDemo.CarTypes value)
      {
          return value.ToMember();
      }
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static Member ToMember(this global::EnumDemo.CarTypes value)
      {
          return new Member(ToStringFast(value), value);
      }
    
      public sealed class Member
      {
          public string Name \{ get; }
          public global::EnumDemo.CarTypes Value \{ get; }

          internal Member(string name, global::EnumDemo.CarTypes value)
          {
              Name = name;
              Value = value;
          }
          
          public void Deconstruct(out string name, out global::EnumDemo.CarTypes value)
          {
              name = Name;
              value = Value;
          }
      }
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static global::EnumDemo.CarTypes Parse(string name, bool ignoreCase = false)
      {
          if (TryParse(name, out var value, ignoreCase))
          {
              return value;
          }
          throw new global::System.ArgumentException($"The value '{name}' is not defined in enum 'global::EnumDemo.CarTypes'.");
      }
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static bool TryParse(
          string name,
          out global::EnumDemo.CarTypes value,
          bool ignoreCase = false)
      {
          return ignoreCase ? TryParseIgnoreCase(name, out value) : TryParse(name, out value);
      }
  
      private static bool TryParseIgnoreCase(
          string name,
          out global::EnumDemo.CarTypes value)
      {
          switch (name)
          {
              case not null when name.Equals(nameof(global::EnumDemo.CarTypes.None), global::System.StringComparison.OrdinalIgnoreCase):
                  value = global::EnumDemo.CarTypes.None;
                  return true;
              case not null when name.Equals(nameof(global::EnumDemo.CarTypes.Dacia), global::System.StringComparison.OrdinalIgnoreCase):
                  value = global::EnumDemo.CarTypes.Dacia;
                  return true;
              case not null when name.Equals(nameof(global::EnumDemo.CarTypes.Tesla), global::System.StringComparison.OrdinalIgnoreCase):
                  value = global::EnumDemo.CarTypes.Tesla;
                  return true;
              case not null when name.Equals(nameof(global::EnumDemo.CarTypes.BMW), global::System.StringComparison.OrdinalIgnoreCase):
                  value = global::EnumDemo.CarTypes.BMW;
                  return true;
              case not null when name.Equals(nameof(global::EnumDemo.CarTypes.Mercedes), global::System.StringComparison.OrdinalIgnoreCase):
                  value = global::EnumDemo.CarTypes.Mercedes;
                  return true;
              case not null when int.TryParse(name, out var val):
                  value = (global::EnumDemo.CarTypes)val;
                  return true;
              default:
                  value = default;
                  return false;
          }
      }
  
      private static bool TryParse(
          string name,
          out global::EnumDemo.CarTypes value)
      {
          switch (name)
          {
              case nameof(global::EnumDemo.CarTypes.None):
                   value = global::EnumDemo.CarTypes.None;
                  return true;
              case nameof(global::EnumDemo.CarTypes.Dacia):
                   value = global::EnumDemo.CarTypes.Dacia;
                  return true;
              case nameof(global::EnumDemo.CarTypes.Tesla):
                   value = global::EnumDemo.CarTypes.Tesla;
                  return true;
              case nameof(global::EnumDemo.CarTypes.BMW):
                   value = global::EnumDemo.CarTypes.BMW;
                  return true;
              case nameof(global::EnumDemo.CarTypes.Mercedes):
                   value = global::EnumDemo.CarTypes.Mercedes;
                  return true;
              case not null when int.TryParse(name, out var val):
                  value = (global::EnumDemo.CarTypes)val;
                  return true;
              default:
                  value = default;
                  return false;
          }
      }
      
      private static readonly global::System.Type CacheUnderlyingType = global::System.Enum.GetUnderlyingType(typeof(global::EnumDemo.CarTypes));
      public static global::System.Type GetUnderlyingType() => CacheUnderlyingType;
      
      [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
      public static string GetEnumMemberValue(this global::EnumDemo.CarTypes value)
      {
          return value switch
          {
              global::EnumDemo.CarTypes.None => null,
              global::EnumDemo.CarTypes.Dacia => null,
              global::EnumDemo.CarTypes.Tesla => null,
              global::EnumDemo.CarTypes.BMW => null,
              global::EnumDemo.CarTypes.Mercedes => null,
              _ => null
          };
      }
  }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RapidEnum\src\EnumDemo\obj\GX\RapidEnum.Generators\RapidEnum.RapidEnumGenerator\RapidEnumAttributes.g.cs" label="RapidEnumAttributes.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>

namespace RapidEnum
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Enum)]
    internal sealed class RapidEnumAttribute : global::System.Attribute
    {
    
    }
    
    [global::System.AttributeUsage(global::System.AttributeTargets.Class, Inherited = false)]
    public sealed class RapidEnumWithTypeAttribute : global::System.Attribute
    {
        public global::System.Type Type \{ get; }
    
        public RapidEnumWithTypeAttribute(global::System.Type type)
        {
            Type = type;
        }
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RapidEnum ](/sources/RapidEnum.zip)

:::


### Share RapidEnum 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRapidEnum&quote=RapidEnum" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRapidEnum&text=RapidEnum:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRapidEnum" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRapidEnum&title=RapidEnum" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRapidEnum&title=RapidEnum&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRapidEnum" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RapidEnum

<SameCategory />

