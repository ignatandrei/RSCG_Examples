
using Facet;

namespace mapperDemo;
[Facet(typeof(Person), Kind = FacetKind.Struct)]
public partial struct PersonDTO
{   public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}
