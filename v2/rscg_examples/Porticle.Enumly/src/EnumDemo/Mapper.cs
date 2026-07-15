using Porticle.Enumly;
namespace EnumDemo;

[EnumlyClass]
public static partial class Mapper
{
    [EnumlyMap(IgnoreNullSource = true)]
    public static partial TypesCar ToTypesCar(CarTypes value);

    [EnumlyMap(IgnoreNullSource = true)]
    public static partial CarTypes ToCarTypes(TypesCar value);
}