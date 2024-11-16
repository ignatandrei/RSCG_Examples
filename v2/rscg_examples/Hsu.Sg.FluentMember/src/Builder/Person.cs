namespace Builder;
[Hsu.Sg.FluentMember.FluentMember]
public partial class Person
{
    public string FirstName { get; init; }
    public string? MiddleName { get; init; }
    public string LastName { get; init; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}
