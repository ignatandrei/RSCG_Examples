// See https://aka.ms/new-console-template for more information
using DemoClass2Text;

Person person = new()
{
    FirstName = "Andrei",
    LastName = "Ignat"
};
Console.WriteLine(person.FullName());
