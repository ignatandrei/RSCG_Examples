using schema.binary;
using SerializerDemo;

var p= new Person() { Name= "Andrei Ignat" , Age=55};
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