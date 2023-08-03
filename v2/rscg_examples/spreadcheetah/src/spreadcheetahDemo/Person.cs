using SpreadCheetah.SourceGeneration;

namespace spreadcheetahDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

[WorksheetRow(typeof(Person))]
public partial class PersonRowContext : WorksheetRowContext
{
}