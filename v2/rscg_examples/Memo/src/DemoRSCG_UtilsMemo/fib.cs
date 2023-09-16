namespace DemoRSCG_UtilsMemo;

internal partial class fibTest
{
    public long Test_MemoPure()
    {
        Console.WriteLine("calculating type");
        return this.GetType().ToString().GetHashCode();
    }
    public async Task<long> fib(long nr)
    {
        await Task.Delay(1000);
        //Console.WriteLine("calculated value for " + nr);
        if (nr <= 1) return 1;
        if (nr == 2) return 2;
        return await fib(nr - 1) + await fib(nr - 1);
    }

    public async Task<long> fibonacci_MemoPure(long nr)
    {
        if (nr <= 1) return 1;
        if (nr == 2) return 2;
        await Task.Delay(1000);
        return await fibonacci(nr - 1) + await fibonacci(nr - 1);

    }
}
