using Riok.Mapperly.Abstractions;

namespace mapperlyDemo;

[Mapper]
public partial class PersonMapper
{
    public partial PersonDTO Person2PersonDTO(Person p);
}