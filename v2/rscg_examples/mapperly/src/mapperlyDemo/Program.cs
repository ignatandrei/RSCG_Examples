// See https://aka.ms/new-console-template for more information
using mapperlyDemo;

Console.WriteLine("Hello, World!");
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonMapper mapper = new() ;
var dto=mapper.Person2PersonDTO(p);
Console.WriteLine(dto.FullName);
