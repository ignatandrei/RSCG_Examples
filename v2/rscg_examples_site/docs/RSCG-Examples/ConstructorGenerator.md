---
sidebar_position: 1790
title: 179 - ConstructorGenerator
description: Generate constructor for classes
slug: /ConstructorGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ConstructorGenerator  by Swarley97


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/ConstructorGenerator?label=ConstructorGenerator)](https://www.nuget.org/packages/ConstructorGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Swarley97/ConstructorGenerator?label=updated)](https://github.com/Swarley97/ConstructorGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Swarley97/ConstructorGenerator?style=social)

## Details

### Info
:::info

Name: **ConstructorGenerator**

Generates constructors for you.

Author: Swarley97

NuGet: 
*https://www.nuget.org/packages/ConstructorGenerator/*   


You can find more details at https://github.com/Swarley97/ConstructorGenerator

Source : https://github.com/Swarley97/ConstructorGenerator

:::

### Original Readme
:::note

[![NuGet](https://img.shields.io/nuget/v/ConstructorGenerator.svg)](https://www.nuget.org/packages/ConstructorGenerator/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/k94ll13nn3/AutoConstructor/main/LICENSE)
![main_workflow](https://github.com/Swarley97/ConstructorGenerator/actions/workflows/main.yml/badge.svg)

# ConstructorGenerator

ConstructorGenerator is a C# source generator which generates constructors for you.

## Installation

Install the [ConstructorGenerator NuGet package](https://www.nuget.org/packages/ConstructorGenerator/).

### Package Manager Console

```powershell
Install-Package ConstructorGenerator
```

### .NET CLI

```bash
dotnet add package ConstructorGenerator
```

## Getting started

### Prerequisites

ConstructorGenerator requires C# 9.0 or later.

### Usage

Add the `[GenerateFullConstructor]` attribute to your class or struct and a constructor will be generated.

```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:
    
```csharp
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}
```
### Rules

Only for the following members a constructor parameter will be generated
- Read only fields with no initializer
- Get only Properties or init only properties with no initializer 
- Properties or fields with the `[ConstructorDependency]` attribute (this override the rules above)

**Examples**
```csharp
// ignored
private readonly IDependency _dependency = new Dependency();
```
```csharp
// not-ignored
private readonly IDependency _dependency;
```
```csharp
// not-ignored
[ConstructorDependency]
private readonly IDependency _dependency = new Dependency();
```

```csharp
// ignored
private readonly IDependency _dependency { get; } = new Dependency();
```
```csharp
// ignored
private readonly IDependency _dependency { get; set; }
```
```csharp
// not-ignored
private readonly IDependency _dependency { get; init; }
```
```csharp
// not-ignored
[ConstructorDependency]
private readonly IDependency _dependency { get; set; }
```

### Ignoring properties and fields

You can ignore properties and fields by adding the `[ExcludeConstructorDependency]` attribute to them.

```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    
    [ExcludeConstructorDependency]
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp
public MyClass(ILogger logger, IDependencyA dependency)
{
    _logger = logger;
    _dependency = dependency;
}
```

### Explicitly specifying properties and fields

You can explicitly specify the properties and fields which should be included in the generated constructor by adding the `[ConstructorDependency]` attribute to them.
This can be useful for the following cases: 
- If you do not want to use the `[GenerateFullConstructor]` attribute on the class or struct
- If you want to add additional constructor dependencies which are not included by default (see [Rules](#rules)) 
- If you want to specify it as optional parameter (see [Optional parameters](#optional-parameters))

```csharp
public partial class MyClass
{
    [ConstructorDependency]
    private readonly ILogger _logger = new NullLogger();
    
    [ConstructorDependency]
    private readonly IDependencyA _dependency;
    
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp
public MyClass(ILogger logger, IDependencyA dependency)
{
    _logger = logger;
    _dependency = dependency;
}
```

### Inheritance

ConstructorGenerator supports inheritance. You can put the `[GenerateFullConstructor]` attribute on a derived class.

```csharp

[GenerateFullConstructor]
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}

[GenerateFullConstructor]
public partial class MyDerivedClass : MyClass
{
    public IDependencyC DependencyC { get; }
}
```

The generated constructor will look like this:

```csharp
public MyDerivedClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB, IDependencyC dependencyC)
    : base(logger, dependency, dependencyB)
{
    DependencyC = dependencyC;
}
```

Or, if you just want to generate the base constructor call (for example because your derived class have no constructor dependencies), 
you can put the `[GenerateBaseConstructorCall]` attribute on the derived class.
    
```csharp

// constructor of MyClass
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}

[GenerateBaseConstructorCall]
public partial class MyDerivedClass : MyClass
{

}
```

The generated constructor will look like this:

```csharp
public MyDerivedClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
    : base(logger, dependency, dependencyB)
{
}
```

> **Note**: It doesn't matter whether the base class constructor is also generated by the ConstructorGenerator or manually defined in the code. In either case, the constructor call will be generated.

### Optional parameters

```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    [ConstructorDependency(IsOptional = true)]
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB = null)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}
```

### Execute code in the generated constructor

To execute code in the constructor (like attaching events or something like this) you can implement the partial method `OnConstructing` which will be called after all fields and properties has been set.
```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    private readonly IDependencyB _dependencyB;
    
    partial void OnConstructing()
    {
        // do constructor stuff
        _logger.Log("Constructor called");
    }
}
```

### Constructor accessibility

ConstructorGenerator supports specifying the accessibility of the generated constructor. You can put the `[ConstructorAccessibility]` attribute on a class or struct and the constructor will be generated with the specified accessibility.

```csharp
[GenerateFullConstructor]
[ConstructorAccessibility(Accessibility.Internal)]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp

