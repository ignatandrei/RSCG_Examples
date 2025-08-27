---
sidebar_position: 1420
title: 142 - TableStorage
description: Generate resources for accessing Azure Table Storage
slug: /TableStorage
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDatabase.mdx';

# TableStorage  by Steven Thuriot


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/TableStorage?label=TableStorage)](https://www.nuget.org/packages/TableStorage/)
[![GitHub last commit](https://img.shields.io/github/last-commit/StevenThuriot/TableStorage?label=updated)](https://github.com/StevenThuriot/TableStorage)
![GitHub Repo stars](https://img.shields.io/github/stars/StevenThuriot/TableStorage?style=social)

## Details

### Info
:::info

Name: **TableStorage**

Package Description

Author: Steven Thuriot

NuGet: 
*https://www.nuget.org/packages/TableStorage/*   


You can find more details at https://github.com/StevenThuriot/TableStorage

Source: https://github.com/StevenThuriot/TableStorage

:::

### Original Readme
:::note

# TableStorage
Streamlined way of working with Azure Data Tables

## Installation

```bash
dotnet add package TableStorage
```

## Usage

Create your own TableContext and mark it with the `[TableContext]` attribute. This class must be partial.

```csharp
[TableContext]
public partial class MyTableContext;
```

Create your models, these must be classes and have a parameterless constructor. Mark them with the `[TableSet]` attribute. This class must be partial.

```csharp
[TableSet]
public partial class Model
{
    public string Data { get; set; }
    public bool Enabled { get; set; }
}
```

Properties can also be defined using the `[TableSetProperty]` attribute. 
This is particularly useful if you are planning on using dotnet 8+'s Native AOT, as the source generation will make sure any breaking reflection calls are avoided by the Azure.Core libraries.

```csharp
[TableSet]
[TableSetProperty(typeof(string), "Data")]
[TableSetProperty(typeof(bool), "Enabled")]
public partial class Model;
```

Some times it's also nice to have a pretty name for your `PartitionKey` and `RowKey` properties, as the original names might not always make much sense when reading your code, at least not in a functional way.
You can use the `[PartitionKeyAttribute]` and `[RowKeyAttribute]` attributes to create a proxy for these two properties.

```csharp
[TableSet]
[PartitionKey("MyPrettyPartitionKey")]
[RowKey("MyPrettyRowKey")]
public partial class Model;
```

Place your tables on your TableContext. The sample below will create 2 tables in table storage, named Models1 and Models2.

```csharp
[TableContext]
public partial class MyTableContext
{
    public TableSet<Model> Models1 { get; set; }
    public TableSet<Model> Models2 { get; set; }
}
```

Register your TableContext in your services. An extension method will be available specifically for your context.

```csharp
builder.Services.AddMyTableContext(builder.Configuration.GetConnectionString("MyConnectionString"));
```

Optionally, pass along a `Configure` method to adjust some configuration options.

```csharp
builder.Services.AddMyTableContext(builder.Configuration.GetConnectionString("MyConnectionString"), Configure);

static void Configure(TableOptions options)
{
    options.AutoTimestamps = true;
    options.TableMode = TableUpdateMode.Merge;
}
```

Inject `MyTableContext` into your class and use as needed.

```csharp
public class MyService(MyTableContext context)
{
    private readonly MyTableContext _context = context;

    public async Task DoSomething(CancellationToken token)
    {
        var entity = await _context.Models1.GetEntityOrDefaultAsync("partitionKey", "rowKey", token);
        if (entity is not null)
        {
            //Do more
        }
    }
}
```

For some special cases, your table name might not be known at compile time. To handle those, an extension method has been added:

```csharp
var tableSet = context.GetTableSet<Model>("randomname");
```

## Linq

A few simple Linq extension methods have been provided in the `TableStorage.Linq` namespace that optimize some existing LINQ methods specifically for Table Storage.

Since these return an instance that implements `IAsyncEnumerable`, `System.Linq.Async` is an excellent companion to these methods. Do keep in mind that as soon as you start using `IAsyncEnumerable`, any further operations will run client-side.


Note: `Select` will include the actual transformation. If you want the original model, with only the selected fields retrieved, use `SelectFields` instead.
If you are using Native AOT, you will need to use `SelectFields` as `Select` will not work.


:::

### About
:::note

Generate resources for accessing Azure Table Storage


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TableStorage**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Azure.Storage.Blobs" Version="12.13.1" />
    <PackageReference Include="Azure.Storage.Files.Shares" Version="12.1.0" />
    <PackageReference Include="Azure.Storage.Queues" Version="12.11.1" />
    <PackageReference Include="Microsoft.Extensions.Azure" Version="1.5.0" />
    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="8.0.0" />
    <PackageReference Include="TableStorage" Version="4.2.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TableStorage\src\AzureStorage\Program.cs" label="Program.cs" >

  This is the use of **TableStorage** in *Program.cs*

```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;
using test;
/*Visual Studio version	Azurite executable location
Visual Studio Community 2022	C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
Visual Studio Professional 2022	C:\Program Files\Microsoft Visual Studio\2022\Professional\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
Visual Studio Enterprise 2022	C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
*/

var serviceProvider = new ServiceCollection()
    .AddDatabaseContext("UseDevelopmentStorage=true")
    .BuildServiceProvider();

DatabaseContext db = serviceProvider.GetRequiredService<DatabaseContext>();

Employee?  e=new ();
e.Name = "Andrei Ignat";
e.PartitionKey = "1";
e.RowKey = Guid.NewGuid().ToString();
await db.Employees.AddEntityAsync(e);

e = await db.Employees.GetEntityAsync(e.PartitionKey, e.RowKey);
Console.WriteLine(e?.Name);  

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TableStorage\src\AzureStorage\Database.cs" label="Database.cs" >

  This is the use of **TableStorage** in *Database.cs*

```csharp showLineNumbers 
using TableStorage;
namespace test;
[TableContext]
public partial class DatabaseContext
{
    public TableSet<Employee>? Employees { get; set; }
}


[TableSet]
[TableSetProperty(typeof(bool), "Enabled")]
[TableSetProperty(typeof(string), "Name")]
public partial class Employee
{

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TableStorage\src\AzureStorage\obj\GX\TableStorage.SourceGenerators\TableStorage.SourceGenerators.TableContextGenerator\TableContextAttribute.g.cs" label="TableContextAttribute.g.cs" >


```csharp showLineNumbers 

using System;

namespace TableStorage
{
    [AttributeUsage(AttributeTargets.Class)]
    public sealed class TableContextAttribute : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TableStorage\src\AzureStorage\obj\GX\TableStorage.SourceGenerators\TableStorage.SourceGenerators.TableContextGenerator\TableContexts.g.cs" label="TableContexts.g.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;
using TableStorage;
using System;

#nullable disable

namespace test
{
    public static class DatabaseContextExtensions
    {
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, string connectionString, Action<TableStorage.TableOptions> configure = null)
        {
            DatabaseContext.Register(services, connectionString, configure);
            return services;
        }
    }

    partial class DatabaseContext
    {
        private TableStorage.ICreator _creator { get; init; }

        private static class TableSetCache<T>
                where T : class, Azure.Data.Tables.ITableEntity, new()
        {
            private static System.Collections.Concurrent.ConcurrentDictionary<string, TableStorage.TableSet<T>> _unknownTableSets = new System.Collections.Concurrent.ConcurrentDictionary<string, TableStorage.TableSet<T>>();
            public static TableStorage.TableSet<T> GetTableSet(TableStorage.ICreator creator, string tableName)
            {
                return _unknownTableSets.GetOrAdd(tableName, creator.CreateSet<T>);
            }

        }

        public TableSet<T> GetTableSet<T>(string tableName)
            where T : class, Azure.Data.Tables.ITableEntity, new()
        {
            return TableSetCache<T>.GetTableSet(_creator, tableName);
        }

        public static void Register(IServiceCollection services, string connectionString, Action<TableStorage.TableOptions> configure = null)
        {
            services.AddSingleton(s =>
                    {
                        ICreator creator = TableStorage.TableStorageSetup.BuildCreator(connectionString, configure);

                        return new DatabaseContext()
                        {
                            _creator = creator,
                            Employees = creator.CreateSet<test.Employee>("Employees", null, null),
                        };
                    });
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TableStorage\src\AzureStorage\obj\GX\TableStorage.SourceGenerators\TableStorage.SourceGenerators.TableSetModelGenerator\TableSetAttributes.g.cs" label="TableSetAttributes.g.cs" >


```csharp showLineNumbers 

using System;

namespace TableStorage
{
    [AttributeUsage(AttributeTargets.Class)]
    public sealed class TableSetAttribute : Attribute
    {
    }


    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public sealed class TableSetPropertyAttribute : Attribute
    {
        public TableSetPropertyAttribute(Type type, string name)
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public sealed class PartitionKeyAttribute : Attribute
    {
        public PartitionKeyAttribute(string name)
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public sealed class RowKeyAttribute : Attribute
    {
        public RowKeyAttribute(string name)
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TableStorage\src\AzureStorage\obj\GX\TableStorage.SourceGenerators\TableStorage.SourceGenerators.TableSetModelGenerator\TableSets.g.cs" label="TableSets.g.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;
using TableStorage;
using System.Collections.Generic;
using System;

#nullable disable

namespace test
{
    [System.Diagnostics.DebuggerDisplay(@"Employee \{ {PartitionKey}, {RowKey} \}")]
    partial class Employee : IDictionary<string, object>, Azure.Data.Tables.ITableEntity
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public Azure.ETag ETag { get; set; }
        [System.Runtime.Serialization.IgnoreDataMember] public bool Enabled { get; set; }
        [System.Runtime.Serialization.IgnoreDataMember] public string Name { get; set; }

        public object this[string key]
        {
            get
            {
                switch (key)
                {
                    case "PartitionKey": return PartitionKey;
                    case "RowKey": return RowKey;
                    case "Timestamp": return Timestamp;
                    case "odata.etag": return ETag.ToString();
                    case "Enabled": return Enabled;
                    case "Name": return Name;
                    default: return null;
                }
            }

            set
            {
                switch (key)
                {
                    case "PartitionKey": PartitionKey = value?.ToString(); break;
                    case "RowKey": RowKey = value?.ToString(); break;
                    case "Timestamp": Timestamp = (System.DateTimeOffset?)value; break;
                    case "odata.etag": ETag = new Azure.ETag(value?.ToString()); break;
                    case "Enabled": Enabled = (bool) value; break;
                    case "Name": Name = (string) value; break;
                }
            }
        }

        public ICollection<string> Keys => new string[] { "PartitionKey", "RowKey", "Timestamp", "odata.etag", "Enabled", "Name",  };
        public ICollection<object> Values => new object[] { PartitionKey, RowKey, Timestamp, ETag.ToString(), Enabled, Name,  };
        public int Count => 6;
        public bool IsReadOnly => false;

        public void Add(string key, object value)
        {
            this[key] = value;
        }

        public void Add(KeyValuePair<string, object> item)
        {
            this[item.Key] = item.Value;
        }

        public void Clear()
        {
            Enabled = default(bool);
            Name = default(string);
        }

        public bool Contains(KeyValuePair<string, object> item)
        {
            if (TryGetValue(item.Key, out var value))
            {
                return value == item.Value;
            }

            return false;
        }

        public bool ContainsKey(string key)
        {
            switch (key)
            {
                case "PartitionKey":
                case "RowKey":
                case "Timestamp":
                case "odata.etag":
                case "Enabled": 
                case "Name": 
                    return true;
            
                default: return false;
            }
        }

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
            if (array == null)
            {
                throw new System.ArgumentNullException("array");
            }

            if ((uint)arrayIndex > (uint)array.Length)
            {
                throw new System.IndexOutOfRangeException();
            }

            if (array.Length - arrayIndex < Count)
            {
                throw new System.ArgumentException();
            }

            foreach (var item in this)
            {
                array[arrayIndex++] = item;
            }
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            yield return new KeyValuePair<string, object>("PartitionKey", PartitionKey);
            yield return new KeyValuePair<string, object>("RowKey", RowKey);
            yield return new KeyValuePair<string, object>("Timestamp", Timestamp);
            yield return new KeyValuePair<string, object>("odata.etag", ETag.ToString());
            yield return new KeyValuePair<string, object>("Enabled", Enabled);
            yield return new KeyValuePair<string, object>("Name", Name);
        }

        public bool Remove(string key)
        {
            if (ContainsKey(key)) 
            {
                this[key] = null;
                return true;
            }

            return false;
        }

        public bool Remove(KeyValuePair<string, object> item)
        {
            if (Contains(item)) 
            {
                this[item.Key] = null;
                return true;
            }

            return false;
        }

        public bool TryGetValue(string key, out object value)
        {
            switch (key)
            {
                case "PartitionKey": value = PartitionKey; return true;
                case "RowKey": value = RowKey; return true;
                case "Timestamp": value = Timestamp; return true;
                case "odata.etag": value = ETag; return true;
                case "Enabled": value = Enabled; return true;
                case "Name": value = Name; return true;
                default: value = null; return false;
            }
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project TableStorage ](/sources/TableStorage.zip)

:::


### Share TableStorage 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTableStorage&quote=TableStorage" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTableStorage&text=TableStorage:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTableStorage" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTableStorage&title=TableStorage" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTableStorage&title=TableStorage&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTableStorage" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TableStorage

aaa
<SameCategory />

