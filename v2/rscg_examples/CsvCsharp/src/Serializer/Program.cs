using Csv;
using SerializerDemo;

var p= new Person() { Name= "Andrei Ignat" , Age=55};
var utf8Csv = CsvSerializer.SerializeToString<Person>([p]);
Console.WriteLine(utf8Csv);
var p1 = CsvSerializer.Serialize<Person>([p]);
var p2 = CsvSerializer.Deserialize<Person>(p1);

Console.WriteLine(p2.First().Name);
Console.WriteLine(p2.First().Age);