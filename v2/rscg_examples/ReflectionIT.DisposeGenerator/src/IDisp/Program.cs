using IDisposableGeneratorDemo;
// https://github.com/sonnemaf/ReflectionIT.DisposeGenerator
using (var db = new DALDB())
{
    Console.WriteLine("before releasing");
}
Console.WriteLine("after releasing");