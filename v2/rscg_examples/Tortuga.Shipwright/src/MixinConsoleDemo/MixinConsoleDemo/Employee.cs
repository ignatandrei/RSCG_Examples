using Tortuga.Shipwright;

namespace MixinConsoleDemo;
[UseTrait(typeof(Person))]
internal partial class Employee
{
    public decimal Salary { get; set; }
}
