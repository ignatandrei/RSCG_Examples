namespace RazorBladeDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return FirstName + " "+LastName;
    }
}
