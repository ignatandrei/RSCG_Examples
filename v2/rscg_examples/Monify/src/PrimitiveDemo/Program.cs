// See https://aka.ms/new-console-template for more information
using PrimitiveDemo;

Console.WriteLine("Hello, World!");
Person p= new ();
p.Age = 55;
Console.WriteLine($"Person's age is {p.Age}");
Console.WriteLine($"Is adult: {p.IsAdult}");