---
sidebar_position: 760
title: 76 - UnitGenerator
description: Generating classes instead of value objects( e.g. int)
slug: /UnitGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitivePrimitiveObsession.mdx';

# UnitGenerator  by Cysharp, Inc


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/UnitGenerator?label=UnitGenerator)](https://www.nuget.org/packages/UnitGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Cysharp/UnitGenerator?label=updated)](https://github.com/Cysharp/UnitGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Cysharp/UnitGenerator?style=social)

## Details

### Info
:::info

Name: **UnitGenerator**

C# Source Generator to create value-object, inspired by units of measure.

Author: Cysharp, Inc

NuGet: 
*https://www.nuget.org/packages/UnitGenerator/*   


You can find more details at https://github.com/Cysharp/UnitGenerator

Source: https://github.com/Cysharp/UnitGenerator

:::

### Original Readme
:::note

UnitGenerator
===
[![GitHub Actions](https://github.com/Cysharp/UnitGenerator/workflows/Build-Debug/badge.svg)](https://github.com/Cysharp/UnitGenerator/actions) [![Releases](https://img.shields.io/github/release/Cysharp/UnitGenerator.svg)](https://github.com/Cysharp/UnitGenerator/releases)

C# Source Generator to create [Value object](https://en.wikipedia.org/wiki/Value_object) pattern, also inspired by [units of measure](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/units-of-measure) to support all arithmetic operators and serialization.

NuGet: [UnitGenerator](https://www.nuget.org/packages/UnitGenerator)

```
Install-Package UnitGenerator
```

## Introduction

For example, Identifier, UserId is comparable only to UserId, and cannot be assigned to any other type. Also, arithmetic operations are not allowed.

```csharp
using UnitGenerator;

[UnitOf(typeof(int))]
public readonly partial struct UserId { }
```

will generates

```csharp
[System.ComponentModel.TypeConverter(typeof(UserIdTypeConverter))]
public readonly partial struct UserId : IEquatable<UserId> 
{
    readonly int value;
    
    public UserId(int value)
    {
        this.value = value;
    }

    public readonly int AsPrimitive() => value;
    public static explicit operator int(UserId value) => value.value;
    public static explicit operator UserId(int value) => new UserId(value);
    public bool Equals(UserId other) => value.Equals(other.value);
    public override bool Equals(object? obj) => // snip...
    public override int GetHashCode() => value.GetHashCode();
    public override string ToString() => value.ToString();
    public static bool operator ==(in UserId x, in UserId y) => x.value.Equals(y.value);
    public static bool operator !=(in UserId x, in UserId y) => !x.value.Equals(y.value);

    private class UserIdTypeConverter : System.ComponentModel.TypeConverter
    {
        // snip...
    }
}
```

However, Hp in games, should not be allowed to be assigned to other types, but should support arithmetic operations with int. For example double heal = `target.Hp = Hp.Min(target.Hp * 2, target.MaxHp)`.

```csharp
[UnitOf(typeof(int), UnitGenerateOptions.ArithmeticOperator | UnitGenerateOptions.ValueArithmeticOperator | UnitGenerateOptions.Comparable | UnitGenerateOptions.MinMaxMethod)]
public readonly partial struct Hp { }

// -- generates

[System.ComponentModel.TypeConverter(typeof(HpTypeConverter))]
public readonly partial struct Hp
    : IEquatable<Hp>
#if NET7_0_OR_GREATER
    , IEqualityOperators<Hp, Hp, bool>
#endif    
    , IComparable<Hp>
#if NET7_0_OR_GREATER
    , IComparisonOperators<Hp, Hp, bool>
#endif
#if NET7_0_OR_GREATER
    , IAdditionOperators<Hp, Hp, Hp>
    , ISubtractionOperators<Hp, Hp, Hp>
    , IMultiplyOperators<Hp, Hp, Hp>
    , IDivisionOperators<Hp, Hp, Hp>
    , IUnaryPlusOperators<Hp, Hp>
    , IUnaryNegationOperators<Hp, Hp>
    , IIncrementOperators<Hp>
    , IDecrementOperators<Hp>
#endif    
{
    readonly int value;

    public Hp(int value)
    {
        this.value = value;
    }

    public int AsPrimitive() => value;
    public static explicit operator int(Hp value) => value.value;
    public static explicit operator Hp(int value) => new Hp(value);
    public bool Equals(Hp other) => value.Equals(other.value);
    public override bool Equals(object? obj) => // snip...
    public override int GetHashCode() => value.GetHashCode();
    public override string ToString() => value.ToString();
    public static bool operator ==(in Hp x, in Hp y) => x.value.Equals(y.value);
    public static bool operator !=(in Hp x, in Hp y) => !x.value.Equals(y.value);
    private class HpTypeConverter : System.ComponentModel.TypeConverter { /* snip... */ }

    // UnitGenerateOptions.ArithmeticOperator
    public static Hp operator +(Hp x, Hp y) => new Hp(checked((int)(x.value + y.value)));
    public static Hp operator -(Hp x, Hp y) => new Hp(checked((int)(x.value - y.value)));
    public static Hp operator *(Hp x, Hp y) => new Hp(checked((int)(x.value * y.value)));
    public static Hp operator /(Hp x, Hp y) => new Hp(checked((int)(x.value / y.value)));
    public static Hp operator ++(Hp x) => new Hp(checked((int)(x.value + 1)));
    public static Hp operator --(Hp x) => new Hp(checked((int)(x.value - 1)));
    public static Hp operator +(A value) => new((int)(+value.value));
    public static Hp operator -(A value) => new((int)(-value.value));

    // UnitGenerateOptions.ValueArithmeticOperator
    public static Hp operator +(Hp x, in int y) => new Hp(checked((int)(x.value + y)));
    public static Hp operator -(Hp x, in int y) => new Hp(checked((int)(x.value - y)));
    public static Hp operator *(Hp x, in int y) => new Hp(checked((int)(x.value * y)));
    public static Hp operator /(Hp x, in int y) => new Hp(checked((int)(x.value / y)));

    // UnitGenerateOptions.Comparable
    public int CompareTo(Hp other) => value.CompareTo(other.value);
    public static bool operator >(Hp x, Hp y) => x.value > y.value;
    public static bool operator <(Hp x, Hp y) => x.value < y.value;
    public static bool operator >=(Hp x, Hp y) => x.value >= y.value;
    public static bool operator <=(Hp x, Hp y) => x.value <= y.value;

    // UnitGenerateOptions.MinMaxMethod
    public static Hp Min(Hp x, Hp y) => new Hp(Math.Min(x.value, y.value));
    public static Hp Max(Hp x, Hp y) => new Hp(Math.Max(x.value, y.value));
}
```

You can configure with `UnitGenerateOptions`, which method to implement.

```csharp
[Flags]
enum UnitGenerateOptions
{
    None = 0,
    ImplicitOperator = 1,
    ParseMethod = 1 << 1,
    MinMaxMethod = 1 << 2,
    ArithmeticOperator = 1 << 3,
    ValueArithmeticOperator = 1 << 4,
    Comparable = 1 << 5,
    Validate = 1 << 6,
    JsonConverter = 1 << 7,
    MessagePackFormatter = 1 << 8,
    DapperTypeHandler = 1 << 9,
    EntityFrameworkValueConverter = 1 << 10,
    WithoutComparisonOperator = 1 << 11,
    JsonConverterDictionaryKeySupport = 1 << 12,
    Normalize = 1 << 13,
}
```

UnitGenerateOptions has some serializer support. For example, a result like `Serialize(userId) => { Value = 1111 }` is awful. The value-object should be serialized natively, i.e. `Serialize(useId) => 1111`, and should be able to be added directly to a database, etc.

Currently UnitGenerator supports [MessagePack for C#](https://github.com/neuecc/MessagePack-CSharp), System.Text.Json(JsonSerializer), [Dapper](https://github.com/StackExchange/Dapper) and EntityFrameworkCore.

```csharp
[UnitOf(typeof(int), UnitGenerateOptions.MessagePackFormatter)]
public readonly partial struct UserId { }

// -- generates

[MessagePackFormatter(typeof(UserIdMessagePackFormatter))]
public readonly partial struct UserId 
{
    class UserIdMessagePackFormatter : IMessagePackFormatter<UserId>
    {
        public void Serialize(ref MessagePackWriter writer, UserId value, MessagePackSerializerOptions options)
        {
            options.Resolver.GetFormatterWithVerify<int>().Serialize(ref writer, value.value, options);
        }

        public UserId Deserialize(ref MessagePackReader reader, MessagePackSerializerOptions options)
        {
            return new UserId(options.Resolver.GetFormatterWithVerify<int>().Deserialize(ref reader, options));
        }
    }
}
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [UnitOfAttribute](#unitofattribute)
- [UnitGenerateOptions](#unitgenerateoptions)
  - [ImplicitOperator](#implicitoperator)
  - [ParseMethod](#parsemethod)
  - [MinMaxMethod](#minmaxmethod)
  - [ArithmeticOperator](#arithmeticoperator)
  - [ValueArithmeticOperator](#valuearithmeticoperator)
  - [Comparable](#comparable)
  - [WithoutComparisonOperator](#withoutcomparisonoperator)
  - [Validate](#validate)
  - [Normalize](#normalize)
  - [JsonConverter](#jsonconverter)
  - [JsonConverterDictionaryKeySupport](#jsonconverterdictionarykeysupport)
  - [MessagePackFormatter](#messagepackformatter)
  - [DapperTypeHandler](#dappertypehandler)
  - [EntityFrameworkValueConverter](#entityframeworkvalueconverter)
- [Use for Unity](#use-for-unity)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## UnitOfAttribute
When referring to the UnitGenerator, it generates a internal `UnitOfAttribute`.

```csharp
namespace UnitGenerator
{
    [AttributeUsage(AttributeTargets.Struct, AllowMultiple = false)]
    internal class UnitOfAttribute : Attribute
    {
        public Type Type { get; }
        public UnitGenerateOptions Options { get; }
        public UnitArithmeticOperators ArithmeticOperators { get; set; }
        public string ToStringFormat { get; set; }
        
        public UnitOfAttribute(Type type, UnitGenerateOptions options = UnitGenerateOptions.None) { ... }
    }
}
```

You can attach this attribute with any specified underlying type to `readonly partial struct`.

```csharp
[UnitOf(typeof(Guid))]
public readonly partial struct GroupId { }

[UnitOf(typeof(string))]
public readonly partial struct Message { }

[UnitOf(typeof(long))]
public readonly partial struct Power { }

[UnitOf(typeof(byte[]))]
public readonly partial struct Image { }

[UnitOf(typeof(DateTime))]
public readonly partial struct StartDate { }

[UnitOf(typeof((string street, string city)))]
public readonly partial struct StreetAddress { }
```

Standard UnitOf(`UnitGenerateOptions.None`) generates value constructor, `explicit operator`, `implement IEquatable `, `override GetHashCode`, `override ToString`, `==` and `!=` operator, `TypeConverter` for ASP.NET Core binding, `AsPrimitive` method.

If you want to retrieve primitive value, use `AsPrimitive()` instead of `.Value`. This is intended to avoid casual getting of primitive values (using the arithmetic operator option if available).

> When type is bool, also implements `true`, `false`, `!` operators.

```csharp 
public static bool operator true(Foo x) => x.value;
public static bool operator false(Foo x) => !x.value;
public static bool operator !(Foo x) => !x.value;
```

> When type is Guid or [Ulid](https://github.com/Cysharp/Ulid), also implements `New()` and `New***()` static operator.

```csharp
public static GroupId New();
public static GroupId NewGroupId();
```

Second parameter `UnitGenerateOptions options` can configure which method to implement, default is `None`.

Optional named parameter: `ArithmeticOperators` can configure which generates operators specifically. Default is `Number`. (This can be used if UnitGenerateOptions.ArithmeticOperator is specified.)

Optional named parameter: `ToStringFormat` can configure `ToString` format. Default is null and output as $`{0}`.

## UnitGenerateOptions

When referring to the UnitGenerator, it generates a internal `UnitGenerateOptions` that is bit flag of which method to implement.

```csharp
[Flags]
internal enum UnitGenerateOptions
{
    None = 0,
    ImplicitOperator = 1,
    ParseMethod = 2,
    MinMaxMethod = 4,
    ArithmeticOperator = 8,
    ValueArithmeticOperator = 16,
    Comparable = 32,
    Validate = 64,
    JsonConverter = 128,
    MessagePackFormatter = 256,
    DapperTypeHandler = 512,
    EntityFrameworkValueConverter = 1024,
}
```

You can use this with `[UnitOf]`.

```csharp
[UnitOf(typeof(int), UnitGenerateOptions.ArithmeticOperator | UnitGenerateOptions.ValueArithmeticOperator | UnitGenerateOptions.Comparable | UnitGenerateOptions.MinMaxMethod)]
public readonly partial struct Strength { }

[UnitOf(typeof(DateTime), UnitGenerateOptions.Validate | UnitGenerateOptions.ParseMethod | UnitGenerateOptions.Comparable)]
public readonly partial struct EndDate { }

[UnitOf(typeof(double), UnitGenerateOptions.ParseMethod | UnitGenerateOptions.MinMaxMethod | UnitGenerateOptions.ArithmeticOperator | UnitGenerateOptions.ValueArithmeticOperator | UnitGenerateOptions.Comparable | UnitGenerateOptions.Validate | UnitGenerateOptions.JsonConverter | UnitGenerateOptions.MessagePackFormatter | UnitGenerateOptions.DapperTypeHandler | UnitGenerateOptions.EntityFrameworkValueConverter)]
public readonly partial struct AllOptionsStruct { }
```

You can setup project default options like this.

```csharp
internal static class UnitOfOptions
{
    public const UnitGenerateOptions Default = UnitGenerateOptions.ArithmeticOperator | UnitGenerateOptions.ValueArithmeticOperator | UnitGenerateOptions.Comparable | UnitGenerateOptions.MinMaxMethod;
}

[UnitOf(typeof(int), UnitOfOptions.Default)]
public readonly partial struct Hp { }
```

### ImplicitOperator

```csharp
// Default
public static explicit operator U(T value) => value.value;
public static explicit operator T(U value) => new T(value);

// UnitGenerateOptions.ImplicitOperator
public static implicit operator U(T value) => value.value;
public static implicit operator T(U value) => new T(value);
```

### ParseMethod 

```csharp
public static T Parse(string s)
public static bool TryParse(string s, out T result)
```

### MinMaxMethod

```csharp
public static T Min(T x, T y)
public static T Max(T x, T y)
```

### ArithmeticOperator

```csharp
public static T operator +(in T x, in T y) => new T(checked((U)(x.value + y.value)));
public static T operator -(in T x, in T y) => new T(checked((U)(x.value - y.value)));
public static T operator *(in T x, in T y) => new T(checked((U)(x.value * y.value)));
public static T operator /(in T x, in T y) => new T(checked((U)(x.value / y.value)));
public static T operator +(T value) => new((U)(+value.value));
public static T operator -(T value) => new((U)(-value.value));
public static T operator ++(T x) => new T(checked((U)(x.value + 1)));
public static T operator --(T x) => new T(checked((U)(x.value - 1)));
```

In addition,  all members conforming to [System.Numerics.INumber](https://learn.microsoft.com/ja-jp/dotnet/api/system.numerics.inumber-1) are generated.

If you want to suppress this and generate only certain operators, you can use the the `ArithmeticOperatros` option of `[UnitOf]` attribute as follows:

```csharp
[UnitOf(
    typeof(int), 
    UnitGenerateOptions.ArithmeticOperator,
    ArithmeticOperators = UnitArithmeticOperators.Addition | UnitArithmeticOperators.Subtraction)]
public readonly partial struct Hp { }
```

| Value                               | Generates                                                                              | 
|-------------------------------------|----------------------------------------------------------------------------------------|
| UnitArithmeticOperators.Addition    | `T operator +(T, T)`                                            |
| UnitArithmeticOperators.Subtraction | `T operator -(T, T)`                                             |
| UnitArithmeticOperators.Multiply    | `T operator *(T, T)`,  `T operator +(T)`, `T operator-(T)` |
| UnitArithmeticOperators.Division    | `T operator /(T, T)`,  `T operator +(T)`, `T operator-(T)` |
| UnitArithmeticOperators.Increment   | `T operator ++(T)`                                                                     |
| UnitArithmeticOperators.Decrement   | `T operator --(T)`                                                                     |

### ValueArithmeticOperator

```csharp
public static T operator +(in T x, in U y) => new T(checked((U)(x.value + y)));
public static T operator -(in T x, in U y) => new T(checked((U)(x.value - y)));
public static T operator *(in T x, in U y) => new T(checked((U)(x.value * y)));
public static T operator /(in T x, in U y) => new T(checked((U)(x.value / y)));
```

### Comparable

Implements `IComparable` and `>`, `<`, `>=`, `<=` operators.

```csharp
public U CompareTo(T other) => value.CompareTo(other.value);
public static bool operator >(in T x, in T y) => x.value > y.value;
public static bool operator <(in T x, in T y) => x.value < y.value;
public static bool operator >=(in T x, in T y) => x.value >= y.value;
public static bool operator <=(in T x, in T y) => x.value <= y.value;
```

### WithoutComparisonOperator

Without implements `>`, `<`, `>=`, `<=` operators. For example, useful for Guid.

```csharp
[UnitOf(typeof(Guid), UnitGenerateOptions.Comparable | UnitGenerateOptions.WithoutComparisonOperator)]
public readonly partial struct FooId { }
```

### Validate

Implements `partial void Validate()` method that is called on constructor.

```csharp
// You can implement this custom validate method.
[UnitOf(typeof(int), UnitGenerateOptions.Validate)]
public readonly partial struct SampleValidate
{
    // impl here.
    private partial void Validate()
    {
        if (value > 9999) throw new Exception("Invalid value range: " + value);
    }
}

// Source generator generate this codes.
public T(int value)
{
    this.value = value;
    this.Validate();
}
 
private partial void Validate();
```

### Normalize

Implements `partial void Normalize(ref T value)` method that is called on constructor.

```csharp
// You can implement this custom normalize method to change value during initialization
[UnitOf(typeof(int), UnitGenerateOptions.Normalize)]
public readonly partial struct SampleValidate
{
    // impl here.
    private partial void Normalize(ref int value)
    {
        value = Math.Max(value, 9999);
    }
}

// Source generator generate this codes.
public T(int value)
{
    this.value = value;
    this.Normalize(ref this.value);
}
 
private partial void Normalize(ref int value);
```

### JsonConverter

Implements `System.Text.Json`'s `JsonConverter`. It will be used `JsonSerializer` automatically.

```csharp
[JsonConverter(typeof(UserIdJsonConverter))]
public readonly partial struct UserId
{
    class UserIdJsonConverter : JsonConverter<UserId>
}
```

### JsonConverterDictionaryKeySupport

Implements `JsonConverter`'s `WriteAsPropertyName/ReadAsPropertyName`. It supports from .NET 6, supports Dictionary's Key.

```csharp
var dict = Dictionary<UserId, int>
JsonSerializer.Serialize(dict);
````

### MessagePackFormatter

Implements MessagePack for C#'s `MessagePackFormatter`. It will be used `MessagePackSerializer` automatically.

```csharp
[MessagePackFormatter(typeof(UserIdMessagePackFormatter))]
public readonly partial struct UserId
{
    class UserIdMessagePackFormatter : IMessagePackFormatter<UserId>
}
```

### DapperTypeHandler

Implements Dapper's TypeHandler by public accessibility. TypeHandler is automatically registered at the time of Module initialization.

```csharp
public readonly partial struct UserId
{
    public class UserIdTypeHandler : Dapper.SqlMapper.TypeHandler<UserId>
}

[ModuleInitializer]
public static void AddTypeHandler()
{
    Dapper.SqlMapper.AddTypeHandler(new A.ATypeHandler());
}
```

### EntityFrameworkValueConverter

Implements EntityFrameworkCore's ValueConverter by public accessibility. It is not registered automatically so you need to register manually.

```csharp
public readonly partial struct UserId
{
    public class UserIdValueConverter : ValueConverter<UserId, int>
}

// setup handler manually
builder.HasConversion(new UserId.UserIdValueConverter());
```

## Use for Unity

C# Source Generator feature is rely on C# 9.0. If you are using Unity 2021.2, that supports [Source Generators](https://docs.unity3d.com/2021.2/Documentation/Manual/roslyn-analyzers.html). Add the `UnitGenerator.dll` from the [releases page](https://github.com/Cysharp/UnitGenerator/releases), disable Any Platform, disable Include all platforms and set label as `RoslynAnalyzer`.

It works in Unity Editor however does not work on IDE because Unity does not generate analyzer reference to `.csproj`. We provides [CsprojModifer](https://github.com/Cysharp/CsprojModifier) to analyzer support, uses `Add analyzer references to generated .csproj` supports both IDE and Unity Editor.

Unity(2020) does not support C# 9.0 so can not use directly. However, C# Source Genertor supports output source as file.

1. Create `UnitSourceGen.csproj`.

```xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <TargetFramework>net5.0</TargetFramework>

        <!-- add this two lines and configure output path -->
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(ProjectDir)..\Generated</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

    <ItemGroup>
        <!-- reference UnitGenerator -->
        <PackageReference Include="UnitGenerator" Version="1.0.0" />

        <!-- add target sources path from Unity -->
        <Compile Include="..\MyUnity\Assets\Scripts\Models\**\*.cs" />
    </ItemGroup>
</Project>
```

2. install [.NET SDK](https://dotnet.microsoft.com/download) and run this command.

```
dotnet build UnitSourceGen.csproj
```

File will be generated under `UnitGenerator\UnitGenerator.SourceGenerator\*.Generated.cs`. `UnitOfAttribute` is also included in generated folder, so at first, run build command and get attribute to configure.

License
---
This library is under the MIT License.


:::

### About
:::note

Generating classes instead of value objects( e.g. int)


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **UnitGenerator**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

  <ItemGroup>
    <PackageReference Include="UnitGenerator" Version="1.5.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnitGenerator\src\UnitDemo\Program.cs" label="Program.cs" >

  This is the use of **UnitGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using StronglyDemo;

Person p = new();
//p.SetBirthDate(1970, 4, 16);
p.SetBirthDate(new YearId(1970) , new MonthId(4),new DayId( 16));
Console.WriteLine(p.BirthDate);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnitGenerator\src\UnitDemo\Person.cs" label="Person.cs" >

  This is the use of **UnitGenerator** in *Person.cs*

```csharp showLineNumbers 

using UnitGenerator;

namespace StronglyDemo;


[UnitOf(typeof(int))]
public partial struct YearId { }

[UnitOf(typeof(int))]
public partial struct MonthId { }

[UnitOf(typeof(int))]
public partial struct DayId { }

internal class Person
{
    public DateTime BirthDate { get; internal set; }
    public void SetBirthDate(YearId yearId,MonthId monthId,DayId dayId)
    {
        BirthDate = new DateTime(yearId.AsPrimitive(), monthId.AsPrimitive(), dayId.AsPrimitive());
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnitGenerator\src\UnitDemo\obj\GX\UnitGenerator\UnitGenerator.SourceGenerator\StronglyDemo.DayId.g.cs" label="StronglyDemo.DayId.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY UnitGenerator. DO NOT CHANGE IT.
// </auto-generated>
#pragma warning disable CS8669
using System;
using System.Globalization;
#if NET7_0_OR_GREATER
using System.Numerics;
#endif
namespace StronglyDemo
{
    [System.ComponentModel.TypeConverter(typeof(DayIdTypeConverter))]
    readonly partial struct DayId 
        : IEquatable<DayId>
#if NET7_0_OR_GREATER
        , IEqualityOperators<DayId, DayId, bool>
#endif    
    {
        readonly int value;

        public int AsPrimitive() => value;

        public DayId(int value)
        {
            this.value = value;
        }
        
        public static explicit operator int(DayId value)
        {
            return value.value;
        }

        public static explicit operator DayId(int value)
        {
            return new DayId(value);
        }

        public bool Equals(DayId other)
        {
            return value.Equals(other.value);
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            var t = obj.GetType();
            if (t == typeof(DayId))
            {
                return Equals((DayId)obj);
            }
            if (t == typeof(int))
            {
                return value.Equals((int)obj);
            }

            return value.Equals(obj);
        }
        
        public static bool operator ==(DayId x, DayId y)
        {
            return x.value.Equals(y.value);
        }

        public static bool operator !=(DayId x, DayId y)
        {
            return !x.value.Equals(y.value);
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public override string ToString() => value.ToString();

        // Default
        
        private class DayIdTypeConverter : System.ComponentModel.TypeConverter
        {
            private static readonly Type WrapperType = typeof(DayId);
            private static readonly Type ValueType = typeof(int);

            public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, Type sourceType)
            {
                if (sourceType == WrapperType || sourceType == ValueType)
                {
                    return true;
                }

                return base.CanConvertFrom(context, sourceType);
            }

            public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, Type destinationType)
            {
                if (destinationType == WrapperType || destinationType == ValueType)
                {
                    return true;
                }

                return base.CanConvertTo(context, destinationType);
            }

            public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
            {
                if (value != null)
                {
                    var t = value.GetType();
                    if (t == typeof(DayId))
                    {
                        return (DayId)value;
                    }
                    if (t == typeof(int))
                    {
                        return new DayId((int)value);
                    }
                }

                return base.ConvertFrom(context, culture, value);
            }

            public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
            {
                if (value is DayId wrappedValue)
                {
                    if (destinationType == WrapperType)
                    {
                        return wrappedValue;
                    }

                    if (destinationType == ValueType)
                    {
                        return wrappedValue.AsPrimitive();
                    }
                }

                return base.ConvertTo(context, culture, value, destinationType);
            }
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnitGenerator\src\UnitDemo\obj\GX\UnitGenerator\UnitGenerator.SourceGenerator\StronglyDemo.MonthId.g.cs" label="StronglyDemo.MonthId.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY UnitGenerator. DO NOT CHANGE IT.
// </auto-generated>
#pragma warning disable CS8669
using System;
using System.Globalization;
#if NET7_0_OR_GREATER
using System.Numerics;
#endif
namespace StronglyDemo
{
    [System.ComponentModel.TypeConverter(typeof(MonthIdTypeConverter))]
    readonly partial struct MonthId 
        : IEquatable<MonthId>
#if NET7_0_OR_GREATER
        , IEqualityOperators<MonthId, MonthId, bool>
#endif    
    {
        readonly int value;

        public int AsPrimitive() => value;

        public MonthId(int value)
        {
            this.value = value;
        }
        
        public static explicit operator int(MonthId value)
        {
            return value.value;
        }

        public static explicit operator MonthId(int value)
        {
            return new MonthId(value);
        }

        public bool Equals(MonthId other)
        {
            return value.Equals(other.value);
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            var t = obj.GetType();
            if (t == typeof(MonthId))
            {
                return Equals((MonthId)obj);
            }
            if (t == typeof(int))
            {
                return value.Equals((int)obj);
            }

            return value.Equals(obj);
        }
        
        public static bool operator ==(MonthId x, MonthId y)
        {
            return x.value.Equals(y.value);
        }

        public static bool operator !=(MonthId x, MonthId y)
        {
            return !x.value.Equals(y.value);
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public override string ToString() => value.ToString();

        // Default
        
        private class MonthIdTypeConverter : System.ComponentModel.TypeConverter
        {
            private static readonly Type WrapperType = typeof(MonthId);
            private static readonly Type ValueType = typeof(int);

            public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, Type sourceType)
            {
                if (sourceType == WrapperType || sourceType == ValueType)
                {
                    return true;
                }

                return base.CanConvertFrom(context, sourceType);
            }

            public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, Type destinationType)
            {
                if (destinationType == WrapperType || destinationType == ValueType)
                {
                    return true;
                }

                return base.CanConvertTo(context, destinationType);
            }

            public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
            {
                if (value != null)
                {
                    var t = value.GetType();
                    if (t == typeof(MonthId))
                    {
                        return (MonthId)value;
                    }
                    if (t == typeof(int))
                    {
                        return new MonthId((int)value);
                    }
                }

                return base.ConvertFrom(context, culture, value);
            }

            public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
            {
                if (value is MonthId wrappedValue)
                {
                    if (destinationType == WrapperType)
                    {
                        return wrappedValue;
                    }

                    if (destinationType == ValueType)
                    {
                        return wrappedValue.AsPrimitive();
                    }
                }

                return base.ConvertTo(context, culture, value, destinationType);
            }
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnitGenerator\src\UnitDemo\obj\GX\UnitGenerator\UnitGenerator.SourceGenerator\StronglyDemo.YearId.g.cs" label="StronglyDemo.YearId.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY UnitGenerator. DO NOT CHANGE IT.
// </auto-generated>
#pragma warning disable CS8669
using System;
using System.Globalization;
#if NET7_0_OR_GREATER
using System.Numerics;
#endif
namespace StronglyDemo
{
    [System.ComponentModel.TypeConverter(typeof(YearIdTypeConverter))]
    readonly partial struct YearId 
        : IEquatable<YearId>
#if NET7_0_OR_GREATER
        , IEqualityOperators<YearId, YearId, bool>
#endif    
    {
        readonly int value;

        public int AsPrimitive() => value;

        public YearId(int value)
        {
            this.value = value;
        }
        
        public static explicit operator int(YearId value)
        {
            return value.value;
        }

        public static explicit operator YearId(int value)
        {
            return new YearId(value);
        }

        public bool Equals(YearId other)
        {
            return value.Equals(other.value);
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            var t = obj.GetType();
            if (t == typeof(YearId))
            {
                return Equals((YearId)obj);
            }
            if (t == typeof(int))
            {
                return value.Equals((int)obj);
            }

            return value.Equals(obj);
        }
        
        public static bool operator ==(YearId x, YearId y)
        {
            return x.value.Equals(y.value);
        }

        public static bool operator !=(YearId x, YearId y)
        {
            return !x.value.Equals(y.value);
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public override string ToString() => value.ToString();

        // Default
        
        private class YearIdTypeConverter : System.ComponentModel.TypeConverter
        {
            private static readonly Type WrapperType = typeof(YearId);
            private static readonly Type ValueType = typeof(int);

            public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, Type sourceType)
            {
                if (sourceType == WrapperType || sourceType == ValueType)
                {
                    return true;
                }

                return base.CanConvertFrom(context, sourceType);
            }

            public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, Type destinationType)
            {
                if (destinationType == WrapperType || destinationType == ValueType)
                {
                    return true;
                }

                return base.CanConvertTo(context, destinationType);
            }

            public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
            {
                if (value != null)
                {
                    var t = value.GetType();
                    if (t == typeof(YearId))
                    {
                        return (YearId)value;
                    }
                    if (t == typeof(int))
                    {
                        return new YearId((int)value);
                    }
                }

                return base.ConvertFrom(context, culture, value);
            }

            public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
            {
                if (value is YearId wrappedValue)
                {
                    if (destinationType == WrapperType)
                    {
                        return wrappedValue;
                    }

                    if (destinationType == ValueType)
                    {
                        return wrappedValue.AsPrimitive();
                    }
                }

                return base.ConvertTo(context, culture, value, destinationType);
            }
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnitGenerator\src\UnitDemo\obj\GX\UnitGenerator\UnitGenerator.SourceGenerator\UnitOfAttribute.cs" label="UnitOfAttribute.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY UnitGenerator. DO NOT CHANGE IT.
// </auto-generated>
#pragma warning disable CS8669
#pragma warning disable CS8625
using System;
#if NET7_0_OR_GREATER
using System.Numerics;
#endif

namespace UnitGenerator
{
    [AttributeUsage(AttributeTargets.Struct, AllowMultiple = false)]
    internal class UnitOfAttribute : Attribute
    {
        public Type Type { get; }
        public UnitGenerateOptions Options { get; }
        public UnitArithmeticOperators ArithmeticOperators { get; set; } = UnitArithmeticOperators.All;
        public string ToStringFormat { get; set; }

        public UnitOfAttribute(Type type, UnitGenerateOptions options = UnitGenerateOptions.None)
        {
            this.Type = type;
            this.Options = options;
        }
    }
    
    [Flags]
    internal enum UnitGenerateOptions
    {
        None = 0,
        ImplicitOperator = 1,
        ParseMethod = 1 << 1,
        MinMaxMethod = 1 << 2,
        ArithmeticOperator = 1 << 3,
        ValueArithmeticOperator = 1 << 4,
        Comparable = 1 << 5,
        Validate = 1 << 6,
        JsonConverter = 1 << 7,
        MessagePackFormatter = 1 << 8,
        DapperTypeHandler = 1 << 9,
        EntityFrameworkValueConverter = 1 << 10,
        WithoutComparisonOperator = 1 << 11,
        JsonConverterDictionaryKeySupport = 1 << 12,
        Normalize = 1 << 13,
    }

    [Flags]
    internal enum UnitArithmeticOperators
    {
        All = Addition | Subtraction | Multiply | Division | Increment | Decrement,
        Addition = 1,
        Subtraction = 1 << 1,
        Multiply = 1 << 2,
        Division = 1 << 3,
        Increment = 1 << 4,
        Decrement = 1 << 5,
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project UnitGenerator ](/sources/UnitGenerator.zip)

:::


### Share UnitGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnitGenerator&quote=UnitGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnitGenerator&text=UnitGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnitGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnitGenerator&title=UnitGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnitGenerator&title=UnitGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnitGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/UnitGenerator

aaa
<SameCategory />

