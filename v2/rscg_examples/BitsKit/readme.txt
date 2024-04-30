# BitsKit
[![NuGet Version](https://img.shields.io/nuget/v/BitsKit)](https://www.nuget.org/packages/BitsKit)

BitsKit is a lightweight C# library that provides efficient bit-level reading, writing and manipulation. As well as adding bit-field support to C#, not dissimilar to [C/C++ languages](https://en.cppreference.com/w/cpp/language/bit_field).

All features support integral and memory types, as well as targeting both, Little Endian (LE) Least Significant Bit (LSB) and Big Endian (BE) Most Significant Bit (MSB).

## Features
- [BitPrimitives](#bitprimitives)
- [Bit Fields](#bit-fields)
- [IO Classes](#io-classes)
- [Utility Methods](#utility-methods)

## Usage

### BitPrimitives
`BitsKit.Primitives.BitPrimitives` is the workhorse of the library containing all of the read and write logic. This class is the bit equivalent of `System.Buffers.Binary.BinaryPrimitives` and contains a MSB and LSB read and write method for each of the below integral types:
```
sbyte, byte, short, ushort, int, uint, long, ulong, nint, nuint
```
Each type has two overloads allowing the source/destination to be either a `Span<byte>` or `T` e.g.,

```c#
// reads a range of bits from a uint as MSB
static uint ReadUInt32MSB(uint source, int bitOffset, int bitCount);

// reads a range of bits from a span as MSB
static uint ReadUInt32MSB(ReadOnlySpan<byte> source, int bitOffset, int bitCount);

// writes a range of bits to a uint as MSB
static void WriteUInt32MSB(ref uint destination, int bitOffset, uint value, int bitCount);

// writes a range of bits to a span as MSB
static void WriteUInt32MSB(Span<byte> destination, int bitOffset, uint value, int bitCount);
```
This class also provides a `ReverseBitOrder` method for each integral type which inverts the bit order of each byte within the value, but not the order (endianness) of the bytes themselves e.g.
```c#
// reverses the bit order of each byte
static uint ReverseBitOrder(uint value);

//7......0 7......0      0......7 0......7
0b11001000_00111011 => 0b00010011_11011100
```

### Bit Fields
BitsKit provides the ability to generate bit-fields within types and aims to be as feature complete as the C and C++ implementations. This is achieved through the use of attributes applied to backing fields, which describe the structure and layout. These are converted into properties via a source generator. 

Bit fields can be added to class, struct and record types, supporting all of their variants too e.g., `readonly struct`, `record struct` etc. Objects containing bit-fields are declared by the `[BitObjectAttribute(BitOrder)]` attribute which also declares the default bit order for the type. Types must be partial and not nested.

Due to the nature of source generators, the user must generate the backing fields. Whilst this is more verbose than in C, it does provide much more granularity and control opening up some interesting dynamics. Backing fields must be a `field` and either; one of integral types above or one of the memory types below.

`byte[], fixed byte[], byte*, Span<byte>, ReadOnlySpan<byte>, Memory<byte>, ReadOnlyMemory<byte>`

Bit fields are declared using the `[BitFieldAttribute]` attribute which describes their name, size, bit order and properties. Each attribute defines a new bit-field sequential from the previous. A backing field can have as many bit-fields as desired, limited only by field boundaries. 

**Notes:** 
- If the backing field is an integral type, the bit-field will be of the same type.
- If the backing field is a memory type, the `FieldType` is required as it cannot be inferred.
- If the backing field is `readonly` or represents a readonly type, the bit-field will also be readonly.

```c#
// Constructor for integral backed bit-fields
[BitFieldAttribute(string name, byte size)]
// Constructor for memory backed bit-fields
[BitFieldAttribute(string name, byte size, BitFieldType fieldType)]

Fields:
// The name of the bit-field
public string? Name { get; }
// The number of bits the field occupies 
public byte Size { get; }
// The integral type of the field if backed by a memory type
public BitFieldType? FieldType { get; }
// Uses the opposite bit order than declared on the type
public bool ReverseBitOrder { get; set; }
// Modifiers that change the source generation
public BitFieldModifiers Modifiers { get; set; }
```
#### Padding Fields
Like C, an unnamed bit-field generates a set of inaccessible "padding" bits. These are primarily used for alignment or to map reserved/unused bits. There is a constructor overload dedicated to these fields.
```c#
// Constructor for integral padding bit-fields
[BitFieldAttribute(byte size)]
// Constructor for boolean padding bit-fields
[BooleanFieldAttribute]
// Constructor for enum padding bit-fields
[EnumFieldAttribute(byte size)]
```

#### Boolean Bit Fields
Boolean bit-fields are supported by the `[BooleanFieldAttribute]` helper attribute. Boolean fields consume a single bit and return if it is set or not. This attribute can be applied to any valid backing field and inherits from the `[BitFieldAttribute]` attribute. Boolean fields can be mixed with integer and enum fields without incurring a new unit.
```c#
// Constructor for boolean bit-fields
[BooleanFieldAttribute(string name)]
```

#### Enum Bit Fields
Enum bit-fields are supported by the `[EnumFieldAttribute]` helper attribute. This attribute can be applied to any valid backing field and inherits from the `[BitFieldAttribute]` attribute. The enum type must be passed as a type argument i.e., `typeof(MyEnum)`. Enum fields can be mixed with integer and boolean fields without incurring a new unit.
```c#
// Constructor for enum bit-fields
[EnumFieldAttribute(string name, byte size, Type enumType)]
```

#### Modifiers
The `BitFieldModifiers` enum allows alterations to the way that the source generator produces the bit-fields. By default all bit-fields are generated as a *public read/write* or *public readonly* properties relative to their backing field's accessibility. The `Modifiers` field allows control over this and provides the ability to change a bit-field's accessibility and if it is `readonly`, `init only` (.NET 6.0) and/or `required` (.NET 7.0).

**Note:** Currently both the getter and setter share the same accessibility therefore you cannot have public bit-fields with private setters.

#### Examples
Putting this into action with the following C struct:
```c++
struct S
{
    // occupies 2 bytes:
    unsigned char b1 : 3;  // 1st 3 bits (in 1st byte) are b1
    unsigned char    : 2;  // next 2 bits (in 1st byte) are unused "padding"
    unsigned char b2 : 1;  // next 1 bit (in 1st byte) is b2
    unsigned char b3 : 6;  // 6 bits for b3 - doesn't fit into the 1st byte => starts a 2nd
    unsigned char b4 : 2;  // 2 bits for b4 - next (and final) bits in the 2nd byte
};
```
Converted to it's BitsKit representation:
```c#
[BitObject(BitOrder.LeastSignificantBit)]
public partial struct S 
{
    [BitField("b1", 3)]     // 1st 3 bits (in 1st byte) are b1
    [BitField(2)]           // next 2 bits (in 1st byte) are unused "padding"
    [BitField("b2", 1)]     // next 1 bit (in 1st byte) is b2
    private byte _backingField1;
    
    [BitField("b3", 6)]     // 6 bits for b3 - doesn't fit into the 1st byte => use a 2nd
    [BitField("b4", 2)]     // 2 bits for b4 - next (and final) bits in the 2nd byte
    private byte _backingField2;
}
```
Which produces a new generated partial class containing:
```c#
public partial struct S 
{
    public byte b1 { get => ..; set => ..; }; // _backingField1 0..2
    public byte b2 { get => ..; set => ..; }; // _backingField1 5
    public byte b3 { get => ..; set => ..; }; // _backingField2 0..5
    public byte b4 { get => ..; set => ..; }; // _backingField2 6..7
}
```

#### Straddling Unit Boundaries
Some C compilers support straddling storage-unit boundaries. An example of this would be the "b3" field in the above example occupying the last 2 bits in the first byte and the first 4 bits in the second byte. BitsKit enforces unit boundaries for integral types however memory types do allow this.
```c#
[BitObject(BitOrder.LeastSignificantBit)]
public unsafe partial struct S 
{
    [BitField("b1", 3)] // 1st 3 bits (in 1st byte) are b1
    [BitField(2)]       // next 2 bits (in 1st byte) are unused "padding"
    [BitField("b2", 1)] // next 1 bit (in 1st byte) is b2
    [BitField("b3", 6)] // next (and final) 2 bits in 1st byte and 1st 4 bits in 2nd byte
    [BitField("b4", 4)] // 4 bits for b4 - next (and final) bits in the 2nd byte
    private fixed byte _backingField[2];
}
```
#### Errors
Below are the diagnostics BitsKit produces. Additionally, an `ArgumentOutOfRangeException` exception is thrown if the bit offset or count exceed the bounds of the backing field/source. 
Rule ID | Severity | Notes
--------|----------|--------------------
BITSKIT001 | Error | BitsKit object must be partial
BITSKIT002 | Error | BitsKit object must not be a nested type
BITSKIT003 | Error | Cannot infer FieldType
BITSKIT004 | Warning | Conflicting accessibility modifiers
BITSKIT005 | Warning | Conflicting setter modifiers
BITSKIT006 | Error | Enum type argument expected

### IO Classes
There are a number of IO types available under the `BitsKit.IO` namespace built to sequentially read/write regions of bit data. Each of these classes expose all the `BitPrimitives` methods whilst supporting seeking and writing in-place.

`BitReader/BitWriter` - Classes for reading/writing to a byte array.
`MemoryBitReader/MemoryBitWriter` - Ref structs for reading/writing to a `Span<byte>`.
`BitStreamReader/BitStreamWriter` - Classes for reading/writing to a stream.

**Notes:** 
- The array and span backed types support up to `int.MaxValue` bits as they use a signed integer for positioning to boost performance. This limits the source to being less than 0x10000000 bytes.
- The `BitStreamWriter` class does support writing in-place however, the destination stream must be both readable and seekable to allowing buffering of the stream's existing data.

### Utility Methods
Additional utilities for common bit processing tasks are provided under the `BitsKit.Utilities` namespace. Many of these functions have been taken from the awesome [Bit Twiddling Hacks](https://graphics.stanford.edu/~seander/bithacks.html) page created by Sean Eron Anderson.

**BitUtilities.InterleaveBits ([See](https://graphics.stanford.edu/~seander/bithacks.html#InterleaveBMN))** Interleaves the bits of two integral numbers. This is also known as "Morton numbers" or "Morton codes" e.g.,
```c#
static uint InterleaveBits(ushort a, ushort b)

//  a          b          baba_baba_baba
0b00_1111, 0b10_0010 => 0b1000_0101_1101
```
**BitUtilities.MergeBits ([See](https://graphics.stanford.edu/~seander/bithacks.html#MaskedMerge))** Merges the bits of two integral numbers according to a mask. If the mask bit is a `0`, the bit is taken from `a` otherwise it is taken from `b` e.g.,
```c#
static uint MergeBits(uint a, uint b, uint mask)

//   a           b          mask        bbbbaaaa
0b10101110, 0b11001010, 0b11110000 => 0b11001110
```
**BitUtilities.NegateBits** Negates a range of bits within an integral number e.g.,
```c#
static uint NegateBits(uint value, int bitOffset, int bitCount)

//  value   offset count      xxxx
0b1100_1101   4     4    => 0b0011_1101
```
**BitUtilities.ReverseBits ([See](https://graphics.stanford.edu/~seander/bithacks.html#ReverseParallel))** Reverses both the bit and byte order (endian) of an integral number e.g.,
```c#
static uint ReverseBits(uint value)

//   a        b             b        a
//7......0 7......0      0......7 0......7
0b11001000_00111011 => 0b11011100_00010011
```
**BitUtilities.SwapBits ([See](https://graphics.stanford.edu/~seander/bithacks.html#SwappingBitsXOR))** Swaps the positions of two ranges of bits within an integral number e.g.,
```c#
static uint SwapBits(uint value, int offsetA, int offsetB, int bitCount)

//  value   offsetA offsetB bitCount       bbaa
0b1100_1101    4       6       2      => 0b0011_1101
```

**ZigZag** An integer encoding used to convert signed integers to unsigned integers whilst maintaining a relative sized bit count. This is achieved by making the least significant bit the sign bit thus making the bit count proportional to the magnitude. This encoding is particularly useful for deltas with a small range e.g.,
```c#
static uint Encode(int value)
static int Decode(uint value)

//   -2         -1         0         1         2
// Two's complement
0b11111110 0b11111111 0b00000000 0b00000001 0b00000010
// ZigZag Encoded
0b00000011 0b00000001 0b00000000 0b00000010 0b00000100
```
