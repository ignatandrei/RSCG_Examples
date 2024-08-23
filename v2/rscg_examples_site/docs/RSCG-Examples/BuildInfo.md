---
sidebar_position: 1000
title: 100 - BuildInfo
description: Generating build information
slug: /BuildInfo
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# BuildInfo  by Steven Giesel


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/BuildInfo?label=BuildInfo)](https://www.nuget.org/packages/BuildInfo/)
[![GitHub last commit](https://img.shields.io/github/last-commit/linkdotnet/BuildInformation?label=updated)](https://github.com/linkdotnet/BuildInformation)
![GitHub Repo stars](https://img.shields.io/github/stars/linkdotnet/BuildInformation?style=social)

## Details

### Info
:::info

Name: **BuildInfo**

Exposes the following information for use directly from C# and VB:

			The generated code contains only constants, so it can be used to construct your own assembly/file version attributes:

			[assembly: AssemblyVersion("1.0.0." + ThisAssembly.BuildEnv.BuildId]

			Inspired and best used with GitInfo.

Author: Steven Giesel

NuGet: 
*https://www.nuget.org/packages/BuildInfo/*   


You can find more details at https://github.com/linkdotnet/BuildInformation

Source : https://github.com/linkdotnet/BuildInformation

:::

### Original Readme
:::note

# Incremental Build Information Generator

[![.NET](https://github.com/linkdotnet/BuildInformation/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linkdotnet/BuildInformation/actions/workflows/dotnet.yml)
[![Nuget](https://img.shields.io/nuget/dt/LinkDotNet.BuildInformation)](https://www.nuget.org/packages/LinkDotNet.BuildInformation/)
[![GitHub tag](https://img.shields.io/github/v/tag/linkdotnet/BuildInformation?include_prereleases&logo=github&style=flat-square)](https://github.com/linkdotnet/BuildInformation/releases)

This project provides a simple and easy-to-use C# source generator that embeds build information, such as the build time, platform, warning level, and configuration, directly into your code. By using the `BuildInformation` class, you can quickly access and display these details.

## Features
* Embeds build date (in UTC) in your code
* Embeds platform (AnyCPU, x86, x64, ...) information in your code
* Embeds compiler warning level in your code
* Embeds build configuration (e.g., Debug, Release) in your code
* Embeds the assembly version and assembly file version in your code
* Embeds the target framework moniker in your code
* Embeds the nullability analysis level in your code
* Embeds the deterministic build flag in your code

## Configuration
By default the created class is `internal` and is not under any namespace. This can be changed by adding the following to your project file:
```xml
<PropertyGroup>
    <UseRootNamespaceForBuildInformation>true</UseRootNamespaceForBuildInformation>
</PropertyGroup>

<ItemGroup>
    <CompilerVisibleProperty Include="UseRootNamespaceForBuildInformation" />
</ItemGroup>
```

This will use the root namespace of the project for the generated class. This is especially helpful if the generator is used in multiple projects, that might be visible to each other.

## Usage
To use the `BuildInformation` class in your project, add the NuGet package:

```no-class
dotnet add package LinkDotNet.BuildInformation
```

Here is some code how to use the class:
```csharp
using System;

Console.WriteLine($"Build at: {BuildInformation.BuildAt}");
Console.WriteLine($"Platform: {BuildInformation.Platform}");
Console.WriteLine($"Warning level: {BuildInformation.WarningLevel}");
Console.WriteLine($"Configuration: {BuildInformation.Configuration}");
Console.WriteLine($"Assembly version: {BuildInformation.AssemblyVersion}");
Console.WriteLine($"Assembly file version: {BuildInformation.AssemblyFileVersion}");
Console.WriteLine($"Assembly name: {BuildInformation.AssemblyName}");
Console.WriteLine($"Target framework moniker: {BuildInformation.TargetFrameworkMoniker}");
Console.WriteLine($"Nullability level: {BuildInformation.Nullability}");
Console.WriteLine($"Deterministic build: {BuildInformation.Deterministic}");
```

You can also hover over the properties to get the currently held value (xmldoc support). An example output could look like this:
```no-class
Build at: 24.03.2023 21:32:17
Platform: AnyCpu
Warning level: 7
Configuration: Debug
Assembly version: 1.0
Assembly file version: 1.2
Assembly name: LinkDotNet.BuildInformation.Sample
Target framework moniker: net7.0
Nullability level: enabled
Deterministic build: true
```

## Contributing
If you would like to contribute to the project, please submit a pull request or open an issue on the project's GitHub page. We welcome any feedback, bug reports, or feature requests.

## License
This project is licensed under the MIT License.

:::

### About
:::note

Generating build information


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **BuildInfo**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>netcoreapp7.0</TargetFramework>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<PropertyGroup>
		<UseRootNamespaceForBuildInformation>true</UseRootNamespaceForBuildInformation>
	</PropertyGroup>

	<ItemGroup>
		<CompilerVisibleProperty Include="UseRootNamespaceForBuildInformation" />
	</ItemGroup>

	<ItemGroup>
	  <PackageReference Include="LinkDotNet.BuildInformation" Version="1.0.0" />
		
	</ItemGroup>
	<PropertyGroup>
		<Version>2024.01.20</Version>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuildInfo\src\RSCG_Version\Program.cs" label="Program.cs" >

  This is the use of **BuildInfo** in *Program.cs*

```csharp showLineNumbers 
var strVersion = RSCG_Version.BuildInformation.AssemblyVersion;
System.Console.WriteLine(strVersion);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuildInfo\src\RSCG_Version\obj\GX\LinkDotNet.BuildInformation\LinkDotNet.BuildInformation.IncrementalBuildInformationGenerator\LinkDotNet.BuildInformation.g.cs" label="LinkDotNet.BuildInformation.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This file was generated by the LinkDotNet.BuildInformation package.
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
// </auto-generated>

using System;
using System.Globalization;

namespace RSCG_Version;

internal static class BuildInformation
{
    /// <summary>
    /// Returns the build date (UTC).
    /// </summary>
    /// <remarks>Value is: 2024-01-20T13:07:03.0413235Z</remarks>
    public static readonly DateTime BuildAt = DateTime.ParseExact("2024-01-20T13:07:03.0413235Z", "O", CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind);

    /// <summary>
    /// Returns the platform.
    /// </summary>
    /// <remarks>Value is: AnyCpu</remarks>
    public const string Platform = "AnyCpu";

    /// <summary>
    /// Returns the warning level.
    /// </summary>
    /// <remarks>Value is: 7</remarks>
    public const int WarningLevel = 7;

    /// <summary>
    /// Returns the configuration.
    /// </summary>
    /// <remarks>Value is: Release</remarks>
    public const string Configuration = "Release";

    /// <summary>
    /// Returns the assembly version.
    /// </summary>
    /// <remarks>Value is: 2024.1.20.0</remarks>
    public const string AssemblyVersion = "2024.1.20.0";

    /// <summary>
    /// Returns the assembly file version.
    /// </summary>
    /// <remarks>Value is: 2024.1.20.0</remarks>
    public const string AssemblyFileVersion = "2024.1.20.0";

    /// <summary>
    /// Returns the assembly name.
    /// </summary>
    /// <remarks>Value is: RSCG_Version</remarks>
    public const string AssemblyName = "RSCG_Version";

    /// <summary>
    /// Returns the target framework moniker.
    /// </summary>
    /// <remarks>Value is: netcoreapp7.0</remarks>
    public const string TargetFrameworkMoniker = "netcoreapp7.0";

    /// <summary>
    /// Returns the nullability level.
    /// </summary>
    /// <remarks>Value is: Disable</remarks>
    public const string Nullability = "Disable";

    /// <summary>
    /// Returns whether the build is deterministic.
    /// </summary>
    /// <remarks>Value is: true</remarks>
    public const bool Deterministic = true;
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project BuildInfo ](/sources/BuildInfo.zip)

:::


### Share BuildInfo 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuildInfo&quote=BuildInfo" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuildInfo&text=BuildInfo:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuildInfo" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuildInfo&title=BuildInfo" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuildInfo&title=BuildInfo&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuildInfo" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/BuildInfo

### In the same category (EnhancementProject) - 17 other generators


#### [AutoInvoke.Generator](/docs/AutoInvoke.Generator)


#### [AutoSpectre](/docs/AutoSpectre)


#### [Com](/docs/Com)


#### [CommandLine](/docs/CommandLine)


#### [DeeDee](/docs/DeeDee)


#### [LinqGen.Generator](/docs/LinqGen.Generator)


#### [Mediator](/docs/Mediator)


#### [Pekspro.BuildInformationGenerator](/docs/Pekspro.BuildInformationGenerator)


#### [PlantUmlClassDiagramGenerator](/docs/PlantUmlClassDiagramGenerator)


#### [RSCG_AMS](/docs/RSCG_AMS)


#### [RSCG_ExportDiagram](/docs/RSCG_ExportDiagram)


#### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


#### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


#### [RSCG_Wait](/docs/RSCG_Wait)


#### [ThisAssembly](/docs/ThisAssembly)


#### [ThisAssembly.Constants](/docs/ThisAssembly.Constants)


#### [ThisAssembly.Metadata](/docs/ThisAssembly.Metadata)

