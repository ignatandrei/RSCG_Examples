// See https://aka.ms/new-console-template for more information

using DemoVogen;

Console.WriteLine("Hello, World!");
var p = PersonId.From(123);
var p1 = PersonId.From(123);
var p2 =(PersonId) 123;

Console.WriteLine(p == 123);
Console.WriteLine(p == p1);
Console.WriteLine(p == p2);
