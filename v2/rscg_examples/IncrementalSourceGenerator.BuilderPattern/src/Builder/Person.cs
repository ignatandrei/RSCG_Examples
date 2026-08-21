using Generator;
namespace Builder;

[Builder(typeof(Person))]
public partial class PersonBuilder
{
    
}

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName() => $"{FirstName} {LastName}";
}