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

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Deserializer.Collection.g.cs" label="Serializer.NinoGen.Deserializer.Collection.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669

using System;
using global::Nino.Core;
using System.Buffers;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Deserializer
    {
#region System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> - Generated by transformer TrivialEnumerableUsingAdd
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
        
            if (!reader.ReadCollectionHeader(out var length))
            {
                value = default;
                return;
            }
        
        #if WEAK_VERSION_TOLERANCE
            Reader eleReader;
        #endif
        
            var lst = new System.Collections.Generic.List<System.Collections.Generic.KeyValuePair<string, object?>>();
            for (int i = 0; i < length; i++)
            {
        #if WEAK_VERSION_TOLERANCE
                eleReader = reader.Slice();
                NinoDeserializer.Deserialize(out System.Collections.Generic.KeyValuePair<string, object?> item, ref eleReader);
        #else
                NinoDeserializer.Deserialize(out System.Collections.Generic.KeyValuePair<string, object?> item, ref reader);
        #endif
                lst.Add(item);
            }
        
            value = lst;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, ref Reader reader) => Deserialize(out value, ref reader);
        
#endregion

#region System.Collections.Generic.KeyValuePair<string, object?> - Generated by transformer KeyValuePair
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out System.Collections.Generic.KeyValuePair<string, object?> value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out System.Collections.Generic.KeyValuePair<string, object?> value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            NinoDeserializer.Deserialize(out string k, ref reader);
            object v = NinoDeserializer.DeserializeBoxed(ref reader, null);
            value = new System.Collections.Generic.KeyValuePair<string, object?>(k, v);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref System.Collections.Generic.KeyValuePair<string, object?> value, ref Reader reader)
            => Deserialize(out value, ref reader);
        
#endregion

#region byte[] - Generated by transformer Array
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out byte[] value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out byte[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref byte[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.ReadRef(ref value);
        }
        
#endregion

#region int[] - Generated by transformer Array
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out int[] value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out int[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref int[] value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.ReadRef(ref value);
        }
        
#endregion

#region long? - Generated by transformer Nullable
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out long? value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out long? value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
            if (reader.Eof)
            {
                value = default;
                return;
            }
        #endif
            reader.Read(out bool hasValue);
            if (!hasValue)
            {
                value = default;
                return;
            }
        
            reader.UnsafeRead(out long ret);
            value = ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref long? value, ref Reader reader) => Deserialize(out value, ref reader);
        
#endregion

    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Deserializer.g.cs" label="Serializer.NinoGen.Deserializer.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
