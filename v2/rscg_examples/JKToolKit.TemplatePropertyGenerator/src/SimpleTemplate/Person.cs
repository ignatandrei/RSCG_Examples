namespace SimpleTemplate;
[TemplateProperty("Hello", "Hello {name1}, {name2}!")]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
