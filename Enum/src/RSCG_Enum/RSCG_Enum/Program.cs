using AOPMethodsCommon;
using System;

namespace RSCG_Enum
{
    [AutoEnum(template = EnumMethod.GenerateExtensionCode)]
    public enum MathematicalOperation
    {
        None=0,
        Add=1,
        Multiplication=2
    }
    class Program
    {
        static void Main(string[] args)
        {
            var fromInt = enumMathematicalOperation.ParseExactMathematicalOperation(1);
            var fromString = enumMathematicalOperation.ParseExactMathematicalOperation("add");
            Console.WriteLine(fromInt + "-"+fromString);
        }
    }
}
