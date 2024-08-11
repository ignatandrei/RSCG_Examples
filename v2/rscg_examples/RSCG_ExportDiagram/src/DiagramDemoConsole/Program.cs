using Person;

internal class Program
{
    private static void Main(string[] args)
    {
        PersonData person = new ();
        person.Name = "Andrei Ignat";
        Console.WriteLine(person.Name);
    }
}