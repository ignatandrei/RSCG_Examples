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