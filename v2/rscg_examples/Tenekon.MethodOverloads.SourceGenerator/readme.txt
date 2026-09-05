# Tenekon.MethodOverloads.SourceGenerator

[![Build](https://github.com/tenekon/Tenekon.MethodOverloads.SourceGenerator/actions/workflows/coverage.yml/badge.svg?branch=main)](https://github.com/tenekon/Tenekon.MethodOverloads.SourceGenerator/actions/workflows/coverage.yml)
[![NuGet](https://img.shields.io/nuget/v/Tenekon.MethodOverloads.SourceGenerator.svg)](https://www.nuget.org/packages/Tenekon.MethodOverloads.SourceGenerator)
[![Codecov](https://codecov.io/gh/tenekon/Tenekon.MethodOverloads.SourceGenerator/branch/main/graph/badge.svg)](https://codecov.io/gh/tenekon/Tenekon.MethodOverloads.SourceGenerator)
[![License](https://img.shields.io/github/license/tenekon/Tenekon.MethodOverloads.SourceGenerator.svg)](LICENSE)

A C# source generator that creates extension overloads by treating a selected parameter window as optional and emitting legal, unique subsequences. It supports matchers, bucketized output, visibility overrides, subsequence strategies, and generic substitution via `SupplyParameterType`.

## Install

```xml
<ItemGroup>
  <PackageReference Include="Tenekon.MethodOverloads.SourceGenerator" Version="x.y.z" PrivateAssets="all" />
</ItemGroup>
```

## Quickstart

1. Add `[GenerateOverloads]` to a method, or `[GenerateMethodOverloads(Matchers = ...)]` to a type.
2. (Optional) Add `[OverloadGenerationOptions(...)]` to control matching and output.
3. Build. Generated code appears as `MethodOverloads_<Namespace>*.g.cs`.

## Core Concepts

- **Window**: the parameter range that can be omitted to produce overloads.
- **ExcludeAny**: a list of parameter names that must be omitted in every overload within the window.
- **Matchers**: define windows on matcher methods and apply them to target methods.
- **Bucketization**: route generated methods into a specific static partial class.
- **SupplyParameterType**: substitute method type parameters with concrete types before generation.

## Examples

### 1) Basic Window

Input:
```csharp
namespace Demo;

using Tenekon.MethodOverloads;

public sealed class OrderService
{
    [GenerateOverloads(Begin = nameof(tenantId))]
    public void CreateOrder(string orderId, string tenantId, bool requireApproval) { }
}
```

Output:
```csharp
namespace Demo;

public static class MethodOverloads
{
    public static void CreateOrder(this OrderService source, string orderId) =>
        source.CreateOrder(orderId, tenantId: default(string), requireApproval: default(bool));

    public static void CreateOrder(this OrderService source, string orderId, string tenantId) =>
        source.CreateOrder(orderId, tenantId, requireApproval: default(bool));

    public static void CreateOrder(this OrderService source, string orderId, bool requireApproval) =>
        source.CreateOrder(orderId, tenantId: default(string), requireApproval);
}
```

### 2) Window Variants

Use `Begin`, `End`, `BeginExclusive`, `EndExclusive`, or the constructor `GenerateOverloads(string beginEnd)`.

```csharp
[GenerateOverloads(BeginExclusive = nameof(start), End = nameof(end))]
public void Query(int start, int end, bool includeMetadata, string? tag) { }
```

### 3) ExcludeAny (Forced Omissions)

ExcludeAny forces specific parameters inside the window to be omitted in every generated overload.

```csharp
[GenerateOverloads(Begin = nameof(optionalA), End = nameof(optionalC), ExcludeAny = [nameof(optionalB)])]
public void Configure(int required, string? optionalA, string? optionalB, string? optionalC) { }
```

Notes:
- `ExcludeAny` cannot be combined with `Matchers` on the same attribute.
- If ExcludeAny covers the whole window, no overloads are generated for that attribute.

### 4) Matcher-Based Generation (Method-Level)

Input:
```csharp
namespace Demo;

using Tenekon.MethodOverloads;

public sealed class UserService
{
    [GenerateOverloads(Matchers = [typeof(UserMatchers)])]
    public void UpdateUser(string id, string name, int level, bool active) { }
}

internal interface UserMatchers
{
    [GenerateOverloads(nameof(paramB))]
    void UpdateUser(int paramA, bool paramB);
}
```

Output:
```csharp
namespace Demo;

public static class MethodOverloads
{
    public static void UpdateUser(this UserService source, string id, string name, int level) =>
        source.UpdateUser(id, name, level, active: default(bool));
}
```

### 5) Matcher-Based Generation (Type-Level + Static Target)

Input:
```csharp
namespace Demo;

using Tenekon.MethodOverloads;

[GenerateMethodOverloads(Matchers = [typeof(MathMatchers)])]
public static class MathUtils
{
    public static void Multiply(int left, int right, bool checkedOverflow) { }
}

internal interface MathMatchers
{
    [GenerateOverloads(nameof(paramB))]
    void Multiply(int paramA, bool paramB);
}
```

Output:
```csharp
namespace Demo;

public static class MethodOverloads
{
    extension(MathUtils)
    {
        public static void Multiply(int left, int right) =>
            MathUtils.Multiply(left, right, checkedOverflow: default(bool));
    }
}
```

### 6) Range Anchor Match Mode

`RangeAnchorMatchMode.TypeOnly` (default) matches by type only.  
`RangeAnchorMatchMode.TypeAndName` requires matching names as well.

```csharp
[OverloadGenerationOptions(RangeAnchorMatchMode = RangeAnchorMatchMode.TypeAndName)]
[GenerateOverloads(Matchers = [typeof(ServiceMatchers)])]
public void Call(string id, string name, bool active) { }
```

### 7) Subsequence Strategy

`OverloadSubsequenceStrategy.UniqueBySignature` (default) generates all unique overloads.  
`OverloadSubsequenceStrategy.PrefixOnly` generates only prefix omissions.

```csharp
[OverloadGenerationOptions(SubsequenceStrategy = OverloadSubsequenceStrategy.PrefixOnly)]
[GenerateOverloads(Begin = nameof(optionalA))]
public void Configure(int required, string? optionalA, bool optionalB) { }
```

### 8) Overload Visibility

```csharp
[OverloadGenerationOptions(OverloadVisibility = OverloadVisibility.Internal)]
[GenerateOverloads(Begin = nameof(optionalA))]
public void Configure(int required, string? optionalA, bool optionalB) { }
```

### 9) Bucketization (Scoped Static Classes)

Route generated overloads into a specific static partial class:

```csharp
public static partial class MyBucket
{
}

[OverloadGenerationOptions(BucketType = typeof(MyBucket))]
[GenerateOverloads(Begin = nameof(optionalA))]
public void Configure(int required, string? optionalA, bool optionalB) { }
```

Output:
```csharp
public static partial class MyBucket
{
    public static void Configure(this /* target type */ source, int required) =>
        source.Configure(required, optionalA: default(string), optionalB: default(bool));
}
```

### 10) SupplyParameterType (Generic Substitution)

Replace method type parameters with concrete types in generated overloads and invocations.

```csharp
public sealed class Constraint { }

public interface IService<T> { }

public sealed class Api
{
    [GenerateOverloads(nameof(optionalObject))]
    [SupplyParameterType(nameof(TConstraint), typeof(Constraint))]
    public void Use<TConstraint>(IService<TConstraint>? service, object? optionalObject) { }
}
```

Output:
```csharp
public static class MethodOverloads
{
    public static void Use(this Api source, IService<Constraint>? service) =>
        source.Use<Constraint>(service, default(object?));
}
```

If only some method type parameters are supplied, the overload stays generic for the remaining ones.

### 11) Generic Containing Types

Containing type type parameters and constraints are preserved on generated overloads.

```csharp
public sealed class Container<T> where T : class, new()
{
    [GenerateOverloads(nameof(optionalObject))]
    public void Create(T value, object? optionalObject) { }
}
```

Generated overloads keep `T` and its constraints.

## MSBuild Options

Emit attributes only (skip generation and diagnostics):
```xml
<PropertyGroup>
  <TenekonMethodOverloadsSourceGeneratorAttributesOnly>true</TenekonMethodOverloadsSourceGeneratorAttributesOnly>
</PropertyGroup>
```

## Diagnostics

Diagnostics are reported by the analyzer and surfaced during build:

- `MOG001` Invalid window anchor.
- `MOG002` Matcher has no subsequence match.
- `MOG003` Defaults inside window.
- `MOG004` Params outside window.
- `MOG005` Ref/out/in omitted.
- `MOG006` Duplicate signature skipped.
- `MOG007` Conflicting window anchors (BeginEnd vs Begin/End).
- `MOG008` Redundant Begin and End.
- `MOG009` Begin and BeginExclusive conflict.
- `MOG010` End and EndExclusive conflict.
- `MOG011` Parameterless target method.
- `MOG012` Matchers + window anchors conflict.
- `MOG013` Invalid bucket type.
- `MOG014` Invalid SupplyParameterType usage.
- `MOG015` SupplyParameterType refers to missing type parameter.
- `MOG016` Conflicting SupplyParameterType mappings.
- `MOG017` Matchers + ExcludeAny conflict.
- `MOG018` ExcludeAny refers to missing/out-of-window parameter.
- `MOG019` ExcludeAny contains invalid entries.

You can downgrade error-level diagnostics in `.globalconfig` if you need the project to compile with intentional violations.

## Generation Rules (Summary)

- Only ordinary, non-private methods are eligible.
- Window omissions cannot drop `ref/out/in` parameters.
- `params` must be inside the optional window to be omitted.
- Existing method signatures are not duplicated.
- Defaults inside the window are not allowed.
- Matcher usages are emitted only when the matcher type is at least `internal`.

## Docs

See `docs/generator.md` for detailed behavior and `docs/acceptance-criterias.md` for the acceptance project structure.
