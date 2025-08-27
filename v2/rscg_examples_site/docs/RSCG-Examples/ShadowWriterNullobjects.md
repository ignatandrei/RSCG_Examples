---
sidebar_position: 2110
title: 211 - ShadowWriterNullobjects
description: Generate null object for an class that implements an interface 
slug: /ShadowWriterNullobjects
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ShadowWriterNullobjects  by Stefan Stolz


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ShadowWriter?label=ShadowWriter)](https://www.nuget.org/packages/ShadowWriter/)
[![GitHub last commit](https://img.shields.io/github/last-commit/StefanStolz/ShadowWriter?label=updated)](https://github.com/StefanStolz/ShadowWriter)
![GitHub Repo stars](https://img.shields.io/github/stars/StefanStolz/ShadowWriter?style=social)

## Details

### Info
:::info

Name: **ShadowWriterNullobjects**

Leverage the capabilities of Roslyn source generators to help generate boilerplate code efficiently.

Author: Stefan Stolz

NuGet: 
*https://www.nuget.org/packages/ShadowWriter/*   


You can find more details at https://github.com/StefanStolz/ShadowWriter

Source: https://github.com/StefanStolz/ShadowWriter

:::

### Original Readme
:::note

# ShadowWriter

[![NuGet](https://img.shields.io/nuget/v/ShadowWriter.svg)](https://www.nuget.org/packages/ShadowWriter)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/StefanStolz/ShadowWriter/LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/StefanStolz/ShadowWriter/build.yml?branch=main)](https://github.com/StefanStolz/ShadowWriter/actions)

**ShadowWriter** is a Roslyn Source Generator designed to simplify and automate aspects of .NET development.  
It currently supports the following features:

## ✨ Features

Samples can be found in the [Source-Code](https://github.com/StefanStolz/ShadowWriter/tree/main/src/ShadowWriter.Sample) or in the [Wiki](https://github.com/StefanStolz/ShadowWriter/wiki).

### 1. Generate Null Objects
The NullObject feature in ShadowWriter provides a simple way to automatically generate null object implementations for interfaces and classes. This pattern is useful for providing default "do nothing" implementations that can help avoid null reference exceptions and simplify code.

#### Usage
To create a null object implementation, simply add the `[NullObject]` attribute to your class:

```csharp
[NullObject]
public partial class ImplementingMyInterface : IMyInterface
{
}
```

### 2. Inject Project Information
Embeds values from the project file (`*.csproj`) directly into your source code.  
This is useful for build metadata, version numbers, or project-specific configuration.

#### Available Properties
The generated `TheProject` class provides the following static properties:

| Property | Description | Example |
|----------|-------------|---------|
| `FullPath` | The complete path to the project file | `/path/to/YourProject.csproj` |
| `ProjectDirectory` | The directory containing the project file | `/path/to/` |
| `Name` | The name of the project | `YourProject` |
| `OutDir` | The output directory for compiled artifacts | `/path/to/artifacts/bin/YourProject/debug/` |
| `Version` | The current version of the project | `1.0.0` |
| `RootNamespace` | The root namespace of the project | `YourProject` |

#### Example Usage

```csharp
// Access project information anywhere in your code 
Console.WriteLine($"Project Name: {TheProject.Name}"); 
Console.WriteLine($"Project Version: {TheProject.Version}"); 
Console.WriteLine($"Project Output Directory: {TheProject.OutDir}");
```


### 3. Experimental: Typed Access to EmbeddedResources
Generates strongly typed wrappers for `EmbeddedResources`, allowing safe and convenient access to resources at runtime.

> ⚠️ Feature #3 is experimental and may change significantly in future versions.

Details can be found in the [Wiki](https://github.com/StefanStolz/ShadowWriter/wiki/ProjectFiles).

### 4. Generate Builders for Records

The **Builder** feature in ShadowWriter automatically generates builder classes for your `record` types. This significantly reduces boilerplate when constructing complex objects, especially with optional and nullable parameters or when you want to use a fluent API pattern for object creation.

#### Usage

To enable builder generation, simply annotate your partial `record` with the `[Builder]` attribute:

```csharp 
[Builder] 
public partial record WithBuilder(int Number);
```

The generator will create a corresponding builder class (e.g., `WithBuilder.Builder`) with mutable Properties for each Parameter.

#### Examples

A variety of record types are supported:

```csharp 
// Record with a single value type 
[Builder] 
public partial record WithBuilder(int Number);
```

The generated builder enables you to create instances using a clear, chainable API. For example:

```csharp
var builder = new WithBuilder.Builder();
builder.Number = 1;
var item = builder.Build();
```

## 📦 Installation

You can install ShadowWriter via NuGet:

```sh
dotnet package add ShadowWriter
```

## ⚙️ Usage
ShadowWriter runs automatically during compilation.
No manual setup is needed. Documentation and configuration options will be expanded in future versions.

## 📄 License
This project is licensed under the MIT License.


:::

### About
:::note

Generate null object for an class that implements an interface 


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ShadowWriterNullobjects**
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
	  <PackageReference Include="ShadowWriter" Version="0.9.8">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>

	</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\Program.cs" label="Program.cs" >

  This is the use of **ShadowWriterNullobjects** in *Program.cs*

```csharp showLineNumbers 
using NullInterface;

Console.WriteLine("Hello, World!");

Console.WriteLine("Hello, World!");
Department department = Department.Instance;
department.Name = "IT";
IEmployee employee = Employee.Instance;
employee.FirstName = "Andrei";
//employee.Department = department;
Console.WriteLine(employee.FirstName);
Console.WriteLine(employee.Department.Name);
Console.WriteLine(employee.GetFullNameAndDepartment(" - "));

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\Department.cs" label="Department.cs" >

  This is the use of **ShadowWriterNullobjects** in *Department.cs*

```csharp showLineNumbers 


namespace NullInterface;

[ShadowWriter.NullObject]
public partial class Department : IDepartment
{
}

public interface IDepartment
{
    public string Name { get; set; }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\Employee.cs" label="Employee.cs" >

  This is the use of **ShadowWriterNullobjects** in *Employee.cs*

```csharp showLineNumbers 
namespace NullInterface;


[ShadowWriter.NullObject]
public partial class Employee: IEmployee
{
    public IDepartment Department { get; set; } = NullInterface.Department.Instance;
}

public interface IEmployee
{
    public string FirstName { get; set; } 
    public string LastName { get; set; }
    public IDepartment Department { get; set; }
    public string GetFullName();
    public string GetFullNameAndDepartment(string separator);

}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\obj\GX\ShadowWriter\ShadowWriter.BuilderGenerator\BuilderAttribute.g.cs" label="BuilderAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;

namespace ShadowWriter
{
    [CompilerGenerated]
    [GeneratedCode("ShadowWriter", "0.9.8.0")]
    [System.AttributeUsage(AttributeTargets.Class)]
    internal sealed class BuilderAttribute : System.Attribute
    {

    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\obj\GX\ShadowWriter\ShadowWriter.NullObject.NullObjectGenerator\NullInterfaceDepartment.g.cs" label="NullInterfaceDepartment.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

// Generated by GenerateNullObjectInPartialClass

#nullable enable

namespace NullInterface;

[CompilerGenerated]
[GeneratedCode("ShadowWriter", "0.9.8.0")]
public sealed partial class Department
{
  private Department()
  {}

  public static NullInterface.Department Instance { get; } = new Department();

  public string Name
  {
  get => string.Empty;
  set => _ = value;
  }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\obj\GX\ShadowWriter\ShadowWriter.NullObject.NullObjectGenerator\NullInterfaceEmployee.g.cs" label="NullInterfaceEmployee.g.cs" >


```csharp showLineNumbers 
using System;
using System.Linq;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

// Generated by GenerateNullObjectInPartialClass

#nullable enable

namespace NullInterface;

[CompilerGenerated]
[GeneratedCode("ShadowWriter", "0.9.8.0")]
public sealed partial class Employee
{
  private Employee()
  {}

  public static NullInterface.Employee Instance { get; } = new Employee();

  public string FirstName
  {
  get => string.Empty;
  set => _ = value;
  }
  public string LastName
  {
  get => string.Empty;
  set => _ = value;
  }
  // GetFullName
  public string GetFullName()
  {
     return string.Empty;
  }
  // GetFullNameAndDepartment
  public string GetFullNameAndDepartment(string separator)
  {
     return string.Empty;
  }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\obj\GX\ShadowWriter\ShadowWriter.NullObject.NullObjectGenerator\NullObjectAttribute.g.cs" label="NullObjectAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;

namespace ShadowWriter
{
    [CompilerGenerated]
    [GeneratedCode("ShadowWriter", "0.9.8.0")]
    [System.AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
    internal sealed class NullObjectAttribute : System.Attribute
    {

    }

    [CompilerGenerated]
    [GeneratedCode("ShadowWriter", "0.9.8.0")]
    [System.AttributeUsage(System.AttributeTargets.Interface)]
    internal sealed class ClassNameAttribute : System.Attribute
    {
        public string Name { get; }

        public ClassNameAttribute(string name)
        {
            this.Name = name;
        }

        public ClassNameAttribute()
        {
            this.Name = string.Empty;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\obj\GX\ShadowWriter\ShadowWriter.ProjectInfoGenerator\ShadowWriter.TheProject.g.cs" label="ShadowWriter.TheProject.g.cs" >


```csharp showLineNumbers 
using System;
using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;

namespace ShadowWriter;

[CompilerGenerated]
[GeneratedCode("ShadowWriter", "0.9.8.0")]
internal static class TheProject
{
  public static string FullPath => @"D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface\NullInterface.csproj";
  public static string ProjectDirectory => @"D:\gth\RSCG_Examples\v2\rscg_examples\ShadowWriterNullobjects\src\NullInterface";
  public static string Name => @"NullInterface";
  public static string OutDir => @"C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\Roslyn\bin\Debug\net9.0\";
  public static string Version => @"1.0.0";
  public static string RootNamespace => @"NullInterface";
  public static DateTimeOffset BuildTimeUtc => new DateTimeOffset(638918269412724408, TimeSpan.Zero);
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ShadowWriterNullobjects ](/sources/ShadowWriterNullobjects.zip)

:::


### Share ShadowWriterNullobjects 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterNullobjects&quote=ShadowWriterNullobjects" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterNullobjects&text=ShadowWriterNullobjects:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterNullobjects" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterNullobjects&title=ShadowWriterNullobjects" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterNullobjects&title=ShadowWriterNullobjects&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FShadowWriterNullobjects" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ShadowWriterNullobjects

### In the same category (Interface) - 13 other generators


#### [AutoInterface](/docs/AutoInterface)


#### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


#### [CopyCat](/docs/CopyCat)


#### [Farskeptic.AutoCompose](/docs/Farskeptic.AutoCompose)


#### [MakeInterface.Generator](/docs/MakeInterface.Generator)


#### [Matryoshki](/docs/Matryoshki)


#### [Minerals.AutoInterfaces](/docs/Minerals.AutoInterfaces)


#### [NetAutomaticInterface](/docs/NetAutomaticInterface)


#### [ProxyGen](/docs/ProxyGen)


#### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


#### [RSCG_CompositeProvider](/docs/RSCG_CompositeProvider)


#### [rscg_Interface_to_null_object](/docs/rscg_Interface_to_null_object)


#### [RSCG_Static](/docs/RSCG_Static)

