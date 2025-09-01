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
public int AlignedProperty { get; set; }
```

#### Endianness

Forces a type, field, or property to be read/written with a given [endianness](https://en.wikipedia.org/wiki/Endianness) (big-endian or little-endian). Tracked via a stack within the `SchemaBinaryReader`/`SchemaBinaryWriter`. If unspecified, will use whatever endianness was last specified in the stack (or the system endianness by default).
```cs
[BinarySchema]
[Endianness(Endianness.BigEndian)]
public partial class BigEndianType : IBinaryConvertible {
  ...
  
  [Endianness(Endianness.LittleEndian)]
  public int LittleEndianProperty { get; set; }
  
  ...
}
```

#### IfBoolean/RIfBoolean

Marks that a nullable field or property will only be read/written if some other boolean field or property is true.
```cs
[IntegerFormat(SchemaIntegerType.BYTE)]
public bool HasValue { get; set; }

[RIfBoolean(nameof(this.HasValue))]
public int? Value { get; set; }
```

#### IChildOf&lt;TParent&gt;

This pseudo-attribute marks a type as a "child" of some "parent" type—that it is contained as one of the members of the "parent type"—and passes the parent down to the child so it can be referenced in Schema logic.

Used by having the child type implement the `IChildOf<TParent>` interface, where `TParent` stores the child type in a field/property or as a member of a sequence (array/list):
```cs
[BinarySchema]
public partial class ChildType : IBinaryConvertible, IChildOf<ParentType> {
  public ParentType Parent { get; set; }
  
  ...
}
```

Below is a simple example where a boolean from the parent is used to decide when to read a value in the child:
```cs
[BinarySchema]
public partial class ParentType : IBinaryConvertible {
  [IntegerFormat(SchemaIntegerType.BYTE)]
  public bool ChildHasSomeField { get; set; }

  public ChildType Child { get; } = new();
}

[BinarySchema]
public partial class ChildType : IBinaryConvertible, IChildOf<ParentType> {
  // This is automatically skipped while reading/writing.
  public ParentType Parent { get; set; }

  [Skip]
  private bool HasSomeField => Parent.ChildHasSomeField;

  [RIfBoolean(nameof(HasSomeField))]
  public int? SomeField { get; set; }
}
```

#### Skip

Designates that a field or property should be skipped while reading/writing.

*Note: `IChildOf<TParent>.Parent` is automatically skipped.*
```cs
[Skip]
public int skippedField;

[Skip]
public int SkippedProperty { get; set; }
```

This can be used to encapsulate logic within properties, such as in the following examples:

1) **Value conversion**
```cs
[StringLengthSource(4)]
public string Magic { get; set; }

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
public string Magic { get; set; }

[Skip]
public ISection? Section => this.imageSection_ ?? this.soundSection_ ?? this.textSection_;

[Skip]
private bool IsImage_ => this.Magic == "IMAGE";
[Skip]
private bool IsSound_ => this.Magic == "SOUND";
[Skip]
private bool IsText_ => this.Magic == "TEXT";

[RIfBoolean(nameof(this.IsImage))]
private ImageSection? imageSection_ { get; set; }

[RIfBoolean(nameof(this.IsSound_))]
private SoundSection? soundSection_ { get; set; }

[RIfBoolean(nameof(this.IsText_))]
private TextSection? textSection_ { get; set; }
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
public string Text { get; set; }
```

2) **Preceding value**

If a `SchemaIntegerType` is passed into `StringLengthSource`, an integer of that type will first be read and used as the length of the string, or the length of the string will first be written before writing the string itself.
```cs
[StringLengthSource(SchemaIntegerType.BYTE)]
public string TextWithByteLength { get; set; }
```

3) **Another field or property**

If the name of another field or property is passed into `RStringLengthSource`, that other value will be used as the length of the string when reading.
```cs
public byte TextLength { get; set; }

[RStringLengthSource(nameof(this.TextLength))]
public string Text { get; set; }
```

##### NullTerminatedString

Designates that a string field or property will be read until a null terminator is reached, and written with a null terminator affixed to the end.
```cs
[NullTerminatedString]
public string Text { get; set; }
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
