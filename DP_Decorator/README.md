# RSGC Name: AutoInterface

Nuget :
    https://www.nuget.org/packages/BeaKona.AutoInterfaceGenerator


link : https://github.com/beakona/AutoInterface 


author :beakona


## What can do

Implement the Design Pattern Decorator. Based on template - you can modify the source code generated

## The code that you start with is 

```

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

    
```

The code that you will use is

```csharp


    SimpleCoffee s = new SimpleCoffee();

    Console.WriteLine(s.Description +" with Price "+ s.Price);

    ICoffee withMilk = new MilkDecorator(s);

    Console.WriteLine(withMilk.Description} +" with Price "+ withMilk.Price);

    ICoffee withMilkAndChoco = new ChocoDecorator(withMilk);

    Console.WriteLine(withMilkAndChoco.Description +" with Price "+ withMilkAndChoco.Price);

```

The code that is generated is
```csharp


    partial class MilkDecorator                                                        

    {

        int ICoffee.Price

        {

            get

            {

    

                    return ((ICoffee)this.coffee).Price + DecoratorPrice;

    

            }

        }

    

        string ICoffee.Description

        {

            get

            {

    

                    var name = this.GetType().Name.Replace("Decorator","");

                    return ((ICoffee)this.coffee).Description + " with " + name;

    

            }

        }

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Decorator" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Decorator</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>