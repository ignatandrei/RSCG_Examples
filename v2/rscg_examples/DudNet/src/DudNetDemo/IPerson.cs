namespace DudNetDemo;

public interface IPerson
{
    string? FirstName { get; set; }
    string? LastName { get; set; }

    string FullName();
}