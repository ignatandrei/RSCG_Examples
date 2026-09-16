using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO personDTO= UserMapper.MapUser(p);
Console.WriteLine(personDTO.FullName);
