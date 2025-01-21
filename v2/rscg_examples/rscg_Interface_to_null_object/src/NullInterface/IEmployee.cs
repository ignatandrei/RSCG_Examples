
using InterfaceToNullObject;

namespace NullInterface;
[ToNullObject]
public interface IEmployee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public IDepartment Department { get; set; }
    public string GetFullName();

    public string GetFullNameAndDepartment(string separator);
    public bool MoveEmployeeToDepartment(IDepartment department);

}
