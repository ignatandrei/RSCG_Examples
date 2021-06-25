using System;

namespace Rendering
{
    public partial class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Department Department { get; set; }
    }
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

            var render = EmployeeRendering.Render(e);
            Console.WriteLine(render);


        }
    }
}
