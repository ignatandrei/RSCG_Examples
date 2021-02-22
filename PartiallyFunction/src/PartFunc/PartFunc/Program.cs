using System;

namespace PartFunc
{
    public class Accounting
    {
        public static float Discount( float discount, float price)
        {
            var val= price * (1- discount);
            return val;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            
            var disc10Percent = Partially.Apply(Accounting.Discount, 1/10f);
            Console.WriteLine(disc10Percent(disc10Percent(100)));
            
        }
    }
}
