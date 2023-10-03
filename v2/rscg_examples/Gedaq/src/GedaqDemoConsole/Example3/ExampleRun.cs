using GedaqDemoConsole.Model;
using Npgsql;

namespace GedaqDemoConsole.Example3
{
    internal class ExampleRun
    {
        public static async Task Run()
        {
            var repository = new PersonRepository3();
            var queryRepository = (IQueryPersonRepository)repository;
            var commandRepository = (ICommandPersonRepository)repository;

            await using (var connection = new NpgsqlConnection("you connection string"))
            {
                IEnumerable<Person> list = queryRepository.GetPersons(connection: connection);
                IAsyncEnumerable<Person> listAsync = queryRepository.GetPersonsAsync(connection: connection);

                commandRepository.AddPersons(connection: connection, id: 1, firstname: "name1");
                await commandRepository.AddPersonsAsync(connection: connection, id: 2, firstname: "name2");
            }
        }
    }
}