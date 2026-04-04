# LoMapper

**A tiny, focused object mapper** — Generate mapping code at compile time using Roslyn Source Generators.

[![NuGet](https://img.shields.io/nuget/v/LoMapper.svg)](https://www.nuget.org/packages/LoMapper/)
[![NuGet Downloads](https://img.shields.io/nuget/dt/LoMapper.svg)](https://www.nuget.org/packages/LoMapper/)
[![Build Status](https://github.com/jdtoon/lomapper/actions/workflows/ci.yml/badge.svg)](https://github.com/jdtoon/lomapper/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET](https://img.shields.io/badge/.NET-Standard%202.0+-purple.svg)](https://dotnet.microsoft.com/)
[![GitHub Stars](https://img.shields.io/github/stars/jdtoon/lomapper?style=social)](https://github.com/jdtoon/lomapper)

## What is LoMapper?

LoMapper is a small library that generates mapping code at compile time, saving you from writing repetitive property-by-property assignments by hand.

**Benefits:**
- ✅ **Less boilerplate** — Stop writing manual property assignments
- ✅ **Compile-time safety** — Catch mapping issues during build, not at runtime
- ✅ **Zero runtime overhead** — No reflection, no scanning, just generated code
- ✅ **Debuggable** — F12 into generated code like it's your own
- ✅ **Simple** — Just add attributes to partial classes

## Quick Start

### Installation

```bash
dotnet add package LoMapper
```

### Basic Usage

```csharp
using LoMapper;

// 1. Define your types
public class UserEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// 2. Create a mapper
[Mapper]
public partial class UserMapper
{
    public partial UserDto Map(UserEntity entity);
}

// 3. Use it
var mapper = new UserMapper();
var dto = mapper.Map(entity);
```

That's it! The `Map` method is generated at compile time with property-by-property assignment.

## Features

### Property Mapping
Properties are matched by name (case-insensitive):

```csharp
public class Source { public int ID { get; set; } }
public class Target { public int Id { get; set; } }  // ✅ Matched
```

### Custom Property Mapping
Rename properties or apply transforms:

```csharp
[Mapper]
public partial class UserMapper
{
    [MapProperty("FirstName", "FullName")]
    [MapProperty("BirthDate", "Age", Transform = nameof(CalculateAge))]
    public partial UserDto Map(UserEntity entity);

    private int CalculateAge(DateTime birthDate) 
        => DateTime.Today.Year - birthDate.Year;
}
```

### Ignore Properties
Skip properties you don't want mapped:

```csharp
[Mapper]
public partial class UserMapper
{
    [MapIgnore("InternalId")]
    [MapIgnore("CacheKey")]
    public partial UserDto Map(UserEntity entity);
}
```

### Flatten Properties
Map nested object properties to flat target properties:

```csharp
[Mapper]
public partial class UserMapper
{
    [FlattenProperty("Address.City", nameof(UserDto.AddressCity))]
    [FlattenProperty("Address.ZipCode", nameof(UserDto.AddressZipCode))]
    public partial UserDto Map(UserEntity entity);
}
```

Features:
- ✅ Deep nesting support (e.g., `Order.Customer.Address.City`)
- ✅ Null-safe navigation (`?.`) automatically generated
- ✅ Type-safe with compile-time validation
- ✅ Works with both reference and value types
- ✅ Combine with `[MapProperty]` and `[MapIgnore]`

### Lifecycle Hooks (BeforeMap / AfterMap)
Run code before or after mapping to validate inputs, set defaults, or audit results:

```csharp
[Mapper]
public partial class UserMapper
{
    [BeforeMap(nameof(ValidateUser))]
    [AfterMap(nameof(AuditUser))]
    public partial UserDto Map(UserEntity entity);

    private void ValidateUser(UserEntity entity)
    {
        if (string.IsNullOrWhiteSpace(entity.Email)) throw new InvalidOperationException("Email required");
    }

    private void AuditUser(UserDto dto) => dto.Tags = dto.Tags.Append("mapped").ToArray();
}
```

Hooks execute in order: `BeforeMap` runs before object creation and property assignments; `AfterMap` runs after the target is fully constructed (including constructor-based mappings).

### Nested Objects
For nested objects, declare explicit mapper methods:

```csharp
[Mapper]
public partial class OrderMapper
{
    public partial OrderDto Map(OrderEntity entity);
    public partial CustomerDto Map(CustomerEntity entity);  // Used for nested Customer
    public partial AddressDto Map(AddressEntity entity);    // Used for nested Address
}
```

### Collections
Full support for collections — `List<T>`, `IEnumerable<T>`, `Dictionary<K,V>`, `HashSet<T>`, and arrays:

```csharp
public class Source { public List<ItemEntity> Items { get; set; } }
public class Target { public List<ItemDto> Items { get; set; } }  // ✅ Auto-mapped
```

### Circular Reference Detection
LoMapper detects mapper graphs that contain cycles and stops the build with diagnostic `LOM010` so you can break the loop early.

```csharp
[Mapper]
public partial class CircularMapper
{
    public partial TargetA Map(SourceA source);
    public partial TargetB Map(SourceB source);
}

public class SourceA { public SourceB? Child { get; set; } }
public class SourceB { public SourceA? Parent { get; set; } }

public class TargetA { public TargetB? Child { get; set; } }
public class TargetB { public TargetA? Parent { get; set; } }
```

Mapping these types produces LOM010 describing the cycle. Break one side (e.g., ignore a property or change the DTO shape) to proceed.

## Compile-Time Diagnostics

LoMapper catches mapping issues **before your code runs**:

| Code | Severity | Description |
|------|----------|-------------|
| LOM001 | ⚠️ Warning | Target property has no matching source property |
| LOM002 | ❌ Error | Property types are incompatible |
| LOM003 | ❌ Error | Nested object requires mapper method |
| LOM004 | ❌ Error | Invalid transform method signature |
| LOM005 | ❌ Error | Source property not found |
| LOM006 | ❌ Error | Target property not found |
| LOM007 | ❌ Error | Invalid flatten property path |
| LOM008 | ❌ Error | Flatten target property not found |
| LOM009 | ❌ Error | Flatten type mismatch |
| LOM010 | ❌ Error | Circular reference detected in mapper graph |

Example:
```csharp
public class Source { public int Id { get; set; } }
public class Target { public int Id { get; set; } public string Extra { get; set; } }

// ⚠️ LOM001: Target property 'Extra' has no matching source property
```

## Benchmarks

**Performance**

LoMapper generates efficient code that performs well. Benchmark results mapping 10,000 objects:

| Method     | Mean       | Memory    |
|------------|------------|-----------|
| **LoMapper**   | **174 μs** | 781 KB    |
| Manual     | 208 μs     | 781 KB    |

*LoMapper matches the performance and memory characteristics of hand-written mapping code.*

The generated code uses straightforward property assignments with no reflection or runtime overhead. For most applications, the performance is more than sufficient and comparable to writing the mappings yourself.

<details>
<summary>Full Benchmark Details (Click to expand)</summary>

Tested on Intel Core i7-10870H, .NET 8.0.23, Windows 11 using BenchmarkDotNet v0.14.0.

**100 items:** 1.67 μs  
**1,000 items:** 15.5 μs  
**10,000 items:** 174 μs

The generated code produces clean IL that the JIT compiler can optimize effectively. Zero allocations beyond the mapped objects themselves.

[Full Results](BenchmarkDotNet.Artifacts/results/)
</details>
```bash
cd benchmarks/LoMapper.Benchmarks
dotnet run -c Release
```

## View Generated Code

Enable generated file output in your `.csproj`:

```xml
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>
```

Find generated files in: `obj/GeneratedFiles/LoMapper.Generator/`

## Comparison

| Feature | LoMapper | Manual Code |
|---------|:--------:|:-----------:|
| **Performance (10K items)** | **174 μs** | 208 μs |
| Memory overhead | **0%** | - |
| Compile-time generation | ✅ | N/A |
| Zero runtime reflection | ✅ | ✅ |
| Compile-time error detection | ✅ | ✅ |
| IntelliSense support | ✅ | ✅ |
| Nested object mapping | ✅ | ✅ |
| Collection mapping | ✅ | ✅ |
| Custom transforms | ✅ | ✅ |
| Flattening/unflattening | ✅ v0.3 | Manual |
| Projection (IQueryable) | 🔜 v1.0 | Manual |

## Why Use LoMapper?

**vs Writing Mappings Manually:**
- Less repetitive code to write and maintain
- Compile-time validation catches errors early
- Automatic updates when models change
- Similar or better performance

**When LoMapper Might Help:**
- You have many DTOs to map
- You want compile-time safety without runtime cost
- You prefer code generation over reflection
- You like seeing exactly what code runs (F12 into generated code)

**Current Limitations:**
- Expression projection for IQueryable not yet supported (planned for v1.0)
- Some advanced mapping scenarios may need manual code

LoMapper is a focused tool that does one thing well: generate simple, efficient mapping code. It's meant to complement your toolkit, not replace everything else.

## Requirements

- .NET Standard 2.0+ (runs on .NET Core 3.1+, .NET 5+, .NET Framework 4.7.2+)
- C# 9.0+ (for partial methods)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**LoMapper** — A tiny tool to help you write less mapping code.
