---
sidebar_position: 610
title: 61 - ProtobufSourceGenerator
description: Serializing a class to protobuf
slug: /ProtobufSourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ProtobufSourceGenerator  by Laszlo Deak


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/LaDeak.ProtobufSourceGenerator?label=LaDeak.ProtobufSourceGenerator)](https://www.nuget.org/packages/LaDeak.ProtobufSourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ladeak/ProtobufSourceGenerator?label=updated)](https://github.com/ladeak/ProtobufSourceGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/ladeak/ProtobufSourceGenerator?style=social)

## Details

### Info
:::info

Name: **ProtobufSourceGenerator**

A source generator that generates helper classes with properties attributes with ProtoMember attribute.

Author: Laszlo Deak

NuGet: 
*https://www.nuget.org/packages/LaDeak.ProtobufSourceGenerator/*   


You can find more details at https://github.com/ladeak/ProtobufSourceGenerator

Source : https://github.com/ladeak/ProtobufSourceGenerator

:::

### Original Readme
:::note

# Protobuf Source Generator

A source generator that generates partial helper classes where member properties are attributed with ProtoMember attribute for serialization with [protobuf-net](https://github.com/protobuf-net/protobuf-net).

## Getting Started

Install nuget package:

```
dotnet add package LaDeak.ProtobufSourceGenerator
```

The source generator creates partial classes with *private* properties that are attributed with `[ProtoMember]` attributes. The properties *get* and *set* a corresponding property from the source type. This way developers are free to add and remove properties without explicitly attributing them.

> Note that adding, removing or reordering properties might cause breaking changes for the serialized data, as the tags assigned with `[ProtoMember]` attribute are given based on the source type's definition.

To generate a partial type for a custom type, mark the type with `[ProtoContract]` attribute and with `partial` modifier. For example, the following entity type can be made source generating:

```csharp
public class Entity
{
    public int Id { get; set; }
}
```

Add `[ProtoContract]` attribute and `partial` modifier on the type definition:


```csharp
[ProtoContract]
public partial class Entity
{
    public int Id { get; set; }
}
```

With this change a corresponding partial type is generated, that can be used for serialization with [protobuf-net](https://github.com/protobuf-net/protobuf-net):

```csharp
#nullable enable
namespace SampleApp;
public partial class Entity
{
    [ProtoBuf.ProtoMember(1)]
    private int ProtoId { get => Id; set => Id = value; }
}
```

The source generator generates serializable properties that are auto properties with getter and setters. 

## Non-Generating Properties

- `init` properties are excluded from source generation
- Non-auto properties are not generated
- Properties marked with `[ProtoIgnore]` and `[ProtoMemeber(x)]` attributes are not generated.
- Positional Records (not supported by protobuf-net)

In case a property needs to be serialized, but it has no corresponding generated property, it may be attributed with `[ProtoMemeber(x)]` on the original type. The source generator makes sure that tag *x* is not used on the generated partial type.

## Nested Types

Generating partial types for nested types is supported, however parent types must be marked with *partial* modifier.

## Analyzer

The source generator also comes with an analyzer helping source generation:

- issues an error if a custom type of a property is not participating in source generation
- issues an error if a source generated nested type's parent is not partial
- issues an info if a property is not part of source generation
- issues a warning when the base type is not attributed for serialization

## Advanced Usage

### Null Items in Collections

Serializing null values by protobuf-net is not allowed:

```csharp
new List<string>() { "one", null, "three" };
```

The generator will not remove null items, so in this case an exception shall be handled by the user code.

### Empty Collections

```csharp
public List<string> Value { get; set; }
```

Empty lists are not distinguished by the proto contract from a null lists. protobuf-net suggests to have an additional `bool` property indicating if the list was empty at serialization or not, and based on the value instantiate a collection at deserialization or not.

ProtoBufGenearator generates the helper property such as:

```csharp
[global::ProtoBuf.ProtoMember(1)]
private System.Collections.Generic.List<string> ProtoValue { get => Value; set => Value = value; }

[global::ProtoBuf.ProtoMember(2)]
[global::System.ComponentModel.DataAnnotations.Schema.NotMappedAttribute]
private bool ProtoIsEmptyValue
{
    get => ProtoValue?.Count == 0;
    set
    {
        if (value)
            ProtoValue = new();
    }
}
```

### Initialized to Enumerable Empty

```csharp
public IEnumerable<string> Values { get; set; } = Enumerable.Empty<string>();
```

Collections when initialized with enumerable empty cause an issue with deserialization as protobuf-net will attempt to add an item to the existing collection, which is not possible in the above case.

In this case the user may initialze with an empty list, or manually decorate the property with `[ProtoMember()]` (or `[ProtoIgnore]`) attribute that will exclude it from protobuf source generation.

### Custom Attributes on Properties

It is supported to decorate all properties in the generated partial class with custom attributes.

```csharp
[ProtoContract]
[GeneratorOptions(PropertyAttributeType = typeof(NotMappedAttribute))]
public partial class CustomAttributedEntity
{
    // ...
}
```

In the above example, with the type parameter of `GeneratorOptions` the generator is instructed to apply `NotMappedAttribute` attribute on all generated properties on a class.

For a more fine grained approach consider excluding the given property from the source generation. For such cases use `[ProtoMember()]` or `[ProtoIgnore]` attributes.

### Base Classes and Inheritance

Follow the instructions of protobuf-net library. Apply `[ProtoInclude(...)]` attribute on the type definition.



:::

### About
:::note

Serializing a class to protobuf


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ProtobufSourceGenerator**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="LaDeak.ProtobufSourceGenerator" Version="1.5.1" OutputItemType="Analyzer" ReferenceOutputAssembly="true" />
		<PackageReference Include="protobuf-net" Version="3.2.26" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\ProtobufSourceGenerator\src\ProtobufSourceGeneratorDemo\Program.cs" label="Program.cs" >

  This is the use of **ProtobufSourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using ProtoBuf;
using ProtobufSourceGeneratorDemo;

using var ms = new MemoryStream();
Serializer.Serialize(ms, new Person() { Name= "Andrei Ignat" });
ms.Seek(0, SeekOrigin.Begin);
var entity = Serializer.Deserialize<Person>(ms);
Console.WriteLine("name is "+entity.Name);
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\ProtobufSourceGenerator\src\ProtobufSourceGeneratorDemo\Person.cs" label="Person.cs" >

  This is the use of **ProtobufSourceGenerator** in *Person.cs*

```csharp showLineNumbers 
using ProtoBuf;

namespace ProtobufSourceGeneratorDemo;

[ProtoContract]
public partial class Person
{
    
    public int Id { get; set; }
    public string? Name { get; set; }
}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\ProtobufSourceGenerator\src\ProtobufSourceGeneratorDemo\obj\GX\ProtobufSourceGenerator\ProtobufSourceGenerator.Incremental.IncrementalSourceGenerator\ProtoPerson.g.cs" label="ProtoPerson.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace ProtobufSourceGeneratorDemo;
[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
public partial class Person
{
    [global::ProtoBuf.ProtoMember(1)]
    private int ProtoId { get => Id; set => Id = value; }

    [global::ProtoBuf.ProtoMember(2)]
    private string? ProtoName { get => Name; set => Name = value; }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project ProtobufSourceGenerator ](/sources/ProtobufSourceGenerator.zip)

:::


### Share ProtobufSourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProtobufSourceGenerator&quote=ProtobufSourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProtobufSourceGenerator&text=ProtobufSourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProtobufSourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProtobufSourceGenerator&title=ProtobufSourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProtobufSourceGenerator&title=ProtobufSourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProtobufSourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ProtobufSourceGenerator

## In the same category (Serializer)


### [JsonPolymorphicGenerator](/docs/JsonPolymorphicGenerator)


### [System.Text.Json](/docs/System.Text.Json)

