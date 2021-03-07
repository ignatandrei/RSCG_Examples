public static partial class Partially
{
       public static Func<float, float> Apply(Func<float, float, float> method, float discount) =>
              new((price) => method(discount, price));
}