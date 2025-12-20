using OrderedBuildersGenerator;
using System;
using System.Xml.Linq;

namespace Builder;

[StepBuilder("PersonBuilder")]
public partial class PersonConfig
{
    private string? firstName;
    
    private string lastName = string.Empty;

    [OrderedStep(StepOrder.One)]
    public void WithLastName(string name)
    {
        this.lastName = name;
        
    }
    [OrderedStep(StepOrder.Two)]
    public void WithFirstName(string name)
    {
        this.firstName = name;
    }
    [BuildStep]
    public Person Build() => new(firstName??"",lastName);

}

public record Person(string firstName, string lastName)
{
    public string FullName() => $"{firstName} {lastName}";
}