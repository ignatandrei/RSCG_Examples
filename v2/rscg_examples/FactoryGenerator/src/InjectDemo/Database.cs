using FactoryGenerator.Attributes;

namespace InjectDemo;

[Inject, Scoped]
public partial class Database : IDatabase
{
    private readonly DatabaseCon con;

    public Database(DatabaseCon con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open {con.Connection}");
        this.con.Open();
    }

}

