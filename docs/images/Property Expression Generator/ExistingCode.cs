[AutoMethods(template = TemplateMethod.CustomTemplateFile, CustomTemplateFileName = "CreateMetadata.txt")]
public partial class Person
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime? DateOfBirth {get;set;}
}