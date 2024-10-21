using Microsoft.AspNetCore.Http.HttpResults;
namespace APIDemo;

public class PersonAPI : IEndpointRouteHandlerBuilder
{
    public static void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        var grp = endpoints.MapGroup("/api/Person");
        grp.MapGet("", GetFromId);
        grp.MapGet("{id:int}", GetFromId);
        //todo: add more routes
    }
    public static async Task<Person[]> GetAll()
    {       
        await Task.Delay(1000);
        return new[] { new Person { FirstName = "Ignat", LastName = "Andrei" } };
    }

    public static async Task<Results<Ok<Person>,NotFound<string>>> GetFromId(int id)
    {
        await Task.Delay(1000);
        if (id == 1)
        {
            return TypedResults.Ok<Person>(new Person { FirstName = "Ignat", LastName = "Andrei" });
        }
        return TypedResults.NotFound<string>("Person not found");
    }


}
