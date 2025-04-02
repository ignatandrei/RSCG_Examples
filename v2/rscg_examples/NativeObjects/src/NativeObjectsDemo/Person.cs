namespace NativeObjectsDemo;
[NativeObject]
public interface IPerson
{
    public int CalculateAge();
}
class Person : IPerson
{
    public DateTime DateOfBirth { get; set; }

    public int CalculateAge()
    {

        return (int)DateTime.Now.Subtract(DateOfBirth).TotalDays / 365;
    }
}
