
using DynamicsMapper.Abstractions;

namespace NextGenMapperDemo;


[CrmEntity("person")]
public class Person
{
    [CrmField("personid", Mapping = MappingType.PrimaryId)]
    public Guid ID { get; set; }
    [CrmField("name")]

    public string? Name { get; set; }
}