using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= p.ToDTO();
Console.WriteLine(dto.FullName);
