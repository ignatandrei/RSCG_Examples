var e = new Employee();
e.ID = 1;
e.Name = "Andrei";
e.dep = new Department();
e.dep.Name = "IT";

Console.WriteLine(e.ToString("for employee with id = {id} the name is {name} and department is {dep?.Name}", null)); 

e.dep = null;

Console.WriteLine(e.ToString("for employee with id = {id} the name is {name} and department is {dep?.Name}", null));
