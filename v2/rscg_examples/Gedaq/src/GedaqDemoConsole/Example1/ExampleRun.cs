using GedaqDemoConsole.Model;
using Npgsql;

namespace GedaqDemoConsole.Example1
{
    internal class ExampleRun
    {
        public static async Task Run()
        {
            var repository = new PersonRepository();

            await using (var connection = new NpgsqlConnection("you connection string"))
            {
                IEnumerable<Person> list = repository.GetPerson(
                    connection: connection, 
                    person_id: 1
                    );

                IAsyncEnumerable<Person> listAsync = repository.GetPersonAsync(
                    connection: connection, 
                    person_id: 1
                    );
            }
        }
    }
}