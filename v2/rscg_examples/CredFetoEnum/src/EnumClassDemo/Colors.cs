using System.ComponentModel;

namespace EnumClassDemo;

public enum Colors
{
    [Description("This should be never seen")]
    None =0,
    Red,
    Green,
    Blue,
}
