namespace IDisposableGeneratorDemo;

class ConnectionDB : IDisposable
{
    static int count = 0;
    public ConnectionDB()
    {
        Interlocked.Increment(ref count);
    }
    public void Dispose()
    {
        Console.WriteLine($"disposing connectiondb {Interlocked.Decrement(ref count)}");
    }
}
