
namespace MatryoshkiDemo;

public class Person : IPerson
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}
