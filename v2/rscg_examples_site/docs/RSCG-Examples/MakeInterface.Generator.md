---
sidebar_position: 990
title: 99 - MakeInterface.Generator
description: Generating interface from class definition
slug: /MakeInterface.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# MakeInterface.Generator  by Frederik


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/MakeInterface.Generator?label=MakeInterface.Generator)](https://www.nuget.org/packages/MakeInterface.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Frederik91/MakeInterface?label=updated)](https://github.com/Frederik91/MakeInterface)
![GitHub Repo stars](https://img.shields.io/github/stars/Frederik91/MakeInterface?style=social)

## Details

### Info
:::info

Name: **MakeInterface.Generator**

Generates interfaces for classes

Author: Frederik

NuGet: 
*https://www.nuget.org/packages/MakeInterface.Generator/*   


You can find more details at https://github.com/Frederik91/MakeInterface

Source : https://github.com/Frederik91/MakeInterface

:::

### Original Readme
:::note

# MakeInterface
Creates an interface of a class using source generator

[![.NET](https://github.com/Frederik91/MakeInterface/actions/workflows/dotnet.yml/badge.svg)](https://github.com/Frederik91/MakeInterface/actions/workflows/dotnet.yml)

## Usage
Add the attribute to the class you want to generate the interface for
```csharp
[GenerateInterface]
public class MyClass
{
	public string MyProperty { get; set; }
	public void MyMethod() { }
}
```

The generated interface will then be generated as IMyClass.g.cs
```csharp
public interface IMyClass
{
	string MyProperty { get; set; }
	void MyMethod();
}
```

You can then implement the interface in your class
```csharp
public class MyClass : IMyClass
{
	public string MyProperty { get; set; }
	public void MyMethod() { }
}
```

## Installation
Install the NuGet package [MakeInterface](https://www.nuget.org/packages/MakeInterface.Generator/)

You can either create the attribute yourself or use the one provided in the package [MakeInterface.Contracts](https://www.nuget.org/packages/MakeInterface.Contracts/)


## License
MIT

:::

### About
:::note

Generating interface from class definition


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MakeInterface.Generator**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MakeInterface.Contracts" Version="0.4.0" />
    <PackageReference Include="MakeInterface.Generator" Version="0.4.0" OutputItemType="Analyzer" >
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MakeInterface\src\Class2Interface\Program.cs" label="Program.cs" >

  This is the use of **MakeInterface.Generator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using Class2Interface;

Console.WriteLine("Hello, World!");
IPerson person=new Person();
person.FirstName="Andrei";
person.LastName="Ignat";
Console.WriteLine(person.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MakeInterface\src\Class2Interface\Person.cs" label="Person.cs" >

  This is the use of **MakeInterface.Generator** in *Person.cs*

```csharp showLineNumbers 
using MakeInterface.Contracts.Attributes;

namespace Class2Interface;
[GenerateInterface]
internal class Person:IPerson
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Name
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MakeInterface\src\Class2Interface\obj\GX\MakeInterface.Generator\MakeInterface.Generator.InterfaceGenerator\IPerson.g.cs" label="IPerson.g.cs" >


```csharp showLineNumbers 
using MakeInterface.Contracts.Attributes;

// <auto-generated/>
#pragma warning disable
#nullable enable
namespace Class2Interface;
public partial interface IPerson
{
    int ID { get; set; }

    string FirstName { get; set; }

    string LastName { get; set; }

    string Name { get; }

    string FullName();
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project MakeInterface.Generator ](/sources/MakeInterface.Generator.zip)

:::


### Share MakeInterface.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMakeInterface.Generator&quote=MakeInterface.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMakeInterface.Generator&text=MakeInterface.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMakeInterface.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMakeInterface.Generator&title=MakeInterface.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMakeInterface.Generator&title=MakeInterface.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMakeInterface.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MakeInterface.Generator

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [AspectGenerator](/docs/AspectGenerator)


### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


### [BuilderGenerator](/docs/BuilderGenerator)


### [CopyCat](/docs/CopyCat)


### [DudNet](/docs/DudNet)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [HsuSgSync](/docs/HsuSgSync)


### [Immutype](/docs/Immutype)


### [Ling.Audit](/docs/Ling.Audit)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Decorator](/docs/RSCG_Decorator)


### [RSCG_Static](/docs/RSCG_Static)


### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


### [StaticReflection](/docs/StaticReflection)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


### [TelemetryLogging](/docs/TelemetryLogging)
