---
sidebar_position: 560
title: 56 - Roozie.AutoInterface
description: Generating interfaces from project
slug: /Roozie.AutoInterface
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Roozie.AutoInterface  by Alex Russak


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Roozie.AutoInterface?label=Roozie.AutoInterface)](https://www.nuget.org/packages/Roozie.AutoInterface/)
[![GitHub last commit](https://img.shields.io/github/last-commit/AlexRussak/Roozie.AutoInterface?label=updated)](https://github.com/AlexRussak/Roozie.AutoInterface)
![GitHub Repo stars](https://img.shields.io/github/stars/AlexRussak/Roozie.AutoInterface?style=social)

## Details

### Info
:::info

Name: **Roozie.AutoInterface**

C# source generator to generate an interface for a class

Author: Alex Russak

NuGet: 
*https://www.nuget.org/packages/Roozie.AutoInterface/*   


You can find more details at https://github.com/AlexRussak/Roozie.AutoInterface

Source : https://github.com/AlexRussak/Roozie.AutoInterface

:::

### Original Readme
:::note

# Roozie.AutoInterface

[![NuGet Version](https://img.shields.io/nuget/vpre/Roozie.AutoInterface)](https://www.nuget.org/packages/Roozie.AutoInterface)
[![NuGet](https://img.shields.io/nuget/dt/Roozie.AutoInterface.svg)](https://www.nuget.org/packages/Roozie.AutoInterface)

# What is it?

Roozie.AutoInterface is a C# source generator that generates an interface for a class. The generated interface contains
the XML-doc comments, public properties, and public methods.

# Why?

Interfaces are great for keeping your code loosely coupled and unit testable. But, they add some maintenance overhead.
This source generator will keep your interfaces up to date.

# How to use it?

1. Add the NuGet package to your project.

   `dotnet add package Roozie.AutoInterface --prerelease`

2. Create a class where you want to generate an interface.

```csharp
public class MyClass
{
    public string MyProperty { get; set; }

    public void MyMethod()
    {
        // Do something
    }
}
```

3. Add the `[AutoInterface]` attribute to the class.
4. An interface will be generated in the same namespace as the class.

You can now use the generated interface in your code.
If the class is `partial`, the interface will be automatically implemented.

Check out the tests  for examples.

## Configuration

You can configure the generator in the `[AutoInterface]` attribute. The following options are available:

| Option             | Default Value    | Description                                                                                                                                                      |
|--------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name               | "I" + Class name | Set the interface to whatever name you want.                                                                                                                     |
| IncludeMethods     | `true`           | Set to `false`, the generator will automatically include methods in the interface. You can mark a method as included by adding the `[AddToInterface]` attribute. |
| IncludeProperties  | `true`           | Same as IncludeMethods                                                                                                                                           |
| ImplementOnPartial | `true`           | When true, the interface will be automatically implemented if the class is marked as partial.                                                                    |

# Contributing

Please open an issue if you find a bug or have a feature request. If you'd like to contribute, please open a pull
request.

# Kudos

Andrew Lock's [Source Generator series](https://andrewlock.net/series/creating-a-source-generator/) is an excellent
resource for learning all aspects of source generators.


:::

### About
:::note

Generating interfaces from project


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Roozie.AutoInterface**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Roozie.AutoInterface" Version="0.6.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Roozie.AutoInterface\src\Roozie.AutoInterfaceDemo\Program.cs" label="Program.cs" >

  This is the use of **Roozie.AutoInterface** in *Program.cs*

```csharp showLineNumbers 
using Roozie.AutoInterfaceDemo;

IPerson p = new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine(p.FullName() );
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Roozie.AutoInterface\src\Roozie.AutoInterfaceDemo\Person.cs" label="Person.cs" >

  This is the use of **Roozie.AutoInterface** in *Person.cs*

```csharp showLineNumbers 
using Roozie.AutoInterface;

namespace Roozie.AutoInterfaceDemo;

[AutoInterface(IncludeMethods =true,IncludeProperties =true)]
public partial class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return FirstName + " " + LastName;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Roozie.AutoInterface\src\Roozie.AutoInterfaceDemo\obj\GX\Roozie.AutoInterface\Roozie.AutoInterface.Generator\IPerson.g.cs" label="IPerson.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This file was generated by Roozie.AutoInterface v0.6.1.0
// </auto-generated>

using Roozie.AutoInterface;

namespace Roozie.AutoInterfaceDemo;

#nullable enable

public partial class Person : IPerson {}

public partial interface IPerson
{
    int ID { get; set; }

    string? FirstName { get; set; }

    string? LastName { get; set; }

    string FullName();
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Roozie.AutoInterface ](/sources/Roozie.AutoInterface.zip)

:::


### Share Roozie.AutoInterface 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRoozie.AutoInterface&quote=Roozie.AutoInterface" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRoozie.AutoInterface&text=Roozie.AutoInterface:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRoozie.AutoInterface" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRoozie.AutoInterface&title=Roozie.AutoInterface" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRoozie.AutoInterface&title=Roozie.AutoInterface&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRoozie.AutoInterface" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Roozie.AutoInterface

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


### [BuilderGenerator](/docs/BuilderGenerator)


### [DudNet](/docs/DudNet)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Ling.Audit](/docs/Ling.Audit)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [RSCG_Decorator](/docs/RSCG_Decorator)


### [RSCG_Static](/docs/RSCG_Static)


### [StaticReflection](/docs/StaticReflection)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


### [TelemetryLogging](/docs/TelemetryLogging)

