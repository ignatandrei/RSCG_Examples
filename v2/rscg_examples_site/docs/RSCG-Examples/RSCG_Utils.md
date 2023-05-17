---
sidebar_position: 40
title: RSCG - RSCG_Utils
description: Add files as C# consts
slug: /RSCG_Utils
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_Utils  by Ignat Andrei

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/RSCG_Utils?label=RSCG_Utils)](https://www.nuget.org/packages/RSCG_Utils)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_Utils?label=updated)](https://github.com/ignatandrei/RSCG_Utils)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_Utils?style=social)

## Details

### Info
:::info

Name: **RSCG_Utils**

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_Utils*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation

Source : https://github.com/ignatandrei/RSCG_Utils
:::

### About
:::note

Add files as C# consts


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_Utils**
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="rscgutils" Version="2023.514.835" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  
  </ItemGroup>
	<ItemGroup>
		<AdditionalFiles Include="data.gen.txt" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>


</Project>

```

</TabItem>

  <TabItem value="" label="Program.cs" >

  This is the use of **RSCG_Utils** in *Program.cs*

```csharp
Console.WriteLine("Hello, World!");
string dataFromFile = MyAdditionalFiles.data_gen_txt;
Console.Write(dataFromFile);
```
  </TabItem>

  <TabItem value="" label="data.gen.txt" >

  This is the use of **RSCG_Utils** in *data.gen.txt*

```csharp
This is a data
That you will retrieve
as C# const
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="" label="MyAdditionalFiles.data.gen.txt.cs" >


```csharp

    public static partial class MyAdditionalFiles
    {
        //https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string                
        public const string data_gen_txt =  """"""""""
This is a data
That you will retrieve
as C# const
"""""""""";
    }
```

  </TabItem>


</Tabs>

## Usefull

### Download Example
:::tip

[Download Example RSCG_Utils ](/sources/RSCG_Utils.zip)

:::

### Download PDF

[Download PDF RSCG_Utils ](/pdfs/RSCG_Utils.pdf)

### Share RSCG_Utils 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&quote=RSCG_Utils" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&text=RSCG_Utils:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&title=RSCG_Utils" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&title=RSCG_Utils&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Utils
