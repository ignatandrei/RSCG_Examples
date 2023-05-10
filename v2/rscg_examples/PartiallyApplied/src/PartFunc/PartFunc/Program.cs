using System;

namespace PartFunc;
class Program
{
    static void Main(string[] args)
    {
        
        var disc10Percent = Partially.Apply(Accounting.Discount, 1/10f);
        Console.WriteLine(disc10Percent(disc10Percent(100)));
        
    }
}
