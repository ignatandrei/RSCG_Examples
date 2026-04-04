using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= new UserMapper().Map(p);
Console.WriteLine(dto.FullName);
