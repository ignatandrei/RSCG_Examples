using PolyType.Examples.JsonSerializer;
using PolyType.Examples.CborSerializer;
using PolyType.Examples.XmlSerializer;
using ConsoleApp1;
using PolyType.Examples.Cloner;

Person person = new("Pete", 70);
Console.WriteLine(JsonSerializerTS.Serialize(person)); // {"Name":"Pete","Age":70}
Console.WriteLine(XmlSerializer.Serialize(person));    // <value><Name>Pete</Name><Age>70</Age></value>
Console.WriteLine(CborSerializer.EncodeToHex(person)); // A2644E616D656450657465634167651846
person.Childs = [new Person("Andrei", 55)];

person.Childs[0].ID = 1;
var q = Cloner.Clone(person);
person.Childs[0].ID = 10;
Console.WriteLine(q);
Console.WriteLine(person);
Console.WriteLine(q.Childs[0]);
Console.WriteLine(person.Childs[0]);
