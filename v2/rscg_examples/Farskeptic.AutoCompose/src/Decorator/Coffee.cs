namespace Decorator;

internal class Coffee : ICoffee
{
    public string? Name { get; set; }
    public async Task<bool> Prepare()
    {
        Console.WriteLine("start prepare coffee");
        await Task.Delay(1000);
        Console.WriteLine("finish prepare coffee");
        return true;
    }
    public string[] GetIngredients() => new[] { "water", "coffee" };

}

