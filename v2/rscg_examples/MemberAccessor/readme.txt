# BunnyTail.MemberAccessor

[![NuGet](https://img.shields.io/nuget/v/BunnyTail.MemberAccessor.svg)](https://www.nuget.org/packages/BunnyTail.MemberAccessor)

## Reference

Add reference to BunnyTail.MemberAccessor to csproj.

```xml
  <ItemGroup>
    <PackageReference Include="BunnyTail.MemberAccessor" Version="1.2.0" />
  </ItemGroup>
```

## MemberAccessor

### Source

```csharp
using BunnyTail.MemberAccessor;

[GenerateAccessor]
public partial class Data
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;
}
```

```csharp
using BunnyTail.MemberAccessor;

var accessorFactory = AccessorRegistry.FindFactory<Data>();
var getter = accessorFactory.CreateGetter<int>(nameof(Data.Id));
var setter = accessorFactory.CreateSetter<int>(nameof(Data.Id));

var data = new Data();
setter(data, 123);
var id = getter(data);
```

## Benchmark

```
BenchmarkDotNet v0.14.0, Windows 11 (10.0.26100.2894)
AMD Ryzen 9 5900X, 1 CPU, 24 logical and 12 physical cores
.NET SDK 9.0.102
  [Host]     : .NET 9.0.1 (9.0.124.61010), X64 RyuJIT AVX2
  DefaultJob : .NET 9.0.1 (9.0.124.61010), X64 RyuJIT AVX2
```
| Method           | Mean      | Error     | StdDev    | Min       | Max       | P90       | Code Size | Allocated |
|----------------- |----------:|----------:|----------:|----------:|----------:|----------:|----------:|----------:|
| DirectGetter     | 0.2180 ns | 0.0033 ns | 0.0027 ns | 0.2144 ns | 0.2231 ns | 0.2222 ns |      10 B |         - |
| ExpressionGetter | 1.0868 ns | 0.0143 ns | 0.0134 ns | 1.0737 ns | 1.1127 ns | 1.1095 ns |      54 B |         - |
| GeneratorGetter  | 0.2244 ns | 0.0020 ns | 0.0019 ns | 0.2219 ns | 0.2283 ns | 0.2269 ns |      72 B |         - |
| DirectSetter     | 0.2155 ns | 0.0009 ns | 0.0008 ns | 0.2138 ns | 0.2167 ns | 0.2165 ns |      28 B |         - |
| ExpressionSetter | 1.0956 ns | 0.0219 ns | 0.0225 ns | 1.0716 ns | 1.1393 ns | 1.1260 ns |      57 B |         - |
| GeneratorSetter  | 0.4306 ns | 0.0014 ns | 0.0012 ns | 0.4284 ns | 0.4328 ns | 0.4323 ns |      80 B |         - |
