---
sidebar_position: 2030
title: 203 - Tortuga.Shipwright
description: Generate mixin between classes
slug: /Tortuga.Shipwright
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Tortuga.Shipwright  by Tortuga Research


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Tortuga.Shipwright?label=Tortuga.Shipwright)](https://www.nuget.org/packages/Tortuga.Shipwright/)
[![GitHub last commit](https://img.shields.io/github/last-commit/TortugaResearch/Tortuga.Shipwright?label=updated)](https://github.com/TortugaResearch/Tortuga.Shipwright)
![GitHub Repo stars](https://img.shields.io/github/stars/TortugaResearch/Tortuga.Shipwright?style=social)

## Details

### Info
:::info

Name: **Tortuga.Shipwright**

Package Description

Author: Tortuga Research

NuGet: 
*https://www.nuget.org/packages/Tortuga.Shipwright/*   


You can find more details at https://github.com/TortugaResearch/Tortuga.Shipwright

Source: https://github.com/TortugaResearch/Tortuga.Shipwright

:::

### Original Readme
:::note

# Tortuga Shipwright

## Installation


To register the Source Generator, add the following to your project file.

````xml
<!-- Code Generator -->
<ItemGroup>
	<PackageReference Include="Tortuga.Shipwright" Version="0.9.0" >
		<PrivateAssets>all</PrivateAssets>
	</PackageReference>
	<PackageReference Include="Tortuga.Shipwright.Shared" Version="0.9.0" />
</ItemGroup>

<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>

<ItemGroup>
	<!-- Don't include the output from a previous source generator execution into future runs; the */** trick here ensures that there's
at least one subdirectory, which is our key that it's coming from a source generator as opposed to something that is coming from
some other tool. -->
	<Compile Remove="$(CompilerGeneratedFilesOutputPath)/*/**/*.cs" />
</ItemGroup>
````

The `EmitCompilerGeneratedFiles` setting is not required, but it does make trouble-shooting easier. Check  `Show All Files" in Visual Studio to see the generated files.

## Trait Engine

### Terminology

* Trait: A set of methods and properties being injected into a container class.
* Container: The class that contains one or more traits.

### Basic Pattern

The trait needs no special decorations. However, it is advisable to mark it as `sealed` because inheritance is not supported with traits. 

Traits should be marked with the `Trait` attribute. (This is not currently enforced, but may be in future versions.)

Trait classes may be marked as `public` or, if in the same assembly, `internal`. 

The container class uses the `UseTrait` attribute and must be marked `partial`. For example:

````csharp
[UseTrait(typeof(MyTrait)]
public partial class MyContiner { ... }
````

### Exposing Members

For a method or property, add the `Expose` attribute to the member.

````csharp
[Expose] 
public int Add(int a, int b) {...}

[Expose] 
public int CustomerAge {get; set;}
````

The member being exposed must be visible to the container. This means `public` or, if in the same assembly, `internal`.

#### Non-public Members

To make a exposed member non-public in the container class, set the Accessibility property. For example,

````csharp
[Expose(Accessibility = Accessibility.Internal)]
public ICacheAdapter Cache { get; set; } = null!;
````


You may also set an inheritance rule such as `override`, `sealed`, or `virtual`.

````csharp
[Expose(Inheritance = Inheritance.Override)]
public ConcurrentDictionary<Type, object> ExtensionCache {get => m_ExtensionCache;}
````

#### Additional Attributes

The following attributes will be copied from an exposed trait member to the matching container member.

* EditorBrowsableAttribute
* ObsoleteAttribute

### Accessing the Container

To allow the trait to get a reference to it's container, use the `Container` attribute.


````csharp
[Container]
internal IDataSource DataSource { get; set; } = null!;
````

There is no limit to the number of `Container` properties in a trait. (Presumably each would request a different interface.)

If `RegisterInterface = true` is used, then the interface being requeted will be added to the container class. That class will still need to implement the interface.

### Callbacks into the container

In lieu of using a container property (see above), a trait can request a specific callback be created in the container.

Define the 'partial' property in the trait as a `Func` or `Action` delegate.

````csharp
[Partial("customerKey,startDate,endDate"] 
public Func<int, DateTime, DateTime, OrderCollection> OnGetOrdersByCustomer {get; set;} = null!;
````

In the container, the following will be generated.

````csharp
private partial OrderCollection OnGetOrdersByCustomer(int customerKey, DateTime startDate, DateTime endDate);
````


The container will then be responsible for implementing the partial method. 

### Automatically Implementing an Interface

If a trait implements an interface, then it's container will automatically implement it as well. All interface methods and properties will call back to the trait.

The container explicitly implements the interface. Use the `Expose` attribute on each member if you also want the methods to be marked as `public`.

Warning: Interfaces with `init` properties are not supported.

#### Additional Attributes

The following attributes will be copied from an exposed interface member to the matching container member.

* EditorBrowsableAttribute
* ObsoleteAttribute

### XML Docs

If the trait is in the same project as the container, XML Docs will be automatically included in the generated code.

This requires `DocumentationFile` to be enabled at the project level.

Shipwright does not currently support XML Docs on traits defined in a different project. (This appears to be a limitation of Roslyn.)





:::

### About
:::note

Generate mixin between classes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Tortuga.Shipwright**
```xml showLineNumbers {13}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>


	<!-- Code Generator -->
	<ItemGroup>
		<PackageReference Include="Tortuga.Shipwright" Version="0.9.0" >
			<PrivateAssets>all</PrivateAssets>
		</PackageReference>
		<PackageReference Include="Tortuga.Shipwright.Shared" Version="0.9.0" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
		<!-- Don't include the output from a previous source generator execution into future runs; the */** trick here ensures that there's
at least one subdirectory, which is our key that it's coming from a source generator as opposed to something that is coming from
some other tool. -->
		<Compile Remove="$(CompilerGeneratedFilesOutputPath)/*/**/*.cs" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Tortuga.Shipwright\src\MixinConsoleDemo\MixinConsoleDemo\Program.cs" label="Program.cs" >

  This is the use of **Tortuga.Shipwright** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using MixinConsoleDemo;

Console.WriteLine("Hello, World!");
Employee p = new Employee();
p.Name="Andrei Ignat";
p.Age = 55;
p.Salary = 1000;
Console.WriteLine($"Name: {p.Name}, Age: {p.Age}, Salary: {p.Salary}");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Tortuga.Shipwright\src\MixinConsoleDemo\MixinConsoleDemo\Person.cs" label="Person.cs" >

  This is the use of **Tortuga.Shipwright** in *Person.cs*

```csharp showLineNumbers 
using Tortuga.Shipwright;

namespace MixinConsoleDemo;
internal class Person
{
    [Expose]
    public string Name { get; set; } = string.Empty;
    [Expose] 
    public int Age { get; set; }
    
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Tortuga.Shipwright\src\MixinConsoleDemo\MixinConsoleDemo\Employee.cs" label="Employee.cs" >

  This is the use of **Tortuga.Shipwright** in *Employee.cs*

```csharp showLineNumbers 
using Tortuga.Shipwright;

namespace MixinConsoleDemo;
[UseTrait(typeof(Person))]
internal partial class Employee
{
    public decimal Salary { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Tortuga.Shipwright\src\MixinConsoleDemo\MixinConsoleDemo\GX\Tortuga.Shipwright\Tortuga.Shipwright.TraitGenerator\Logs.cs" label="Logs.cs" >


```csharp showLineNumbers 
/*
Container class: MixinConsoleDemo.Employee
	Adding trait: MixinConsoleDemo.Person
*/
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Tortuga.Shipwright\src\MixinConsoleDemo\MixinConsoleDemo\GX\Tortuga.Shipwright\Tortuga.Shipwright.TraitGenerator\MixinConsoleDemo.Employee.cs" label="MixinConsoleDemo.Employee.cs" >


```csharp showLineNumbers 
//This file was generated by Tortuga Shipwright

namespace MixinConsoleDemo
{
	partial class Employee
	{

		// These fields and/or properties hold the traits. They should not be referenced directly.
		private MixinConsoleDemo.Person __Trait0 = new();

		// Exposing trait MixinConsoleDemo.Person

		
		public   System.Int32 Age
		{
			get => __Trait0.Age;
			set => __Trait0.Age = value;
		}
		
		public   System.String Name
		{
			get => __Trait0.Name;
			set => __Trait0.Name = value;
		}
	}
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Tortuga.Shipwright ](/sources/Tortuga.Shipwright.zip)

:::


### Share Tortuga.Shipwright 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTortuga.Shipwright&quote=Tortuga.Shipwright" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTortuga.Shipwright&text=Tortuga.Shipwright:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTortuga.Shipwright" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTortuga.Shipwright&title=Tortuga.Shipwright" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTortuga.Shipwright&title=Tortuga.Shipwright&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTortuga.Shipwright" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Tortuga.Shipwright

### In the same category (Templating) - 13 other generators


#### [Gobie](/docs/Gobie)


#### [InlineComposition](/docs/InlineComposition)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [JKToolKit.TemplatePropertyGenerator](/docs/JKToolKit.TemplatePropertyGenerator)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [NTypewriter](/docs/NTypewriter)


#### [RazorBlade](/docs/RazorBlade)


#### [RazorSlices](/docs/RazorSlices)


#### [RSCG_IFormattable](/docs/RSCG_IFormattable)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

