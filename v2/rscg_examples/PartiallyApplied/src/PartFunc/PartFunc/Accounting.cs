namespace PartFunc;

public class Accounting
{
    public static float Discount( float discount, float price)
    {
        var val= price * (1- discount);
        return val;
    }
}
