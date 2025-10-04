// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
Console.WriteLine("Car types:" + CarTypesEnumExtensions.GetValues().Count);
var cars = CarTypesEnumExtensions.GetValues();
foreach (var car in cars)
{
    Console.WriteLine(car.ToStringFast());
}