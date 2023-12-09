using IDisposableGeneratorDemo;
//https://github.com/benutomo-dev/RoslynComponents
using (var db = new DALDB())
{
    Console.WriteLine("before releasing");
}
Console.WriteLine("after releasing");