[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://stand-with-ukraine.pp.ua)

## Terms of use<sup>[?](https://github.com/Tyrrrz/.github/blob/master/docs/why-so-political.md)</sup>

By using this project or its source code, for any purpose and in any shape or form, you grant your **implicit agreement** to all the following statements:

- You **condemn Russia and its military aggression against Ukraine**
- You **recognize that Russia is an occupant that unlawfully invaded a sovereign state**
- You **support Ukraine's territorial integrity, including its claims over temporarily occupied territories of Crimea and Donbas**
- You **reject false narratives perpetuated by Russian state propaganda**

To learn more about the war and how you can help, [click here](https://stand-with-ukraine.pp.ua). Glory to Ukraine!

# AlephMapper

[![NuGet](https://img.shields.io/nuget/v/AlephMapper.svg)](https://www.nuget.org/packages/AlephMapper)
[![NuGet Downloads](https://img.shields.io/nuget/dt/AlephMapper.svg)](https://www.nuget.org/packages/AlephMapper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

AlephMapper is a C# source generator for reusable manual mappings. Write one expression-bodied mapping method and generate companion methods for EF Core projections and optional update-in-place mapping from the same code.

Use it when you want hand-written mapping logic without maintaining a separate `Expression<Func<...>>` for queries or a second method for updating existing objects.

## Features

- **Single-source mappings** - use one mapping method for runtime mapping, query projection, and update variants.
- **EF Core-friendly projections** - generate `Expression<Func<TSource, TDestination>>` methods for `.Select(...)`.
- **Method inlining** - reuse small helper methods in mappings and let AlephMapper inline them into generated code.
- **Configurable null handling** - choose how null-conditional access (`?.`) is handled in generated expressions.
- **Update-in-place mapping** - mutate existing destination instances, including EF Core tracked entities.

## Install

Using the .NET CLI:

```bash
dotnet add package AlephMapper
```

Using `PackageReference`:

```xml
<PackageReference Include="AlephMapper" Version="0.5.5">
  <PrivateAssets>all</PrivateAssets>
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
</PackageReference>
```

With Central Package Management:

```xml
<!-- Directory.Packages.props -->
<PackageVersion Include="AlephMapper" Version="0.5.5" />

<!-- Project file -->
<PackageReference Include="AlephMapper">
  <PrivateAssets>all</PrivateAssets>
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
</PackageReference>
```

When referencing AlephMapper directly from source, add it as an analyzer-only project reference:

```xml
<ProjectReference Include="..\path\to\AlephMapper.csproj"
                  OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false" />
```

`PrivateAssets="all"` keeps AlephMapper from flowing transitively to consumers of your library, and `IncludeAssets` ensures the analyzer/source-generator assets are available at build time.

## Requirements

- Mapping methods must be `static`, expression-bodied, and declared in a `static partial` class.

## Quick Start

Add `using AlephMapper;`, then mark a mapping method or mapper class with `[Expressive]`.

```csharp
using AlephMapper;

public static partial class PersonMapper
{
    [Expressive]
    public static PersonDto MapToPerson(Employee employee) => new()
    {
        Id = employee.EmployeeId,
        FullName = GetFullName(employee),
        Email = employee.ContactInfo.Email,
        Department = employee.Department.Name
    };

    public static string GetFullName(Employee employee) =>
        employee.FirstName + " " + employee.LastName;
}
```

AlephMapper generates a projection companion method:

```csharp
public static partial class PersonMapper
{
    public static Expression<Func<Employee, PersonDto>> MapToPersonExpression() =>
        employee => new PersonDto
        {
            Id = employee.EmployeeId,
            FullName = employee.FirstName + " " + employee.LastName,
            Email = employee.ContactInfo.Email,
            Department = employee.Department.Name
        };
}
```

Use the generated expression in EF Core queries:

```csharp
var people = await dbContext.Employees
    .Select(PersonMapper.MapToPersonExpression())
    .ToListAsync();
```

Use the original method for in-memory mapping:

```csharp
var employee = GetEmployee();
var dto = PersonMapper.MapToPerson(employee);
```

## Null Handling

C# null-conditional access (`?.`) is not directly supported in expression trees. AlephMapper lets you choose how to handle it.

```csharp
[Expressive(NullConditionalRewrite = NullConditionalRewrite.Rewrite)]
public static partial class PersonMapper
{
    public static PersonSummary GetSummary(Person person) => new()
    {
        Name = person.Name,
        City = person.Address?.City,
        HasAddress = person.Address != null
    };
}
```

Available policies:

| Policy | Behavior |
| --- | --- |
| `None` | Reports unsupported null-conditional usage. |
| `Ignore` | Removes null-conditional access, for example `person.Address?.City` becomes `person.Address.City`. |
| `Rewrite` | Emits explicit null checks, for example `person.Address != null ? person.Address.City : null`. |

`Ignore` is the default. Use `Rewrite` when you want generated expressions to preserve null-safe behavior.

## Update Existing Objects

Mark a mapping with `[Updatable]` to generate an overload that writes into an existing destination instance.

```csharp
using AlephMapper;

public static partial class PersonMapper
{
    [Updatable]
    public static Person MapToPerson(PersonUpdateDto dto) => new()
    {
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Email = dto.Email
    };
}
```

Generated usage:

```csharp
var person = await db.People.FindAsync(id);

PersonMapper.MapToPerson(dto, target: person);

await db.SaveChangesAsync();
```

This is useful with EF Core change tracking because the tracked entity instance is preserved.

Collection properties are skipped by default. To update collections, configure the policy:

```csharp
[Updatable(CollectionProperties = CollectionPropertiesPolicy.Update)]
public static Person MapToPerson(PersonUpdateDto dto) => new()
{
    Orders = dto.Orders.Select(OrderMapper.MapToOrder).ToList()
};
```

## How It Works

For each `[Expressive]` method, AlephMapper generates a method named `<OriginalMethodName>Expression()` returning `Expression<Func<...>>`.

```csharp
public static PersonDto MapToPerson(Employee employee) => ...

public static Expression<Func<Employee, PersonDto>> MapToPersonExpression() => ...
```

For each `[Updatable]` method, AlephMapper generates an overload with a `target` parameter.

```csharp
public static PersonDto MapToPerson(Employee employee) => ...

public static PersonDto MapToPerson(Employee employee, PersonDto target) => ...
```

Helper methods in the same mapper class are inlined where possible.

## Supported Mapping Shape

Methods must be:

- expression-bodied (`=>`)
- `static`
- declared in a `static partial` class
- visible to the source generator in the current compilation

AlephMapper is best suited for object initializer mappings and small helper methods that can be inlined into generated expressions.

## Troubleshooting

### Generated method is missing

Check that the mapper class is `static partial`, the method is expression-bodied, and the method or containing class has `[Expressive]` or `[Updatable]`.

### NullReferenceException after using `?.`

The default null policy is `Ignore`, which removes null-conditional access in generated expressions. Use:

```csharp
[Expressive(NullConditionalRewrite = NullConditionalRewrite.Rewrite)]
```

### Updatable mapping is skipped for value types

`[Updatable]` is intended for reference-type destinations. Value types are copied by value, so update-in-place semantics are not useful.

### Circular helper calls

Generation is skipped when AlephMapper detects circular references between mapping/helper methods. Break the cycle or keep part of the logic outside the generated mapping path.

### Inspect generated code

Add this to your project file:

```xml
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>
```

Generated files are emitted under the compiler-generated files output directory for your project.

## Comparison

| Tool | Main style | AlephMapper difference |
| --- | --- | --- |
| AutoMapper | Runtime configuration and conventions | AlephMapper keeps mappings as ordinary C# methods. |
| Mapster | Convention/configuration mapping with code generation options | AlephMapper focuses on source-generating companions from manual mappings. |
| EntityFrameworkCore.Projectables | Projectable members for EF Core | AlephMapper targets mapping methods and update overloads. |
| Expressionify | Expression expansion | AlephMapper is mapping-oriented and also supports update-in-place generation. |

## Examples

- [Sample app](examples/SampleApp) - richer mapping examples.
- [Integration tests](tests/AlephMapper.IntegrationTests) - EF Core and generated behavior coverage.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make the change.
4. Add or update tests.
5. Run the test suite.
6. Open a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Inspired by [EntityFrameworkCore.Projectables](https://github.com/koenbeuk/EntityFrameworkCore.Projectables) and [Expressionify](https://github.com/ClaveConsulting/Expressionify).
- Thanks to all [contributors](https://github.com/Raffinert/AlephMapper/graphs/contributors).

## Related Projects

- [EntityFrameworkCore.Projectables](https://github.com/koenbeuk/EntityFrameworkCore.Projectables)
- [Expressionify](https://github.com/ClaveConsulting/Expressionify)
- [AutoMapper](https://automapper.org/)
- [Mapster](https://github.com/MapsterMapper/Mapster)
- [Facet](https://github.com/Tim-Maes/Facet)
