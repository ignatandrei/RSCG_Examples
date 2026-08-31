using PropertyResolvers.Attributes;
[assembly: GeneratePropertyResolver("Name",IncludeNamespaces = ["PropSwitch"])]

namespace PropSwitch;

public class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class College
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
