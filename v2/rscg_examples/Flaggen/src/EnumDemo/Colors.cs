namespace EnumDemo;

[Flags]
public enum Colors
{
    None = 0,
       Red = 1 << 0,
    Green = 1 << 1,
    Blue = 1 << 2,
    Yellow = 1 << 3,
    Black = 1 << 4,
    White = 1 << 5
}