namespace Builder;
[DimonSmart.BuilderGenerator.Runtime.GenerateBuilder]
public class Person
{
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}