internal MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}
```

## License

ConstructorGenerator is licensed under the [MIT license](https://github.com/Swarley97/ConstructorGenerator/LICENSE).

:::

### About
:::note

Generate constructor for classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ConstructorGenerator**
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
	  <PackageReference Include="ConstructorGenerator" Version="1.0.2" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ConstructorGenerator\src\ConstructorDemo\Program.cs" label="Program.cs" >

  This is the use of **ConstructorGenerator** in *Program.cs*

```csharp showLineNumbers 
using QuickConstructorDemo;

var p = new Person("Andrei", "Ignat");

Console.WriteLine(p.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ConstructorGenerator\src\ConstructorDemo\Person.cs" label="Person.cs" >

  This is the use of **ConstructorGenerator** in *Person.cs*

```csharp showLineNumbers 
using ConstructorGenerator.Attributes;

namespace QuickConstructorDemo;

[GenerateFullConstructor]
internal partial class Person
{
    [ConstructorDependency]
    private readonly string FirstName="";

    private readonly string? LastName;
    
    public string FullName() => $"{FirstName} {LastName}";
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ConstructorGenerator\src\ConstructorDemo\obj\GX\ConstructorGenerator\ConstructorGenerator.ConstructorGenerator\QuickConstructorDemo.Person_ConstructorGenerator.g.cs" label="QuickConstructorDemo.Person_ConstructorGenerator.g.cs" >


```csharp showLineNumbers 
namespace QuickConstructorDemo
{
	internal partial class Person 
	{
		public Person(string firstName, string lastName) 
		{ 
			FirstName = firstName;
			LastName = lastName; 
			OnConstructing();
		}
		partial void OnConstructing();
	}
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project ConstructorGenerator ](/sources/ConstructorGenerator.zip)

:::


### Share ConstructorGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FConstructorGenerator&quote=ConstructorGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FConstructorGenerator&text=ConstructorGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FConstructorGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FConstructorGenerator&title=ConstructorGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FConstructorGenerator&title=ConstructorGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FConstructorGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ConstructorGenerator

### In the same category (Constructor) - 6 other generators


#### [AutoConstructor](/docs/AutoConstructor)


#### [AutoCtor](/docs/AutoCtor)


#### [AutoDeconstruct](/docs/AutoDeconstruct)


#### [PrimaryParameter](/docs/PrimaryParameter)


#### [QuickConstructor](/docs/QuickConstructor)


#### [sourcedepend](/docs/sourcedepend)

