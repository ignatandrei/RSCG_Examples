﻿// See https://aka.ms/new-console-template for more information
using mapperlyDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto = p.ToPersonDTO();
Console.WriteLine(dto.FullName);
