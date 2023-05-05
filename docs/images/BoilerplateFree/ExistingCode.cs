[AutoGenerateInterface]                        
public partial class Person: IPerson
{
    public void Foo()
    {
        Console.WriteLine("Foo");
    }
    //dummy
    private string s { get; set; }
    public int ID { get; set; }
    public string Name { get; set; }
    //dummy
    public static string NewID { get; set; }
}