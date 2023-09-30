---
sidebar_position: 310
title: 31 - MorrisMoxy
description: Generate C# code for classes from template using attributes
slug: /MorrisMoxy
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# MorrisMoxy  by Peter Morris


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Morris.Moxy?label=Morris.Moxy)](https://www.nuget.org/packages/Morris.Moxy/)
[![GitHub last commit](https://img.shields.io/github/last-commit/mrpmorris/Morris.Moxy?label=updated)](https://github.com/mrpmorris/Morris.Moxy)
![GitHub Repo stars](https://img.shields.io/github/stars/mrpmorris/Morris.Moxy?style=social)

## Details

### Info
:::info

Name: **MorrisMoxy**

A C# mix-in code generator

Author: Peter Morris

NuGet: 
*https://www.nuget.org/packages/Morris.Moxy/*   


You can find more details at  https://github.com/mrpmorris/Morris.Moxy

Source : https://github.com/mrpmorris/Morris.Moxy

:::

### Original Readme
:::note

# Morris.Moxy


***Morris.Moxy*** is a code mix-in code generator for [Microsoft .NET](https://dotnet.microsoft.com/)

[![NuGet version (PackageName)](https://img.shields.io/nuget/v/Morris.Moxy.svg?style=flat-square)](https://www.nuget.org/packages/Morris.Moxy/)

## Overview
Moxy allows you to write code templates at development time, which are then processed
as Roslyn code-generators in real-time, and the results mixed-in to target classes.

## Goal
1. Write your code patterns once.

```
namespace {{ moxy.Class.Namespace }}
{
  partial class {{ moxy.Class.Name}}
  {
    public string FullName => $"{Salutation} {GivenName} {FamilyName}"
    public string Salutation { get; set; }
    public string GivenName { get; set; }
    public string FamilyName { get; set; }
  }
}
```

2. Moxy automatically creates a .Net attribute for each pattern, which you can
   then apply to multiple targets in your source code.

```c#
[PersonName]
public partial class Contact
{
}
```


4. The Moxy Roslyn code-generator executes the code pattern to generate additional C# code

```c#
namespace MyApp
{
    partial class Contact
    {
        public string FullName => $"{Salutation} {GivenName} {FamilyName}"
        public string Salutation { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
    }
}
```

5. Moxy is **FAST**. Changes to the template should reflect in the code in real-time. No need to
  recompile C# source code between changes.

## Getting started

The easiest way to get started is to read the documentation.
Which includes tutorials that are numbered in an order recommended for learning
***Morris.Moxy***. Each will have a `README` file that explains how the tutorial was created.

## Installation
You can download the latest release / pre-release NuGet packages from the official
***Morris.Moxy*** [Nuget page](https://www.nuget.org/packages/Morris.Moxy/)

## Release notes
See the Releases page for release history.

# Licence
[MIT](https://opensource.org/licenses/MIT)


:::

### About
:::note

Generate C# code for classes from template using attributes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MorrisMoxy**
```xml showLineNumbers {25}
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
    <None Remove="mixin\IDName.mixin" />
  </ItemGroup>

  <ItemGroup>
    <AdditionalFiles Include="mixin\IDName.mixin" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Morris.Moxy" Version="1.5.0" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\Program.cs" label="Program.cs" >

  This is the use of **MorrisMoxy** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using MorrisMoxyDemo;
var e = new Employee();
e.Name = "Andrei";
var d = new Department();
d.Name = "IT";
Console.WriteLine(e.ID);
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\Employee.cs" label="Employee.cs" >

  This is the use of **MorrisMoxy** in *Employee.cs*

```csharp showLineNumbers 


namespace MorrisMoxyDemo;
[IDName]
partial class Employee
{
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\Department.cs" label="Department.cs" >

  This is the use of **MorrisMoxy** in *Department.cs*

```csharp showLineNumbers 

namespace MorrisMoxyDemo;
[IDName]
partial class Department
{
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\mixin\IDName.mixin" label="IDName.mixin" >

  This is the use of **MorrisMoxy** in *IDName.mixin*

```csharp showLineNumbers 
namespace {{ moxy.Class.Namespace }}
{
  partial class {{ moxy.Class.Name}}
  {
    public string Name {get;set;}
    public long  ID { get; set; }
  }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\obj\GX\Morris.Moxy\Morris.Moxy.RoslynIncrementalGenerator\IDName.MixinAttribute.Moxy.g.cs" label="IDName.MixinAttribute.Moxy.g.cs" >


```csharp showLineNumbers 
// Generated from mixin\IDName.mixin at 2023-07-31 19:27:42 UTC
namespace MorrisMoxyDemo
{
    
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = true)]
    internal class IDNameAttribute : Attribute
    {
    }
}


```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\obj\GX\Morris.Moxy\Morris.Moxy.RoslynIncrementalGenerator\MorrisMoxyDemo.Department.IDName.Instance1.MixinCode.Moxy.g.cs" label="MorrisMoxyDemo.Department.IDName.Instance1.MixinCode.Moxy.g.cs" >


```csharp showLineNumbers 
// Generated at 2023-07-31 19:27:42 UTC
namespace MorrisMoxyDemo
{
  partial class Department
  {
    public string Name {get;set;}
    public long  ID { get; set; }
  }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\MorrisMoxy\src\MorrisMoxyDemo\obj\GX\Morris.Moxy\Morris.Moxy.RoslynIncrementalGenerator\MorrisMoxyDemo.Employee.IDName.Instance1.MixinCode.Moxy.g.cs" label="MorrisMoxyDemo.Employee.IDName.Instance1.MixinCode.Moxy.g.cs" >


```csharp showLineNumbers 
// Generated at 2023-07-31 19:27:42 UTC
namespace MorrisMoxyDemo
{
  partial class Employee
  {
    public string Name {get;set;}
    public long  ID { get; set; }
  }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project MorrisMoxy ](/sources/MorrisMoxy.zip)

:::


### Share MorrisMoxy 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&quote=MorrisMoxy" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&text=MorrisMoxy:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&title=MorrisMoxy" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&title=MorrisMoxy&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MorrisMoxy

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [BenutomoAutomaticDisposeImplSourceGenerator](/docs/BenutomoAutomaticDisposeImplSourceGenerator)


### [EnumClass](/docs/EnumClass)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [NetEscapades.EnumGenerators](/docs/NetEscapades.EnumGenerators)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Decorator](/docs/RSCG_Decorator)


### [RSCG_Static](/docs/RSCG_Static)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)

