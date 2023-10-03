---
sidebar_position: 670
title: 67 - CredFetoEnum
description: Enum / description to string 
slug: /CredFetoEnum
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# CredFetoEnum  by Mark Ridgwell


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Credfeto.Enumeration.Source.Generation?label=Credfeto.Enumeration.Source.Generation)](https://www.nuget.org/packages/Credfeto.Enumeration.Source.Generation/)
[![GitHub last commit](https://img.shields.io/github/last-commit/credfeto/credfeto-enum-source-generation?label=updated)](https://github.com/credfeto/credfeto-enum-source-generation)
![GitHub Repo stars](https://img.shields.io/github/stars/credfeto/credfeto-enum-source-generation?style=social)

## Details

### Info
:::info

Name: **CredFetoEnum**

Source code generator for Enums.

Author: Mark Ridgwell

NuGet: 
*https://www.nuget.org/packages/Credfeto.Enumeration.Source.Generation/*   


You can find more details at https://github.com/credfeto/credfeto-enum-source-generation

Source : https://github.com/credfeto/credfeto-enum-source-generation

:::

### Original Readme
:::note

# credfeto-enum-source-generation

C# Source generator for enums

## Using

Add a reference to the ``Credfeto.Enumeration.Source.Generation`` package in each project you need the code generation to run.

```xml
<ItemGroup>
  <PackageReference 
            Include="Credfeto.Enumeration.Source.Generation" 
            Version="1.0.0.11" 
            PrivateAssets="All" ExcludeAssets="runtime" />
</ItemGroup>
```

For each enum in the project, generates a class with the following extension methods:

* public static string GetName(this MyEnum value)
* public static string GetDescription(this MyEnum value)

Given an the example enum defined below:

```csharp
public enum ExampleEnumValues
{
    ZERO = 0,

    [Description("One \"1\"")]
    ONE = 1,

    SAME_AS_ONE = ONE,
}
```

To get the name and value of the enum values. In release mode this can be practically instant.

```csharp
ExampleEnumValues value = ExampleEnumValues.ONE;
 string name = value.GetName(); // ONE
 string description = value.GetDescription(); // One "1"
 bool isDefined = value.IsDefine(); // true
 bool isNotDefined = ((ExampleEnumValues)42).IsDefine(); // false
```

## Enums in other assemblies

Reference the following package in the project that contains the enum extensions class to generate.

```xml
<ItemGroup>
    <PackageReference
            Include="Credfeto.Enumeration.Source.Generation.Attributes"
            Version="0.0.2.3"
            PrivateAssets="All" ExcludeAssets="runtime" />
</ItemGroup>
```

Add an ``EnumText`` attribute to a partial static extension class for each enum you want to expose.

```csharp
[EnumText(typeof(System.Net.HttpStatusCode))]
[EnumText(typeof(ThirdParty.ExampleEnum))]
public static partial class EnumExtensions
{
}
```

Will generate the same extension methods, but for the types nominated in the attributes.

## Benchmarks

Benchmarks are in the Benchmark.net project ``Credfeto.Enumeration.Source.Generation.Benchmarks``, with a summary of a
run below.

|                         Method |          Mean |      Error |     StdDev |        Median | Allocated |
|------------------------------- |--------------:|-----------:|-----------:|--------------:|----------:|
|                GetNameToString |    25.5162 ns |  0.4146 ns |  0.3675 ns |    25.5322 ns |      24 B |
|              GetNameReflection |    37.8875 ns |  0.3971 ns |  0.3520 ns |    37.8542 ns |      24 B |
|        GetNameCachedReflection |    21.6571 ns |  0.4514 ns |  0.3770 ns |    21.6841 ns |      24 B |
|           GetNameCodeGenerated |     0.0009 ns |  0.0039 ns |  0.0036 ns |     0.0000 ns |         - |
|       GetDescriptionReflection | 1,380.4979 ns | 15.1089 ns | 13.3937 ns | 1,382.9476 ns |     264 B |
| GetDescriptionCachedReflection |    22.8844 ns |  0.3856 ns |  0.3607 ns |    22.8364 ns |      24 B |
|    GetDescriptionCodeGenerated |     0.0035 ns |  0.0057 ns |  0.0053 ns |     0.0000 ns |         - |
|        IsDefinedCodeReflection |    48.7961 ns |  0.9675 ns |  1.0352 ns |    48.5573 ns |      24 B |
|  IsDefinedCodeReflectionCached |    21.4452 ns |  0.3169 ns |  0.2965 ns |    21.3938 ns |      24 B |
|         IsDefinedCodeGenerated |     0.0012 ns |  0.0041 ns |  0.0037 ns |     0.0000 ns |         - |


```
// * Warnings *
ZeroMeasurement
  EnumBench.GetNameCodeGenerated: Default        -> The method duration is indistinguishable from the empty method duration
  EnumBench.GetDescriptionCodeGenerated: Default -> The method duration is indistinguishable from the empty method duration
  EnumBench.IsDefinedCodeGenerated: Default      -> The method duration is indistinguishable from the empty method duration

// * Legends *
  Mean      : Arithmetic mean of all measurements
  Error     : Half of 99.9% confidence interval
  StdDev    : Standard deviation of all measurements
  Median    : Value separating the higher half of all measurements (50th percentile)
  Allocated : Allocated memory per single operation (managed only, inclusive, 1KB = 1024B)
  1 ns      : 1 Nanosecond (0.000000001 sec)
```

## Viewing Compiler Generated files

Add the following to the csproj file:

```xml
  <PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
  </PropertyGroup>
  <ItemGroup>
    <!-- Don't include the output from a previous source generator execution into future runs; the */** trick here ensures that there's
    at least one subdirectory, which is our key that it's coming from a source generator as opposed to something that is coming from
    some other tool. -->
    <Compile Remove="$(CompilerGeneratedFilesOutputPath)/*/**/*.cs" />
  </ItemGroup>
```

## Build Status

| Branch  | Status                                                                                                                                                                                                                                                              |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| main    | [![Build: Pre-Release](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-pre-release.yml/badge.svg)](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-pre-release.yml) |
| release | [![Build: Release](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-release.yml/badge.svg)](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-release.yml)             |

## Changelog

View [changelog](https://github.com/credfeto/credfeto-enum-source-generation/CHANGELOG.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

:::

### About
:::note

Enum / description to string 


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **CredFetoEnum**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Credfeto.Enumeration.Source.Generation" Version="1.1.0.138" OutputItemType="Analyzer">
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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\CredFetoEnum\src\EnumClassDemo\Program.cs" label="Program.cs" >

  This is the use of **CredFetoEnum** in *Program.cs*

```csharp showLineNumbers 
using EnumClassDemo;
Console.WriteLine(Colors.None.GetName());
Console.WriteLine(Colors.None.GetDescription());
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\CredFetoEnum\src\EnumClassDemo\Colors.cs" label="Colors.cs" >

  This is the use of **CredFetoEnum** in *Colors.cs*

```csharp showLineNumbers 
using System.ComponentModel;

namespace EnumClassDemo;

public enum Colors
{
    [Description("This should be never seen")]
    None =0,
    Red,
    Green,
    Blue,
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\CredFetoEnum\src\EnumClassDemo\obj\GX\Credfeto.Enumeration.Source.Generation\Credfeto.Enumeration.Source.Generation.EnumGenerator\EnumClassDemo.ColorsGeneratedExtensions.generated.cs" label="EnumClassDemo.ColorsGeneratedExtensions.generated.cs" >


```csharp showLineNumbers 
using System;
using System.CodeDom.Compiler;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace EnumClassDemo;

[GeneratedCode(tool: "Credfeto.Enumeration.Source.Generation.EnumGenerator", version: "1.1.0.138+a4e45a10ca3da5e916ae17843913bfff8c33cdef")]
public static class ColorsGeneratedExtensions
{
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static string GetName(this Colors value)
    {
        return value switch
        {
            Colors.None => nameof(Colors.None),
            Colors.Red => nameof(Colors.Red),
            Colors.Green => nameof(Colors.Green),
            Colors.Blue => nameof(Colors.Blue),
            _ => ThrowInvalidEnumMemberException(value: value)
        };
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static string GetDescription(this Colors value)
    {
        return value switch
        {
            Colors.None => "This should be never seen",
            _ => GetName(value)
        };
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool IsDefined(this Colors value)
    {
        return value is Colors.None or Colors.Red or Colors.Green or Colors.Blue;
    }

    public static string ThrowInvalidEnumMemberException(this Colors value)
    {
        #if NET7_0_OR_GREATER
        throw new UnreachableException(message: "Colors: Unknown enum member");
        #else
        throw new ArgumentOutOfRangeException(nameof(value), actualValue: value, message: "Unknown enum member");
        #endif
    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\CredFetoEnum\src\EnumClassDemo\obj\GX\EnumClass.Generator\EnumClass.Generator.EnumClassIncrementalGenerator\Colors.g.cs" label="Colors.g.cs" >


```csharp showLineNumbers 
#nullable enable

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace EnumClassDemo.EnumClass
{

public abstract partial class Colors: IEquatable<Colors>, IEquatable<global::EnumClassDemo.Colors>, IComparable<Colors>, IComparable<global::EnumClassDemo.Colors>, IComparable
{
    protected readonly global::EnumClassDemo.Colors _realEnumValue;

    protected Colors(global::EnumClassDemo.Colors enumValue)
    {
        this._realEnumValue = enumValue;
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static explicit operator global::EnumClassDemo.Colors(Colors value)
    {
        return value._realEnumValue;
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static implicit operator int(Colors value)
    {
        return (int) value._realEnumValue;
    }

    public bool Equals(Colors? other)
    {
        return !ReferenceEquals(other, null) && other._realEnumValue == this._realEnumValue;
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public bool Equals(global::EnumClassDemo.Colors other)
    {
        return other == this._realEnumValue;
    }

    public override bool Equals(object? other)
    {
        if (ReferenceEquals(other, null)) return false;
        if (ReferenceEquals(other, this)) return true;
        if (other is Colors)
        {
            return this.Equals((Colors) other);
        }
        if (other is global::EnumClassDemo.Colors)
        {
            return this.Equals((global::EnumClassDemo.Colors) other);
        }
        return false;
    }

    public static bool operator ==(Colors left, global::EnumClassDemo.Colors right)
    {
        return left.Equals(right);
    }

    public static bool operator !=(Colors left, global::EnumClassDemo.Colors right)
    {
        return !left.Equals(right);
    }

    public static bool operator ==(global::EnumClassDemo.Colors left, Colors right)
    {
        return right.Equals(left);
    }

    public static bool operator !=(global::EnumClassDemo.Colors left, Colors right)
    {
        return !right.Equals(left);
    }

    public static bool operator ==(Colors left, Colors right)
    {
        return !ReferenceEquals(left, null) && left.Equals(right);
    }

    public static bool operator !=(Colors left, Colors right)
    {
        return ReferenceEquals(left, null) || !left.Equals(right);
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public override int GetHashCode()
    {
        return this._realEnumValue.GetHashCode();
    }

    public static bool TryParse(string value, out Colors? colors)
    {
        switch (value)
        {
            case "None":
                colors = None;
                return true;
            case "Red":
                colors = Red;
                return true;
            case "Green":
                colors = Green;
                return true;
            case "Blue":
                colors = Blue;
                return true;
            case "Colors.None":
                colors = None;
                return true;
            case "Colors.Red":
                colors = Red;
                return true;
            case "Colors.Green":
                colors = Green;
                return true;
            case "Colors.Blue":
                colors = Blue;
                return true;
        }
        colors = null;
        return false;
    }


    public static bool TryParse(int value, out Colors? colors)
    {
        switch (value)
        {
            case 0:
                colors = None;
                return true;
            case 1:
                colors = Red;
                return true;
            case 2:
                colors = Green;
                return true;
            case 3:
                colors = Blue;
                return true;
        }
        colors = null;
        return false;
    }


    public int CompareTo(object? other)
    {
        if (ReferenceEquals(this, other)) return 0;
        if (ReferenceEquals(null, other)) return 1;
        if (other is Colors)
        {
            Colors temp = (Colors) other;
            int left = ((int)this._realEnumValue);
            int right = ((int)temp._realEnumValue);
            return left < right ? -1 : left == right ? 0 : 1;
        }
        if (other is global::EnumClassDemo.Colors)
        {
            int left = ((int)this._realEnumValue);
            int right = ((int)other);
            return left < right ? -1 : left == right ? 0 : 1;
        }
        throw new ArgumentException($"Object to compare must be either {typeof(Colors)} or {typeof(global::EnumClassDemo.Colors)}. Given type: {other.GetType()}", "other");
    }

    public int CompareTo(Colors? other)
    {
        if (ReferenceEquals(this, other)) return 0;
        if (ReferenceEquals(null, other)) return 1;
            int left = ((int)this._realEnumValue);
            int right = ((int)other._realEnumValue);
            return left < right ? -1 : left == right ? 0 : 1;
    }

    public int CompareTo(global::EnumClassDemo.Colors other)
    {
            int left = ((int)this._realEnumValue);
            int right = ((int)other);
            return left < right ? -1 : left == right ? 0 : 1;
    }

    public abstract void Switch(Action<NoneEnumValue> noneSwitch, Action<RedEnumValue> redSwitch, Action<GreenEnumValue> greenSwitch, Action<BlueEnumValue> blueSwitch);
    public abstract TResult Switch<TResult>(Func<NoneEnumValue, TResult> noneSwitch, Func<RedEnumValue, TResult> redSwitch, Func<GreenEnumValue, TResult> greenSwitch, Func<BlueEnumValue, TResult> blueSwitch);
    public abstract void Switch<T0>(T0 arg0, Action<NoneEnumValue, T0> noneSwitch, Action<RedEnumValue, T0> redSwitch, Action<GreenEnumValue, T0> greenSwitch, Action<BlueEnumValue, T0> blueSwitch);
    public abstract TResult Switch<TResult, T0>(T0 arg0, Func<NoneEnumValue, T0, TResult> noneSwitch, Func<RedEnumValue, T0, TResult> redSwitch, Func<GreenEnumValue, T0, TResult> greenSwitch, Func<BlueEnumValue, T0, TResult> blueSwitch);
    public abstract void Switch<T0, T1>(T0 arg0, T1 arg1, Action<NoneEnumValue, T0, T1> noneSwitch, Action<RedEnumValue, T0, T1> redSwitch, Action<GreenEnumValue, T0, T1> greenSwitch, Action<BlueEnumValue, T0, T1> blueSwitch);
    public abstract TResult Switch<TResult, T0, T1>(T0 arg0, T1 arg1, Func<NoneEnumValue, T0, T1, TResult> noneSwitch, Func<RedEnumValue, T0, T1, TResult> redSwitch, Func<GreenEnumValue, T0, T1, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, TResult> blueSwitch);
    public abstract void Switch<T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Action<NoneEnumValue, T0, T1, T2> noneSwitch, Action<RedEnumValue, T0, T1, T2> redSwitch, Action<GreenEnumValue, T0, T1, T2> greenSwitch, Action<BlueEnumValue, T0, T1, T2> blueSwitch);
    public abstract TResult Switch<TResult, T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Func<NoneEnumValue, T0, T1, T2, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, TResult> blueSwitch);
    public abstract void Switch<T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Action<NoneEnumValue, T0, T1, T2, T3> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3> blueSwitch);
    public abstract TResult Switch<TResult, T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Func<NoneEnumValue, T0, T1, T2, T3, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, TResult> blueSwitch);
    public abstract void Switch<T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Action<NoneEnumValue, T0, T1, T2, T3, T4> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4> blueSwitch);
    public abstract TResult Switch<TResult, T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Func<NoneEnumValue, T0, T1, T2, T3, T4, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, TResult> blueSwitch);
    public abstract void Switch<T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5> blueSwitch);
    public abstract TResult Switch<TResult, T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, TResult> blueSwitch);
    public abstract void Switch<T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5, T6> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6> blueSwitch);
    public abstract TResult Switch<TResult, T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> blueSwitch);

    public static readonly NoneEnumValue None = new NoneEnumValue();
    public partial class NoneEnumValue: Colors
    {
        public NoneEnumValue(): base(global::EnumClassDemo.Colors.None) { }
        public override string ToString()
        {
            return "None";
        }

        public override void Switch(Action<NoneEnumValue> noneSwitch, Action<RedEnumValue> redSwitch, Action<GreenEnumValue> greenSwitch, Action<BlueEnumValue> blueSwitch)
        {
            noneSwitch(this);
        }

        public override TResult Switch<TResult>(Func<NoneEnumValue, TResult> noneSwitch, Func<RedEnumValue, TResult> redSwitch, Func<GreenEnumValue, TResult> greenSwitch, Func<BlueEnumValue, TResult> blueSwitch)
        {
            return noneSwitch(this);
        }

        public override void Switch<T0>(T0 arg0, Action<NoneEnumValue, T0> noneSwitch, Action<RedEnumValue, T0> redSwitch, Action<GreenEnumValue, T0> greenSwitch, Action<BlueEnumValue, T0> blueSwitch)
        {
            noneSwitch(this, arg0);
        }

        public override TResult Switch<TResult, T0>(T0 arg0, Func<NoneEnumValue, T0, TResult> noneSwitch, Func<RedEnumValue, T0, TResult> redSwitch, Func<GreenEnumValue, T0, TResult> greenSwitch, Func<BlueEnumValue, T0, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0);
        }

        public override void Switch<T0, T1>(T0 arg0, T1 arg1, Action<NoneEnumValue, T0, T1> noneSwitch, Action<RedEnumValue, T0, T1> redSwitch, Action<GreenEnumValue, T0, T1> greenSwitch, Action<BlueEnumValue, T0, T1> blueSwitch)
        {
            noneSwitch(this, arg0, arg1);
        }

        public override TResult Switch<TResult, T0, T1>(T0 arg0, T1 arg1, Func<NoneEnumValue, T0, T1, TResult> noneSwitch, Func<RedEnumValue, T0, T1, TResult> redSwitch, Func<GreenEnumValue, T0, T1, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0, arg1);
        }

        public override void Switch<T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Action<NoneEnumValue, T0, T1, T2> noneSwitch, Action<RedEnumValue, T0, T1, T2> redSwitch, Action<GreenEnumValue, T0, T1, T2> greenSwitch, Action<BlueEnumValue, T0, T1, T2> blueSwitch)
        {
            noneSwitch(this, arg0, arg1, arg2);
        }

        public override TResult Switch<TResult, T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Func<NoneEnumValue, T0, T1, T2, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0, arg1, arg2);
        }

        public override void Switch<T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Action<NoneEnumValue, T0, T1, T2, T3> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3> blueSwitch)
        {
            noneSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Func<NoneEnumValue, T0, T1, T2, T3, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override void Switch<T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Action<NoneEnumValue, T0, T1, T2, T3, T4> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4> blueSwitch)
        {
            noneSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Func<NoneEnumValue, T0, T1, T2, T3, T4, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5> blueSwitch)
        {
            noneSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5, T6> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6> blueSwitch)
        {
            noneSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> blueSwitch)
        {
            return noneSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override int GetHashCode()
        {
            return 0;
        }
    }

    public static readonly RedEnumValue Red = new RedEnumValue();
    public partial class RedEnumValue: Colors
    {
        public RedEnumValue(): base(global::EnumClassDemo.Colors.Red) { }
        public override string ToString()
        {
            return "Red";
        }

        public override void Switch(Action<NoneEnumValue> noneSwitch, Action<RedEnumValue> redSwitch, Action<GreenEnumValue> greenSwitch, Action<BlueEnumValue> blueSwitch)
        {
            redSwitch(this);
        }

        public override TResult Switch<TResult>(Func<NoneEnumValue, TResult> noneSwitch, Func<RedEnumValue, TResult> redSwitch, Func<GreenEnumValue, TResult> greenSwitch, Func<BlueEnumValue, TResult> blueSwitch)
        {
            return redSwitch(this);
        }

        public override void Switch<T0>(T0 arg0, Action<NoneEnumValue, T0> noneSwitch, Action<RedEnumValue, T0> redSwitch, Action<GreenEnumValue, T0> greenSwitch, Action<BlueEnumValue, T0> blueSwitch)
        {
            redSwitch(this, arg0);
        }

        public override TResult Switch<TResult, T0>(T0 arg0, Func<NoneEnumValue, T0, TResult> noneSwitch, Func<RedEnumValue, T0, TResult> redSwitch, Func<GreenEnumValue, T0, TResult> greenSwitch, Func<BlueEnumValue, T0, TResult> blueSwitch)
        {
            return redSwitch(this, arg0);
        }

        public override void Switch<T0, T1>(T0 arg0, T1 arg1, Action<NoneEnumValue, T0, T1> noneSwitch, Action<RedEnumValue, T0, T1> redSwitch, Action<GreenEnumValue, T0, T1> greenSwitch, Action<BlueEnumValue, T0, T1> blueSwitch)
        {
            redSwitch(this, arg0, arg1);
        }

        public override TResult Switch<TResult, T0, T1>(T0 arg0, T1 arg1, Func<NoneEnumValue, T0, T1, TResult> noneSwitch, Func<RedEnumValue, T0, T1, TResult> redSwitch, Func<GreenEnumValue, T0, T1, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, TResult> blueSwitch)
        {
            return redSwitch(this, arg0, arg1);
        }

        public override void Switch<T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Action<NoneEnumValue, T0, T1, T2> noneSwitch, Action<RedEnumValue, T0, T1, T2> redSwitch, Action<GreenEnumValue, T0, T1, T2> greenSwitch, Action<BlueEnumValue, T0, T1, T2> blueSwitch)
        {
            redSwitch(this, arg0, arg1, arg2);
        }

        public override TResult Switch<TResult, T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Func<NoneEnumValue, T0, T1, T2, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, TResult> blueSwitch)
        {
            return redSwitch(this, arg0, arg1, arg2);
        }

        public override void Switch<T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Action<NoneEnumValue, T0, T1, T2, T3> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3> blueSwitch)
        {
            redSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Func<NoneEnumValue, T0, T1, T2, T3, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, TResult> blueSwitch)
        {
            return redSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override void Switch<T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Action<NoneEnumValue, T0, T1, T2, T3, T4> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4> blueSwitch)
        {
            redSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Func<NoneEnumValue, T0, T1, T2, T3, T4, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, TResult> blueSwitch)
        {
            return redSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5> blueSwitch)
        {
            redSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, TResult> blueSwitch)
        {
            return redSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5, T6> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6> blueSwitch)
        {
            redSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> blueSwitch)
        {
            return redSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override int GetHashCode()
        {
            return 1;
        }
    }

    public static readonly GreenEnumValue Green = new GreenEnumValue();
    public partial class GreenEnumValue: Colors
    {
        public GreenEnumValue(): base(global::EnumClassDemo.Colors.Green) { }
        public override string ToString()
        {
            return "Green";
        }

        public override void Switch(Action<NoneEnumValue> noneSwitch, Action<RedEnumValue> redSwitch, Action<GreenEnumValue> greenSwitch, Action<BlueEnumValue> blueSwitch)
        {
            greenSwitch(this);
        }

        public override TResult Switch<TResult>(Func<NoneEnumValue, TResult> noneSwitch, Func<RedEnumValue, TResult> redSwitch, Func<GreenEnumValue, TResult> greenSwitch, Func<BlueEnumValue, TResult> blueSwitch)
        {
            return greenSwitch(this);
        }

        public override void Switch<T0>(T0 arg0, Action<NoneEnumValue, T0> noneSwitch, Action<RedEnumValue, T0> redSwitch, Action<GreenEnumValue, T0> greenSwitch, Action<BlueEnumValue, T0> blueSwitch)
        {
            greenSwitch(this, arg0);
        }

        public override TResult Switch<TResult, T0>(T0 arg0, Func<NoneEnumValue, T0, TResult> noneSwitch, Func<RedEnumValue, T0, TResult> redSwitch, Func<GreenEnumValue, T0, TResult> greenSwitch, Func<BlueEnumValue, T0, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0);
        }

        public override void Switch<T0, T1>(T0 arg0, T1 arg1, Action<NoneEnumValue, T0, T1> noneSwitch, Action<RedEnumValue, T0, T1> redSwitch, Action<GreenEnumValue, T0, T1> greenSwitch, Action<BlueEnumValue, T0, T1> blueSwitch)
        {
            greenSwitch(this, arg0, arg1);
        }

        public override TResult Switch<TResult, T0, T1>(T0 arg0, T1 arg1, Func<NoneEnumValue, T0, T1, TResult> noneSwitch, Func<RedEnumValue, T0, T1, TResult> redSwitch, Func<GreenEnumValue, T0, T1, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0, arg1);
        }

        public override void Switch<T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Action<NoneEnumValue, T0, T1, T2> noneSwitch, Action<RedEnumValue, T0, T1, T2> redSwitch, Action<GreenEnumValue, T0, T1, T2> greenSwitch, Action<BlueEnumValue, T0, T1, T2> blueSwitch)
        {
            greenSwitch(this, arg0, arg1, arg2);
        }

        public override TResult Switch<TResult, T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Func<NoneEnumValue, T0, T1, T2, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0, arg1, arg2);
        }

        public override void Switch<T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Action<NoneEnumValue, T0, T1, T2, T3> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3> blueSwitch)
        {
            greenSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Func<NoneEnumValue, T0, T1, T2, T3, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override void Switch<T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Action<NoneEnumValue, T0, T1, T2, T3, T4> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4> blueSwitch)
        {
            greenSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Func<NoneEnumValue, T0, T1, T2, T3, T4, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5> blueSwitch)
        {
            greenSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5, T6> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6> blueSwitch)
        {
            greenSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> blueSwitch)
        {
            return greenSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override int GetHashCode()
        {
            return 2;
        }
    }

    public static readonly BlueEnumValue Blue = new BlueEnumValue();
    public partial class BlueEnumValue: Colors
    {
        public BlueEnumValue(): base(global::EnumClassDemo.Colors.Blue) { }
        public override string ToString()
        {
            return "Blue";
        }

        public override void Switch(Action<NoneEnumValue> noneSwitch, Action<RedEnumValue> redSwitch, Action<GreenEnumValue> greenSwitch, Action<BlueEnumValue> blueSwitch)
        {
            blueSwitch(this);
        }

        public override TResult Switch<TResult>(Func<NoneEnumValue, TResult> noneSwitch, Func<RedEnumValue, TResult> redSwitch, Func<GreenEnumValue, TResult> greenSwitch, Func<BlueEnumValue, TResult> blueSwitch)
        {
            return blueSwitch(this);
        }

        public override void Switch<T0>(T0 arg0, Action<NoneEnumValue, T0> noneSwitch, Action<RedEnumValue, T0> redSwitch, Action<GreenEnumValue, T0> greenSwitch, Action<BlueEnumValue, T0> blueSwitch)
        {
            blueSwitch(this, arg0);
        }

        public override TResult Switch<TResult, T0>(T0 arg0, Func<NoneEnumValue, T0, TResult> noneSwitch, Func<RedEnumValue, T0, TResult> redSwitch, Func<GreenEnumValue, T0, TResult> greenSwitch, Func<BlueEnumValue, T0, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0);
        }

        public override void Switch<T0, T1>(T0 arg0, T1 arg1, Action<NoneEnumValue, T0, T1> noneSwitch, Action<RedEnumValue, T0, T1> redSwitch, Action<GreenEnumValue, T0, T1> greenSwitch, Action<BlueEnumValue, T0, T1> blueSwitch)
        {
            blueSwitch(this, arg0, arg1);
        }

        public override TResult Switch<TResult, T0, T1>(T0 arg0, T1 arg1, Func<NoneEnumValue, T0, T1, TResult> noneSwitch, Func<RedEnumValue, T0, T1, TResult> redSwitch, Func<GreenEnumValue, T0, T1, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0, arg1);
        }

        public override void Switch<T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Action<NoneEnumValue, T0, T1, T2> noneSwitch, Action<RedEnumValue, T0, T1, T2> redSwitch, Action<GreenEnumValue, T0, T1, T2> greenSwitch, Action<BlueEnumValue, T0, T1, T2> blueSwitch)
        {
            blueSwitch(this, arg0, arg1, arg2);
        }

        public override TResult Switch<TResult, T0, T1, T2>(T0 arg0, T1 arg1, T2 arg2, Func<NoneEnumValue, T0, T1, T2, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0, arg1, arg2);
        }

        public override void Switch<T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Action<NoneEnumValue, T0, T1, T2, T3> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3> blueSwitch)
        {
            blueSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, Func<NoneEnumValue, T0, T1, T2, T3, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0, arg1, arg2, arg3);
        }

        public override void Switch<T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Action<NoneEnumValue, T0, T1, T2, T3, T4> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4> blueSwitch)
        {
            blueSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, Func<NoneEnumValue, T0, T1, T2, T3, T4, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0, arg1, arg2, arg3, arg4);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5> blueSwitch)
        {
            blueSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public override void Switch<T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Action<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6> noneSwitch, Action<RedEnumValue, T0, T1, T2, T3, T4, T5, T6> redSwitch, Action<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6> greenSwitch, Action<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6> blueSwitch)
        {
            blueSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        public override TResult Switch<TResult, T0, T1, T2, T3, T4, T5, T6>(T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, Func<NoneEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> noneSwitch, Func<RedEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> redSwitch, Func<GreenEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> greenSwitch, Func<BlueEnumValue, T0, T1, T2, T3, T4, T5, T6, TResult> blueSwitch)
        {
            return blueSwitch(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override int GetHashCode()
        {
            return 3;
        }
    }

    private static readonly Colors[] _members = new Colors[4] { None, Red, Green, Blue, };

    public static System.Collections.Generic.IReadOnlyCollection<Colors> GetAllMembers()
    {
        return _members;
    }
}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project CredFetoEnum ](/sources/CredFetoEnum.zip)

:::


### Share CredFetoEnum 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredFetoEnum&quote=CredFetoEnum" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredFetoEnum&text=CredFetoEnum:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredFetoEnum" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredFetoEnum&title=CredFetoEnum" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredFetoEnum&title=CredFetoEnum&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredFetoEnum" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/CredFetoEnum

## In the same category (Enum)

