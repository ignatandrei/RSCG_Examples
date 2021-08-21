[Int] public partial record DepartmentId;
public Employee GetFromId(int idDepartment, int idEmployee)
{
    
    return new Employee()
    {
        ID = idEmployee,
        DepartmentId = idDepartment,
        Name = "Andrei " + idEmployee

    };
}
public Employee GetFromId(DepartmentId departmentId,  EmployeeId employeeId)
{
    return GetFromId(departmentId, employeeId);
}