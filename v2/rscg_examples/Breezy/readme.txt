<div style="text-align:center"><img src="https://zupimages.net/up/23/23/na2b.png" width="900" height="300"></div>

[![NuGet Badge](https://buildstats.info/nuget/Breezy.SourceGenerator/)](https://www.nuget.org/packages/Breezy.SourceGenerator//1.0.1)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



Breezy is a lightweight Object-Relational Mapping <b>(ORM)</b> library for mapping objects using [`Source Generator`](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) in C#. <br />It provides seamless asynchronous operations for enhanced performance.

## Installation

##### Nugget Package : https://www.nuget.org/packages/Breezy.SourceGenerator/

To install Breezy, simply add the package reference to your project using NuGet Package Manager or by adding the following line to your .csproj file:

```xml
<ItemGroup>
<PackageReference Include="Breezy.SourceGenerator" Version="1.0.1" />
</ItemGroup>
````

##  Getting Started

Breezy simplifies the mapping of objects and performing database operations. Here's a simple example of querying houses using Breezy's asynchronous operations :

````csharp
public static async Task<IEnumerable<House>> QueryAsync<T>(this DbConnection connection, string sql, object param, ICacheableQuery<House> cacheableQuery, CancellationToken cancellationToken = default) where T : House
````

```csharp
using Breezy;

var houses = await connection.QueryAsync<House>("SELECT * FROM house");
```

In the above example, the QueryAsync method executes the provided SQL query and maps the results to a list of House objects asynchronously.

##  Mapping Objects with Relations (N to N || 1 to N)

Breezy supports mapping objects with relationships. Here's an example of querying posts with tags using Breezy's asynchronous operations :

````csharp
using Breezy;

var posts = await connection.QueryAsync<Post>(
    @"SELECT * FROM test.post p INNER JOIN posts_tags pt ON p.id = pt.post_id INNER JOIN tag t ON t.id = pt.tag_id");
````

The QueryAsync method executes the provided SQL query and maps the results to a list of Post objects. The Post class is defined as follows :

````csharp
[Table("post")]
[SplitOn(3, 4)]
public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public List<Tag> Tags { get; set; } = new();
}

[Table("tag")]
public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Post> Posts { get; set; } = new();
}
````

In the Post class, the <b>Table attribute</b> specifies the table name, and the <b>SplitOn attribute</b> indicates the column indices to split when mapping the object from the database.

<i>Circular reference doesn't throw exception ! </i>

#### Vs Dapper

````csharp
var sql = @"SELECT p.id, p.title, p.body, t.id, t.name
                FROM post p 
                INNER JOIN posts_tags pt ON pt.post_id = p.id
                INNER JOIN tag t ON t.id = pt.tag_id";
				
    var posts = await connection.QueryAsync<Post, Tag, Post>(sql, (post, tag) => {      
        post.Tags.Add(tag);
        return post;
    }, splitOn: "id");
	
    var result = posts.GroupBy(p => p.PostId).Select(g =>
    {
        var groupedPost = g.First();
        groupedPost.Tags = g.Select(p => p.Tags.Single()).ToList();
        return groupedPost;
    });
    
   // Dapper is less user friendly for theses using case
````

##  Mapping Objects with Reference Type(s)

````csharp
public class UserReference
{
    public int Id { get; set; }
    public Position Position { get; set; }
}

public sealed class Position
{
    public string ZipCode { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
}
````

````csharp
var users = await connection.QueryAsync<UserReference>("SELECT u.id, u.zip_code, u.city, u.address FROM user_ref u");
````

The QueryAsync method executes the SQL query and automatically maps the result columns to the corresponding properties of the UserReference entity, including the reference type Position.

## Querying with Anonymous Types

Breezy allows you to query using anonymous types as parameters. Here's an example :

````csharp
var houses = await connection.QueryAsync<House>("SELECT * FROM house h WHERE h.id = @Id", new {Id = 1});
````

The anonymous type is used to pass the <b>Id</b> parameter.

>*IMPORTANT :*
> Make sure that the column index in the SQL query match the property index in any class for the mapping to work correctly.
> <br /><b>You need to add any relations at the end of you main object !</b>

## Caching for Performance Optimization

Breezy supports implementing caching mechanisms, such as in-memory or distributed caching, to reduce the memory footprint and improve query execution time. You can implement your own caching strategy based on your specific requirements.

````csharp
public interface ICacheableQuery<T> where T : class
{
	public Task<IEnumerable<T>> GetCacheableResultsAsync(IdentityQuery identityQuery);
	
	public Task SetCacheableResultsAsync(IdentityQuery identityQuery, IEnumerable<T> results);
}	
````

````csharp
// Check if the query result is already cached

var identityQuery = new IdentityQuery(sql);

var cacheableResults = await cacheableQuery.GetCacheableResultsAsync(identityQuery);

if (cacheableResults.Any())
    return cacheableResults;
    
// Execute the query    

var results = new List<T>();

while (await reader.ReadAsync(cancellationToken).ConfigureAwait(false)) 
{ 
    // processing...
}

// Cache the query result for X ms/s

await cacheableQuery.SetCacheableResultsAsync(identityQuery, results);
````

<details>
<summary>Example of implementation (Memory Cache)</summary>

````csharp
public sealed class MemoryCacheableQuery<T> : ICacheableQuery<T> where T : class
{
    private readonly Dictionary<IdentityQuery, Tuple<DateTime, IEnumerable<T>>> _cacheableData = new();
    
    public Task<IEnumerable<T>> GetCacheableResultsAsync(IdentityQuery identityQuery)
    {
        if (_cacheableData.TryGetValue(identityQuery, out var results))
        {
            var (addDate, collection) = results;

            if ((DateTime.Now - addDate) < TimeSpan.FromSeconds(10))
                return Task.FromResult<IEnumerable<T>>(collection);

            _cacheableData.Remove(identityQuery);
        }

        return Task.FromResult<IEnumerable<T>>(Array.Empty<T>());
    }

    public Task SetCacheableResultsAsync(IdentityQuery identityQuery, IEnumerable<T> results)
    {
        _cacheableData.Add(identityQuery, new Tuple<DateTime, IEnumerable<T>>(DateTime.Now, results));

        return Task.CompletedTask;
    }
}
````
</details>

## Execute a Command that return result

Breezy provides the ExecuteAsync method for executing SQL statements that can return results. Here's an example of using ExecuteAsync to insert data into a table and retrieve the last inserted ID:

````csharp
public static async Task<int> ExecuteAsync(this DbConnection connection, string sql, object param, CancellationToken cancellationToken = default)
````

````csharp
var lastId = await connection.ExecuteAsync("INSERT INTO myTable (x, y) VALUES (x, y); SELECT LAST_INSERT_ID();");
````

## Execute a Command that return results with Transaction

````csharp
public static async Task<int[]> ExecuteAsync(this DbConnection connection, string[] sql, DbTransaction transaction, CancellationToken cancellationToken = default)
````

````csharp
var dbTransaction = await _mySqlConnection.BeginTransactionAsync();

var results = await connection.ExecuteAsync(new [] { "INSERT INTO myTable (x, y) VALUES (x, y); SELECT LAST_INSERT_ID();" }, { /* ... */ }, dbTransaction);
````

## Performance ~ 10k rows


````
BenchmarkDotNet=v0.13.5, OS=Windows 10 (10.0.19044.2965/21H2/November2021Update)
AMD Ryzen 5 3500X, 1 CPU, 6 logical and 6 physical cores
.NET SDK=8.0.100-preview.2.23157.25
[Host]     : .NET 7.0.5 (7.0.523.17405), X64 RyuJIT AVX2
DefaultJob : .NET 7.0.5 (7.0.523.17405), X64 RyuJIT AVX2
````

| ORM    | Method                        | Return           |            Mean |        StdDev |      Gen0 |     Gen1 |     Gen2 |  Allocated |
|--------|-------------------------------|------------------|----------------:|--------------:|----------:|---------:|---------:|-----------:|
| Breezy  | QueryAsync&lt;T&gt;           | No relation      |        491.1 ns |       4.08 ns |    0.0801 |        - |        - |      672 B |
| Dapper | QueryAsync&lt;T&gt;           | No relation      | 14,005,807.3 ns |  85,785.13 ns |  437.5000 | 265.6250 | 125.0000 |  3899691 B |
| Breezy  | QueryFirstOrDefault&lt;T&gt;  | No relation      |        589.8 ns |       7.28 ns |    0.0935 |        - |        - |      784 B |
| Dapper | QueryFirstOrDefault&lt;T&gt;  | No relation      |    540,714.1 ns |  44,717.07 ns |    0.9766 |        - |        - |    13081 B |
| Breezy  | QueryAsync&lt;T&gt;           | 1 To N relations |        588.5 ns |       9.26 ns |    0.0801 |        - |        - |      672 B |
| Dapper | QueryAsync&lt;T&gt;           | 1 To N relations | 98,695,865.6 ns | 740,908.87 ns | 2000.0000 | 833.3333 | 500.0000 | 17760052 B |
| Breezy  | QueryFirstOrDefault&lt;T&gt;  | 1 To N relations |        690.7 ns |      13.41 ns |    0.0935 |        - |        - |      784 B |
| Dapper | QueryFirstOrDefault&lt;T&gt;  | 1 To N relations | 14,866,187.7 ns | 385,888.24 ns |         - |        - |        - |    30835 B |



## Why Breezy ?

I wanted to offer similary fonctionalities faster than [`Dapper`](https://github.com/DapperLib/Dapper) with source generator
