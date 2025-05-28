// See https://aka.ms/new-console-template for more information
using ComparisonDemo;

Console.WriteLine("Hello, World!");
var room = new Room
{
    Height = 10,
    Width = 20,
    Length = 30
};
var room2 = new Room
{
    Height = 15,
    Width = 25,
    Length = 35
};
Console.WriteLine($"Room Volume: {room.Volume}");
Console.WriteLine($"Room Comparison: {room.CompareTo(room2)}");
Console.WriteLine($"Room Comparison: {room < room2}");

