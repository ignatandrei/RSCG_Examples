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

<!---
<TOCInline toc={toc} />
-->
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

### About
:::note

Generating code from attribute query


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Gedaq**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="Gedaq" Version="1.4.10" OutputItemType="Analyzer" ReferenceOutputAssembly="True" />
	  <PackageReference Include="Gedaq.DbConnection" Version="1.2.4" />
	  <PackageReference Include="Gedaq.SqlClient" Version="0.2.4" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Program.cs" label="Program.cs" >

  This is the use of **Gedaq** in *Program.cs*

```csharp showLineNumbers 
using GedaqDemoConsole;

var data = new GetData();

var list=data.GetPersons();


```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\Person.cs" label="Person.cs" >

  This is the use of **Gedaq** in *Person.cs*

```csharp showLineNumbers 

namespace GedaqDemoConsole;

public class Person
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\GetData.cs" label="GetData.cs" >

  This is the use of **Gedaq** in *GetData.cs*

```csharp showLineNumbers 

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

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Gedaq\src\GedaqDemoConsole\obj\GX\Gedaq\Gedaq.Gedaq\GetDataGetPersonsSqlClient.g.cs" label="GetDataGetPersonsSqlClient.g.cs" >


```csharp showLineNumbers 

using System;
using System.Data;
using System.Data.Common;
using Microsoft.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace GedaqDemoConsole
{
    public  partial class GetData
    {
        
        public  IEnumerable<GedaqDemoConsole.Person> GetPersons(

            SqlConnection connection
,
            int? timeout = null
,
            SqlTransaction transaction = null

        )
        {

            bool needClose = connection.State == ConnectionState.Closed;
            if(needClose)
            {
                connection.Open();
            }

            SqlCommand command = null;
            SqlDataReader reader = null;
            try
            {
                command =

                CreateGetPersonsCommand(connection

                , false)

                ;
                SetGetPersonsParametrs(
                    command
,
                    timeout
,
                    transaction

                    );

                reader = command.ExecuteReader();

                while (reader.Read())
                {

                    var item = new GedaqDemoConsole.Person();

                        if(!reader.IsDBNull(0))
                        {

                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Person();
                            }

                            item.Id = reader.GetFieldValue<System.Int32>(0);

                        }

                        if(!reader.IsDBNull(1))
                        {

                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Person();
                            }

                            item.FirstName = reader.GetFieldValue<System.String>(1);

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

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public  SqlCommand CreateGetPersonsCommand(
            SqlConnection connection
,
            bool prepare = false

        )
        {
            var command = connection.CreateCommand();

            command.CommandText = @"

SELECT 
    p.id,
    p.firstname,
FROM person p

";

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

        public  IEnumerable<GedaqDemoConsole.Person> ExecuteGetPersonsCommand(SqlCommand command)
        {

            SqlDataReader reader = null;
            try
            {

                reader = command.ExecuteReader();
                while (reader.Read())
                {

                    var item = new GedaqDemoConsole.Person();

                        if(!reader.IsDBNull(0))
                        {

                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Person();
                            }

                            item.Id = reader.GetFieldValue<System.Int32>(0);

                        }

                        if(!reader.IsDBNull(1))
                        {

                            if(item == null)
                            {
                                 item = new GedaqDemoConsole.Person();
                            }

                            item.FirstName = reader.GetFieldValue<System.String>(1);

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

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public  void SetGetPersonsParametrs(
            SqlCommand command
,
            int? timeout = null

            ,
            SqlTransaction transaction = null

        )
        {

            if(timeout.HasValue)
            {
                command.CommandTimeout = timeout.Value;
            }

            if(transaction != null)
            {
                command.Transaction = transaction;
            }

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

### Download PDF

[Download PDF Gedaq ](/pdfs/Gedaq.pdf)

### Share Gedaq 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&quote=Gedaq" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&text=Gedaq:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&title=Gedaq" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq&title=Gedaq&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGedaq" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Gedaq
