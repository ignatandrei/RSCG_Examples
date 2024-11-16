---
sidebar_position: 1710
title: 171 - Hsu.Sg.FluentMember
description: Adding builder pattern to classes
slug: /Hsu.Sg.FluentMember
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Hsu.Sg.FluentMember  by Net Hsu


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Hsu.Sg.FluentMember?label=Hsu.Sg.FluentMember)](https://www.nuget.org/packages/Hsu.Sg.FluentMember/)
[![GitHub last commit](https://img.shields.io/github/last-commit/hsu-net/source-generators?label=updated)](https://github.com/hsu-net/source-generators)
![GitHub Repo stars](https://img.shields.io/github/stars/hsu-net/source-generators?style=social)

## Details

### Info
:::info

Name: **Hsu.Sg.FluentMember**

a fluent member source generator.

Author: Net Hsu

NuGet: 
*https://www.nuget.org/packages/Hsu.Sg.FluentMember/*   


You can find more details at https://github.com/hsu-net/source-generators

Source : https://github.com/hsu-net/source-generators

:::

### Original Readme
:::note

# Hsu.Sg

[![dev](https://github.com/hsu-net/source-generators/actions/workflows/build.yml/badge.svg?branch=dev)](https://github.com/hsu-net/source-generators/actions/workflows/build.yml)
[![preview](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml/badge.svg?branch=preview)](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml)
[![main](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml)
[![nuke build](https://img.shields.io/badge/nuke-build-yellow.svg)](https://github.com/nuke-build/nuke)

.NET source generators

## Package Version

| Name | Source | Stable | Preview |
|---|---|---|---|
| Hsu.Sg.Sync | Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.Sync?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Sync) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.Sync?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Sync) |
| Hsu.Sg.Sync | MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.Sync?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Sync) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.Sync?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Sync) |
| Hsu.Sg.Proxy | Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.Proxy?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Proxy) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.Proxy?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Proxy) |
| Hsu.Sg.Proxy | MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.Proxy?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Proxy) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.Proxy?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Proxy) |
| Hsu.Sg.FluentMember| Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.FluentMember?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.FluentMember) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.FluentMember?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.FluentMember) |
| Hsu.Sg.FluentMember| MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.FluentMember?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.FluentMember) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.FluentMember?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.FluentMember) |

## Package Features

### Hsu.Sg.Sync

Generate a synchronous method from an asynchronous method.

