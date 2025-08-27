---
sidebar_position: 1760
title: 176 - Darp.BinaryObjects
description: Serialize bits of data
slug: /Darp.BinaryObjects
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBitwise.mdx';

# Darp.BinaryObjects  by Ross Light GmbH


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Darp.BinaryObjects?label=Darp.BinaryObjects)](https://www.nuget.org/packages/Darp.BinaryObjects/)
[![GitHub last commit](https://img.shields.io/github/last-commit/rosslight/Darp.BinaryObjects?label=updated)](https://github.com/rosslight/Darp.BinaryObjects)
![GitHub Repo stars](https://img.shields.io/github/stars/rosslight/Darp.BinaryObjects?style=social)

## Details

### Info
:::info

Name: **Darp.BinaryObjects**

A source generator to generate TryRead/Write Little/BigEndian methods for struct/class definitions for binary serialization.

Author: Ross Light GmbH

NuGet: 
*https://www.nuget.org/packages/Darp.BinaryObjects/*   


You can find more details at https://github.com/rosslight/Darp.BinaryObjects

Source: https://github.com/rosslight/Darp.BinaryObjects

:::

### Original Readme
:::note

<div align="center">

# Darp.BinaryObjects

[![NuGet](https://img.shields.io/nuget/v/Darp.BinaryObjects.svg)](https://www.nuget.org/packages/Darp.BinaryObjects)
[![Downloads](https://img.shields.io/nuget/dt/Darp.BinaryObjects)](https://www.nuget.org/packages/Darp.BinaryObjects)

![Dotnet Version](https://img.shields.io/badge/dotnet-net8.0%20%7C%20net9.0-blue)
![Language Version](https://img.shields.io/badge/c%23-11-blue)

[![Tests](https://github.com/rosslight/Darp.BinaryObjects/actions/workflows/test_and_publish.yml/badge.svg)](https://github.com/rosslight/Darp.BinaryObjects/actions/workflows/test_and_publish.yml)
![License](https://img.shields.io/github/license/rosslight/Darp.BinaryObjects)

### A source generator to generate TryRead/Write Little/BigEndian methods for struct/class definitions.

> [!IMPORTANT]  
> This package is under heavy development. Anything is subject to change.

</div>
You should use the source generation when you want:
 
- Serialization to a buffer of bytes
- Deserialization from a buffer already completely received
- Endianness during serialization
- Common interfaces for serialization are required which allow to implement more complex scenarios by hand without the generator
- Usage of something like BinaryPrimitives but for more complex types
- Can work with a minimum c# LanguageVersion of 11 and net8.0 / net9.0

If these requirements do not meet your expectations, check out those other wonderful projects

- Several binary serializers. e.g. [MemoryPack](https://github.com/Cysharp/MemoryPack), [BinaryPack](https://github.com/Sergio0694/BinaryPack), ...
  which are great if direct binary serialization is not needed
- Serialization libraries relying on reflection. e.g. [HyperSerializer](https://github.com/adam-dot-cohen/HyperSerializer)
- [StructPacker](https://github.com/RudolfKurkaMs/StructPacker) - not supporting allocation less packing/unpacking
- [BinarySerializer](https://github.com/jefffhaynes/BinarySerializer?tab=readme-ov-file) - Allows for binary serialization with a way larger feature set but more difficult to understand and relying on reflection

## Supported properties

Here is a list of the property types currently supported by the library:

- [x] Unmanaged types: `bool`, `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `char`, `float`, `double`
- [x] BinaryObjects implementing `IWritable` or `IReadable`
- [ ] Blittable types
- [x] Enums
- [ ] Other .NET types: `BitArray`

For all of these types, it should be possible to define as array types:
- [x] Memory abstractions: `ReadOnlyMemory<T>`
- [x] Arrays: `T[]`
- [x] Lists: `List<T>`
- [x] Collections: `IEnumerable<T>`, `IReadOnlyCollection<T>`, `ICollection<T>`, `IReadOnlyList<T>`, `IList<T>`

To control these types there are attributes
- [x] `BinaryIgnore`: Ignore some members
- [x] `BinaryElementCount`: Sets the number of elements in an array
- [ ] `BinaryReadRemaining`: Reads the remaining into an array
- [ ] `BinaryLength`: Sets the length of a member

Unplanned:
- Unmanaged types have no clearly defined length / endianness: ~~`nint`~~, ~~`nuint`~~, ~~`decimal`~~
- Multidimensional arrays (e.g. `T[,]`, `T[,,]`, etc.)
- Jagged arrays (e.g. `T[][]`, etc.)
- Dictionaries: `Dictionary<TKey, TValue>`, `IDictionary<TKey, TValue>` and `IReadOnlyDictionary<TKey, TValue>`
- Nullable value types: `Nullable<T>` or `T?`

## What is serialized?

- Any `real`, user-defined member in a `class` or `struct` declaration
- Any `field` or `auto property` which is settable or has a parameter with matching type and name in the constructor

- If there are multiple constructors defined the one with a `BinaryConstructorAttribute` is being used

There are warnings if:
- The constructor cannot be resolved
- There are multiple constructors but none with a `BinaryConstructorAttribute`
- A member is readonly and does not have a matching constructor argument or is explicitly ignored

## How it's supposed to work

Let's pretend we have a series of bytes:

```csharp
01020003040506

A: 01
B: 0200
Data: 03040506
```

We now want to read an object from these bytes similar to how we would do with `BinaryPrimitives`:

```csharp
[BinaryObject]
public readonly record struct SomeTestStruct(byte A, ushort B, ReadOnlyMemory<byte> Data);
```

Normally, you would have to write serialization methods for yourself. By adding the `BinaryObjectAttribute`, this is done automatically by the source generator.


## Usage

```csharp
// Define your object
[BinaryObject]
partial record struct YourStruct(ushort A, byte B);

// Read the struct from the buffer using either little or big endian format
var buffer = Convert.FromHexString("AABBCC");
var success = YourStruct.TryReadLittleEndian(source: buffer, out var value);
var success2 = YourStruct.TryReadBigEndian(source: buffer, out var value2, out int bytesRead);

// Get the actual size of the struct
var size = value.GetByteCount();

// Write the values back to a buffer
var writeBuffer = new byte[size];
var success3 = value.TryWriteLittleEndian(destination: writeBuffer);
var success4 = value2.TryWriteLittleEndian(destination: writeBuffer, out int bytesWritten);
```

The code generated by the struct will attempt to maximize readability by still maintaining performance and as little allocations as possible.

<details>
    <summary>Generated code</summary>

```csharp
// <auto-generated/>
#nullable enable

using BinaryHelpers = global::Darp.BinaryObjects.BinaryHelpers;
using NotNullWhenAttribute = global::System.Diagnostics.CodeAnalysis.NotNullWhenAttribute;

namespace Your.Namespace;

/// <remarks> <list type="table">
/// <item> <term><b>Field</b></term> <description><b>Byte Length</b></description> </item>
/// <item> <term><see cref="A"/></term> <description>2</description> </item>
/// <item> <term><see cref="B"/></term> <description>1</description> </item>
/// <item> <term> --- </term> <description>3</description> </item>
/// </list> </remarks>
public partial record struct YourStruct : global::Darp.BinaryObjects.IWritable, global::Darp.BinaryObjects.ISpanReadable<YourStruct>
{
    /// <inheritdoc />
    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public int GetByteCount() => 3;

    /// <inheritdoc />
    public bool TryWriteLittleEndian(global::System.Span<byte> destination) => TryWriteLittleEndian(destination, out _);
    /// <inheritdoc />
    public bool TryWriteLittleEndian(global::System.Span<byte> destination, out int bytesWritten)
    {
        bytesWritten = 0;

        if (destination.Length < 3)
            return false;
        BinaryHelpers.WriteUInt16LittleEndian(destination[0..], this.A);
        BinaryHelpers.WriteUInt8(destination[2..], this.B);
        bytesWritten += 3;

        return true;
    }
    /// <inheritdoc />
    public bool TryWriteBigEndian(global::System.Span<byte> destination) => TryWriteBigEndian(destination, out _);
    /// <inheritdoc />
    public bool TryWriteBigEndian(global::System.Span<byte> destination, out int bytesWritten)
    {
        bytesWritten = 0;

        if (destination.Length < 3)
            return false;
        BinaryHelpers.WriteUInt16BigEndian(destination[0..], this.A);
        BinaryHelpers.WriteUInt8(destination[2..], this.B);
        bytesWritten += 3;

        return true;
    }

    /// <inheritdoc />
    public static bool TryReadLittleEndian(global::System.ReadOnlySpan<byte> source, out YourStruct value) => TryReadLittleEndian(source, out value, out _);
    /// <inheritdoc />
    public static bool TryReadLittleEndian(global::System.ReadOnlySpan<byte> source, out YourStruct value, out int bytesRead)
    {
        bytesRead = 0;
        value = default;

        if (source.Length < 3)
            return false;
        var ___readA = BinaryHelpers.ReadUInt16LittleEndian(source[0..]);
        var ___readB = BinaryHelpers.ReadUInt8(source[2..]);
        bytesRead += 3;

        value = new YourStruct(___readA, ___readB);
        return true;
    }
    /// <inheritdoc />
    public static bool TryReadBigEndian(global::System.ReadOnlySpan<byte> source, out YourStruct value) => TryReadBigEndian(source, out value, out _);
    /// <inheritdoc />
    public static bool TryReadBigEndian(global::System.ReadOnlySpan<byte> source, out YourStruct value, out int bytesRead)
    {
        bytesRead = 0;
        value = default;

        if (source.Length < 3)
            return false;
        var ___readA = BinaryHelpers.ReadUInt16BigEndian(source[0..]);
        var ___readB = BinaryHelpers.ReadUInt8(source[2..]);
        bytesRead += 3;

        value = new YourStruct(___readA, ___readB);
        return true;
    }
}
```
</details>

## Development

After cloning the repository, you will find the following project structure:

- `src/Darp.BinaryObjects` contains public APIs and Attributes
- `src/Darp.BinaryObjects.Generator` contains the actual source generator
- `test/Darp.BinaryObjects.Tests` contains unit tests ensuring the generated files actually build and read/write as expected
- `test/Darp.BInaryObjects.Generator.Tests` contains snapshot tests to ensure the source generator generates valid files

### Code formatting

This repository uses [CSharpier](https://csharpier.com/) (inspired by prettier) for code formatting.
CSharpier should be installed automatically when building the solution as a local dotnet tool.

To run it, execute
```shell
dotnet csharpier .
```

If you want to format you code on save, check out available [Editor integration](https://csharpier.com/docs/Editors) for your IDE.

### Testing

Snapshot tests are done using [Verify](https://github.com/VerifyTests/Verify/). If you want to optimize running these tests in your local IDE, you might adjust some settings.
Please, check your local configuration in the [VerifyDocs](https://github.com/VerifyTests/Verify/blob/main/docs/wiz/readme.md)


:::

### About
:::note

Serialize bits of data


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Darp.BinaryObjects**
```xml showLineNumbers {18}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

  
	<ItemGroup>
	  <PackageReference Include="Darp.BinaryObjects" Version="0.4.0" />
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Darp.BinaryObjects\src\BitsDemo\Program.cs" label="Program.cs" >

  This is the use of **Darp.BinaryObjects** in *Program.cs*

```csharp showLineNumbers 
using BitsDemo;
using Darp.BinaryObjects;

var z = new zlib_header(0x78, 0x9C);

var size = z.GetByteCount();

// Write the values back to a buffer
var writeBuffer = new byte[size];
if(z.TryWriteLittleEndian(writeBuffer))
{
    Console.WriteLine("writing to buffer" );
	foreach (var item in writeBuffer)
	{
		Console.Write(item+" ");
	}
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Darp.BinaryObjects\src\BitsDemo\BitStruct.cs" label="BitStruct.cs" >

  This is the use of **Darp.BinaryObjects** in *BitStruct.cs*

```csharp showLineNumbers 
using Darp.BinaryObjects;
using System.IO.Compression;

namespace BitsDemo;

[BinaryObject]
partial record zlib_header(byte cmf, byte flg)
{
    
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Darp.BinaryObjects\src\BitsDemo\obj\GX\Darp.BinaryObjects.Generator\Darp.BinaryObjects.Generator.BinaryObjectsGenerator\BinaryObjectsGenerator.g.cs" label="BinaryObjectsGenerator.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace BitsDemo
{
    /// <remarks> <list type="table">
    /// <item> <term><b>Field</b></term> <description><b>Byte Length</b></description> </item>
    /// <item> <term><see cref="cmf"/></term> <description>1</description> </item>
    /// <item> <term><see cref="flg"/></term> <description>1</description> </item>
    /// <item> <term> --- </term> <description>2</description> </item>
    /// </list> </remarks>
    partial record zlib_header : global::Darp.BinaryObjects.IWritable, global::Darp.BinaryObjects.ISpanReadable<zlib_header>
    {
        /// <inheritdoc />
        [global::System.Diagnostics.Contracts.Pure]
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public int GetByteCount() => 2;

        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public bool TryWriteLittleEndian(global::System.Span<byte> destination) => TryWriteLittleEndian(destination, out _);
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public bool TryWriteLittleEndian(global::System.Span<byte> destination, out int bytesWritten)
        {
            bytesWritten = 0;

            if (destination.Length < 2)
                return false;
            global::Darp.BinaryObjects.Generated.Utilities.WriteUInt8(destination[0..], this.cmf);
            global::Darp.BinaryObjects.Generated.Utilities.WriteUInt8(destination[1..], this.flg);
            bytesWritten += 2;

            return true;
        }
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public bool TryWriteBigEndian(global::System.Span<byte> destination) => TryWriteBigEndian(destination, out _);
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public bool TryWriteBigEndian(global::System.Span<byte> destination, out int bytesWritten)
        {
            bytesWritten = 0;

            if (destination.Length < 2)
                return false;
            global::Darp.BinaryObjects.Generated.Utilities.WriteUInt8(destination[0..], this.cmf);
            global::Darp.BinaryObjects.Generated.Utilities.WriteUInt8(destination[1..], this.flg);
            bytesWritten += 2;

            return true;
        }

        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public static bool TryReadLittleEndian(global::System.ReadOnlySpan<byte> source, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out zlib_header? value) => TryReadLittleEndian(source, out value, out _);
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public static bool TryReadLittleEndian(global::System.ReadOnlySpan<byte> source, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out zlib_header? value, out int bytesRead)
        {
            bytesRead = 0;
            value = default;

            if (source.Length < 2)
                return false;
            var ___readcmf = global::Darp.BinaryObjects.Generated.Utilities.ReadUInt8(source[0..1]);
            var ___readflg = global::Darp.BinaryObjects.Generated.Utilities.ReadUInt8(source[1..2]);
            bytesRead += 2;

            value = new zlib_header(___readcmf, ___readflg);
            return true;
        }
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public static bool TryReadBigEndian(global::System.ReadOnlySpan<byte> source, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out zlib_header? value) => TryReadBigEndian(source, out value, out _);
        /// <inheritdoc />
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
        public static bool TryReadBigEndian(global::System.ReadOnlySpan<byte> source, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out zlib_header? value, out int bytesRead)
        {
            bytesRead = 0;
            value = default;

            if (source.Length < 2)
                return false;
            var ___readcmf = global::Darp.BinaryObjects.Generated.Utilities.ReadUInt8(source[0..1]);
            var ___readflg = global::Darp.BinaryObjects.Generated.Utilities.ReadUInt8(source[1..2]);
            bytesRead += 2;

            value = new zlib_header(___readcmf, ___readflg);
            return true;
        }
    }
}

namespace Darp.BinaryObjects.Generated
{
    using Darp.BinaryObjects;
    using System;
    using System.Buffers.Binary;
    using System.CodeDom.Compiler;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;
    using System.Runtime.InteropServices;

    /// <summary>Helper methods used by generated BinaryObjects.</summary>
    [GeneratedCodeAttribute("Darp.BinaryObjects.Generator", "0.4.0.0")]
    file static class Utilities
    {
        /// <summary> Writes a <c>byte</c> to the destination </summary>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void WriteUInt8(Span<byte> destination, byte value)
        {
            destination[0] = value;
        }
        /// <summary> Reads a <c>byte</c> from the given source </summary>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static byte ReadUInt8(ReadOnlySpan<byte> source)
        {
            return source[0];
        }
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Darp.BinaryObjects ](/sources/Darp.BinaryObjects.zip)

:::


### Share Darp.BinaryObjects 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDarp.BinaryObjects&quote=Darp.BinaryObjects" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDarp.BinaryObjects&text=Darp.BinaryObjects:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDarp.BinaryObjects" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDarp.BinaryObjects&title=Darp.BinaryObjects" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDarp.BinaryObjects&title=Darp.BinaryObjects&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDarp.BinaryObjects" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Darp.BinaryObjects

aaa
<SameCategory />

