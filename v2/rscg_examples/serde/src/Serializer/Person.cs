
using Serde;

namespace SerializerDemo;

[GenerateSerde]
public partial class Person 
{
    public int Age { get; set; }
    public string Name { get; set; } = string.Empty;

}

