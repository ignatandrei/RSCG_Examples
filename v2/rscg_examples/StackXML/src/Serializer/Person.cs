
using StackXML;

namespace SerializerDemo;
[XmlCls("person")]
public partial class Person
{
    [XmlField("age")]
    public int Age;
    [XmlField("name")]
    public string Name = string.Empty;

    
}

