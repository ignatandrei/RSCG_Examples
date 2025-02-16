
using DependencyModules.Runtime.Attributes;

namespace InjectDemo;
[SingletonService]
public partial class DatabaseCon:IDatabase
{
    public string? Connection { get; set; }
    public void Open()
    {
        Console.WriteLine("open from database con" );
    }
}

