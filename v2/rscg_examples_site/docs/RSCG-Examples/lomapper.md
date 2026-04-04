---
sidebar_position: 2650
title: 265 - lomapper
description: Generate mapping code at compile time using source generators.
slug: /lomapper
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSerializer.mdx';

# lomapper  by Junaid Desai


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/lomapper?label=lomapper)](https://www.nuget.org/packages/lomapper/)
[![GitHub last commit](https://img.shields.io/github/last-commit/jdtoon/lomapper?label=updated)](https://github.com/jdtoon/lomapper)
![GitHub Repo stars](https://img.shields.io/github/stars/jdtoon/lomapper?style=social)

## Details

### Info
:::info

Name: **lomapper**

LoMapper - Lightweight Object Mapper using compile-time source generation. Zero runtime reflection.

Author: Junaid Desai

NuGet: 
*https://www.nuget.org/packages/lomapper/*   


You can find more details at https://github.com/jdtoon/lomapper

Source: https://github.com/jdtoon/lomapper

:::

### Author
:::note
Junaid Desai 
![Alt text](https://github.com/jdtoon.png)
:::

## Original Readme
:::note

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
    public int Id \{ get; set; }
    public string Name \{ get; set; }
    public string Email \{ get; set; }
}

public class UserDto
{
    public int Id \{ get; set; }
    public string Name \{ get; set; }
    public string Email \{ get; set; }
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
public class Source \{ public int ID \{ get; set; \} }
public class Target \{ public int Id \{ get; set; \} }  // ✅ Matched
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
public class Source \{ public List<ItemEntity> Items \{ get; set; \} }
public class Target \{ public List<ItemDto> Items \{ get; set; \} }  // ✅ Auto-mapped
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

public class SourceA \{ public SourceB? Child \{ get; set; \} }
public class SourceB \{ public SourceA? Parent \{ get; set; \} }

public class TargetA \{ public TargetB? Child \{ get; set; \} }
public class TargetB \{ public TargetA? Parent \{ get; set; \} }
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
public class Source \{ public int Id \{ get; set; \} }
public class Target \{ public int Id \{ get; set; \} public string Extra \{ get; set; \} }

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


:::

### About
:::note

Generate mapping code at compile time using source generators.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **lomapper**
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
	  <PackageReference Include="LoMapper" Version="0.4.0">
	  </PackageReference>
	</ItemGroup>


	
	
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **lomapper** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= new UserMapper().Map(p);
Console.WriteLine(dto.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **lomapper** in *Person.cs*

```csharp showLineNumbers 

public partial class Person
{
    public int ID \{ get; set; }
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **lomapper** in *PersonDTO.cs*

```csharp showLineNumbers 
using LoMapper;
using System.Xml.Serialization;

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


[Mapper]
public partial class UserMapper
{
    [MapIgnore(nameof(Person.ID))]
    public partial PersonDTO Map(Person entity);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\Extensions.Generated.cs" label="Extensions.Generated.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LightweightObjectMapper.PreCodes.LightweightObjectMapperPreCodes.cs" label="LightweightObjectMapper.PreCodes.LightweightObjectMapperPreCodes.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LightweightObjectMapper.PreCodes.PredefinedSpecialTypeMapping.cs" label="LightweightObjectMapper.PreCodes.PredefinedSpecialTypeMapping.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LOMMapExtensions_mapperDemo_Person.g.cs" label="LOMMapExtensions_mapperDemo_Person.g.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\PredefinedSpecialTypeMapping.Generated.cs" label="PredefinedSpecialTypeMapping.Generated.cs" >
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\loMapper\src\mapperDemo\obj\GX\LoMapper.Generator\LoMapper.Generator.LoMapperGenerator\UserMapper.g.cs" label="UserMapper.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace mapperDemo
{
    public partial class UserMapper
    {
        public partial mapperDemo.PersonDTO Map(Person entity)
        {
            return new mapperDemo.PersonDTO
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName
            };
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project lomapper ](/sources/lomapper.zip)

:::


### Share lomapper 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Flomapper&quote=lomapper" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Flomapper&text=lomapper:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Flomapper" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Flomapper&title=lomapper" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Flomapper&title=lomapper&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Flomapper" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/lomapper

<SameCategory />

