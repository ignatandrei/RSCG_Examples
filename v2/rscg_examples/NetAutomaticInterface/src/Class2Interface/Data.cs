[AttributeUsage(AttributeTargets.Class)]
public class GenerateAutomaticInterfaceAttribute : Attribute
{
    public GenerateAutomaticInterfaceAttribute(string namespaceName = "") { }
}