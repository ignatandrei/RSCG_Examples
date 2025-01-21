namespace NullInterface;

using InterfaceToNullObject;

[ToNullObject]
public interface IDepartment
{
    public string Name { get; set; }
}
