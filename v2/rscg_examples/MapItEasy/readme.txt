# MapItEasy

Simple and fast object mapper (using Expression Trees API and Source Generators) to map data between 2 objects which have identical (or nearly identical) shapes.

## Use Cases
- Cloning.
- Data archiving (moving data from the active table to the archived table).

## Installation

Install the package from NuGet:

```bash
dotnet add package MapItEasy
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package MapItEasy
```

## Getting Started

### Using `IMapper`

```csharp
IMapper mapper = new ExpressionMapper();
// or
IMapper mapper = new ReflectionMapper();
```

#### Map all properties (return new object)
```csharp
var source = new A { Id = 1, Name = "abc1", Description = "xyz1" };

var target = mapper.Map<A, B>(source);
```

#### Map all properties (existing object)
```csharp
var source = new A { Id = 1, Name = "abc1", Description = "xyz1" };
var target = new B();

mapper.Map(source, target);
```

#### Map only selected properties
```csharp
var source = new A { Id = 1, Name = "abc1", Description = "xyz1" };
var target = new B();

mapper.Map(source, target, new MappingOptions<A> { Include = x => new { x.Name } });
// target.Id == 0, target.Name == "abc1", target.Description == null
```

#### Map all properties except selected ones
```csharp
var source = new A { Id = 1, Name = "abc1", Description = "xyz1" };
var target = new B();

mapper.Map(source, target, new MappingOptions<A> { Exclude = x => new { x.Name } });
// target.Id == 1, target.Name == null, target.Description == "xyz1"
```

> **Note:** `Include` and `Exclude` cannot be used together. Doing so will throw an `InvalidOperationException`.

### Using Extension Methods

`MapperExtensions` provides convenient extension methods using `ExpressionMapper` under the hood:

```csharp
var source = new A { Id = 1, Name = "abc1", Description = "xyz1" };

// Return new object
var target = source.Map<A, B>();

// Map to existing object
var target2 = new B();
source.Map(target2);

// With options
source.Map(target2, new MappingOptions<A> { Include = x => new { x.Name } });
```

## Source Generator

For **zero-reflection, compile-time mapping**, install the source generator package:

```bash
dotnet add package MapItEasy.Generators
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package MapItEasy.Generators
```

Define `partial` methods decorated with the `[GeneratedMapping]` attribute, and the source generator will provide the implementation at compile time:

```csharp
using MapItEasy;

public static partial class MappingExtensions
{
    // Return a new mapped object
    [GeneratedMapping]
    public static partial B MapToB(A source);

    // Map to an existing object
    [GeneratedMapping]
    public static partial void MapToB(A source, B target);

    // Extension method - return a new mapped object
    [GeneratedMapping]
    public static partial B ToB(this A source);

    // Extension method - map to an existing object
    [GeneratedMapping]
    public static partial void ToB(this A source, B target);

    // With MappingOptions support
    [GeneratedMapping]
    public static partial B MapToB(A source, MappingOptions<A>? options = null);

    [GeneratedMapping]
    public static partial void MapToB(A source, B target, MappingOptions<A>? options = null);
}
```

Usage:

```csharp
var source = new A { Id = 1, Name = "abc1", Description = "xyz1" };

// Static call
var target = MappingExtensions.MapToB(source);

// Extension method call
var target2 = source.ToB();

// Map to existing object via extension method
var target3 = new B();
source.ToB(target3);

// With MappingOptions
var target4 = MappingExtensions.MapToB(source, new MappingOptions<A> { Include = x => new { x.Name } });
```

## License
**MapItEasy** is licensed under the [MIT](/LICENSE) license.
