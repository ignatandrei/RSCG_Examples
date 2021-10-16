using AOPMethodsCommon;
using System;
using System.Threading.Tasks;

namespace AOPMarkerCI
{
    class Program
    {

        static async Task Main(string[] args)
        {
            Console.WriteLine("Run the autoci file");
            var underTest = new UnderTest();
            int i = await underTest.Method1();
            Console.WriteLine($"result:{i}");
        }
    }
}
