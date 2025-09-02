---
sidebar_position: 2260
title: 226 - requiredenum
description: Raise an error at compile time if not have switch handle case all enums values 
slug: /requiredenum
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# requiredenum  by Yaroslav


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/requiredenum?label=requiredenum)](https://www.nuget.org/packages/requiredenum/)
[![GitHub last commit](https://img.shields.io/github/last-commit/emptycoder/RequiredEnum?label=updated)](https://github.com/emptycoder/RequiredEnum)
![GitHub Repo stars](https://img.shields.io/github/stars/emptycoder/RequiredEnum?style=social)

## Details

### Info
:::info

Name: **requiredenum**

RequiredEnum is an open-source analyzer that helps handle all enum values for switch.

Author: Yaroslav

NuGet: 
*https://www.nuget.org/packages/requiredenum/*   


You can find more details at https://github.com/emptycoder/RequiredEnum

Source: https://github.com/emptycoder/RequiredEnum

:::

### Author
:::note
Yaroslav 
![Alt text](https://github.com/emptycoder.png)
:::

### Original Readme
:::note

<h1 align="center">RequiredEnum</h1>

RequiredEnum is an open-source analyzer that helps handle all enum values for switch.

# Installation

[NuGet](https://www.nuget.org/packages/RequiredEnum/): `dotnet add package requiredenum`

# Usage

Just add 'Required' prefix for any name of enum in your project and you will get the error when one of cases weren't handle in a switch statement.

```csharp
var test = (RequiredNumbers) Random.Shared.Next(0, Enum.GetNames(typeof(RequiredNumbers)).Length);
switch (test)
{
    case RequiredNumbers.Zero:
        break;
    case RequiredNumbers.One:
        break;
    default:
        throw new ArgumentOutOfRangeException();
}

internal enum RequiredNumbers
{
    Zero,
    One,
    Two
}
```
This code will throw the error ('Two' case wasn't handle) and it can't be compiled.

# License

RequiredEnum distributed under [MIT](https://github.com/emptycoder/RequiredEnum/LICENSE) license.


:::

### About
:::note

Raise an error at compile time if not have switch handle case all enums values 


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **requiredenum**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

  <ItemGroup>
    <PackageReference Include="RequiredEnum" Version="0.0.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\requiredenum\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **requiredenum** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
RequiredCarTypes myCar = RequiredCarTypes.Tesla;
switch(myCar)
{
    //comment any case to see the error in action
    case RequiredCarTypes.None:
        Console.WriteLine("No car");
        break;
    case RequiredCarTypes.Dacia:
        Console.WriteLine("Dacia");
        break;
    case RequiredCarTypes.Tesla:
        Console.WriteLine("Tesla");
        break;
    case RequiredCarTypes.BMW:
        Console.WriteLine("BMW");
        break;
    case RequiredCarTypes.Mercedes:
        Console.WriteLine("Mercedes");
        break;
    default:
        Console.WriteLine("Unknown car");
        break;
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\requiredenum\src\EnumDemo\RequiredCarTypes.cs" label="RequiredCarTypes.cs" >

  This is the use of **requiredenum** in *RequiredCarTypes.cs*

```csharp showLineNumbers 

namespace EnumDemo;
public enum RequiredCarTypes
{
    None,
    Dacia ,
    Tesla ,
    BMW ,
    Mercedes ,
}

```
  </TabItem>

</Tabs>

### Generated Files
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project requiredenum ](/sources/requiredenum.zip)

:::


### Share requiredenum 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frequiredenum&quote=requiredenum" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frequiredenum&text=requiredenum:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frequiredenum" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frequiredenum&title=requiredenum" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frequiredenum&title=requiredenum&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frequiredenum" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/requiredenum

<SameCategory />

