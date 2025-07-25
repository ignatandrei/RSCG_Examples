---
sidebar_position: 1560
title: 156 - RSCG_NameGenerator
description: Generating unique names for assemblies
slug: /RSCG_NameGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_NameGenerator  by Andrei Ignat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_NameGenerator?label=RSCG_NameGenerator)](https://www.nuget.org/packages/RSCG_NameGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/NameGenerator?label=updated)](https://github.com/ignatandrei/NameGenerator/)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/NameGenerator?style=social)

## Details

### Info
:::info

Name: **RSCG_NameGenerator**

Generates uniqe names for release

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_NameGenerator/*   


You can find more details at https://github.com/ignatandrei/NameGenerator/

Source : https://github.com/ignatandrei/NameGenerator/

:::

### Original Readme
:::note

# NameGenerator

Generator of names for an assembly /  product release . Generates names  for {adjective}-{name} or {adjective-name-city} 

The fact that is a Roslyn Code Generator ensures that you can use it in your projects without any additional dependencies - and get rid of him !

## Usage

Add to the .csproj file:

```xml
  <ItemGroup>
	  <PackageReference Include="RSCG_NameGenerator" Version="2024.26.8.2002" >
		  <OutputItemType>Analyzer</OutputItemType>
		  <ReferenceOutputAssembly>false</ReferenceOutputAssembly>
	  </PackageReference>
  </ItemGroup>
  <!-- optional -->
  <PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

Then, in the code, you can use the following code:

```csharp
using Generated.TestNameGenerator;
//by just putting here
//you will not deploy the dll when you deploy the project
//name are generated in the code source
Console.WriteLine($"Name:{TheAssemblyInfo.GeneratedName}");
Console.WriteLine($"Nice:{TheAssemblyInfo.GeneratedNameNice}");
Console.WriteLine($"Small:{TheAssemblyInfo.GeneratedNameSmall}");
```


## More examples

Please see https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG for a list of examples of Roslyn Source Code Generators

Enjoy!

:::

### About
:::note

Generating unique names for assemblies


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_NameGenerator**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
	
		<OutputType>Exe</OutputType>
		<TargetFramework>net8.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="RSCG_NameGenerator" Version="2024.26.8.2002" >
			<OutputItemType>Analyzer</OutputItemType>
			<ReferenceOutputAssembly>false</ReferenceOutputAssembly>
		</PackageReference>
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_NameGenerator\src\TestNameGenerator\Program.cs" label="Program.cs" >

  This is the use of **RSCG_NameGenerator** in *Program.cs*

```csharp showLineNumbers 
using Generated.TestNameGenerator;
//by just putting here
//you will not deploy the dll when you deploy the project
//name are generated in the code source
Console.WriteLine($"Name:{TheAssemblyInfo.GeneratedName}");
Console.WriteLine($"Nice:{TheAssemblyInfo.GeneratedNameNice}");
Console.WriteLine($"Small:{TheAssemblyInfo.GeneratedNameSmall}");
//if you want to generate a new name every time you run the app
//put in the csproj
//<ReferenceOutputAssembly>false</ReferenceOutputAssembly>
//but the dll will be deployed with the app
//Console.WriteLine(NameGenerator.NameGeneratorData.Generate().UniqueNameLong);
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_NameGenerator\src\TestNameGenerator\obj\GX\NameGenerator\NameGenerator.NameGen\TheAssemblyInfo.g.cs" label="TheAssemblyInfo.g.cs" >


```csharp showLineNumbers 

                // <auto-generated/>
                namespace Generated.TestNameGenerator
                {
                    public static class TheAssemblyInfo
                    {
                        public const string AssemblyName = "TestNameGenerator";
                        public const string GeneratedNameNice = "Henri Bergson is feeling clear in Dhaka";
                        public const string GeneratedNameSmall = "clear-Henri Bergson";
                        public const string GeneratedName = "clear-Henri Bergson-Dhaka";
                        
                    }
                }
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_NameGenerator ](/sources/RSCG_NameGenerator.zip)

:::


### Share RSCG_NameGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_NameGenerator&quote=RSCG_NameGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_NameGenerator&text=RSCG_NameGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_NameGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_NameGenerator&title=RSCG_NameGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_NameGenerator&title=RSCG_NameGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_NameGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_NameGenerator

### In the same category (EnhancementProject) - 17 other generators


#### [AutoInvoke.Generator](/docs/AutoInvoke.Generator)


#### [AutoSpectre](/docs/AutoSpectre)


#### [BuildInfo](/docs/BuildInfo)


#### [CommandLine](/docs/CommandLine)


#### [Credfeto.Version.Information.Generator](/docs/Credfeto.Version.Information.Generator)


#### [Larcanum.GitInfo](/docs/Larcanum.GitInfo)


#### [LinqGen.Generator](/docs/LinqGen.Generator)


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

