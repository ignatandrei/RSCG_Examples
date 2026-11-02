
using Mappa.Attributes;

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

[Mappa]
public partial class UserMapper
{
    
    public static partial PersonDTO MapUser(Person from);
}