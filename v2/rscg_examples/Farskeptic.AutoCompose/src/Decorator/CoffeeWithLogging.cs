
using AutoCompose.Generator.Attributes;

namespace Decorator;

[AutoCompose(typeof(ICoffee), nameof(_cof))]
internal partial class CoffeeWithLogging : ICoffee
{
    protected ICoffee _cof;

    public CoffeeWithLogging(ICoffee cof)
    {
        this._cof = cof;
    }
    public string[] GetIngredients()
    {
        Console.WriteLine("CoffeeWithLogging.GetIngredients");
        return this._cof.GetIngredients();
    }
}