---
sidebar_position: 2840
title: 284 - Pinecone.TypedPath
description: Generating typed paths for file system navigation and manipulation.
slug: /Pinecone.TypedPath
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFilesToCode.mdx';

# Pinecone.TypedPath  by Nick Pinecone


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Pinecone.TypedPath?label=Pinecone.TypedPath)](https://www.nuget.org/packages/Pinecone.TypedPath/)
[![GitHub last commit](https://img.shields.io/github/last-commit/nickpinecone/typed-path?label=updated)](https://github.com/nickpinecone/typed-path)
![GitHub Repo stars](https://img.shields.io/github/stars/nickpinecone/typed-path?style=social)

## Details

### Info
:::info

Name: **Pinecone.TypedPath**

.NET source generator for strongly typed file paths

Author: Nick Pinecone

NuGet: 
*https://www.nuget.org/packages/Pinecone.TypedPath/*   


You can find more details at https://github.com/nickpinecone/typed-path

Source: https://github.com/nickpinecone/typed-path

:::

### Author
:::note
Nick Pinecone 
![Alt text](https://github.com/nickpinecone.png)
:::

## Original Readme
:::note

### Typed Path

[![Nuget](https://img.shields.io/nuget/v/Pinecone.TypedPath?style=flat-square)](https://www.nuget.org/packages/Pinecone.TypedPath)
[![License](https://img.shields.io/github/license/nickpinecone/typed-path?style=flat-square)](https://github.com/nickpinecone/typed-path/blob/main/LICENSE.md)
[![GitHub](https://img.shields.io/badge/-source-181717.svg?logo=GitHub)](https://github.com/nickpinecone/typed-path)

.NET source generator for strongly typed file paths

###### Install
Install the package from nuget
```sh
dotnet add package Pinecone.TypedPath
```

Make sure to include the package as a source generator
```xml
<ItemGroup>
    <PackageReference Include="Pinecone.TypedPath" Version="..." ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
</ItemGroup>
```

###### Configuration
The `Sample` project includes the full example

First add the folder to .csproj as AdditionalFiles
```xml
<ItemGroup>
    <AdditionalFiles Include="Assets/**" />
</ItemGroup>
```

Then define a partial class with `TypedPath` attribute and `ITypedPath` interface
```cs
[TypedPath("Assets")]
public partial class Assets : ITypedPath
{
    public static string Wrap(string path)
    {
        return path;
    }
}
```

After that you can just reference the path you need
```cs
> Console.WriteLine(Assets.SubFolder.NestedFolder.SuperNested);

Assets/SubFolder/NestedFolder/SuperNested.json
```

###### Note for Rider
Related to [RIDER-75959](https://youtrack.jetbrains.com/issue/RIDER-75959/Rider-doesnt-trigger-IncrementalSourceGenerator-when-changing-AdditionalFiles)

While the source generator works with most file types (`.json`, `.png`, etc.),  
Rider's IntelliSense may not detect changes with `.txt` and potentially other files.

**Builds will still work correctly** (this is purely an IDE issue)  


:::

### About
:::note

Generating typed paths for file system navigation and manipulation.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Pinecone.TypedPath**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	
	<ItemGroup>
		<AdditionalFiles Include="MyFolderToShow/**" />
	</ItemGroup>
	<ItemGroup>
    <PackageReference Include="Pinecone.TypedPath" Version="1.0.4" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pinecone.TypedPath\src\FolderToCode\Program.cs" label="Program.cs" >

  This is the use of **Pinecone.TypedPath** in *Program.cs*

```csharp showLineNumbers 
using FolderToCode;

Console.WriteLine(MyFolder.en.A);
Console.WriteLine(MyFolder.ro.A);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pinecone.TypedPath\src\FolderToCode\MyFolder.cs" label="MyFolder.cs" >

  This is the use of **Pinecone.TypedPath** in *MyFolder.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;
using TypedPath;

namespace FolderToCode;

[TypedPath("MyFolderToShow")]
public partial  class MyFolder: ITypedPath
{
    public static string Wrap(string path)
    {
        return path;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pinecone.TypedPath\src\FolderToCode\obj\GX\TypedPath.SourceGen\TypedPath.SourceGen.PathGenerator\TypedPath.MyFolder.g.cs" label="TypedPath.MyFolder.g.cs" >
```csharp showLineNumbers 
namespace FolderToCode;

[global::System.CodeDom.Compiler.GeneratedCode("TypedPath", "1.0.0")]
public partial class MyFolder
{
    public static partial class en
    {
        public static readonly string A = Wrap("MyFolder\en\a.json");
    }
    public static partial class ro
    {
        public static readonly string A = Wrap("MyFolder\ro\a.json");
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pinecone.TypedPath\src\FolderToCode\obj\GX\TypedPath.SourceGen\TypedPath.SourceGen.PathGenerator\TypedPathAttribute.g.cs" label="TypedPathAttribute.g.cs" >
```csharp showLineNumbers 
using System;

namespace TypedPath;

[global::System.CodeDom.Compiler.GeneratedCode("TypedPath", "1.0.0")]
[AttributeUsage(AttributeTargets.Class)]
public class TypedPathAttribute : Attribute
{
    public string Path \{ get; }
    public bool OriginalFilename \{ get; }

    public TypedPathAttribute(string path, bool originalFilename = false)
    {
        Path = path;
        OriginalFilename = originalFilename;
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pinecone.TypedPath\src\FolderToCode\obj\GX\TypedPath.SourceGen\TypedPath.SourceGen.PathGenerator\TypedPathInterface.g.cs" label="TypedPathInterface.g.cs" >
```csharp showLineNumbers 
namespace TypedPath;

[global::System.CodeDom.Compiler.GeneratedCode("TypedPath", "1.0.0")]
public interface ITypedPath
{
    public static abstract string Wrap(string path);
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Pinecone.TypedPath ](/sources/Pinecone.TypedPath.zip)

:::


### Share Pinecone.TypedPath 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPinecone.TypedPath&quote=Pinecone.TypedPath" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPinecone.TypedPath&text=Pinecone.TypedPath:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPinecone.TypedPath" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPinecone.TypedPath&title=Pinecone.TypedPath" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPinecone.TypedPath&title=Pinecone.TypedPath&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPinecone.TypedPath" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Pinecone.TypedPath

<SameCategory />

