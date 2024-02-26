
using Antelcat.AutoGen.ComponentModel.Mapping;

namespace mapperDemo;
public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [MapIgnore]
    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}
