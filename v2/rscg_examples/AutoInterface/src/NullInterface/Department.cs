

using AutoInterfaceAttributes;

namespace NullInterface;

[AutoInterface]
public class Department : IDepartment
{
    public string Name { get; set; } = string.Empty;
}
