
namespace DemoMixin;
[Minerals.AutoMixins.GenerateMixin]
internal class LogData
{
    public void Log(string data) => Console.WriteLine(data);
}
