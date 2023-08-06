---
sidebar_position: 40
title: 04 - RSCG_Utils
description: Add files as C# consts
slug: /RSCG_Utils
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_Utils  by Ignat Andrei


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/rscgutils?label=rscgutils)](https://www.nuget.org/packages/rscgutils)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_Utils?label=updated)](https://github.com/ignatandrei/RSCG_Utils)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_Utils?style=social)

## Details

### Info
:::info

Name: **RSCG_Utils**

Additional files as strings

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/rscgutils*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation

Source : https://github.com/ignatandrei/RSCG_Utils

:::

### Original Readme
:::note

# RSCG_Utils

Roslyn Source Code Generators Utils

[![pack to nuget](https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml/badge.svg)](https://github.com/ignatandrei/RSCG_Utils/actions/workflows/dotnet.yml)

[![pack to nuget](https://img.shields.io/nuget/dt/rscgutils?style=for-the-badge)](https://www.nuget.org/packages/rscgutils)

# Usage

## Additional Files

Allow you to see additional files directly as C# const. For this, please add some .gen. files to the project.

In your csproj

```xml
<ItemGroup>
 	  <PackageReference Include="rscgutils" Version="2023.502.835" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
<ItemGroup>
	<AdditionalFiles Include="Second.gen.txt" />
	<AdditionalFiles Include="first.gen.txt" />
	<AdditionalFiles Include="test\Afirst.gen.txt" />
	<AdditionalFiles Include="sql/**/*" />
</ItemGroup>
```

In the code

```csharp
//see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string
string x= MyAdditionalFiles.Second_gen_txt;
```

To debug, you can add into the .csproj
```xml
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GeneratedX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

More details at http://msprogrammer.serviciipeweb.ro/2023/05/08/file-to-csharp-const/


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)




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
```xml showLineNumbers {11}
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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Utils\src\DemoRSCG_Utils\Program.cs" label="Program.cs" >

  This is the use of **RSCG_Utils** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine("Hello, World!");
string dataFromFile = MyAdditionalFiles.data_gen_txt;
Console.Write(dataFromFile);
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Utils\src\DemoRSCG_Utils\data.gen.txt" label="data.gen.txt" >

  This is the use of **RSCG_Utils** in *data.gen.txt*

```csharp showLineNumbers 
This is a data
That you will retrieve
as C# const
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Utils\src\DemoRSCG_Utils\obj\GX\RSCG_Utils\RSCG_Utils.AdditionalFilesGenerator\MyAdditionalFiles.data.gen.txt.cs" label="MyAdditionalFiles.data.gen.txt.cs" >


```csharp showLineNumbers 

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

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_Utils ](/sources/RSCG_Utils.zip)

:::


### Share RSCG_Utils 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&quote=RSCG_Utils" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&text=RSCG_Utils:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&title=RSCG_Utils" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils&title=RSCG_Utils&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Utils" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Utils
