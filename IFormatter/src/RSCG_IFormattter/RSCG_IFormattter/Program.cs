using AOPMethodsCommon;
using System;

namespace RSCG_IFormattter
{
    //adapted from https://haacked.com/archive/2009/01/14/named-formats-redux.aspx/

    [AutoMethods(CustomTemplateFileName = "CreateFormattable.txt", template = TemplateMethod.CustomTemplateFile)]
    partial class Department
    {
        public int ID { get; set; }
        public string Name { get; set; }

    }
    [AutoMethods(CustomTemplateFileName = "CreateFormattable.txt", template = TemplateMethod.CustomTemplateFile)]
    partial class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public Department dep { get; set; }

    }
    class Program
    {
        static void Main(string[] args)
        {
            var e = new Employee();
            e.ID = 1;
            e.Name = "Andrei";
            e.dep = new Department();
            e.dep.Name = "IT";

            Console.WriteLine(e.ToString("for employee with id = {id} the name is {name} and department is {dep?.Name}", null));

            e.dep = null;

            Console.WriteLine(e.ToString("for employee with id = {id} the name is {name} and department is {dep?.Name}", null));

        }
    }
}
