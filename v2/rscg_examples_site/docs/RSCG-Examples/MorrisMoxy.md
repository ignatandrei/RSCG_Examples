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
[![GitHub last commit](https://img.shields.io/github/last-commit/mrpmorris/Morris.Moxy?label=updated)]( https://github.com/mrpmorris/Morris.Moxy)
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

Source :  https://github.com/mrpmorris/Morris.Moxy

:::

### Original Readme
:::note



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

### Download PDF

[Download PDF MorrisMoxy ](/pdfs/MorrisMoxy.pdf)

### Share MorrisMoxy 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&quote=MorrisMoxy" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&text=MorrisMoxy:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&title=MorrisMoxy" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy&title=MorrisMoxy&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMorrisMoxy" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MorrisMoxy
