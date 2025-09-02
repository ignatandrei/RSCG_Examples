---
sidebar_position: 2230
title: 223 - JinShil.MixinSourceGenerator
description: Generate mixins of classes
slug: /JinShil.MixinSourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMixin.mdx';

# JinShil.MixinSourceGenerator  by Jin Shil


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/JinShil.MixinSourceGenerator?label=JinShil.MixinSourceGenerator)](https://www.nuget.org/packages/JinShil.MixinSourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/JinShil/JinShil.MixinSourceGenerator?label=updated)](https://github.com/JinShil/JinShil.MixinSourceGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/JinShil/JinShil.MixinSourceGenerator?style=social)

## Details

### Info
:::info

Name: **JinShil.MixinSourceGenerator**

A C# source generator for composing classes or structs from other classes or structs using mixins.

Author: Jin Shil

NuGet: 
*https://www.nuget.org/packages/JinShil.MixinSourceGenerator/*   


You can find more details at https://github.com/JinShil/JinShil.MixinSourceGenerator

Source: https://github.com/JinShil/JinShil.MixinSourceGenerator

:::

### Author
:::note
Jin Shil 
![Alt text](https://github.com/JinShil.png)
:::

### Original Readme
:::note

# JinShil.MixinSourceGenerator

[![NuGet Version](https://img.shields.io/nuget/v/JinShil.MixinSourceGenerator?style=flat-square&logo=nuget)](https://www.nuget.org/packages/JinShil.MixinSourceGenerator)

This is a very simple, but powerful C# source generator that simplifies class and struct composition through the use of mixins.

It dramatically increases code reuse by copying members, including attributes and XML comments, verbatim from one or more implementation types to another type.  The resulting type becomes a composition of the implementation types without employing inheritance, extensions, default interface methods, or any other specialized language feature.

It simply copies and pastes members from one or more types into another.

## Example

The following example demonstrates how to use this source generator to compose a class from two implementation classes.

1. Apply one or more `[Mixin(typeof(TypeToMixIn))]` attributes to a partial class or struct, specifying the types to mix in.
2. The source generator scans for the specified types and copies their members, including attributes and XML comments, verbatim into the attributed type.


### Source Code

```C#
internal class Implementation1
{
    /// <summary>
    /// Summary for Property1
    /// </summary>
    [SomeAttribute]
    public int Property1 \{ get; }

    /// <summary>
    /// Summary for Method1
    /// </summary>
    [SomeAttribute]
    public void Method1()
    {
        Console.WriteLine("Running Method 1");
    }
}
```

```C#
internal class Implementation2
{
    /// <summary>
    /// Summary for Property2
    /// </summary>
    [SomeAttribute]
    public int Property2 \{ get; }

    /// <summary>
    /// Summary for Method2
    /// </summary>
    [SomeAttribute]
    public void Method2()
    {
        Console.WriteLine("Running Method 2");
    }
}
```

```C#
[Mixin(typeof(Implementation1))]
[Mixin(typeof(Implementation2))]
public partial class Composition : SomeBaseClass, ISomeInterface
{
}
```
### Generated Code
The above code will result in the following generated code, a composition of `Implementation1` and `Implementation2`.

```C#
[Mixin(typeof(Implementation1))]
[Mixin(typeof(Implementation2))]
public partial class Composition : SomeBaseClass, ISomeInterface
{
     /// <summary>
    /// Summary for Property1
    /// </summary>
    [SomeAttribute]
    public int Property1 \{ get; }

    /// <summary>
    /// Summary for Method1
    /// </summary>
    [SomeAttribute]
    public void Method1()
    {
        Console.WriteLine("Running Method 1");
    }

    /// <summary>
    /// Summary for Property2
    /// </summary>
    [SomeAttribute]
    public int Property2 \{ get; }

    /// <summary>
    /// Summary for Method2
    /// </summary>
    [SomeAttribute]
    public void Method2()
    {
        Console.WriteLine("Running Method 2");
    }
}
```

## The `[MixinIgnore]` Attribute

The `[MixinIgnore]` attribute can be added to implementation type members, allowing the implementation type to compile, but deferring the member's implementation to the composed type.

### Source Code

```C#
internal class Implementation
{
    // The source generator will not copy this method into any composition type.
    // This member is effectively just a stub, so that this implementation class will compile.
    [MixinIgnore]
    void Method1()
    \{ }

    /// <summary>
    /// Summary of Method2
    /// </summary>
    public void Method2()
    {
        Method1();
    }
}
```

```C#
[Mixin(typeof(Implementation))]
public partial class Composition
{
    /// <summary>
    /// Summary of Method1
    /// </summary>
    public void Method1()
    {
        Console.WriteLine("Running Method1");
    }
}
```
### Generated Code
The above code will result in the following generated code.  `Implementation.Method2()` will call `Composition.Method1()`, not `Implementation.Method1()`.

```C#
public partial class Composition
{
    /// <summary>
    /// Summary of Method1
    /// </summary>
    public void Method1()
    {
        Console.WriteLine("Running Method1");
    }

    /// <summary>
    /// Summary of Method2
    /// </summary>
    public void Method2()
    {
        Method1();
    }
}
```

## License

This repository is licensed under the GNU General Public License (GPL). The GPL applies only to the source code in this repository. Code generated by the source generator is not subject to this license and can be used according to your own project's licensing terms.


:::

### About
:::note

Generate mixins of classes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **JinShil.MixinSourceGenerator**
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
  	  <PackageReference Include="JinShil.MixinSourceGenerator" Version="1.0.0">
  	    <PrivateAssets>all</PrivateAssets>
  	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  	  </PackageReference>
  	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JinShil.MixinSourceGenerator\src\DemoMixin\Program.cs" label="Program.cs" >

  This is the use of **JinShil.MixinSourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using DemoMixin;

Person person = new Person \{ Name = "Andrei Ignat" };
person.LogName();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JinShil.MixinSourceGenerator\src\DemoMixin\Person.cs" label="Person.cs" >

  This is the use of **JinShil.MixinSourceGenerator** in *Person.cs*

```csharp showLineNumbers 

using JinShil.MixinSourceGenerator;
namespace DemoMixin;
[Mixin(typeof(LogData))]
partial class Person
{
    public string Name \{ get; set; }=string.Empty;
    public void LogName() => this.Log(Name);
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JinShil.MixinSourceGenerator\src\DemoMixin\LogData.cs" label="LogData.cs" >

  This is the use of **JinShil.MixinSourceGenerator** in *LogData.cs*

```csharp showLineNumbers 

namespace DemoMixin;
internal class LogData
{
    public void Log(string data) => Console.WriteLine(data);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JinShil.MixinSourceGenerator\src\DemoMixin\obj\GX\JinShil.MixinSourceGenerator\JinShil.MixinSourceGenerator.SourceGenerator\MixinAttribute.g.cs" label="MixinAttribute.g.cs" >
```csharp showLineNumbers 

namespace JinShil.MixinSourceGenerator
{
    /// <summary>
    /// Specifies the type whose members are to be mixed in to a partial class or struct.
    /// </summary>
    [System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Struct, AllowMultiple = true)]
    public class MixinAttribute : System.Attribute
    {
        public System.Type Type \{ get; }
        public MixinAttribute(System.Type type)
        {
            Type = type;
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JinShil.MixinSourceGenerator\src\DemoMixin\obj\GX\JinShil.MixinSourceGenerator\JinShil.MixinSourceGenerator.SourceGenerator\MixinIgnoreAttribute.g.cs" label="MixinIgnoreAttribute.g.cs" >
```csharp showLineNumbers 

namespace JinShil.MixinSourceGenerator
{
    /// <summary>
    /// Used to identify a member that should be ignored when mixing in members from other types.
    /// </summary>
    [System.AttributeUsage(System.AttributeTargets.Method | System.AttributeTargets.Property | System.AttributeTargets.Field | System.AttributeTargets.Event, AllowMultiple = false)]
    public class MixinIgnoreAttribute : System.Attribute
    {
        public MixinIgnoreAttribute()
        \{ }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JinShil.MixinSourceGenerator\src\DemoMixin\obj\GX\JinShil.MixinSourceGenerator\JinShil.MixinSourceGenerator.SourceGenerator\Person.g.cs" label="Person.g.cs" >
```csharp showLineNumbers 
#nullable enable
namespace DemoMixin
{
    partial class Person
    {
        public void Log(string data) => Console.WriteLine(data);
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project JinShil.MixinSourceGenerator ](/sources/JinShil.MixinSourceGenerator.zip)

:::


### Share JinShil.MixinSourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJinShil.MixinSourceGenerator&quote=JinShil.MixinSourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJinShil.MixinSourceGenerator&text=JinShil.MixinSourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJinShil.MixinSourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJinShil.MixinSourceGenerator&title=JinShil.MixinSourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJinShil.MixinSourceGenerator&title=JinShil.MixinSourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJinShil.MixinSourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/JinShil.MixinSourceGenerator

<SameCategory />

