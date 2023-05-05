using System.Collections.Generic;
using System.Linq;
using System.Text;
using Rendering;

static partial class EmployeeRendering
{
    public static string Render(params Employee[] employees)
    {
        var sb = new StringBuilder();
        int i= 0;
WriteText(@"Number Employees: ");
WriteValue(employees?.Length);
WriteText(@"
");
foreach (var emp in employees) { 
    i++;
   WriteText(@"    ");
WriteValue(i);
WriteText(@". ");
WriteValue(emp.Name);
WriteText(@"  it is in ");
WriteValue(emp.Department?.Name);
WriteText(@"
");
}
        return sb.ToString();

        void WriteText(string value) => sb.Append(value);
        void WriteValue(object value) => sb.Append(value);
    }
}