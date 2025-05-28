using ReflectionIT.ComparisonOperatorsGenerator.Attributes;


namespace ComparisonDemo;
//https://github.com/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator
[ComparisonOperators]
internal partial class Room : IComparable<Room>
{

    public int Height { get; set; }
    public int Width { get; set; }
    public int Length { get; set; }
    public int Volume => Height * Width * Length;

    public int CompareTo(Room? other)
    {
        return other is null ? 1 : Volume.CompareTo(other.Volume);
    }
}
