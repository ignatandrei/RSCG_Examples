using ModernLibs.FileHelpers;
using SerializerDemo;
var engine = new FileHelperEngine<Person>();
Person p = new () { Name= "Andrei Ignat" , DOB=new DateTime(1970, 4, 16)};

var data= engine.WriteString([p]);
var p1 = engine.ReadString(data);
Console.WriteLine(p1[0].Name);
Console.WriteLine(p1[0].DOB);