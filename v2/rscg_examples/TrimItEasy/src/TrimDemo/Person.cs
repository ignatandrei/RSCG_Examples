using TrimItEasy;

namespace TrimDemo;

public partial class Person
{
    public int Id { get; set; }

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; }= string.Empty;

}

public static partial class PersonExtensions
{
    [GeneratedTrimming]
    public static partial void FastTrimStrings(this Person person);
}