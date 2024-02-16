
namespace InjectDemo;

internal class DatabaseCon: IDatabase
{
    public string? Connection { get; set; }
    public void Open()
    {
        Console.WriteLine("open" + Connection);
    }
}

