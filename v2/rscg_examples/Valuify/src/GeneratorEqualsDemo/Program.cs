﻿// See https://aka.ms/new-console-template for more information
using GeneratorEqualsDemo;
var p1 = new Person()
{
    ID = 1,
    FirstName = "Andrei",
    LastName = "Ignat"
};
var p2= new Person()
{
    ID = 1,
    FirstName = "Andrei",
    LastName = "Ignat"
};
Console.WriteLine(p1==p2);
