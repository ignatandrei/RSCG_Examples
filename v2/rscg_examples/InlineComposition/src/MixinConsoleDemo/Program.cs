// See https://aka.ms/new-console-template for more information
using MixinConsoleDemo;

Console.WriteLine("Hello, World!");
Employee p = new Employee();
p.Name="Andrei Ignat";
p.Age = 55;
p.Salary = 1000;
p.Id = 1;
Console.WriteLine($"Name: {p.Name}, Age: {p.Age}, Salary: {p.Salary}");