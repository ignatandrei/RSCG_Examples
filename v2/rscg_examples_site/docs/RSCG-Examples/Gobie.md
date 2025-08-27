---
sidebar_position: 520
title: 52 - Gobie
description: templating for classes , fields ...
slug: /Gobie
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveTemplating.mdx';

# Gobie  by Mike Conrad


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Gobie?label=Gobie)](https://www.nuget.org/packages/Gobie/)
[![GitHub last commit](https://img.shields.io/github/last-commit/GobieGenerator/Gobie?label=updated)](https://github.com/GobieGenerator/Gobie/)
![GitHub Repo stars](https://img.shields.io/github/stars/GobieGenerator/Gobie?style=social)

## Details

### Info
:::info

Name: **Gobie**

Package Description

Author: Mike Conrad

NuGet: 
*https://www.nuget.org/packages/Gobie/*   


You can find more details at https://github.com/GobieGenerator/Gobie/

Source: https://github.com/GobieGenerator/Gobie/

:::

### Original Readme
:::note

# Gobie

[![NuGet](https://shields.io/nuget/v/Gobie.svg)](https://www.nuget.org/packages/Gobie/)
[![Code coverage](https://codecov.io/gh/GobieGenerator/Gobie/branch/main/graph/badge.svg)](https://codecov.io/gh/GobieGenerator/Gobie)
 
## Overview
 
  

Source generation in C# is a very powerful tool, but its complexity reduces how and where it is used. 

This is my attempt to make source generation for low/medium complexity scenarios easily accessible. Gobie allows developers define and use custom source generation without writing any generator code themselves or learning the Roslyn APIs. This happens in two steps. 
1. Devs define what they want to generate in C#. Typically this would be text templates, along with definitions for what parameters are needed to populate the template.
    1. From step 1, Gobie creates marker attributes which can be used to tag classes, fields, ... that need code generation.
2. Using the marker attributes, devs mark their code with the generated attributes, and provide custom arguments where needed. This step work just like consuming any other source generator.
    1. Code is generated based on the templates provided.

While this is in early development I'm going to keep a dev log [on my blog](https://mjconrad.com/).

## Feedback & Contribution

I am very much looking for feedback at this point. I can see several possible use cases for this approach to generation and am very interested in hearing whether others are interested in this concept or not. There are quite a few remaining technical challenges and substantial development work ahead, so it would be great to learn if this is something the community would find useful. 

Contributors are welcome, but given the early state of this project please open an issue so we can discuss anything you are interested in working on.


:::

### About
:::note

templating for classes , fields ...


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Gobie**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Gobie" Version="0.5.0-alpha" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Gobie\src\GobieDemo\Program.cs" label="Program.cs" >

  This is the use of **Gobie** in *Program.cs*

```csharp showLineNumbers 
using GobieDemo;

Person p = new();
p.Name = "Andrei ";
//this comes from Gobie template
p.Id = 1;

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Gobie\src\GobieDemo\Person.cs" label="Person.cs" >

  This is the use of **Gobie** in *Person.cs*

```csharp showLineNumbers 
using Gobie;
namespace GobieDemo;

[ClassGenAddId()]
partial class Person
{
    public string? Name { get; set; }

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Gobie\src\GobieDemo\ClassGenAddId.cs" label="ClassGenAddId.cs" >

  This is the use of **Gobie** in *ClassGenAddId.cs*

```csharp showLineNumbers 


using Gobie;

namespace GobieDemo;
[GobieGeneratorName("ClassGenAddId")]
public sealed class ClassGenAddId : GobieClassGenerator
{
    [GobieFileTemplate("ID")]
    private const string LogString = @"
         using System;

            namespace {{ClassNamespace}};

            partial  class {{ClassName}}
            {
                public int Id { get; set; }
            }
    
    ";
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Gobie\src\GobieDemo\obj\GX\Gobie\Gobie.GobieGenerator\Person_ClassGenAddIdAttribute.g.cs" label="Person_ClassGenAddIdAttribute.g.cs" >


```csharp showLineNumbers 
namespace GobieDemo
{
    public partial class Person
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Gobie\src\GobieDemo\obj\GX\Gobie\Gobie.GobieGenerator\Person_ClassGenAddIdAttribute_ID.g.cs" label="Person_ClassGenAddIdAttribute_ID.g.cs" >


```csharp showLineNumbers 
using System;

namespace GobieDemo;
partial class Person
{
    public int Id { get; set; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Gobie\src\GobieDemo\obj\GX\Gobie\Gobie.GobieGenerator\_Gobie.ClassGenAddIdAttribute.g.cs" label="_Gobie.ClassGenAddIdAttribute.g.cs" >


```csharp showLineNumbers 
namespace Gobie
{
    /// <summary> This attribute will cause the generator defined by this thing here to
    /// run <see cref = "Gobie.ClassGenAddId"/> to run. </summary>
    public sealed class ClassGenAddIdAttribute : global::Gobie.GobieClassGeneratorAttribute
    {
        public ClassGenAddIdAttribute()
        {
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Gobie ](/sources/Gobie.zip)

:::


### Share Gobie 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGobie&quote=Gobie" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGobie&text=Gobie:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGobie" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGobie&title=Gobie" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGobie&title=Gobie&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGobie" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Gobie

aaa
<SameCategory />

