---
sidebar_position: 840
title: 84 - Biwen.AutoClassGen
description: Generating properties  from interface to class.
slug: /Biwen.AutoClassGen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Biwen.AutoClassGen  by vipwan


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/Biwen.AutoClassGen?label=Biwen.AutoClassGen)](https://www.nuget.org/packages/Biwen.AutoClassGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/vipwan/Biwen.AutoClassGen?label=updated)](https://github.com/vipwan/Biwen.AutoClassGen)
![GitHub Repo stars](https://img.shields.io/github/stars/vipwan/Biwen.AutoClassGen?style=social)

## Details

### Info
:::info

Name: **Biwen.AutoClassGen**

Biwen.AutoClassGen, CodeGEN

Author: vipwan

NuGet: 
*https://www.nuget.org/packages/Biwen.AutoClassGen/*   


You can find more details at https://github.com/vipwan/Biwen.AutoClassGen

Source : https://github.com/vipwan/Biwen.AutoClassGen

:::

### Original Readme
:::note

# Biwen.AutoClassGen

#### Usage scenario

- In many cases, we will have a lot of request objects,
such as GetIdRequest, GetUserRequest, etc..., and these requests may have a large number of the same fields.
For example, the multi-tenant Id, the number of pages, and these attribute fields may have validation rules, binding rules, and Swagger descriptions.
If all this code needs to be written, it will add a lot of work, so Biwen.AutoClassGen came into being to solve this pain point...
- In many cases, we will have a lot of DTO objects,
- AOP & Decorator



[中文](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/README-zh.md)

### Usage

```bash
dotnet add package Biwen.AutoClassGen.Attributes
```

- [Gen DTO Usage doc](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/Gen-Dto.md)
- [Gen Request Usage doc](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/Gen-request.md)
- [Gen Decoration Usage doc](https://github.com/vipwan/Biwen.AutoClassGen/blob/master/Gen-Decor.md)

### Used by
#### if you use this library, please tell me, I will add your project here.
- [Biwen.QuickApi](https://github.com/vipwan/Biwen.QuickApi)


:::

### About
:::note

Generating properties  from interface to class.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Biwen.AutoClassGen**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Biwen.AutoClassGen" Version="1.0.0.6" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
    <PackageReference Include="Biwen.AutoClassGen.Attributes" Version="1.0.0" />
	  
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Biwen.AutoClassGen\src\FromInterface\Program.cs" label="Program.cs" >

  This is the use of **Biwen.AutoClassGen** in *Program.cs*

```csharp showLineNumbers 
using FromInterface;

Console.WriteLine("Hello, World!");
Person p = new();
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine(p.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Biwen.AutoClassGen\src\FromInterface\Person.cs" label="Person.cs" >

  This is the use of **Biwen.AutoClassGen** in *Person.cs*

```csharp showLineNumbers 
namespace FromInterface;
public partial class Person //: IPerson
{
   public string FullName() { return FirstName + " " + LastName; }

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Biwen.AutoClassGen\src\FromInterface\IPerson.cs" label="IPerson.cs" >

  This is the use of **Biwen.AutoClassGen** in *IPerson.cs*

```csharp showLineNumbers 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace FromInterface;
public interface IPerson
{
    
    [StringLength(100), Description("person first name")]
    string FirstName { get; set; }
    string LastName { get; set; }

    public string FullName();

}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Biwen.AutoClassGen\src\FromInterface\IPerson2.cs" label="IPerson2.cs" >

  This is the use of **Biwen.AutoClassGen** in *IPerson2.cs*

```csharp showLineNumbers 
using Biwen.AutoClassGen.Attributes;

namespace FromInterface;

[AutoGen("Person", "FromInterface")]
public interface IPerson2: IPerson
{

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Biwen.AutoClassGen\src\FromInterface\obj\GX\Biwen.AutoClassGen\Biwen.AutoClassGen.SourceGenerator\Biwen.AutoClassGen.Person.IPerson2.g.cs" label="Biwen.AutoClassGen.Person.IPerson2.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
// author:vipwan@outlook.com 万雅虎
// issue:https://github.com/vipwan/Biwen.AutoClassGen/issues
// 如果你在使用中遇到问题,请第一时间issue,谢谢!
// This file is generated by Biwen.AutoClassGen.SourceGenerator
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using FromInterface;

#pragma warning disable
namespace FromInterface
{
    public partial class Person : IPerson2
    {
        /// <inheritdoc cref = "IPerson.FirstName"/>
        [System.ComponentModel.DataAnnotations.StringLengthAttribute(100)]
        [System.ComponentModel.DescriptionAttribute("person first name")]
        public string FirstName { get; set; }
        /// <inheritdoc cref = "IPerson.LastName"/>
        public string LastName { get; set; }
    }
}
#pragma warning restore

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Biwen.AutoClassGen ](/sources/Biwen.AutoClassGen.zip)

:::


### Share Biwen.AutoClassGen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBiwen.AutoClassGen&quote=Biwen.AutoClassGen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBiwen.AutoClassGen&text=Biwen.AutoClassGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBiwen.AutoClassGen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBiwen.AutoClassGen&title=Biwen.AutoClassGen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBiwen.AutoClassGen&title=Biwen.AutoClassGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBiwen.AutoClassGen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Biwen.AutoClassGen

## In the same category (EnhancementInterface)


### [CopyCat](/docs/CopyCat)


### [Matryoshki](/docs/Matryoshki)


### [ProxyGen](/docs/ProxyGen)


### [RSCG_Static](/docs/RSCG_Static)

