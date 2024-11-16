using Immediate.Apis.Shared;
using Immediate.Handlers.Shared;
using Microsoft.AspNetCore.Http.HttpResults;
namespace APIDemo;

    [Handler]
    [MapGet("/users")]
    public static partial class PersonAPI
    {
        public record Query;

        private static async ValueTask<Person[]> HandleAsync(
            Query _,
            CancellationToken token)
        {
            await Task.Delay(1000);
            return new[] { new Person { FirstName = "Ignat", LastName = "Andrei" } };
         }
    }
    
    
