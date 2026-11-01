

using ModernLibs.FileHelpers;

namespace SerializerDemo;

[DelimitedRecord(",")]
public partial class Person 
{
    [FieldConverter(ConverterKind.Date, "yyyy-MM-dd")]
    public DateTime DOB { get; set; }
    [FieldQuoted]
    public string Name { get; set; } = string.Empty;

}

