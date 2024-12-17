using Equatable.Attributes;

namespace GeneratorEqualsDemo;

[Equatable]
partial class Person
{
    [IgnoreEquality]
    public int ID { get; set; }
    [StringEquality(StringComparison.OrdinalIgnoreCase)]
    public string? FirstName { get; set; }
    [StringEquality(StringComparison.OrdinalIgnoreCase)]

    public string? LastName { get; set; }
}
