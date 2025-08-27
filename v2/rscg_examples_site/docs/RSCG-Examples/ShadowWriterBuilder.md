---
sidebar_position: 2060
title: 206 - ShadowWriterBuilder
description: Generating null objects for testing
slug: /ShadowWriterBuilder
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBuilder.mdx';

# ShadowWriterBuilder  by Stefan Stolz


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ShadowWriter?label=ShadowWriter)](https://www.nuget.org/packages/ShadowWriter/)
[![GitHub last commit](https://img.shields.io/github/last-commit/StefanStolz/ShadowWriter?label=updated)](https://github.com/StefanStolz/ShadowWriter)
![GitHub Repo stars](https://img.shields.io/github/stars/StefanStolz/ShadowWriter?style=social)

## Details

### Info
:::info

Name: **ShadowWriterBuilder**

Leverage the capabilities of Roslyn source generators to help generate boilerplate code efficiently.

Author: Stefan Stolz

NuGet: 
*https://www.nuget.org/packages/ShadowWriter/*   


You can find more details at https://github.com/StefanStolz/ShadowWriter

Source: https://github.com/StefanStolz/ShadowWriter

:::

### Original Readme
:::note

# ShadowWriter

[![NuGet](https://img.shields.io/nuget/v/ShadowWriter.svg)](https://www.nuget.org/packages/ShadowWriter)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/StefanStolz/ShadowWriter/LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/StefanStolz/ShadowWriter/build.yml?branch=main)](https://github.com/StefanStolz/ShadowWriter/actions)

**ShadowWriter** is a Roslyn Source Generator designed to simplify and automate aspects of .NET development.  
It currently supports the following features:

## ✨ Features

Samples can be found in the [Source-Code](https://github.com/StefanStolz/ShadowWriter/tree/main/src/ShadowWriter.Sample) or in the [Wiki](https://github.com/StefanStolz/ShadowWriter/wiki).

### 1. Generate Null Objects
The NullObject feature in ShadowWriter provides a simple way to automatically generate null object implementations for interfaces and classes. This pattern is useful for providing default "do nothing" implementations that can help avoid null reference exceptions and simplify code.

#### Usage
To create a null object implementation, simply add the `[NullObject]` attribute to your class:

```csharp
[NullObject]
public partial class ImplementingMyInterface : IMyInterface
{
}
```

### 2. Inject Project Information
Embeds values from the project file (`*.csproj`) directly into your source code.  
This is useful for build metadata, version numbers, or project-specific configuration.

#### Available Properties
The generated `TheProject` class provides the following static properties:

| Property | Description | Example |
|----------|-------------|---------|
| `FullPath` | The complete path to the project file | `/path/to/YourProject.csproj` |
| `ProjectDirectory` | The directory containing the project file | `/path/to/` |
| `Name` | The name of the project | `YourProject` |
| `OutDir` | The output directory for compiled artifacts | `/path/to/artifacts/bin/YourProject/debug/` |
| `Version` | The current version of the project | `1.0.0` |
| `RootNamespace` | The root namespace of the project | `YourProject` |

#### Example Usage

```csharp
// Access project information anywhere in your code 
Console.WriteLine($"Project Name: {TheProject.Name}"); 
Console.WriteLine($"Project Version: {TheProject.Version}"); 
Console.WriteLine($"Project Output Directory: {TheProject.OutDir}");
```


### 3. Experimental: Typed Access to EmbeddedResources
Generates strongly typed wrappers for `EmbeddedResources`, allowing safe and convenient access to resources at runtime.

> ⚠️ Feature #3 is experimental and may change significantly in future versions.

Details can be found in the [Wiki](https://github.com/StefanStolz/ShadowWriter/wiki/ProjectFiles).

### 4. Generate Builders for Records

The **Builder** feature in ShadowWriter automatically generates builder classes for your `record` types. This significantly reduces boilerplate when constructing complex objects, especially with optional and nullable parameters or when you want to use a fluent API pattern for object creation.

#### Usage

To enable builder generation, simply annotate your partial `record` with the `[Builder]` attribute:

```csharp 
[Builder] 
public partial record WithBuilder(int Number);
```

The generator will create a corresponding builder class (e.g., `WithBuilder.Builder`) with mutable Properties for each Parameter.

#### Examples

A variety of record types are supported:

```csharp 
// Record with a single value type 
[Builder] 
public partial record WithBuilder(int Number);
```

The generated builder enables you to create instances using a clear, chainable API. For example:

```csharp
var builder = new WithBuilder.Builder();
builder.Number = 1;
var item = builder.Build();
```

## 📦 Installation

You can install ShadowWriter via NuGet:

```sh
dotnet package add ShadowWriter
```

⚙️ Usage
ShadowWriter runs automatically during compilation.
No manual setup is needed. Documentation and configuration options will be expanded in future versions.

📄 License
This project is licensed under the MIT License.


:::

### About
:::note

Generating null objects for testing


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ShadowWriterBuilder**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="ShadowWriter" Version="0.9.5">
	      <PrivateAssets>all</PrivateAssets>
	      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	    </PackageReference>
	  </ItemGroup>

	  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterBuilder\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **ShadowWriterBuilder** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person("Andrei", "G", "Ignat");
var build = new Person.Builder();
build.FirstName = pOld.FirstName;
build.MiddleName = "";
build.LastName = (pOld.LastName)    ;

var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterBuilder\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **ShadowWriterBuilder** in *Person.cs*

```csharp showLineNumbers 
namespace Builder;

[ShadowWriter.Builder]
public partial record Person(string FirstName, string? MiddleName, string LastName)
{
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterBuilder\src\Builder\obj\GX\ShadowWriter\ShadowWriter.BuilderGenerator\BuilderAttribute.g.cs" label="BuilderAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;

namespace ShadowWriter
{
    [CompilerGenerated]
    [GeneratedCode("ShadowWriter", "0.9.5.0")]
    [System.AttributeUsage(AttributeTargets.Class)]
    internal sealed class BuilderAttribute : System.Attribute
    {

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterBuilder\src\Builder\obj\GX\ShadowWriter\ShadowWriter.BuilderGenerator\BuilderPerson.g.cs" label="BuilderPerson.g.cs" >


```csharp showLineNumbers 
using System;
using System.Threading.Tasks;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;

#nullable disable

namespace Builder;

[CompilerGenerated]
[GeneratedCode("ShadowWriter", "0.9.5.0")]
public partial record Person
{
    public sealed class Builder
{
      // Parameter: FirstName: string
  public string FirstName { get; set; } = "";
  // Parameter: MiddleName: string?
  public string? MiddleName { get; set; } = "";
  // Parameter: LastName: string
  public string LastName { get; set; } = "";
  public Person Build()
  {
    return new(this.FirstName, this.MiddleName, this.LastName    );
  }

}
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ShadowWriterBuilder ](/sources/ShadowWriterBuilder.zip)

:::


### Share ShadowWriterBuilder 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterBuilder&quote=ShadowWriterBuilder" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterBuilder&text=ShadowWriterBuilder:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterBuilder" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterBuilder&title=ShadowWriterBuilder" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterBuilder&title=ShadowWriterBuilder&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterBuilder" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ShadowWriterBuilder

aaa
<SameCategory />

