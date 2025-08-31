// See https://aka.ms/new-console-template for more information
using EmbedDemo;
using System.Text;

Console.WriteLine("Hello, World!");

var data= TestData.Countries();

Console.WriteLine(Encoding.UTF8.GetString(data) );