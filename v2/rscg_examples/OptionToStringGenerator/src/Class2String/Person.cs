using Seekatar.OptionToStringGenerator;

namespace Class2String;

[OptionsToString]
internal class Person
{
    [OutputMask(PrefixLen = 3)]
    public string? FirstName { get; set; }
    [OutputMask(SuffixLen = 3)]
    public string? LastName { get; set; }

    public string FUllName => $"{FirstName} {LastName}";

    [OutputIgnore]
    public int Age { get; set; }
}