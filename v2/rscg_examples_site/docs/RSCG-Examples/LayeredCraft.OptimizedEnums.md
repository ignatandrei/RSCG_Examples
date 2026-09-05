---
sidebar_position: 2920
title: 292 - LayeredCraft.OptimizedEnums
description: A new way to define enums - and efficiently manage them
slug: /LayeredCraft.OptimizedEnums
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# LayeredCraft.OptimizedEnums  by LayeredCraft


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/LayeredCraft.OptimizedEnums?label=LayeredCraft.OptimizedEnums)](https://www.nuget.org/packages/LayeredCraft.OptimizedEnums/)
[![GitHub last commit](https://img.shields.io/github/last-commit/layeredcraft/optimized-enums?label=updated)](https://github.com/layeredcraft/optimized-enums)
![GitHub Repo stars](https://img.shields.io/github/stars/layeredcraft/optimized-enums?style=social)

## Details

### Info
:::info

Name: **LayeredCraft.OptimizedEnums**

High-performance alternative to SmartEnum using source generation. Provides zero-reflection, AOT-safe enum types with compile-time validation and O(1) lookup tables.

Author: LayeredCraft

NuGet: 
*https://www.nuget.org/packages/LayeredCraft.OptimizedEnums/*   


You can find more details at https://github.com/layeredcraft/optimized-enums

Source: https://github.com/layeredcraft/optimized-enums

:::

### Author
:::note
LayeredCraft 
![Alt text](https://github.com/layeredcraft.png)
:::

## Original Readme
:::note

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

    private OrderStatus(int value, string name) : base(value, name) \{ }
}
```

Or use the `int`-defaulting convenience base class:

```csharp
public sealed partial class Priority : OptimizedEnum<Priority>
{
    public static readonly Priority Low    = new(1, nameof(Low));
    public static readonly Priority Medium = new(2, nameof(Medium));
    public static readonly Priority High   = new(3, nameof(High));

    private Priority(int value, string name) : base(value, name) \{ }
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

    private OrderStatus(int value, string name) : base(value, name) \{ }
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

    private OrderStatus(int value, string name) : base(value, name) \{ }
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


:::

### About
:::note

A new way to define enums - and efficiently manage them


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **LayeredCraft.OptimizedEnums**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

  <ItemGroup>
    <PackageReference Include="LayeredCraft.OptimizedEnums" Version="1.4.4" />
  </ItemGroup>
  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LayeredCraft.OptimizedEnums\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **LayeredCraft.OptimizedEnums** in *Program.cs*

```csharp showLineNumbers 
using EnumDemo;

CarTypes dacia1 = CarTypes.Dacia;
var dacia2 = CarTypes.FromName("Dacia");
Console.WriteLine($"CarTypes {CarTypes.Count}: {dacia1} {dacia2} ");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LayeredCraft.OptimizedEnums\src\EnumDemo\CarTypes.cs" label="CarTypes.cs" >

  This is the use of **LayeredCraft.OptimizedEnums** in *CarTypes.cs*

```csharp showLineNumbers 
using LayeredCraft.OptimizedEnums;

namespace EnumDemo;
public sealed partial class CarTypes : OptimizedEnum<CarTypes, int>
{
    public static readonly CarTypes None = new(0, nameof(None));
    public static readonly CarTypes Dacia = new(1, nameof(Dacia));
    public static readonly CarTypes Tesla = new(2, nameof(Tesla));
    public static readonly CarTypes BMW = new(3, nameof(BMW));
    public static readonly CarTypes Mercedes = new(4, nameof(Mercedes));
    private CarTypes(int value, string name) : base(value, name) \{ }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LayeredCraft.OptimizedEnums\src\EnumDemo\obj\GX\LayeredCraft.OptimizedEnums.Generator\LayeredCraft.OptimizedEnums.Generator.OptimizedEnumGenerator\EnumDemo.CarTypes.g.cs" label="EnumDemo.CarTypes.g.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

namespace EnumDemo;

[global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
partial class CarTypes
{
    private static readonly global::System.Collections.ObjectModel.ReadOnlyCollection<global::EnumDemo.CarTypes> s_all =
        global::System.Array.AsReadOnly(new global::EnumDemo.CarTypes[]
        {
            None,
            Dacia,
            Tesla,
            BMW,
            Mercedes
        });

    private static readonly global::System.Collections.ObjectModel.ReadOnlyCollection<string> s_names =
        global::System.Array.AsReadOnly(new string[]
        {
            None.Name,
            Dacia.Name,
            Tesla.Name,
            BMW.Name,
            Mercedes.Name
        });

    private static readonly global::System.Collections.ObjectModel.ReadOnlyCollection<int> s_values =
        global::System.Array.AsReadOnly(new int[]
        {
            None.Value,
            Dacia.Value,
            Tesla.Value,
            BMW.Value,
            Mercedes.Value
        });

    private static readonly global::System.Collections.Generic.Dictionary<string, global::EnumDemo.CarTypes> s_byName =
        new global::System.Collections.Generic.Dictionary<string, global::EnumDemo.CarTypes>(5, global::System.StringComparer.Ordinal)
        {
            [None.Name] = None,
            [Dacia.Name] = Dacia,
            [Tesla.Name] = Tesla,
            [BMW.Name] = BMW,
            [Mercedes.Name] = Mercedes
        };

    private static readonly global::System.Collections.Generic.Dictionary<int, global::EnumDemo.CarTypes> s_byValue =
        new global::System.Collections.Generic.Dictionary<int, global::EnumDemo.CarTypes>(5)
        {
            [None.Value] = None,
            [Dacia.Value] = Dacia,
            [Tesla.Value] = Tesla,
            [BMW.Value] = BMW,
            [Mercedes.Value] = Mercedes
        };

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static global::System.Collections.Generic.IReadOnlyList<global::EnumDemo.CarTypes> All => s_all;

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static global::System.Collections.Generic.IReadOnlyList<string> Names => s_names;

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static global::System.Collections.Generic.IReadOnlyList<int> Values => s_values;

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public const int Count = 5;

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static global::EnumDemo.CarTypes FromName(string name)
    {
        if (!s_byName.TryGetValue(name, out var result))
            throw new global::System.Collections.Generic.KeyNotFoundException(
                $"'{name}' is not a valid name for CarTypes");

        return result;
    }

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static bool TryFromName(string name, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out global::EnumDemo.CarTypes? result) =>
        s_byName.TryGetValue(name, out result);

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static global::EnumDemo.CarTypes FromValue(int value)
    {
        if (!s_byValue.TryGetValue(value, out var result))
            throw new global::System.Collections.Generic.KeyNotFoundException(
                $"'{value}' is not a valid value for CarTypes");

        return result;
    }

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static bool TryFromValue(int value, [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out global::EnumDemo.CarTypes? result) =>
        s_byValue.TryGetValue(value, out result);

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static bool ContainsName(string name) => s_byName.ContainsKey(name);

    [global::System.CodeDom.Compiler.GeneratedCode("LayeredCraft.OptimizedEnums.Generator", "1.4.4.0")]
    public static bool ContainsValue(int value) => s_byValue.ContainsKey(value);
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LayeredCraft.OptimizedEnums\src\EnumDemo\obj\GX\Porticle.Enumly\Porticle.Enumly.EnumlyGenerator\EnumDemo.Mapper.EnumMapper.g.cs" label="EnumDemo.Mapper.EnumMapper.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace EnumDemo;

public static partial class Mapper
{
    public static partial global::EnumDemo.TypesCar ToTypesCar(global::EnumDemo.CarTypes value)
    {
        return value switch
        {
            global::EnumDemo.CarTypes.None => global::EnumDemo.TypesCar.CarNone,
            global::EnumDemo.CarTypes.Dacia => global::EnumDemo.TypesCar.CarDacia,
            global::EnumDemo.CarTypes.Tesla => global::EnumDemo.TypesCar.CarTesla,
            global::EnumDemo.CarTypes.BMW => global::EnumDemo.TypesCar.CarBMW,
            global::EnumDemo.CarTypes.Mercedes => global::EnumDemo.TypesCar.CarMercedes,
            _ => throw new global::System.ArgumentOutOfRangeException(nameof(value), value, $"The value of enum \"EnumDemo.CarTypes\" is not supported."),
        };
    }

    public static partial global::EnumDemo.CarTypes ToCarTypes(global::EnumDemo.TypesCar value)
    {
        return value switch
        {
            global::EnumDemo.TypesCar.CarNone => global::EnumDemo.CarTypes.None,
            global::EnumDemo.TypesCar.CarDacia => global::EnumDemo.CarTypes.Dacia,
            global::EnumDemo.TypesCar.CarTesla => global::EnumDemo.CarTypes.Tesla,
            global::EnumDemo.TypesCar.CarBMW => global::EnumDemo.CarTypes.BMW,
            global::EnumDemo.TypesCar.CarMercedes => global::EnumDemo.CarTypes.Mercedes,
            _ => throw new global::System.ArgumentOutOfRangeException(nameof(value), value, $"The value of enum \"EnumDemo.TypesCar\" is not supported."),
        };
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LayeredCraft.OptimizedEnums\src\EnumDemo\obj\GX\Porticle.Enumly\Porticle.Enumly.EnumlyGenerator\EnumMapperAttributes.g.cs" label="EnumMapperAttributes.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace Porticle.Enumly
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    internal sealed class EnumlyClassAttribute : global::System.Attribute \{ }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
    internal sealed class EnumlyMapAttribute : global::System.Attribute
    {
        /// <summary>
        /// Value of the source enum that should be mapped to <c>null</c> on the target side.
        /// Only meaningful when the target return type is a nullable enum.
        /// </summary>
        public object? NullSourceValue \{ get; set; }

        /// <summary>
        /// Value of the target enum that is produced when the source value is <c>null</c>.
        /// Only meaningful when the source parameter type is a nullable enum.
        /// </summary>
        public object? NullTargetValue \{ get; set; }

        /// <summary>
        /// When <c>true</c>, a <c>null</c> source value throws
        /// <see cref="global::System.ArgumentNullException"/> at runtime instead of
        /// producing a target. Only meaningful when the source parameter type is a
        /// nullable enum. Mutually exclusive with <see cref="NullTargetValue"/>.
        /// </summary>
        public bool IgnoreNullSource \{ get; set; }
    }

    /// <summary>
    /// Defines an explicit source-&gt;target enum value mapping for special cases.
    /// Can be applied multiple times. Overrides by-name matching for the given source value.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = true, Inherited = false)]
    internal sealed class EnumlyMapValueAttribute : global::System.Attribute
    {
        public EnumlyMapValueAttribute(object source, object target) \{ }
    }

    /// <summary>
    /// Marks a value of the source enum as intentionally unmapped. Suppresses the
    /// 'no matching target member' diagnostic (EM0001) for that value. At runtime
    /// the ignored value will throw <see cref="global::System.ArgumentOutOfRangeException"/>
    /// with a message identifying it as explicitly excluded.
    /// Can be applied multiple times.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = true, Inherited = false)]
    internal sealed class EnumlyIgnoreSourceAttribute : global::System.Attribute
    {
        public EnumlyIgnoreSourceAttribute(object value) \{ }
    }

    /// <summary>
    /// Marks a value of the target enum as intentionally unreachable. Suppresses
    /// the 'target value is not produced by any source mapping' diagnostic
    /// (EM0008) for that value. Can be applied multiple times.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = true, Inherited = false)]
    internal sealed class EnumlyIgnoreTargetAttribute : global::System.Attribute
    {
        public EnumlyIgnoreTargetAttribute(object value) \{ }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project LayeredCraft.OptimizedEnums ](/sources/LayeredCraft.OptimizedEnums.zip)

:::


### Share LayeredCraft.OptimizedEnums 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLayeredCraft.OptimizedEnums&quote=LayeredCraft.OptimizedEnums" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLayeredCraft.OptimizedEnums&text=LayeredCraft.OptimizedEnums:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLayeredCraft.OptimizedEnums" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLayeredCraft.OptimizedEnums&title=LayeredCraft.OptimizedEnums" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLayeredCraft.OptimizedEnums&title=LayeredCraft.OptimizedEnums&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLayeredCraft.OptimizedEnums" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/LayeredCraft.OptimizedEnums

<SameCategory />

