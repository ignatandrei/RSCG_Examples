using NullInterface;

Console.WriteLine("Hello, World!");

Console.WriteLine("Hello, World!");
IDepartment department = new Department();
department.Name = "IT";
IEmployee employee = new Employee();
employee.FirstName = "Andrei";
employee.Department = department;
Console.WriteLine(employee.FirstName);
Console.WriteLine(employee.Department.Name);
Console.WriteLine(employee.GetFullNameAndDepartment(" - "));
