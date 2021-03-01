using System;

namespace DP_Decorator
{
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
        public const string TemplateCoffeeDecorator = @"
{{~for method in methods~}}
{{method.is_async?""async "":""""}}{{method.return_type}} {{interface}}.{{method.name}}({{method.arguments_definition}})
{
{{~if method.is_async~}}
    {{~for reference in references~}}
    var temp{{for.index}} = (({{interface}})this.{{reference}}).{{method.name}}({{method.call_arguments}}).ConfigureAwait(false);
    {{~end~}}
    {{~for reference in references~}}
    {{for.last && method.return_expected ? ""return "" : """"}}await temp{{for.index}};
    {{~end~}}
{{~else~}}
    {{~for reference in references~}}
    {{for.last && method.return_expected ? ""return "" : """"}}(({{interface}})this.{{reference}}).{{method.name}}({{method.call_arguments}});
    {{~end~}}
{{~end~}}
}

{{~end~}}
{{~for property in properties~}}
{{property.type}} {{interface}}.{{property.name}}
{
{{~if property.have_getter~}}
   get
   {
        {{ if property.name == 'Description'}}
            var name = this.GetType().Name.Replace(""Decorator"","""");
            return (({{interface}})this.{{references[0]}}).{{property.name}} + "" with "" + name;
        {{else if property.name == 'Price'}}
            return (({{interface}})this.{{references[0]}}).{{property.name}} + DecoratorPrice;
        {{else}}
          return (({{interface}})this.{{references[0]}}).{{property.name}};
        {{end}}
   }
{{~end~}}
{{~if property.have_setter~}}
   set
   {
      {{~for reference in references~}}
      (({{interface}})this.{{reference}}).{{property.name}} = value;
      {{~end~}}
   }
{{~end~}}
}

{{~end~}}
{{~for indexer in indexers~}}
{{indexer.type}} {{interface}}.{{indexer.name}}[{{indexer.parameters_definition}}]
{
{{~if indexer.have_getter~}}
   get
   {
      return (({{interface}})this.{{references[0]}})[{{indexer.call_parameters}}];
   }
{{~end~}}
{{~if indexer.have_setter~}}
   set
   {
      {{~for reference in references~}}
      (({{interface}})this.{{reference}})[{{indexer.call_parameters}}] = value;
      {{~end~}}
   }
{{~end~}}
}

{{~end~}}
{{~for event in events~}}
event {{event.type}} {{interface}}.{{event.name}}
{
   add
   {
      {{~for reference in references~}}
      (({{interface}})this.{{reference}}).{{event.name}} += value;
      {{~end~}}
   }
   remove
   {
      {{~for reference in references~}}
      (({{interface}})this.{{reference}}).{{event.name}} -= value;
      {{~end~}}
   }
}

{{~end~}}
";
    }
    public class EspressoCoffee : ICoffee
    {
        public EspressoCoffee()
        {
            Price = 2;
            Description = "Espresson";
        }
        public int Price { get; set; }
        public string Description { get; set; }
    }


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
    class Program
    {

        static void Main(string[] args)
        {
            SimpleCoffee s = new SimpleCoffee();
            Console.WriteLine($"{s.Description} with Price {s.Price}");
            ICoffee withMilk = new MilkDecorator(s);
            Console.WriteLine($"{withMilk.Description} Price {withMilk.Price}");
            ICoffee withMilkAndChoco = new ChocoDecorator(withMilk);
            Console.WriteLine($"{withMilkAndChoco.Description} Price {withMilkAndChoco.Price}");

        }

    }
}
