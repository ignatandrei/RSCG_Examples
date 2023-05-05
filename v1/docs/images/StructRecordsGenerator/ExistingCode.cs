[StructGenerators.GenerateToString(PrintTypeName = true)]
class Person
{
    [Required]
    public string FirstName { get; set; }
    public string LastName { get; set; }
}