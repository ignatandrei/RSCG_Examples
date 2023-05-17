using Apparatus.AOT.Reflection;
using ApparatusDemo;
using System;

var pOldPerson = new Person();
pOldPerson.FirstName = "Andrei";

var prop = pOldPerson.GetProperties().Values;
foreach (var item in prop)
{
    Console.WriteLine($"{item.Name} Attr: {item.Attributes.Length} value {item.Name}");
    if (item.TryGetValue(pOldPerson, out var val))
    {
        Console.WriteLine("value : " + val);
    }

}
