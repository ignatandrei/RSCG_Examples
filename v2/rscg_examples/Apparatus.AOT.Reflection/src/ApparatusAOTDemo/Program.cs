﻿using Apparatus.AOT.Reflection;
using ApparatusDemo;
using System;

Person p1 = new();
p1.FirstName = "Andrei1";
p1.LastName = "Ignat1";

Person p2 = new ();
p2.FirstName = "Andrei2";
p2.LastName = "Ignat2";

var prop =p1.GetProperties().Values;
foreach (var item in prop)
{
    Console.WriteLine($"{item.Name} Attr: {item.Attributes.Length} value {item.Name}");
    if (item.TryGetValue(p1, out var val))
    {
        Console.WriteLine("value : " + val);
    }

}
foreach (var item in prop)
{
    Console.WriteLine($"{item.Name} Attr: {item.Attributes.Length} value {item.Name}");
    if (item.TryGetValue(p2, out var val))
    {
        Console.WriteLine("value : " + val);
    }

}
