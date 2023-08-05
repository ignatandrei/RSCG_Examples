
namespace NextGenMapperDemo;
internal class Country
{

    public string? Name { get; set; }
    public string? CountryCode { get; set; }
}
internal class PersonDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public Country? BirthCountry { get; set; }
}
