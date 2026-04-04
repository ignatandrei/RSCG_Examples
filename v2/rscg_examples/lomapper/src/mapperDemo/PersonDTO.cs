using LoMapper;
using System.Xml.Serialization;

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


[Mapper]
public partial class UserMapper
{
    [MapIgnore(nameof(Person.ID))]
    public partial PersonDTO Map(Person entity);
}