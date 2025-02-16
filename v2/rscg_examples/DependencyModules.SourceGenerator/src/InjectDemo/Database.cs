using DependencyModules.Runtime.Attributes;

namespace InjectDemo;
[SingletonService(ServiceType = typeof(Database))]
partial class Database : IDatabase
{
    private readonly IDatabase con;

    public Database(IDatabase con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open from database");
        con.Open();
    }

}

