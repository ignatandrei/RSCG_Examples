
using Microsoft.Data.SqlClient;

namespace GedaqDemoConsole;

public partial class GetData
{
    string connectionString = "asdasd";

    [Gedaq.SqlClient.Attributes.Query(
        @"
SELECT 
    p.id,
    p.firstname,
FROM person p
"
    ,
        "GetPersons",
        typeof(Person)
        ),
        ]
    public Person[] GetPersons()
    {
        using (var sql = new SqlConnection(connectionString))
        {
            sql.Open();

            return GetPersons(sql, 48).ToArray();//using generated method
        }
    }
}
