// See https://aka.ms/new-console-template for more information
using DecoratorDemo;

Console.WriteLine("Hello, World!");
IPerson person = new Person();
person = new LogPerson(person);
person.FirstName = "Andrei";
person.LastName = "Ignat";
Console.WriteLine(person.FullName());
var birthDate = new DateTime(1970, 4, 16);
var age = await person.CalculateAgeAsync(birthDate);
Console.WriteLine($"Age is {age}");