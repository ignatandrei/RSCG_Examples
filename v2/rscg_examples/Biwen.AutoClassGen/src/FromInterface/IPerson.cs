using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Biwen.AutoClassGen.Attributes;

namespace FromInterface;


[AutoGen("Person", "FromInterface")]
public interface IPerson
{
    
    [StringLength(100), Description("person first name")]
    string FirstName { get; set; }
    string LastName { get; set; }

    public string FullName();

}