public interface ICoffee                                                                                               
{
    public int Price { get; }
    public string Description { get; }
}

public class SimpleCoffee : ICoffee
{
    public SimpleCoffee()
    {
        Price = 3;
        Description = "Simple Coffee";
    }
    public int Price { get; set; }
    public string Description { get; set; }

public partial class MilkDecorator : ICoffee
{
    [BeaKona.AutoInterface(TemplateLanguage = "scriban", TemplateBody = SimpleCoffee.TemplateCoffeeDecorator)]
    private readonly ICoffee coffee;

    public int DecoratorPrice { get; set; } = 1;
    public MilkDecorator(ICoffee coffee)
    {
        this.coffee = coffee;
    }



}

public partial class ChocoDecorator : ICoffee
{
    [BeaKona.AutoInterface(TemplateLanguage = "scriban", TemplateBody = SimpleCoffee.TemplateCoffeeDecorator)]
    private readonly ICoffee coffee;

    public int DecoratorPrice { get; set; } = 2;
    public ChocoDecorator(ICoffee coffee)
    {
        this.coffee = coffee;
    }


}
