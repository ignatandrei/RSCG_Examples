---
sidebar_position: 2270
title: 227 - UtilityVerse.Copy
description: Deep Clone and Shallow Copy of objects
slug: /UtilityVerse.Copy
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveClone.mdx';

# UtilityVerse.Copy  by pritom purkayasta


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/UtilityVerse.Copy?label=UtilityVerse.Copy)](https://www.nuget.org/packages/UtilityVerse.Copy/)
[![GitHub last commit](https://img.shields.io/github/last-commit/purkayasta/TheUtilityVerse?label=updated)](https://github.com/purkayasta/TheUtilityVerse)
![GitHub Repo stars](https://img.shields.io/github/stars/purkayasta/TheUtilityVerse?style=social)

## Details

### Info
:::info

Name: **UtilityVerse.Copy**

A Roslyn source generator for generating shallow copy and deep copy for class,
            records and structs

Author: pritom purkayasta

NuGet: 
*https://www.nuget.org/packages/UtilityVerse.Copy/*   


You can find more details at https://github.com/purkayasta/TheUtilityVerse

Source: https://github.com/purkayasta/TheUtilityVerse

:::

### Author
:::note
pritom purkayasta 
![Alt text](https://github.com/purkayasta.png)
:::

### Original Readme
:::note

## The UtilityVerse 🧰
*(Multi-verse of utility methods)* — a library full of helper methods you might want to use.

![Nuget](https://img.shields.io/github/repo-size/purkayasta/TheUtilityVerse?style=social)
![Nuget](https://img.shields.io/github/last-commit/purkayasta/TheUtilityVerse?style=flat-square)

> ⭐️ Give it a star if you like the project!

---

## 📦 Packages in This Universe

Use whatever suits your project:

1. [**UtilityVerse**](https://www.nuget.org/packages/UtilityVerse/) -> ![Nuget](https://img.shields.io/nuget/v/UtilityVerse) ![Nuget](https://img.shields.io/nuget/dt/UtilityVerse?style=plastic)
   🧰 No dependencies — includes core utility methods.

2. [**UtilityVerse.ASPNET**](https://www.nuget.org/packages/UtilityVerse.ASPNET/) -> ![Nuget](https://img.shields.io/nuget/v/UtilityVerse.ASPNET) ![Nuget](https://img.shields.io/nuget/dt/UtilityVerse.ASPNET?style=plastic) 
   🌐 ASP.NET Core-specific helpers and extensions.

3. [**UtilityVerse.Copy**](https://www.nuget.org/packages/UtilityVerse.Copy/) -> ![Nuget](https://img.shields.io/nuget/v/UtilityVerse.Copy) ![Nuget](https://img.shields.io/nuget/dt/UtilityVerse.Copy?style=plastic)
   ✍️ A Roslyn-based source generator that automatically generates `ShallowCopy()` and `DeepCopy()` methods for your models.  
   → See full details here: [`UtilityVerse.Copy/README.md`](https://github.com/purkayasta/TheUtilityVerse/src/UtilityVerse.Copy/README.md)

---

To use this utility library, you may want to start with the `Utility` class.

---

Made with ❤️ in C#.

:::

### About
:::note

Deep Clone and Shallow Copy of objects


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **UtilityVerse.Copy**
```xml showLineNumbers {14}
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
	  <PackageReference Include="UtilityVerse.Copy" Version="0.5.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\Program.cs" label="Program.cs" >

  This is the use of **UtilityVerse.Copy** in *Program.cs*

```csharp showLineNumbers 
using CloneData;

Console.WriteLine("Hello, World!");
Person p = new ();
p.FirstName = "Andrei";
p.LastName = "Ignat";
p.Age = 54;
var p1=p.DeepCopy();
Console.WriteLine(p1.Name());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\Person.cs" label="Person.cs" >

  This is the use of **UtilityVerse.Copy** in *Person.cs*

```csharp showLineNumbers 

using UtilityVerse.Copy;

namespace CloneData;
[DeepCopy]
public partial class Person
{
    public string FirstName \{ get; set; \} = "";
    public string LastName \{ get; set; \} = "";
    public int Age \{ get; set; }
    public string Name() => $"{FirstName} {LastName}";

    public Person[] Childs \{ get; set; \} = [];
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\ClonableAttribute.g.cs" label="ClonableAttribute.g.cs" >
```csharp showLineNumbers 
using System;

namespace Dolly
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct)]
    public class ClonableAttribute : Attribute
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\CloneIgnoreAttribute.g.cs" label="CloneIgnoreAttribute.g.cs" >
```csharp showLineNumbers 
using System;

namespace Dolly
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class CloneIgnoreAttribute : Attribute
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\IClonable.g.cs" label="IClonable.g.cs" >
```csharp showLineNumbers 
using System;
namespace Dolly
{
    public interface IClonable<T> : ICloneable
    {
        T DeepClone();
        T ShallowClone();
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\obj\GX\Dolly\Dolly.DollyGenerator\Person.g.cs" label="Person.g.cs" >
```csharp showLineNumbers 
using Dolly;
using System.Linq;
namespace CloneData;
partial class Person : IClonable<Person>
{
    object ICloneable.Clone() => this.DeepClone();
    public virtual Person DeepClone() =>
        new ()
        {
            FirstName = FirstName,
            LastName = LastName,
            Childs = Childs.Select(item => item.DeepClone()).ToArray()
        };

    public virtual Person ShallowClone() =>
        new ()
        {
            FirstName = FirstName,
            LastName = LastName,
            Childs = Childs.ToArray()
        };
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UtilityVerse.Copy\src\CloneData\obj\GX\UtilityVerse.Copy\UtilityVerse.Copy.CopyGenerator\CloneData_Person_DeepCopy.g.cs" label="CloneData_Person_DeepCopy.g.cs" >
```csharp showLineNumbers 

  // <auto-generated>
  //     This code was generated by Copy.
  //     Author: Pritom Purkayasta
  //     DO NOT modify this file manually. Changes may be overwritten.
  //     This file contains auto-generated DeepCopy() implementations.
  // </auto-generated>

  using System;
  using System.Linq;
  using System.Collections.Generic;
  using System.Collections.ObjectModel;
  using System.Collections.Immutable;
  using System.Collections.Concurrent;
  using System.Collections.Frozen;

namespace CloneData
{
    public partial class Person
    {
        [System.CodeDom.Compiler.GeneratedCode("DeepCopyGenerator", "1.0")]
        public Person DeepCopy()
        {
            return new Person
            {
                FirstName = this.FirstName,
                LastName = this.LastName,
                Age = this.Age,
                Childs = this.Childs?.Select(x => x?.DeepCopy()).ToArray(),
            };
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project UtilityVerse.Copy ](/sources/UtilityVerse.Copy.zip)

:::


### Share UtilityVerse.Copy 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUtilityVerse.Copy&quote=UtilityVerse.Copy" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUtilityVerse.Copy&text=UtilityVerse.Copy:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUtilityVerse.Copy" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUtilityVerse.Copy&title=UtilityVerse.Copy" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUtilityVerse.Copy&title=UtilityVerse.Copy&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUtilityVerse.Copy" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/UtilityVerse.Copy

<SameCategory />

