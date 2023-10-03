using GedaqDemoConsole.Model;
using Npgsql;

namespace GedaqDemoConsole.Example2
{
    internal class ExampleRun
    {
        public static async Task Run()
        {
            var repository = new PersonRepository2();

            await using (var connection = new NpgsqlConnection("you connection string"))
            {
                IEnumerable<IEnumerable<Person>> list = repository.BatchPersons(
                    connection: connection, 
                    person_idBatch1: 1, 
                    person_idBatch2: 2
                    );

                IAsyncEnumerable<IAsyncEnumerable<Person>> listAsync = repository.BatchPersonsAsync(
                    connection: connection, 
                    person_idBatch1: 1, 
                    person_idBatch2: 2
                    );
            }
        }
    }
}