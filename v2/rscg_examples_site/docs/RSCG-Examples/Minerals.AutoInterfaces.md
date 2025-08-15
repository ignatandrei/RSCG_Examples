---
sidebar_position: 1370
title: 137 - Minerals.AutoInterfaces
description: Generating interface from class
slug: /Minerals.AutoInterfaces
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Minerals.AutoInterfaces  by Szymon Hałucha


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Minerals.AutoInterfaces?label=Minerals.AutoInterfaces)](https://www.nuget.org/packages/Minerals.AutoInterfaces/)
[![GitHub last commit](https://img.shields.io/github/last-commit/SzymonHalucha/Minerals.AutoInterfaces?label=updated)](https://github.com/SzymonHalucha/Minerals.AutoInterfaces)
![GitHub Repo stars](https://img.shields.io/github/stars/SzymonHalucha/Minerals.AutoInterfaces?style=social)

## Details

### Info
:::info

Name: **Minerals.AutoInterfaces**

Package for automatic interface generation using incremental generator

Author: Szymon Hałucha

NuGet: 
*https://www.nuget.org/packages/Minerals.AutoInterfaces/*   


You can find more details at https://github.com/SzymonHalucha/Minerals.AutoInterfaces

Source: https://github.com/SzymonHalucha/Minerals.AutoInterfaces

:::

### Original Readme
:::note

# Minerals.AutoInterfaces

![GitHub License](https://img.shields.io/github/license/SzymonHalucha/Minerals.AutoInterfaces?style=for-the-badge&link=https%3A%2F%2Fgithub.com%2FSzymonHalucha%2FMinerals.AutoInterfaces%2F)
![NuGet Version](https://img.shields.io/nuget/v/Minerals.AutoInterfaces?style=for-the-badge&link=https%3A%2F%2Fwww.nuget.org%2Fpackages%2FMinerals.AutoInterfaces%2F)
![NuGet Downloads](https://img.shields.io/nuget/dt/Minerals.AutoInterfaces?style=for-the-badge&link=https%3A%2F%2Fwww.nuget.org%2Fpackages%2FMinerals.AutoInterfaces%2F)

This NuGet package provides a functionality to automatically generate interfaces for C# classes with a single attribute. This simplifies the creation of interfaces for classes with clearly defined public members, without having to manually write interface code.

## Features

- **Automatic interface generation:** Saves time and reduces the risk of errors when creating interfaces for classes.
- **Support for generic methods and constraints:** Allows for generating interfaces for complex classes with generic methods.
- **Support for custom getters and setters:** Generates interfaces for properties with custom getter and setter implementations.
- **Customizable interface name:** Allows you to name the interface according to naming conventions or user preferences.
- **Compatible with .NET Standard 2.0 and C# 7.3+:** Works on a wide range of platforms and development environments.

## Installation

Add the Minerals.AutoInterfaces nuget package to your C# project using the following methods:

### 1. Project file definition

```xml
<PackageReference Include="Minerals.AutoInterfaces" Version="0.1.*" />
```

### 2. dotnet command

```bat
dotnet add package Minerals.AutoInterfaces
```

## Usage

To use the package, add the ```[GenerateInterface]``` attribute to the selected class.

```csharp
namespace Examples
{
    [Minerals.AutoInterfaces.GenerateInterface]
    public class ExampleClass
    {
        public int Property1 { get; set; } = 1;
        public int Property2 { get; private set; } = 2;
        public int Property3
        {
            get { return _field1; }
            set { _field1 = value; }
        }

        private int _field1 = 0;

        public int Method1(int arg0, int arg1)
        {
            return arg0 + arg1;
        }

        public void Method2<T>(T arg0) where T : class, new()
        {
            return $"{arg0}";
        }

        protected void Method3() { }
    }
}
```

The code above will generate the ```IExampleClass.g.cs``` file with the ```IExampleClass``` interface.

```csharp
namespace Examples
{
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    public interface IExampleClass
    {
        int Property1 { get; set; }
        int Property2 { get; }
        int Property3 { get; set; }
        int Method1(int arg0, int arg1);
        string Method2<T>(T arg0) where T : class, new();
    }
}
```

### Package supports custom interface names

```csharp
namespace Examples
{
    [Minerals.AutoInterfaces.GenerateInterface("ExampleInterface")]
    public class ExampleClass
    {
        public int Property1 { get; protected set; } = 1;
    }
}
```

The code above will generate the ```ExampleInterface.g.cs``` file with the ```ExampleInterface``` interface.

```csharp
namespace Examples
{
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    public interface ExampleInterface
    {
        int Property1 { get; }
    }
}
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [branches on this repository](https://github.com/SzymonHalucha/Minerals.AutoInterfaces/branches).

## Authors

- **Szymon Hałucha** - Maintainer

See also the list of [contributors](https://github.com/SzymonHalucha/Minerals.AutoInterfaces/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/SzymonHalucha/Minerals.AutoInterfaces/LICENSE) file for details.


:::

### About
:::note

Generating interface from class


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Minerals.AutoInterfaces**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
	  <PackageReference Include="Minerals.AutoInterfaces" Version="0.1.5" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoInterfaces\src\Class2Interface\Program.cs" label="Program.cs" >

  This is the use of **Minerals.AutoInterfaces** in *Program.cs*

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoInterfaces\src\Class2Interface\Person.cs" label="Person.cs" >

  This is the use of **Minerals.AutoInterfaces** in *Person.cs*

```csharp showLineNumbers 
namespace Class2Interface;
[Minerals.AutoInterfaces.GenerateInterface("IPerson")]
public partial class Person:IPerson
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Name
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
    public string FullName()=>$"{FirstName} {LastName}";
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoInterfaces\src\Class2Interface\obj\GX\Minerals.AutoInterfaces\Minerals.AutoInterfaces.Attributes.GenerateInterfaceAttributeGenerator\GenerateInterfaceAttribute.g.cs" label="GenerateInterfaceAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This code was generated by a tool.
// Name: Minerals.AutoInterfaces
// Version: 0.1.5+54d6efe308ef06f041fc9b5d9285caeecef3e7c4
// </auto-generated>
#pragma warning disable CS9113
namespace Minerals.AutoInterfaces
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct, AllowMultiple = false, Inherited = false)]
    public sealed class GenerateInterfaceAttribute : global::System.Attribute
    {
        public GenerateInterfaceAttribute(string customName = "")
        {
        }
    }
}
#pragma warning restore CS9113
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoInterfaces\src\Class2Interface\obj\GX\Minerals.AutoInterfaces\Minerals.AutoInterfaces.GenerateInterfaceGenerator\IPerson.g.cs" label="IPerson.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This code was generated by a tool.
// Name: Minerals.AutoInterfaces
// Version: 0.1.5+54d6efe308ef06f041fc9b5d9285caeecef3e7c4
// </auto-generated>
namespace Class2Interface
{
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    public interface IPerson
    {
        int ID { get; set; }
        string? FirstName { get; set; }
        string? LastName { get; set; }
        string Name { get; }
        string FullName();
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project Minerals.AutoInterfaces ](/sources/Minerals.AutoInterfaces.zip)

:::


### Share Minerals.AutoInterfaces 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoInterfaces&quote=Minerals.AutoInterfaces" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoInterfaces&text=Minerals.AutoInterfaces:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoInterfaces" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoInterfaces&title=Minerals.AutoInterfaces" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoInterfaces&title=Minerals.AutoInterfaces&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoInterfaces" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Minerals.AutoInterfaces

### In the same category (Interface) - 11 other generators


#### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


#### [CopyCat](/docs/CopyCat)


#### [Farskeptic.AutoCompose](/docs/Farskeptic.AutoCompose)


#### [MakeInterface.Generator](/docs/MakeInterface.Generator)


#### [Matryoshki](/docs/Matryoshki)


#### [NetAutomaticInterface](/docs/NetAutomaticInterface)


#### [ProxyGen](/docs/ProxyGen)


#### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


#### [RSCG_CompositeProvider](/docs/RSCG_CompositeProvider)


#### [rscg_Interface_to_null_object](/docs/rscg_Interface_to_null_object)


#### [RSCG_Static](/docs/RSCG_Static)

