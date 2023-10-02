using Gedaq.Common.Enums;
using GedaqDemoConsole.Model;

namespace GedaqDemoConsole.Example1
{
    public partial class PersonRepository
    {
        [Gedaq.Npgsql.Attributes.Query(
            query: @"
SELECT 
    p.id,
    p.firstname,
FROM person p
WHERE
    p.id = $1
",
            methodName: "GetPerson",
            queryMapType: typeof(Person),
            methodType: MethodType.Sync | MethodType.Async
            ),
            Gedaq.Npgsql.Attributes.Parametr(typeof(int), position: 1, methodParametrName: "person_id")
            ]
        private void GetPersonConfig()
        {
        }
    }
}