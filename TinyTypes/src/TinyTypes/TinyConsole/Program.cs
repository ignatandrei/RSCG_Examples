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
            e.GetFromId(10, 34);
            e.GetFromId(new DepartmentId(34), new EmployeeId(10));
        }
    }
}
