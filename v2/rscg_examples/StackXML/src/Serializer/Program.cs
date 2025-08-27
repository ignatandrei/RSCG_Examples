using SerializerDemo;
using StackXML;

var p= new Person() { Name= "Andrei Ignat" , Age=55};
var str= XmlWriteBuffer.SerializeStatic(p);
Console.WriteLine(str);
var entity = XmlReadBuffer.ReadStatic<Person>(str);
Console.WriteLine("name is "+entity.Name);