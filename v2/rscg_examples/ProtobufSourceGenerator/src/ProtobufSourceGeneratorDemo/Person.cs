using ProtoBuf;

namespace ProtobufSourceGeneratorDemo;

[ProtoContract]
public partial class Person
{
    
    public int Id { get; set; }
    public string? Name { get; set; }
}

