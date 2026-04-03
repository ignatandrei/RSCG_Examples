
using TaggedEnum;

namespace EnumDemo;

[Tagged]
public enum CarTypes 
{
    [Data("this is none")]
    None,
    [Data("this is dacia")]
    Dacia,
    [Data("this is tesla")]

    Tesla,
    [Data("this is bwm")]

    BMW,
    [Data("this is mercedes")]

    Mercedes,
}
