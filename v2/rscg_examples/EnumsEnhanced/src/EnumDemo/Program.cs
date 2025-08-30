// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
Console.WriteLine("Car types:" + CarTypesEnhanced.GetNamesFast().Length);
var cars= CarTypesEnhanced.GetValuesFast();
foreach (var car in cars)
{
    Console.WriteLine( car.ToStringFast());
}