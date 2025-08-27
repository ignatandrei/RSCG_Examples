---
sidebar_position: 730
title: 73 - IDisposableGenerator
description: Generating disposable
slug: /IDisposableGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDisposer.mdx';

# IDisposableGenerator  by Els_kom Official Organization


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/IDisposableGenerator?label=IDisposableGenerator)](https://www.nuget.org/packages/IDisposableGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Elskom/IDisposableGenerator?label=updated)](https://github.com/Elskom/IDisposableGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Elskom/IDisposableGenerator?style=social)

## Details

### Info
:::info

Name: **IDisposableGenerator**

Source Generator Generating the Dispose functions in Disposables.

Author: Els_kom Official Organization

NuGet: 
*https://www.nuget.org/packages/IDisposableGenerator/*   


You can find more details at https://github.com/Elskom/IDisposableGenerator

Source: https://github.com/Elskom/IDisposableGenerator

:::

### Original Readme
:::note

# IDisposableGenerator
Source Generator Generating the Dispose functions in Disposables.

## Code Ownership

All code used is copyright of Elskom org, with the exception of Roslyn which is copyright of the .NET Foundation and it's contributors.

The dependencies of the unit tests are copyright of their respective owners.

## Status

This project is currently actively maintained whenever an issue happens (or whenever major roslyn changes happens that break it).

## Purpose

This project is for easily generating the dispose functions of disposable types using attributes to control the generator on how it writes the generated code. This results in code that is more maintainable and cleaner than if you had to implement the IDisposable interface yourself. Disposable types require marking the type as partial to properly compile the generated code.

## Documentation

It is currently in the works.

## Badges
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4764a3b231ad40c798ea3d193ff3dfe7)](https://www.codacy.com/gh/Elskom/IDisposableGenerator/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Elskom/IDisposableGenerator&amp;utm_campaign=Badge_Grade)
[![Codacy Coverage Badge](https://app.codacy.com/project/badge/Coverage/4764a3b231ad40c798ea3d193ff3dfe7)](https://www.codacy.com/gh/Elskom/IDisposableGenerator/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Elskom/IDisposableGenerator&amp;utm_campaign=Badge_Coverage)

| Package | Version |
|:-------:|:-------:|
| IDisposableGenerator | [![NuGet Badge](https://buildstats.info/nuget/IDisposableGenerator?includePreReleases=true)](https://www.nuget.org/packages/IDisposableGenerator/) |


:::

### About
:::note

Generating disposable


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **IDisposableGenerator**
```xml showLineNumbers {14}
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
	   <PackageReference Include="IDisposableGenerator" Version="1.1.1" OutputItemType="Analyzer"  >
	     <PrivateAssets>all</PrivateAssets>
	     <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	   </PackageReference>
	 </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IDisposableGenerator\src\IDisp\Program.cs" label="Program.cs" >

  This is the use of **IDisposableGenerator** in *Program.cs*

```csharp showLineNumbers 
using IDisposableGeneratorDemo;
//https://github.com/benutomo-dev/RoslynComponents
using (var db = new DALDB())
{
    Console.WriteLine("before releasing");
}
Console.WriteLine("after releasing");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IDisposableGenerator\src\IDisp\DALDB.cs" label="DALDB.cs" >

  This is the use of **IDisposableGenerator** in *DALDB.cs*

```csharp showLineNumbers 
namespace IDisposableGeneratorDemo;

[IDisposableGenerator.GenerateDispose(false)]
partial class DALDB :IDisposable
{
    [IDisposableGenerator.DisposeField(true)]
    private ConnectionDB cn;
    [IDisposableGenerator.DisposeField(true)] 
    private ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IDisposableGenerator\src\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

  This is the use of **IDisposableGenerator** in *ConnectionDB.cs*

```csharp showLineNumbers 
namespace IDisposableGeneratorDemo;

class ConnectionDB : IDisposable
{
    public void Dispose()
    {
        Console.WriteLine("disposing connectiondb");
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IDisposableGenerator\src\IDisp\obj\GX\IDisposableGenerator.CSharp\IDisposableGenerator.IDisposableGenerator\Disposables.g.cs" label="Disposables.g.cs" >


```csharp showLineNumbers 
// <autogenerated/>
namespace IDisposableGeneratorDemo;

internal partial class DALDB : IDisposable
{
    private bool isDisposed;

    internal bool IsOwned { get; set; }

    /// <summary>
    /// Cleans up the resources used by <see cref="DALDB"/>.
    /// </summary>
    public void Dispose() => this.Dispose(true);

    private void Dispose(bool disposing)
    {
        if (!this.isDisposed && disposing)
        {
            if (this.IsOwned)
            {
                this.cn?.Dispose();
                this.cn = null;
                this.cn1?.Dispose();
                this.cn1 = null;
            }
            this.isDisposed = true;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IDisposableGenerator\src\IDisp\obj\GX\IDisposableGenerator.CSharp\IDisposableGenerator.IDisposableGenerator\GeneratedAttributes.g.cs" label="GeneratedAttributes.g.cs" >


```csharp showLineNumbers 
// <autogenerated/>
#pragma warning disable SA1636, 8618
namespace IDisposableGenerator
{
    using System;

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    internal class CallOnDisposeAttribute : Attribute
    {
        public CallOnDisposeAttribute()
        {
        }
    }

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Event | AttributeTargets.Field | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    internal class DisposeFieldAttribute : Attribute
    {
        public DisposeFieldAttribute(bool owner)
        {
        }
    }

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal class GenerateDisposeAttribute : Attribute
    {
        public GenerateDisposeAttribute(bool stream)
        {
        }
    }

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Event | AttributeTargets.Field | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    internal class NullOnDisposeAttribute : Attribute
    {
        public NullOnDisposeAttribute()
        {
        }
    }
}
#pragma warning restore SA1636, 8618

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project IDisposableGenerator ](/sources/IDisposableGenerator.zip)

:::


### Share IDisposableGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIDisposableGenerator&quote=IDisposableGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIDisposableGenerator&text=IDisposableGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIDisposableGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIDisposableGenerator&title=IDisposableGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIDisposableGenerator&title=IDisposableGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIDisposableGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/IDisposableGenerator

aaa
<SameCategory />

