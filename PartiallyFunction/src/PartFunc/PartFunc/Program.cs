using System;

namespace PartFunc
{
    public class Operations
    {
        public static int Add(int x, int y)
        {
            return x + y;
        }
        public static  int Multiply(int x, int y)
        {
            return x * y;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            var add1 = Partially.Apply(Operations.Add, 1);
            var m2 = Partially.Apply(Operations.Multiply, 2);
            Console.WriteLine(m2(add1(10)));
            Console.WriteLine(add1(m2(10)));
        }
    }
}
