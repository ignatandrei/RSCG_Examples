---
sidebar_position: 1470
title: 147 - JKToolKit.TemplatePropertyGenerator
description: String templating for a class
slug: /JKToolKit.TemplatePropertyGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# JKToolKit.TemplatePropertyGenerator  by Jonas Kamsker


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/JKToolKit.TemplatePropertyGenerator?label=JKToolKit.TemplatePropertyGenerator)](https://www.nuget.org/packages/JKToolKit.TemplatePropertyGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/JKamsker/JKToolKit.TemplatePropertyGenerator?label=updated)](https://github.com/JKamsker/JKToolKit.TemplatePropertyGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/JKamsker/JKToolKit.TemplatePropertyGenerator?style=social)

## Details

### Info
:::info

Name: **JKToolKit.TemplatePropertyGenerator**

Generates strongly typed stringformatters based on stringformats.

Author: Jonas Kamsker

NuGet: 
*https://www.nuget.org/packages/JKToolKit.TemplatePropertyGenerator/*   


You can find more details at https://github.com/JKamsker/JKToolKit.TemplatePropertyGenerator

Source : https://github.com/JKamsker/JKToolKit.TemplatePropertyGenerator

:::

### Original Readme
:::note

<!-- # JKToolKit.TemplatePropertyGenerator -->

<p align="center">
  <a>
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/logo/logo_small_128x128.png">
      <img src="assetss/logo/logo_small_128x128.png" height="128">
    </picture>
    <h1 align="center">TemplatePropertyGenerator</h1>
  </a>
</p>

<p align="center">
  <a href="https://www.nuget.org/packages/JKToolKit.TemplatePropertyGenerator/"><img src="https://img.shields.io/nuget/v/JKToolKit.TemplatePropertyGenerator" alt="NuGet"></a>
  <a href="https://www.nuget.org/packages/JKToolKit.TemplatePropertyGenerator/"><img src="https://img.shields.io/nuget/dt/JKToolKit.TemplatePropertyGenerator" alt="Nuget"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/JKamsker/JKToolKit.TemplatePropertyGenerator" alt="License"></a>
  <a href="https://github.com/JKamsker/JKToolKit.TemplatePropertyGenerator/pulls"><img src="https://img.shields.io/badge/PR-Welcome-blue" alt="PR"></a>
  <!-- <a href="https://github.com/JKamsker/JKToolKit.TemplatePropertyGenerator/actions/workflows/build-test.yml"><img src="https://img.shields.io/github/actions/workflow/status/JKamsker/JKToolKit.TemplatePropertyGenerator/build-test.yml?branch=master" alt="GitHub Workflow Status"></a> -->
</p>

## Overview

`TemplatePropertyGenerator` is a C# source generator that creates strongly-typed template properties from annotated classes. This allows for easy and safe string formatting by generating classes with methods to format predefined templates.

## Features

- Define template properties with format strings using attributes.
- Auto-generate classes with methods to format the strings.
- Supports FormattableString for more complex formatting needs.

## How to Use

1. **Install the NuGet package:**

	Ensure you have the NuGet package installed in your project. If not, you can install it via the NuGet Package Manager or the .NET CLI.

	```sh
	dotnet add package JKToolKit.TemplatePropertyGenerator
	```

2. **Define your templates:**

   Use the `TemplateProperty` attribute to define your template properties in a partial class. The attribute takes the name of the property and the format string as parameters.

    ```csharp
    [TemplateProperty("Hello", "Hello {value}, {value}!")]
    [TemplateProperty("FooBar", "Foo {value}, Bar {value}")]
    public static partial class Consts
    {
    }
    ```

3. **Use the generated code:**

   Once the generator runs, it will produce a class with properties and methods to format your strings. You can use these in your code as shown below:

   ```csharp
   private static void Main(string[] args)
   {
       Console.WriteLine(Consts.Hello.Template); // Output: Hello {value}, {value}!
       Console.WriteLine(Consts.Hello.Format("World")); // Output: Hello World, World!
	   Console.WriteLine(Consts.FooBar.Format("Foo1", "Bar1")); // Output: Foo Foo1, Bar Bar1
   }
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Source Generators in .NET](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview)
- [Microsoft Roslyn](https://github.com/dotnet/roslyn)


:::

### About
:::note

String templating for a class


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **JKToolKit.TemplatePropertyGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="JKToolKit.TemplatePropertyGenerator" Version="0.0.4" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JKToolKit.TemplatePropertyGenerator\src\SimpleTemplate\Program.cs" label="Program.cs" >

  This is the use of **JKToolKit.TemplatePropertyGenerator** in *Program.cs*

```csharp showLineNumbers 
using SimpleTemplate;

Person person = new();
person.FirstName = "Andrei";
person.LastName = "Ignat";
Console.WriteLine(new Person.HelloClass().Format(person.FirstName,person.LastName));
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JKToolKit.TemplatePropertyGenerator\src\SimpleTemplate\Person.cs" label="Person.cs" >

  This is the use of **JKToolKit.TemplatePropertyGenerator** in *Person.cs*

```csharp showLineNumbers 
namespace SimpleTemplate;
[TemplateProperty("Hello", "Hello {name1}, {name2}!")]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JKToolKit.TemplatePropertyGenerator\src\SimpleTemplate\obj\GX\TemplatePropertyGenerator\JKToolKit.TemplatePropertyGenerator.TemplatePropertyAttributeSourceGenerator\TemplatePropertyAttribute.g.cs" label="TemplatePropertyAttribute.g.cs" >


```csharp showLineNumbers 
global using JKToolKit.TemplatePropertyGenerator.Attributes;

using System;

namespace JKToolKit.TemplatePropertyGenerator.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
internal class TemplatePropertyAttribute : Attribute
{
    public string Name { get; }
    public string Format { get; }

    public TemplatePropertyAttribute(string name, string format)
    {
        Name = name;
        Format = format;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JKToolKit.TemplatePropertyGenerator\src\SimpleTemplate\obj\GX\TemplatePropertyGenerator\JKToolKit.TemplatePropertyGenerator.TemplatePropertySourceGenerator\SimpleTemplate.Person_Generated.cs" label="SimpleTemplate.Person_Generated.cs" >


```csharp showLineNumbers 
// <auto-generated />
using System;
namespace SimpleTemplate
{
    internal partial class Person
    {
        public static readonly HelloClass Hello = new();

        public class HelloClass
        {
            public string Template => "Hello {name1}, {name2}!";

            internal HelloClass()
            {
            }

            public string Format(string name1, string name2)
            {
                return $"Hello {name1}, {name2}!";
            }

            public FormattableString AsFormattable(string name1, string name2)
            {
                return $"Hello {name1}, {name2}!";
            }
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project JKToolKit.TemplatePropertyGenerator ](/sources/JKToolKit.TemplatePropertyGenerator.zip)

:::


### Share JKToolKit.TemplatePropertyGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJKToolKit.TemplatePropertyGenerator&quote=JKToolKit.TemplatePropertyGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJKToolKit.TemplatePropertyGenerator&text=JKToolKit.TemplatePropertyGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJKToolKit.TemplatePropertyGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJKToolKit.TemplatePropertyGenerator&title=JKToolKit.TemplatePropertyGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJKToolKit.TemplatePropertyGenerator&title=JKToolKit.TemplatePropertyGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJKToolKit.TemplatePropertyGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/JKToolKit.TemplatePropertyGenerator

### In the same category (Templating) - 9 other generators


#### [Gobie](/docs/Gobie)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [RazorBlade](/docs/RazorBlade)


#### [RSCG_IFormattable](/docs/RSCG_IFormattable)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

