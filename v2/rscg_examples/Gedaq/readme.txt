<h1 align="center">
  <a>Gedaq</a>
</h1>
<h1 align="center">
  <a href="https://discord.gg/xsR5EYU4ZM"><img height="30px" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"></img></a>
</h1>
<h3 align="center">

  [![Nuget](https://img.shields.io/nuget/v/Gedaq?logo=Gedaq)](https://www.nuget.org/packages/Gedaq/)
  [![Downloads](https://img.shields.io/nuget/dt/Gedaq.svg)](https://www.nuget.org/packages/Gedaq/)
  [![Stars](https://img.shields.io/github/stars/SoftStoneDevelop/Gedaq?color=brightgreen)](https://github.com/SoftStoneDevelop/Gedaq/stargazers)
  [License](https://img.shields.io/badge/license-MIT-blue.svg)
</h3>

Generator for obtaining and mapping data from the database.
Generates methods (synchronous and/or asynchronous):
- Creating a Command for a query
- Method of setting parameters in a Command
- Command execution, with data mapping

- Creating a QueryBatch Command
- Setting parameters in a QueryBatch Command
- Get data from a batch Command
- Receiving data from a batch of queries, with data mapping

- Getting data based on a query, with data mapping

There are versions for all of these methods (if possible):
- Query
- NonQuery
- ЕecuteScalar (return type is determined automatically at the generation stage)
<br />
It also generates methods specific to each provider, such as BinaryImport and BinaryExport in PostgreSQL.

Supported databases(see examples and documentation in the relevant DB package):<br />
- [Npgsql](https://github.com/SoftStoneDevelop/Gedaq.Npgsql)
- [DbConnection](https://github.com/SoftStoneDevelop/Gedaq.DbConnection)
- [SqlClient](https://github.com/SoftStoneDevelop/Gedaq.SqlClient)
- [MySqlConnector](https://github.com/SoftStoneDevelop/Gedaq.MySqlConnector)
- [Oracle.ManagedDataAccess.Core](https://github.com/SoftStoneDevelop/Gedaq/issues/6)
<br />

Usage:

For example, we have a Person class:
```C#

public class Person
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }
    
    public Identification Identification { get; set; }
}

public class Identification
{
    public int Id { get; set; }
    public string TypeName { get; set; }
}

```
We just mark anywhere in the code with a special attribute (class, structure, method) that tells the analyzer to generate the code.
Let's mark the Person class itself with an attribute:

```C#

[Query(
            @"
SELECT 
    p.id,
    p.firstname,
~StartInner::Identification:id~
    i.id,
    i.typename,
~EndInner::Identification~
    p.middlename,
    p.lastname
FROM person p
LEFT JOIN identification i ON i.id = p.identification_id
WHERE p.id > $1
",
        "GetAllPerson",
        typeof(Person),
        MethodType.Sync | MethodType.Async
        ),
        Parametr(parametrType: typeof(int), position: 1)
        ]
public class Person
//...

```

Now in the code we can call the ready method:
```C#

var persons = 
        connection
        .GetAllPerson(49999)
        .ToList();
        
var personsAsync = 
        await connection
        .GetAllPersonAsync(49999)
        .ToListAsync();

```

[Comparison](https://github.com/SoftStoneDevelop/Gedaq.Npgsql/blob/main/Src/NpgsqlBenchmark/Benchmarks/CompareDapper.cs) with [Dapper](https://github.com/DapperLib/Dapper) and [DapperAOT](https://github.com/DapperLib/DapperAOT) of getting 50000 Person in a loop(Size is number of loop iterations) from the database:

## .NET 7 Benchmark:
|       Method | Size |       Mean | Ratio | Allocated | Alloc Ratio |
|------------- |----- |-----------:|------:|----------:|------------:|
| **Gedaq.Npgsql** |   **10** |   **445.5 ms** |  **1.00** | **132.09 MB** |        **1.00** |
|       Dapper |   10 |   749.2 ms |  1.68 | 150.41 MB |        1.14 |
|    DapperAOT |   10 |   777.5 ms |  1.75 |  150.4 MB |        1.14 |
|              |      |            |       |           |             |
| **Gedaq.Npgsql** |   **20** |   **901.9 ms** |  **1.00** | **264.17 MB** |        **1.00** |
|       Dapper |   20 | 1,510.0 ms |  1.68 | 300.81 MB |        1.14 |
|    DapperAOT |   20 | 1,505.3 ms |  1.67 | 300.81 MB |        1.14 |
|              |      |            |       |           |             |
| **Gedaq.Npgsql** |   **30** | **1,366.2 ms** |  **1.00** | **396.28 MB** |        **1.00** |
|       Dapper |   30 | 2,276.7 ms |  1.67 | 451.22 MB |        1.14 |
|    DapperAOT |   30 | 2,279.6 ms |  1.67 | 451.22 MB |        1.14 |

But with Gedaq, we can prepare the command in advance.
```C#

var personsCmd = connection.CreateGetAllPersonCommand(prepare: true);
personsCmd.SetGetAllPersonParametrs(49999);
var persons = personsCmd.ExecuteGetAllPersonCommand().ToList();

//or

var personsCmd = await connection.CreateGetAllPersonCommandAsync(prepare: true);
personsCmd.SetGetAllPersonParametrs(49999);
var persons = await personsCmd.ExecuteGetAllPersonCommandAsync().ToListAsync();


```
