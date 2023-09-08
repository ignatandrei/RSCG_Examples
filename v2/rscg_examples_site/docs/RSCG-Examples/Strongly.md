---
sidebar_position: 490
title: 49 - Strongly
description: Generate and customize strong id structs
slug: /Strongly
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Strongly  by Lucas Teles


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Strongly?label=Strongly)](https://www.nuget.org/packages/Strongly/)
[![GitHub last commit](https://img.shields.io/github/last-commit/lucasteles/Strongly?label=updated)](https://github.com/lucasteles/Strongly/)
![GitHub Repo stars](https://img.shields.io/github/stars/lucasteles/Strongly?style=social)

## Details

### Info
:::info

Name: **Strongly**

A source generator for creating strongly-typed values by decorating with a [Strongly] attribute

Author: Lucas Teles

NuGet: 
*https://www.nuget.org/packages/Strongly/*   


You can find more details at https://github.com/lucasteles/Strongly/

Source : https://github.com/lucasteles/Strongly/

:::

### Original Readme
:::note

# Strongly

![Strongly logo](https://raw.githubusercontent.com/lucasteles/Strongly/master/logo.png)

![Build status](https://github.com/lucasteles/Strongly/actions/workflows/BuildAndPack.yml/badge.svg)
[![NuGet](https://img.shields.io/nuget/v/Strongly.svg)](https://www.nuget.org/packages/Strongly/)

Strongly makes creating strongly-typed values as easy as adding an attribute! No
more [accidentally passing arguments in the wrong order to methods](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-1/#an-example-of-the-problem) -
Strongly uses .NET 6's compile-time incremental source generators to
generate [the boilerplate](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#a-full-example-implementation)
required to use strongly-typed IDs.

Simply, [install the required package](#installing) add the `[Strongly]` attribute to a `struct` (in the `Strongly`
namespace):

```csharp
using Strongly;
 
[Strongly] // <- Add this attribute to auto-generate the rest of the type
public partial struct FooId { }
```

and the source generator magically generates the backing code when you save the file! Use _Go to Definition_ to see the
generated code:

<img src="https://raw.githubusercontent.com/andrewlock/Strongly/master/docs/strongly_typed_id.gif" alt="Generating a strongly-typed ID using the Strongly packages"/>

> Strongly requires requires [the .NET Core SDK v6.0.100 or greater](https://dotnet.microsoft.com/download/dotnet/6.0).

## Installing

To use the the [Strongly NuGet package](https://www.nuget.org/packages/Strongly), install
the [Strongly](https://www.nuget.org/packages/Strongly) package into your project. Depending on which converters you
implement, you may need one or more of the following additional packages

* [System.Text.Json](https://www.nuget.org/packages/System.Text.Json/) (optional, only required
  if [generating a System.Text `JsonConverter`](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#creating-a-custom-jsonconverter)).
  Note that in .NET Core apps, you will likely already reference this project via transitive dependencies.
* [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/) (optional, only required
  if [generating a Newtonsoft `JsonConverter`](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#creating-a-custom-jsonconverter)).
  Note that in some ASP.NET Core apps, you will likely already reference this project via transitive dependencies.
* [Dapper](https://www.nuget.org/packages/Dapper/) (optional, only required
  if [generating a type mapper](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-3/#interfacing-with-external-system-using-strongly-typed-ids))
* [EF Core](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore) (optional, only required
  if [generating an EF Core ValueConverter](https://andrewlock.net/strongly-typed-ids-in-ef-core-using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-4/))
* [Swagger Annotations](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Annotations) (optional, only required
  if [generating an Swagger Schema Filter](#openapiswagger-specification)

To install the packages, add the references to your _csproj_ file, for example by running

```bash
dotnet add package Strongly 
```

This adds a `<PackageReference>` to your project. You can additionally mark the package as `PrivateAssets="all"`
and `ExcludeAssets="runtime"`.

> Setting `PrivateAssets="all"` means any projects referencing this one will not also get a reference to the _Strongly_
> package. Setting `ExcludeAssets="runtime"` ensures the _Strongly.Attributes.dll_ file is not copied to your build
> output (it is not required at runtime).

```xml

<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
    </PropertyGroup>

    <!-- Add the package -->
    <PackageReference Include="Strongly" Version="1.0.0" PrivateAssets="all" ExcludeAssets="runtime"/>
    <!-- -->

</Project>
```

## Usage

To create a strongly-typed ID, create a `partial struct` with the desired name, and decorate it with the `[Strongly]`
attribute, in the `Strongly` namespace:

```csharp
using Strongly;

[Strongly] // Add this attribute to auto-generate the rest of the type
public partial struct FooId { }
```

This generates the "default" strongly-typed ID using a `Guid` backing field, a custom `TypeConverter`, and a
custom `JsonConverter` based on System.Text.Json.

### Customising the converters

You can customise which converters to generate by using flags. For example, to generate a `TypeConverter`,
a `Newtonsoft.Json`, and an EF Core `ValueConverter`, use

```csharp
using Strongly;

[Strongly(converters: StronglyConverter.TypeConverter | StronglyConverter.SystemTextJson | StronglyConverter.EfValueConverter)] 
public partial struct SystemTextJsonConverterId { }
```

### Using different types as a backing fields

The default strongly-typed ID uses a `Guid` backing field:

```csharp
using Strongly;

[Strongly]
public partial struct FooId { }

var id = new FooId(Guid.NewGuid());
```

You can choose a different type backing field, by passing a value of the `StronglyBackingType` enum in the constructor.

```csharp
using Strongly;

[Strongly(backingType: StronglyBackingType.String)]
public partial struct FooId { }

var id = new FooId("my-id-value");
```

Currently supported values are `Guid` (the default), `int`, `long`,`decimal`,`BigInteger`, `MassTransit.NewId`
and `string`.

## Changing the defaults globally

If you wish to change the converters, backing types, or implementations used by default for _all_ the `[Strongly]`
-decorated types in your project, you can use the assembly attribute `[StronglyDefaults]` to set all of these. For
example, the following sets the default converter to a whole project to `[SystemTextJson]`, and changes the default
backing-type to an `int`

```csharp
// Set the defaults for the project
[assembly:StronglyDefaults(
    backingType: StronglyType.Int,
    converters: StronglyConverter.SystemTextJson)]

[Strongly]
public partial struct OrderId { }

[Strongly]
public partial struct UserId { } 
```

This is equivalent to setting these values manually on all the IDs:

```csharp
[Strongly(
    backingType: StronglyType.Int,
    converters: StronglyConverter.SystemTextJson)]
public partial struct OrderId { }

[Strongly(
     backingType: StronglyType.Int,
    converters: StronglyConverter.SystemTextJson)]
public partial struct UserId { }
```

## EF Core - ValueConverter

When you create a `Strongly` type with EF Converter, the type will have a nested `ValueConverter` class you can use on
your entity model definition

```csharp
[Strongly(StronglyType.String, StronglyConverter.EfValueConverter)]
public partial struct PhoneNumber
{
}

public class MyDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        var customer = builder.Entity<Customer>();
        customer.Property(x => x.Phone).HasConversion<PhoneNumber.EfValueConverter>();
    }
}

```

If you have lots of strongly type values you can use the package bellow to automatically set
the `Strongly ValueConverter` on all your entities [![NuGet](https://img.shields.io/nuget/v/Strongly.EFCore.svg)](https://www.nuget.org/packages/Strongly.EFCore/)


```bash
dotnet add package Strongly.EFCore
```

After installation you need to set it on yor `DbContextOptionsBuilder`

```csharp
services
    .AddDbContext<AppDbContext>(options => options
        .UseStronglyTypeConverters()
        /* ... */
        )
```

## OpenApi/Swagger Specification

If you wish to use an ID in your Swagger models and want to have schema and model sample reflecting the value
backing-field
type you will need:

- Install [Swagger Annotations](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Annotations) `>=5.0.0`
- Enable annotation in swagger gen with `services.AddSwaggerGen(c => c.EnableAnnotations());`
- Use the converter flag `StronglyConverter.SwaggerSchemaFilter` on the ID decorator. eg:
    ```csharp
    [Strongly(
        backingType: StronglyType.Int,
        converters: StronglyConverter.SwaggerSchemaFilter | StronglyConverter.SystemTextJson)]
    public partial struct UserId { }
    ```

## Embedding the attributes in your project

By default, the `[Strongly]` attributes referenced in your application are contained in an external dll. It is also
possible to embed the attributes directly in your project, so they appear in the dll when your project is built. If you
wish to do this, you must do two things:

1. Define the MSBuild constant `STRONGLY_TYPED_EMBED_ATTRIBUTES`. This ensures the attributes are embedded in your
   project
2. Add `compile` to the list of excluded assets in your `<PackageReference>` element. This ensures the attributes in
   your project are referenced, instead of the _Strongly.Attributes.dll_ library.

Your project file should look something like this:

```xml

<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <!--  Define the MSBuild constant    -->
        <DefineConstants>STRONGLY_TYPED_EMBED_ATTRIBUTES</DefineConstants>
    </PropertyGroup>

    <!-- Add the package -->
    <PackageReference Include="Strongly" Version="1.0.0"
                      PrivateAssets="all"
                      ExcludeAssets="compile;runtime"/>
    <!--                               ☝ Add compile to the list of excluded assets. -->

</Project>
```

## Preserving usages of the `[Strongly]` attribute

The `[Strongly]` and `[StronglyDefaults]` attributes are decorated with the `[Conditional]`
attribute, [so their usage will not appear in the build output of your project](https://andrewlock.net/conditional-compilation-for-ignoring-method-calls-with-the-conditionalattribute/#applying-the-conditional-attribute-to-classes).
If you use reflection at runtime on one of your IDs, you will not find `[Strongly]` in the list of custom attributes.

If you wish to preserve these attributes in the build output, you can define the `STRONGLY_TYPED_USAGES` MSBuild
variable. Note that this means your project will have a runtime-dependency on _Strongly.Attributes.dll_ so you need to
ensure this is included in your build output.

```xml

<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <!--  Define the MSBuild constant to preserve usages   -->
        <DefineConstants>STRONGLY_TYPED_USAGES</DefineConstants>
    </PropertyGroup>

    <!-- Add the package -->
    <PackageReference Include="Strongly" Version="1.0.0" PrivateAssets="all"/>
    <!--              ☝ You must not exclude the runtime assets in this case -->

</Project>
```

## Why do I need this library?

Andrew
have [written a blog-post series](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-1/)
on strongly-typed IDs that explains the issues and rational behind this library. For a detailed view, I suggest starting
there, but I provide a brief introduction here.

This library is designed to tackle a specific instance of [_primitive
obsession_](https://lostechies.com/jimmybogard/2007/12/03/dealing-with-primitive-obsession/), whereby we use primitive
objects (`Guid`/`string`/`int`/`long`/`decimal` etc) to represent the IDs or values of
domain objects. The problem is that these
types are all
interchangeable - an order ID can be assigned to a product ID despite the fact that is likely nonsensical from the
domain point of
view. [See here for a more concrete example](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-1/#an-example-of-the-problem).

By using strongly-typed values, we give each of then its own `Type` which _wraps_ the underlying primitive value. This
ensures
you can only use the value where it makes sense: `ProductId`s can only be assigned to products, or you can only search
for
products using a `ProductId`, not an `OrderId`.

Unfortunately, taking this approach
requires [a lot of boilerplate and ceremony](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#a-full-example-implementation)
to make working with it manageable. This library abstracts all that away from you, by generating the boilerplate at
build-time by using a Roslyn-powered code generator.

## What code is generated?

The exact code generated depends on the arguments you provide to the `Strongly` attribute. The code is generated to the
_obj_ folder of the project, so you can use _Go to Definition_ on your Id to see the _exact_ code generated in each
case.

## Requirements

The Strongly NuGet package is a .NET Standard 2.0 package.

You must be using the .NET 6+ SDK (though you can compile for other target frameworks like .NET Core 2.1 and .NET
Framework 4.8)

The `struct`s you decorate with the `Strongly` attribute must be marked `partial`.

## Credits

[Credits]: #credits

This project born as a fork of [StronglyTypedId](https://github.com/andrewlock/StronglyTypedId) 


:::

### About
:::note

Generate and customize strong id structs


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Strongly**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Strongly" Version="1.1.0" OutputItemType="Analyzer" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\Program.cs" label="Program.cs" >

  This is the use of **Strongly** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using StronglyDemo;

Person p = new();
//p.SetBirthDate(1970, 4, 16);
p.SetBirthDate(new YearId(1970) , new MonthId(4),new DayId( 16));
Console.WriteLine(p.BirthDate);
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\Person.cs" label="Person.cs" >

  This is the use of **Strongly** in *Person.cs*

```csharp showLineNumbers 

using Strongly;

namespace StronglyDemo;


[Strongly(backingType: StronglyType.Int)]
public partial struct YearId { }

[Strongly(backingType: StronglyType.Int)]
public partial struct MonthId { }

[Strongly(backingType: StronglyType.Int)]
public partial struct DayId { }

internal class Person
{
    public DateTime BirthDate { get; internal set; }
    public void SetBirthDate(YearId yearId,MonthId monthId,DayId dayId)
    {
        BirthDate = new DateTime(yearId.Value, monthId.Value, dayId.Value);
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyAttribute.g.cs" label="StronglyAttribute.g.cs" >


```csharp showLineNumbers 
#if STRONGLY_TYPED_EMBED_ATTRIBUTES

using System;

namespace Strongly
{
    /// <summary>
    /// Place on partial structs to make the type a strongly-typed ID
    /// </summary>
    [AttributeUsage(AttributeTargets.Struct)]
    [System.Diagnostics.Conditional("STRONGLY_TYPED_USAGES")]
    internal sealed class StronglyAttribute : Attribute
    {
        /// <summary>
        /// Make the struct a strongly typed ID
        /// </summary>
        /// <param name="backingType">The <see cref="Type"/> to use to store the strongly-typed ID value.
        /// If not set, uses <see cref="StronglyDefaultsAttribute.BackingType"/>, which defaults to <see cref="StronglyType.Guid"/></param>
        /// <param name="converters">Converters to create for serializing/deserializing the strongly-typed ID value.
        /// If not set, uses <see cref="StronglyDefaultsAttribute.Converters"/>, which defaults to <see cref="StronglyConverter.NewtonsoftJson"/>
        /// and <see cref="StronglyConverter.TypeConverter"/></param>
        /// <param name="implementations">Interfaces and patterns the strongly typed id should implement
        /// If not set, uses <see cref="StronglyDefaultsAttribute.Implementations"/>, which defaults to <see cref="StronglyImplementations.IEquatable"/>
        /// and <see cref="StronglyImplementations.IComparable"/></param>
        public StronglyAttribute(
            StronglyType backingType = StronglyType.Default,
            StronglyConverter converters = StronglyConverter.Default,
            StronglyImplementations implementations = StronglyImplementations.Default)
        {
            BackingType = backingType;
            Converters = converters;
            Implementations = implementations;
        }

        /// <summary>
        /// The <see cref="Type"/> to use to store the strongly-typed ID value
        /// </summary>
        public StronglyType BackingType { get; }

        /// <summary>
        /// JSON library used to serialize/deserialize strongly-typed ID value
        /// </summary>
        public StronglyConverter Converters { get; }

        /// <summary>
        /// Interfaces and patterns the strongly typed id should implement
        /// </summary>
        public StronglyImplementations Implementations { get; }
    }
}
#endif
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyConverter.g.cs" label="StronglyConverter.g.cs" >


```csharp showLineNumbers 
#if STRONGLY_TYPED_EMBED_ATTRIBUTES

using System;

namespace Strongly
{
    /// <summary>
    /// Converters used to to serialize/deserialize strongly-typed ID values
    /// </summary>
    [Flags]
    internal enum StronglyConverter
    {
        // Used with HasFlag, so needs to be 1, 2, 4 etc

        /// <summary>
        /// Don't create any converters for the strongly typed ID
        /// </summary>
        None = 0,

        /// <summary>
        /// Use the default converters for the strongly typed Id.
        /// This will be the value provided in the <see cref="StronglyDefaultsAttribute"/>, which falls back to
        /// <see cref="TypeConverter"/> and <see cref="SystemTextJson"/>
        /// </summary>
        Default = 1,

        /// <summary>
        /// Creates a <see cref="TypeConverter"/> for converting from the strongly typed ID to and from a string
        /// </summary>
        TypeConverter = 2,

        /// <summary>
        /// Creates a Newtonsoft.Json.JsonConverter for serializing the strongly typed id to its primitive value
        /// </summary>
        NewtonsoftJson = 4,

        /// <summary>
        /// Creates a System.Text.Json.Serialization.JsonConverter for serializing the strongly typed id to its primitive value
        /// </summary>
        SystemTextJson = 8,

        /// <summary>
        /// Creates an EF Core Value Converter for extracting the primitive value
        /// </summary>
        EfValueConverter = 16,

        /// <summary>
        /// Creates a Dapper TypeHandler for converting to and from the type
        /// </summary>
        DapperTypeHandler = 32,

        /// <summary>
        /// Creates a Swagger SchemaFilter for OpenApi documentation
        /// </summary>
        SwaggerSchemaFilter = 64,
    }
}
#endif
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyDefaultsAttribute.g.cs" label="StronglyDefaultsAttribute.g.cs" >


```csharp showLineNumbers 
#if STRONGLY_TYPED_EMBED_ATTRIBUTES

using System;

namespace Strongly
{
    /// <summary>
    /// Used to control the default Place on partial structs to make the type a strongly-typed ID
    /// </summary>
    [AttributeUsage(AttributeTargets.Assembly, Inherited = false, AllowMultiple = false)]
    [System.Diagnostics.Conditional("STRONGLY_TYPED_USAGES")]
    internal sealed class StronglyDefaultsAttribute : Attribute
    {
        /// <summary>
        /// Set the default values used for strongly typed ids
        /// </summary>
        /// <param name="backingType">The <see cref="Type"/> to use to store the strongly-typed ID value.
        /// Defaults to <see cref="StronglyType.Guid"/></param>
        /// <param name="converters">JSON library used to serialize/deserialize strongly-typed ID value.
        /// Defaults to <see cref="StronglyConverter.SystemTextJson"/> and <see cref="StronglyConverter.TypeConverter"/></param>
        /// <param name="implementations">Interfaces and patterns the strongly typed id should implement
        /// Defaults to <see cref="StronglyImplementations.IEquatable"/> and <see cref="StronglyImplementations.IComparable"/></param>
        public StronglyDefaultsAttribute(
            StronglyType backingType = StronglyType.Default,
            StronglyConverter converters = StronglyConverter.Default,
            StronglyImplementations implementations = StronglyImplementations.Default)
        {
            BackingType = backingType;
            Converters = converters;
            Implementations = implementations;
        }

        /// <summary>
        /// The default <see cref="Type"/> to use to store the strongly-typed ID values.
        /// </summary>
        public StronglyType BackingType { get; }

        /// <summary>
        /// The default converters to create for serializing/deserializing strongly-typed ID values.
        /// </summary>
        public StronglyConverter Converters { get; }

        /// <summary>
        /// Interfaces and patterns the strongly typed id should implement
        /// </summary>
        public StronglyImplementations Implementations { get; }
    }
}
#endif
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyDemo.DayId.g.cs" label="StronglyDemo.DayId.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the Strongly source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#pragma warning disable 1591 // publicly visible type or member must be documented

namespace StronglyDemo
{
    [System.Text.Json.Serialization.JsonConverter(typeof(DayIdSystemTextJsonConverter))]
    [System.ComponentModel.TypeConverter(typeof(DayIdTypeConverter))]
readonly partial struct DayId : System.IComparable<DayId>, System.IEquatable<DayId>
{
    public int Value { get; }

    public DayId(int value)
    {
        Value = value;
    }
    
    public static readonly DayId Empty = new DayId(0);

    public bool Equals(DayId other) => this.Value.Equals(other.Value);
    public override bool Equals(object obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        return obj is DayId other && Equals(other);
    }
    public override int GetHashCode() => Value.GetHashCode();
    public override string ToString() => Value.ToString();
    public static bool operator ==(DayId a, DayId b) => a.Equals(b);
    public static bool operator !=(DayId a, DayId b) => !(a == b);
    public static DayId Parse(string value) => new DayId(int.Parse(value));
    public static bool TryParse(string value, out DayId result)
    {
        if (int.TryParse(value, out int parseResult))
        {
            result = new DayId(parseResult);
            return true;
        }
        result = default;
        return false;
    }
public int CompareTo(DayId other) => Value.CompareTo(other.Value);


class DayIdTypeConverter : System.ComponentModel.TypeConverter
{
    public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Type sourceType)
    {
        return sourceType == typeof(int) || sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);
    }

    public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
    {
        return value switch
        {
            int intValue => new DayId(intValue),
            string stringValue when !string.IsNullOrEmpty(stringValue) && int.TryParse(stringValue, out var result) => new DayId(result),
            _ => base.ConvertFrom(context, culture, value),
        };
    }

    public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Type sourceType)
    {
        return sourceType == typeof(int) || sourceType == typeof(string) || base.CanConvertTo(context, sourceType);
    }

    public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, System.Type destinationType)
    {
        if (value is DayId idValue)
        {
            if (destinationType == typeof(int))
            {
                return idValue.Value;
            }

            if (destinationType == typeof(string))
            {
                return idValue.Value.ToString();
            }
        }

        return base.ConvertTo(context, culture, value, destinationType);
    }
}


class DayIdSystemTextJsonConverter : System.Text.Json.Serialization.JsonConverter<DayId>
{
    public override DayId Read(ref System.Text.Json.Utf8JsonReader reader, System.Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        return new DayId(reader.GetInt32());
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, DayId value, System.Text.Json.JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value.Value);
    }
}

    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyDemo.MonthId.g.cs" label="StronglyDemo.MonthId.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the Strongly source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#pragma warning disable 1591 // publicly visible type or member must be documented

namespace StronglyDemo
{
    [System.Text.Json.Serialization.JsonConverter(typeof(MonthIdSystemTextJsonConverter))]
    [System.ComponentModel.TypeConverter(typeof(MonthIdTypeConverter))]
readonly partial struct MonthId : System.IComparable<MonthId>, System.IEquatable<MonthId>
{
    public int Value { get; }

    public MonthId(int value)
    {
        Value = value;
    }
    
    public static readonly MonthId Empty = new MonthId(0);

    public bool Equals(MonthId other) => this.Value.Equals(other.Value);
    public override bool Equals(object obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        return obj is MonthId other && Equals(other);
    }
    public override int GetHashCode() => Value.GetHashCode();
    public override string ToString() => Value.ToString();
    public static bool operator ==(MonthId a, MonthId b) => a.Equals(b);
    public static bool operator !=(MonthId a, MonthId b) => !(a == b);
    public static MonthId Parse(string value) => new MonthId(int.Parse(value));
    public static bool TryParse(string value, out MonthId result)
    {
        if (int.TryParse(value, out int parseResult))
        {
            result = new MonthId(parseResult);
            return true;
        }
        result = default;
        return false;
    }
public int CompareTo(MonthId other) => Value.CompareTo(other.Value);


class MonthIdTypeConverter : System.ComponentModel.TypeConverter
{
    public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Type sourceType)
    {
        return sourceType == typeof(int) || sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);
    }

    public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
    {
        return value switch
        {
            int intValue => new MonthId(intValue),
            string stringValue when !string.IsNullOrEmpty(stringValue) && int.TryParse(stringValue, out var result) => new MonthId(result),
            _ => base.ConvertFrom(context, culture, value),
        };
    }

    public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Type sourceType)
    {
        return sourceType == typeof(int) || sourceType == typeof(string) || base.CanConvertTo(context, sourceType);
    }

    public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, System.Type destinationType)
    {
        if (value is MonthId idValue)
        {
            if (destinationType == typeof(int))
            {
                return idValue.Value;
            }

            if (destinationType == typeof(string))
            {
                return idValue.Value.ToString();
            }
        }

        return base.ConvertTo(context, culture, value, destinationType);
    }
}


class MonthIdSystemTextJsonConverter : System.Text.Json.Serialization.JsonConverter<MonthId>
{
    public override MonthId Read(ref System.Text.Json.Utf8JsonReader reader, System.Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        return new MonthId(reader.GetInt32());
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, MonthId value, System.Text.Json.JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value.Value);
    }
}

    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyDemo.YearId.g.cs" label="StronglyDemo.YearId.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the Strongly source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#pragma warning disable 1591 // publicly visible type or member must be documented

namespace StronglyDemo
{
    [System.Text.Json.Serialization.JsonConverter(typeof(YearIdSystemTextJsonConverter))]
    [System.ComponentModel.TypeConverter(typeof(YearIdTypeConverter))]
readonly partial struct YearId : System.IComparable<YearId>, System.IEquatable<YearId>
{
    public int Value { get; }

    public YearId(int value)
    {
        Value = value;
    }
    
    public static readonly YearId Empty = new YearId(0);

    public bool Equals(YearId other) => this.Value.Equals(other.Value);
    public override bool Equals(object obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        return obj is YearId other && Equals(other);
    }
    public override int GetHashCode() => Value.GetHashCode();
    public override string ToString() => Value.ToString();
    public static bool operator ==(YearId a, YearId b) => a.Equals(b);
    public static bool operator !=(YearId a, YearId b) => !(a == b);
    public static YearId Parse(string value) => new YearId(int.Parse(value));
    public static bool TryParse(string value, out YearId result)
    {
        if (int.TryParse(value, out int parseResult))
        {
            result = new YearId(parseResult);
            return true;
        }
        result = default;
        return false;
    }
public int CompareTo(YearId other) => Value.CompareTo(other.Value);


class YearIdTypeConverter : System.ComponentModel.TypeConverter
{
    public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Type sourceType)
    {
        return sourceType == typeof(int) || sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);
    }

    public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
    {
        return value switch
        {
            int intValue => new YearId(intValue),
            string stringValue when !string.IsNullOrEmpty(stringValue) && int.TryParse(stringValue, out var result) => new YearId(result),
            _ => base.ConvertFrom(context, culture, value),
        };
    }

    public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Type sourceType)
    {
        return sourceType == typeof(int) || sourceType == typeof(string) || base.CanConvertTo(context, sourceType);
    }

    public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, System.Type destinationType)
    {
        if (value is YearId idValue)
        {
            if (destinationType == typeof(int))
            {
                return idValue.Value;
            }

            if (destinationType == typeof(string))
            {
                return idValue.Value.ToString();
            }
        }

        return base.ConvertTo(context, culture, value, destinationType);
    }
}


class YearIdSystemTextJsonConverter : System.Text.Json.Serialization.JsonConverter<YearId>
{
    public override YearId Read(ref System.Text.Json.Utf8JsonReader reader, System.Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        return new YearId(reader.GetInt32());
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, YearId value, System.Text.Json.JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value.Value);
    }
}

    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyImplementations.g.cs" label="StronglyImplementations.g.cs" >


```csharp showLineNumbers 
#if STRONGLY_TYPED_EMBED_ATTRIBUTES

using System;

namespace Strongly
{
    /// <summary>
    /// Interfaces and patterns the strongly typed id should implement
    /// </summary>
    [Flags]
    internal enum StronglyImplementations
    {
        // Used with HasFlag, so needs to be 1, 2, 4 etc

        /// <summary>
        /// Don't implement any additional members for the strongly typed ID
        /// </summary>
        None = 0,

        /// <summary>
        /// Use the default implementations for the strongly typed Id.
        /// This will be the value provided in the <see cref="StronglyDefaultsAttribute"/>, which falls back to
        /// <see cref="IEquatable"/> and <see cref="IComparable"/>
        /// </summary>
        Default = 1,

        // ReSharper disable once InconsistentNaming
        /// <summary>
        /// Implement the <see cref="IEquatable{T}"/> interface
        /// </summary>
        IEquatable = 2,

        // ReSharper disable once InconsistentNaming
        /// <summary>
        /// Implement the <see cref="IComparable{T}"/> interface
        /// </summary>
        IComparable = 4,
    }
}
#endif
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Strongly\src\StronglyDemo\obj\GX\Strongly\Strongly.StronglyGenerator\StronglyType.g.cs" label="StronglyType.g.cs" >


```csharp showLineNumbers 
#if STRONGLY_TYPED_EMBED_ATTRIBUTES

using System;

namespace Strongly
{
    /// <summary>
    /// The <see cref="Type"/> to use to store the value of a strongly-typed ID
    /// </summary>
    internal enum StronglyType
    {
        /// <summary>
        /// Use the default backing type (either the globally configured default, or Sequential Guid)
        /// </summary>
        Default = 0,
        Guid,
        SequentialGuid,
        GuidComb,
        Int,
        String,
        Long,
        NullableString,
        MassTransitNewId,
        BigInteger,
        Decimal,
    }
}
#endif
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Strongly ](/sources/Strongly.zip)

:::


### Share Strongly 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrongly&quote=Strongly" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrongly&text=Strongly:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrongly" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrongly&title=Strongly" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrongly&title=Strongly&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrongly" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Strongly

## In the same category (PrimitiveObsession)


### [Vogen](/docs/Vogen)

