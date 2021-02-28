using System;

namespace DP_Decorator
{
    class Program
    {
        public interface ICoffee
        {
            public int Price { get; set; }
            public string Description { get; set; }
        }

        public class SimpleCoffee : ICoffee
        {
            public SimpleCoffee()
            {
                Price = 1;
                Description = "Simple";
            }
            public int Price { get ; set ; }
            public string Description { get ; set ; }
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


        public class MilkDecorator: ICoffee
        {
            private readonly ICoffee coffee;

            public MilkDecorator(ICoffee coffee)
            {
                this.coffee = coffee;
            }


        }
        public class MilkDecorator : ICoffee
        {
            private readonly ICoffee coffee;

            public MilkDecorator(ICoffee coffee)
            {
                this.coffee = coffee;
            }


        }
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
