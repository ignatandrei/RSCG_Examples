
using GenPack;

namespace SerializerDemo;


[GenPackable]
public partial record Person
{

    public readonly static PacketSchema Schema = PacketSchemaBuilder.Create()
           .@short("Id", "Age description")
           .@string("Name", "Name description")
           .Build();
}

