using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Biwen.AutoClassGen;
namespace FromInterface;


//[AutoGen("QueryRequest", "Biwen.AutoClassGen.Models")]
public interface IPerson
{
    [StringLength(100), Description("Keyword for search")]
    string FirstName { get; set; }
    string LastName { get; set; }

    string FullName();
}