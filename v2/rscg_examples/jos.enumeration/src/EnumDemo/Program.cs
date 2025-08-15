// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");

var cars= CarTypes.GetAll();
foreach (var car in cars)
{
    Console.WriteLine(car.Description + " - " +car.Value);
}