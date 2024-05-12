namespace DemoClass;
[ThisClass]
internal partial class Person
{
    public string Name { get; set; }

    public string ClassName => ThisClass.FullName;
}
