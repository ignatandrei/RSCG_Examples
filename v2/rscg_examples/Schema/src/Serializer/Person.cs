
using schema.binary;
using schema.binary.attributes;

namespace SerializerDemo;

[BinarySchema]
[Endianness(Endianness.BigEndian)]
public partial class Person : IBinaryConvertible
{
    [IntegerFormat(SchemaIntegerType.INT32)]
    public int Age { get; set; }

    [NullTerminatedString]
    public string Name { get; set; } = string.Empty;

}

