namespace RSCG_Console;
internal class Department
{
    public string Name { get; set; } = string.Empty;
    public List<Employee> Employees{ get; set; } = [];

    public List<string> EmployeeNames { get; set; }= [];

    public int GetEmployees()
    {
        return Employees.Count;
    }
}
