using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= new(p);
Console.WriteLine(dto.FullName);
