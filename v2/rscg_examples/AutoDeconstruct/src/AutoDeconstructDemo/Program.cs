﻿// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
var p = new Person();
p.FirstName = "Test";
p.LastName = "Ignat";
var (_, l, _ ) = p;
Console.WriteLine($"Last name is {l}");