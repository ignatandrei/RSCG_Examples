namespace MatryoshkiDemo;

public interface IPerson
{
    string? FirstName { get; set; }
    int ID { get; set; }
    string? LastName { get; set; }

    string FullName();
}