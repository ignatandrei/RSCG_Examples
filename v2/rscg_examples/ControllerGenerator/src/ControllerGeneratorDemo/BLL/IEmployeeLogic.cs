using ControllerGenerator.Abstraction.Contracts;

namespace BLL;
public interface IEmployeeLogic: IAutoGenerateController
{
    Task<Employee> Add(string name);
    Task<Employee> GetByName(string name);
}