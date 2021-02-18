using GeneratedMapper.Attributes;
using System;
using System.Collections.Generic;

namespace DTOMapper
{

    public class Department
    {
        public int ID { get; set; }
        public string Name { get; set; }
        
        public List<string> Employees { get; set; }
    }

    [IgnoreInTarget("Employees")]
    [MapFrom(typeof(Department))]
    public class DepartmentDTO
    {
        public int ID { get; set; }
        public string Name{get; set;}

        [MapWith(typeof(Resolver))]
        public int EmployeesNr { get; set; }

    }
    public class Resolver
    {
        public int Resolve(object input)
        {
            return 10;
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
