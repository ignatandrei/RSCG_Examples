namespace RSCG_DemoObjects;

public class Person
{
    static int nrPersons = 0;
    public Person()
    {
        nrPersons++;
    }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName() => $"{FirstName} {LastName}";

    public string TestFullNameWithArguments(string start, string separator, string end, int repeat)
    {
        var str=$"{start}{FirstName}{separator}{LastName}{end}";
        var ret = "";
        foreach (var item in Enumerable.Range(0, repeat).ToArray())
        {
            ret += str;
        }
        return ret;
    }
    public string Test()
    {
        return FullName();
    }

    public static int PersonsLoaded()
    {
        return nrPersons;
    }
    public static int ShowRandomPersonNumber(int min)
    {
        return Random.Shared.Next(min, nrPersons);
    }
}
