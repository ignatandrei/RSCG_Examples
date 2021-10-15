using System;

namespace AOPMarkerCI
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            int i = Method1();
            Console.WriteLine($"result:{i}");
        }
        static int Method1()
        {
            var ret = Method2(DateTime.Now);
            return ret % 2 == 0 ? 1 : 0;
        }

        static int Method2(DateTime now)
        {
            return now.Second;
        }
    }
}
