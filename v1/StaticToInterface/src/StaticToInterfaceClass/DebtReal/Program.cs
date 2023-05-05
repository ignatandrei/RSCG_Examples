using BL;
using System;
using System.Threading.Tasks;

namespace DebtReal
{
    class Program
    {
        async static Task Main(string[] args)
        {
            var dateStatic1 = (new Helpers().FromStaticDate());//static
            var dateStatic2 = recISystem_DateTime.MakeNew();//static
            var dateVar3 = new clsISystem_DateTime(); //variable = real 
            await Task.Delay(10 * 1000);
            Console.WriteLine(dateStatic1.Now.Second);
            Console.WriteLine(dateStatic2.Now.Second);
            Console.WriteLine(dateVar3.Now.Second);
            var debt = new DebtDI(dateVar3);
        }
    }
}
