---
sidebar_position: 1670
title: 167 - polytype
description: Generating shape like reflection from classes. See PolyType.Examples for more details
slug: /polytype
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# polytype  by Eirik Tsarpalis


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/polytype?label=polytype)](https://www.nuget.org/packages/polytype/)
[![GitHub last commit](https://img.shields.io/github/last-commit/eiriktsarpalis/PolyType?label=updated)](https://github.com/eiriktsarpalis/PolyType)
![GitHub Repo stars](https://img.shields.io/github/stars/eiriktsarpalis/PolyType?style=social)

## Details

### Info
:::info

Name: **polytype**

Practical Generic Programming for C#

Author: Eirik Tsarpalis

NuGet: 
*https://www.nuget.org/packages/polytype/*   


You can find more details at https://github.com/eiriktsarpalis/PolyType

Source : https://github.com/eiriktsarpalis/PolyType

:::

### Original Readme
:::note

# PolyType [![Build & Tests](https://github.com/eiriktsarpalis/PolyType/actions/workflows/build.yml/badge.svg)](https://github.com/eiriktsarpalis/PolyType/actions/workflows/build.yml) [![NuGet Badge](https://img.shields.io/nuget/dt/PolyType)](https://www.nuget.org/packages/PolyType/)

PolyType is a practical datatype-generic programming library for .NET types. It is a direct adaptation of the [TypeShape](https://github.com/eiriktsarpalis/TypeShape) library for F#, adapted to patterns and idioms available in C#. See the [project website](https://eiriktsarpalis.github.io/PolyType) for additional background and [API documentation](https://eiriktsarpalis.github.io/PolyType/api/PolyType.html).

## Quick Start

You can try the library by installing the `PolyType` NuGet package:

```bash
$ dotnet add package PolyType
```

which includes the core types and source generator for generating type shapes:

```C#
using PolyType;

[GenerateShape]
public partial record Person(string name, int age);
```

Doing this will augment `Person` with an implementation of the `IShapeable<Person>` interface. This suffices to make `Person` usable with any library that targets the PolyType core abstractions. You can try this out by installing the built-in example libraries:

```bash
$ dotnet add package PolyType.Examples
```

Here's how the same value can be serialized to three separate formats.

```csharp
using PolyType.Examples.JsonSerializer;
using PolyType.Examples.CborSerializer;
using PolyType.Examples.XmlSerializer;

Person person = new("Pete", 70);
JsonSerializerTS.Serialize(person); // {"Name":"Pete","Age":70}
XmlSerializer.Serialize(person);    // <value><Name>Pete</Name><Age>70</Age></value>
CborSerializer.EncodeToHex(person); // A2644E616D656450657465634167651846
```

Since the application uses a source generator to produce the shape for `Person`, it is fully compatible with Native AOT. See the [shape providers](https://eiriktsarpalis.github.io/PolyType/shape-providers.html) article for more details on how to use the library with your types.

## Introduction

PolyType is a meta-library that facilitates rapid development of high performance datatype-generic programs. It exposes a simplified model for .NET types that makes it easy for library authors to publish production-ready components in just a few lines of code. The built-in source generator ensures that any library built on top of the PolyType abstractions gets Native AOT support for free.

As a library author, PolyType lets you write high performance, feature complete generic components that target its [core abstractions](https://eiriktsarpalis.github.io/PolyType/core-abstractions.html). For example, a parser API using PolyType might look as follows:

```C#
public static class MyFancyParser
{
    public static T? Parse<T>(string myFancyFormat) where T : IShapeable<T>;
}
```

As an end user, PolyType lets you generate shape models for your own types that can be used with one or more supported libraries:

```C#
Person? person = MyFancyParser.Parse<Person>(format); // Compiles

[GenerateShape] // Generate an IShapeable<TPerson> implementation
partial record Person(string name, int age, List<Person> children);
```

For more information see:

* The [core abstractions](https://eiriktsarpalis.github.io/PolyType/core-abstractions.html) document for an overview of the core programming model.
* The [shape providers](https://eiriktsarpalis.github.io/PolyType/shape-providers.html) document for an overview of the built-in shape providers and their APIs.
* The generated [API documentation](https://eiriktsarpalis.github.io/PolyType/api/PolyType.html) for the project.
* The [`PolyType.Examples`](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType.Examples) project for advanced examples of libraries built on top of PolyType.

## Case Study: Writing a JSON serializer

The repo includes a [JSON serializer](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType.Examples/JsonSerializer) built on top of the `Utf8JsonWriter`/`Utf8JsonReader` primitives provided by System.Text.Json. At the time of writing, the full implementation is just under 1200 lines of code but exceeds STJ's built-in `JsonSerializer` both in terms of [supported types](https://github.com/eiriktsarpalis/PolyType/blob/main/tests/PolyType.Tests/JsonTests.cs) and performance.

### Performance

Here's a [benchmark](https://github.com/eiriktsarpalis/PolyType/blob/main/tests/PolyType.Benchmarks/JsonBenchmark.cs) comparing `System.Text.Json` with the included PolyType implementation:

#### Serialization

| Method                          | Mean     | Ratio | Allocated | Alloc Ratio |
|-------------------------------- |---------:|------:|----------:|------------:|
| Serialize_StjReflection         | 491.9 ns |  1.00 |     312 B |        1.00 |
| Serialize_StjSourceGen          | 467.0 ns |  0.95 |     312 B |        1.00 |
| Serialize_StjSourceGen_FastPath | 227.2 ns |  0.46 |         - |        0.00 |
| Serialize_PolyTypeReflection    | 277.9 ns |  0.57 |         - |        0.00 |
| Serialize_PolyTypeSourceGen     | 273.6 ns |  0.56 |         - |        0.00 |

#### Deserialization

| Method                          | Mean       | Ratio | Allocated | Alloc Ratio |
|-------------------------------- |-----------:|------:|----------:|------------:|
| Deserialize_StjReflection       | 1,593.0 ns |  1.00 |    1024 B |        1.00 |
| Deserialize_StjSourceGen        | 1,530.3 ns |  0.96 |    1000 B |        0.98 |
| Deserialize_PolyTypeReflection  |   773.1 ns |  0.49 |     440 B |        0.43 |
| Deserialize_PolyTypeSourceGen   |   746.7 ns |  0.47 |     440 B |        0.43 |

Even though both serializers target the same underlying reader and writer types, the PolyType implementation is ~75% faster for serialization and ~100% faster for deserialization, when compared with System.Text.Json's metadata serializer. As expected, fast-path serialization is still fastest since its implementation is fully inlined.

## Known libraries based on PolyType

The following code bases are based upon PolyType and may be worth checking out.

* [Nerdbank.MessagePack](https://github.com/AArnott/Nerdbank.MessagePack) - a MessagePack library with performance to rival MessagePack-CSharp, and greater simplicity and additional features.

## Project structure

The repo consists of the following projects:

* The core `PolyType` library containing:
  * The [core abstractions](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType/Abstractions) defining the type model.
  * The [reflection provider](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType/ReflectionProvider) implementation.
  * The [model classes](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType/SourceGenModel) used by the source generator.
* The [`PolyType.SourceGenerator`](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType.SourceGenerator) project contains the built-in source generator implementation.
* The [`PolyType.Roslyn`](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType.Roslyn) library exposes a set of components for extracting data models from Roslyn type symbols. Used as the foundation for the built-in source generator.
* [`PolyType.Examples`](https://github.com/eiriktsarpalis/PolyType/tree/main/src/PolyType.Examples) containing library examples:
  * A serializer built on top of System.Text.Json,
  * A serializer built on top of System.Xml,
  * A serializer built on top of System.Formats.Cbor,
  * A `ConfigurationBinder` like implementation,
  * A simple pretty-printer for .NET values,
  * A generic random value generator based on `System.Random`,
  * A JSON schema generator for .NET types,
  * An object cloning function,
  * A structural `IEqualityComparer<T>` generator for POCOs and collections,
  * An object validator in the style of System.ComponentModel.DataAnnotations.
  * A simple .NET object mapper.
* The [`applications`](https://github.com/eiriktsarpalis/PolyType/tree/main/applications) folder contains sample Native AOT console applications.


:::

### About
:::note

Generating shape like reflection from classes. See PolyType.Examples for more details


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **polytype**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="PolyType" Version="0.16.1" />
    <PackageReference Include="PolyType.Examples" Version="0.16.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\Program.cs" label="Program.cs" >

  This is the use of **polytype** in *Program.cs*

```csharp showLineNumbers 
using PolyType.Examples.JsonSerializer;
using PolyType.Examples.CborSerializer;
using PolyType.Examples.XmlSerializer;
using ConsoleApp1;
using PolyType.Examples.Cloner;

Person person = new("Pete", 70);
Console.WriteLine(JsonSerializerTS.Serialize(person)); // {"Name":"Pete","Age":70}
Console.WriteLine(XmlSerializer.Serialize(person));    // <value><Name>Pete</Name><Age>70</Age></value>
Console.WriteLine(CborSerializer.EncodeToHex(person)); // A2644E616D656450657465634167651846
person.Childs = [new Person("Andrei", 55)];

person.Childs[0].ID = 1;
var q = Cloner.Clone(person);
person.Childs[0].ID = 10;
Console.WriteLine(q);
Console.WriteLine(person);
Console.WriteLine(q.Childs[0]);
Console.WriteLine(person.Childs[0]);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\Person.cs" label="Person.cs" >

  This is the use of **polytype** in *Person.cs*

```csharp showLineNumbers 
using PolyType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1;
[GenerateShape]
public partial record Person(string name, int age)
{
    public Person[] Childs { get; set; } = [];

    public int ID;
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\ConsoleApp1.Person.ITypeShapeProviderOfT.g.cs" label="ConsoleApp1.Person.ITypeShapeProviderOfT.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace ConsoleApp1
{
    public partial record Person : global::PolyType.IShapeable<global::ConsoleApp1.Person>
    {
        static global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person> global::PolyType.IShapeable<global::ConsoleApp1.Person>.GetShape() 
            => global::PolyType.SourceGenerator.GenerateShapeProvider.Default.Person;
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\GenerateShapeProvider.g.cs" label="GenerateShapeProvider.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace PolyType.SourceGenerator
{
    internal partial class GenerateShapeProvider
    {
        private const global::System.Reflection.BindingFlags InstanceBindingFlags = 
            global::System.Reflection.BindingFlags.Public | 
            global::System.Reflection.BindingFlags.NonPublic | 
            global::System.Reflection.BindingFlags.Instance;
        
        /// <summary>Gets the default instance of the <see cref="GenerateShapeProvider"/> class.</summary>
        public static GenerateShapeProvider Default { get; } = new();
        
        /// <summary>Initializes a new instance of the <see cref="GenerateShapeProvider"/> class.</summary>
        public GenerateShapeProvider() { }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\GenerateShapeProvider.Int32.g.cs" label="GenerateShapeProvider.Int32.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace PolyType.SourceGenerator
{
    internal partial class GenerateShapeProvider
    {
        /// <summary>Gets the generated shape for specified type.</summary>
#nullable disable annotations // Use nullable-oblivious property type
        public global::PolyType.Abstractions.ITypeShape<int> Int32 => _Int32 ??= Create_Int32();
#nullable enable annotations // Use nullable-oblivious property type
        private global::PolyType.Abstractions.ITypeShape<int>? _Int32;

        private global::PolyType.Abstractions.ITypeShape<int> Create_Int32()
        {
            return new global::PolyType.SourceGenModel.SourceGenObjectTypeShape<int>
            {
                Provider = this,
                IsRecordType = false,
                IsTupleType = false,
                CreatePropertiesFunc = null,
                CreateConstructorFunc = null,
            };
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\GenerateShapeProvider.ITypeShapeProvider.g.cs" label="GenerateShapeProvider.ITypeShapeProvider.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace PolyType.SourceGenerator
{
    internal partial class GenerateShapeProvider : global::PolyType.ITypeShapeProvider
    {
        /// <summary>
        /// Gets the generated <see cref="global::PolyType.Abstractions.ITypeShape{T}" /> for the specified type.
        /// </summary>
        /// <typeparam name="T">The type for which a shape is requested.</typeparam>
        /// <returns>
        /// The generated <see cref="global::PolyType.Abstractions.ITypeShape{T}" /> for the specified type.
        /// </returns>
        public global::PolyType.Abstractions.ITypeShape<T>? GetShape<T>()
            => (global::PolyType.Abstractions.ITypeShape<T>?)GetShape(typeof(T));
        
        /// <summary>
        /// Gets the generated <see cref="global::PolyType.Abstractions.ITypeShape" /> for the specified type.
        /// </summary>
        /// <param name="type">The type for which a shape is requested.</param>
        /// <returns>
        /// The generated <see cref="global::PolyType.Abstractions.ITypeShape" /> for the specified type.
        /// </returns>
        public global::PolyType.Abstractions.ITypeShape? GetShape(global::System.Type type)
        {
            if (type == typeof(global::ConsoleApp1.Person[]))
                return Person_Array;
            
            if (type == typeof(string))
                return String;
            
            if (type == typeof(global::ConsoleApp1.Person))
                return Person;
            
            if (type == typeof(int))
                return Int32;
            
            return null;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\GenerateShapeProvider.Person.g.cs" label="GenerateShapeProvider.Person.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace PolyType.SourceGenerator
{
    internal partial class GenerateShapeProvider
    {
        /// <summary>Gets the generated shape for specified type.</summary>
#nullable disable annotations // Use nullable-oblivious property type
        public global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person> Person => _Person ??= Create_Person();
#nullable enable annotations // Use nullable-oblivious property type
        private global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person>? _Person;

        private global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person> Create_Person()
        {
            return new global::PolyType.SourceGenModel.SourceGenObjectTypeShape<global::ConsoleApp1.Person>
            {
                Provider = this,
                IsRecordType = true,
                IsTupleType = false,
                CreatePropertiesFunc = CreateProperties_Person,
                CreateConstructorFunc = CreateConstructor_Person,
            };
        }

        private global::PolyType.Abstractions.IPropertyShape[] CreateProperties_Person() => new global::PolyType.Abstractions.IPropertyShape[]
        {
            new global::PolyType.SourceGenModel.SourceGenPropertyShape<global::ConsoleApp1.Person, string>
            {
                Name = "name",
                DeclaringType = (global::PolyType.Abstractions.IObjectTypeShape<global::ConsoleApp1.Person>)Person,
                PropertyType = String,
                Getter = static (ref global::ConsoleApp1.Person obj) => obj.name,
                Setter = null,
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetProperty("name", InstanceBindingFlags, null, typeof(string), [], null),
                IsField = false,
                IsGetterPublic = true,
                IsSetterPublic = false,
                IsGetterNonNullable = true,
                IsSetterNonNullable = false,
            },

            new global::PolyType.SourceGenModel.SourceGenPropertyShape<global::ConsoleApp1.Person, int>
            {
                Name = "age",
                DeclaringType = (global::PolyType.Abstractions.IObjectTypeShape<global::ConsoleApp1.Person>)Person,
                PropertyType = Int32,
                Getter = static (ref global::ConsoleApp1.Person obj) => obj.age,
                Setter = null,
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetProperty("age", InstanceBindingFlags, null, typeof(int), [], null),
                IsField = false,
                IsGetterPublic = true,
                IsSetterPublic = false,
                IsGetterNonNullable = true,
                IsSetterNonNullable = false,
            },

            new global::PolyType.SourceGenModel.SourceGenPropertyShape<global::ConsoleApp1.Person, global::ConsoleApp1.Person[]>
            {
                Name = "Childs",
                DeclaringType = (global::PolyType.Abstractions.IObjectTypeShape<global::ConsoleApp1.Person>)Person,
                PropertyType = Person_Array,
                Getter = static (ref global::ConsoleApp1.Person obj) => obj.Childs,
                Setter = static (ref global::ConsoleApp1.Person obj, global::ConsoleApp1.Person[] value) => obj.Childs = value,
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetProperty("Childs", InstanceBindingFlags, null, typeof(global::ConsoleApp1.Person[]), [], null),
                IsField = false,
                IsGetterPublic = true,
                IsSetterPublic = true,
                IsGetterNonNullable = true,
                IsSetterNonNullable = true,
            },

            new global::PolyType.SourceGenModel.SourceGenPropertyShape<global::ConsoleApp1.Person, int>
            {
                Name = "ID",
                DeclaringType = (global::PolyType.Abstractions.IObjectTypeShape<global::ConsoleApp1.Person>)Person,
                PropertyType = Int32,
                Getter = static (ref global::ConsoleApp1.Person obj) => obj.ID,
                Setter = static (ref global::ConsoleApp1.Person obj, int value) => obj.ID = value,
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetField("ID", InstanceBindingFlags),
                IsField = true,
                IsGetterPublic = true,
                IsSetterPublic = true,
                IsGetterNonNullable = true,
                IsSetterNonNullable = true,
            },
        };

        private global::PolyType.Abstractions.IConstructorShape CreateConstructor_Person()
        {
            return new global::PolyType.SourceGenModel.SourceGenConstructorShape<global::ConsoleApp1.Person, (string, int, global::ConsoleApp1.Person[], int, byte Flags)>
            {
                DeclaringType = (global::PolyType.Abstractions.IObjectTypeShape<global::ConsoleApp1.Person>)Person,
                ParameterCount = 4,
                GetParametersFunc = CreateConstructorParameters_Person,
                DefaultConstructorFunc = null,
                ArgumentStateConstructorFunc = static () => default((string, int, global::ConsoleApp1.Person[], int, byte Flags)),
                ParameterizedConstructorFunc = static (ref (string, int, global::ConsoleApp1.Person[], int, byte Flags) state) => { var obj = new global::ConsoleApp1.Person(state.Item1, state.Item2);  if ((state.Flags & 1) != 0) obj.Childs = state.Item3; if ((state.Flags & 2) != 0) obj.ID = state.Item4; return obj; },
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetConstructor(InstanceBindingFlags, new[] { typeof(string), typeof(int) }),
                IsPublic = true,
            };
        }

        private global::PolyType.Abstractions.IConstructorParameterShape[] CreateConstructorParameters_Person() => new global::PolyType.Abstractions.IConstructorParameterShape[]
        {
            new global::PolyType.SourceGenModel.SourceGenConstructorParameterShape<(string, int, global::ConsoleApp1.Person[], int, byte Flags), string>
            {
                Position = 0,
                Name = "name",
                ParameterType = String,
                Kind = global::PolyType.Abstractions.ConstructorParameterKind.ConstructorParameter,
                IsRequired = true,
                IsNonNullable = true,
                IsPublic = true,
                HasDefaultValue = false,
                DefaultValue = default!,
                Setter = static (ref (string, int, global::ConsoleApp1.Person[], int, byte Flags) state, string value) => state.Item1 = value,
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetConstructor(InstanceBindingFlags, new[] { typeof(string), typeof(int) })?.GetParameters()[0],
            },

            new global::PolyType.SourceGenModel.SourceGenConstructorParameterShape<(string, int, global::ConsoleApp1.Person[], int, byte Flags), int>
            {
                Position = 1,
                Name = "age",
                ParameterType = Int32,
                Kind = global::PolyType.Abstractions.ConstructorParameterKind.ConstructorParameter,
                IsRequired = true,
                IsNonNullable = true,
                IsPublic = true,
                HasDefaultValue = false,
                DefaultValue = default,
                Setter = static (ref (string, int, global::ConsoleApp1.Person[], int, byte Flags) state, int value) => state.Item2 = value,
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetConstructor(InstanceBindingFlags, new[] { typeof(string), typeof(int) })?.GetParameters()[1],
            },

            new global::PolyType.SourceGenModel.SourceGenConstructorParameterShape<(string, int, global::ConsoleApp1.Person[], int, byte Flags), global::ConsoleApp1.Person[]>
            {
                Position = 2,
                Name = "Childs",
                ParameterType = Person_Array,
                Kind = global::PolyType.Abstractions.ConstructorParameterKind.PropertyInitializer,
                IsRequired = false,
                IsNonNullable = true,
                IsPublic = true,
                HasDefaultValue = false,
                DefaultValue = default!,
                Setter = static (ref (string, int, global::ConsoleApp1.Person[], int, byte Flags) state, global::ConsoleApp1.Person[] value) => { state.Item3 = value; state.Flags |= 1; },
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetProperty("Childs", InstanceBindingFlags, null, typeof(global::ConsoleApp1.Person[]), [], null),
            },

            new global::PolyType.SourceGenModel.SourceGenConstructorParameterShape<(string, int, global::ConsoleApp1.Person[], int, byte Flags), int>
            {
                Position = 3,
                Name = "ID",
                ParameterType = Int32,
                Kind = global::PolyType.Abstractions.ConstructorParameterKind.FieldInitializer,
                IsRequired = false,
                IsNonNullable = true,
                IsPublic = true,
                HasDefaultValue = false,
                DefaultValue = default,
                Setter = static (ref (string, int, global::ConsoleApp1.Person[], int, byte Flags) state, int value) => { state.Item4 = value; state.Flags |= 2; },
                AttributeProviderFunc = static () => typeof(global::ConsoleApp1.Person).GetField("ID", InstanceBindingFlags),
            },
        };

        [global::System.Runtime.CompilerServices.UnsafeAccessor(global::System.Runtime.CompilerServices.UnsafeAccessorKind.Method, Name = "set_name")]
        private static extern void Person_name_SetAccessor(global::ConsoleApp1.Person obj, string value);

        [global::System.Runtime.CompilerServices.UnsafeAccessor(global::System.Runtime.CompilerServices.UnsafeAccessorKind.Method, Name = "set_age")]
        private static extern void Person_age_SetAccessor(global::ConsoleApp1.Person obj, int value);

        [global::System.Runtime.CompilerServices.UnsafeAccessor(global::System.Runtime.CompilerServices.UnsafeAccessorKind.Field, Name = "ID")]
        private static extern ref int Person_ID_Accessor(global::ConsoleApp1.Person obj);
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\GenerateShapeProvider.Person_Array.g.cs" label="GenerateShapeProvider.Person_Array.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace PolyType.SourceGenerator
{
    internal partial class GenerateShapeProvider
    {
        /// <summary>Gets the generated shape for specified type.</summary>
#nullable disable annotations // Use nullable-oblivious property type
        public global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person[]> Person_Array => _Person_Array ??= Create_Person_Array();
#nullable enable annotations // Use nullable-oblivious property type
        private global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person[]>? _Person_Array;

        private global::PolyType.Abstractions.ITypeShape<global::ConsoleApp1.Person[]> Create_Person_Array()
        {
            return new global::PolyType.SourceGenModel.SourceGenEnumerableTypeShape<global::ConsoleApp1.Person[], global::ConsoleApp1.Person>
            {
                ElementType = Person,
                ConstructionStrategy = global::PolyType.Abstractions.CollectionConstructionStrategy.Span,
                DefaultConstructorFunc = null,
                EnumerableConstructorFunc = null,
                SpanConstructorFunc = static values => values.ToArray(),
                GetEnumerableFunc = static obj => obj,
                AddElementFunc = null,
                Rank = 1,
                Provider = this,
           };
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\polytype\src\polytypeDemo\obj\GX\PolyType.SourceGenerator\PolyType.SourceGenerator.TypeShapeIncrementalGenerator\GenerateShapeProvider.String.g.cs" label="GenerateShapeProvider.String.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace PolyType.SourceGenerator
{
    internal partial class GenerateShapeProvider
    {
        /// <summary>Gets the generated shape for specified type.</summary>
#nullable disable annotations // Use nullable-oblivious property type
        public global::PolyType.Abstractions.ITypeShape<string> String => _String ??= Create_String();
#nullable enable annotations // Use nullable-oblivious property type
        private global::PolyType.Abstractions.ITypeShape<string>? _String;

        private global::PolyType.Abstractions.ITypeShape<string> Create_String()
        {
            return new global::PolyType.SourceGenModel.SourceGenObjectTypeShape<string>
            {
                Provider = this,
                IsRecordType = false,
                IsTupleType = false,
                CreatePropertiesFunc = null,
                CreateConstructorFunc = null,
            };
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project polytype ](/sources/polytype.zip)

:::


### Share polytype 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fpolytype&quote=polytype" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fpolytype&text=polytype:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fpolytype" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fpolytype&title=polytype" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fpolytype&title=polytype&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fpolytype" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/polytype

### In the same category (FunctionalProgramming) - 14 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Dusharp](/docs/Dusharp)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [rscg_queryables](/docs/rscg_queryables)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [Sera.Union](/docs/Sera.Union)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionGen](/docs/UnionGen)


#### [UnionsGenerator](/docs/UnionsGenerator)

