using Comptime;
using System;
using System.Collections.Generic;
using System.Text;

namespace ComptimeDemo;

public static partial class Math
{
    [Comptime]
    public static int SumList(IReadOnlyList<int> numbers)
    {
        return numbers.Sum();
    }
    [Comptime]
    public static long Factorial(int n)
    {
        if (n <= 1) return 1;
        long result = 1;
        for (int i = 2; i <= n; i++)
            result *= i;
        return result;
    }
}
