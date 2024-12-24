using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto = p.MapperToPersonDTO();
Console.WriteLine(dto.FullName);
