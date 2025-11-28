using TeCLI.Attributes;

namespace ConsoleDemo;

[Command("MakeSum", Description = "Makes sum")]
public  class CmdForSum
{
    [Action("sum")]
    public void MySum([Argument(Description = "x")] int x, [Argument(Description = "y")] int y)
    {
        Console.WriteLine($"Hello, {x+y}!");
    }
}
