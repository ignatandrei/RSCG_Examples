---
sidebar_position: 920
title: 92 - RSCG_UtilityTypes
description: Add omit and pick to selectively generate types from existing types
slug: /RSCG_UtilityTypes
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_UtilityTypes  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_UtilityTypes?label=RSCG_UtilityTypes)](https://www.nuget.org/packages/RSCG_UtilityTypes/)[![Nuget](https://img.shields.io/nuget/dt/RSCG_UtilityTypesCommon?label=RSCG_UtilityTypesCommon)](https://www.nuget.org/packages/RSCG_UtilityTypesCommon)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_UtilityTypes?label=updated)](https://github.com/ignatandrei/RSCG_UtilityTypes)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_UtilityTypes?style=social)

## Details

### Info
:::info

Name: **RSCG_UtilityTypes**

Roslyn Utility Types - Pick, Omit

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_UtilityTypes/*   

*https://www.nuget.org/packages/RSCG_UtilityTypesCommon*   


You can find more details at https://github.com/ignatandrei/RSCG_UtilityTypes

Source : https://github.com/ignatandrei/RSCG_UtilityTypes

:::

### Original Readme
:::note

# RSCG_UtilityTypes

Omit and Pick from TypeScript : https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

generating also extension for converting from one type to another . See demo project.

## Usage

Add to your csproj file
```xml
  <ItemGroup>
	  <PackageReference Include="RSCG_UtilityTypes" Version="2023.1223.1230" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	  <PackageReference Include="RSCG_UtilityTypesCommon" Version="2023.1223.1230" />
  </ItemGroup>

```

In C# 9.0

```csharp
[Omit("MoviePreviewSmall", nameof(Actors),nameof(Year))]
[Pick("MoviePreviewMinimal", nameof(Title), nameof(Year))]
public class Movie
{
    public string? Title { get; set; }
    public string? Director { get; set; }
    public int Year { get; set; }
    public string[]? Actors { get; set; }
}
```

And 2 new classes will be generated , MoviePreviewSmall and MoviePreviewMinimal

:::

### About
:::note

Add omit and pick to selectively generate types from existing types


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_UtilityTypes**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
	  <PackageReference Include="RSCG_UtilityTypes" Version="2023.1223.1230" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	  <PackageReference Include="RSCG_UtilityTypesCommon" Version="2023.1223.1230" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_UtilityTypes\src\UtilDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_UtilityTypes** in *Program.cs*

```csharp showLineNumbers 
using UtilDemo;

var p=new PersonFull();
p.FirstName="Andrei";
p.LastName="Ignat";
Person1 p1=(Person1)p ;
Person2 p2=(Person2)p ;
Console.WriteLine(p1.FirstName);
Console.WriteLine(p2.LastName);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_UtilityTypes\src\UtilDemo\Person.cs" label="Person.cs" >

  This is the use of **RSCG_UtilityTypes** in *Person.cs*

```csharp showLineNumbers 
using RSCG_UtilityTypesCommon;

namespace UtilDemo;
[Pick("Person1",nameof(FirstName),nameof(LastName))]
[Omit("Person2", nameof(Salary))]
public class PersonFull
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Salary { get; set; }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_UtilityTypes\src\UtilDemo\obj\GX\RSCG_UtilityTypes\RSCG_UtilityTypes.OmitPick\PersonFull_Person1.cs" label="PersonFull_Person1.cs" >


```csharp showLineNumbers 
namespace UtilDemo
{
partial class Person1
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

public static explicit operator Person1(PersonFull data )
    {
        var ret= new Person1 ();
        ret.FirstName = data.FirstName;
ret.LastName = data.LastName;
        return ret;
    }



public static explicit operator PersonFull(Person1 data )
    {
        var ret= new PersonFull ();
        ret.FirstName = data.FirstName;
ret.LastName = data.LastName;
        return ret;
    }


}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_UtilityTypes\src\UtilDemo\obj\GX\RSCG_UtilityTypes\RSCG_UtilityTypes.OmitPick\PersonFull_Person2.cs" label="PersonFull_Person2.cs" >


```csharp showLineNumbers 
namespace UtilDemo
{
partial class Person2
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

public static explicit operator Person2(PersonFull data )
    {
        var ret= new Person2 ();
        ret.FirstName = data.FirstName;
ret.LastName = data.LastName;
        return ret;
    }



public static explicit operator PersonFull(Person2 data )
    {
        var ret= new PersonFull ();
        ret.FirstName = data.FirstName;
ret.LastName = data.LastName;
        return ret;
    }


}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_UtilityTypes ](/sources/RSCG_UtilityTypes.zip)

:::


### Share RSCG_UtilityTypes 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_UtilityTypes&quote=RSCG_UtilityTypes" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_UtilityTypes&text=RSCG_UtilityTypes:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_UtilityTypes" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_UtilityTypes&title=RSCG_UtilityTypes" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_UtilityTypes&title=RSCG_UtilityTypes&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_UtilityTypes" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_UtilityTypes

### In the same category (EnhancementClass) - 27 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [Equatable.Generator](/docs/Equatable.Generator)


#### [FastGenericNew](/docs/FastGenericNew)


#### [GeneratorEquals](/docs/GeneratorEquals)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [QueryStringGenerator](/docs/QueryStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

