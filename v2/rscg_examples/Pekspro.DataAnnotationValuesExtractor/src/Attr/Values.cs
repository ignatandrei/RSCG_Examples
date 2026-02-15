using Pekspro.DataAnnotationValuesExtractor;

namespace Attr;


[DataAnnotationValuesOptions(StringLength = true, Range = true, Required = true, Display = true)]
[DataAnnotationValuesToGenerate(typeof(Person))]
partial  class Values
{
}
