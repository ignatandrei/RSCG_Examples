
using Antelcat.AutoGen.ComponentModel.Mapping;

namespace mapperDemo;

public static partial class Extensions
{
    [AutoMap(Extra = [nameof(AfterMap)])]
    public static partial PersonDTO ToDTO(this Person person);

    private static void AfterMap(Person person, PersonDTO personDTO)
    {
        person.ID= personDTO.ID;
    }
}
