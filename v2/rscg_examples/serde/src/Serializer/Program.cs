using Serde.Json;
using SerializerDemo;

Person p = new () { Name= "Andrei Ignat" , Age=55};
var utf8= JsonSerializer.Serialize<Person>(p);
Console.WriteLine(utf8);
var p1 = JsonSerializer.Deserialize<Person>(utf8);
Console.WriteLine(p.Name);
Console.WriteLine(p1.Age);