
using FactoryGenerator.Attributes;

namespace InjectDemo;

[Inject,Scoped]
public partial class DatabaseCon: IDatabase
{
    public string? Connection { get; set; }
    public void Open()
    {
        Console.WriteLine("open" + Connection);
    }
}

