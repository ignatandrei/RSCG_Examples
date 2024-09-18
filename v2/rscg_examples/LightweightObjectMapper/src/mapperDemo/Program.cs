using mapperDemo;
using LightweightObjectMapper;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= p.MapTo<PersonDTO>();
Console.WriteLine(dto.FullName);
