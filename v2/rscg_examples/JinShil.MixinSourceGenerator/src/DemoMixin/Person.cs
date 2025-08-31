
using JinShil.MixinSourceGenerator;
namespace DemoMixin;
[Mixin(typeof(LogData))]
partial class Person
{
    public string Name { get; set; }=string.Empty;
    public void LogName() => this.Log(Name);
}
