// See https://aka.ms/new-console-template for more information
using EnumDemo;
using System.Reflection;

Console.WriteLine("Hello, World!");
if(!CarTypes.TryParse("BMW", null,out var car))
{
    Console.WriteLine("Invalid car type");
    return;
}

var message = car.Match(
    onBMW: () => "this is bmw",
    onDacia: () => "this is dacia",
    onMercedes: () => "this is mercedes",
    onNone: () => "this is none",
    onTesla: () => "this is tesla"
    );

Console.WriteLine(message);
