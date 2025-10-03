using SerializerDemo;
using VYaml.Serialization;

var p= new Person() { Name= "Andrei Ignat" , Age=55};
var utf8Yaml = YamlSerializer.SerializeToString(p);
Console.WriteLine(utf8Yaml);
var p1 = YamlSerializer.Serialize<Person>(p);
var p2 = YamlSerializer.Deserialize<Person>(p1);

Console.WriteLine(p2.Name);
Console.WriteLine(p2.Age);