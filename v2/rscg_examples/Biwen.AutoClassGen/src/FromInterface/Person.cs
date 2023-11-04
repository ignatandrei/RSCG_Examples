namespace FromInterface;
public partial class Person : IPerson
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string FullName() { return FirstName + " " + LastName; }

}
