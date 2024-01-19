using MakeInterface.Contracts.Attributes;

namespace Class2Interface;
[GenerateInterface]
internal class Person:IPerson
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Name
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}
