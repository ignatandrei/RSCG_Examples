
using Clap.Net;

namespace ConsoleDemo;

[Command(Name = "MakeSum")]
public  partial class CmdForSum
{
    [Arg(Short = 'f', Long = "firstarg", Help = "first  argument")]
    public int  x { get; set; } = 0;

    [Arg(Short = 's', Long = "secondarg", Help = "second  argument")]
    public int  y { get; set; } = 0;

    public void MySum()
    {
        Console.WriteLine($"Hello, {x+y}!");
    }
}
