

namespace NullInterface;

[ShadowWriter.NullObject]
public partial class Department : IDepartment
{
}

public interface IDepartment
{
    public string Name { get; set; }
}