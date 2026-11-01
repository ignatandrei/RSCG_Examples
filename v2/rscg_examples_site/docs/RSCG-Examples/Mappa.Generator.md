---
sidebar_position: 2980
title: 298 - Mappa.Generator
description: Mapping from an object to another object
slug: /Mappa.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMapper.mdx';

# Mappa.Generator  by Stefano Anelli


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Mappa.Generator?label=Mappa.Generator)](https://www.nuget.org/packages/Mappa.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/sanelli/Mappa?label=updated)](https://github.com/sanelli/Mappa)
![GitHub Repo stars](https://img.shields.io/github/stars/sanelli/Mappa?style=social)

## Details

### Info
:::info

Name: **Mappa.Generator**

Mappa source generator.

Author: Stefano Anelli

NuGet: 
*https://www.nuget.org/packages/Mappa.Generator/*   


You can find more details at https://github.com/sanelli/Mappa

Source: https://github.com/sanelli/Mappa

:::

### Author
:::note
Stefano Anelli 
![Alt text](https://github.com/sanelli.png)
:::

## Original Readme
:::note

# 🗺️ Mappa

![Build main](https://github.com/sanelli/Mappa/actions/workflows/merge-main.yml/badge.svg)
![Line Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fsanelli%2F7f4a85bc809328b4821b03125f9190cb%2Fraw%2FMAPPA-BADGE-LINE-COVERAGE.json)
![Branch Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fsanelli%2F7f4a85bc809328b4821b03125f9190cb%2Fraw%2FMAPPA-BADGE-BRANCH-COVERAGE.json)
![Method Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fsanelli%2F7f4a85bc809328b4821b03125f9190cb%2Fraw%2FMAPPA-BADGE-METHOD-COVERAGE.json)

Mappa (italian for _map_) is a source generator for `C#` that can generate code to allow the mapping between types, similarly to what [AutoMapper](https://www.nuget.org/packages/AutoMapper) (and other similar tools) does.
See [Documentation](./Documentation/README.md) for more details.

The main difference between Mappa and AutoMapper is that Mappa generates code at compile time while AutoMapper only at runtime;
this has multiple benefits:
- the code generated is optimised by the compiler;
- the code generated is pure C# code that does not require any introspections;
- the code generated works when AOT is required;
- the code can be easily shared across different mappers;
- fine-grained mapping can be obtained via attributes on the mapper methods without having to touch the source or the target classes;
- mapper methods can be inside any class (static class and extension methods are supported!).
- you do not need to specify every type that requires a mapping: if a mapping is missing Mappa will generate it for you;


## 🧑‍🔬 A simple example
Consider the following code snippet:
```csharp
using Mappa;
using System.Collections.Generic;

namespace Sample;
  
public enum MyEnumeration
{
    One,
    Two,
    Three,
}

public class Source
{
    public int PropertyA {get;set;}
    public int[] PropertyB {get;set;}
    public MyEnumeration PropertyC {get;set;}
}

public class Target
{
    public long PropertyA {get;set;}
    public List<string> PropertyB {get;set;}
    public string PropertyC {get;set;}
}

[Mappa]
public partial class Mapper
{
    public partial Target Map(Source input);
}
```

will create mapping code like the following:
```csharp
namespace Sample;

public partial class Mapper
{
   [System.CodeDom.Compiler.GeneratedCodeAttribute("Mappa", "0.0.1.0")]
   public partial Sample.Target Map(Sample.Source input)
   {
       long __mappa_tmp_1 = input.PropertyA;
       int[] __mappa_tmp_2 = input.PropertyB;
       System.Collections.Generic.List<string> __mappa_tmp_3 = new System.Collections.Generic.List<string>(__mappa_tmp_2.Length);
       for (int __mappa_tmp_3 = 0; __mappa_tmp_3 < __mappa_tmp_2.Length; ++__mappa_tmp_3)
       {
           int __mappa_tmp_4 = __mappa_tmp_2[__mappa_tmp_3];
           string __mappa_tmp_5 = __mappa_tmp_4.ToString();
           __mappa_tmp_3.Add(__mappa_tmp_5)
       }
       Sample.MyEnumeration __mappa_tmp_6 = input.PropertyC;
       string __mappa_tmp_7;
       switch(__mappa_tmp_6)
       {
           case Sample.MyEnumeration.One:
              __mappa_tmp_7 = "One";
              break;
           case Sample.MyEnumeration.Two:
              __mappa_tmp_7 = "Two";
              break;
           case Sample.MyEnumeration.Three:
              __mappa_tmp_7 = "Three";
              break;
           default:
              throw new System.OutOfRangeException(nameof(__mappa_tmp_6));
       }
       Sample.Target __mappa_tmp_8 = new Sample.Target()
       {
           PropertyA = __mappa_tmp_1,
           PropertyB = __mappa_tmp_3,
           PropertyC = __mappa_tmp_7;
       }
       return __mappa_tmp_8;
   }
}
```

## 🧑🏻‍💻 How to use Mappa
The easiest way is to import the NuGet packages and apply the `[Mappa]` attribute on the partial classes that contain the partial methods that need to be generated.

Please see the [tutorial](./Documentation/tutorial.md) in the [documentation](./Documentation/README.md) provided.

You can also find many examples in the [Mappa.Samples](Mappa.Samples) project.

## 📦 NuGet packages
- [Mappa](https://www.nuget.org/packages/Mappa/): attributes and `MappaContext` used to drive the source generator;
- [Mappa source generator](https://www.nuget.org/packages/Mappa.Generator/): source generator that automatically generates mappings between classes and value types.

Bson (`ObjectId`, `Decimal128`) and Protobuf (`Timestamp`, `Duration`, scalar wrappers) mappings are generated when you enable `BsonWellKnownTypes` / `ProtobufWellKnownTypes` and reference [MongoDB.Bson](https://www.nuget.org/packages/MongoDB.Bson/) or [Google.Protobuf](https://www.nuget.org/packages/Google.Protobuf/).

# 📈 Code coverage history 
- [Code Coverage gist](https://gist.github.com/sanelli/7f4a85bc809328b4821b03125f9190cb)
- [Code Coverage history](https://gist.github.com/sanelli/7f4a85bc809328b4821b03125f9190cb#file-mappa-code-coverage-history-md)

<img alt="Code coverage history" src="https://gist.githubusercontent.com/sanelli/7f4a85bc809328b4821b03125f9190cb/raw/MAPPA-CODE-COVERAGE-HISTORY.svg" width="800" />

# 🏎️ Benchmarks
Mappa is compared with AutoMapper, Mapster, and Mapperly on a shared set of mapping scenarios (collections, nested DTOs, IQueryable projection, and related cases). **Lower time and lower memory are better**. Details live in [Mappa.Benchmark/README.md](Mappa.Benchmark/README.md).

### Latest run — winners
<img alt="Benchmark winners" src="https://gist.githubusercontent.com/sanelli/7f4a85bc809328b4821b03125f9190cb/raw/MAPPA-BENCHMARK-COMPARISON.svg" width="800"/>

### Latest run — mean time vs Mappa (%)
<img alt="Benchmark mean time percentages" src="https://gist.githubusercontent.com/sanelli/7f4a85bc809328b4821b03125f9190cb/raw/MAPPA-BENCHMARK-TIME-PERCENTAGES.svg" width="800"/>

### Latest run — allocated memory vs Mappa (%)
<img alt="Benchmark allocated memory percentages" src="https://gist.githubusercontent.com/sanelli/7f4a85bc809328b4821b03125f9190cb/raw/MAPPA-BENCHMARK-MEMORY-PERCENTAGES.svg" width="800"/>

### Latest run — mean time
<img alt="Benchmark mean time" src="https://gist.githubusercontent.com/sanelli/7f4a85bc809328b4821b03125f9190cb/raw/MAPPA-BENCHMARK-TIME.svg" width="800"/>

### Latest run — allocated memory
<img alt="Benchmark allocated memory" src="https://gist.githubusercontent.com/sanelli/7f4a85bc809328b4821b03125f9190cb/raw/MAPPA-BENCHMARK-MEMORY.svg" width="800"/>

:::

### About
:::note

Mapping from an object to another object


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Mappa.Generator**
```xml showLineNumbers {17}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
	  <PackageReference Include="Mappa" Version="10.3.0" />
	  <PackageReference Include="Mappa.Generator" Version="10.3.0">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mappa.Generator\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **Mappa.Generator** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO personDTO= UserMapper.MapUser(p);
Console.WriteLine(personDTO.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mappa.Generator\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **Mappa.Generator** in *Person.cs*

```csharp showLineNumbers 

public partial class Person
{
    public int ID \{ get; set; }
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mappa.Generator\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **Mappa.Generator** in *PersonDTO.cs*

```csharp showLineNumbers 

using Mappa.Attributes;

namespace mapperDemo;
public partial struct PersonDTO
{
    public string? FirstName \{ get; set; }
    public string? LastName \{ get; set; }

    public string FullName \{ 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}

[Mappa]
public partial class UserMapper
{
    
    public static partial PersonDTO MapUser(Person from);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mappa.Generator\src\mapperDemo\obj\GX\Mappa.Generator\Mappa.Generator.MappaGenerator\mapperDemo.UserMapper.g.cs" label="mapperDemo.UserMapper.g.cs" >
```csharp showLineNumbers 
// <auto-generated>
//    <tool-name>Mappa</tool-name>
//    <tool-version>10.3.0.0</tool-version>
//    <timestamp>Sun, 01 Nov 2026 19:28:38 GMT</timestamp>
//    <note>This is an autogenerated file: edit to this file might be lost.</note>
// </auto-generated>

namespace mapperDemo;

public partial class UserMapper
{
   #nullable enable
   [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
   [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Mappa", "10.3.0.0")]
   public static partial mapperDemo.PersonDTO MapUser(Person from)
   {
      string? __mappa_tmp_1 = from.FirstName;
      string? __mappa_tmp_2 = from.LastName;
      mapperDemo.PersonDTO __mappa_tmp_3 = new mapperDemo.PersonDTO()
      {
         FirstName = __mappa_tmp_1,
         LastName = __mappa_tmp_2,
      };

      return __mappa_tmp_3;
   }
   #nullable restore
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Mappa.Generator ](/sources/Mappa.Generator.zip)

:::


### Share Mappa.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMappa.Generator&quote=Mappa.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMappa.Generator&text=Mappa.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMappa.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMappa.Generator&title=Mappa.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMappa.Generator&title=Mappa.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMappa.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Mappa.Generator

<SameCategory />

