# LayeredCraft.OptimizedEnums

**LayeredCraft.OptimizedEnums** is a modular C# .NET library providing high-performance, AOT-safe smart enum patterns using source generation. Inherit from a base class and the generator produces O(1) lookup tables, collection properties, and factory methods — all at compile time with zero reflection at runtime.

## Key Features

- **Zero reflection** — all lookup tables are source-generated at compile time
- **AOT / trimming friendly** — compatible with NativeAOT, ReadyToRun, and Blazor WASM
- **O(1) lookups** — `FromName`, `FromValue`, `ContainsName`, `ContainsValue`
- **Compile-time validation** — errors for missing `partial`, duplicate values/names
- **No allocations per call** — all collections are statically cached
- **Inheritance-based triggering** — no attribute required, just inherit and go

## 📦 Packages

| Package | NuGet | Downloads |
|---------|-------|-----------|
| **LayeredCraft.OptimizedEnums** | [![NuGet](https://img.shields.io/nuget/v/LayeredCraft.OptimizedEnums.svg)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums) | [![Downloads](https://img.shields.io/nuget/dt/LayeredCraft.OptimizedEnums.svg)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums/) |
| **LayeredCraft.OptimizedEnums.SystemTextJson** | [![NuGet](https://img.shields.io/nuget/v/LayeredCraft.OptimizedEnums.SystemTextJson.svg)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums.SystemTextJson) | [![Downloads](https://img.shields.io/nuget/dt/LayeredCraft.OptimizedEnums.SystemTextJson.svg)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums.SystemTextJson/) |
| **LayeredCraft.OptimizedEnums.EFCore** | [![NuGet](https://img.shields.io/nuget/v/LayeredCraft.OptimizedEnums.EFCore.svg)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums.EFCore) | [![Downloads](https://img.shields.io/nuget/dt/LayeredCraft.OptimizedEnums.EFCore.svg)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums.EFCore/) |
| **LayeredCraft.OptimizedEnums.Dapper** | _coming soon_ | |
| **LayeredCraft.OptimizedEnums.AutoFixture** | _coming soon_ | |

[![Build Status](https://github.com/LayeredCraft/optimized-enums/actions/workflows/build.yaml/badge.svg)](https://github.com/LayeredCraft/optimized-enums/actions/workflows/build.yaml)

## Usage

```csharp
public sealed partial class OrderStatus : OptimizedEnum<OrderStatus, int>
{
    public static readonly OrderStatus Pending = new(1, nameof(Pending));
    public static readonly OrderStatus Paid    = new(2, nameof(Paid));
    public static readonly OrderStatus Shipped = new(3, nameof(Shipped));

    private OrderStatus(int value, string name) : base(value, name) { }
}
```

Or use the `int`-defaulting convenience base class:

```csharp
public sealed partial class Priority : OptimizedEnum<Priority>
{
    public static readonly Priority Low    = new(1, nameof(Low));
    public static readonly Priority Medium = new(2, nameof(Medium));
    public static readonly Priority High   = new(3, nameof(High));

    private Priority(int value, string name) : base(value, name) { }
}
```

The source generator produces:

```csharp
// Lookup
var status = OrderStatus.FromName("Paid");       // OrderStatus.Paid
var status = OrderStatus.FromValue(3);           // OrderStatus.Shipped

// Try-style
OrderStatus.TryFromName("Paid", out var result);
OrderStatus.TryFromValue(3, out var result);

// Membership
OrderStatus.ContainsName("Paid");   // true
OrderStatus.ContainsValue(99);      // false

// Enumeration
IReadOnlyList<OrderStatus> all    = OrderStatus.All;
IReadOnlyList<string>      names  = OrderStatus.Names;
IReadOnlyList<int>         values = OrderStatus.Values;
int count = OrderStatus.Count;      // compile-time constant
```

## Performance

Benchmarks run on Apple M3 Max, .NET 9.0.8, BenchmarkDotNet v0.14.0.

| Method        | Mean     | Allocated |
|-------------- |---------:|----------:|
| FromName      | 5.48 ns  | 0 B       |
| TryFromName   | 4.53 ns  | 0 B       |
| FromValue     | 2.18 ns  | 0 B       |
| TryFromValue  | 1.21 ns  | 0 B       |
| ContainsName  | 4.54 ns  | 0 B       |
| ContainsValue | 1.18 ns  | 0 B       |
| GetAll        | 0.76 ns  | 0 B       |
| GetCount      | ~0 ns    | 0 B       |

All lookups are O(1) via statically-cached dictionaries. `Count` is a compile-time constant.

## JSON Serialization

Add `LayeredCraft.OptimizedEnums.SystemTextJson` for source-generated, zero-reflection `JsonConverter` support. One package is all you need — it pulls in the core package automatically:

```bash
dotnet add package LayeredCraft.OptimizedEnums.SystemTextJson
```

Decorate your class with `[OptimizedEnumJsonConverter]` and the generator emits a concrete, AOT-safe converter and wires it up via `[JsonConverter]`:

```csharp
using LayeredCraft.OptimizedEnums;
using LayeredCraft.OptimizedEnums.SystemTextJson;

[OptimizedEnumJsonConverter(OptimizedEnumJsonConverterType.ByName)]
public sealed partial class OrderStatus : OptimizedEnum<OrderStatus, int>
{
    public static readonly OrderStatus Pending = new(1, nameof(Pending));
    public static readonly OrderStatus Paid    = new(2, nameof(Paid));
    public static readonly OrderStatus Shipped = new(3, nameof(Shipped));

    private OrderStatus(int value, string name) : base(value, name) { }
}
```

```json
{ "status": "Pending" }
```

Two strategies are available: `ByName` (serializes as the member name string) and `ByValue` (serializes as the underlying value). See the [JSON Serialization docs](https://layeredcraft.github.io/optimized-enums/usage/json-serialization/) for full details.

## Entity Framework Core

Add `LayeredCraft.OptimizedEnums.EFCore` for source-generated, zero-reflection EF Core value converter support. One package is all you need — it pulls in the core package automatically:

```bash
dotnet add package LayeredCraft.OptimizedEnums.EFCore
```

Decorate your class with `[OptimizedEnumEfCore]` and the generator emits concrete `ValueConverter` classes and registration helpers:

```csharp
using LayeredCraft.OptimizedEnums;
using LayeredCraft.OptimizedEnums.EFCore;

[OptimizedEnumEfCore(OptimizedEnumEfCoreStorage.ByValue)]
public sealed partial class OrderStatus : OptimizedEnum<OrderStatus, int>
{
    public static readonly OrderStatus Pending = new(1, nameof(Pending));
    public static readonly OrderStatus Paid    = new(2, nameof(Paid));
    public static readonly OrderStatus Shipped = new(3, nameof(Shipped));

    private OrderStatus(int value, string name) : base(value, name) { }
}
```

Register conversions with the global convention hook in your `DbContext`:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder builder)
{
    builder.ConfigureOptimizedEnums();
}
```

Two strategies are available: `ByValue` (stores the underlying value) and `ByName` (stores the member name string). See the [Entity Framework Core docs](https://layeredcraft.github.io/optimized-enums/usage/ef-core/) for full details.

## Installation

```bash
dotnet add package LayeredCraft.OptimizedEnums
```

Supports **.NET 8.0**, **.NET 9.0**, **.NET 10.0**.

## Documentation

Full documentation is available at the [LayeredCraft.OptimizedEnums docs site](https://layeredcraft.github.io/optimized-enums).

## License

MIT
