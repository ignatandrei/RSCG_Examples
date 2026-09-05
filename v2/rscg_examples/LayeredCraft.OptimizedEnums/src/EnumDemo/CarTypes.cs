using LayeredCraft.OptimizedEnums;

namespace EnumDemo;
public sealed partial class CarTypes : OptimizedEnum<CarTypes, int>
{
    public static readonly CarTypes None = new(0, nameof(None));
    public static readonly CarTypes Dacia = new(1, nameof(Dacia));
    public static readonly CarTypes Tesla = new(2, nameof(Tesla));
    public static readonly CarTypes BMW = new(3, nameof(BMW));
    public static readonly CarTypes Mercedes = new(4, nameof(Mercedes));
    private CarTypes(int value, string name) : base(value, name) { }
}