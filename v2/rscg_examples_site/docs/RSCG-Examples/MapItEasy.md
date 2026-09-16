---
sidebar_position: 2930
title: 293 - MapItEasy
description: Mapping from an object to another object
slug: /MapItEasy
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMapper.mdx';

# MapItEasy  by Phong Nguyen


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MapItEasy?label=MapItEasy)](https://www.nuget.org/packages/MapItEasy/)
[![GitHub last commit](https://img.shields.io/github/last-commit/phongnguyend/MapItEasy?label=updated)](https://github.com/phongnguyend/MapItEasy/)
![GitHub Repo stars](https://img.shields.io/github/stars/phongnguyend/MapItEasy?style=social)

## Details

### Info
:::info

Name: **MapItEasy**

Package Description

Author: Phong Nguyen

NuGet: 
*https://www.nuget.org/packages/MapItEasy/*   


You can find more details at https://github.com/phongnguyend/MapItEasy/

Source: https://github.com/phongnguyend/MapItEasy/

:::

### Author
:::note
Phong Nguyen 
![Alt text](https://github.com/phongnguyend.png)
:::

## Original Readme
:::note

### MapItEasy

Simple and fast object mapper (using Expression Trees API and Source Generators) to map data between 2 objects which have identical (or nearly identical) shapes.

###### Use Cases
- Cloning.
- Data archiving (moving data from the active table to the archived table).

###### Installation

Install the package from NuGet:

```bash
dotnet add package MapItEasy
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package MapItEasy
```

###### Getting Started

######### Using `IMapper`

```csharp
IMapper mapper = new ExpressionMapper();
// or
IMapper mapper = new ReflectionMapper();
```

########## Map all properties (return new object)
```csharp
var source = new A \{ Id = 1, Name = "abc1", Description = "xyz1" };

var target = mapper.Map<A, B>(source);
```

########## Map all properties (existing object)
```csharp
var source = new A \{ Id = 1, Name = "abc1", Description = "xyz1" };
var target = new B();

mapper.Map(source, target);
```

########## Map only selected properties
```csharp
var source = new A \{ Id = 1, Name = "abc1", Description = "xyz1" };
var target = new B();

mapper.Map(source, target, new MappingOptions<A> \{ Include = x => new \{ x.Name \} });
// target.Id == 0, target.Name == "abc1", target.Description == null
```

########## Map all properties except selected ones
```csharp
var source = new A \{ Id = 1, Name = "abc1", Description = "xyz1" };
var target = new B();

mapper.Map(source, target, new MappingOptions<A> \{ Exclude = x => new \{ x.Name \} });
// target.Id == 1, target.Name == null, target.Description == "xyz1"
```

> **Note:** `Include` and `Exclude` cannot be used together. Doing so will throw an `InvalidOperationException`.

######### Using Extension Methods

`MapperExtensions` provides convenient extension methods using `ExpressionMapper` under the hood:

```csharp
var source = new A \{ Id = 1, Name = "abc1", Description = "xyz1" };

// Return new object
var target = source.Map<A, B>();

// Map to existing object
var target2 = new B();
source.Map(target2);

// With options
source.Map(target2, new MappingOptions<A> \{ Include = x => new \{ x.Name \} });
```

###### Source Generator

For **zero-reflection, compile-time mapping**, install the source generator package:

```bash
dotnet add package MapItEasy.Generators
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package MapItEasy.Generators
```

Define `partial` methods decorated with the `[GeneratedMapping]` attribute, and the source generator will provide the implementation at compile time:

```csharp
using MapItEasy;

public static partial class MappingExtensions
{
    // Return a new mapped object
    [GeneratedMapping]
    public static partial B MapToB(A source);

    // Map to an existing object
    [GeneratedMapping]
    public static partial void MapToB(A source, B target);

    // Extension method - return a new mapped object
    [GeneratedMapping]
    public static partial B ToB(this A source);

    // Extension method - map to an existing object
    [GeneratedMapping]
    public static partial void ToB(this A source, B target);

    // With MappingOptions support
    [GeneratedMapping]
    public static partial B MapToB(A source, MappingOptions<A>? options = null);

    [GeneratedMapping]
    public static partial void MapToB(A source, B target, MappingOptions<A>? options = null);
}
```

Usage:

```csharp
var source = new A \{ Id = 1, Name = "abc1", Description = "xyz1" };

// Static call
var target = MappingExtensions.MapToB(source);

// Extension method call
var target2 = source.ToB();

// Map to existing object via extension method
var target3 = new B();
source.ToB(target3);

// With MappingOptions
var target4 = MappingExtensions.MapToB(source, new MappingOptions<A> \{ Include = x => new \{ x.Name \} });
```

###### License
**MapItEasy** is licensed under the [MIT](https://github.com/phongnguyend/MapItEasy/LICENSE) license.


:::

### About
:::note

Mapping from an object to another object


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MapItEasy**
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
	  <PackageReference Include="MapItEasy" Version="2.0.0" />
	  <PackageReference Include="MapItEasy.Generators" Version="2.0.0">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapItEasy\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **MapItEasy** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO personDTO= UserMapper.MapUser(p);
Console.WriteLine(personDTO.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapItEasy\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **MapItEasy** in *Person.cs*

```csharp showLineNumbers 

public partial class Person
{
    public int ID \{ get; set; }
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapItEasy\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **MapItEasy** in *PersonDTO.cs*

```csharp showLineNumbers 
using MapItEasy;

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


public static partial class UserMapper
{
    [GeneratedMapping]
    public static partial PersonDTO MapUser(Person from);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapItEasy\src\mapperDemo\obj\GX\MapItEasy.Generators\MapItEasy.Generators.MappingSourceGenerator\mapperDemo.UserMapper.g.cs" label="mapperDemo.UserMapper.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace mapperDemo;

public static partial class UserMapper
{
    public static partial global::mapperDemo.PersonDTO MapUser(global::Person from)
    {
        if (from == null)
            throw new global::System.ArgumentNullException(nameof(from));

        var target = new global::mapperDemo.PersonDTO();

        target.FirstName = from.FirstName;
        target.LastName = from.LastName;

        return target;
    }

}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project MapItEasy ](/sources/MapItEasy.zip)

:::


### Share MapItEasy 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapItEasy&quote=MapItEasy" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapItEasy&text=MapItEasy:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapItEasy" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapItEasy&title=MapItEasy" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapItEasy&title=MapItEasy&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapItEasy" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MapItEasy

<SameCategory />

