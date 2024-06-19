using TableStorage;
namespace test;
[TableContext]
public partial class DatabaseContext
{
    public TableSet<Employee>? Employees { get; set; }
}


[TableSet]
[TableSetProperty(typeof(bool), "Enabled")]
[TableSetProperty(typeof(string), "Name")]
public partial class Employee
{

}
