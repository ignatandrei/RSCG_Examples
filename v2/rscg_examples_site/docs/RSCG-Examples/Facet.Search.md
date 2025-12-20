---
sidebar_position: 2500
title: 250 - Facet.Search
description: Generating search from C# clasess and properties
slug: /Facet.Search
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDatabase.mdx';

# Facet.Search  by Tim Maes


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Facet.Search?label=Facet.Search)](https://www.nuget.org/packages/Facet.Search/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Tim-Maes/Facet.Search?label=updated)](https://github.com/Tim-Maes/Facet.Search)
![GitHub Repo stars](https://img.shields.io/github/stars/Tim-Maes/Facet.Search?style=social)

## Details

### Info
:::info

Name: **Facet.Search**

Compile-time faceted search generation - attributes and source generators

Author: Tim Maes

NuGet: 
*https://www.nuget.org/packages/Facet.Search/*   


You can find more details at https://github.com/Tim-Maes/Facet.Search

Source: https://github.com/Tim-Maes/Facet.Search

:::

### Author
:::note
Tim Maes 
![Alt text](https://github.com/Tim-Maes.png)
:::

### Original Readme
:::note

# Facet.Search

[![CI](https://github.com/Tim-Maes/Facet.Search/actions/workflows/build.yml/badge.svg)](https://github.com/Tim-Maes/Facet.Search/actions/workflows/build.yml)
[![Test](https://github.com/Tim-Maes/Facet.Search/actions/workflows/test.yml/badge.svg)](https://github.com/Tim-Maes/Facet.Search/actions/workflows/test.yml)
[![CD](https://github.com/Tim-Maes/Facet.Search/actions/workflows/release.yml/badge.svg)](https://github.com/Tim-Maes/Facet.Search/actions/workflows/release.yml)
[![NuGet](https://img.shields.io/nuget/v/Facet.Search.svg)](https://www.nuget.org/packages/Facet.Search)
[![Downloads](https://img.shields.io/nuget/dt/Facet.Search.svg)](https://www.nuget.org/packages/Facet.Search)
[![GitHub](https://img.shields.io/github/license/Tim-Maes/Facet.Search.svg)](https://github.com/Tim-Maes/Facet.Search/blob/main/LICENSE.txt)
[![Discord](https://img.shields.io/discord/1443287393825329223?color=%237289da&label=Discord&logo=discord&logoColor=%237289da&style=flat-square)](https://discord.gg/yGDBhGuNMB)

**Compile-time faceted search generation for .NET**, Zero boilerplate, type-safe, and performant.

Facet.Search uses source generators to automatically create search filter classes, LINQ extension methods, facet aggregations, and metadata from your domain models, all at compile time with no runtime overhead.

## Features

- **Zero Boilerplate** - Just add attributes to your models  
- **Type-Safe** - All filters are compile-time checked  
- **Performant** - Generated code is as efficient as hand-written  
- **SQL Translated** - All filters execute on the database, not in memory  
- **EF Core Integration** - [Extensions for EF Core](https://github.com/Tim-Maes/Facet.Search/tree/master/src/Facet.Search.EFCore) & multiple DB providers 
- **Full-Text Search** - Built-in text search with multiple strategies  
- **Facet Aggregations** - Automatic counting and range detection  
- **Frontend Metadata** - Generate facet metadata for UI consumption  

## Installation

```bash
dotnet add package Facet.Search
```

For Entity Framework Core integration:
```bash
dotnet add package Facet.Search.EFCore
```

## Quick Start

### 1. Define Your Model

```csharp
using Facet.Search;

[FacetedSearch]
public class Product
{
    public int Id \{ get; set; }

    [FullTextSearch]
    public string Name \{ get; set; \} = null!;

    [FullTextSearch(Weight = 0.5f)]
    public string? Description \{ get; set; }

    [SearchFacet(Type = FacetType.Categorical, DisplayName = "Brand")]
    public string Brand \{ get; set; \} = null!;

    [SearchFacet(Type = FacetType.Range, DisplayName = "Price")]
    public decimal Price \{ get; set; }

    [SearchFacet(Type = FacetType.Boolean, DisplayName = "In Stock")]
    public bool InStock \{ get; set; }

    [SearchFacet(Type = FacetType.DateRange, DisplayName = "Created Date")]
    public DateTime CreatedAt \{ get; set; }
}
```

### 2. Use Generated Code

The source generator automatically creates:
- `ProductSearchFilter` > Filter class with all facet properties
- `ProductSearchExtensions` > LINQ extension methods
- `ProductFacetAggregations` > Aggregation results
- `ProductSearchMetadata` > Facet metadata for frontends

```csharp
using YourNamespace.Search;

// Create a filter
var filter = new ProductSearchFilter
{
    Brand = ["Apple", "Samsung"],
    MinPrice = 100m,
    MaxPrice = 1000m,
    InStock = true,
    SearchText = "laptop"
};

// Apply to any IQueryable<Product>
var results = products.AsQueryable()
    .ApplyFacetedSearch(filter)
    .ToList();

// Get facet aggregations
var aggregations = products.AsQueryable().GetFacetAggregations();
// aggregations.Brand = \{ "Apple": 5, "Samsung": 3, ... }
// aggregations.PriceMin = 99.99m
// aggregations.PriceMax = 2499.99m

// Access metadata for UI
foreach (var facet in ProductSearchMetadata.Facets)
{
    Console.WriteLine($"{facet.DisplayName} ({facet.Type})");
}
```

## How It Works with EF Core

**All generated filters are translated to SQL**, no client-side evaluation for facet filters.

| Filter Type | Generated Code | SQL Translation |
|-------------|---------------|-----------------|
| Categorical | `.Where(x => filter.Brand.Contains(x.Brand))` | `WHERE Brand IN ('Apple', 'Samsung')` |
| Range | `.Where(x => x.Price >= min && x.Price <= max)` | `WHERE Price >= @min AND Price <= @max` |
| Boolean | `.Where(x => x.InStock == true)` | `WHERE InStock = 1` |
| DateRange | `.Where(x => x.CreatedAt >= from)` | `WHERE CreatedAt >= @from` |
| Full-Text | `.Where(x => x.Name.Contains(term))` | `WHERE Name LIKE '%term%'` |

### Full-Text Search Strategies

By default, full-text search uses `LIKE '%term%'` which works with all databases but doesn't use full-text indexes. You can configure different strategies:

```csharp
[FacetedSearch(FullTextStrategy = FullTextSearchStrategy.LinqContains)]  // Default: LIKE '%term%'
[FacetedSearch(FullTextStrategy = FullTextSearchStrategy.SqlServerFreeText)]  // SQL Server FREETEXT
[FacetedSearch(FullTextStrategy = FullTextSearchStrategy.PostgreSqlFullText)]  // PostgreSQL tsvector
[FacetedSearch(FullTextStrategy = FullTextSearchStrategy.ClientSide)]  // In-memory (use with caution)
public class Product \{ }
```

| Strategy | Database | Requires Index | Performance |
|----------|----------|----------------|-------------|
| `LinqContains` | All | No | Slow on large data |
| `EfLike` | All | No | Same as LinqContains |
| `SqlServerFreeText` | SQL Server | FULLTEXT index | Fast |
| `SqlServerContains` | SQL Server | FULLTEXT index | Fast |
| `PostgreSqlFullText` | PostgreSQL | GIN index | Fast |
| `ClientSide` | N/A | No | Loads to memory |

## EF Core Integration

Use the `Facet.Search.EFCore` package for async operations:

```csharp
using Facet.Search.EFCore;

// Async search execution
var results = await dbContext.Products
    .ApplyFacetedSearch(filter)
    .ExecuteSearchAsync();

// Paginated results
var pagedResult = await dbContext.Products
    .ApplyFacetedSearch(filter)
    .ToPagedResultAsync(page: 1, pageSize: 20);

// pagedResult.Items, pagedResult.TotalCount, pagedResult.TotalPages

// Async facet aggregation
var brandCounts = await dbContext.Products
    .AggregateFacetAsync(p => p.Brand, limit: 10);

// Get min/max range
var (minPrice, maxPrice) = await dbContext.Products
    .GetRangeAsync(p => p.Price);
```

## Facet Types

| Type | Description | Generated Filter Properties |
|------|-------------|----------------------------|
| `Categorical` | Discrete values (Brand, Category) | `string[]? PropertyName` |
| `Range` | Numeric ranges (Price, Rating) | `decimal? MinPropertyName`, `decimal? MaxPropertyName` |
| `Boolean` | True/false filters (InStock) | `bool? PropertyName` |
| `DateRange` | Date/time ranges | `DateTime? PropertyNameFrom`, `DateTime? PropertyNameTo` |
| `Hierarchical` | Nested categories | `string[]? PropertyName` |

## Attributes Reference

### `[FacetedSearch]`

Marks a class for search generation.

```csharp
[FacetedSearch(
    FilterClassName = "CustomFilter",           // Custom filter class name
    GenerateAggregations = true,                // Generate aggregation methods
    GenerateMetadata = true,                    // Generate metadata class
    Namespace = "Custom.Namespace",             // Custom namespace for generated code
    FullTextStrategy = FullTextSearchStrategy.LinqContains  // Full-text search strategy
)]
public class Product \{ }
```

### `[SearchFacet]`

Marks a property as a filterable facet.

```csharp
[SearchFacet(
    Type = FacetType.Categorical,          // Facet type
    DisplayName = "Product Brand",         // UI display name
    OrderBy = FacetOrder.Count,            // Aggregation ordering (Count, Alphabetical)
    Limit = 10,                            // Max aggregation values
    DependsOn = "Category",                // Dependent facet
    IsHierarchical = false,                // Hierarchical category
    NavigationPath = "Category.Name",      // For navigation properties
    AutoInclude = true                     // Auto-include in EF Core queries
)]
public string Brand \{ get; set; }
```

### `[FullTextSearch]`

Marks a property for full-text search.

```csharp
[FullTextSearch(
    Weight = 1.0f,                         // Search relevance weight (higher = more important)
    CaseSensitive = false,                 // Case sensitivity
    Behavior = TextSearchBehavior.Contains // Match behavior: Contains, StartsWith, EndsWith, Exact
)]
public string Name \{ get; set; }
```

### `[Searchable]`

Marks a property as searchable but not a facet (useful for sorting).

```csharp
[Searchable(Sortable = true)]
public int Rating \{ get; set; }
```

## Navigation Properties

Filter on related entities by specifying the navigation path:

```csharp
public class Product
{
    [SearchFacet(
        Type = FacetType.Categorical,
        DisplayName = "Category",
        NavigationPath = "Category.Name"  // Filter on Category.Name
    )]
    public Category Category \{ get; set; }
}
```

## Generated Code Location

Generated files appear in your project's `obj` folder:
```
obj/Debug/net8.0/generated/Facet.Search.Generators/
> ProductSearchFilter.g.cs
> ProductSearchExtensions.g.cs
> ProductFacetAggregations.g.cs
> ProductSearchMetadata.g.cs
```

## Performance Tips

1. **Use database indexes** on facet columns for fast filtering
2. **Use full-text indexes** for text search on large datasets
3. **Apply filters before pagination** to reduce data transfer
4. **Cache aggregations** if they don't change frequently
5. **Use `Limit` on categorical facets** to avoid loading all distinct values

## Requirements

- .NET Standard 2.0+ (for Facet.Search)
- .NET 10+ (for Facet.Search.EFCore)
- C# 9.0+

## License

MIT License — see [LICENSE.txt](LICENSE.txt) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related Projects

- [Facet](https://github.com/Tim-Maes/Facet) — The Facet ecosystem


:::

### About
:::note

Generating search from C# clasess and properties


Integrating search in .NET applications


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Facet.Search**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Facet.Search" Version="0.1.1" />
    <PackageReference Include="Facet.Search.EFCore" Version="0.1.1" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet.Search\src\SearchDemo\Program.cs" label="Program.cs" >

  This is the use of **Facet.Search** in *Program.cs*

```csharp showLineNumbers 
using Microsoft.EntityFrameworkCore;
using SearchDemo;
using SearchDemo.Search;

var filter = new PersonSearchFilter
{
    DOBFrom = new DateTime(1970, 1, 1),
    DOBTo = new DateTime(1980, 12, 31),
    IsActive = true,
    MinSalary=1,
    MaxSalary= 10,
    SearchText= "Andrei"


};

MyAppContext cnt = new ();
var p= cnt.Person.ApplyFacetedSearch(filter);
var sql = p.ToQueryString();
Console.WriteLine(sql);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet.Search\src\SearchDemo\Person.cs" label="Person.cs" >

  This is the use of **Facet.Search** in *Person.cs*

```csharp showLineNumbers 
using Facet.Search;
using Microsoft.EntityFrameworkCore;

namespace SearchDemo;

[FacetedSearch]
public class Person
{
    public int Id \{ get; set; }
    [FullTextSearch]
    public string Name \{ get; set; }= string.Empty;
    
    [SearchFacet(Type = FacetType.DateRange, DisplayName = "Date Of Birth")]
    public DateTime DOB \{ get; set; }
    [SearchFacet(Type = FacetType.Range, DisplayName = "SalaryRange")]
    public int Salary \{ get; set; }
    [SearchFacet(Type = FacetType.Boolean, DisplayName = "IsEmployee")]
    public bool IsActive \{ get; set; }
}

public class MyAppContext : DbContext
{
    public MyAppContext()
    {
        this.Person =this.Set<Person>();
        //fake
        Person.Add(new Person() \{  
            DOB= new DateTime(1970,4,16),
             Id=1,
                IsActive=true,
                Name="Andrei Ignat",
                Salary= 3
        });
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=myServerAddress;Database=myDataBase;Trusted_Connection=True;");
        base.OnConfiguring(optionsBuilder);
    }
    public DbSet<Person> Person \{ get; set; \}  
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet.Search\src\SearchDemo\obj\GX\Facet.Search.Generators\Facet.Search.Generators.FacetSearchGenerator\PersonFacetAggregations.g.cs" label="PersonFacetAggregations.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SearchDemo.Search;

/// <summary>
/// Aggregated facet results for Person.
/// </summary>
public class PersonFacetResults
{
    public int? SalaryMin \{ get; set; }
    public int? SalaryMax \{ get; set; }
    public int IsActiveTrueCount \{ get; set; }
    public int IsActiveFalseCount \{ get; set; }
}

public static class PersonFacetAggregationExtensions
{
    /// <summary>
    /// Gets facet aggregations for Person.
    /// </summary>
    public static PersonFacetResults GetFacetAggregations(
        this System.Linq.IQueryable<SearchDemo.Person> query)
    {
        var results = new PersonFacetResults();

        if (query.Any())
        {
            results.SalaryMin = query.Min(x => x.Salary);
            results.SalaryMax = query.Max(x => x.Salary);
        }

        results.IsActiveTrueCount = query.Count(x => x.IsActive);
        results.IsActiveFalseCount = query.Count(x => !x.IsActive);

        return results;
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet.Search\src\SearchDemo\obj\GX\Facet.Search.Generators\Facet.Search.Generators.FacetSearchGenerator\PersonSearchExtensions.g.cs" label="PersonSearchExtensions.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System;
using System.Linq;

namespace SearchDemo.Search;

/// <summary>
/// Extension methods for searching Person.
/// </summary>
public static class PersonSearchExtensions
{
    /// <summary>
    /// Applies faceted search filtering to a queryable of Person.
    /// </summary>
    /// <remarks>
    /// Full-text search strategy: LinqContains
    /// All filters are translated to SQL and executed on the database server.
    /// </remarks>
    public static System.Linq.IQueryable<SearchDemo.Person> ApplyFacetedSearch(
        this System.Linq.IQueryable<SearchDemo.Person> query,
        PersonSearchFilter filter)
    {
        if (filter == null)
            return query;

        if (filter.DOBFrom.HasValue)
            query = query.Where(x => x.DOB >= filter.DOBFrom.Value);
        if (filter.DOBTo.HasValue)
            query = query.Where(x => x.DOB <= filter.DOBTo.Value);

        if (filter.MinSalary.HasValue)
            query = query.Where(x => x.Salary >= filter.MinSalary.Value);
        if (filter.MaxSalary.HasValue)
            query = query.Where(x => x.Salary <= filter.MaxSalary.Value);

        if (filter.IsActive.HasValue)
            query = query.Where(x => x.IsActive == filter.IsActive.Value);

        // Full-text search
        if (!string.IsNullOrWhiteSpace(filter.SearchText))
        {
            // Uses LINQ Contains() -> translates to SQL LIKE '%term%'
            var searchTerm = filter.SearchText.ToLower();
            query = query.Where(x => (x.Name != null && x.Name.ToLower().Contains(searchTerm)));
        }

        return query;
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet.Search\src\SearchDemo\obj\GX\Facet.Search.Generators\Facet.Search.Generators.FacetSearchGenerator\PersonSearchFilter.g.cs" label="PersonSearchFilter.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace SearchDemo.Search;

/// <summary>
/// Generated search filter for Person.
/// </summary>
public partial class PersonSearchFilter
{
    /// <summary>
    /// Filter by Date Of Birth.
    /// </summary>
    public System.DateTime? DOBFrom \{ get; set; }

    /// <summary>
    /// End date for DOB filter.
    /// </summary>
    public System.DateTime? DOBTo \{ get; set; }

    /// <summary>
    /// Filter by SalaryRange.
    /// </summary>
    public int? MinSalary \{ get; set; }

    /// <summary>
    /// Maximum Salary value.
    /// </summary>
    public int? MaxSalary \{ get; set; }

    /// <summary>
    /// Filter by IsEmployee.
    /// </summary>
    public bool? IsActive \{ get; set; }

    /// <summary>
    /// Full-text search query.
    /// </summary>
    public string? SearchText \{ get; set; }

}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet.Search\src\SearchDemo\obj\GX\Facet.Search.Generators\Facet.Search.Generators.FacetSearchGenerator\PersonSearchMetadata.g.cs" label="PersonSearchMetadata.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System.Collections.Generic;

namespace SearchDemo.Search;

/// <summary>
/// Facet metadata for Person.
/// </summary>
public class PersonFacetMetadata
{
    public string Name \{ get; set; \} = null!;
    public string PropertyName \{ get; set; \} = null!;
    public string DisplayName \{ get; set; \} = null!;
    public string Type \{ get; set; \} = null!;
    public bool IsHierarchical \{ get; set; }
    public string? DependsOn \{ get; set; }
    public string OrderBy \{ get; set; \} = null!;
    public int Limit \{ get; set; }
    public string? RangeIntervals \{ get; set; }
}

/// <summary>
/// Metadata about searchable facets for Person.
/// </summary>
public static class PersonSearchMetadata
{
    public static IReadOnlyList<PersonFacetMetadata> Facets \{ get; \} = new[]
    {
        new PersonFacetMetadata
        {
            Name = "DOB",
            PropertyName = "DOB",
            DisplayName = "Date Of Birth",
            Type = "DateRange",
            IsHierarchical = false,
            OrderBy = "Count",
            Limit = 0,
        },
        new PersonFacetMetadata
        {
            Name = "Salary",
            PropertyName = "Salary",
            DisplayName = "SalaryRange",
            Type = "Range",
            IsHierarchical = false,
            OrderBy = "Count",
            Limit = 0,
        },
        new PersonFacetMetadata
        {
            Name = "IsActive",
            PropertyName = "IsActive",
            DisplayName = "IsEmployee",
            Type = "Boolean",
            IsHierarchical = false,
            OrderBy = "Count",
            Limit = 0,
        },
    };
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Facet.Search ](/sources/Facet.Search.zip)

:::


### Share Facet.Search 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet.Search&quote=Facet.Search" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet.Search&text=Facet.Search:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet.Search" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet.Search&title=Facet.Search" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet.Search&title=Facet.Search&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet.Search" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Facet.Search

<SameCategory />

