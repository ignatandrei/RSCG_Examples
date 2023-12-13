// See https://aka.ms/new-console-template for more information
using LingDemo;

Console.WriteLine("Hello, World!");
var p = new Person();
await Task.Delay(2000);
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine(p.CreationTime);
Console.WriteLine(p.LastModificationTime);