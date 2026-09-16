using MapItEasy;

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


public static partial class UserMapper
{
    [GeneratedMapping]
    public static partial PersonDTO MapUser(Person from);
}