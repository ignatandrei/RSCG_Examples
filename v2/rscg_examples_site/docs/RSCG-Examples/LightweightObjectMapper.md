---
sidebar_position: 1590
title: 159 - LightweightObjectMapper
description: Generating function to map DTOs
slug: /LightweightObjectMapper
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# LightweightObjectMapper  by Stratos


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/LightweightObjectMapper?label=LightweightObjectMapper)](https://www.nuget.org/packages/LightweightObjectMapper/)
[![GitHub last commit](https://img.shields.io/github/last-commit/stratosblue/LightweightObjectMapper?label=updated)](https://github.com/stratosblue/LightweightObjectMapper)
![GitHub Repo stars](https://img.shields.io/github/stars/stratosblue/LightweightObjectMapper?style=social)

## Details

### Info
:::info

Name: **LightweightObjectMapper**

A out of the box object mapper library based on `SourceGenerator`. 基于 `SourceGenerator` 的开箱即用对象映射库。

Author: Stratos

NuGet: 
*https://www.nuget.org/packages/LightweightObjectMapper/*   


You can find more details at https://github.com/stratosblue/LightweightObjectMapper

Source: https://github.com/stratosblue/LightweightObjectMapper

:::

### Original Readme
:::note

# LightweightObjectMapper

## 1. Intro

A out of the box object mapper library based on `SourceGenerator`. 基于 `SourceGenerator` 的开箱即用对象映射库。

## 2. Features

- 开箱即用、无需预配置（Out of the box, no pre-configuration required）
- 无运行库引用（No runtime library reference）
- 映射代码可观察（Observable mapping code）
- 无反射（No Reflection）
- 无Emit或其它动态生成（No emit or other dynamic generations）
- 基于拓展方法实现，不侵入目标类型（Implementation based on extension methods, non intrusive target type）

### Note!!!
 - 基于 `SourceGenerator` 实现，约等价于手写代码，无法实现手写代码不能实现的功能，如：访问私有字段、访问私有构造函数等。
 - 当前不会自动处理嵌套类型映射，需要手动映射嵌套类型后才能正常工作。

## 3. 使用方法

### 3.1 引用包
```xml
<ItemGroup>
  <PackageReference Include="LightweightObjectMapper" Version="1.0.0" />
</ItemGroup>
```

### 3.2 快速使用

无配置文件的使用方式，引用命名空间 `LightweightObjectMapper` ，直接使用拓展方法 `MapTo` 进行映射；

```C#
using LightweightObjectMapper;

class Class1 { }
class Class2 { }
struct Struct1 { }

class1Instance.MapTo<Class2>();
class1Instance.MapTo(class2Instance);

class1Instance.MapTo(ref struct1Instance);

var list1 = new List<Class1>();
list1.MapTo<IEnumerable<Class2>>();
```

### 3.3 配置映射 `MappingProfile`

 - 创建 `MappingProfile` 类：
    ```C#
    [MappingProfile]
    internal partial class SampleMappingProfile
    {
    }
    ```
    - 使用特性 `[MappingProfile]` 标记类型；
    - 将类型声明为 `partial`；

 - 为 `SampleMappingProfile` 实现对应的配置接口：
    - `IMappingPrepare<TIn, TOut>`：映射前准备。用于使用 `TIn` 映射到 `TOut` 时初始化 `TOut`；
    - `IPostMapping<TIn, TOut>`：映射后执行的动作。用于使用 `TIn` 映射到 `TOut` 完成后，执行的后续附加代码；
    - `ITypeMapping<TIn, TOut>`：接管完整的类型映射。（仅非目标实例映射时有效）；
    - `ITypeMemberIgnoreMapping<T>`：类型成员忽略映射声明。声明映射到目标类型 `T` 时，应忽略的 `T` 的成员；

 - 拓展集合映射：
    - 默认支持`T[]`、`List<T>`、`IEnumerable<T>`等基础集合映射；
    - 自定义集合映射：
        - 在 `MappingProfile` 类内部声明任意名称静态方法；
        - 使用特性 `[CollectionMapping]` 标记该方法；
        - 该方法必须包含一个`泛型参数`；
        - 该方法必须有一个参数，且参数类型为 `IEnumerable<泛型参数>`；
        - 该方法的返回值类型必须派生自 `IEnumerable<泛型参数>`；

 - 示例：
 ```C#
using System.Collections.Concurrent;
using System.Collections.Generic;
using LightweightObjectMapper;

namespace MappingProfileSample;

class MyClass1
{
    public int MyProperty1 { get; set; }

    public int MyProperty2 { get; set; }

    public int MyProperty3 { get; set; }
}

class MyClass2
{
    public int MyProperty1 { get; set; }

    public int MyProperty2 { get; set; }

    public int MyProperty3 { get; set; }
}

[MappingProfile]
internal partial class SampleMappingProfile
    : IMappingPrepare MyClass1, MyClass2
    , IPostMapping MyClass1, MyClass2
    , ITypeMapping MyClass2, MyClass1 
    , ITypeMemberIgnoreMapping MyClass2
{
    public object? IgnoreMapping(MyClass2 target)
    {
        // 映射到 MyClass2 时忽略其 MyProperty2
        return new
        {
            target.MyProperty2,
        };
    }

    public MyClass2 MappingPrepare(MyClass1 source)
    {
        // MyClass1 映射到 MyClass2 时，MyClass2 实例的创建方式
        return new MyClass2()
        {
            MyProperty1 = 1
        };
    }

    public MyClass2 PostMapping(MyClass1 source, MyClass2 target)
    {
        // MyClass1 映射到 MyClass2 时，映射完成后执行的代码
        target.MyProperty1 = source.MyProperty1 * 2;
        return target;
    }

    public MyClass1 TypeMapping(MyClass2 source)
    {
        //接管 MyClass2 到 MyClass1 的映射
        return new MyClass1()
        {
            MyProperty1 = source.MyProperty1 / 2
        };
    }

    [CollectionMapping]
    public static ConcurrentBag<T>? ToList<T>(IEnumerable<T>? items)
    {
        //拓展对 ConcurrentBag 的映射支持
        return items is null ? null : new ConcurrentBag<T>(items);
    }
}
 ```

### 3.4 引入其它程序集内的 `MappingProfile`
跨程序集共享 `MappingProfile`。
 - 将要进行共享的 `MappingProfile` 声明为 `public`；
 - 在需要引用此 `MappingProfile` 的程序集内定义新的 `MappingProfile`，并对其添加特性 `[MappingProfileInclude]` 进行引用；
 - 示例：
 ```C#
 // 引用 InternalMappingProfile 和 InternalMappingProfile1
 [MappingProfileInclude(typeof(InternalMappingProfile), typeof(InternalMappingProfile1))]
 [MappingProfile]
 internal partial class MappingProfileIncludeMapProfile1
 {
 }
 ```

### 4. 其它配置
配置项目的 `Property` 来进行一些特殊配置，示例：
```xml
  <PropertyGroup>
    <!--不添加预生成代码-->
    <NoLightweightObjectMapperPreCodes>true</NoLightweightObjectMapperPreCodes>
    <!--设置生成的拓展方法可访问性-->
    <LOMappingMethodAccessibility>public</LOMappingMethodAccessibility>
  </PropertyGroup>
```


:::

### About
:::note

Generating function to map DTOs


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **LightweightObjectMapper**
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
	  <PackageReference Include="LightweightObjectMapper" Version="1.0.2" />
	</ItemGroup>

	<!--<PropertyGroup>
		<NoLightweightObjectMapperPreCodes>true</NoLightweightObjectMapperPreCodes>
		<LOMappingMethodAccessibility>public</LOMappingMethodAccessibility>
	</PropertyGroup>-->

	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **LightweightObjectMapper** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
using LightweightObjectMapper;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= p.MapTo<PersonDTO>();
Console.WriteLine(dto.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **LightweightObjectMapper** in *Person.cs*

```csharp showLineNumbers 

public partial class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **LightweightObjectMapper** in *PersonDTO.cs*

```csharp showLineNumbers 

namespace mapperDemo;
public partial class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\Extensions.cs" label="Extensions.cs" >

  This is the use of **LightweightObjectMapper** in *Extensions.cs*

```csharp showLineNumbers 
using LightweightObjectMapper;
using System;
namespace mapperDemo;

[MappingProfile]
internal partial class Extensions:
    IPostMapping<Person, PersonDTO>
{
    

    public PersonDTO PostMapping(Person source, PersonDTO target)
    {
        target.ID = source.ID;
        return target;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\Extensions.Generated.cs" label="Extensions.Generated.cs" >


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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LightweightObjectMapper.PreCodes.LightweightObjectMapperPreCodes.cs" label="LightweightObjectMapper.PreCodes.LightweightObjectMapperPreCodes.cs" >


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
    internal interface IMappingProfile { }

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
        public MappingProfileAttribute() { }
    }

    /// <summary>
    /// 映射元数据
    /// </summary>
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    internal sealed class MappingMetadataAttribute : Attribute
    {
        /// <inheritdoc cref="MappingMetadataAttribute"/>
        public MappingMetadataAttribute(MappingMetadataType type, params object[] data) { }
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
        public MappingProfileIncludeAttribute(params Type[] profileTypes) { }
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LightweightObjectMapper.PreCodes.PredefinedSpecialTypeMapping.cs" label="LightweightObjectMapper.PreCodes.PredefinedSpecialTypeMapping.cs" >


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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\LOMMapExtensions_mapperDemo_Person.g.cs" label="LOMMapExtensions_mapperDemo_Person.g.cs" >


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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LightweightObjectMapper\src\mapperDemo\obj\GX\LightweightObjectMapper\LightweightObjectMapper.LightweightObjectMapperSourceGenerator\PredefinedSpecialTypeMapping.Generated.cs" label="PredefinedSpecialTypeMapping.Generated.cs" >


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

### Download Example (.NET  C# )

:::tip

[Download Example project LightweightObjectMapper ](/sources/LightweightObjectMapper.zip)

:::


### Share LightweightObjectMapper 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLightweightObjectMapper&quote=LightweightObjectMapper" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLightweightObjectMapper&text=LightweightObjectMapper:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLightweightObjectMapper" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLightweightObjectMapper&title=LightweightObjectMapper" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLightweightObjectMapper&title=LightweightObjectMapper&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLightweightObjectMapper" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/LightweightObjectMapper

### In the same category (Mapper) - 7 other generators


#### [AutoDTO](/docs/AutoDTO)


#### [AutoGen](/docs/AutoGen)


#### [DynamicsMapper](/docs/DynamicsMapper)


#### [MagicMap](/docs/MagicMap)


#### [mapperly](/docs/mapperly)


#### [MapTo](/docs/MapTo)


#### [NextGenMapper](/docs/NextGenMapper)

