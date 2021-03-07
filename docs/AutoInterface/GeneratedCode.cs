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