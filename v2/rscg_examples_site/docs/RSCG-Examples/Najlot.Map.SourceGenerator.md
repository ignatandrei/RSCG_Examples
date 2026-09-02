---
sidebar_position: 2880
title: 288 - Najlot.Map.SourceGenerator
description:  Generates object mapping code at compile time using source generators
slug: /Najlot.Map.SourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMapper.mdx';

# Najlot.Map.SourceGenerator  by Najlot


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Najlot.Map.SourceGenerator?label=Najlot.Map.SourceGenerator)](https://www.nuget.org/packages/Najlot.Map.SourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/najlot/Map?label=updated)](https://github.com/najlot/Map)
![GitHub Repo stars](https://img.shields.io/github/stars/najlot/Map?style=social)

## Details

### Info
:::info

Name: **Najlot.Map.SourceGenerator**

Source generator for Najlot.Map that provides automatic mapping code generation with high performance caching.

Author: Najlot

NuGet: 
*https://www.nuget.org/packages/Najlot.Map.SourceGenerator/*   


You can find more details at https://github.com/najlot/Map

Source: https://github.com/najlot/Map

:::

### Author
:::note
Najlot 
![Alt text](https://github.com/najlot.png)
:::

## Original Readme
:::note

### ![M](https://github.com/najlot/Map/blob/main/images/icon.png) Najlot.Map

Najlot.Map is a high-performance object mapping library for .NET built around explicit mapping methods.
Instead of convention-heavy auto-mapping, it keeps mapping logic in normal C# methods so behavior stays readable, predictable, and easy to review.
When you want less boilerplate, you can add the optional source generator and keep the same programming model.

Najlot.Map is a good fit when you want:

* explicit mappings instead of hidden conventions,
* strong runtime performance without magic in the hot path,
* a single `IMap` entry point for object, collection, async, and queryable mapping,
* the option to scale from handwritten methods to generated mappings.

---

###### Why Najlot.Map

* Unlike convention-based mappers, mapping behavior lives in regular C# methods you can read, debug, and review directly.
* Unlike tools that rely on runtime magic, Najlot.Map keeps the hot path explicit and lets you add source generation only when it helps.
* Unlike broad auto-mapping defaults, it favors predictable registrations and validation so mapping changes are easier to catch in tests or startup checks.

---

###### What It Does

* Explicit method-based mappings
* Central `IMap` container
* Object, collection, nullable, and async enumerable mapping
* `IQueryable<T>` projections through expressions
* Optional Roslyn source generator
* Validation for delegate-based mappings in tests
* Factory-based object creation for DI or custom activation

---

###### Packages

Najlot.Map is distributed as two NuGet packages:

| Package | Description |
| --- | --- |
| `Najlot.Map` | Core runtime, attributes, registration, validation, and mapping APIs |
| `Najlot.Map.SourceGenerator` | Optional compile-time generation for mapping methods and registration |

---

###### Installation

Install the runtime package:

```bash
dotnet add package Najlot.Map
```

Add the source generator when you want compile-time generated mappings:

```bash
dotnet add package Najlot.Map.SourceGenerator
```

---

###### Core Model

* Mappings are regular methods, not configuration files.
* `IMap` is the single entry point for registration and execution.
* Public mapping methods can be discovered and registered automatically.
* Generated mappings follow the same runtime API as handwritten mappings.
* Validation is meant for tests and startup checks, not the request path.

---

###### Quick Start

######### 1. Write mapping methods

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

######### 2. Register the mappings

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

######### 3. Map objects and collections

```csharp
var user = map.From(userModel).To<User>();
var users = map.From(userModels).To<User>().ToList();
```

---

###### Registration Options

######### Manual registration

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

######### Generated registration

When using `Najlot.Map.SourceGenerator`, classes marked with `[Mapping]` get picked up and the generator emits an assembly-specific extension method named `Register{AssemblyName}Mappings()`.

```csharp
var map = new Map()
    .RegisterMyProjectMappings();
```

If generated mapping classes need constructor injection, the same `RegisterFactory(...)` hook applies.

---

###### Source Generator

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

###### Validation

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

###### Queryable Projections

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

###### Design Principles

Najlot.Map is intentionally not a convention-over-configuration auto-mapper.
Its value is in making mappings obvious and controllable while still giving you enough tooling to keep the codebase fast and maintainable as it grows.

That means:

* explicit code over implicit behavior,
* predictable runtime behavior over hidden fallback rules,
* optional generation over mandatory framework ceremony.

---

###### License

MIT License

:::

### About
:::note

 Generates object mapping code at compile time using source generators


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Najlot.Map.SourceGenerator**
```xml showLineNumbers {17}
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
	  <PackageReference Include="Najlot.Map" Version="0.2.1" />
	  <PackageReference Include="Najlot.Map.SourceGenerator" Version="0.2.1" />
	</ItemGroup>

	

	
	
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Map.SourceGenerator\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **Najlot.Map.SourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
using Najlot.Map;
var map = new Map();
map.RegistermapperDemoMappings();
map.Validate();
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO personDTO=map.From(p).To<PersonDTO>();
Console.WriteLine(personDTO.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Map.SourceGenerator\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **Najlot.Map.SourceGenerator** in *Person.cs*

```csharp showLineNumbers 

public partial class Person
{
    public int ID \{ get; set; }
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Map.SourceGenerator\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **Najlot.Map.SourceGenerator** in *PersonDTO.cs*

```csharp showLineNumbers 
using Najlot.Map;
using Najlot.Map.Attributes;
namespace mapperDemo;
public partial struct PersonDTO
{
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }

    public string FullName \{ 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}


[Mapping]
public partial class UserMapper
{
    [MapIgnoreProperty(nameof(Person.ID))]
    public partial PersonDTO MapUser(Person from);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Map.SourceGenerator\src\mapperDemo\obj\GX\Najlot.Map.SourceGenerator\Najlot.Map.SourceGenerator.MappingGenerator\mapperDemo_UserMapper.g.cs" label="mapperDemo_UserMapper.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace mapperDemo
{
    partial class UserMapper
    {
        public partial mapperDemo.PersonDTO MapUser(Person from)
        {
            var result = new mapperDemo.PersonDTO();

            result.FirstName = from.FirstName;
            result.LastName = from.LastName;

            return result;
        }

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Map.SourceGenerator\src\mapperDemo\obj\GX\Najlot.Map.SourceGenerator\Najlot.Map.SourceGenerator.RegistrationGenerator\MapRegistrationExtensions_mapperDemo.g.cs" label="MapRegistrationExtensions_mapperDemo.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
using Najlot.Map;

namespace mapperDemo
{
    public static class MapRegistrationExtensions_mapperDemo
    {
        public static IMap RegistermapperDemoMappings(this IMap map)
        {
            var instance_mapperDemo_UserMapper = map.Create<global::mapperDemo.UserMapper>();
            map.Register<global::Person, global::mapperDemo.PersonDTO>(instance_mapperDemo_UserMapper.MapUser);
            return map;
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Najlot.Map.SourceGenerator ](/sources/Najlot.Map.SourceGenerator.zip)

:::


### Share Najlot.Map.SourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Map.SourceGenerator&quote=Najlot.Map.SourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Map.SourceGenerator&text=Najlot.Map.SourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Map.SourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Map.SourceGenerator&title=Najlot.Map.SourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Map.SourceGenerator&title=Najlot.Map.SourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Map.SourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Najlot.Map.SourceGenerator

<SameCategory />

