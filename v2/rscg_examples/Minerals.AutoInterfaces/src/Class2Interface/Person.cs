namespace Class2Interface;
[Minerals.AutoInterfaces.GenerateInterface("IPerson")]
public class Person
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
    public string FullName()=>$"{FirstName} {LastName}";
}
