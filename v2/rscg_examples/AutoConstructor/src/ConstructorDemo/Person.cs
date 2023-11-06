namespace QuickConstructorDemo;

[AutoConstructor]
internal partial class Person
{
    private readonly string FirstName;
    private readonly string? LastName;
    
    public string FullName() => $"{FirstName} {LastName}";
    
}
