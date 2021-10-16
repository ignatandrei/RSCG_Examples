using AOPMethodsCommon;
using System;

namespace AOPMarkerCI
{
    [AutoMethods(template = TemplateMethod.CustomTemplateFile, MethodPrefix = "auto", CustomTemplateFileName = "../AutoMethod.txt")]
    partial class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Run the autoci file");
            var underTest = new UnderTest();
            int i = underTest.Method1();
            Console.WriteLine($"result:{i}");
        }
    }
}
