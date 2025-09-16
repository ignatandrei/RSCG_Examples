---
sidebar_position: 2290
title: 229 - Facet
description: Custom generation and mapper
slug: /Facet
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMapper.mdx';

# Facet  by Tim Maes


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Facet?label=Facet)](https://www.nuget.org/packages/Facet/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Tim-Maes/Facet?label=updated)](https://github.com/Tim-Maes/Facet/)
![GitHub Repo stars](https://img.shields.io/github/stars/Tim-Maes/Facet?style=social)

## Details

### Info
:::info

Name: **Facet**

Generate lean DTOs, slim views, or faceted projections of your models with a single attribute.

Author: Tim Maes

NuGet: 
*https://www.nuget.org/packages/Facet/*   


You can find more details at https://github.com/Tim-Maes/Facet/

Source: https://github.com/Tim-Maes/Facet/

:::

### Author
:::note
Tim Maes 
![Alt text](https://github.com/Tim-Maes.png)
:::

### Original Readme
:::note

<div align="center">
  <img
    src="https://raw.githubusercontent.com/Tim-Maes/Facet/master/assets/Facet.png"
    alt="Facet logo"
    width="400" />
</div>

<div align="center">
"One part of a subject, situation, object that has many parts."
</div>

<br />

<div align="center">
  
[![NuGet](https://img.shields.io/nuget/v/Facet.svg)](https://www.nuget.org/packages/Facet)
[![Downloads](https://img.shields.io/nuget/dt/Facet.svg)](https://www.nuget.org/packages/Facet)
[![GitHub](https://img.shields.io/github/license/Tim-Maes/Facet.svg)](https://github.com/Tim-Maes/Facet/blob/main/LICENSE.txt)
[![CI](https://github.com/Tim-Maes/Facet/actions/workflows/build.yml/badge.svg)](https://github.com/Tim-Maes/Facet/actions/workflows/build.yml)
[![CD](https://github.com/Tim-Maes/Facet/actions/workflows/release.yml/badge.svg)](https://github.com/Tim-Maes/Facet/actions/workflows/release.yml)

</div>

---

**Facet** is a C# source generator that lets you define **lightweight projections** (DTOs, API models, etc.) directly from your domain models, without writing boilerplate.

It generates partial classes, records, structs, or record structs with constructors, optional LINQ projections, and even supports custom mappings, all at compile time, with zero runtime cost.

## :gem: What is Facetting?

Facetting is the process of defining **focused views** of a larger model at compile time.

Instead of manually writing separate DTOs, mappers, and projections, **Facet** allows you to declare what you want to keep, and generates everything else.

You can think of it like **carving out a specific facet** of a gem:

- The part you care about
- Leaving the rest behind.

## :grey_question: Why Facetting?

- Reduce duplication across DTOs, projections, and ViewModels
- Maintain strong typing with no runtime cost
- Stay DRY (Don't Repeat Yourself) without sacrificing performance
- Works seamlessly with LINQ providers like Entity Framework

## :clipboard: Documentation

- **[Documentation & Guides](https://github.com/Tim-Maes/Facet//docs/README.md)**
- [What is being generated?](https://github.com/Tim-Maes/Facet//docs/07_WhatIsBeingGenerated.md)

## :star: Key Features

- :white_check_mark: Generate classes, records, structs, or record structs from existing types
- :white_check_mark: Exclude fields/properties you don't want (create a Facetted view of your model)
- :white_check_mark: Include/redact public fields
- :white_check_mark: Auto-generate constructors for fast mapping
- :white_check_mark: LINQ projection expressions
- :white_check_mark: Full mapping support with custom mapping configurations
- :white_check_mark: Auto-generate complete CRUD DTO sets with `[GenerateDtos]`
- :white_check_mark: **Expression transformation and mapping utilities** for reusing business logic across entities and DTOs
- :white_check_mark: Preserves member and type XML documentation

## :earth_americas: The Facet Ecosystem

Facet is modular and consists of several NuGet packages:

- **Facet**: The core source generator. Generates DTOs, projections, and mapping code.

- **Facet.Extensions**: Provider-agnostic extension methods for mapping and projecting (works with any LINQ provider, no EF Core dependency).

- **Facet.Mapping**: Advanced static mapping configuration support with async capabilities and dependency injection for complex mapping scenarios.

- **Facet.Mapping.Expressions**: Expression tree transformation utilities for transforming predicates, selectors, and business logic between source entities and their Facet projections.

- **Facet.Extensions.EFCore**: Async extension methods for Entity Framework Core (requires EF Core 6+).

## :rocket: Quick start 

### Install the NuGet Package

```
dotnet add package Facet
```

For LINQ helpers:
```
dotnet add package Facet.Extensions
```

For EF Core support:
```
dotnet add package Facet.Extensions.EFCore
```

For expression transformation utilities:
```
dotnet add package Facet.Mapping.Expressions
```

### Basic Projection
```csharp
[Facet(typeof(User))]
public partial class UserFacet \{ }

// Auto-generates constructor, properties, and LINQ projection
var user = user.ToFacet<UserFacet>();
var user = user.ToFacet<User, UserFacet>(); //Much faster

var users = users.SelectFacets<UserFacet>();
var users = users.SelectFacets<User, UserFacet>(); //Much faster
```

### Property Exclusion & Field Inclusion
```csharp
// Exclude sensitive properties
string[] excludeFields = \{ "Password", "Email" };

[Facet(typeof(User), exclude: excludeFields)]
public partial class UserWithoutEmail \{ }

// Include public fields
[Facet(typeof(Entity), IncludeFields = true)]
public partial class EntityDto \{ }
```

### Different Type Kinds
```csharp
// Generate as record (immutable by default)
[Facet(typeof(Product))]
public partial record ProductDto;

// Generate as struct (value type)
[Facet(typeof(Point))]
public partial struct PointDto;

// Generate as record struct (immutable value type)
[Facet(typeof(Coordinates))]
public partial record struct CoordinatesDto; // Preserves required/init-only
```

### Custom Sync Mapping
```csharp
public class UserMapper : IFacetMapConfiguration<User, UserDto>
{
    public static void Map(User source, UserDto target)
    {
        target.FullName = $"{source.FirstName} {source.LastName}";
        target.Age = CalculateAge(source.DateOfBirth);
    }
}

[Facet(typeof(User), Configuration = typeof(UserMapper))]
public partial class UserDto 
{
    public string FullName \{ get; set; }
    public int Age \{ get; set; }
}
```

### Async Mapping for I/O Operations
```csharp
public class UserAsyncMapper : IFacetMapConfigurationAsync<User, UserDto>
{
    public static async Task MapAsync(User source, UserDto target, CancellationToken cancellationToken = default)
    {
        // Async database lookup
        target.ProfilePicture = await GetProfilePictureAsync(source.Id, cancellationToken);
        
        // Async API call
        target.ReputationScore = await CalculateReputationAsync(source.Email, cancellationToken);
    }
}

// Usage
var userDto = await user.ToFacetAsync<User, UserDto, UserAsyncMapper>();
var userDtos = await users.ToFacetsParallelAsync<User, UserDto, UserAsyncMapper>();
```

### Async Mapping with Dependency Injection
```csharp
public class UserAsyncMapperWithDI : IFacetMapConfigurationAsyncInstance<User, UserDto>
{
    private readonly IProfilePictureService _profileService;
    private readonly IReputationService _reputationService;

    public UserAsyncMapperWithDI(IProfilePictureService profileService, IReputationService reputationService)
    {
        _profileService = profileService;
        _reputationService = reputationService;
    }

    public async Task MapAsync(User source, UserDto target, CancellationToken cancellationToken = default)
    {
        // Use injected services
        target.ProfilePicture = await _profileService.GetProfilePictureAsync(source.Id, cancellationToken);
        target.ReputationScore = await _reputationService.CalculateReputationAsync(source.Email, cancellationToken);
    }
}

// Usage with DI
var mapper = new UserAsyncMapperWithDI(profileService, reputationService);
var userDto = await user.ToFacetAsync(mapper);
var userDtos = await users.ToFacetsParallelAsync(mapper);
```

### EF Core Integration

#### Forward Mapping (Entity -> Facet)
```csharp
// Async projection directly in EF Core queries
var userDtos = await dbContext.Users
    .Where(u => u.IsActive)
    .ToFacetsAsync<UserDto>();

// LINQ projection for complex queries
var results = await dbContext.Products
    .Where(p => p.IsAvailable)
    .SelectFacet<ProductDto>()
    .OrderBy(dto => dto.Name)
    .ToListAsync();
```

#### Reverse Mapping (Facet -> Entity)
```csharp
[Facet(typeof(User)]
public partial class UpdateUserDto \{ }

[HttpPut("{id}")]
public async Task<IActionResult> UpdateUser(int id, UpdateUserDto dto)
{
    var user = await context.Users.FindAsync(id);
    if (user == null) return NotFound();
    
    // Only updates properties that mutated
    user.UpdateFromFacet(dto, context);
    
    await context.SaveChangesAsync();
    return NoContent();
}

// With change tracking for auditing
var result = user.UpdateFromFacetWithChanges(dto, context);
if (result.HasChanges)
{
    logger.LogInformation("User {UserId} updated. Changed: {Properties}", 
        user.Id, string.Join(", ", result.ChangedProperties));
}
```

### Automatic CRUD DTO Generation

Generate standard Create, Update, Response, Query, and Upsert DTOs automatically:

```csharp
// Generate all standard CRUD DTOs
[GenerateDtos(Types = DtoTypes.All, OutputType = OutputType.Record)]
public class User
{
    public int Id \{ get; set; }
    public string FirstName \{ get; set; }
    public string LastName \{ get; set; }
    public string Email \{ get; set; }
    public DateTime CreatedAt \{ get; set; }
}

// Auto-generates:
// - CreateUserRequest (excludes Id)
// - UpdateUserRequest (includes Id)  
// - UserResponse (includes all)
// - UserQuery (all properties nullable)
// - UpsertUserRequest (includes Id, for create/update operations)
```

#### 
Entities with Smart Exclusions
```csharp
[GenerateAuditableDtos(
    Types = DtoTypes.Create | DtoTypes.Update | DtoTypes.Response,
    OutputType = OutputType.Record,
    ExcludeProperties = new[] \{ "Password" })]
public class Product
{
    public int Id \{ get; set; }
    public string Name \{ get; set; }
    public string Password \{ get; set; \} // Excluded
    public DateTime CreatedAt \{ get; set; \} // Auto-excluded (audit)
    public string CreatedBy \{ get; set; \} // Auto-excluded (audit)
}

// Auto-excludes audit fields: CreatedAt, UpdatedAt, CreatedBy, UpdatedBy
```

#### Multiple Configurations for Fine-Grained Control
```csharp
// Different exclusions for different DTO types
[GenerateDtos(Types = DtoTypes.Response, ExcludeProperties = new[] \{ "Password", "InternalNotes" })]
[GenerateDtos(Types = DtoTypes.Upsert, ExcludeProperties = new[] \{ "Password" })]
public class Schedule
{
    public int Id \{ get; set; }
    public string Name \{ get; set; }
    public string Password \{ get; set; \} // Excluded from both
    public string InternalNotes \{ get; set; \} // Only excluded from Response
}

// Generates:
// - ScheduleResponse (excludes Password, InternalNotes) 
// - UpsertScheduleRequest (excludes Password, includes InternalNotes)
```

#### Perfect for RESTful APIs
```csharp
[HttpPost]
public async Task<ActionResult<ScheduleResponse>> CreateSchedule(CreateScheduleRequest request)
{
    var schedule = new Schedule
    {
        Name = request.Name,
        // Map other properties;;;
    };

    context.Schedules.Add(schedule);
    await context.SaveChangesAsync();
    return schedule.ToFacet<ScheduleResponse>();
}

[HttpPut("{id}")]
public async Task<ActionResult<ScheduleResponse>> UpsertSchedule(int id, UpsertScheduleRequest body)
{
    var schedule = context.GetScheduleById(id);
    if (schedule == null) return NotFound();
    
    // Ensure the body ID matches the route ID  
    body = body with \{ Id = id };
    
    schedule.UpdateFromFacet(body, context);
    await context.SaveChangesAsync();
    return schedule.ToFacet<ScheduleResponse>();
}
```

## :chart_with_upwards_trend: Performance Benchmarks

Facet delivers competitive performance across different mapping scenarios. Here's how it compares to popular alternatives:

### Single Mapping

| Library  | Mean Time | Memory Allocated | Performance vs Facet |
|----------|-----------|------------------|---------------------|
| **Facet** | 15.93 ns | 136 B | **Baseline** |
| Mapperly | 15.09 ns | 128 B | 5% faster, 6% less memory |
| Mapster  | 21.90 ns | 128 B | 38% slower, 6% less memory |

### Collection Mapping (10 items)

| Library  | Mean Time | Memory Allocated | Performance vs Facet |
|----------|-----------|------------------|---------------------|
| Mapster  | 192.55 ns | 1,416 B | **10% faster, 10% less memory** |
| **Facet** | 207.32 ns | 1,568 B | **Baseline** |
| Mapperly | 222.50 ns | 1,552 B | 7% slower, 1% less memory |

For this benchmark we used the `<TSource, TTarget>` methods. 

**Insights:**
> - **Single mapping**: All three libraries perform similarly with sub-nanosecond differences
> - **Collection mapping**: Mapster has a slight edge for bulk operations, while Facet and Mapperly are very close
> - **Memory efficiency**: All libraries are within ~10% of each other for memory allocation
> - **Compile-time generation**: Both Facet and Mapperly benefit from zero-runtime-cost source generation



:::

### About
:::note

Custom generation and mapper


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Facet**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
	  <PackageReference Include="Facet" Version="2.7.0" />
	</ItemGroup>

	
	
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **Facet** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= new(p);
Console.WriteLine(dto.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **Facet** in *Person.cs*

```csharp showLineNumbers 

public partial class Person
{
    public int ID \{ get; set; }
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **Facet** in *PersonDTO.cs*

```csharp showLineNumbers 

using Facet;

namespace mapperDemo;
[Facet(typeof(Person), Kind = FacetKind.Struct)]
public partial struct PersonDTO
{   public string FullName \{ 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\obj\GX\Facet\Facet.Generators.FacetGenerator\PersonDTO.g.cs" label="PersonDTO.g.cs" >
```csharp showLineNumbers 
// <auto-generated>
//     This code was generated by the Facet source generator.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>

using System;
using System.Linq.Expressions;

namespace mapperDemo;
public partial struct PersonDTO
{
    public int ID \{ get; set; }
    public string FirstName \{ get; set; }
    public string LastName \{ get; set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="PersonDTO"/> class from the specified <see cref="global::Person"/>.
    /// </summary>
    /// <param name="source">The source <see cref="global::Person"/> object to copy data from.</param>
    public PersonDTO(global::Person source)
    {
        this.ID = source.ID;
        this.FirstName = source.FirstName;
        this.LastName = source.LastName;
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="PersonDTO"/> class with default values.
    /// </summary>
    /// <remarks>
    /// This constructor is useful for unit testing, object initialization, and scenarios
    /// where you need to create an empty instance and populate properties later.
    /// </remarks>
    public PersonDTO()
    {
    }

    /// <summary>
    /// Gets the projection expression for converting <see cref="global::Person"/> to <see cref="PersonDTO"/>.
    /// Use this for LINQ and Entity Framework query projections.
    /// </summary>
    /// <value>An expression tree that can be used in LINQ queries for efficient database projections.</value>
    /// <example>
    /// <code>
    /// var dtos = context.global::Persons
    ///     .Where(x => x.IsActive)
    ///     .Select(PersonDTO.Projection)
    ///     .ToList();
    /// </code>
    /// </example>
    public static Expression<Func<global::Person, PersonDTO>> Projection =>
        source => new PersonDTO(source);
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\Extensions.Generated.cs" label="Extensions.Generated.cs" >
```csharp showLineNumbers 
// <Auto-Generated/>
#pragma warning disable IDE0005
#pragma warning disable CS0105
using LightweightObjectMapper;
using System;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

namespace mapperDemo
{
    sealed partial class Extensions
    {
        public static partial class Generated
        {
            /// <summary>
            /// PostMappingDeclaration for <see cref = "global::Person"/> to <see cref = "global::mapperDemo.PersonDTO"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.PostMappingDeclaration, typeof(global::Person), typeof(global::mapperDemo.PersonDTO))]
            public static global::mapperDemo.PersonDTO PostMapping_D275C37F33F4AFBD(global::Person source, global::mapperDemo.PersonDTO target)
            {
                target.ID = source.ID;
                return target;
            }
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LightweightObjectMapper.PreCodes.LightweightObjectMapperPreCodes.cs" label="LightweightObjectMapper.PreCodes.LightweightObjectMapperPreCodes.cs" >
```csharp showLineNumbers 
#if !NO_LIGHTWEIGHT_OBJECT_MAPPER_PRE_CODES

// <Auto-Generated/>

#pragma warning disable IDE0161 // 转换为文件范围限定的 namespace

using System;
using System.Collections.Generic;

namespace LightweightObjectMapper
{
    /// <summary>
    /// 映射配置接口
    /// </summary>
    internal interface IMappingProfile \{ }

    /// <summary>
    /// 映射后执行的动作
    /// </summary>
    /// <typeparam name="TIn"></typeparam>
    /// <typeparam name="TOut"></typeparam>
    internal interface IPostMapping<TIn, TOut> : IMappingProfile
    {
        /// <summary>
        /// 映射后执行的动作
        /// </summary>
        /// <param name="source"></param>
        /// <param name="target"></param>
        /// <returns></returns>
        TOut PostMapping(TIn source, TOut target);
    }

    /// <summary>
    /// 映射前准备
    /// </summary>
    /// <typeparam name="TIn"></typeparam>
    /// <typeparam name="TOut"></typeparam>
    internal interface IMappingPrepare<TIn, TOut> : IMappingProfile
    {
        /// <summary>
        /// 映射前准备
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        TOut MappingPrepare(TIn source);
    }

    /// <summary>
    /// 接管完整的类型映射（仅非目标实例映射）
    /// </summary>
    /// <typeparam name="TIn"></typeparam>
    /// <typeparam name="TOut"></typeparam>
    internal interface ITypeMapping<TIn, TOut> : IMappingProfile
    {
        /// <summary>
        /// 接管完整的类型映射（仅非目标实例映射）
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        TOut TypeMapping(TIn source);
    }

    /// <summary>
    /// 类型成员忽略映射
    /// </summary>
    /// <typeparam name="T"></typeparam>
    internal interface ITypeMemberIgnoreMapping<T> : IMappingProfile
    {
        /// <summary>
        /// 类型成员忽略映射<br/>
        /// 方法体内访问过的 <paramref name="target"/> 所有成员，将在映射时被忽略
        /// </summary>
        /// <param name="target"></param>
        /// <returns></returns>
        object? IgnoreMapping(T target);
    }

    /// <summary>
    /// 标记一个方法为集合映射方法<br/>
    /// 集合映射方法应包含唯一泛型参数 T ，以及唯一参数 <see cref="IEnumerable{T}"/> ，返回类型应该为 <see cref="IEnumerable{T}"/> 的派生类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    internal sealed class CollectionMappingAttribute : Attribute
    {
    }

    /// <summary>
    /// 标记类为映射配置类
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal sealed class MappingProfileAttribute : Attribute
    {
        /// <inheritdoc cref="MappingProfileAttribute"/>
        public MappingProfileAttribute() \{ }
    }

    /// <summary>
    /// 映射元数据
    /// </summary>
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    internal sealed class MappingMetadataAttribute : Attribute
    {
        /// <inheritdoc cref="MappingMetadataAttribute"/>
        public MappingMetadataAttribute(MappingMetadataType type, params object[] data) \{ }
    }

    /// <summary>
    /// 映射元数据类型
    /// </summary>
    internal enum MappingMetadataType
    {
        /// <summary>
        /// 声明 MappingPrepare
        /// </summary>
        MappingPrepareDeclaration,

        /// <summary>
        /// 声明 PostMapping
        /// </summary>
        PostMappingDeclaration,

        /// <summary>
        /// 声明 TypeMapping
        /// </summary>
        TypeMappingDeclaration,

        /// <summary>
        /// 声明 CollectionMapping
        /// </summary>
        CollectionMappingDeclaration,

        /// <summary>
        /// 忽略成员声明
        /// </summary>
        IgnoreMembersDeclaration,

        /// <summary>
        /// 类型忽略成员声明
        /// </summary>
        TypeIgnoreMembersDeclaration,
    }

    /// <summary>
    /// 引用其它映射配置类
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
    internal sealed class MappingProfileIncludeAttribute : Attribute
    {
        /// <inheritdoc cref="MappingProfileIncludeAttribute"/>
        public MappingProfileIncludeAttribute(params Type[] profileTypes) \{ }
    }

    /// <summary>
    /// 对象映射 MapTo 占位方法
    /// </summary>
    [Obsolete("Do not use the placeholder extension class.", true)]
    internal static class LightweightObjectMapperPlaceholderExtensions
    {
        private const string ErrorCallPlaceholderMethodMessage = "Do not use the placeholder extension method. If not redirect to the right mapper extension method please try fix other errors and rebuild the project.";

        /// <summary>
        /// 对象映射 MapTo 占位方法<br/>
        /// 生成 无需目标对象 的泛型映射方法，映射到 <typeparamref name="TOut"/>
        /// </summary>
        /// <typeparam name="TOut"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        [Obsolete(ErrorCallPlaceholderMethodMessage, true)]
        public static TOut MapTo<TOut>(this object source)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 对象映射 MapTo 占位方法<br/>
        /// 生成 需要目标对象 的泛型映射方法，映射到 <typeparamref name="TOut"/>
        /// </summary>
        /// <typeparam name="TOut"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        [Obsolete(ErrorCallPlaceholderMethodMessage, true)]
        public static TOut MapTo<TOut>(this object source, TOut target)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 值类型 对象映射 MapTo 占位方法<br/>
        /// 生成 需要目标值类型对象 的泛型映射方法，映射到 <typeparamref name="TOut"/>
        /// </summary>
        /// <typeparam name="TOut"></typeparam>
        /// <param name="source"></param>
        /// <returns></returns>
        [Obsolete(ErrorCallPlaceholderMethodMessage, true)]
        public static TOut MapTo<TOut>(this object source, ref TOut target)
            where TOut : struct
        {
            throw new NotImplementedException();
        }
    }
}

#endif

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LightweightObjectMapper.PreCodes.PredefinedSpecialTypeMapping.cs" label="LightweightObjectMapper.PreCodes.PredefinedSpecialTypeMapping.cs" >
```csharp showLineNumbers 
#if !NO_LIGHTWEIGHT_OBJECT_MAPPER_PRE_CODES

// <Auto-Generated/>

#pragma warning disable IDE0161 // 转换为文件范围限定的 namespace

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace LightweightObjectMapper
{
    /// <summary>
    /// 预定义的类型映射
    /// </summary>
    [MappingProfile]
    internal sealed partial class PredefinedSpecialTypeMapping
        : ITypeMapping<int, bool>
        , ITypeMapping<short, bool>
        , ITypeMapping<long, bool>
    {
        public bool TypeMapping(int source)
        {
            return source != 0;
        }

        public bool TypeMapping(short source)
        {
            return source != 0;
        }

        bool ITypeMapping<long, bool>.TypeMapping(long source)
        {
            return source != 0;
        }

        [CollectionMapping]
        public static IEnumerable<T>? ToIEnumerable<T>(IEnumerable<T>? items)
        {
            return items?.ToList();
        }

        [CollectionMapping]
        public static ICollection<T>? ToICollection<T>(IEnumerable<T>? items)
        {
            return items?.ToList();
        }

        [CollectionMapping]
        public static IReadOnlyCollection<T>? ToIReadOnlyCollection<T>(IEnumerable<T>? items)
        {
            return items?.ToList();
        }

        [CollectionMapping]
        public static IList<T>? ToIList<T>(IEnumerable<T>? items)
        {
            return items?.ToList();
        }

        [CollectionMapping]
        public static IReadOnlyList<T>? ToIReadOnlyList<T>(IEnumerable<T>? items)
        {
            return items?.ToList();
        }

        [CollectionMapping]
        public static List<T>? ToList<T>(IEnumerable<T>? items)
        {
            return items?.ToList();
        }
    }
}

#endif

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LOMMapExtensions_mapperDemo_Person.g.cs" label="LOMMapExtensions_mapperDemo_Person.g.cs" >
```csharp showLineNumbers 
// <Auto-Generated/>
#pragma warning disable IDE0005
#pragma warning disable CS0105
using System;
using System.Linq;
using System.Runtime.CompilerServices;

namespace LightweightObjectMapper
{
    internal static partial class LOMMapExtensions_mapperDemo
    {
        /// <summary>
        /// Map <see cref = "global::Person"/> to the following types:<br/>
        /// <see cref = "global::mapperDemo.PersonDTO"/><br/>
        /// </summary>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static TOut MapTo<TOut>(this global::Person source)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            if (typeof(TOut) == typeof(global::mapperDemo.PersonDTO))
            {
                var target = new global::mapperDemo.PersonDTO()
                {
                    LastName = source.LastName,
                    FirstName = source.FirstName,
                    ID = source.ID,
                };
                target = global::mapperDemo.Extensions.Generated.PostMapping_D275C37F33F4AFBD(source, target);
                return (TOut)(target as object);
            }

            throw new global::System.NotImplementedException($"No mapping code for {typeof(TOut)}.");
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Facet\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\PredefinedSpecialTypeMapping.Generated.cs" label="PredefinedSpecialTypeMapping.Generated.cs" >
```csharp showLineNumbers 
// <Auto-Generated/>
#pragma warning disable IDE0005
#pragma warning disable CS0105
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

namespace LightweightObjectMapper
{
    sealed partial class PredefinedSpecialTypeMapping
    {
        public static partial class Generated
        {
            /// <summary>
            /// TypeMappingDeclaration for <see cref = "int "/> to <see cref = "bool "/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.TypeMappingDeclaration, typeof(int), typeof(bool))]
            public static bool TypeMapping_A07AFC9A322FFA04(int source)
            {
                return source != 0;
            }

            /// <summary>
            /// TypeMappingDeclaration for <see cref = "short "/> to <see cref = "bool "/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.TypeMappingDeclaration, typeof(short), typeof(bool))]
            public static bool TypeMapping_946949E7222BC174(short source)
            {
                return source != 0;
            }

            /// <summary>
            /// TypeMappingDeclaration for <see cref = "long "/> to <see cref = "bool "/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.TypeMappingDeclaration, typeof(long), typeof(bool))]
            public static bool TypeMapping_3C4D395B4EF43E87(long source)
            {
                return source != 0;
            }

            /// <summary>
            /// CollectionMappingDeclaration for <see cref = "global::System.Collections.Generic.IEnumerable{T}"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.CollectionMappingDeclaration, typeof(global::System.Collections.Generic.IEnumerable<>))]
            public static global::System.Collections.Generic.IEnumerable<T> CollectionMapping_CEFAD35E246FD0F7<T>(global::System.Collections.Generic.IEnumerable<T> items)
            {
                return items?.ToList();
            }

            /// <summary>
            /// CollectionMappingDeclaration for <see cref = "global::System.Collections.Generic.ICollection{T}"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.CollectionMappingDeclaration, typeof(global::System.Collections.Generic.ICollection<>))]
            public static global::System.Collections.Generic.ICollection<T> CollectionMapping_37FFD1A2226B51E9<T>(global::System.Collections.Generic.IEnumerable<T> items)
            {
                return items?.ToList();
            }

            /// <summary>
            /// CollectionMappingDeclaration for <see cref = "global::System.Collections.Generic.IReadOnlyCollection{T}"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.CollectionMappingDeclaration, typeof(global::System.Collections.Generic.IReadOnlyCollection<>))]
            public static global::System.Collections.Generic.IReadOnlyCollection<T> CollectionMapping_AF82A9960EE0C495<T>(global::System.Collections.Generic.IEnumerable<T> items)
            {
                return items?.ToList();
            }

            /// <summary>
            /// CollectionMappingDeclaration for <see cref = "global::System.Collections.Generic.IList{T}"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.CollectionMappingDeclaration, typeof(global::System.Collections.Generic.IList<>))]
            public static global::System.Collections.Generic.IList<T> CollectionMapping_284BCB723CA17B0E<T>(global::System.Collections.Generic.IEnumerable<T> items)
            {
                return items?.ToList();
            }

            /// <summary>
            /// CollectionMappingDeclaration for <see cref = "global::System.Collections.Generic.IReadOnlyList{T}"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.CollectionMappingDeclaration, typeof(global::System.Collections.Generic.IReadOnlyList<>))]
            public static global::System.Collections.Generic.IReadOnlyList<T> CollectionMapping_976EA1DB5B772C59<T>(global::System.Collections.Generic.IEnumerable<T> items)
            {
                return items?.ToList();
            }

            /// <summary>
            /// CollectionMappingDeclaration for <see cref = "global::System.Collections.Generic.List{T}"/>
            /// </summary>
            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            [MappingMetadata(MappingMetadataType.CollectionMappingDeclaration, typeof(global::System.Collections.Generic.List<>))]
            public static global::System.Collections.Generic.List<T> CollectionMapping_070F0D0F908DAF14<T>(global::System.Collections.Generic.IEnumerable<T> items)
            {
                return items?.ToList();
            }
        }
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Facet ](/sources/Facet.zip)

:::


### Share Facet 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet&quote=Facet" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet&text=Facet:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet&title=Facet" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet&title=Facet&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFacet" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Facet

<SameCategory />

