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