using NullInterface;

Console.WriteLine("Hello, World!");

Console.WriteLine("Hello, World!");
Department department = Department.Instance;
department.Name = "IT";
IEmployee employee = Employee.Instance;
employee.FirstName = "Andrei";
//employee.Department = department;
Console.WriteLine(employee.FirstName);
Console.WriteLine(employee.Department.Name);
Console.WriteLine(employee.GetFullNameAndDepartment(" - "));
