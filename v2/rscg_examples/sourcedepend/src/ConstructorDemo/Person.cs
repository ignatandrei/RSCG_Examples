﻿
namespace CtorDemo;
internal partial class Person
{
    [Dependency]
    public readonly string? FirstName;
    [Dependency]
    public readonly string? LastName;
    
    public string FullName() => $"{FirstName} {LastName}";

    partial void PostConstruct()
    {
        Console.WriteLine("Person constructed");
    }
    partial void PreConstruct()
    {
        Console.WriteLine("Person constructing");
    }

}
