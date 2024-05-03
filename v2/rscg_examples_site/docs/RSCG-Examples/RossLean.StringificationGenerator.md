---
sidebar_position: 1380
title: 138 - RossLean.StringificationGenerator
description: Generating constructor code as string
slug: /RossLean.StringificationGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RossLean.StringificationGenerator  by Alex Kalfakakos


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RossLean.StringificationGenerator?label=RossLean.StringificationGenerator)](https://www.nuget.org/packages/RossLean.StringificationGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/RossLean/RossLean?label=updated)](https://github.com/RossLean/RossLean/)
![GitHub Repo stars](https://img.shields.io/github/stars/RossLean/RossLean?style=social)

## Details

### Info
:::info

Name: **RossLean.StringificationGenerator**

A Roslyn source generator for object construction string generation methods

Author: Alex Kalfakakos

NuGet: 
*https://www.nuget.org/packages/RossLean.StringificationGenerator/*   


You can find more details at https://github.com/RossLean/RossLean/

Source : https://github.com/RossLean/RossLean/

:::

### Original Readme
:::note

# RossLean

RossLean is a project within the RossLean organization that aims to bring [Roslyn](https://github.com/dotnet/roslyn)-powered applications (analyzers and source generators) empowering the experience in the C# (and sometimes the entire .NET) ecosystem.

## Origins

Some analyzers that are included here were developed intending to enhance the experience of developing in C#. Then, [RoseLynn](https://github.com/Rekkonnect/RoseLynn) was developed for the purposes of abstracting common operations in Roslyn applications.

RossLean, following the same wordplay pattern as RoseLynn, came to life after deciding that grouping our efforts would be more encouraging for the entire community. This included staging and unifying the home for already existing packages and repos, with the intent of developing more in the future.

## Goals

The goal of RossLean is to accommodate source generators and analyzers that provide further versatility and usability of existing features and components of the language. This includes expanding on the set of capabilities that any given feature provides. For example, [GenericsAnalyzer](RoseLynn.GenericsAnalyzer/) provides a lot of flexibility around declaring constraints on generic type parameters.

The projects are to be made available under the copyrights and ownership of the RossLean organization and its affiliates. Previously held copyright ownership is not ceased, but will be migrated and merged with RossLean.

All code herein adheres to the MIT license. It is not expected to change in the future.

## Current Projects

- [GenericsAnalyzer](RossLean.GenericsAnalyzer/) - Expansions to the generic constraint model
- [NameOn](RossLean.NameOn/) - Enforcement and encouragement of `nameof` usage patterns
- [Smarttributes](RossLean.Smarttributes/) - Constraints on application of attributes
- [StringificationGenerator](RossLean.StringificationGenerator/) - Generator for construction code generation

## Future Projects

- Many features that are asked from the community in the [C# language design discussions](https://github.com/dotnet/csharplang/discussions). Currently interesting ones include:
  - Disallow direct value assignment to `ref` - `ref readonly` also provides immutability ([Link](https://github.com/dotnet/csharplang/discussions/7842))
  - Opt out of structural typing for specific types ([Link](https://github.com/dotnet/csharplang/discussions/5278#discussion-3623748))
- Common coding pattern simplification generators
  - Params method overload generator
  - Type parameter method overload generator
  - [VisitorPatternGenerator](https://github.com/Ghost4Man/VisitorPatternGenerator)
    - Extra features will be included in dedicated issues

Check out [this GitHub project](https://github.com/orgs/RossLean/projects/1) for a detailed list of issues regarding project ideas and their status.

## Contributing

Before opening a PR and making changes, it is required to open an issue for discussion around the desired changes. Any PRs without a clear issue they are tackling will be handled appropriately, depending on the scope of the issue itself.

The first priority of all these projects is providing helpful tools and frameworks with the smallest possible performance cost in the development experience within the IDE. We are aware that analyzers and source generators impose a significant enough performance penalty on their own, so we are careful to not hinder the experience any further.

### Guidelines

Analyzer and source generator packages should be built in a way such that the underlying `.Core` packages of each application are automatically transitively installed on the user's project, without their manual intervention.

Using [RoseLynn](https://github.com/Rekkonnect/RoseLynn) is highly encouraged, if necessary. It generally provides a great number of tools that may be useful in common scenarios. `RoseLynn.Testing` specifically is a must.

All projects must come with unit tests covering a viably large set of intended cases. Testing should be focused on isolated reported diagnostics or generated sources. No unit tests must ever fail; if we want to include unit tests that do not currently work, we will have to use `Ignore`.

All unit tests are written using the NUnit testing framework.

#### Analyzers

Analyzers can be built with Visual Studio 2019 in mind. This restricts the versions of the included `Microsoft.CodeAnalysis` to below 4.0.0. Additionally, only the RoseLynn*.VS2019 packages can be used.

It is not mandatory to support VS 2019 however. Rarely, some analyzer might be focused on newer versions of the language, or have to handle such cases. In this case, where the cost of backwards compatibility would be unreasonably large, VS 2022 onwards is the only path.

#### Source Generators

All source generators must be incremental (implementing only the `IIncrementalGenerator` attribute). This means that we will only support Visual Studio 2022 and above. Using T4 templates is highly discouraged, primarily for maintainability concerns.

Projects that also provide a domain-specific public API for consumption may not include the API in generated source. The underlying API that the source generator makes use of must be a separate package, and package versions must match exactly. In cases of hotfixes with version number difference in the build number, including the supported version in the description is sufficient.


:::

### About
:::note

Generating constructor code as string


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RossLean.StringificationGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="RossLean.StringificationGenerator" Version="1.0.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="RossLean.StringificationGenerator.Core" Version="1.0.0" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>



```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RossLean.StringificationGenerator\src\Code2String\Program.cs" label="Program.cs" >

  This is the use of **RossLean.StringificationGenerator** in *Program.cs*

```csharp showLineNumbers 
using Code2String;
using RossLean.StringificationGenerator.Generated;
Person person = new Person("Andrei", "Ignat");
string personString = ConstructionCodeGeneration.ForPerson(person);
Console.WriteLine(personString);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RossLean.StringificationGenerator\src\Code2String\Person.cs" label="Person.cs" >

  This is the use of **RossLean.StringificationGenerator** in *Person.cs*

```csharp showLineNumbers 
using RossLean.StringificationGenerator.Core;

namespace Code2String;
[GenerateConstructionCode]
public record Person(string firstName, string lastName)
{
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RossLean.StringificationGenerator\src\Code2String\obj\GX\StringificationGenerator.SourceGenerators\RossLean.StringificationGenerator.SourceGenerators.ConstructionCodeGenerator\Code2String.Person.ConstructionCode.g.cs" label="Code2String.Person.ConstructionCode.g.cs" >


```csharp showLineNumbers 
using Code2String;
using RossLean.StringificationGenerator.Core;
using System.Text;

namespace RossLean.StringificationGenerator.Generated;

public partial class ConstructionCodeGeneration : BaseConstructionCodeGeneration
{
    public static string ForPerson(Person person)
    {
        return $$"""
            new Person({{StringLiteral(person.firstName)}}, {{StringLiteral(person.lastName)}})
            """;
    }
    public static void AppendPerson(Person person, StringBuilder builder)
    {
        builder.Append($$"""
            new Person({{StringLiteral(person.firstName)}}, {{StringLiteral(person.lastName)}})
            """);
    }
    public static string ForPersonTargetTyped(Person person)
    {
        return $$"""
            new({{StringLiteral(person.firstName)}}, {{StringLiteral(person.lastName)}})
            """;
    }
    public static void AppendPersonTargetTyped(Person person, StringBuilder builder)
    {
        builder.Append($$"""
            new({{StringLiteral(person.firstName)}}, {{StringLiteral(person.lastName)}})
            """);
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RossLean.StringificationGenerator ](/sources/RossLean.StringificationGenerator.zip)

:::


### Share RossLean.StringificationGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRossLean.StringificationGenerator&quote=RossLean.StringificationGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRossLean.StringificationGenerator&text=RossLean.StringificationGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRossLean.StringificationGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRossLean.StringificationGenerator&title=RossLean.StringificationGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRossLean.StringificationGenerator&title=RossLean.StringificationGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRossLean.StringificationGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RossLean.StringificationGenerator

### In the same category (CodeToString) - 2 other generators


#### [CodeAnalysis](/docs/CodeAnalysis)


#### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)

