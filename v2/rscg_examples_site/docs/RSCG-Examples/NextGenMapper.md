---
sidebar_position: 460
title: 46 - NextGenMapper
description: Automating generating mapping between classes
slug: /NextGenMapper
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# NextGenMapper  by Anton Ryabchikov


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/NextGenMapper?label=NextGenMapper)](https://www.nuget.org/packages/NextGenMapper/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DedAnton/NextGenMapper?label=updated)](https://github.com/DedAnton/NextGenMapper)
![GitHub Repo stars](https://img.shields.io/github/stars/DedAnton/NextGenMapper?style=social)

## Details

### Info
:::info

Name: **NextGenMapper**

Package Description

Author: Anton Ryabchikov

NuGet: 
*https://www.nuget.org/packages/NextGenMapper/*   


You can find more details at https://github.com/DedAnton/NextGenMapper

Source : https://github.com/DedAnton/NextGenMapper

:::

### Original Readme
:::note

<p align="center">
    <img src="https://user-images.githubusercontent.com/36799941/191375272-27b0034d-0418-44a6-95c6-802b863de2b3.svg" width="242" height="242" />
</p>
<p align="center">
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/>
    </a>
    <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/DedAnton/NextGenMapper?include_prereleases" />
    <a href="https://vk.com/away.php?utf=1&to=https%3A%2F%2Fwww.tinkoff.ru%2Fcf%2F3ySZ9DEsxfL">
        <img src="https://img.shields.io/badge/%24-donate-9cf" alt="donate" />
    </a>
    <h4 align="center">Extremely fast and lightweight minimalistic object mapper generated on the fly</h4>
</p>

https://user-images.githubusercontent.com/36799941/191618500-31f7e179-3510-49dc-ad13-18e07de8309b.mov

# Key features
- Generation of mapping methods on the fly
- Reflection and expression trees are not used
- Performance like a hand-written mapper
- Minimum memory allocation
- Does not increase application startup time
- No dependencies in the final assembly
- No third party tools and IDE dependencies
- Static analysis support
- Code navigation support
- Easy to debug
- No attributes and fluid API

NextGenMapper is a tool that just solves a problem and tries not to create new ones

# Usage

Add `using NextGenMapper` and call the `Map` extension method on the object you want to map
```c#
using NextGenMapper;

var source = new Source("Anton", 25);

var destination = source.Map<Destination>();

Console.WriteLine(destination);

record Source(string Name, int Age);
record Destination(string Name, int Age);
```
<br />

To customize the mapping of certain properties, call the `MapWith` method and pass the value of the overridden property as an argument
```c#
using NextGenMapper;

var source = new Source("Anton", "Ryabchikov", 25);

var destination = source.MapWith<Destination>(name: source.FirstName + ' ' + source.LastName);

Console.WriteLine(destination);

record Source(string FirstName, string LastName, int Age);
record Destination(string Name, int Age);
```
<br />

In order for NextGenMapper to use your mapping when mapping other objects, you need to create a partial class `Mapper` in the `NextGenMapper` namespace and add the `Map` method with your implementation to it
```c#
namespace NextGenMapper;

internal static partial class Mapper
{
    internal static Destination Map<To>(this Source source) 
        => source.MapWith<Destination>(name: source.FirstName + ' ' + source.LastName);
}
```
<br />

The following collection types are currently supported: `List<T>`, `Array<T>`, `ICollection<T>`, `IEnumerable<T>`, `IList<T>`, `IReadOnlyCollection<T>`, `IReadOnlyList<T>`, `ImmutableArray<T>`, `ImmutableList<T>`, `IImmutableList<T>`
```c#
var sourceCollection = new List<Source> { new("Anton", 25) };

var destination = sourceCollection.Map<List<Destination>>();
```
<br />

Enums can also be mapped
```c#
var source = Source.EnumValue;

var destination = source.Map<Destination>();
```
<br />

Projection for IQueryable supported
```c#
_dbContext.Users.Project<UserDestination>().ToList();
```
<br />

> **Note**: 
> Due to the use of new technology, some versions of Visual Studio can sometimes experience problems with syntax highlighting if IntelliCode says an error, but the solution was build without errors is to simply restart Visual Studio
### Installation

Install from the package manager console:
```
PM> Install-Package NextGenMapper -prerelease
```
Or from the .NET CLI as:
```
dotnet add package NextGenMapper --prerelease
```

# How it works?
NextGenMapper uses the new C# language feature - [Source Code Generators](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/). You can describe the work of the Source Code Generator in the following steps:
1. Code compiles
2. The source code generator analyzes the assembly
3. Generates new code based on analysis
4. Compiles the new code and adds it to the assembly

This is how the method that is called initially looks like:
```C#
internal static To Map<To>(this object source) => throw new InvalidOperationException($""Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function."");
```

When we call it, the generator analyzes this call and generates a mapping function:
```C#
internal static Destination Map<To>(this Source source) 
    => new Destination(source.Name, source.Age);
```

The trick is that the method signatures are identical, but the generated method has more specific parameters and fits better, so it is called ([this behavior is described in the specification](https://github.com/dotnet/csharplang/blob/a4c9db9a69ae0d1334ed5675e8faca3b7574c0a1/spec/expressions.md#better-function-member))

# Status
At the moment, all the main functionality has been added. But the work isn't over yet.

All tasks and their progress can be viewed on the [project board](https://github.com/users/DedAnton/projects/3)


:::

### About
:::note

Automating generating mapping between classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **NextGenMapper**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="NextGenMapper" Version="0.1.0-alpha.13" OutputItemType="Analyzer"  />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\Program.cs" label="Program.cs" >

  This is the use of **NextGenMapper** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using NextGenMapperDemo;

using NextGenMapper;

//var source = new Source("Anton", 25);

//var destination = source.Map<Destination>();

//Console.WriteLine(destination);


//record Source(string Name, int Age);
//record Destination(string Name, int Age);

Person p = new();
p.Name = "Andrei Ignat";
p.Country_Name = "Romania";

var dto = p.MapWith<PersonDTO>(
    BirthCountry:new Country()
    {
        CountryCode=p.Country_CountryCode,
        Name=p.Country_Name
    });

//Name is automatically mapped
Console.WriteLine(dto.Name);
Console.WriteLine(dto.BirthCountry!.Name);

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\Person.cs" label="Person.cs" >

  This is the use of **NextGenMapper** in *Person.cs*

```csharp showLineNumbers 

namespace NextGenMapperDemo;

internal class Person
{
    public int ID { get; set; } 
    public string? Name { get; set; }
    public string? Country_Name { get; set; }
    public string? Country_CountryCode { get; set; }
}



```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **NextGenMapper** in *PersonDTO.cs*

```csharp showLineNumbers 

namespace NextGenMapperDemo;
internal class Country
{

    public string? Name { get; set; }
    public string? CountryCode { get; set; }
}
internal class PersonDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public Country? BirthCountry { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\obj\GX\NextGenMapper\NextGenMapper.MapperGenerator\MapperExtensions.g.cs" label="MapperExtensions.g.cs" >


```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace NextGenMapper.Extensions
{
    internal static class MapperExtensions
    {
        /// <summary>
        /// Do not use this method, for auto-generated mapper only!
        /// </summary>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static bool TryGetSpan<TSource>(this IEnumerable<TSource> source, out ReadOnlySpan<TSource> span)
        {
            bool result = true;
            if (source.GetType() == typeof(TSource[]))
            {
                span = Unsafe.As<TSource[]>(source);
            }
            #if NET5_0_OR_GREATER
            else if (source.GetType() == typeof(List<TSource>))
            {
                span = CollectionsMarshal.AsSpan(Unsafe.As<List<TSource>>(source));
            }
            #endif
            else
            {
                span = default;
                result = false;
            }

            return result;
        }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\obj\GX\NextGenMapper\NextGenMapper.MapperGenerator\Mapper_ClassMaps.g.cs" label="Mapper_ClassMaps.g.cs" >


```csharp showLineNumbers 
#nullable enable
using NextGenMapper.Extensions;

namespace NextGenMapper
{
    internal static partial class Mapper
    {
        internal static NextGenMapperDemo.PersonDTO Map<To>(this NextGenMapperDemo.Person source) => new NextGenMapperDemo.PersonDTO()
        {
            Name = source.Name
        };
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\obj\GX\NextGenMapper\NextGenMapper.MapperGenerator\Mapper_ConfiguredMaps.g.cs" label="Mapper_ConfiguredMaps.g.cs" >


```csharp showLineNumbers 
#nullable enable
using NextGenMapper.Extensions;

namespace NextGenMapper
{
    internal static partial class Mapper
    {
        internal static NextGenMapperDemo.PersonDTO MapWith<To>
        (
            this NextGenMapperDemo.Person source,
            NextGenMapperDemo.Country BirthCountry
        )
        => new NextGenMapperDemo.PersonDTO
        {
            Name = source.Name,
            BirthCountry = BirthCountry
        };
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\obj\GX\NextGenMapper\NextGenMapper.MapperGenerator\Mapper_ConfiguredMaps_MockMethods.g.cs" label="Mapper_ConfiguredMaps_MockMethods.g.cs" >


```csharp showLineNumbers 
#nullable enable
using NextGenMapper.Extensions;

namespace NextGenMapper
{
    internal static partial class Mapper
    {
        internal static NextGenMapperDemo.PersonDTO MapWith<To>
        (
            this NextGenMapperDemo.Person source,
            int Id = default!,
            string? Name = default!,
            NextGenMapperDemo.Country? BirthCountry = default!
        )
        {
            throw new System.NotImplementedException("This method is a mock and is not intended to be called");
        }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NextGenMapper\src\NextGenMapperDemo\NextGenMapperDemo\obj\GX\NextGenMapper\NextGenMapper.MapperGenerator\StartMapper.g.cs" label="StartMapper.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;

namespace NextGenMapper
{
    internal static partial class Mapper
    {
        internal static To Map<To>(this object source) => throw new InvalidOperationException($"Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function.");

        internal static To MapWith<To>(this object source) => throw new InvalidOperationException($"Error when mapping {source.GetType()} to {typeof(To)}, mapping function was not found. Create custom mapping function.");
    
        internal static To Project<To>(this IQueryable<object> source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, project function was not found.");
        
        internal static To ProjectWith<To>(this IQueryable<object> source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, project function was not found.");
        
        internal static To Project<To>(this IQueryable source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, projection for non generic IQueryable is not supported");

        internal static To ProjectWith<To>(this IQueryable source) => throw new InvalidOperationException($"Error when project {source.GetType()} to {typeof(To)}, projection for non generic IQueryable is not supported");
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project NextGenMapper ](/sources/NextGenMapper.zip)

:::


### Share NextGenMapper 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&quote=NextGenMapper" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&text=NextGenMapper:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&title=NextGenMapper" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper&title=NextGenMapper&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNextGenMapper" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/NextGenMapper

## In the same category (Mapper)


### [AutoDTO](/docs/AutoDTO)


### [JsonPolymorphicGenerator](/docs/JsonPolymorphicGenerator)


### [mapperly](/docs/mapperly)


### [MapTo](/docs/MapTo)

