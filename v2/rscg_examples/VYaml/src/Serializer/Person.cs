using VYaml.Annotations;
namespace SerializerDemo;
[YamlObject]
public partial class Person 
{
    public int Age { get; set; }

    public string Name { get; set; } = string.Empty;

}