Usages see [README](https://github.com/hsu-net/source-generators/src/Hsu.Sg.Sync/README.md)

### Hsu.Sg.Proxy

Generate a proxy object from a `struct` or `class` or `interface`.

Usages see [README](https://github.com/hsu-net/source-generators/src/Hsu.Sg.Proxy/README.md)

### Hsu.Sg.FluentMember

Generate a fluent method from a `struct` or `class`.

Usages see [README](https://github.com/hsu-net/source-generators/src/Hsu.Sg.FluentMember/README.md)

## References

- [Source Generators Cookbook](https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md)
- [Incremental Generators](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md)

## License

[MIT](https://github.com/hsu-net/source-generators/LICENSE)

:::

### About
:::note

Adding builder pattern to classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Hsu.Sg.FluentMember**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="Hsu.Sg.FluentMember" Version="2024.101.8-rc175707">
	      <PrivateAssets>all</PrivateAssets>
	      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	    </PackageReference>
	  </ItemGroup>

	 
	  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Hsu.Sg.FluentMember\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **Hsu.Sg.FluentMember** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person();
pOld= pOld.WithFirstName("Andrei").WithLastName("Ignat").WithMiddleName("G");

System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Hsu.Sg.FluentMember\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **Hsu.Sg.FluentMember** in *Person.cs*

```csharp showLineNumbers 
namespace Builder;
[Hsu.Sg.FluentMember.FluentMember]
public partial class Person
{
    public string FirstName { get; init; }
    public string? MiddleName { get; init; }
    public string LastName { get; init; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Hsu.Sg.FluentMember\src\Builder\obj\GX\Hsu.Sg.FluentMember\Hsu.Sg.FluentMember.Generator\Hsu.Sg.FluentMember.gen.cs" label="Hsu.Sg.FluentMember.gen.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;

namespace Hsu.Sg.FluentMember
{
    /// <summary>
    /// The flag to generate member set method.
    /// </summary>
    [AttributeUsage(
        AttributeTargets.Struct |
        AttributeTargets.Class,
        AllowMultiple = false,
        Inherited = false)]
    internal sealed class FluentMemberAttribute : Attribute
    {
        
        /// <summary>
        ///     The public member are generated.
        /// </summary>
        public bool Public { get; set; } = true;

        /// <summary>
        ///     The internal member are generated.
        /// </summary>
        public bool Internal { get; set; }

        /// <summary>
        ///     The private member are generated.
        /// </summary>
        public bool Private { get; set; }

        /// <summary>
        ///     Only [FluentMemberGen] member are generated.
        /// </summary>
        public bool Only { get; set; }

        /// <summary>
        /// The prefix of member name.
        /// </summary>
        /// <remarks>default is `With`</remarks>
        public string Prefix { get; set; } = string.Empty;
    }

    [AttributeUsage(AttributeTargets.Field |
        AttributeTargets.Property |
        AttributeTargets.Event,
        AllowMultiple = false,
        Inherited = false)]
    internal sealed class FluentMemberGenAttribute : Attribute
    {
        /// <summary>
        ///   Ignore member.
        /// </summary>
        public bool Ignore { get; set; }

        /// <summary>
        /// The specific name of member.
        /// </summary>
        public string Identifier { get; set; } = string.Empty;

        /// <summary>
        /// The prefix of member name.
        /// </summary>
        /// <remarks>default is `With`</remarks>
        public string Prefix { get; set; } = string.Empty;

        /// <summary>
        /// The modifier of member
        /// </summary>
        /// <remarks>default is <see cref="Accessibility.Inherit"/></remarks>
        public Accessibility Modifier { get; set; } = Accessibility.Inherit;
    }

    /// <summary>
    /// The accessibility for fluent member set method.
    /// </summary>
    //[System.DefaultValue(Inherit)]
    internal enum Accessibility
    {
        /// <summary>
        /// Inherit from the member.
        /// </summary>
        Inherit,
        /// <summary>
        /// Is public access.
        /// </summary>
        Public,
        /// <summary>
        /// Is internal access.
        /// </summary>
        Internal,
        /// <summary>
        /// Is protected access.
        /// </summary>
        Protected,
        /// <summary>
        /// Is private access.
        /// </summary>
        Private
    }
    
    /// <summary>
    /// The event assignment
    /// </summary>
    //[System.DefaultValue(Add)]
    public enum EventAssignable
    {
        /// <summary>
        /// To add the event
        /// </summary>
        Add,
        /// <summary>
        /// To remove the event
        /// </summary>
        Remove,
        /// <summary>
        /// To set the event
        /// </summary>
        Assign
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Hsu.Sg.FluentMember ](/sources/Hsu.Sg.FluentMember.zip)

:::


### Share Hsu.Sg.FluentMember 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsu.Sg.FluentMember&quote=Hsu.Sg.FluentMember" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsu.Sg.FluentMember&text=Hsu.Sg.FluentMember:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsu.Sg.FluentMember" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsu.Sg.FluentMember&title=Hsu.Sg.FluentMember" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsu.Sg.FluentMember&title=Hsu.Sg.FluentMember&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsu.Sg.FluentMember" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Hsu.Sg.FluentMember

### In the same category (Builder) - 3 other generators


#### [Architect.DomainModeling](/docs/Architect.DomainModeling)


#### [BuilderGenerator](/docs/BuilderGenerator)


#### [Fluentify](/docs/Fluentify)

