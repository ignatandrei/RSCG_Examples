// See https://aka.ms/new-console-template for more information
using Valid;

Console.WriteLine("Hello, World!");
Person p= new (){ Age = 55, Name = "Andrei" };
p.Validate();
Console.WriteLine("Person is valid");