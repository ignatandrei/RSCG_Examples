---
sidebar_position: 2720
title: 272 - AlephMapper
description: AlephMapper helps you define LINQ-translatable object mappers for EF Core.
slug: /AlephMapper
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDatabase.mdx';

# AlephMapper  by Yevhen Cherkes


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/AlephMapper?label=AlephMapper)](https://www.nuget.org/packages/AlephMapper/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Raffinert/AlephMapper?label=updated)](https://github.com/Raffinert/AlephMapper)
![GitHub Repo stars](https://img.shields.io/github/stars/Raffinert/AlephMapper?style=social)

## Details

### Info
:::info

Name: **AlephMapper**

Source generator for creating projectable companions

Author: Yevhen Cherkes

NuGet: 
*https://www.nuget.org/packages/AlephMapper/*   


You can find more details at https://github.com/Raffinert/AlephMapper

Source: https://github.com/Raffinert/AlephMapper

:::

### Author
:::note
Yevhen Cherkes 
![Alt text](https://github.com/Raffinert.png)
:::

## Original Readme
:::note

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


:::

### About
:::note

AlephMapper helps you define LINQ-translatable object mappers for EF Core.


It turns a normal C# mapping method into an expression that can be embedded in queries, so your entity-to-DTO projection can run inside the database query instead of after materialization.


This is useful for cleaner projection code, avoiding hand-written select expressions, and keeping mapping logic reusable across queries.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AlephMapper**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="AlephMapper" Version="0.5.5">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
		<PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="10.0.9" />
		<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.9">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
		<PackageReference Include="Microsoft.EntityFrameworkCore" Version="10.0.9" />
		<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="10.0.9" />

	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AlephMapper\src\EntityDemo\Program.cs" label="Program.cs" >

  This is the use of **AlephMapper** in *Program.cs*

```csharp showLineNumbers 
using EntityDemo;

Console.WriteLine("Hello, World!");
DbContextOptionsBuilder<DotNetStatsContext> optionsBuilder = new();
//optionsBuilder.UseInMemoryDatabase("StatsDatabase");
optionsBuilder.UseSqlite("Data Source=stats.db");
var cnt = new DotNetStatsContext(optionsBuilder.Options);
await cnt.Database.EnsureCreatedAsync();
Console.WriteLine("Database created");

var projDTO = cnt.Projects
    .Select(ProjectExtensions.ProjToDTOExpression());
Console.WriteLine(projDTO.ToQueryString());
var result = await projDTO.ToArrayAsync();
    
Console.WriteLine(result.Length);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AlephMapper\src\EntityDemo\ProjectExtensions.cs" label="ProjectExtensions.cs" >

  This is the use of **AlephMapper** in *ProjectExtensions.cs*

```csharp showLineNumbers 
namespace EntityDemo;
public static partial class ProjectExtensions
{
    [AlephMapper.Expressive(NullConditionalRewrite = AlephMapper.NullConditionalRewrite.Rewrite)]
    public static ProjectDTO ProjToDTO(Stats.Database.Project project) =>

        new ProjectDTO
        {
            Name = project.Name,
            CountStars = project.Stars?.Count ?? 0
        }
        ;
    
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AlephMapper\src\EntityDemo\ProjectDTO.cs" label="ProjectDTO.cs" >

  This is the use of **AlephMapper** in *ProjectDTO.cs*

```csharp showLineNumbers 
namespace EntityDemo;

public class ProjectDTO
{
    public string? Name \{ get; set; }
    public int  CountStars \{ get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AlephMapper\src\EntityDemo\obj\GX\AlephMapper\AlephMapper.AlephSourceGenerator\AlephMapper.Attributes.g.cs" label="AlephMapper.Attributes.g.cs" >
```csharp showLineNumbers 
using System;

namespace AlephMapper;

/// <summary>
/// Configures how null-conditional operators are handled
/// </summary>
public enum NullConditionalRewrite
{
    /// <summary>
    /// Don't rewrite null conditional operators (Default behavior).
    /// Usage of null conditional operators is thereby not allowed
    /// </summary>
    None,

    /// <summary>
    /// Ignore null-conditional operators in the generated expression tree
    /// </summary>
    /// <remarks>
    /// <c>(A?.B)</c> is rewritten as expression: <c>(A.B)</c>
    /// </remarks>
    Ignore,

    /// <summary>
    /// Translates null-conditional operators into explicit null checks
    /// </summary>
    /// <remarks>
    /// <c>(A?.B)</c> is rewritten as expression: <c>(A != null ? A.B : null)</c>
    /// </remarks>
    Rewrite
}

/// <summary>
/// Marks a class to generate expressive companion methods.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
public sealed class ExpressiveAttribute : Attribute
{
    /// <summary>
    /// Get or set how null-conditional operators are handled
    /// </summary>
    public NullConditionalRewrite NullConditionalRewrite \{ get; set; \} = NullConditionalRewrite.Ignore;
}

/// <summary>
/// Marks a class to generate update companion methods.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
public sealed class UpdatableAttribute : Attribute
{
    /// <summary>
    /// Gets or sets the policy for handling collection updates during mapping operations
    /// </summary>
    public CollectionPropertiesPolicy CollectionProperties \{ get; set; \} = CollectionPropertiesPolicy.Skip;
}

/// <summary>
/// Defines the policy for handling collection updates during mapping operations
/// </summary>
public enum CollectionPropertiesPolicy
{
    /// <summary>
    /// Skip collection updates - collections will not be modified during mapping
    /// </summary>
    Skip,

    /// <summary>
    /// Update collections - collections will be updated during mapping operations
    /// </summary>
    Update
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AlephMapper\src\EntityDemo\obj\GX\AlephMapper\AlephMapper.AlephSourceGenerator\EntityDemo_ProjectExtensions_GeneratedMappings.g.cs" label="EntityDemo_ProjectExtensions_GeneratedMappings.g.cs" >
```csharp showLineNumbers 
using System;
using System.CodeDom.Compiler;
using System.Linq;
using System.Linq.Expressions;

namespace EntityDemo;

[GeneratedCode("AlephMapper", "0.5.5")]
partial class ProjectExtensions
{
    /// <summary>
    /// This is an auto-generated expression companion for <see cref="ProjToDTO(Project)"/>.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Null handling strategy: Null-conditional operators are rewritten as explicit null checks for better compatibility.
    /// </para>
    /// </remarks>
    public static Expression<Func<Project, ProjectDTO>> ProjToDTOExpression() => 
        project => new ProjectDTO
        {
            Name = project.Name,
            CountStars = (project.Stars != null
                ? (project.Stars.Count) 
                : (int?)null) ?? 0
        };
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project AlephMapper ](/sources/AlephMapper.zip)

:::


### Share AlephMapper 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAlephMapper&quote=AlephMapper" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAlephMapper&text=AlephMapper:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAlephMapper" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAlephMapper&title=AlephMapper" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAlephMapper&title=AlephMapper&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAlephMapper" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AlephMapper

<SameCategory />

