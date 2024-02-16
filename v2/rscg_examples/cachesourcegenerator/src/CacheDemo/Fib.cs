using Microsoft.Extensions.Caching.Memory;
using CacheSourceGenerator;
namespace CacheDemo;
internal partial class FibTest
{
    private readonly IMemoryCache _memoryCache;

    public FibTest(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }
    void ProcessCacheEntry(ICacheEntry entry)
    {
        entry.SlidingExpiration = TimeSpan.FromMinutes(2);
    }

    [GenerateMemoryCache(MethodName = "FibMemo", CacheEnricherProcessor = nameof(ProcessCacheEntry))]
    public int Fib(int n)
    {
        if (n <= 1)
        {
            return n;
        }
        Console.WriteLine($"Calculating Fib({n})");
        //return Fib(n - 1) + Fib(n - 2);
        return FibMemo(n - 1) + FibMemo(n - 2);
    }
}