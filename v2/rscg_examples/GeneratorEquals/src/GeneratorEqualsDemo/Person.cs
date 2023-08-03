using Generator.Equals;

namespace GeneratorEqualsDemo;

[Equatable]
partial class Person
{
    [IgnoreEquality]
    public int ID { get; set; }
    [DefaultEquality]
    public string? FirstName { get; set; }
    [DefaultEquality] 
    public string? LastName { get; set; }
}
