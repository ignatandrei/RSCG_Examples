[AutoMethods(CustomTemplateFileName = "CreateFormattable.txt", template = TemplateMethod.CustomTemplateFile)]                    
partial class Department
{
    public int ID { get; set; }
    public string Name { get; set; }

}
[AutoMethods(CustomTemplateFileName = "CreateFormattable.txt", template = TemplateMethod.CustomTemplateFile)]
partial class Employee
{
    public int ID { get; set; }
    public string Name { get; set; }

    public Department dep { get; set; }
    
}