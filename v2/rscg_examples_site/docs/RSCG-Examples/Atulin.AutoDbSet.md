---
sidebar_position: 2780
title: 278 - Atulin.AutoDbSet
description: Generating DbSet properties for Entity Framework Core DbContext classes
slug: /Atulin.AutoDbSet
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEntityFramework.mdx';

# Atulin.AutoDbSet  by Angius Atulin


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Atulin.AutoDbSet?label=Atulin.AutoDbSet)](https://www.nuget.org/packages/Atulin.AutoDbSet/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Atulin/AutoDbSet?label=updated)](https://github.com/Atulin/AutoDbSet)
![GitHub Repo stars](https://img.shields.io/github/stars/Atulin/AutoDbSet?style=social)

## Details

### Info
:::info

Name: **Atulin.AutoDbSet**

Package Description

Author: Angius Atulin

NuGet: 
*https://www.nuget.org/packages/Atulin.AutoDbSet/*   


You can find more details at https://github.com/Atulin/AutoDbSet

Source: https://github.com/Atulin/AutoDbSet

:::

### Author
:::note
Angius Atulin 
![Alt text](https://github.com/Atulin.png)
:::

## Original Readme
:::note

[![NuGet Version](https://img.shields.io/nuget/v/Atulin.AutoDbSet?style=for-the-badge)](https://www.nuget.org/packages/Atulin.AutoDbSet/)
![NuGet Downloads](https://img.shields.io/nuget/dt/Atulin.AutoDbSet?style=for-the-badge)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Atulin/AutoDbSet/publish.yml?style=for-the-badge)
[![GitHub License](https://img.shields.io/github/license/Atulin/AutoDbSet?style=for-the-badge)](https://github.com/Atulin/AutoDbSet/LICENSE)

### AutoDbSet

Automagically add `DbSet<T>`s to your `DbContext`

###### Usage

Place `[AutoDbSet]` attribute on the database models you want to register...

```cs
using AutoDbSetGenerators;

namespace AutoDbSet.Demo;

[AutoDbSet]
public class Person
{
    public required string Name \{ get; set; }
    public required DateOnly Birthday \{ get; set; }
    public required float Height \{ get; set; }
}
```

Place `[AutoDbContext]` attribute on your `DbContext` and make it `partial`...

```cs
using AutoDbSetGenerators;
using Microsoft.EntityFrameworkCore;

namespace AutoDbSet.Demo;

[AutoDbContext]
public partial class MyCoolDbContext : DbContext
{
}
```

And watch the magic happen!

```cs
namespace AutoDbSet.Demo;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "2.0.0.0")]
public partial class MyCoolDbContext
{
    public required Microsoft.EntityFrameworkCore.DbSet<AutoDbSet.Demo.Person> Persons \{ get; init; }
}
```

###### DbSet naming

By default `AutoDbSet` will try to naively pluralize the names ([here's how](https://github.com/Atulin/AutoDbSet/AutoDbSet/NameHelpers.cs)). It does not,
therefore, work with verbs that have irregular plural form, nor does it work with non-English languages.

You can, however, give the sets your own, custom name:

```cs
[AutoDbSetGenerators.AutoDbSet(Name = "People")]
public class Person
{
    public required string Name \{ get; set; }
    public required DateOnly Birthday \{ get; set; }
    public required float Height \{ get; set; }
}
```

will generate

```cs
namespace AutoDbSet.Demo;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "1.0.0.0")]
public partial class MyCoolDbContext
{
    public required Microsoft.EntityFrameworkCore.DbSet<AutoDbSet.Demo.Person> People \{ get; init; }
}
```

###### Multiple `DbContext`s support

You can relate a given class to a given `DbContext` using the `DbContext` property of the
`[AutoDbSet]` attribute:

```cs
[AutoDbSetGenerators.AutoDbSet(DbContext = typeof(MyCoolerDbContext))]
public class CoolerPerson
{
    public required string Name \{ get; set; }
    public required DateOnly Birthday \{ get; set; }
    public required float Height \{ get; set; }
    public bool IsCool \{ get; \} = true;
}
```

Classes without an explicit `DbContext` will be registered to the single `DbContext` that
was not specified in any other `[AutoDbSet]` attribute.

> [!IMPORTANT]
> There can only be a single default `DbContext`

###### ExpressiveSharp support

AutoDbSet supports [ExpressiveSharp](https://github.com/EFNext/ExpressiveSharp) out of the box,
and generates `ExpressiveDbSet<T>`s instead of `DbSet<T>`s if it's available.

:::

### About
:::note

Generating DbSet properties for Entity Framework Core DbContext classes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Atulin.AutoDbSet**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Atulin.AutoDbSet" Version="2.0.0" />
		<PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="10.0.11" />
		<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.11">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
		<PackageReference Include="Microsoft.EntityFrameworkCore" Version="10.0.11" />
	
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Atulin.AutoDbSet\src\EntityDemo\Program.cs" label="Program.cs" >

  This is the use of **Atulin.AutoDbSet** in *Program.cs*

```csharp showLineNumbers 
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

Console.WriteLine("Hello, World!");
DbContextOptionsBuilder<DotNetStatsContext> optionsBuilder = new();
optionsBuilder.UseInMemoryDatabase("StatsDatabase");
var cnt = new DotNetStatsContext(optionsBuilder.Options);
await cnt.Database.EnsureCreatedAsync();
Console.WriteLine("Database created");
Console.WriteLine(cnt.Projects.Count());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Atulin.AutoDbSet\src\EntityDemo\Project.cs" label="Project.cs" >

  This is the use of **Atulin.AutoDbSet** in *Project.cs*

```csharp showLineNumbers 
namespace Stats.Database;

[AutoDbSetGenerators.AutoDbSet]
public partial class Project
{
    public long Id \{ get; set; }

    public string Name \{ get; set; \} = null!;

    public string SourceCodeUrl \{ get; set; \} = null!;

    public string? Description \{ get; set; }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Atulin.AutoDbSet\src\EntityDemo\DotNetStatsContext.cs" label="DotNetStatsContext.cs" >

  This is the use of **Atulin.AutoDbSet** in *DotNetStatsContext.cs*

```csharp showLineNumbers 

using System.Diagnostics.CodeAnalysis;

namespace Stats.Database;

[AutoDbSetGenerators.AutoDbContext]
public partial class DotNetStatsContext : DbContext
{
    [SetsRequiredMembers]
    internal DotNetStatsContext() : base() {
        Stars = Set<Star>();
        Projects = Set<Project>();
    }
    [SetsRequiredMembers]
    public DotNetStatsContext(DbContextOptions<DotNetStatsContext> options)
        : base(options)
    {
        Stars = Set<Star>();
        Projects = Set<Project>();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            //entity.ToTable("Project");

            entity.Property(e => e.Id);//.HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.SourceCodeUrl).HasMaxLength(50);
        });

        modelBuilder.Entity<Star>(entity =>
        {
        //    entity.Property(e => e.Id)
        //        .HasColumnName("ID");
        //    entity.Property(e => e.Idproject).HasColumnName("IDProject");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Atulin.AutoDbSet\src\EntityDemo\obj\GX\AutoDbSet\AutoDbSet.AutoDbSetIncrementalSourceGenerator\AutoDbSetAttribute.g.cs" label="AutoDbSetAttribute.g.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool AutoDbSet.
//     Runtime Version: 2.0.0.0
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
#nullable enable
namespace AutoDbSetGenerators;
                                         
/// <summary>
/// Marks the class to generate a DbSet out of
/// </summary>
[global::System.AttributeUsage(System.AttributeTargets.Class)]
[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "2.0.0.0")]
public sealed class AutoDbSetAttribute : global::System.Attribute
{
    /// <summary>
    /// Sets name to be used in the database.
    /// </summary>
    public string? Name \{ get; set; }
    
    /// <summary>
    /// DbContext this DbSet should belong to
    /// </summary>
    public global::System.Type? DbContext \{ get; set; }
}
#nullable restore   
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Atulin.AutoDbSet\src\EntityDemo\obj\GX\AutoDbSet\AutoDbSet.AutoDbSetIncrementalSourceGenerator\DbContextAttribute.g.cs" label="DbContextAttribute.g.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool AutoDbSet.
//     Runtime Version: 2.0.0.0
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
#nullable enable
namespace AutoDbSetGenerators;
                                         
/// <summary>
/// Marks the DbContext to generate DbSets into
/// </summary>
[global::System.AttributeUsage(System.AttributeTargets.Class)]
[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "2.0.0.0")]
public sealed class AutoDbContextAttribute : global::System.Attribute
{}
#nullable restore   
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Atulin.AutoDbSet\src\EntityDemo\obj\GX\AutoDbSet\AutoDbSet.AutoDbSetIncrementalSourceGenerator\DotNetStatsContext.g.cs" label="DotNetStatsContext.g.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool AutoDbSet.
//     Runtime Version: 2.0.0.0
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
#nullable enable
       
namespace Stats.Database;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "2.0.0.0")]
public partial class DotNetStatsContext
{
    public required Microsoft.EntityFrameworkCore.DbSet<Stats.Database.Project> Projects \{ get; init; }
    public required Microsoft.EntityFrameworkCore.DbSet<Stats.Database.Star> Stars \{ get; init; }

}
#nullable restore   
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Atulin.AutoDbSet ](/sources/Atulin.AutoDbSet.zip)

:::


### Share Atulin.AutoDbSet 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAtulin.AutoDbSet&quote=Atulin.AutoDbSet" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAtulin.AutoDbSet&text=Atulin.AutoDbSet:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAtulin.AutoDbSet" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAtulin.AutoDbSet&title=Atulin.AutoDbSet" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAtulin.AutoDbSet&title=Atulin.AutoDbSet&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAtulin.AutoDbSet" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Atulin.AutoDbSet

<SameCategory />

