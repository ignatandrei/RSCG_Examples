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
    public int Id { get; set; }

    [FullTextSearch]
    public string Name { get; set; } = null!;

    [FullTextSearch(Weight = 0.5f)]
    public string? Description { get; set; }

    [SearchFacet(Type = FacetType.Categorical, DisplayName = "Brand")]
    public string Brand { get; set; } = null!;

    [SearchFacet(Type = FacetType.Range, DisplayName = "Price")]
    public decimal Price { get; set; }

    [SearchFacet(Type = FacetType.Boolean, DisplayName = "In Stock")]
    public bool InStock { get; set; }

    [SearchFacet(Type = FacetType.DateRange, DisplayName = "Created Date")]
    public DateTime CreatedAt { get; set; }
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
// aggregations.Brand = { "Apple": 5, "Samsung": 3, ... }
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
public class Product { }
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
public class Product { }
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
public string Brand { get; set; }
```

### `[FullTextSearch]`

Marks a property for full-text search.

```csharp
[FullTextSearch(
    Weight = 1.0f,                         // Search relevance weight (higher = more important)
    CaseSensitive = false,                 // Case sensitivity
    Behavior = TextSearchBehavior.Contains // Match behavior: Contains, StartsWith, EndsWith, Exact
)]
public string Name { get; set; }
```

### `[Searchable]`

Marks a property as searchable but not a facet (useful for sorting).

```csharp
[Searchable(Sortable = true)]
public int Rating { get; set; }
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
    public Category Category { get; set; }
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
