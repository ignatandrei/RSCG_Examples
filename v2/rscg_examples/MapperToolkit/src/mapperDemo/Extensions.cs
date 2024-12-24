using MapperToolkit;
using System;
namespace mapperDemo;

// Profile declaration
public partial class MappingProfile : Profile
{
    public MappingProfile()
    {
        GenerateAllMapper<Person, PersonDTO>()
        .Map(src => src.FirstName, dest => dest.FirstName)
        .Map(src => src.LastName, dest => dest.LastName);
    }
}
