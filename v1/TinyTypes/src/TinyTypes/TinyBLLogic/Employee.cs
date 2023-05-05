using AD.BaseTypes;
using System;

namespace TinyBLLogic
{
    [Int] public partial record EmployeeId;
    [Int] public partial record DepartmentId;


    public class Employee
    {

        public int ID { get; set; }
        public string Name { get; set; }
        public int? DepartmentId { get; set; }
    }
    public class EmployeeRepository
    {
        public Employee GetFromId(DepartmentId departmentId,  EmployeeId employeeId)
        {
            return GetFromId(departmentId, employeeId);
        }    
        public Employee GetFromId(int idDepartment, int idEmployee)
        {
            
            return new Employee()
            {
                ID = idEmployee,
                DepartmentId = idDepartment,
                Name = "Andrei " + idEmployee

            };
        }
    }
}
