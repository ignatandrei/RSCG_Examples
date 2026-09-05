namespace overloadMethod;

public class Person
{
    public string  FirstName { get; set; } = string.Empty;
    public string  LastName { get; set; } = string.Empty;

    [Tenekon.MethodOverloads.GenerateOverloads(Begin = nameof(MiddleName))]
    public string FullName(string MiddleName, bool ToLowerCase)
    {
        var fullName = $"{FirstName} {MiddleName} {LastName}";
        return ToLowerCase ? fullName.ToLower() : fullName;
    }
}
