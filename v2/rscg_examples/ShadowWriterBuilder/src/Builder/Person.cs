namespace Builder;

[ShadowWriter.Builder]
public partial record Person(string FirstName, string? MiddleName, string LastName)
{
    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}
