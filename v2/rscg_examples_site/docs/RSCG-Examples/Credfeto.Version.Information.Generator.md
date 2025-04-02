---
sidebar_position: 1680
title: 168 - Credfeto.Version.Information.Generator
description: Embedding build information as compile time constants in C# projects.
slug: /Credfeto.Version.Information.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Credfeto.Version.Information.Generator  by Mark Ridgwell


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Credfeto.Version.Information.Generator?label=Credfeto.Version.Information.Generator)](https://www.nuget.org/packages/Credfeto.Version.Information.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/credfeto/credfeto-version-constants-generator?label=updated)](https://github.com/credfeto/credfeto-version-constants-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/credfeto/credfeto-version-constants-generator?style=social)

## Details

### Info
:::info

Name: **Credfeto.Version.Information.Generator**

Source code generator for versioning.

Author: Mark Ridgwell

NuGet: 
*https://www.nuget.org/packages/Credfeto.Version.Information.Generator/*   


You can find more details at https://github.com/credfeto/credfeto-version-constants-generator

Source : https://github.com/credfeto/credfeto-version-constants-generator

:::

### Original Readme
:::note

# credfeto-version-constants-generator

Source generator for embedding build information as compile time constants in C# projects.

## Usage

Add the following to your project file:

```xml

<ItemGroup>
    <PackageReference Include="Credfeto.Version.Information.Generator" Version="1.0.2.16" PrivateAssets="All"
                      ExcludeAssets="runtime"/>
</ItemGroup>
```

This generates a class called `VersionInformation` in the root namespace of the project with the following properties
taken from properties in the project file:

```csharp
internal static class VersionInformation
{
    public const string Version = "0.0.0.1-test";
    public const string Product = "Credfeto.Version.Information.Example.Tests";
    public const string Company = "Example Company";
    public const string Copyright = "Copyright © Example Company 2024";
}
```

Controlled by the following properties:

```xml
<PropertyGroup>
    <Company>Example Company</Company>
    <Copyright>Copyright © Example Company 2024</Copyright>
</PropertyGroup>
```

* Version comes from the ``AssemblyInformationalVersion`` that can be set using the ``/p:Version=0.0.1-test`` command
  line argument to MSBuild. or a ``<Version>`` property in the project file.
* Product comes from the Root Namespace property for the assembly.

## Build Status

| Branch  | Status                                                                                                                                                                                                                                        |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| main    | [![Build: Pre-Release](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-pre-release.yml/badge.svg)](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-pre-release.yml) |
| release | [![Build: Release](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-release.yml/badge.svg)](https://github.com/credfeto/credfeto-versioninfo/actions/workflows/build-and-publish-release.yml)             |

## Changelog

View [changelog](https://github.com/credfeto/credfeto-version-constants-generator/CHANGELOG.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

:::

### About
:::note

Embedding build information as compile time constants in C# projects.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Credfeto.Version.Information.Generator**
```xml showLineNumbers {23}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net9.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<PropertyGroup>
		<!-- this is the code to start RSCG -->
		<Version>2024.11.15.450</Version>

		<Company>AOM</Company>
		<Copyright>MIT</Copyright>
		<Product>Info Test</Product>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Credfeto.Version.Information.Generator" Version="1.0.2.16" PrivateAssets="All"
						  ExcludeAssets="runtime"/>
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Credfeto.Version.Information.Generator\src\Info\Program.cs" label="Program.cs" >

  This is the use of **Credfeto.Version.Information.Generator** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(Info.VersionInformation.Version);
Console.WriteLine(Info.VersionInformation.Product);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Credfeto.Version.Information.Generator\src\Info\obj\GX\Credfeto.Version.Information.Generator\Credfeto.Version.Information.Generator.VersionInformationCodeGenerator\Info.VersionInformation.generated.cs" label="Info.VersionInformation.generated.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
// This code was generated by a tool.
// Runtime Version: Current
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.CodeDom.Compiler;

namespace Info;

[GeneratedCode(tool: "Credfeto.Version.Information.Generator", version: "1.0.2.16")]
internal static class VersionInformation
{
    public const string Version = "2024.11.15.450";
    public const string Product = "Info";
    public const string Company = "AOM";
    public const string Copyright = "MIT";
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Credfeto.Version.Information.Generator ](/sources/Credfeto.Version.Information.Generator.zip)

:::


### Share Credfeto.Version.Information.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredfeto.Version.Information.Generator&quote=Credfeto.Version.Information.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredfeto.Version.Information.Generator&text=Credfeto.Version.Information.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredfeto.Version.Information.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredfeto.Version.Information.Generator&title=Credfeto.Version.Information.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredfeto.Version.Information.Generator&title=Credfeto.Version.Information.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCredfeto.Version.Information.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Credfeto.Version.Information.Generator

### In the same category (EnhancementProject) - 17 other generators


#### [AutoInvoke.Generator](/docs/AutoInvoke.Generator)


#### [AutoSpectre](/docs/AutoSpectre)


#### [BuildInfo](/docs/BuildInfo)


#### [CommandLine](/docs/CommandLine)


#### [Larcanum.GitInfo](/docs/Larcanum.GitInfo)


#### [LinqGen.Generator](/docs/LinqGen.Generator)


#### [Pekspro.BuildInformationGenerator](/docs/Pekspro.BuildInformationGenerator)


#### [PlantUmlClassDiagramGenerator](/docs/PlantUmlClassDiagramGenerator)


#### [RSCG_AMS](/docs/RSCG_AMS)


#### [RSCG_ExportDiagram](/docs/RSCG_ExportDiagram)


#### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


#### [RSCG_NameGenerator](/docs/RSCG_NameGenerator)


#### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


#### [RSCG_Wait](/docs/RSCG_Wait)


#### [ThisAssembly](/docs/ThisAssembly)


#### [ThisAssembly.Constants](/docs/ThisAssembly.Constants)


#### [ThisAssembly.Metadata](/docs/ThisAssembly.Metadata)

