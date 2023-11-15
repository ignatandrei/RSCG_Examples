namespace JsonPolymorphicGeneratorDemo;

[Aviationexam.GeneratedJsonConverters.Attributes.JsonPolymorphic]
[Aviationexam.GeneratedJsonConverters.Attributes.JsonDerivedType(typeof(Student))]
[Aviationexam.GeneratedJsonConverters.Attributes.JsonDerivedType(typeof(Teacher))]
public abstract partial class Person
{
    
    public string? Name { get; set; }
    public abstract string Data();
}

public class Teacher : Person
{
    public override string Data()
    {
        return "Class Teacher:" + Name;
    }
}
public class Student : Person
{
    public override string Data()
    {
        return "Class Student:" + Name;
    }
}
