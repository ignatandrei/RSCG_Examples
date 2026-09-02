using Najlot.Map;
using Najlot.Map.Attributes;
namespace mapperDemo;
public partial struct PersonDTO
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}


[Mapping]
public partial class UserMapper
{
    [MapIgnoreProperty(nameof(Person.ID))]
    public partial PersonDTO MapUser(Person from);
}