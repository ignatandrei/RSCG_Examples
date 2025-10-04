using Csv.Annotations;

namespace SerializerDemo;
[CsvObject]
public partial class Person 
{
    [Column(0)]
    public int Age { get; set; }
    [Column(1)]
    public string Name { get; set; } = string.Empty;

}

