using Injectio.Attributes;

namespace InjectioDemo;

[RegisterScoped]
internal class Database : IDatabase
{
    private readonly DatabaseCon con;

    public Database(DatabaseCon con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open {con.Connection}");
    }

}

