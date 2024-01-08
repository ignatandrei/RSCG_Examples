---
sidebar_position: 910
title: 91 - Ling.Audit
description: Generating audit data from class implementation of interfaces
slug: /Ling.Audit
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Ling.Audit  by Jing Ling


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Ling.Audit?label=Ling.Audit)](https://www.nuget.org/packages/Ling.Audit/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ling921/dotnet-lib?label=updated)](https://github.com/ling921/dotnet-lib/)
![GitHub Repo stars](https://img.shields.io/github/stars/ling921/dotnet-lib?style=social)

## Details

### Info
:::info

Name: **Ling.Audit**

A source generator for audit properties.

Author: Jing Ling

NuGet: 
*https://www.nuget.org/packages/Ling.Audit/*   


You can find more details at https://github.com/ling921/dotnet-lib/

Source : https://github.com/ling921/dotnet-lib/

:::

### Original Readme
:::note

## Introduction

This is a dotnet library repository that contains the following public libraries

| Project  | Package  | Description |
|  ----  |  ----  | ----  |
| [`Ling.Cache`](https://github.com/ling921/dotnet-lib/src/Ling.Cache) | [![NuGet](https://img.shields.io/nuget/v/Ling.Cache.svg)](https://www.nuget.org/packages/Ling.Cache/) | A cache library that can easily use memory cache or redis cache. |
| [`Ling.Audit`](https://github.com/ling921/dotnet-lib/src/Ling.Audit) | [![NuGet](https://img.shields.io/nuget/v/Ling.Audit.svg)](https://www.nuget.org/packages/Ling.Audit/) | A source generator to generate audit properties. |
| [`Ling.EntityFrameworkCore`](https://github.com/ling921/dotnet-lib/src/Ling.EntityFrameworkCore) | [![NuGet](https://img.shields.io/nuget/v/Ling.EntityFrameworkCore.svg)](https://www.nuget.org/packages/Ling.EntityFrameworkCore/) | An extension library of `Microsoft.EntityFrameworkCore`. |
| [`Ling.EntityFrameworkCore.Audit`](https://github.com/ling921/dotnet-lib/src/Ling.EntityFrameworkCore.Audit) | [![NuGet](https://img.shields.io/nuget/v/Ling.EntityFrameworkCore.Audit.svg)](https://www.nuget.org/packages/Ling.EntityFrameworkCore.Audit/) | An extension library that can automatically record entity changes of `Microsoft.EntityFrameworkCore`. |
| [`Ling.Blazor`](https://github.com/ling921/dotnet-lib/src/Ling.Blazor) | [![NuGet](https://img.shields.io/nuget/v/Ling.Blazor.svg)](https://www.nuget.org/packages/Ling.Blazor/) | A library for Blazor. |
| [`Ling.Blazor.Authentication`](https://github.com/ling921/dotnet-lib/src/Ling.Blazor.Authentication) | [![NuGet](https://img.shields.io/nuget/v/Ling.Blazor.Authentication.svg)](https://www.nuget.org/packages/Ling.Blazor.Authentication/) | A library that provides JWT authentication for Blazor applications. |

## License

This project is licensed under the [Apache-2.0](https://github.com/ling921/dotnet-lib//LICENSE.md)


:::

### About
:::note

Generating audit data from class implementation of interfaces


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Ling.Audit**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Ling.Audit" Version="1.1.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Ling.Audit\src\LingDemo\Program.cs" label="Program.cs" >

  This is the use of **Ling.Audit** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using LingDemo;

Console.WriteLine("Hello, World!");
var p = new Person();
await Task.Delay(2000);
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine(p.CreationTime);
Console.WriteLine(p.LastModificationTime);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Ling.Audit\src\LingDemo\Person.cs" label="Person.cs" >

  This is the use of **Ling.Audit** in *Person.cs*

```csharp showLineNumbers 
using Ling.Audit;

namespace LingDemo;
partial class Person :IFullAudited<Guid>
{
    public int ID { get; set; }
    public string FirstName { get; set; }= string.Empty;
    public string LastName { get; set; } = string.Empty;
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Ling.Audit\src\LingDemo\obj\GX\Ling.Audit\Ling.Audit.SourceGeneration.AuditGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

namespace LingDemo
{
    partial class Person
    {
        /// <summary>
        /// Gets or sets the creation time of this entity.
        /// </summary>
        public virtual global::System.DateTimeOffset CreationTime { get; set; }
    
        /// <summary>
        /// Gets or sets the creator Id of this entity.
        /// </summary>
        public virtual global::System.Nullable<global::System.Guid> CreatorId { get; set; }
    
        /// <summary>
        /// Gets or sets the last modification time of this entity.
        /// </summary>
        public virtual global::System.Nullable<global::System.DateTimeOffset> LastModificationTime { get; set; }
    
        /// <summary>
        /// Gets or sets the last modifier Id of this entity.
        /// </summary>
        public virtual global::System.Nullable<global::System.Guid> LastModifierId { get; set; }
    
        /// <summary>
        /// Gets or sets whether this entity is soft deleted.
        /// </summary>
        public virtual global::System.Boolean IsDeleted { get; set; }
    
        /// <summary>
        /// Gets or sets the deletion time of this entity.
        /// </summary>
        public virtual global::System.Nullable<global::System.DateTimeOffset> DeletionTime { get; set; }
    
        /// <summary>
        /// Get or set the deleter Id of this entity.
        /// </summary>
        public virtual global::System.Nullable<global::System.Guid> DeleterId { get; set; }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Ling.Audit ](/sources/Ling.Audit.zip)

:::


### Share Ling.Audit 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLing.Audit&quote=Ling.Audit" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLing.Audit&text=Ling.Audit:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLing.Audit" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLing.Audit&title=Ling.Audit" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLing.Audit&title=Ling.Audit&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLing.Audit" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Ling.Audit

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [AspectGenerator](/docs/AspectGenerator)


### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


### [BuilderGenerator](/docs/BuilderGenerator)


### [DudNet](/docs/DudNet)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Decorator](/docs/RSCG_Decorator)


### [RSCG_Static](/docs/RSCG_Static)


### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


### [StaticReflection](/docs/StaticReflection)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


### [TelemetryLogging](/docs/TelemetryLogging)

