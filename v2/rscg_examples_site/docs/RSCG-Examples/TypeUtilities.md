---
sidebar_position: 1270
title: 127 - TypeUtilities
description: Pick/Omit for classes ( also have some mapping )
slug: /TypeUtilities
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# TypeUtilities  by Yevhenii Serdiuk


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/TypeUtilities?label=TypeUtilities)](https://www.nuget.org/packages/TypeUtilities/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DragonsLord/TypeUtilities?label=updated)](https://github.com/DragonsLord/TypeUtilities)
![GitHub Repo stars](https://img.shields.io/github/stars/DragonsLord/TypeUtilities?style=social)

## Details

### Info
:::info

Name: **TypeUtilities**

A set of type utilities to transform types.
			Include utils like:
				- Pick
				- Omit

Author: Yevhenii Serdiuk

NuGet: 
*https://www.nuget.org/packages/TypeUtilities/*   


You can find more details at https://github.com/DragonsLord/TypeUtilities

Source : https://github.com/DragonsLord/TypeUtilities

:::

### Original Readme
:::note

# TypeUtilities

[![Build](https://github.com/DragonsLord/TypeUtilities/actions/workflows/build.yml/badge.svg)](https://github.com/DragonsLord/TypeUtilities/actions/workflows/build.yml)
[![NuGet](https://img.shields.io/nuget/v/TypeUtilities.svg)](https://www.nuget.org/packages/TypeUtilities/)

Type Utilities provides a source generators to create/transform one type into another.

This project was inspired by the [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) and was ment to bring similar functionality to the C# via source generators

## Installation

To use the the TypeUtilities, install the [TypeUtilities package](https://www.nuget.org/packages/TypeUtilities) into your project.

To install the packages, add the references to your _csproj_ file, for example by running

```bash
dotnet add package TypeUtilities
```

This adds a `<PackageReference>` to your project.

## Usage

TypeUtilities provides several attributes:

### Map

Map Attribute simply maps memebers of the source type to the target type using specified format.

```csharp
using TypeUtilities;
using TypeUtilities.Abstractions;

public class SourceType
{
    public Guid Id { get; }
    public int Value { get; set; }
    public DateTime Created { get; set; }
}

[Map(typeof(SourceType))]
public partial class SimpleMap
{
}

// Generated result
//----- SimpleMap.map.SourceType.g.cs
public partial class SimpleMap
{
    public System.Guid Id { get; }
    public int Value { get; set; }
    public System.DateTime Created { get; set; }
}
// --------------------

[Map(typeof(SourceType),
      MemberDeclarationFormat = $"{Tokens.Accessibility} string Mapped{Tokens.Name}{Tokens.Accessors}",
      MemberKindSelection = MemberKindFlags.ReadonlyProperty
    )]
public partial class AdvancedMap
{
}

// Generated result
//----- AdvancedMap.map.SourceType.g.cs
public partial class AdvancedMap
{
    public string MappedId { get; }
}
// --------------------
```

More detailed description for Map is provided [here](docs/Map.md)

### Omit

Omit Attribute is similar to Map but also accepts an explicit list of members that should be exluded

```csharp
using TypeUtilities;

public class SourceType
{
    public Guid Id { get; }
    public int Value { get; set; }
    public DateTime Created { get; set; }
}

[Omit(typeof(SourceType), "Value")]
public partial class TargetType
{
  public int MyValue { get; set; }
}

// Generated result
//----- TargetType.omit.SourceType.g.cs
public partial class TargetType
{
    public Guid Id { get; }
    public DateTime Created { get; set; }
}
```

### Pick

Pick Attribute is similar to Map but also requires to explicitly specify all members that should be included

```csharp
using TypeUtilities;

public class SourceType
{
    public Guid Id { get; }
    public int Value { get; set; }
    public DateTime Created { get; set; }
}

[Pick(typeof(SourceType), "Id", nameof(SourceType.Value))]
public partial class TargetType
{
}

// Generated result
//----- TargetType.omit.SourceType.g.cs
public partial class TargetType
{
    public Guid Id { get; }
    public int Value { get; set; }
}
```


:::

### About
:::note

Pick/Omit for classes ( also have some mapping )


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TypeUtilities**
```xml showLineNumbers {14}
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
	  <PackageReference Include="TypeUtilities" Version="0.0.1" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypeUtilities\src\UtilDemo\Program.cs" label="Program.cs" >

  This is the use of **TypeUtilities** in *Program.cs*

```csharp showLineNumbers 
using UtilDemo;

var p=new PersonFull();
p.FirstName="Andrei";
p.LastName="Ignat";
//Person1 p1=(Person1)p ;
//Person2 p2=(Person2)p ;
Person1 p1 = new();
p1.FirstName = p.FirstName;

Person2 p2=new();
p2.LastName = p.LastName;


Console.WriteLine(p1.FirstName);
Console.WriteLine(p2.LastName);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypeUtilities\src\UtilDemo\Person.cs" label="Person.cs" >

  This is the use of **TypeUtilities** in *Person.cs*

```csharp showLineNumbers 
using TypeUtilities;
using static TypeUtilities.Abstractions.MemberDeclarationFormats;
using TypeUtilities.Abstractions;

namespace UtilDemo;
public class PersonFull
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Salary { get; set; }

}

[Map(typeof(PersonFull),
      MemberDeclarationFormat = $"{Tokens.Accessibility} string Mapped{Tokens.Name}{Tokens.Accessors}",
      MemberKindSelection = MemberKindFlags.AnyProperty
    )]
[Omit(typeof(PersonFull), nameof(PersonFull.Salary))]
public partial class Person2
{
    
}

[Pick(typeof(PersonFull), nameof(PersonFull.FirstName), nameof(PersonFull.LastName))]
public partial class Person1
{
    
}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypeUtilities\src\UtilDemo\obj\GX\TypeUtilities.SourceGenerators\TypeUtilities.SourceGenerators.TypeUtilitiesSourceGenerator\Person1.pick.PersonFull.g.cs" label="Person1.pick.PersonFull.g.cs" >


```csharp showLineNumbers 
namespace UtilDemo;

public partial class Person1
{
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypeUtilities\src\UtilDemo\obj\GX\TypeUtilities.SourceGenerators\TypeUtilities.SourceGenerators.TypeUtilitiesSourceGenerator\Person2.map.PersonFull.g.cs" label="Person2.map.PersonFull.g.cs" >


```csharp showLineNumbers 
namespace UtilDemo;

public partial class Person2
{
	public string MappedFirstName { get; set; }
	public string MappedLastName { get; set; }
	public string MappedSalary { get; set; }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypeUtilities\src\UtilDemo\obj\GX\TypeUtilities.SourceGenerators\TypeUtilities.SourceGenerators.TypeUtilitiesSourceGenerator\Person2.omit.PersonFull.g.cs" label="Person2.omit.PersonFull.g.cs" >


```csharp showLineNumbers 
namespace UtilDemo;

public partial class Person2
{
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project TypeUtilities ](/sources/TypeUtilities.zip)

:::


### Share TypeUtilities 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypeUtilities&quote=TypeUtilities" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypeUtilities&text=TypeUtilities:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypeUtilities" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypeUtilities&title=TypeUtilities" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypeUtilities&title=TypeUtilities&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypeUtilities" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TypeUtilities

### In the same category (FunctionalProgramming) - 9 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [UnionsGenerator](/docs/UnionsGenerator)

