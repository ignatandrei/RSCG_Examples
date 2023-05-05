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

        [MapWith("Employees",typeof(ResolverLength))]
        public int EmployeesNr { get; set; }

    }
    public class ResolverLength
    {
        public int Resolve(List<string> input)
        {
            return ((input?.Count) ?? 0);
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            var dep = new Department();
            dep.Name = "IT";
            dep.ID = 1;
            dep.Employees = new List<string>();
            dep.Employees.Add("Andrei");
            var dto = dep.MapToDepartmentDTO();
            Console.WriteLine(dto.Name+"=>"+ dto.EmployeesNr);
        }
    }
}
