---
sidebar_position: 2250
title: 225 - Schema
description: Generate binary serialization code
slug: /Schema
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# Schema  by Melty Player


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Schema?label=Schema)](https://www.nuget.org/packages/Schema/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MeltyPlayer/Schema?label=updated)](https://github.com/MeltyPlayer/Schema)
![GitHub Repo stars](https://img.shields.io/github/stars/MeltyPlayer/Schema?style=social)

## Details

### Info
:::info

Name: **Schema**

Library for converting classes to and from binary. Provides a C# Roslyn generator that automatically implements conversion logic for simple classes.

Author: Melty Player

NuGet: 
*https://www.nuget.org/packages/Schema/*   


You can find more details at https://github.com/MeltyPlayer/Schema

Source: https://github.com/MeltyPlayer/Schema

:::

### Author
:::note
Melty Player 
![Alt text](https://github.com/MeltyPlayer.png)
:::

### Original Readme
:::note

# Schema

![GitHub](https://img.shields.io/github/license/MeltyPlayer/Schema)
[![Nuget](https://img.shields.io/nuget/v/schema)](https://www.nuget.org/packages/schema)
![Nuget](https://img.shields.io/nuget/dt/schema)
![Unit tests](https://github.com/MeltyPlayer/Schema/actions/workflows/dotnet.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/MeltyPlayer/Schema/badge.svg?service=github)](https://coveralls.io/github/MeltyPlayer/Schema)

## Overview

Library for serializing C# types to/from binary. Provides a Roslyn generator that automatically implements read/write logic.

**Warning: The design of this library is still in flux, so anticipate making changes when upgrading to future versions.**

## Credits

- [@connorhaigh](https://github.com/connorhaigh), whose [SubstreamSharp](https://github.com/connorhaigh/SubstreamSharp) library was pulled in for reading substreams.
- [@jefffhaynes](https://github.com/jefffhaynes), whose [BinarySerializer](https://github.com/jefffhaynes/BinarySerializer) attribute library inspired the schema attributes for configuring how binary data is read.
- [@Kermalis](https://github.com/Kermalis), whose [EndianBinaryIO](https://github.com/Kermalis/EndianBinaryIO) library inspired [Span](https://learn.microsoft.com/en-us/archive/msdn-magazine/2018/january/csharp-all-about-span-exploring-a-new-net-mainstay)-based performance improvements.
- [@Sergio0694](https://github.com/Sergio0694), whose [BinaryPack](https://github.com/Sergio0694/BinaryPack) generator inspired the schema source generator used to generate read/write methods.

## Usage

### Implementing binary schema classes

To write a binary schema class, you must first have it implement the `IBinarySerializable` or `IBinaryDeserializable` interfaces (or `IBinaryConvertible` if you need both).

Then, based on how complicated your schema class is, you can either choose to automatically or manually implement `Read()`/`Write()` methods.

#### Automatically

For most schema classes, you should be able to use the automatic code generator.

All you have to do is annotate the schema class with the `[BinarySchema]` attribute and mark it as partial; this will flag to the generator that it should implement read/write methods for this class.
It will then look into all fields/properties in the schema class, and attempt to implement read/write logic in the same order that the fields/properties appear.

Any nested schema classes will be automatically read/written as expected.

Some types require additional attributes in order to clarify any ambiguity.
For example, booleans require a `[IntegerFormat(SchemaIntegerType.###)]` attribute to know what type of integer to read, which it will then compare to 0.

Any readonly primitives will treated as assertions, which is useful for validating things like magic text or padding.

#### Manually

For complicated schema classes, such as ones that use decompression logic or pointers, you'll need to implement the read/write logic manually.

Specifically, you'll need to implement both a `Read(IBinaryReader br)` and `Write(IBinaryWriter bw)` method.
The `SchemaBinaryReader` and `SchemaBinaryWriter` classes provide many helpful methods for reading/writing a number of different primitive formats, including basic ones such as `byte`/`int`/`float`, but also more complex/unique ones such as `Half` (two-byte float) and `un16` (unsigned normalized 16-bit float).

Similar to the automatic process, you can nest schema classes and manually read/write them by calling their `Read()`/`Write()` methods. 
This can allow you to automatically generate subsections, so only the most complex logic needs to be manually written.

### How to use a binary schema class

To convert a given schema class to or from binary, simply instantiate an `SchemaBinaryReader` or `SchemaBinaryWriter` and pass it into the corresponding `Read()` or `Write()` methods in the schema class.

### Supported Attributes

The following attributes are currently supported in this library **when automatically generating code**. Some attributes are only used at read or write time—these are prefixed with an R or W respectively.

**Warning: These names are not final, so they may change in future versions.**

#### Align

Specifies how a field or property's offset (relative to the start of the stream) should be aligned when reading/writing. If misaligned, the `SchemaBinaryReader`/`SchemaBinaryWriter` will automatically insert the remaining bytes of padding. For example, `[Align(4)]` would force a field/property's starting offset to be a multiple of 4 (0, 4, 8, 12, 16, etc.).
```cs
[Align(4)]
public int alignedField;

[Align(4)]
public int AlignedProperty \{ get; set; }
```

#### Endianness

Forces a type, field, or property to be read/written with a given [endianness](https://en.wikipedia.org/wiki/Endianness) (big-endian or little-endian). Tracked via a stack within the `SchemaBinaryReader`/`SchemaBinaryWriter`. If unspecified, will use whatever endianness was last specified in the stack (or the system endianness by default).
```cs
[BinarySchema]
[Endianness(Endianness.BigEndian)]
public partial class BigEndianType : IBinaryConvertible {
  ...
  
  [Endianness(Endianness.LittleEndian)]
  public int LittleEndianProperty \{ get; set; }
  
  ...
}
```

#### IfBoolean/RIfBoolean

Marks that a nullable field or property will only be read/written if some other boolean field or property is true.
```cs
[IntegerFormat(SchemaIntegerType.BYTE)]
public bool HasValue \{ get; set; }

[RIfBoolean(nameof(this.HasValue))]
public int? Value \{ get; set; }
```

#### IChildOf&lt;TParent&gt;

This pseudo-attribute marks a type as a "child" of some "parent" type—that it is contained as one of the members of the "parent type"—and passes the parent down to the child so it can be referenced in Schema logic.

Used by having the child type implement the `IChildOf<TParent>` interface, where `TParent` stores the child type in a field/property or as a member of a sequence (array/list):
```cs
[BinarySchema]
public partial class ChildType : IBinaryConvertible, IChildOf<ParentType> {
  public ParentType Parent \{ get; set; }
  
  ...
}
```

Below is a simple example where a boolean from the parent is used to decide when to read a value in the child:
```cs
[BinarySchema]
public partial class ParentType : IBinaryConvertible {
  [IntegerFormat(SchemaIntegerType.BYTE)]
  public bool ChildHasSomeField \{ get; set; }

  public ChildType Child \{ get; \} = new();
}

[BinarySchema]
public partial class ChildType : IBinaryConvertible, IChildOf<ParentType> {
  // This is automatically skipped while reading/writing.
  public ParentType Parent \{ get; set; }

  [Skip]
  private bool HasSomeField => Parent.ChildHasSomeField;

  [RIfBoolean(nameof(HasSomeField))]
  public int? SomeField \{ get; set; }
}
```

#### Skip

Designates that a field or property should be skipped while reading/writing.

*Note: `IChildOf<TParent>.Parent` is automatically skipped.*
```cs
[Skip]
public int skippedField;

[Skip]
public int SkippedProperty \{ get; set; }
```

This can be used to encapsulate logic within properties, such as in the following examples:

1) **Value conversion**
```cs
[StringLengthSource(4)]
public string Magic \{ get; set; }

[Skip]
public MagicType Type => this.Magic switch {
  "IMGE" => MagicType.IMAGE,
  "SOND" => MagicType.SOUND,
  "TEXT" => MagicType.TEXT,
};
```

2) **"Switch" cases**
```cs
[NullTerminatedString]
public string Magic \{ get; set; }

[Skip]
public ISection? Section => this.imageSection_ ?? this.soundSection_ ?? this.textSection_;

[Skip]
private bool IsImage_ => this.Magic == "IMAGE";
[Skip]
private bool IsSound_ => this.Magic == "SOUND";
[Skip]
private bool IsText_ => this.Magic == "TEXT";

[RIfBoolean(nameof(this.IsImage))]
private ImageSection? imageSection_ \{ get; set; }

[RIfBoolean(nameof(this.IsSound_))]
private SoundSection? soundSection_ \{ get; set; }

[RIfBoolean(nameof(this.IsText_))]
private TextSection? textSection_ \{ get; set; }
```

#### Numbers/Enums

##### NumberFormat

TODO

##### IntegerFormat

TODO


#### Strings

*Note: At the moment, only ASCII is fully supported.*

##### StringLengthSource/RStringLengthSource

Designates the length of a string field or property via one of three cases. 

*Note: Any trailing null terminators will be ignored at read time.*

1) **Constant length**

If a constant is passed into `StringLengthSource`, that many characters will be read/written.
```cs
[StringLengthSource(8)]
public string Text \{ get; set; }
```

2) **Preceding value**

If a `SchemaIntegerType` is passed into `StringLengthSource`, an integer of that type will first be read and used as the length of the string, or the length of the string will first be written before writing the string itself.
```cs
[StringLengthSource(SchemaIntegerType.BYTE)]
public string TextWithByteLength \{ get; set; }
```

3) **Another field or property**

If the name of another field or property is passed into `RStringLengthSource`, that other value will be used as the length of the string when reading.
```cs
public byte TextLength \{ get; set; }

[RStringLengthSource(nameof(this.TextLength))]
public string Text \{ get; set; }
```

##### NullTerminatedString

Designates that a string field or property will be read until a null terminator is reached, and written with a null terminator affixed to the end.
```cs
[NullTerminatedString]
public string Text \{ get; set; }
```

#### Sequences

*Note: "Sequence" is the term used within Schema to refer to an array/list of elements.*

##### SequenceLengthSource/RSequenceLengthSource

TODO

##### RSequenceUntilEndOfStreamAttribute

TODO


#### Pointers/Memory

TODO

##### WPointerTo

TODO

##### WSizeOfMemberInBytes

TODO


:::

### About
:::note

Generate binary serialization code


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Schema**
```xml showLineNumbers {15}
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
	  <PackageReference Include="CommunityToolkit.HighPerformance" Version="8.3.0" />
	  <PackageReference Include="schema" Version="0.6.13" />
	</ItemGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\Program.cs" label="Program.cs" >

  This is the use of **Schema** in *Program.cs*

```csharp showLineNumbers 
using schema.binary;
using SerializerDemo;

var p= new Person() \{ Name= "Andrei Ignat" , Age=55};
var ms=new MemoryStream();
SchemaBinaryWriter writer = new ();
p.Write(writer);
await writer.CompleteAndCopyToAsync(ms);
ms.Position=0;
SchemaBinaryReader reader = new (ms);
p.Name=string.Empty;
p.Age=0;
p.Read(reader);
Console.WriteLine(p.Name);
Console.WriteLine(p.Age);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\Person.cs" label="Person.cs" >

  This is the use of **Schema** in *Person.cs*

```csharp showLineNumbers 

using schema.binary;
using schema.binary.attributes;

namespace SerializerDemo;

[BinarySchema]
[Endianness(Endianness.BigEndian)]
public partial class Person : IBinaryConvertible
{
    [IntegerFormat(SchemaIntegerType.INT32)]
    public int Age \{ get; set; }

    [NullTerminatedString]
    public string Name \{ get; set; \} = string.Empty;

}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Schema ](/sources/Schema.zip)

:::


### Share Schema 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSchema&quote=Schema" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSchema&text=Schema:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSchema" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSchema&title=Schema" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSchema&title=Schema&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSchema" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Schema

<SameCategory />

