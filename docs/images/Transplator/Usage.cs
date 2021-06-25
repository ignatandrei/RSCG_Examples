var IT = new Department();
IT.Name = "IT";
var e = new Employee();
e.ID = 10;
e.Name = "Andrei Ignat";
e.Department = IT;
var render = EmployeeRendering.Render(e);
Console.WriteLine(render);