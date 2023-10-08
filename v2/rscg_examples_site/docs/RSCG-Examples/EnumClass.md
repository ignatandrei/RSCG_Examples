---
sidebar_position: 380
title: 38 - EnumClass
description: enum 2 class
slug: /EnumClass
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# EnumClass  by ashen.Blade


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/EnumClass.Generator?label=EnumClass.Generator)](https://www.nuget.org/packages/EnumClass.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ashenBlade/EnumClass?label=updated)](https://github.com/ashenBlade/EnumClass)
![GitHub Repo stars](https://img.shields.io/github/stars/ashenBlade/EnumClass?style=social)

## Details

### Info
:::info

Name: **EnumClass**

Inspired by kotlin's enum class, this package provides incremental generator that can create classes from enum declaration. 
All you have to do is to add [EnumClass] attribute to your enum. 
Features:
- Override default ToString
- Add specific behaviour (methods) to each member
- Polymorphic Switch implementation

Author: ashen.Blade

NuGet: 
*https://www.nuget.org/packages/EnumClass.Generator/*   


You can find more details at https://github.com/ashenBlade/EnumClass

Source : https://github.com/ashenBlade/EnumClass

:::

### Original Readme
:::note


# `enum class` Generator

## Summary

Type-safe source-generated alternative to C# `enum` inspired by Kotlin `enum class`

## What is it?

This library contains source generator that creates `class` for specified `enum`. 
These classes contain similar functionality as original enum, but behave as ordinal `class`

## Getting started

### Installation

1. Add reference to Nuget package

- .NET CLI

```bash
dotnet add package EnumClass --version 1.2.0
```

- Package Manager

```
Install-Package EnumClass -Version 1.2.0
```

- PackageReference

```
<PackageReference Include="EnumClass" Version="1.2.0" />
```

2. Specify _Analyzer_ property in `.csproj`

```
<PackageReference Include="EnumClass" Version="1.2.0" OutputItemType="Analyzer"/>
```


## Usage

### Example usage

Add `[EnumClass]` attribute to enum

That is all! 
Corresponding class will be generated in namespace as your enum, but prefixed with **EnumClass**

Example
```csharp
using EnumClass.Attributes;

namespace Domain
{
    [EnumClass]
    public enum PetKind
    {
        Cat,
        Dog
    }
    
    namespace EnumClass
    {
        public partial abstract class PetKind
        {
            public partial class CatEnumValue
            {
                public void SayMeow()
                {
                    System.Console.WriteLine("Meow!");
                }
            }
        }
    }
}
```
### ToString()

All `ToString()` are generated at compile time.
By default, they equal to name of corresponding member.
```csharp
Console.WriteLine(EnumClass.PetKind.Cat.ToString() == "Cat"); 
// Output: true
```

If you want to override default value - use `[EnumMemberInfo(StringValue = "")]` attribute
```csharp
namespace Domain;

[EnumClass]
public enum PetKind
{
    [EnumMemberInfo(StringValue = "Kitten")]
    Cat,
    Dog
}
// -------------

Console.WriteLine(EnumClass.PetKind.Cat.ToString());
// Output: Kitten
```

### Cast to enum

All classes have overriden cast operator to original enum value
```csharp
Console.WriteLine(((PetKind)EnumClass.PetKind.Cat) == PetKind.Cat); 
// Output: true
```

### Cast to `int`

All classes have overriden cast to `int`
```csharp
Console.WriteLine(((int)EnumClass.PetKind.Cat) == ((int)PetKind.Cat)); 
// Output: true
```

### `Equals()`

Generated classes implement `IEquatable<>` both for enum class and original enum.
Thus, has methods `Equals(EnumClass)` and `Equals(OrignalEnum)`

```csharp
Console.WriteLine(EnumClass.PetKind.Cat.Equals(EnumClass.PetKind.Cat)); // Calls Equals(EnumClass.PetKind)
Console.WriteLine(EnumClass.PetKind.Cat.Equals(EnumClass.PetKind.Dog)); // Calls Equals(EnumClass.PetKind)
Console.WriteLine(EnumClass.PetKind.Cat.Equals(PetKind.Cat)); // Calls Equals(PetKind)
Console.WriteLine(EnumClass.PetKind.Cat.Equals(PetKind.Dog)); // Calls Equals(PetKind)
// Output: true
//         false
//         true
//         false
```

P.S. and of course `Equals(object?)`

### `Switch` function

Instead of writing `switch` every time, a fimily
of switch function is generated. 
They accepts both `Action` and `Func` with enum class at first argument and optional additional arguments.

E.g. 
1. `Func<int>`
```csharp
var cat = EnumClass.PetKind.Cat;
var value = cat.Switch(1,
        (cat, i) => i + 1,
        (dog, i) => i * 100);
Console.WriteLine(value); 
// Output: 2
```

2. `Action`
```csharp
var dog = EnumClass.PetKind.Dog;
dog.Switch(
    cat => cat.SayMeow(),
    dog => Console.WriteLine("Oh, it is puppy!")); 
// Output: Oh, it is puppy!
```

### `TryParse`

There is static function `bool EnumClass.TryParse(string value, out EnumClass enumClass)` for parsing values from raw enums.
This function accepts strings with and without enum name: **PetKind.Cat** and **Cat** will be parsed into Cat value.

```csharp
if (EnumClass.PetKind.TryParse("Cat", out var cat)
{
    Console.WriteLine($"This is cat!! {cat}");
}
else
{
    Console.WriteLine("This is not cat");
}
```

### More

For more examples checkout _samples_ folder

## Features

### Incremental generator

It uses incremental generator instead of source generator.
This implies better performance in comparison


### Custom target namespace

By default generated class contained in the same namespace as original enum + ".EnumClass" suffix.
You can manually set target namespace in `Namespace` property of `[EnumClass]` attribute.

```csharp
using EnumClass.Attributes;

namespace Test;

[EnumClass(Namespace = "Domain")]
public enum SampleEnum
{
    First,
    Second
}
//------------------
using Domain;

Console.WriteLine(SampleEnum.First);
```

### Generate `enum class` for enum from another assembly

If you do not have access to enum source code directly, you can generate `enum class` for enum in external assembly.
For this use `[ExternalEnumClass]` attribute.

```csharp
// External assembly
namespace Logic;

public enum Word
{
    Single,
    Double,
    Triple
}
```

```csharp
// Our assembly
using EnumClass.Attributes;
using Logic;

[assembly: ExternalEnumClass(typeof(Word), Namespace = "Another")]
namespace Another;

public partial class Word
{
    public abstract int WordsCount { get; }
    
    public partial class SingleEnumValue
    {
        public override int WordsCount => 1;    
    }
    
    
    public partial class DoubleEnumValue
    {
        public override int WordsCount => 2;    
    }
    
    
    public partial class TripleEnumValue
    {
        public override int WordsCount => 3;    
    }
}
```

## Known limitations

### Same name of member and enum

In the current implementation, static enum class field names have the same names as members of the original enum.

E.g.
```csharp
[EnumClass]
public enum TokenType
{
    TokenType
}
```

will generate approximately the following code

```csharp
public class TokenType
{
    public static TokenTypeEnumValue TokenType = new();
}
```

### Half-baked

The project at an early stage of life. 
I'm sure there are lots of hidden bugs, so be cautious using it in production.
In production may be better for now to use [SmartEnum](https://github.com/ardalis/SmartEnum)

## Contributing

If you have an idea on how to improve the project or have found a bug, 
create an issue on [GitHub](https://github.com/ashenBlade/EnumClass/issues)

## Give a star

If you want to see the continuation of the project, give it a star!


:::

### About
:::note

enum 2 class


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **EnumClass**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="EnumClass.Generator" Version="1.3.0" OutputItemType="Analyzer" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EnumClass\src\EnumClassDemo\Program.cs" label="Program.cs" >

  This is the use of **EnumClass** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

Console.WriteLine(EnumClassDemo.EnumClass.Colors.None.ToString());
Console.WriteLine(EnumClassDemo.EnumClass.Colors.Red.TestMe());

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EnumClass\src\EnumClassDemo\Colors.cs" label="Colors.cs" >

  This is the use of **EnumClass** in *Colors.cs*

```csharp showLineNumbers 
using EnumClass.Attributes;

namespace EnumClassDemo;
[EnumClass]
public enum Colors
{
    None=0,
    Red,
    Green,
    Blue,
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EnumClass\src\EnumClassDemo\RedEnumValue.cs" label="RedEnumValue.cs" >

  This is the use of **EnumClass** in *RedEnumValue.cs*

```csharp showLineNumbers 
namespace EnumClassDemo.EnumClass;
public abstract partial class Colors
{
    public partial class RedEnumValue
    {
        public string? TestMe()
        {
            return ToString();
        }
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EnumClass\src\EnumClassDemo\obj\GX\EnumClass.Generator\EnumClass.Generator.EnumClassIncrementalGenerator\Colors.g.cs" label="Colors.g.cs" >


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

[Download Example project EnumClass ](/sources/EnumClass.zip)

:::


### Share EnumClass 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumClass&quote=EnumClass" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumClass&text=EnumClass:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumClass" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumClass&title=EnumClass" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumClass&title=EnumClass&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumClass" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/EnumClass

## In the same category (Enum)


### [CredFetoEnum](/docs/CredFetoEnum)


### [NetEscapades.EnumGenerators](/docs/NetEscapades.EnumGenerators)

