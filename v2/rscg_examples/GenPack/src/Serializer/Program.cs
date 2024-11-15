using SerializerDemo;

var p= new Person() { Name= "Andrei Ignat" };
var bytes= p.ToPacket();
var entity = Person.FromPacket(bytes);
Console.WriteLine("name is "+entity.Name);