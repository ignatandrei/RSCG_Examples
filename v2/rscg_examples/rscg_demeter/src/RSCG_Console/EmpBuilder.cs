namespace RSCG_Console;
internal class EmpBuilder
{
    Employee emp=new Employee();
    public Employee BuildEmployee()
    {
        var data = new Employee();
        data.Name = emp.Name;
        data.ID = emp.ID;
        emp=new Employee();
        return data ;
    }
    public EmpBuilder SetName(string name)
    {
        emp.Name = name;
        return this;
    }
    public EmpBuilder SetId(int id)
    {
        emp.ID = id;
        return this;
    }
}
