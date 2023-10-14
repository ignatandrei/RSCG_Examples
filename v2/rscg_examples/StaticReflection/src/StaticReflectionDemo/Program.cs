using StaticReflection;
using StaticReflectionDemo;

var p = new Person();

PersonReflection.Instance.SetProperty(p, "FirstName","Andrei");
PersonReflection.Instance.SetProperty(p, "LastName", "Ignat");

Console.WriteLine(p.Name());