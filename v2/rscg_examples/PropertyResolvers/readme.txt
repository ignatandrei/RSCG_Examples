# PropertyResolvers

A C# source generator that creates type-safe property resolver classes. Instead of using reflection at runtime to extract property values from objects, PropertyResolvers generates compile-time switch expressions that efficiently resolve property values across multiple types.

## Installation

```bash
dotnet add package PropertyResolvers
```

## Quick Start

1. Add assembly-level attributes to specify which properties you want resolvers for:

```csharp
using PropertyResolvers.Attributes;

[assembly: GeneratePropertyResolver("AccountId")]
[assembly: GeneratePropertyResolver("TenantId")]
```

2. The generator automatically finds all types with matching properties and generates resolver classes:

```csharp
// Generated code (AccountIdResolver.g.cs)
public static class AccountIdResolver
{
    public static string? GetAccountId(object? obj) => obj switch
    {
        global::MyApp.Order x => x.AccountId.ToString(),
        global::MyApp.Customer x => x.AccountId.ToString(),
        global::MyApp.Invoice x => x.AccountId.ToString(),
        _ => null
    };
}
```

3. Use the generated resolvers in your code:

```csharp
var order = new Order { AccountId = "ACC-123" };
var customer = new Customer { AccountId = "ACC-456" };
var product = new Product { Name = "Widget" }; // No AccountId property

var id1 = AccountIdResolver.GetAccountId(order);    // "ACC-123"
var id2 = AccountIdResolver.GetAccountId(customer); // "ACC-456"
var id3 = AccountIdResolver.GetAccountId(product);  // null
```

## Use Cases

- **Multi-tenant applications**: Extract `TenantId` from any entity without reflection
- **Audit logging**: Consistently retrieve identifier properties across different entity types
- **Event sourcing**: Extract aggregate IDs from various event types
- **API responses**: Normalize property access across different DTO types

## Configuration Options

### Basic Usage

```csharp
[assembly: GeneratePropertyResolver("AccountId")]
```

### Namespace Filtering

Include only specific namespaces:

```csharp
[assembly: GeneratePropertyResolver("AccountId", IncludeNamespaces = new[] { "MyApp.Domain", "MyApp.Entities" })]
```

Exclude specific namespaces:

```csharp
[assembly: GeneratePropertyResolver("AccountId", ExcludeNamespaces = new[] { "System", "Microsoft" })]
```

### Multiple Resolvers

You can generate resolvers for multiple properties:

```csharp
[assembly: GeneratePropertyResolver("AccountId", ExcludeNamespaces = new[] { "System", "Microsoft" })]
[assembly: GeneratePropertyResolver("TenantId", ExcludeNamespaces = new[] { "System", "Microsoft" })]
[assembly: GeneratePropertyResolver("EntityId", ExcludeNamespaces = new[] { "System", "Microsoft" })]
```

## Attribute Reference

### `GeneratePropertyResolverAttribute`

| Parameter | Type | Description |
|-----------|------|-------------|
| `propertyName` | `string` | **(Required)** The name of the property to generate a resolver for. Case-insensitive matching. |
| `IncludeNamespaces` | `string[]?` | Only include types from these namespaces (prefix match). |
| `ExcludeNamespaces` | `string[]?` | Exclude types from these namespaces (prefix match). |

## Analyzer

The package includes an analyzer that detects duplicate property resolver definitions:

```csharp
// PR001: Property resolver for 'AccountId' is already defined
[assembly: GeneratePropertyResolver("AccountId")]
[assembly: GeneratePropertyResolver("AccountId")]  // Error: duplicate
```

Duplicate detection is case-insensitive, so `"AccountId"` and `"accountid"` are considered duplicates.

## How It Works

1. The generator scans all assembly-level `GeneratePropertyResolver` attributes
2. For each attribute, it finds all classes and structs with a matching property name
3. It generates a static resolver class with a switch expression that pattern-matches on the object type
4. The generated code uses `global::` prefixes to avoid namespace conflicts

## Generated Code Location

The generated resolver classes are placed in a namespace matching your assembly name. For example, if your assembly is `MyApp`, the resolvers will be in the `MyApp` namespace.

## Requirements

- .NET Standard 2.0 compatible (works with .NET Framework 4.7.2+ and .NET Core 2.0+)
- C# 9.0 or later (for switch expressions in generated code)
- Visual Studio 2022 17.0+ or compatible IDE with Roslyn 4.0+ support

## License

MIT
