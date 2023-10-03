using Gedaq.Common.Enums;
using GedaqDemoConsole.Model;

namespace GedaqDemoConsole.Example2
{
    public partial class PersonRepository2
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
WHERE
    p.id = $1
",
            methodName: "GetPersonById",
            queryMapType: typeof(Person),
            methodType: MethodType.Sync | MethodType.Async,
            accessModifier: AccessModifier.Private,
            generate: false
            ),
            Gedaq.Npgsql.Attributes.Parametr(typeof(int), position: 1, methodParametrName: "person_id")
            ]
        private void GetPersonConfig()
        {
        }

        [Gedaq.Npgsql.Attributes.QueryBatch(
            batchName: "BatchPersons",
            queryType: QueryType.Read,
            methodType: MethodType.Sync | MethodType.Async
            ),
            Gedaq.Npgsql.Attributes.BatchPart("GetPersonById", 1),
            Gedaq.Npgsql.Attributes.BatchPart("GetPersonById", 2)
            ]
        private void BatchPersonsConfig()
        {
        }
    }
}