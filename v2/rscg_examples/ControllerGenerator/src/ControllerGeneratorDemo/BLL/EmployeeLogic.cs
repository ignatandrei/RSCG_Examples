namespace BLL;
public class EmployeeLogic : IEmployeeLogic
{
    public async Task<Employee> Add(string name)
    {
        await Task.Delay(1000);
        return new Employee(name);
    }
    public async Task<Employee> GetByName(string name)
    {
        await Task.Delay(1000);
        return new Employee(name);
    }

}