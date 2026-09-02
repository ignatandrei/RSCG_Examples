# ![M](https://github.com/najlot/Map/blob/main/images/icon.png) Najlot.Map

Najlot.Map is a high-performance object mapping library for .NET built around explicit mapping methods.
Instead of convention-heavy auto-mapping, it keeps mapping logic in normal C# methods so behavior stays readable, predictable, and easy to review.
When you want less boilerplate, you can add the optional source generator and keep the same programming model.

Najlot.Map is a good fit when you want:

* explicit mappings instead of hidden conventions,
* strong runtime performance without magic in the hot path,
* a single `IMap` entry point for object, collection, async, and queryable mapping,
* the option to scale from handwritten methods to generated mappings.

---

## Why Najlot.Map

* Unlike convention-based mappers, mapping behavior lives in regular C# methods you can read, debug, and review directly.
* Unlike tools that rely on runtime magic, Najlot.Map keeps the hot path explicit and lets you add source generation only when it helps.
* Unlike broad auto-mapping defaults, it favors predictable registrations and validation so mapping changes are easier to catch in tests or startup checks.

---

## What It Does

* Explicit method-based mappings
* Central `IMap` container
* Object, collection, nullable, and async enumerable mapping
* `IQueryable<T>` projections through expressions
* Optional Roslyn source generator
* Validation for delegate-based mappings in tests
* Factory-based object creation for DI or custom activation

---

## Packages

Najlot.Map is distributed as two NuGet packages:

| Package | Description |
| --- | --- |
| `Najlot.Map` | Core runtime, attributes, registration, validation, and mapping APIs |
| `Najlot.Map.SourceGenerator` | Optional compile-time generation for mapping methods and registration |

---

## Installation

Install the runtime package:

```bash
dotnet add package Najlot.Map
```

Add the source generator when you want compile-time generated mappings:

```bash
dotnet add package Najlot.Map.SourceGenerator
```

---

## Core Model

* Mappings are regular methods, not configuration files.
* `IMap` is the single entry point for registration and execution.
* Public mapping methods can be discovered and registered automatically.
* Generated mappings follow the same runtime API as handwritten mappings.
* Validation is meant for tests and startup checks, not the request path.

---

## Quick Start

### 1. Write mapping methods

```csharp
using Najlot.Map;
using Najlot.Map.Attributes;

internal class UserMappings
{
    [MapIgnoreProperty(nameof(User.Password))]
    public void MapModelToUser(IMap map, UserModel from, User to)
    {
        to.Id = from.Id;
        to.Username = from.Username;
        to.Features = map
            .From<UserFeatureModel>(from.Features)
            .ToList<UserFeature>();
    }

    [MapIgnoreProperty(nameof(UserModel.Password))]
    public UserModel MapUserToModel(IMap map, User from) => new()
    {
        Id = from.Id,
        Username = from.Username,
        Features = map
            .From<UserFeature>(from.Features)
            .To<UserFeatureModel>()
    };

    [MapIgnoreMethod]
    public Guid IgnoredMethod(UserModel from) => from.Id;
}
```

### 2. Register the mappings

```csharp
var map = new Map()
    .Register<UserMappings>();
```

If your mapping classes need custom construction, register a factory:

```csharp
var map = new Map()
    .RegisterFactory(type => serviceProvider.GetRequiredService(type))
    .Register<UserMappings>();
```

### 3. Map objects and collections

```csharp
var user = map.From(userModel).To<User>();
var users = map.From(userModels).To<User>().ToList();
```

---

## Registration Options

### Manual registration

Register a class and let Najlot.Map inspect its public methods:

```csharp
var map = new Map()
    .Register<UserMappings>();
```

Supported method shapes include:

```csharp
void Map(TFrom from, TTo to)
void Map(IMap map, TFrom from, TTo to)
TTo Map(TFrom from)
TTo Map(IMap map, TFrom from)
Expression<Func<TFrom, TTo>> Projection()
```

### Generated registration

When using `Najlot.Map.SourceGenerator`, classes marked with `[Mapping]` get picked up and the generator emits an assembly-specific extension method named `Register{AssemblyName}Mappings()`.

```csharp
var map = new Map()
    .RegisterMyProjectMappings();
```

If generated mapping classes need constructor injection, the same `RegisterFactory(...)` hook applies.

---

## Source Generator

The source generator keeps the same explicit programming model while removing repetitive mapping code.

```csharp
using Najlot.Map;
using Najlot.Map.Attributes;

[Mapping]
public partial class UserMappings
{
    public partial void MapUser(IMap map, UserModel from, User to);
    public partial void MapFeature(IMap map, UserFeatureModel from, UserFeature to);

    public DateTime ConvertToUtc(DateTimeOffset offset) => offset.UtcDateTime;
}
```

Usage:

```csharp
var map = new Map()
    .RegisterMyProjectMappings();

var user = map.From(userModel).To<User>();
```

Use the generator when you want to reduce boilerplate but still keep mappings explicit, typed, and reviewable.

---

## Validation

`Validate()` checks registered delegate-based mappings and throws `MapMissPropertiesException` when destination properties are left unmapped and not explicitly ignored.

```csharp
var map = new Map()
    .Register<UserMappings>();

map.Validate();
```

Recommended usage:

* unit tests,
* integration tests,
* application startup checks.

Validation does not cover expression-based mappings used for `IQueryable<T>` projections.

---

## Queryable Projections

For `IQueryable<T>` scenarios such as Entity Framework Core, register an expression mapping so the provider can translate it.

```csharp
using System.Linq.Expressions;
using Najlot.Map.Attributes;

[Mapping]
public partial class UserMappings
{
    public static partial Expression<Func<User, UserListItem>> ToListItem();
}
```

Usage:

```csharp
var map = new Map()
    .RegisterMyProjectMappings();

var query = map.From(db.Users).To<UserListItem>();
var items = await query.ToListAsync();
```

Use delegate mappings for in-memory object graphs.
Use expression mappings when the projection needs to stay provider-translatable.

---

## Design Principles

Najlot.Map is intentionally not a convention-over-configuration auto-mapper.
Its value is in making mappings obvious and controllable while still giving you enough tooling to keep the codebase fast and maintainable as it grows.

That means:

* explicit code over implicit behavior,
* predictable runtime behavior over hidden fallback rules,
* optional generation over mandatory framework ceremony.

---

## License

MIT License