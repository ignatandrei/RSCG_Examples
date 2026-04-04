// See https://aka.ms/new-console-template for more information
using EnumDemo;
using System.Reflection;

Console.WriteLine("Hello, World!");
CarTypes car = CarTypes.BMW;
var message = car.Match(
    onBMW: () => "this is bmw",
    onDacia: () => "this is dacia",
    onMercedes: () => "this is mercedes",
    onNone: () => "this is none",
    onTesla: () => "this is tesla"
    );

Console.WriteLine(message);
MaritalStatus maritalStatus = new Divorced();

var messageStatus = maritalStatus.Match(
    onSingle: x => "single",
    onMarried: x => "married",
    onDivorced: x => "divorced",
    onWidowed: x => "widowed"
);
Console.WriteLine(messageStatus);