using System;
using global::Nino.Core;
using System.Buffers;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Deserializer
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(out string value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
             if (reader.Eof)
             {
                value = default;
                return;
             }
        #endif
            
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeRef(ref string value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
             if (reader.Eof)
             {
                value = default;
                return;
             }
        #endif
            
            reader.Read(out value);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Deserialize(ReadOnlySpan<byte> data, out string value) 
        {
            var reader = new Reader(data);
            Deserialize(out value, ref reader);
        }



        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeImpl(out SerializerDemo.Person value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
           if (reader.Eof)
           {
              value = default;
              return;
           }
        #endif
            reader.Read(out int typeId);
            if(typeId == TypeCollector.Null)
            {
                value = default;
                return;
            }
            else if(typeId != NinoTypeConst.SerializerDemo_Person)
                throw new InvalidOperationException("Invalid type id");

            value = new SerializerDemo.Person();
#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.UnsafeRead(out value.Age);
#else
            reader.UnsafeRead(out value.Age);
#endif
#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.Read(out value.Name);
#else
            reader.Read(out value.Name);
#endif
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void DeserializeImplRef(ref SerializerDemo.Person value, ref Reader reader)
        {
        #if WEAK_VERSION_TOLERANCE
           if (reader.Eof)
           {
              value = default;
              return;
           }
        #endif
            if (Unsafe.IsNullRef(ref value))
            {
                DeserializeImpl(out value, ref reader);
                return;
            }

            reader.Read(out int typeId);
            if(typeId == TypeCollector.Null)
            {
                value = default;
                return;
            }
            else if(typeId != NinoTypeConst.SerializerDemo_Person)
                throw new InvalidOperationException("Invalid type id");

#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.UnsafeRead(out value.Age);
#else
            reader.UnsafeRead(out value.Age);
#endif
#if WEAK_VERSION_TOLERANCE
            if (!reader.Eof) reader.Read(out value.Name);
#else
            reader.Read(out value.Name);
#endif
        }


    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Deserializer.Generic.g.cs" label="Serializer.NinoGen.Deserializer.Generic.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669
using System;
using global::Nino.Core;
using System.Buffers;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Deserializer
    {
        private static bool _initialized;
        private static object _lock = new object();
        
        static Deserializer()
        {
            Init();
        }
        
    #if NET5_0_OR_GREATER
        [ModuleInitializer]
    #endif
        public static void Init()
        {
            lock (_lock)
            {
                if (_initialized)
                    return;
                    
                RegisterTrivialDeserializers();
                RegisterCollectionDeserializers();
                _initialized = true;
            }
        }
        
    #if UNITY_2020_2_OR_NEWER
    #if UNITY_EDITOR
        [UnityEditor.InitializeOnLoadMethod]
        private static void InitEditor() => Init();
    #endif
    
        [UnityEngine.RuntimeInitializeOnLoadMethod(UnityEngine.RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void InitRuntime() => Init();
    #endif
    
        private static void RegisterCollectionDeserializers()
        {
            NinoTypeMetadata.RegisterDeserializer<System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>>>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<System.Collections.Generic.KeyValuePair<string, object?>>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<byte[]>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<int[]>(Deserialize, DeserializeRef, false);
            NinoTypeMetadata.RegisterDeserializer<long?>(Deserialize, DeserializeRef, false);
        }
        private static void RegisterTrivialDeserializers()
        {
            NinoTypeMetadata.RegisterDeserializer<SerializerDemo.Person>(DeserializeImpl, DeserializeImplRef, false);
            NinoTypeMetadata.RegisterDeserializer<string>(Deserialize, DeserializeRef, false);
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Graph.g.cs" label="Serializer.NinoGen.Graph.g.cs" >
```csharp showLineNumbers 
/*
Base Types:

Sub Types:

Top Types:
SerializerDemo.Person

Circular Types:


*/
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.PartialClass.g.cs" label="Serializer.NinoGen.PartialClass.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS0109, CS8669
using System;
using System.Runtime.CompilerServices;


```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.PrivateAccessor.g.cs" label="Serializer.NinoGen.PrivateAccessor.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Runtime.CompilerServices;

#if NET8_0_OR_GREATER
namespace Serializer.NinoGen
{
    internal static partial class PrivateAccessor
    {
    }
}
#endif
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Serializer.Collection.g.cs" label="Serializer.NinoGen.Serializer.Collection.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669

using System;
using global::Nino.Core;
using System.Buffers;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Serializer
    {
#region System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> - Generated by transformer TrivialEnumerable

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>> value, ref Writer writer)
        {
            if (value == null)
            {
                writer.Write(TypeCollector.NullCollection);
                return;
            }
        
            var serializer_1388A30A = CachedSerializer<System.Collections.Generic.KeyValuePair<string, object?>>.Instance;
        
            int cnt = 0;
            int oldPos = writer.Advance(4);
        
            foreach (var item in value)
            {
                cnt++;
        #if WEAK_VERSION_TOLERANCE
                var pos = writer.Advance(4);
        #endif
                serializer_1388A30A.Serialize(item, ref writer);
        #if WEAK_VERSION_TOLERANCE
                writer.PutLength(pos);
        #endif
            }
        
            writer.PutBack(TypeCollector.GetCollectionHeader(cnt), oldPos);
        }
        
#endregion

#region System.Collections.Generic.KeyValuePair<string, object?> - Generated by transformer KeyValuePair

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this System.Collections.Generic.KeyValuePair<string, object?> value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.KeyValuePair<string, object?> value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this System.Collections.Generic.KeyValuePair<string, object?> value, ref Writer writer)
        {
            var serializer_C55A10A5 = CachedSerializer<string>.Instance;
            var serializer_7A439E91 = CachedSerializer<object>.Instance;
        
            serializer_C55A10A5.Serialize(value.Key, ref writer);
            NinoSerializer.SerializeBoxed(value.Value, ref writer, value.Value?.GetType());
        }
        
#endregion

#region byte[] - Generated by transformer Array

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this byte[] value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this byte[] value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this byte[] value, ref Writer writer)
        {
            writer.Write(value);
        }
        
#endregion

#region int[] - Generated by transformer Array

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this int[] value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this int[] value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this int[] value, ref Writer writer)
        {
            writer.Write(value);
        }
        
#endregion

#region long? - Generated by transformer Nullable

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this long? value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this long? value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this long? value, ref Writer writer)
        {
            if (!value.HasValue)
            {
                writer.Write(false);
                return;
            }
        
            writer.Write(true);
            writer.Write(value.Value);
        }
        
#endregion

    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Serializer.g.cs" label="Serializer.NinoGen.Serializer.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Buffers;
using System.Threading;
using global::Nino.Core;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Serializer
    {
        private static readonly ConcurrentQueue<NinoArrayBufferWriter> BufferWriters = new();
        private static readonly NinoArrayBufferWriter DefaultBufferWriter = new NinoArrayBufferWriter(1024);
        private static int _defaultUsed;

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static NinoArrayBufferWriter GetBufferWriter()
        {
            // Fast path
            if (Interlocked.CompareExchange(ref _defaultUsed, 1, 0) == 0)
            {
                return DefaultBufferWriter;
            }

            if (BufferWriters.Count == 0)
            {
                return new NinoArrayBufferWriter(1024);
            }

            if (BufferWriters.TryDequeue(out var bufferWriter))
            {
                return bufferWriter;
            }

            return new NinoArrayBufferWriter(1024);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void ReturnBufferWriter(NinoArrayBufferWriter bufferWriter)
        {
#if NET8_0_OR_GREATER
            bufferWriter.ResetWrittenCount();
#else
            bufferWriter.Clear();
#endif
            // Check if the buffer writer is the default buffer writer
            if (bufferWriter == DefaultBufferWriter)
            {
                // Ensure it is in use, otherwise throw an exception
                if (Interlocked.CompareExchange(ref _defaultUsed, 0, 1) == 0)
                {
                    throw new InvalidOperationException("The returned buffer writer is not in use.");
                }

                return;
            }

            BufferWriters.Enqueue(bufferWriter);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(bool value)
        {
            if (value)
                return new byte[1] \{ 1 };
           
            return new byte[1] \{ 0 };
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(byte value)
        {
            return new byte[1] \{ value };
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(string value, ref Writer writer) 
        {
            writer.Write(value);
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte[] Serialize(this string value) 
        {
            var bufferWriter = NinoSerializer.GetBufferWriter();
            Serialize(value, bufferWriter);
            var ret = bufferWriter.WrittenSpan.ToArray();
            NinoSerializer.ReturnBufferWriter(bufferWriter);
            return ret;
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Serialize(this string value, INinoBufferWriter bufferWriter) 
        {
            Writer writer = new Writer(bufferWriter);
            Serialize(value, ref writer);
        }


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void SerializeImpl(SerializerDemo.Person value, ref Writer writer)
        {
            if(value == null)
            {
                writer.Write(TypeCollector.Null);
                return;
            }

            writer.Write(NinoTypeConst.SerializerDemo_Person);
            writer.Write(value.Age);
            writer.Write(value.Name);
        }

    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Serializer.Generic.g.cs" label="Serializer.NinoGen.Serializer.Generic.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable CS8669
using System;
using global::Nino.Core;
using System.Buffers;
using System.ComponentModel;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static partial class Serializer
    {
        static Serializer()
        {
            Init();
        }
        
        private static bool _initialized;
        private static object _lock = new object();
        

        #if NET5_0_OR_GREATER
            [ModuleInitializer]
        #endif
        public static void Init()
        {
            lock (_lock)
            {
                if (_initialized)
                    return;
                    
                RegisterTrivialSerializers();
                RegisterCollectionSerializers();
                _initialized = true;
            }
        }
        
    #if UNITY_2020_2_OR_NEWER
    #if UNITY_EDITOR
        [UnityEditor.InitializeOnLoadMethod]
        private static void InitEditor() => Init();
    #endif
    
        [UnityEngine.RuntimeInitializeOnLoadMethod(UnityEngine.RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void InitRuntime() => Init();
    #endif
        
        private static void RegisterCollectionSerializers()
        {
            NinoTypeMetadata.RegisterSerializer<System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object?>>>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<System.Collections.Generic.KeyValuePair<string, object?>>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<byte[]>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<int[]>(Serialize, false);
            NinoTypeMetadata.RegisterSerializer<long?>(Serialize, false);
        }

        private static void RegisterTrivialSerializers()
        {
            NinoTypeMetadata.RegisterSerializer<SerializerDemo.Person>(SerializeImpl, false);
            NinoTypeMetadata.RegisterSerializer<string>(Serialize, false);
        }

    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.TypeConst.g.cs" label="Serializer.NinoGen.TypeConst.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>

using System;
using Nino.Core;
using System.Runtime.CompilerServices;

namespace Serializer.NinoGen
{
    public static class NinoTypeConst
    {
        private static bool _initialized;
        private static object _lock = new object();
       
        static NinoTypeConst()
        {
            Init();
        }
               
    #if UNITY_2020_2_OR_NEWER
    #if UNITY_EDITOR
        [UnityEditor.InitializeOnLoadMethod]
        private static void InitEditor() => Init();
    #endif
   
        [UnityEngine.RuntimeInitializeOnLoadMethod(UnityEngine.RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void InitRuntime() => Init();
    #endif
       
    #if NET5_0_OR_GREATER
        [ModuleInitializer]
    #endif
		public static void Init()
		{
			lock (_lock)
			{
				if (_initialized)
					return;
				_initialized = true;

				NinoTypeMetadata.RegisterType<global::SerializerDemo.Person>(SerializerDemo_Person);
			}
		}

		// global::SerializerDemo.Person
		public const int SerializerDemo_Person = 192498207;

    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Nino.Generator\Nino.Generator.GlobalGenerator\Serializer.NinoGen.Types.g.cs" label="Serializer.NinoGen.Types.g.cs" >
```csharp showLineNumbers 
/*
Type: SerializerDemo.Person
Parents:
Members:
	int Age [Ctor: False, Private: False, Property: False, Utf8String: False]
	string Name [Ctor: False, Private: False, Property: False, Utf8String: False]

*/
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Schema\schema.binary.BinarySchemaGenerator\SerializerDemo.Person_0_reader.g.cs" label="SerializerDemo.Person_0_reader.g.cs" >
```csharp showLineNumbers 
using System;
using schema.binary;

namespace SerializerDemo;

public partial class Person {
  public void Read(IBinaryReader br) {
    br.PushContainerEndianness(Endianness.BigEndian);
    this.Age = br.ReadInt32();
    this.Name = br.ReadStringNT();
    br.PopEndianness();
  }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Schema\src\Serializer\obj\GX\Schema\schema.binary.BinarySchemaGenerator\SerializerDemo.Person_0_writer.g.cs" label="SerializerDemo.Person_0_writer.g.cs" >
```csharp showLineNumbers 
using System;
using schema.binary;

namespace SerializerDemo;

public partial class Person {
  public void Write(IBinaryWriter bw) {
    bw.PushContainerEndianness(Endianness.BigEndian);
    bw.WriteInt32(this.Age);
    bw.WriteStringNT(this.Name);
    bw.PopEndianness();
  }
}

```
  </TabItem>


</Tabs>

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

aaa
<SameCategory />

