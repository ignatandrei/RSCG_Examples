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
