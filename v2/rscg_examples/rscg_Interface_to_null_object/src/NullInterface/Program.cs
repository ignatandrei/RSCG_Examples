using NullInterface;

Console.WriteLine("Hello, World!");

Console.WriteLine("Hello, World!");
IDepartment department = new Department_null();
department.Name = "IT";
IEmployee employee = new Employee_null();
employee.FirstName = "Andrei";
employee.Department = department;
Console.WriteLine(employee.FirstName);
Console.WriteLine(employee.Department.Name);