using System;
using Cloneable;
namespace MakeClone
{
    [Cloneable]
    public partial class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Department Department { get; set; }
    }
    //[Cloneable]
    public class Department
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
    class Program
    {
        
        static void Main(string[] args)
        {
            var IT = new Department();
            IT.Name = "IT";
            var e = new Employee();
            e.ID = 10;
            e.Name = "Andrei Ignat";
            e.Department = IT;

            var clone = e.Clone();
            Console.WriteLine(clone.Name);
            Console.WriteLine(clone.Department.Name);

        }
    }
}
