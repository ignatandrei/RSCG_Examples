﻿using Gedaq.Common.Enums;
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