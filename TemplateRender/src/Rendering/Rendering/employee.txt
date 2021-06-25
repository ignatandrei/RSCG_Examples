{%
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
-%}
Number Employees: {% employees?.Length %}
    {%~ foreach (var emp in employees) { 
    i++;
    ~%}
    {% i %}. {% emp.Name %}  it is in {% emp.Department?.Name %}
    {%~ } ~%}
{%
        return sb.ToString();

        void WriteText(string value) => sb.Append(value);
        void WriteValue(object value) => sb.Append(value);
    }
}
~%}