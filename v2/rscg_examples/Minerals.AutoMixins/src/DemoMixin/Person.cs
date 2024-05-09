
namespace DemoMixin;
[Minerals.AutoMixins.AddMixin(typeof(LogData))]
internal partial class Person
{
    public string Name { get; set; }
    public void LogName() => Log(Name);
}
