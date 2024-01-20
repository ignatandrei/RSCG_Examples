---
sidebar_position: 1010
title: 101 - Chorn.EmbeddedResourceAccessGenerator
description: Embedded Resources to C# Code
slug: /Chorn.EmbeddedResourceAccessGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Chorn.EmbeddedResourceAccessGenerator  by Christoph Hornung


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/Chorn.EmbeddedResourceAccessGenerator?label=Chorn.EmbeddedResourceAccessGenerator)](https://www.nuget.org/packages/Chorn.EmbeddedResourceAccessGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ChristophHornung/EmbeddedResourceGenerator?label=updated)](https://github.com/ChristophHornung/EmbeddedResourceGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/ChristophHornung/EmbeddedResourceGenerator?style=social)

## Details

### Info
:::info

Name: **Chorn.EmbeddedResourceAccessGenerator**

Generates strongly typed access methods for embedded resources.

Author: Christoph Hornung

NuGet: 
*https://www.nuget.org/packages/Chorn.EmbeddedResourceAccessGenerator/*   


You can find more details at https://github.com/ChristophHornung/EmbeddedResourceGenerator

Source : https://github.com/ChristophHornung/EmbeddedResourceGenerator

:::

### Original Readme
:::note

# EmbeddedResourceAccessGenerator
[![NuGet version (Chorn.EmbeddedResourceAccessGenerator)](https://img.shields.io/nuget/v/Chorn.EmbeddedResourceAccessGenerator.svg?style=flat-square)](https://www.nuget.org/packages/Chorn.EmbeddedResourceAccessGenerator/)


The EmbeddedResourceAccessGenerator is a code generator to allow easy access to all
embedded resources.

## Usage
Get the nuget package [here](https://www.nuget.org/packages/Chorn.EmbeddedResourceAccessGenerator).

After referencing the `Chorn.EmbeddedResourceAccessGenerator` nuget the code generation will
automatically create a class `EmbeddedResources` in the root namespace of the project.

Together with the generated `EmbeddedResource` enumeration there are several options to access
embedded resources:

E.g. for a `Test.txt` embedded resource in the `TestAsset` folder:

- Via enum access through the `EmbeddedResource` enum:

```csharp
	// Via the generated extension methods on the enum
	using Stream s = EmbeddedResource.TestAsset_Test_txt.GetStream();
	using StreamReader sr = EmbeddedResource.TestAsset_Test_txt.GetReader();
```

- Via enum access through the `EmbeddedResource[FolderName]` enum:

```csharp
	// Via the generated extension methods on the enum
	using Stream s = EmbeddedResourceTestAsset.Test_txt.GetStream();
	using StreamReader sr = EmbeddedResourceTestAsset.Test_txt.GetReader();
```

- Via direct static acccess on `EmbeddedResources`:

```csharp
	using StreamReader sr = EmbeddedResources.TestAsset_Test_txt_Reader;
	Console.WriteLine(sr.ReadToEnd());

	// Or via access through the Stream
	using Stream s = EmbeddedResources.TestAsset_Test_txt_Stream;
	// ...
```

## Motivation
Instead of using magic strings in the resource access code that may point to non-existant
resources this generator guarantees resources to exist and code to not compile when they are
removed.

Grouping the resources via their path adds path specific enums, e.g. to easily write tests
for all embedded resource in a subfolder.

Also it saves quite a bit of typing effort.


:::

### About
:::note

Embedded Resources to C# Code


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Chorn.EmbeddedResourceAccessGenerator**
```xml showLineNumbers {18}
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
	  <EmbeddedResource  Include="sql/*.sql" />
	</ItemGroup>
	<ItemGroup>
	  <PackageReference Include="Chorn.EmbeddedResourceAccessGenerator" Version="1.1.5" OutputItemType="Analyzer"  >
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
	
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EmbedRes\src\EmbedRes\Program.cs" label="Program.cs" >

  This is the use of **Chorn.EmbeddedResourceAccessGenerator** in *Program.cs*

```csharp showLineNumbers 
using EmbedDemo;
using StreamReader sr = EmbeddedResource.sql_createDB_sql.GetReader();
var data=sr.ReadToEnd();
Console.WriteLine(data);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EmbedRes\src\EmbedRes\sql\createDB.sql" label="createDB.sql" >

  This is the use of **Chorn.EmbeddedResourceAccessGenerator** in *createDB.sql*

```csharp showLineNumbers 
create database Andrei;
GO;
use Andrei;
GO;

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EmbedRes\src\EmbedRes\obj\GX\EmbeddedResourceAccessGenerator\EmbeddedResourceAccessGenerator.EmbeddedResourceAccessGenerator\EmbeddedResources.generated.cs" label="EmbeddedResources.generated.cs" >


```csharp showLineNumbers 
#nullable enable
namespace EmbedDemo;
using System;
using System.Collections;
using System.IO;
using System.Reflection;

/// <summary>
/// Auto-generated class to access all embedded resources in an assembly.
/// </summary>
public static partial class EmbeddedResources
{
	/// <summary>
	/// Gets the embedded resource 'sql.createDB.sql' as a stream.
	/// </summary>
	/// <returns>The stream to access the embedded resource.</returns>
	public static Stream sql_createDB_sql_Stream
	{
		get {
			Assembly assembly = typeof(EmbeddedResources).Assembly;
			string resource = "EmbedDemo.sql.createDB.sql";
			return assembly.GetManifestResourceStream(resource)!;
		}
	}

	/// <summary>
	/// Gets the embedded resource 'sql.createDB.sql' as a stream-reader.
	/// </summary>
	/// <returns>The stream-reader to access the embedded resource.</returns>
	public static StreamReader sql_createDB_sql_Reader
	{
		get 
		{
			Assembly assembly = typeof(EmbeddedResources).Assembly;
			string resource = "EmbedDemo.sql.createDB.sql";
			return new StreamReader(assembly.GetManifestResourceStream(resource)!);
		}
	}

	/// <summary>
	/// Gets the embedded resource's stream.
	/// </summary>
	/// <param name="resource">The embedded resource to retrieve the stream for.</param>
	/// <returns>The stream to access the embedded resource.</returns>
	public static Stream GetStream(this EmbeddedResource resource)
	{
		Assembly assembly = typeof(EmbeddedResources).Assembly;
		return assembly.GetManifestResourceStream(GetResourceName(resource))!;
	}

	/// <summary>
	/// Gets the embedded resource's stream-reader.
	/// </summary>
	/// <param name="resource">The embedded resource to retrieve the stream-reader for.</param>
	/// <returns>The stream-reader to access the embedded resource.</returns>
	public static StreamReader GetReader(this EmbeddedResource resource)
	{
		Assembly assembly = typeof(EmbeddedResources).Assembly;
		return new StreamReader(assembly.GetManifestResourceStream(GetResourceName(resource))!);
	}

	/// <summary>
	/// Gets the embedded resource's name in the format required by <c>GetManifestResourceStream</c>.
	/// </summary>
	/// <param name="resource">The embedded resource to retrieve the name for.</param>
	/// <returns>The name to access the embedded resource.</returns>
	public static string GetResourceName(this EmbeddedResource resource)
	{
		return resource switch 
		{
			EmbeddedResource.sql_createDB_sql => "EmbedDemo.sql.createDB.sql",
			_ => throw new InvalidOperationException(),
		};
	}

	/// <summary>
	/// Gets the embedded resource's stream.
	/// </summary>
	/// <param name="resource">The embedded resource to retrieve the stream for.</param>
	/// <returns>The stream to access the embedded resource.</returns>
	public static Stream GetStream(this EmbeddedResourcesql resource)
	{
		Assembly assembly = typeof(EmbeddedResources).Assembly;
		return assembly.GetManifestResourceStream(GetResourceName(resource))!;
	}

	/// <summary>
	/// Gets the embedded resource's stream-reader.
	/// </summary>
	/// <param name="resource">The embedded resource to retrieve the stream-reader for.</param>
	/// <returns>The stream-reader to access the embedded resource.</returns>
	public static StreamReader GetReader(this EmbeddedResourcesql resource)
	{
		Assembly assembly = typeof(EmbeddedResources).Assembly;
		return new StreamReader(assembly.GetManifestResourceStream(GetResourceName(resource))!);
	}

	/// <summary>
	/// Gets the embedded resource's name in the format required by <c>GetManifestResourceStream</c>.
	/// </summary>
	/// <param name="resource">The embedded resource to retrieve the name for.</param>
	/// <returns>The name to access the embedded resource.</returns>
	public static string GetResourceName(this EmbeddedResourcesql resource)
	{
		return resource switch 
		{
			EmbeddedResourcesql.createDB_sql => "EmbedDemo.sql.createDB.sql",
			_ => throw new InvalidOperationException(),
		};
	}
}

/// <summary>
/// Auto-generated enumeration for all embedded resources in the assembly.
/// </summary>
public enum EmbeddedResource
{
	/// <summary>
	/// Represents the embedded resource 'sql.createDB.sql'.
	/// </summary>
	sql_createDB_sql,
}

/// <summary>
/// Auto-generated enumeration for all embedded resources in 'sql'.
/// </summary>
public enum EmbeddedResourcesql
{
	/// <summary>
	/// Represents the embedded resource 'createDB.sql' in sql.
	/// </summary>
	createDB_sql,
}
#nullable restore
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Chorn.EmbeddedResourceAccessGenerator ](/sources/Chorn.EmbeddedResourceAccessGenerator.zip)

:::


### Share Chorn.EmbeddedResourceAccessGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FChorn.EmbeddedResourceAccessGenerator&quote=Chorn.EmbeddedResourceAccessGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FChorn.EmbeddedResourceAccessGenerator&text=Chorn.EmbeddedResourceAccessGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FChorn.EmbeddedResourceAccessGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FChorn.EmbeddedResourceAccessGenerator&title=Chorn.EmbeddedResourceAccessGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FChorn.EmbeddedResourceAccessGenerator&title=Chorn.EmbeddedResourceAccessGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FChorn.EmbeddedResourceAccessGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Chorn.EmbeddedResourceAccessGenerator

## In the same category (FilesToCode)


### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


### [ResXGenerator](/docs/ResXGenerator)


### [RSCG_Utils](/docs/RSCG_Utils)


### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)

