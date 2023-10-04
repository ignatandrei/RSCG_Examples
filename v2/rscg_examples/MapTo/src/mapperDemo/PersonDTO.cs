using MapTo;

namespace mapperlyDemo;
[MapFrom(typeof(Person))]
public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    [IgnoreProperty]
    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}
