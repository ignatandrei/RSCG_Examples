---
sidebar_position: 2020
title: 202 - jos.enumeration
description: Generating enum from static consts 
slug: /jos.enumeration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# jos.enumeration  by Josef Ottosson


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/jos.enumeration?label=jos.enumeration)](https://www.nuget.org/packages/jos.enumeration/)
[![GitHub last commit](https://img.shields.io/github/last-commit/joseftw/jos.enumeration?label=updated)](https://github.com/joseftw/jos.enumeration)
![GitHub Repo stars](https://img.shields.io/github/stars/joseftw/jos.enumeration?style=social)

## Details

### Info
:::info

Name: **jos.enumeration**

Package Description

Author: Josef Ottosson

NuGet: 
*https://www.nuget.org/packages/jos.enumeration/*   


You can find more details at https://github.com/joseftw/jos.enumeration

Source: https://github.com/joseftw/jos.enumeration

:::

### Original Readme
:::note

# JOS.Enumeration
Enumeration implementation with source generation support.

## Installation
### JOS.Enumeration
Contains the `IEnumeration interface` and a `System.Text.Json` JsonConverter.
The `JOS.Enumeration.SourceGenerator` package contains the actual source generator.

**Don't forget to install that one as well.** 😃

```
dotnet add package JOS.Enumeration
dotnet add package JOS.Enumeration.SourceGenerator
```

### JOS.Enumeration.Database.Dapper
Contains a custom `TypeHandler` to use with Dapper.

`dotnet add package JOS.Enumeration.Database.Dapper`

### JOS.Enumeration.Database.EntityFrameworkCore
Contains ConfigureEnumeration extension method to allow usage with EntityFramework Core.

`dotnet add package JOS.Enumeration.Database.EntityFrameworkCore`

## Usage
* Create a new *partial* `record` or `class`
* Implement the `IEnumeration<T>` interface
* Add your Enumeration items
```csharp
public partial record Hamburger : IEnumeration<Hamburger>
{
    public static readonly Hamburger Cheeseburger = new (1, "Cheeseburger");
    public static readonly Hamburger BigMac = new(2, "Big Mac");
    public static readonly Hamburger BigTasty = new(3, "Big Tasty");
}
```
The source generator will implement the following interface:
```csharp
// Default implementation -> int as Value
public interface IEnumeration<T> : IEnumeration<int, T> where T : IEnumeration<T>
{
}

public interface IEnumeration<TValue, TType> where TValue : IConvertible
{
    TValue Value { get; }
    string Description { get; }
    static abstract IReadOnlySet<TType> GetAll();
    static abstract IEnumerable<TType> GetEnumerable();
    static abstract TType FromValue(TValue value);
    static abstract TType FromDescription(string description);
    static abstract TType FromDescription(ReadOnlySpan<char> description);
    static abstract Type ValueType { get; }
}
```
The following code will be generated:
```csharp
[System.Diagnostics.DebuggerDisplay("{Description}")]
[System.CodeDom.Compiler.GeneratedCode("JOS.Enumeration.SourceGenerator", "4.1.11-beta+afeaa87a52")]
[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public partial record Hamburger : IComparable<JOS.Enumerations.Hamburger>
{
    private static readonly IReadOnlySet<JOS.Enumerations.Hamburger> AllItems;
    static Hamburger()
    {
        AllItems = new HashSet<JOS.Enumerations.Hamburger>(3)
        {
            Cheeseburger,
            BigMac,
            BigTasty,
        }.ToFrozenSet();
    }

    private Hamburger(int value, string description)
    {
        Value = value;
        Description = description ?? throw new ArgumentNullException(nameof(description));
    }

    public int Value { get; }
    public string Description { get; }

    public static IReadOnlySet<JOS.Enumerations.Hamburger> GetAll()
    {
        return AllItems;
    }

    public static IEnumerable<JOS.Enumerations.Hamburger> GetEnumerable()
    {
        yield return Cheeseburger;
        yield return BigMac;
        yield return BigTasty;
    }

    public static JOS.Enumerations.Hamburger FromValue(int value)
    {
        return value switch
        {
            1 => Cheeseburger,
            2 => BigMac,
            3 => BigTasty,
            _ => throw new InvalidOperationException($"'{value}' is not a valid value in 'JOS.Enumerations.Hamburger'")};
    }

    public static JOS.Enumerations.Hamburger FromDescription(string description)
    {
        return description switch
        {
            "Cheeseburger" => Cheeseburger,
            "Big Mac" => BigMac,
            "Big Tasty" => BigTasty,
            _ => throw new InvalidOperationException($"'{description}' is not a valid description in 'JOS.Enumerations.Hamburger'")};
    }

    public static JOS.Enumerations.Hamburger FromDescription(ReadOnlySpan<char> description)
    {
        return description switch
        {
            "Cheeseburger" => Cheeseburger,
            "Big Mac" => BigMac,
            "Big Tasty" => BigTasty,
            _ => throw new InvalidOperationException($"'{description}' is not a valid description in 'JOS.Enumerations.Hamburger'")};
    }

    public static Type ValueType => typeof(int);

    public int CompareTo(JOS.Enumerations.Hamburger? other) => Value.CompareTo(other!.Value);
    public static implicit operator int (JOS.Enumerations.Hamburger item) => item.Value;
    public static implicit operator JOS.Enumerations.Hamburger(int value) => FromValue(value);
}
```
## Features
* Generic value
* Generated `IComparable<T>` method.
* Generated implicit operators (convert to/from int).
* Generated optimized `GetAll`, `FromValue` and `FromDescription` methods.
* System.Text.Json support
* Database support (Dapper and EF Core).

### Generic value

It's possible to use a generic value instead of the default `int` value by implementing the `IEnumeration<TValue, TEnumeration>` interface.

```csharp
public partial record Car : IEnumeration<string, Car>
{
    public static readonly Car FerrariSpider = new("ferrari-spider", "Ferrari Spider");
    public static readonly Car TeslaModelY = new("tesla-model-y", "Tesla Model Y");
}
```
`TValue` has a [*IConvertible*](https://learn.microsoft.com/en-us/dotnet/api/system.iconvertible?WT.mc_id=DT-MVP-5004074) constraint.

The following types has been tested and are guaranteed to work:
* int (default)
* bool
* decimal
* long
* string
* uint
* ulong

### JSON
The package comes with a `JsonConverterFactory`.
Example:
```csharp
var jsonSerializerOptions = new JsonSerializerOptions
{
    Converters = { new EnumerationJsonConverterFactory() }
};
```

It supports the following scenarios:
* Serializing to `TValue`
* Deserializing from `TValue`

If you want any other behaviour, just create your own converter and register it.

### Database
```csharp
public class MyEntity
{
    public MyEntity(Guid id, Hamburger hamburger)
    {
        Id = id;
        Hamburger = hamburger;
    }

    public Guid Id { get; }
    public Hamburger Hamburger { get; }
}
```
#### Dapper
* Register the TypeHandler: `SqlMapper.AddTypeHandler(new EnumerationTypeHandler<Hamburger>())`
* Query like this:
```csharp
var results = (await actConnection.QueryAsync<MyEntity>(
            "SELECT id, hamburger from my_entities WHERE id = @id", new {id = myEntity.Id})).ToList(); 
```

#### EF Core
* Configure your DB Context
```csharp
public DbSet<MyEntity> MyEntities { get; set; } = null!;

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(JosEnumerationDbContext).Assembly);
} 
```
```csharp
public class MyEntityEntityTypeConfiguration : IEntityTypeConfiguration<MyEntity>
{
    public void Configure(EntityTypeBuilder<MyEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Hamburger).ConfigureEnumeration().IsRequired();
    }
}
```
* Query:
```csharp
var result = await myDbContext.MyEntities.FirstAsync(x => x.Id == myEntity.Id); 
```
### Primitive Collections
Support for primitive collections in net8.0 can be configured like this:

#### EF Core
```csharp
public void Configure(EntityTypeBuilder<MyEntity> builder)
{
    builder.ConfigureEnumeration<MyEntity, string, Car>(x => x.Cars);
}
```

#### Dapper
```csharp
SqlMapper.AddTypeHandler(new EnumerationArrayTypeHandler<string, Car>());
```


:::

### About
:::note

Generating enum from static consts 


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **jos.enumeration**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="JOS.Enumeration" Version="4.0.2" />
    <PackageReference Include="JOS.Enumeration.SourceGenerator" Version="4.0.2" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Jos.Enumeration\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **jos.enumeration** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");

var cars= CarTypes.GetAll();
foreach (var car in cars)
{
    Console.WriteLine(car.Description + " - " +car.Value);
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Jos.Enumeration\src\EnumDemo\CarTypes.cs" label="CarTypes.cs" >

  This is the use of **jos.enumeration** in *CarTypes.cs*

```csharp showLineNumbers 
using JOS.Enumeration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnumDemo;


partial  record CarTypes : IEnumeration<CarTypes>
{
    public static readonly CarTypes Dacia = new(1, "Dacia");
    public static readonly CarTypes Tesla = new(2, "Tesla");
    public static readonly CarTypes BMW = new(3, "BMW");
    public static readonly CarTypes Mercedes = new(4, "Mercedes");
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Jos.Enumeration\src\EnumDemo\obj\GX\JOS.Enumeration.SourceGenerator\JOS.Enumeration.SourceGenerator.EnumerationSourceGenerator\CarTypes.Implementation.generated.cs" label="CarTypes.Implementation.generated.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     This code was auto generated by JOS.Enumeration.SourceGenerator
// </auto-generated>
#nullable enable
using System;
using System.Collections;
using System.Collections.Generic;
#if NET8_0_OR_GREATER
using System.Collections.Frozen;
#endif
using JOS.Enumeration;

namespace EnumDemo;
[System.Diagnostics.DebuggerDisplay("{Description}")]
[System.CodeDom.Compiler.GeneratedCode("JOS.Enumeration.SourceGenerator", null)]
partial record CarTypes : IComparable<EnumDemo.CarTypes>
{
    private static readonly IReadOnlySet<EnumDemo.CarTypes> AllItems;
    static CarTypes()
    {
        AllItems = new HashSet<EnumDemo.CarTypes>(4)
        {
            Dacia,
            Tesla,
            BMW,
            Mercedes,
        }.ToFrozenSet();
    }

    private CarTypes(int value, string description)
    {
        Value = value;
        Description = description ?? throw new ArgumentNullException(nameof(description));
    }

    public int Value { get; }
    public string Description { get; }

    public static IReadOnlySet<EnumDemo.CarTypes> GetAll()
    {
        return AllItems;
    }

    public static IEnumerable<EnumDemo.CarTypes> GetEnumerable()
    {
        yield return Dacia;
        yield return Tesla;
        yield return BMW;
        yield return Mercedes;
    }

    public static EnumDemo.CarTypes FromValue(int value)
    {
        return value switch
        {
            1 => Dacia,
            2 => Tesla,
            3 => BMW,
            4 => Mercedes,
            _ => throw new InvalidOperationException($"'{value}' is not a valid value in 'EnumDemo.CarTypes'")};
    }

    public static EnumDemo.CarTypes FromDescription(string description)
    {
        return description switch
        {
            "Dacia" => Dacia,
            "Tesla" => Tesla,
            "BMW" => BMW,
            "Mercedes" => Mercedes,
            _ => throw new InvalidOperationException($"'{description}' is not a valid description in 'EnumDemo.CarTypes'")};
    }

    public static EnumDemo.CarTypes FromDescription(ReadOnlySpan<char> description)
    {
        return description switch
        {
            "Dacia" => Dacia,
            "Tesla" => Tesla,
            "BMW" => BMW,
            "Mercedes" => Mercedes,
            _ => throw new InvalidOperationException($"'{description}' is not a valid description in 'EnumDemo.CarTypes'")};
    }

    public static Type ValueType => typeof(int);

    public int CompareTo(EnumDemo.CarTypes? other) => Value.CompareTo(other!.Value);
    public static implicit operator int (EnumDemo.CarTypes item) => item.Value;
    public static implicit operator EnumDemo.CarTypes(int value) => FromValue(value);
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Jos.Enumeration\src\EnumDemo\obj\GX\JOS.Enumeration.SourceGenerator\JOS.Enumeration.SourceGenerator.EnumerationSourceGenerator\Enumerations.generated.cs" label="Enumerations.generated.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     This code was auto generated by JOS.Enumeration.SourceGenerator
// </auto-generated>
#nullable enable
using System;
using JOS.Enumeration;

namespace EnumDemo;
[System.CodeDom.Compiler.GeneratedCode("JOS.Enumeration.SourceGenerator", null)]
public static class Enumerations
{
    public static class CarTypes
    {
        public static class Dacia
        {
            public const int Value = 1;
            public const string Description = "Dacia";
        }

        public static class Tesla
        {
            public const int Value = 2;
            public const string Description = "Tesla";
        }

        public static class BMW
        {
            public const int Value = 3;
            public const string Description = "BMW";
        }

        public static class Mercedes
        {
            public const int Value = 4;
            public const string Description = "Mercedes";
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project jos.enumeration ](/sources/jos.enumeration.zip)

:::


### Share jos.enumeration 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjos.enumeration&quote=jos.enumeration" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjos.enumeration&text=jos.enumeration:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjos.enumeration" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjos.enumeration&title=jos.enumeration" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjos.enumeration&title=jos.enumeration&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjos.enumeration" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/jos.enumeration

### In the same category (Enum) - 6 other generators


#### [CredFetoEnum](/docs/CredFetoEnum)


#### [EnumClass](/docs/EnumClass)


#### [EnumUtilities](/docs/EnumUtilities)


#### [FusionReactor](/docs/FusionReactor)


#### [NetEscapades.EnumGenerators](/docs/NetEscapades.EnumGenerators)


#### [PMart.Enumeration](/docs/PMart.Enumeration)

