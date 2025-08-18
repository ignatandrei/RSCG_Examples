// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
var color = Colors.Red ;
Console.WriteLine($"Selected Colors: {color}");
color.Add(Colors.Blue);
Console.WriteLine($"After Adding Blue: {color}");
color.Remove(Colors.Red);
Console.WriteLine($"After Removing Red: {color}");
color.Toggle(Colors.Green);