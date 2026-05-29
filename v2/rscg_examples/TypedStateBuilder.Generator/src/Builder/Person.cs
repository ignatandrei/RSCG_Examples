using TypedStateBuilder;
namespace Builder;

[TypedStateBuilder]
public class PersonBuilder
{
    
    [StepForValue]
    [ValidateValue(nameof(ValidateName))] 
    private string lastName = string.Empty;

    [StepForValue]
    [ValidateValue(nameof(ValidateName))]
    private string firstName = string.Empty;

    public void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name) || name.Length <= 1)
        {
            throw new ArgumentException("Name must be at least 2 characters long.", nameof(name));
        }
    }

    
    [Build]
    public Person Build()
     => new Person(firstName, lastName);
}

public record Person(string firstName, string lastName)
{
    public string FullName() => $"{firstName} {lastName}";
}