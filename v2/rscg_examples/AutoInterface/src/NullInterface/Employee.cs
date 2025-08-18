

using AutoInterfaceAttributes;

namespace NullInterface;


    [AutoInterface]
public class Employee: IEmployee
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public IDepartment Department { get; set; }
    public string GetFullName()=> $"{FirstName} {LastName}";

    public string GetFullNameAndDepartment(string separator)=> $"{GetFullName()}{separator}{ Department?.Name}";
    
}
