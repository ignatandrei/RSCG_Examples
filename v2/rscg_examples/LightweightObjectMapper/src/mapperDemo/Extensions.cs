using LightweightObjectMapper;
using System;
namespace mapperDemo;

[MappingProfile]
internal partial class Extensions:
    IPostMapping<Person, PersonDTO>
{
    

    public PersonDTO PostMapping(Person source, PersonDTO target)
    {
        target.ID = source.ID;
        return target;
    }
}
