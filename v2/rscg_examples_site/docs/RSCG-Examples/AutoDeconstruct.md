---
sidebar_position: 100
title: 10 - AutoDeconstruct
description: Automatically add deconstruct for all types in an assembly
slug: /AutoDeconstruct
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# AutoDeconstruct  by Jason Bock

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/AutoDeconstruct?label=AutoDeconstruct)](https://www.nuget.org/packages/AutoDeconstruct)
[![GitHub last commit](https://img.shields.io/github/last-commit/jasonbock/autodeconstruct?label=updated)](https://github.com/jasonbock/autodeconstruct)
![GitHub Repo stars](https://img.shields.io/github/stars/jasonbock/autodeconstruct?style=social)

## Details

### Info
:::info

Name: **AutoDeconstruct**

Author: Jason Bock

NuGet: 
*https://www.nuget.org/packages/AutoDeconstruct*   


You can find more details at https://github.com/JasonBock/AutoDeconstruct/blob/main/docs/Overview.md

Source : https://github.com/jasonbock/autodeconstruct
:::

### About
:::note

Automatically add deconstruct for all types in an assembly


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AutoDeconstruct**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoDeconstruct" Version="1.0.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\AutoDeconstruct\src\AutoDeconstructDemo\Program.cs" label="Program.cs" >

  This is the use of **AutoDeconstruct** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
var p = new Person();
p.FirstName = "Test";
p.LastName = "Ignat";
var (_, l, _ ) = p;
Console.WriteLine($"Last name is {l}");
```
  </TabItem>

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\AutoDeconstruct\src\AutoDeconstructDemo\Person.cs" label="Person.cs" >

  This is the use of **AutoDeconstruct** in *Person.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using AutoDeconstruct;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Title { get; set; }
}

[NoAutoDeconstruct]
public class TestPerson
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Title { get; set; }

}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\AutoDeconstruct\src\AutoDeconstructDemo\obj\GX\AutoDeconstruct\AutoDeconstruct.AutoDeconstructGenerator\AutoDeconstruct.g.cs" label="AutoDeconstruct.g.cs" >


```csharp showLineNumbers 
#nullable enable

public static partial class PersonExtensions
{
	public static void Deconstruct(this global::Person @self, out string? @firstName, out string? @lastName, out string? @title)
	{
		global::System.ArgumentNullException.ThrowIfNull(@self);
		(@firstName, @lastName, @title) =
			(@self.FirstName, @self.LastName, @self.Title);
	}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project AutoDeconstruct ](/sources/AutoDeconstruct.zip)

:::

### Download PDF

[Download PDF AutoDeconstruct ](/pdfs/AutoDeconstruct.pdf)

### Share AutoDeconstruct 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&quote=AutoDeconstruct" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&text=AutoDeconstruct:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&title=AutoDeconstruct" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct&title=AutoDeconstruct&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDeconstruct" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoDeconstruct
