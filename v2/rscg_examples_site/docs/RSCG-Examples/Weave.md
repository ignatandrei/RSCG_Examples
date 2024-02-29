---
sidebar_position: 1050
title: 105 - Weave
description: Scriban like generator
slug: /Weave
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Weave  by John Gietzen


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Weave?label=Weave)](https://www.nuget.org/packages/Weave/)
[![GitHub last commit](https://img.shields.io/github/last-commit/otac0n/Weave?label=updated)](https://github.com/otac0n/Weave)
![GitHub Repo stars](https://img.shields.io/github/stars/otac0n/Weave?style=social)

## Details

### Info
:::info

Name: **Weave**

Weave is a text templating engine that is all about attention to detail.  Weave handles the tricky work of making your rendered text beautiful.

Author: John Gietzen

NuGet: 
*https://www.nuget.org/packages/Weave/*   


You can find more details at https://github.com/otac0n/Weave

Source : https://github.com/otac0n/Weave

:::

### Original Readme
:::note

Weave <img src="Weave.svg" width="42" height="42" />
=====

Weave is a text templating engine for .NET that is all about attention to detail.  Weave handles the tricky work of making your rendered text beautiful.

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/otac0n/Weave/license.md)
[![Get it on NuGet](https://img.shields.io/nuget/v/Weave.svg?style=flat-square)](http://nuget.org/packages/Weave)

[![Appveyor Build](https://img.shields.io/appveyor/ci/otac0n/Weave.svg?style=flat-square)](https://ci.appveyor.com/project/otac0n/weave)
[![Test Coverage](https://img.shields.io/codecov/c/github/otac0n/Weave.svg?style=flat-square)](https://codecov.io/gh/otac0n/Weave)
[![Pre-release packages available](https://img.shields.io/nuget/vpre/Weave.svg?style=flat-square)](http://nuget.org/packages/Weave)

Getting Started
---------------

The easiest way to get a copy of Weave is to install the [Weave NuGet package](http://nuget.org/packages/Weave) in Visual Studio.

    PM> Install-Package Weave

Due to a limitation in Visual Studio, you will need to reload your project for the 'WeaveTemplate' build action to be recognized.

Once you have the package installed, files in your project marked as 'WeaveTemplate' in the properties window will be compiled to their respective `.weave.cs` template classes before every build.  These template classes will be automatically included in compilation.

For help with template syntax, see [the Syntax Guide wiki entry](https://github.com/otac0n/Weave/wiki/Syntax-Guide)

Example
-------

    @namespace MyProject
    @methodname RenderFizzBuzz
    @model IEnumerable<int>

    {{each i in model}}
        {{if i % 3 == 0 && i % 5 == 0}}
            {{= i }} FizzBuzz
        {{elif i % 3 == 0}}
            {{= i }} Fizz
        {{elif i % 5 == 0}}
            {{= i }} Buzz
        {{else}}
            {{= i }}
        {{/if}}
    {{/each}}

This would generate a static (by default) method named `RenderFizzBuzz` in the `Templates` class (again, by default).  You would use this method like so:

    Templates.RenderFizzBuzz(Enumerable.Range(0, 100), Console.Out);

Any `TextWriter` is supported.  To get the text as a string, use a `StringWriter`.


:::

### About
:::note

Scriban like generator


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Weave**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net8.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
	  <None Remove="MyDataT.weave" />
	</ItemGroup>
	<ItemGroup>
		<PackageReference Include="Weave" Version="2.1.0">
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
	</ItemGroup>
	<ItemGroup>
	  <WeaveTemplate Include="MyDataT.weave">
	    
	  </WeaveTemplate>
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Weave\src\WeaveDemo\Program.cs" label="Program.cs" >

  This is the use of **Weave** in *Program.cs*

```csharp showLineNumbers 
using WeaveDemo;

Person p = new()
{
FirstName = "Andrei", LastName = "Ignat" 
};


MyProject.Templates.RenderFizzBuzz(p, Console.Out);

StringWriter sw = new();
MyProject.Templates.RenderFizzBuzz(p, sw);
Console.WriteLine("---------------------------");
Console.WriteLine(sw.ToString());


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Weave\src\WeaveDemo\Person.cs" label="Person.cs" >

  This is the use of **Weave** in *Person.cs*

```csharp showLineNumbers 
namespace WeaveDemo;
internal class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName() => $"{FirstName} {LastName}";
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Weave\src\WeaveDemo\obj\GX\Weave\Weave.GenerateWeaveSources\.._p5C.._p5C.._p5CMyDataT.weave.g.cs" label=".._p5C.._p5C.._p5CMyDataT.weave.g.cs" >


```csharp showLineNumbers 
// -----------------------------------------------------------------------
// <auto-generated>
//   This code was generated by Weave 2.1.0.0
//
//   Changes to this file may cause incorrect behavior and will be lost if
//   the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------

namespace
    #line 1 "..\..\..\MyDataT.weave"
           MyProject
    #line default
{
    using System;
    using System.IO;

    partial class
    Templates
    {
        [System.CodeDom.Compiler.GeneratedCode("Weave", "2.1.0.0")]
        public
        static void
        #line 2 "..\..\..\MyDataT.weave"
            RenderFizzBuzz
        #line default
            (
            #line 3 "..\..\..\MyDataT.weave"
       WeaveDemo.Person
            #line default
            model, TextWriter writer, string indentation = null)
        {
            var __originalIndentation = indentation = indentation ?? string.Empty;
            writer.Write(indentation);
            writer.Write("I will write p.FullName();");
            writer.WriteLine();
            writer.WriteLine();
            writer.Write(indentation);
            writer.Write(
                #line 7 "..\..\..\MyDataT.weave"
    model.FullName() 
                #line default
                );
            writer.WriteLine();
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Weave ](/sources/Weave.zip)

:::


### Share Weave 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWeave&quote=Weave" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWeave&text=Weave:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWeave" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWeave&title=Weave" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWeave&title=Weave&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FWeave" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Weave

### In the same category (FilesToCode) - 10 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [corecraft](/docs/corecraft)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [LingoGen](/docs/LingoGen)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_JSON2Class](/docs/RSCG_JSON2Class)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)

