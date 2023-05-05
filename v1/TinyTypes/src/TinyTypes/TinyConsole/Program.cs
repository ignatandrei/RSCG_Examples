using System;
using TinyBLLogic;

namespace TinyConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var e = new EmployeeRepository();
            //what is more clear ? This 
            e.GetFromId(10, 34);
            //or this ? 
            e.GetFromId(new DepartmentId(34), new EmployeeId(10));
        }
    }
}
