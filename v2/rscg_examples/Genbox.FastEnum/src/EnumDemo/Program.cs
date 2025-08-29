// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
Console.WriteLine("Car types:" + Enums.CarTypes.MemberCount);
var cars= Enums.CarTypes.GetMemberValues();
foreach (var car in cars)
{
    Console.WriteLine( car.GetString());
}