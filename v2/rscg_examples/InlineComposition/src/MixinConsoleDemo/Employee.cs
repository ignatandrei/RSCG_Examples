
using InlineCompositionAttributes;

namespace MixinConsoleDemo;
[Inline<Person,IId>]
internal partial class Employee
{
    public decimal Salary { get; set; }
}
