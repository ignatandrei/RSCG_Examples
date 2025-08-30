using Nino.Core;
using SerializerDemo;

var p= new Person() { Name= "Andrei Ignat" , Age=55};
var str= NinoSerializer.Serialize(p);
//Console.WriteLine(str);
var entity = NinoDeserializer.Deserialize<Person>(str);
Console.WriteLine("name is "+entity.Name);