---
sidebar_position: 1290
title: 129 - CommonCodeGenerator
description: Generating ToString from classes
slug: /CommonCodeGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# CommonCodeGenerator  by yamaokunousausa


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/CommonCodeGenerator?label=CommonCodeGenerator)](https://www.nuget.org/packages/CommonCodeGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/usausa/common-code-generator?label=updated)](https://github.com/usausa/common-code-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/usausa/common-code-generator?style=social)

## Details

### Info
:::info

Name: **CommonCodeGenerator**

Common code generator.

Author: yamaokunousausa

NuGet: 
*https://www.nuget.org/packages/CommonCodeGenerator/*   


You can find more details at https://github.com/usausa/common-code-generator

Source : https://github.com/usausa/common-code-generator

:::

### Original Readme
:::note

# CommonCodeGenerator

[![NuGet Badge](https://buildstats.info/nuget/CommonCodeGenerator)](https://www.nuget.org/packages/CommonCodeGenerator/)

## Reference

Add reference to CommonCodeGenerator and CommonCodeGenerator.SourceGenerator to csproj.

```xml
  <ItemGroup>
    <PackageReference Include="CommonCodeGenerator" Version="0.2.0" />
    <PackageReference Include="CommonCodeGenerator.SourceGenerator" Version="0.2.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
```

## ToString

### Source

```cs
[GenerateToString]
public partial class Data
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;

    public int[] Values { get; set; } = default!;

    [IgnoreToString]
    public int Ignore { get; set; }
}
```

### Result

```cs

var data = new Data { Id = 123, Name = "xyz", Values = [1, 2] };
var str = data.ToString();
Assert.Equal("{ Id = 123, Name = xyz, Values = [1, 2] }", str);
```


:::

### About
:::note

Generating ToString from classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **CommonCodeGenerator**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="CommonCodeGenerator" Version="0.2.0" />
		<PackageReference Include="CommonCodeGenerator.SourceGenerator" Version="0.2.0">
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommonCodeGenerator\src\ToStringData\Program.cs" label="Program.cs" >

  This is the use of **CommonCodeGenerator** in *Program.cs*

```csharp showLineNumbers 
using ToStringData;

Console.WriteLine("Hello, World!");
Person person = new ();
person.FirstName = "Andrei";
person.LastName = "Ignat";
Console.WriteLine(person.ToString());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CommonCodeGenerator\src\ToStringData\Person.cs" label="Person.cs" >

  This is the use of **CommonCodeGenerator** in *Person.cs*

```csharp showLineNumbers 
using CommonCodeGenerator;

namespace ToStringData;
[GenerateToString]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    [IgnoreToString]
    public int Age { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project CommonCodeGenerator ](/sources/CommonCodeGenerator.zip)

:::


### Share CommonCodeGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommonCodeGenerator&quote=CommonCodeGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommonCodeGenerator&text=CommonCodeGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommonCodeGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommonCodeGenerator&title=CommonCodeGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommonCodeGenerator&title=CommonCodeGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCommonCodeGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/CommonCodeGenerator

### In the same category (EnhancementClass) - 24 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CopyTo](/docs/CopyTo)


#### [DudNet](/docs/DudNet)


#### [FastGenericNew](/docs/FastGenericNew)


#### [GeneratorEquals](/docs/GeneratorEquals)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)
