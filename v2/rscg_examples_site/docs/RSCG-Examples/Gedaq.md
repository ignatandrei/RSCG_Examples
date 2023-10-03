---
sidebar_position: 290
title: 29 - Gedaq
description: Generating code from attribute query
slug: /Gedaq
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Gedaq  by Vyacheslav Brevnov


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Gedaq?label=Gedaq)](https://www.nuget.org/packages/Gedaq/)
[![GitHub last commit](https://img.shields.io/github/last-commit/SoftStoneDevelop/Gedaq?label=updated)](https://github.com/SoftStoneDevelop/Gedaq)
![GitHub Repo stars](https://img.shields.io/github/stars/SoftStoneDevelop/Gedaq?style=social)

## Details

### Info
:::info

Name: **Gedaq**

ORM Gedaq is roslyn generator of methods for obtaining data from databases.

Author: Vyacheslav Brevnov

NuGet: 
*https://www.nuget.org/packages/Gedaq/*   


You can find more details at https://github.com/SoftStoneDevelop/Gedaq

Source : https://github.com/SoftStoneDevelop/Gedaq

:::

### Original Readme
:::note

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
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

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


:::

### About
:::note

Generating code from attribute query


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Gedaq**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="Gedaq" Version="1.5.0" OutputItemType="Analyzer" ReferenceOutputAssembly="True" />
	  <PackageReference Include="Gedaq.Npgsql" Version="1.2.6" />
	</ItemGroup>
</Project>
```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Model\Person.cs" label="Person.cs" >

  This is the use of **Gedaq** in *Person.cs*

```csharp showLineNumbers 
namespace GedaqDemoConsole.Model
{
    public class Person
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public Address Address { get; set; }
    }
}
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Model\Address.cs" label="Address.cs" >

  This is the use of **Gedaq** in *Address.cs*

```csharp showLineNumbers 
namespace GedaqDemoConsole.Model
{
    public class Address
    {
        public int Id { get; set; }

        public string Street { get; set; }

        public string City { get; set; }
    }
}
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Example1\ExampleRun.cs" label="ExampleRun.cs" >

  This is the use of **Gedaq** in *ExampleRun.cs*

```csharp showLineNumbers 
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
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Example1\PersonRepository.cs" label="PersonRepository.cs" >

  This is the use of **Gedaq** in *PersonRepository.cs*

```csharp showLineNumbers 
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
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Example2\ExampleRun.cs" label="ExampleRun.cs" >

  This is the use of **Gedaq** in *ExampleRun.cs*

```csharp showLineNumbers 
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
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Example2\PersonRepository.cs" label="PersonRepository.cs" >

  This is the use of **Gedaq** in *PersonRepository.cs*

```csharp showLineNumbers 
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
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Example3\ExampleRun.cs" label="ExampleRun.cs" >

  This is the use of **Gedaq** in *ExampleRun.cs*

```csharp showLineNumbers 
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
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Example3\PersonRepository.cs" label="PersonRepository.cs" >

  This is the use of **Gedaq** in *PersonRepository.cs*

```csharp showLineNumbers 
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
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\PersonRepository2BatchPersonsNpgsql.g.cs" label="PersonRepository2BatchPersonsNpgsql.g.cs" >


```csharp showLineNumbers 

using Npgsql;
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole.Example2
{
    public  partial class PersonRepository2
    {
        
        public  IEnumerable<IEnumerable<GedaqDemoConsole.Model.Person>> BatchPersons(
            Npgsql.NpgsqlConnection connection,
            System.Int32 person_idBatch1,
            System.Int32 person_idBatch2,
            int? timeout = null
            )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                connection.Open();
            }
            NpgsqlBatch batch = null;
            NpgsqlDataReader reader = null;
            try
            {
                batch = 
                CreateBatchPersonsBatch(connection
                , false)
                ;
                SetBatchPersonsParametrs(
                    batch,
                    person_idBatch1,
                    person_idBatch2,
                    timeout
                    );
                reader = batch.ExecuteReader();
                yield return BatchItem0(reader);
                reader.NextResult();
                yield return BatchItem1(reader);
                reader.NextResult();
                reader.Dispose();
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            batch.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    reader.Dispose();
                }
                if (needClose)
                {
                    connection.Close();
                }
                if(batch != null)
                {
                    batch.BatchCommands.Clear();
                    batch.Dispose();
                }
            }
        }
        
        public  async IAsyncEnumerable<IAsyncEnumerable<GedaqDemoConsole.Model.Person>> BatchPersonsAsync(
            Npgsql.NpgsqlConnection connection,
            System.Int32 person_idBatch1,
            System.Int32 person_idBatch2,
            int? timeout = null,
            [EnumeratorCancellation] CancellationToken cancellationToken = default
            )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                await connection.OpenAsync(cancellationToken).ConfigureAwait(false);
            }
            NpgsqlBatch batch = null;
            NpgsqlDataReader reader = null;
            try
            {
                batch = 
                await CreateBatchPersonsBatchAsync(connection
                , false, cancellationToken)
                ;
                SetBatchPersonsParametrs(
                    batch,
                    person_idBatch1,
                    person_idBatch2,
                    timeout
                    );
                reader = await batch.ExecuteReaderAsync(cancellationToken).ConfigureAwait(false);
                yield return BatchItem0Async(reader, cancellationToken);
                await reader.NextResultAsync(cancellationToken).ConfigureAwait(false);
                yield return BatchItem1Async(reader, cancellationToken);
                await reader.NextResultAsync(cancellationToken).ConfigureAwait(false);
                await reader.DisposeAsync().ConfigureAwait(false);
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            batch.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    await reader.DisposeAsync().ConfigureAwait(false);
                }
                if (needClose)
                {
                    await connection.CloseAsync().ConfigureAwait(false);
                }
                if(batch != null)
                {
                    batch.BatchCommands.Clear();
                    await batch.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static async IAsyncEnumerable<GedaqDemoConsole.Model.Person> BatchItem0Async(
            NpgsqlDataReader reader,
            [EnumeratorCancellation] CancellationToken cancellationToken = default
            )
        {
            while(await reader.ReadAsync(cancellationToken).ConfigureAwait(false))
            {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
            }
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static async IAsyncEnumerable<GedaqDemoConsole.Model.Person> BatchItem1Async(
            NpgsqlDataReader reader,
            [EnumeratorCancellation] CancellationToken cancellationToken = default
            )
        {
            while(await reader.ReadAsync(cancellationToken).ConfigureAwait(false))
            {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
            }
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static IEnumerable<GedaqDemoConsole.Model.Person> BatchItem0(NpgsqlDataReader reader)
        {
            while(reader.Read())
            {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
            }
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static IEnumerable<GedaqDemoConsole.Model.Person> BatchItem1(NpgsqlDataReader reader)
        {
            while(reader.Read())
            {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
            }
        }

        public  NpgsqlBatch CreateBatchPersonsBatch(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false
            )
        {
            var batch = connection.CreateBatch();
            var command = batch.CreateBatchCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id
WHERE
    p.id = $1

";
            {
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
            }
            batch.BatchCommands.Add(command);
            command = batch.CreateBatchCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id
WHERE
    p.id = $1

";
            {
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
            }
            batch.BatchCommands.Add(command);
            if(prepare)
            {
                try
                {
                    batch.Prepare();
                }
                catch
                {
                    batch.Dispose();
                    throw;
                }
            }
            return batch;
        }

        public  async ValueTask<NpgsqlBatch> CreateBatchPersonsBatchAsync(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false,
            CancellationToken cancellationToken = default
            )
        {
            var batch = connection.CreateBatch();
            var command = batch.CreateBatchCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id
WHERE
    p.id = $1

";
            {
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
            }
            batch.BatchCommands.Add(command);
            command = batch.CreateBatchCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id
WHERE
    p.id = $1

";
            {
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
            }
            batch.BatchCommands.Add(command);
            if(prepare)
            {
                try
                {
                    await batch.PrepareAsync(cancellationToken).ConfigureAwait(false);
                }
                catch
                {  
                    await batch.DisposeAsync().ConfigureAwait(false);
                    throw;
                }
            }
            return batch;
        }

        public  void SetBatchPersonsParametrs(
            NpgsqlBatch batch,
            System.Int32 person_idBatch1,
            System.Int32 person_idBatch2,
            int? timeout = null
            )
        {

            if(timeout.HasValue)
            {
                batch.Timeout = timeout.Value;
            }
            var batchCommand = batch.BatchCommands[0];
            ((NpgsqlParameter<System.Int32>)batchCommand.Parameters[0]).TypedValue = person_idBatch1;
            batchCommand = batch.BatchCommands[1];
            ((NpgsqlParameter<System.Int32>)batchCommand.Parameters[0]).TypedValue = person_idBatch2;
        }

        public  IEnumerable<IEnumerable<GedaqDemoConsole.Model.Person>> ExecuteBatchPersonsBatch(
            NpgsqlBatch batch
            )
        {
            NpgsqlDataReader reader = null;
            try
            {
                reader = batch.ExecuteReader();
                yield return BatchItem0(reader);
                reader.NextResult();
                yield return BatchItem1(reader);
                reader.NextResult();
                reader.Dispose();
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            batch.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    reader.Dispose();
                }
            }
        }

        public  async IAsyncEnumerable<IAsyncEnumerable<GedaqDemoConsole.Model.Person>> ExecuteBatchPersonsBatchAsync(
            NpgsqlBatch batch,
            [EnumeratorCancellation] CancellationToken cancellationToken = default
            )
        {
            NpgsqlDataReader reader = null;
            try
            {
                reader = await batch.ExecuteReaderAsync(cancellationToken).ConfigureAwait(false);
                yield return BatchItem0Async(reader, cancellationToken);
                await reader.NextResultAsync(cancellationToken).ConfigureAwait(false);
                yield return BatchItem1Async(reader, cancellationToken);
                await reader.NextResultAsync(cancellationToken).ConfigureAwait(false);
                await reader.DisposeAsync().ConfigureAwait(false);
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            batch.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    await reader.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\PersonRepository3AddPersonsICommandPersonRepository.g.cs" label="PersonRepository3AddPersonsICommandPersonRepository.g.cs" >


```csharp showLineNumbers 

using Npgsql;
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole.Example3
{
    public partial interface ICommandPersonRepository
    {
        
        public  System.Int32 AddPersons(
            Npgsql.NpgsqlConnection connection,
            System.Int32 id,
            System.String firstname,
            int? timeout = null
        );
        
        public  ValueTask<System.Int32> AddPersonsAsync(
            Npgsql.NpgsqlConnection connection,
            System.Int32 id,
            System.String firstname,
            int? timeout = null,
            CancellationToken cancellationToken = default
        );

        public  NpgsqlCommand CreateAddPersonsCommand(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false
        );

        public  ValueTask<NpgsqlCommand> CreateAddPersonsCommandAsync(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false,
            CancellationToken cancellationToken = default
        );

        public  void SetAddPersonsParametrs(
            NpgsqlCommand command,
            System.Int32 id,
            System.String firstname,
            int? timeout = null
            );

    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\PersonRepository3AddPersonsNpgsql.g.cs" label="PersonRepository3AddPersonsNpgsql.g.cs" >


```csharp showLineNumbers 

using Npgsql;
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole.Example3
{
    public  partial class PersonRepository3
    {
        
        public  System.Int32 AddPersons(
            Npgsql.NpgsqlConnection connection,
            System.Int32 id,
            System.String firstname,
            int? timeout = null
        )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                connection.Open();
            }
            NpgsqlCommand command = null;
            try
            {
                command =
                CreateAddPersonsCommand(connection
                , false)
                ;
                SetAddPersonsParametrs(
                    command,
                    id,
                    firstname,
                    timeout
                    );
                var result = (System.Int32)command.ExecuteNonQuery();
                return result;
            }
            finally
            {
                if (needClose)
                {
                    connection.Close();
                }
                if(command != null)
                {
                    command.Parameters.Clear();
                    command.Dispose();
                }
            }
        }
        
        public  async ValueTask<System.Int32> AddPersonsAsync(
            Npgsql.NpgsqlConnection connection,
            System.Int32 id,
            System.String firstname,
            int? timeout = null,
            CancellationToken cancellationToken = default
        )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                await connection.OpenAsync(cancellationToken).ConfigureAwait(false);
            }
            NpgsqlCommand command = null;
            try
            {
                command =
                await CreateAddPersonsCommandAsync(connection
                , false, cancellationToken)
                ;
                SetAddPersonsParametrs(
                    command,
                    id,
                    firstname,
                    timeout
                    );
                var result = (System.Int32)await command.ExecuteNonQueryAsync(cancellationToken).ConfigureAwait(false);
                return result;
            }
            finally
            {
                if (needClose)
                {
                    await connection.CloseAsync().ConfigureAwait(false);
                }
                if(command != null)
                {
                    command.Parameters.Clear();
                    await command.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

        public  NpgsqlCommand CreateAddPersonsCommand(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false
        )
        {
            var command = connection.CreateCommand();
            command.CommandText = @"

INSERT INTO person(
	id,
    firstname
)
VALUES (
    $1,
    $2
)

"
;
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
                {
                var parametr = new NpgsqlParameter<System.String>();

                command.Parameters.Add(parametr);

                }
            if(prepare)
            {
                try
                {
                    command.Prepare();
                }
                catch
                {
                    command.Dispose();
                    throw;
                }
            }
            return command;
        }

        public  async ValueTask<NpgsqlCommand> CreateAddPersonsCommandAsync(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false,
            CancellationToken cancellationToken = default
        )
        {
            var command = connection.CreateCommand();
            command.CommandText = @"

INSERT INTO person(
	id,
    firstname
)
VALUES (
    $1,
    $2
)

"
;
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
                {
                var parametr = new NpgsqlParameter<System.String>();

                command.Parameters.Add(parametr);

                }
            if(prepare)
            {
                try
                {
                    await command.PrepareAsync(cancellationToken).ConfigureAwait(false);
                }
                catch
                {  
                    await command.DisposeAsync().ConfigureAwait(false);
                    throw;
                }
            }
            return command;
        }

        public  void SetAddPersonsParametrs(
            NpgsqlCommand command,
            System.Int32 id,
            System.String firstname,
            int? timeout = null
            )
        {

            if(timeout.HasValue)
            {
                command.CommandTimeout = timeout.Value;
            }
                ((NpgsqlParameter<System.Int32>)command.Parameters[0]).TypedValue = id;
            if(firstname == null)
            {
                ((NpgsqlParameter<System.String>)command.Parameters[1]).TypedValue = null;
            }
            else
            {
                ((NpgsqlParameter<System.String>)command.Parameters[1]).TypedValue = firstname;
            }
        }

    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\PersonRepository3GetPersonsIQueryPersonRepository.g.cs" label="PersonRepository3GetPersonsIQueryPersonRepository.g.cs" >


```csharp showLineNumbers 

using Npgsql;
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole.Example3
{
    public partial interface IQueryPersonRepository
    {
        
        public  IEnumerable<GedaqDemoConsole.Model.Person> GetPersons(
            Npgsql.NpgsqlConnection connection,
            int? timeout = null
        );
        
        public  IAsyncEnumerable<GedaqDemoConsole.Model.Person> GetPersonsAsync(
            Npgsql.NpgsqlConnection connection,
            int? timeout = null,
             CancellationToken cancellationToken = default
        );

        public  NpgsqlCommand CreateGetPersonsCommand(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false
        );

        public  ValueTask<NpgsqlCommand> CreateGetPersonsCommandAsync(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false,
            CancellationToken cancellationToken = default
        );

        public  IEnumerable<GedaqDemoConsole.Model.Person> ExecuteGetPersonsCommand(
            NpgsqlCommand command
            );

        public  IAsyncEnumerable<GedaqDemoConsole.Model.Person> ExecuteGetPersonsCommandAsync(
            NpgsqlCommand command,
             CancellationToken cancellationToken = default

            );

        public  void SetGetPersonsParametrs(
            NpgsqlCommand command,
            int? timeout = null
            );

    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\PersonRepository3GetPersonsNpgsql.g.cs" label="PersonRepository3GetPersonsNpgsql.g.cs" >


```csharp showLineNumbers 

using Npgsql;
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole.Example3
{
    public  partial class PersonRepository3
    {
        
        public  IEnumerable<GedaqDemoConsole.Model.Person> GetPersons(
            Npgsql.NpgsqlConnection connection,
            int? timeout = null
        )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                connection.Open();
            }
            NpgsqlCommand command = null;
            NpgsqlDataReader reader = null;
            try
            {
                command =
                CreateGetPersonsCommand(connection
                , false)
                ;
                SetGetPersonsParametrs(
                    command,
                    timeout
                    );
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (reader.NextResult())
                {
                }

                reader.Dispose();
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    reader.Dispose();
                }
                if (needClose)
                {
                    connection.Close();
                }
                if(command != null)
                {
                    command.Parameters.Clear();
                    command.Dispose();
                }
            }
        }
        
        public  async IAsyncEnumerable<GedaqDemoConsole.Model.Person> GetPersonsAsync(
            Npgsql.NpgsqlConnection connection,
            int? timeout = null,
            [EnumeratorCancellation] CancellationToken cancellationToken = default
        )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                await connection.OpenAsync(cancellationToken).ConfigureAwait(false);
            }
            NpgsqlCommand command = null;
            NpgsqlDataReader reader = null;
            try
            {
                command =
                await CreateGetPersonsCommandAsync(connection
                , false, cancellationToken)
                ;
                SetGetPersonsParametrs(
                    command,
                    timeout
                    );
                reader = await command.ExecuteReaderAsync(cancellationToken).ConfigureAwait(false);
                while (await reader.ReadAsync(cancellationToken).ConfigureAwait(false))
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (await reader.NextResultAsync(cancellationToken).ConfigureAwait(false))
                {
                }

                await reader.DisposeAsync().ConfigureAwait(false);
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    await reader.DisposeAsync().ConfigureAwait(false);
                }
                if (needClose)
                {
                    await connection.CloseAsync().ConfigureAwait(false);
                }
                if(command != null)
                {
                    command.Parameters.Clear();
                    await command.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

        public  NpgsqlCommand CreateGetPersonsCommand(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false
        )
        {
            var command = connection.CreateCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id

"
;
            if(prepare)
            {
                try
                {
                    command.Prepare();
                }
                catch
                {
                    command.Dispose();
                    throw;
                }
            }
            return command;
        }

        public  async ValueTask<NpgsqlCommand> CreateGetPersonsCommandAsync(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false,
            CancellationToken cancellationToken = default
        )
        {
            var command = connection.CreateCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id

"
;
            if(prepare)
            {
                try
                {
                    await command.PrepareAsync(cancellationToken).ConfigureAwait(false);
                }
                catch
                {  
                    await command.DisposeAsync().ConfigureAwait(false);
                    throw;
                }
            }
            return command;
        }

        public  IEnumerable<GedaqDemoConsole.Model.Person> ExecuteGetPersonsCommand(
            NpgsqlCommand command
            )
        {
            NpgsqlDataReader reader = null;
            try
            {
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (reader.NextResult())
                {
                }
                reader.Dispose();
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    reader.Dispose();
                }
            }
        }

        public  async IAsyncEnumerable<GedaqDemoConsole.Model.Person> ExecuteGetPersonsCommandAsync(
            NpgsqlCommand command,
            [EnumeratorCancellation] CancellationToken cancellationToken = default

            )
        {
            NpgsqlDataReader reader = null;
            try
            {
                reader = await command.ExecuteReaderAsync(cancellationToken).ConfigureAwait(false);
                while (await reader.ReadAsync(cancellationToken).ConfigureAwait(false))
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (await reader.NextResultAsync(cancellationToken).ConfigureAwait(false))
                {
                }
                await reader.DisposeAsync().ConfigureAwait(false);
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    await reader.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

        public  void SetGetPersonsParametrs(
            NpgsqlCommand command,
            int? timeout = null
            )
        {

            if(timeout.HasValue)
            {
                command.CommandTimeout = timeout.Value;
            }
        }

    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\PersonRepositoryGetPersonNpgsql.g.cs" label="PersonRepositoryGetPersonNpgsql.g.cs" >


```csharp showLineNumbers 

using Npgsql;
using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole.Example1
{
    public  partial class PersonRepository
    {
        
        public  IEnumerable<GedaqDemoConsole.Model.Person> GetPerson(
            Npgsql.NpgsqlConnection connection,
            System.Int32 person_id,
            int? timeout = null
        )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                connection.Open();
            }
            NpgsqlCommand command = null;
            NpgsqlDataReader reader = null;
            try
            {
                command =
                CreateGetPersonCommand(connection
                , false)
                ;
                SetGetPersonParametrs(
                    command,
                    person_id,
                    timeout
                    );
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (reader.NextResult())
                {
                }

                reader.Dispose();
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    reader.Dispose();
                }
                if (needClose)
                {
                    connection.Close();
                }
                if(command != null)
                {
                    command.Parameters.Clear();
                    command.Dispose();
                }
            }
        }
        
        public  async IAsyncEnumerable<GedaqDemoConsole.Model.Person> GetPersonAsync(
            Npgsql.NpgsqlConnection connection,
            System.Int32 person_id,
            int? timeout = null,
            [EnumeratorCancellation] CancellationToken cancellationToken = default
        )
        {
            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                await connection.OpenAsync(cancellationToken).ConfigureAwait(false);
            }
            NpgsqlCommand command = null;
            NpgsqlDataReader reader = null;
            try
            {
                command =
                await CreateGetPersonCommandAsync(connection
                , false, cancellationToken)
                ;
                SetGetPersonParametrs(
                    command,
                    person_id,
                    timeout
                    );
                reader = await command.ExecuteReaderAsync(cancellationToken).ConfigureAwait(false);
                while (await reader.ReadAsync(cancellationToken).ConfigureAwait(false))
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (await reader.NextResultAsync(cancellationToken).ConfigureAwait(false))
                {
                }

                await reader.DisposeAsync().ConfigureAwait(false);
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    await reader.DisposeAsync().ConfigureAwait(false);
                }
                if (needClose)
                {
                    await connection.CloseAsync().ConfigureAwait(false);
                }
                if(command != null)
                {
                    command.Parameters.Clear();
                    await command.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

        public  NpgsqlCommand CreateGetPersonCommand(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false
        )
        {
            var command = connection.CreateCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id
WHERE
    p.id = $1

"
;
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
            if(prepare)
            {
                try
                {
                    command.Prepare();
                }
                catch
                {
                    command.Dispose();
                    throw;
                }
            }
            return command;
        }

        public  async ValueTask<NpgsqlCommand> CreateGetPersonCommandAsync(
            Npgsql.NpgsqlConnection connection,
            bool prepare = false,
            CancellationToken cancellationToken = default
        )
        {
            var command = connection.CreateCommand();
            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,

    a.id,
    a.street,
    a.city

FROM person p
LEFT JOIN address a ON a.id = p.address_id
WHERE
    p.id = $1

"
;
                {
                var parametr = new NpgsqlParameter<System.Int32>();

                command.Parameters.Add(parametr);

                }
            if(prepare)
            {
                try
                {
                    await command.PrepareAsync(cancellationToken).ConfigureAwait(false);
                }
                catch
                {  
                    await command.DisposeAsync().ConfigureAwait(false);
                    throw;
                }
            }
            return command;
        }

        public  IEnumerable<GedaqDemoConsole.Model.Person> ExecuteGetPersonCommand(
            NpgsqlCommand command
            )
        {
            NpgsqlDataReader reader = null;
            try
            {
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (reader.NextResult())
                {
                }
                reader.Dispose();
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    reader.Dispose();
                }
            }
        }

        public  async IAsyncEnumerable<GedaqDemoConsole.Model.Person> ExecuteGetPersonCommandAsync(
            NpgsqlCommand command,
            [EnumeratorCancellation] CancellationToken cancellationToken = default

            )
        {
            NpgsqlDataReader reader = null;
            try
            {
                reader = await command.ExecuteReaderAsync(cancellationToken).ConfigureAwait(false);
                while (await reader.ReadAsync(cancellationToken).ConfigureAwait(false))
                {
                    var item = new GedaqDemoConsole.Model.Person();
                        if(!reader.IsDBNull(0))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.Id = reader.GetFieldValue<System.Int32>(0);
                        }
                        if(!reader.IsDBNull(1))
                        {
                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Model.Person();
                            }
                            item.FirstName = reader.GetFieldValue<System.String>(1);
                        }
                        if(!reader.IsDBNull(2))
                        {
                            var item1 = new GedaqDemoConsole.Model.Address();
                            if(!reader.IsDBNull(2))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Id = reader.GetFieldValue<System.Int32>(2);
                        }
                            if(!reader.IsDBNull(3))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.Street = reader.GetFieldValue<System.String>(3);
                        }
                            if(!reader.IsDBNull(4))
                        {
                                if(item1 == null)
                                {
                                     item1 = new GedaqDemoConsole.Model.Address();
                                }
                                item1.City = reader.GetFieldValue<System.String>(4);
                        }
                            item.Address = item1;
                        } 
                    yield return item;
                }

                while (await reader.NextResultAsync(cancellationToken).ConfigureAwait(false))
                {
                }
                await reader.DisposeAsync().ConfigureAwait(false);
                reader = null;
            }
            finally
            {
                if (reader != null)
                {
                    if (!reader.IsClosed)
                    {
                        try 
                        {
                            command.Cancel();
                        }
                        catch { /* ignore */ }
                    }
                
                    await reader.DisposeAsync().ConfigureAwait(false);
                }
            }
        }

        public  void SetGetPersonParametrs(
            NpgsqlCommand command,
            System.Int32 person_id,
            int? timeout = null
            )
        {

            if(timeout.HasValue)
            {
                command.CommandTimeout = timeout.Value;
            }
                ((NpgsqlParameter<System.Int32>)command.Parameters[0]).TypedValue = person_id;
        }

    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Gedaq ](/sources/Gedaq.zip)

:::


### Share Gedaq 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&quote=Gedaq" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&text=Gedaq:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&title=Gedaq" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&title=Gedaq&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Gedaq

## In the same category (Database)


### [Breezy](/docs/Breezy)

