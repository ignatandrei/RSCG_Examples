using AOPMethodsCommon;
using System;

namespace AOPMarkerCI
{
    [AutoMethods(template = TemplateMethod.CustomTemplateFile, MethodPrefix = "auto", CustomTemplateFileName = "../AutoMethod.txt")]
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Run the autoci file");
            int i = Method1();
            Console.WriteLine($"result:{i}");
        }
        [AOPMarkerMethod]
        static int Method1()
        {
            var ret = Method2(DateTime.Now);
            return ret % 2 == 0 ? 1 : 0;
        }
        [AOPMarkerMethod]
        static int Method2(DateTime now)
        {
            return now.Second;
        }
    }
}
