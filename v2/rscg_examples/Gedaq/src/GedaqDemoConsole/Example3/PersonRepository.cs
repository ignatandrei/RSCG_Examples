using Gedaq.Common.Enums;
using GedaqDemoConsole.Model;

namespace GedaqDemoConsole.Example3
{
    public partial interface IPersonRepository : IQueryPersonRepository, ICommandPersonRepository
    {
    }

    public partial interface IQueryPersonRepository
    {
    }

    public partial interface ICommandPersonRepository
    {
    }

    public partial class PersonRepository3 : IPersonRepository
    {
        [Gedaq.Npgsql.Attributes.Query(
            query: @"
SELECT 
    p.id,
    p.firstname,
~StartInner::Address:Id~
    a.id,
    a.street,
    a.city
~EndInner::Address~
FROM person p
LEFT JOIN address a ON a.id = p.address_id
",
            methodName: "GetPersons",
            queryMapType: typeof(Person),
            methodType: MethodType.Sync | MethodType.Async,
            accessModifier: AccessModifier.Public,
            asPartInterface: typeof(IQueryPersonRepository)
            )
            ]
        private void GetPersonsConfig()
        {
        }

        [Gedaq.Npgsql.Attributes.Query(
            query: @"
INSERT INTO person(
	id,
    firstname
)
VALUES (
    $1,
    $2
)
",
            methodName: "AddPersons",
            queryMapType: typeof(Person),
            methodType: MethodType.Sync | MethodType.Async,
            accessModifier: AccessModifier.Public,
            queryType: QueryType.NonQuery,
            asPartInterface: typeof(ICommandPersonRepository)
            ),
            Gedaq.Npgsql.Attributes.Parametr(typeof(int), position: 1, methodParametrName: "id"),
            Gedaq.Npgsql.Attributes.Parametr(typeof(string), position: 2, methodParametrName: "firstname")
            ]
        private void AddPersonsConfig()
        {
        }
    }
}