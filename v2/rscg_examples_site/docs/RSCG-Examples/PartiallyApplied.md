---
sidebar_position: 180
title: 18 - PartiallyApplied
description: If you need to curry functions, you can use this package
slug: /PartiallyApplied
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# PartiallyApplied  by Jason Bock


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/PartiallyApplied?label=PartiallyApplied)](https://www.nuget.org/packages/PartiallyApplied/)
[![GitHub last commit](https://img.shields.io/github/last-commit/JasonBock/PartiallyApplied?label=updated)](https://github.com/JasonBock/PartiallyApplied)
![GitHub Repo stars](https://img.shields.io/github/stars/JasonBock/PartiallyApplied?style=social)

## Details

### Info
:::info

Name: **PartiallyApplied**

A way to do partial function application in C#

Author: Jason Bock

NuGet: 
*https://www.nuget.org/packages/PartiallyApplied/*   


You can find more details at https://github.com/JasonBock/PartiallyApplied/blob/main/docs/Quickstart.md

Source : https://github.com/JasonBock/PartiallyApplied

:::

### Original Readme
:::note

# PartiallyApplied

A way to do partial function application in C#.

## Overview

You can find this code as a package in [NuGet](https://www.nuget.org/packages/PartiallyApplied/). Once installed, you can use it to do partial function application:
```
public static class Maths
{
  public static int Add(int a, int b) => a + b;
}

public static class Runner
{
  public static void Run()
  {
    var incrementBy3 = Partially.Apply(Maths.Add, 3);
    var value = incrementBy3(4);
    // value is now equal to 7.
  }
}
```
More details can be found on the [Quickstart page](https://github.com/JasonBock/PartiallyApplied/blob/main/docs/Quickstart.md). Note that if you build the code locally, you'll need to build in `Release` mode for the package reference in `PartiallyApplied.NuGetHost` to resolve correctly (or unload that project from the solution as it's optional and delete `nuget.config`).


:::

### About
:::note

If you need to curry functions, you can use this package


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **PartiallyApplied**
```xml showLineNumbers {13}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
    <PackageReference Include="PartiallyApplied" Version="1.3.0" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\PartiallyApplied\src\PartFunc\Program.cs" label="Program.cs" >

  This is the use of **PartiallyApplied** in *Program.cs*

```csharp showLineNumbers 
using System;

namespace PartFunc;
class Program
{
    static void Main(string[] args)
    {
        
        var disc10Percent = Partially.Apply(Accounting.Discount, 1/10f);
        Console.WriteLine(disc10Percent(disc10Percent(100)));
        
    }
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\PartiallyApplied\src\PartFunc\Accounting.cs" label="Accounting.cs" >

  This is the use of **PartiallyApplied** in *Accounting.cs*

```csharp showLineNumbers 
namespace PartFunc;

public class Accounting
{
    public static float Discount( float discount, float price)
    {
        var val= price * (1- discount);
        return val;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\PartiallyApplied\src\PartFunc\obj\GX\PartiallyApplied\PartiallyApplied.PartiallyAppliedGenerator\Partially.g.cs" label="Partially.g.cs" >


```csharp showLineNumbers 
using System;

#nullable enable
public static partial class Partially
{
	public static Func<float, float> Apply(Func<float, float, float> method, float discount) =>
		new((price) => method(discount, price));
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project PartiallyApplied ](/sources/PartiallyApplied.zip)

:::


### Share PartiallyApplied 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPartiallyApplied&quote=PartiallyApplied" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPartiallyApplied&text=PartiallyApplied:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPartiallyApplied" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPartiallyApplied&title=PartiallyApplied" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPartiallyApplied&title=PartiallyApplied&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPartiallyApplied" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/PartiallyApplied
