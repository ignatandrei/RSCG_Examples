---
sidebar_position: 2700
title: 270 - AssemblyMetadata.Generators
description: Generating assembly metadata attributes at compile time.
slug: /AssemblyMetadata.Generators
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementProject.mdx';

# AssemblyMetadata.Generators  by LoreSoft


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/AssemblyMetadata.Generators?label=AssemblyMetadata.Generators)](https://www.nuget.org/packages/AssemblyMetadata.Generators/)
[![GitHub last commit](https://img.shields.io/github/last-commit/loresoft/AssemblyMetadata.Generators?label=updated)](https://github.com/loresoft/AssemblyMetadata.Generators)
![GitHub Repo stars](https://img.shields.io/github/stars/loresoft/AssemblyMetadata.Generators?style=social)

## Details

### Info
:::info

Name: **AssemblyMetadata.Generators**

Source generator to expose assembly attributes as string constants

Author: LoreSoft

NuGet: 
*https://www.nuget.org/packages/AssemblyMetadata.Generators/*   


You can find more details at https://github.com/loresoft/AssemblyMetadata.Generators

Source: https://github.com/loresoft/AssemblyMetadata.Generators

:::

### Author
:::note
LoreSoft 
![Alt text](https://github.com/loresoft.png)
:::

## Original Readme
:::note

### AssemblyMetadata.Generators

Source generator to expose assembly attributes as string constants.

[![Build status](https://github.com/loresoft/AssemblyMetadata.Generators/actions/workflows/dotnet.yml/badge.svg)](https://github.com/loresoft/AssemblyMetadata.Generators/actions)

[![NuGet Version](https://img.shields.io/nuget/v/AssemblyMetadata.Generators.svg?style=flat-square)](https://www.nuget.org/packages/AssemblyMetadata.Generators/)

[![Coverage Status](https://coveralls.io/repos/github/loresoft/AssemblyMetadata.Generators/badge.svg?branch=main)](https://coveralls.io/github/loresoft/AssemblyMetadata.Generators?branch=main)

######### Usage

########## Add package

Add the nuget package project to your projects.

`dotnet add package AssemblyMetadata.Generators`

######### Generated

This source generator creates an internal partial class called `ThisAssembly` with all the assembly level attributes converted to string constants

```c#
internal static partial class ThisAssembly
{
    public const string TargetFramework = ".NETCoreApp,Version=v7.0";
    public const string Company = "LoreSoft";
    public const string Configuration = "Debug";
    public const string Copyright = "Copyright © 2023 LoreSoft";
    public const string Description = "Source generator to expose assembly attributes as string constants";
    public const string FileVersion = "1.0.0.0";
    public const string InformationalVersion = "1.0.0";
    public const string Product = "AssemblyMetadata.Generators.Tests";
    public const string Title = "AssemblyMetadata.Generators.Tests";
    public const string Version = "1.0.0.0";
    public const string RepositoryUrl = "https://github.com/loresoft/AssemblyMetadata.Generators";
    public const string NeutralResourcesLanguage = "en-US";
}
```

######### Namespace

Set the `ThisAssemblyNamespace` MSBuild property to set the namespace of the generated `ThisAssembly` class. Otherwise, it will be in the global namespace.

Put `ThisAssembly` in the projects root namespace.

```xml
<PropertyGroup>
  <ThisAssemblyNamespace>$(RootNamespace)</ThisAssemblyNamespace>
</PropertyGroup>
```


:::

### About
:::note

Generating assembly metadata attributes at compile time.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AssemblyMetadata.Generators**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AssemblyMetadata.Generators" Version="2.2.0" OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false"  />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AssemblyMetadata.Generators\src\DemoMeta\Program.cs" label="Program.cs" >

  This is the use of **AssemblyMetadata.Generators** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(ThisAssembly.Title);

Console.WriteLine(ThisAssembly.TargetFramework);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AssemblyMetadata.Generators\src\DemoMeta\obj\GX\AssemblyMetadata.Generators\AssemblyMetadata.Generators.AssemblyMetadataGenerator\AssemblyMetadata.g.cs" label="AssemblyMetadata.g.cs" >
```csharp showLineNumbers 
// <auto-generated />

/// <summary>
/// Assembly attributes exposed as public constants
/// </summary>
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("AssemblyMetadata.Generators", "2.2.0+ec398d1ec2fd415d5475a08ad0fada879c510c97")]
internal static partial class ThisAssembly
{

    public const string TargetFramework = ".NETCoreApp,Version=v10.0";

    public const string Company = "DemoMeta";

    public const string Configuration = "Debug";

    public const string FileVersion = "1.0.0.0";

    public const string InformationalVersion = "1.0.0+3eed64e7dd376ed8c6cf1f77efd5968cb88c898a";

    public const string Product = "DemoMeta";

    public const string Title = "DemoMeta";

    public const string Version = "1.0.0.0";

    public const string AssemblyName = "DemoMeta";

    public const string DefineConstants = "TRACE";

    public const string RootNamespace = "DemoMeta";

    public const string PackageVersion = "1.0.0";

    public const string PackageId = "DemoMeta";

}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project AssemblyMetadata.Generators ](/sources/AssemblyMetadata.Generators.zip)

:::


### Share AssemblyMetadata.Generators 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata.Generators&quote=AssemblyMetadata.Generators" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata.Generators&text=AssemblyMetadata.Generators:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata.Generators" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata.Generators&title=AssemblyMetadata.Generators" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata.Generators&title=AssemblyMetadata.Generators&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata.Generators" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AssemblyMetadata.Generators

<SameCategory />

