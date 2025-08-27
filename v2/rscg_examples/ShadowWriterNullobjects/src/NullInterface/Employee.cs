namespace NullInterface;


[ShadowWriter.NullObject]
public partial class Employee: IEmployee
{
    public IDepartment Department { get; set; } = NullInterface.Department.Instance;
}

public interface IEmployee
{
    public string FirstName { get; set; } 
    public string LastName { get; set; }
    public IDepartment Department { get; set; }
    public string GetFullName();
    public string GetFullNameAndDepartment(string separator);

}