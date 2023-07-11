namespace mapperlyDemo;

public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}
