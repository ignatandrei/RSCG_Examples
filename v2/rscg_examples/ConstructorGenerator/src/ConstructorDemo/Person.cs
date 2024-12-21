using ConstructorGenerator.Attributes;

namespace QuickConstructorDemo;

[GenerateFullConstructor]
internal partial class Person
{
    [ConstructorDependency]
    private readonly string FirstName="";

    private readonly string? LastName;
    
    public string FullName() => $"{FirstName} {LastName}";
    
}
