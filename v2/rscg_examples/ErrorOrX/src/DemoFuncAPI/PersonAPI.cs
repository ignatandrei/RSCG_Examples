using ErrorOr;

namespace DemoFuncAPI;

public static class PersonAPI
{

    [Get("/todos/{id}")]
    public static ErrorOr<Person> GetById(int id)
    {
        try
        {
            return GetPersonById(id).OrNotFound();
        }
        catch (Exception ex)
        {
            return Error.Failure(description: ex.Message);
        }
    }

    static Person? GetPersonById(int id) =>
    
        id switch
        {
            1 => new Person(1, "John Doe"),
            2 => throw new Exception("person does not exists"),
            _ => null
        };
    
}

public record Person(int Id, string Name)   ;
