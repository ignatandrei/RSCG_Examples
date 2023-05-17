// See https://aka.ms/new-console-template for more information
using AutoDeconstruct;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Title { get; set; }
}

[NoAutoDeconstruct]
public class TestPerson
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Title { get; set; }

}