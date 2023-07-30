---
sidebar_position: 260
title: 26 - Podimo.ConstEmbed
description: File content transformed to constants
slug: /Podimo.ConstEmbed
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Podimo.ConstEmbed  by Podimo

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/Podimo.ConstEmbed?label=Podimo.ConstEmbed)](https://www.nuget.org/packages/Podimo.ConstEmbed/)
[![GitHub last commit](https://img.shields.io/github/last-commit/podimo/Podimo.ConstEmbed?label=updated)](https://github.com/podimo/Podimo.ConstEmbed)
![GitHub Repo stars](https://img.shields.io/github/stars/podimo/Podimo.ConstEmbed?style=social)

## Details

### Info
:::info

Name: **Podimo.ConstEmbed**

A source generator that turns additional files into file constants in a generated namespace.
            This is an alternative approach to embedding files in C# source manually,
            or loading them manually as embedded resources via reflection.
            With ConstEmbed, you will never have to see a runtime error because you mistyped the name,
            as the constants are evaluated at compile-time.

Author: Podimo

NuGet: 
*https://www.nuget.org/packages/Podimo.ConstEmbed/*   


You can find more details at https://github.com/podimo/Podimo.ConstEmbed

Source : https://github.com/podimo/Podimo.ConstEmbed

:::

### Original Readme
:::note

# Podimo.ConstEmbed

This project is a [Source Generator](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) which generates constant strings from files at compile-time.

## Using

We use project files to control the generation of constants.
You can see how these are used in [Podimo.ExampleConsoleApp](examples/Podimo.ExampleConsoleApp/Podimo.ExampleConsoleApp.csproj).

## License

See [LICENSE-APACHE](LICENSE-APACHE), [LICENSE-MIT](LICENSE-MIT).


:::

### About
:::note

File content transformed to constants


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Podimo.ConstEmbed**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Podimo.ConstEmbed" Version="1.0.2" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>


	<PropertyGroup>
		<!-- The namespace under which we generate the constants. -->
		<ConstEmbedNamespace>MyAppNamespace</ConstEmbedNamespace>
		<!-- The visibility of the classes in which the constants are declared. -->
		<ConstEmbedVisibility>public</ConstEmbedVisibility>
	</PropertyGroup>
	<ItemGroup>
		<AdditionalFiles Include="sql/*.sql" ConstEmbed="SQL" />
	</ItemGroup>
	<ItemGroup>
	  <None Remove="sql\createDB.sql" />
	</ItemGroup>
	
	
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Podimo.ConstEmbed\src\PodimoConstEmbedDemo\Program.cs" label="Program.cs" >

  This is the use of **Podimo.ConstEmbed** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(MyAppNamespace.SQL.createDB);

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Podimo.ConstEmbed\src\PodimoConstEmbedDemo\sql\createDB.sql" label="createDB.sql" >

  This is the use of **Podimo.ConstEmbed** in *createDB.sql*

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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Podimo.ConstEmbed\src\PodimoConstEmbedDemo\obj\GX\Podimo.ConstEmbed\Podimo.ConstEmbed.ConstEmbedGenerator\SQL.createDB.g.cs" label="SQL.createDB.g.cs" >


```csharp showLineNumbers 
namespace MyAppNamespace
{
    public static partial class SQL
    {
        public const string createDB = @"create database Andrei;
GO;
use Andrei;
GO;
";
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project Podimo.ConstEmbed ](/sources/Podimo.ConstEmbed.zip)

:::

### Download PDF

[Download PDF Podimo.ConstEmbed ](/pdfs/Podimo.ConstEmbed.pdf)

### Share Podimo.ConstEmbed 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPodimo.ConstEmbed&quote=Podimo.ConstEmbed" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPodimo.ConstEmbed&text=Podimo.ConstEmbed:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPodimo.ConstEmbed" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPodimo.ConstEmbed&title=Podimo.ConstEmbed" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPodimo.ConstEmbed&title=Podimo.ConstEmbed&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPodimo.ConstEmbed" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Podimo.ConstEmbed
