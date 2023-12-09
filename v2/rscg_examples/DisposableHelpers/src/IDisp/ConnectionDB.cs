namespace IDisposableGeneratorDemo;

class ConnectionDB : IDisposable
{
    public void Dispose()
    {
        Console.WriteLine("disposing connectiondb");
    }
}
