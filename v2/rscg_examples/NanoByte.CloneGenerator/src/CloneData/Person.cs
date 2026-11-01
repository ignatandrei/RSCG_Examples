using NanoByte.CloneGenerator;


namespace CloneData;

[Cloneable]
public partial class Person
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public int Age { get; set; }
    public string Name() => $"{FirstName} {LastName}";

    public Person[] Childs { get; set; } = [];
}
