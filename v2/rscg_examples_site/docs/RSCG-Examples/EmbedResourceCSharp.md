---
sidebar_position: 270
title: 27 - EmbedResourceCSharp
description: reading embedded resources fast
slug: /EmbedResourceCSharp
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# EmbedResourceCSharp  by pCYSl5EDgo


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/EmbedResourceCSharp?label=EmbedResourceCSharp)](https://www.nuget.org/packages/EmbedResourceCSharp/)
[![GitHub last commit](https://img.shields.io/github/last-commit/pCYSl5EDgo/EmbeddingResourceCSharp?label=updated)](https://github.com/pCYSl5EDgo/EmbeddingResourceCSharp)
![GitHub Repo stars](https://img.shields.io/github/stars/pCYSl5EDgo/EmbeddingResourceCSharp?style=social)

## Details

### Info
:::info

Name: **EmbedResourceCSharp**

SourceGenerator for resource file embedding with EmbedResourceCSharp.

Author: pCYSl5EDgo

NuGet: 
*https://www.nuget.org/packages/EmbedResourceCSharp/*   


You can find more details at https://github.com/pCYSl5EDgo/EmbeddingResourceCSharp

Source : https://github.com/pCYSl5EDgo/EmbeddingResourceCSharp

:::

### Original Readme
:::note

# EmbedResourceCSharp

This is a [C# Source Generator](https://devblogs.microsoft.com/dotnet/new-c-source-generator-samples/).
This let you embed files in your application.
You do not need to use `Assembly.GetManifestResourceStream` anymore.

# How to use

## Install

```sh
dotnet add package EmbedResourceCSharp
```

Add only 1 package to your C# project.

## Embedding file

Provide that there are some files like below.

- projectFolder/
  - Example.csproj
  - ExampleProgram.cs
  - resourceFileA.txt

```csharp
namespace Example
{
    // partial methods require partial class/struct!
    public partial class ExampleClass
    {
        /*
            The relative file path from C# project folder should be specified.
            The return value type must be System.ReadOnlySpan<byte>.
            No parameter must exist.
            The method must be static and partial.
            The accessibility of the method does not matter.
        */
        [EmbedResourceCSharp.FileEmbed("resourceFileA.txt")]
        private static partial System.ReadOnlySpan<byte> GetFileContentA();
    }
}
```

You can get file content byte sequence with static partial method `System.ReadOnlySpan<byte> GetFileContentA`.

## Embedding files under specific folder

Provide that there are some files like below.

- projectFolder/
  - Example2.csproj
  - ExampleProgram.cs
- folderB/
  - resourceA.txt
  - resourceB.txt
  - folderB_C/
    - resourceC.txt
  - resourceD.csv

```csharp
namespace Example2
{
    // partial methods require partial class/struct!
    public partial class ExampleClass
    {
        /*
            The relative folder path from C# project folder should be specified. The folder path should end with slash or backslash.
            The return value type must be System.ReadOnlySpan<byte>.
            One parameter must exist and its type must be System.ReadOnlySpan<char>. The parameter name does not matter.
            The method must be static and partial.
            The accessibility of the method does not matter.
        */
        [EmbedResourceCSharp.FolderEmbed("../folderB/", "*.txt")]
        private static partial System.ReadOnlySpan<byte> GetResouceFileContent(System.ReadOnlySpan<char> path);

        public static void Main()
        {
            // Specify relative path from the folder.
            var aContent = GetResouceFileContent("resourceA.txt");
            var bContent = GetResouceFileContent("resourceB.txt");
            var cContent = GetResouceFileContent("folderB_C/resourceC.txt");
            // var dContent = GetResouceFileContent("resourceD.csv");
            // Above method call throws an FileNotFoundException!
        }
    }
}
```

You can include all files under the target folder recursively.
You can filter file with search pattern.


:::

### About
:::note

reading embedded resources fast


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **EmbedResourceCSharp**
```xml showLineNumbers {22}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
  <ItemGroup>
    <None Remove="createDB.txt" />
  </ItemGroup>

  <ItemGroup>
    <EmbeddedResource Include="createDB.txt" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="EmbedResourceCSharp" Version="1.1.3">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EmbeddingResourceCSharp\src\EmbeddingResourceCSharpDemo\Program.cs" label="Program.cs" >

  This is the use of **EmbedResourceCSharp** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using System;
using System.Text;

var value = EmbeddingResourceCSharpDemo.MyResource.GetContentOfCreate();
StringBuilder sb = new ();
foreach (byte b in value)
{
    sb.Append((char)b);
}
;
//EncodingExtensions.GetString(Encoding.UTF8, value);
Console.WriteLine(sb.ToString());

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EmbeddingResourceCSharp\src\EmbeddingResourceCSharpDemo\MyResource.cs" label="MyResource.cs" >

  This is the use of **EmbedResourceCSharp** in *MyResource.cs*

```csharp showLineNumbers 

namespace EmbeddingResourceCSharpDemo;

public partial class MyResource
{
    [EmbedResourceCSharp.FileEmbed("createDB.txt")]
    public static partial System.ReadOnlySpan<byte> GetContentOfCreate();
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EmbeddingResourceCSharp\src\EmbeddingResourceCSharpDemo\createDB.txt" label="createDB.txt" >

  This is the use of **EmbedResourceCSharp** in *createDB.txt*

```csharp showLineNumbers 
create database Andrei;
GO;
use Andrei;
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EmbeddingResourceCSharp\src\EmbeddingResourceCSharpDemo\obj\GX\EmbedResourceCSharp\EmbedResourceCSharp.Generator\Attribute.cs" label="Attribute.cs" >


```csharp showLineNumbers 
namespace EmbedResourceCSharp
{
    internal enum PathSeparator
    {
        AsIs,
        Slash,
        BackSlash,
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    internal sealed class FileEmbedAttribute : global::System.Attribute
    {
        public string Path { get; }

        public FileEmbedAttribute(string path)
        {
            Path = path;
        }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    internal sealed class FolderEmbedAttribute : global::System.Attribute
    {
        public string Path { get; private set; }
        public string Filter { get; private set; }
        public global::System.IO.SearchOption Option { get; private set; }
        public PathSeparator Separator { get; private set; }

        public FolderEmbedAttribute(string path, string filter = "*", global::System.IO.SearchOption option = global::System.IO.SearchOption.AllDirectories, PathSeparator separator = PathSeparator.Slash)
        {
            Path = path;
            Filter = filter;
            Option = option;
            Separator = separator;
        }
    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\EmbeddingResourceCSharp\src\EmbeddingResourceCSharpDemo\obj\GX\EmbedResourceCSharp\EmbedResourceCSharp.Generator\MyResource____GetContentOfCreate.file.g.cs" label="MyResource____GetContentOfCreate.file.g.cs" >


```csharp showLineNumbers 
namespace EmbeddingResourceCSharpDemo
{
    public partial class MyResource
    {
        public static partial global::System.ReadOnlySpan<byte> GetContentOfCreate()
        {
            return new byte[] { 239, 187, 191, 99, 114, 101, 97, 116, 101, 32, 100, 97, 116, 97, 98, 97, 115, 101, 32, 65, 110, 100, 114, 101, 105, 59, 13, 10, 71, 79, 59, 13, 10, 117, 115, 101, 32, 65, 110, 100, 114, 101, 105, 59 };
        }
    }
}


```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project EmbedResourceCSharp ](/sources/EmbedResourceCSharp.zip)

:::


### Share EmbedResourceCSharp 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEmbedResourceCSharp&quote=EmbedResourceCSharp" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEmbedResourceCSharp&text=EmbedResourceCSharp:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEmbedResourceCSharp" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEmbedResourceCSharp&title=EmbedResourceCSharp" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEmbedResourceCSharp&title=EmbedResourceCSharp&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEmbedResourceCSharp" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/EmbedResourceCSharp
