---
sidebar_position: 680
title: 68 - JsonPolymorphicGenerator
description: Generating JsonDerivedType to be added to the base class
slug: /JsonPolymorphicGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# JsonPolymorphicGenerator  by surgicalcoder


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/GoLive.Generator.JsonPolymorphicGenerator?label=GoLive.Generator.JsonPolymorphicGenerator)](https://www.nuget.org/packages/GoLive.Generator.JsonPolymorphicGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/surgicalcoder/JsonPolymorphicGenerator?label=updated)](https://github.com/surgicalcoder/JsonPolymorphicGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/surgicalcoder/JsonPolymorphicGenerator?style=social)

## Details

### Info
:::info

Name: **JsonPolymorphicGenerator**

Source Code Generator for System.Text.Json JsonDerivedType attributes on polymorphic classes

Author: surgicalcoder

NuGet: 
*https://www.nuget.org/packages/GoLive.Generator.JsonPolymorphicGenerator/*   


You can find more details at https://github.com/surgicalcoder/JsonPolymorphicGenerator

Source : https://github.com/surgicalcoder/JsonPolymorphicGenerator

:::

### Original Readme
:::note

# JsonPolymorphicGenerator
c# / .net Source Code Generator for System.Text.Json JsonDerivedType attributes on polymorphic classes

## Usage

For this, your base classes need the `partial` and `abstract` key words, and be decorated with `JsonPolymorphic`, and there need to be derived types in that same assembly for this to work.

An example of this is:

```
[JsonPolymorphic]
public abstract partial class BaseClass
{
    public string Property1 { get; set; }
}
```

This will then generate a partial class, that is decorated with the `JsonDerivedType` attribute, and use the class name as the discriminator.

```
[JsonDerivedType(typeof(GoLive.JsonPolymorphicGenerator.Playground.InheritedClass1), "InheritedClass1")]
[JsonDerivedType(typeof(GoLive.JsonPolymorphicGenerator.Playground.InheritedClass2), "InheritedClass2")]
public partial class BaseClass
{
}
```

You can now transform the text of the attributes that gets spat out! You have a number of options, that gets added to an `.editorconfig`, such as:

```
root = true

[*.cs]
jsonpolymorphicgenerator.text_preappend = JSON_
jsonpolymorphicgenerator.text_transform = return classname.GetHashCode().ToString()
jsonpolymorphicgenerator.text_postappend = _A
```

For the `jsonpolymorphicgenerator.text_transform` option, you have to provide valid c# code, that returns a string - there are 2 input variables - `classname` and `namespacename`

:::

### About
:::note

Generating JsonDerivedType to be added to the base class


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **JsonPolymorphicGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="GoLive.Generator.JsonPolymorphicGenerator" Version="1.0.4">
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JsonPolymorphicGenerator\src\JsonPolymorphicGeneratorDemo\Program.cs" label="Program.cs" >

  This is the use of **JsonPolymorphicGenerator** in *Program.cs*

```csharp showLineNumbers 
//https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/polymorphism?pivots=dotnet-7-0
using JsonPolymorphicGeneratorDemo;
using System.Text.Json;

Person[] persons = new Person[2];
persons[0] = new Student() { Name="Student Ignat"};

persons[1] = new Teacher() { Name = "Teacher Ignat" };
JsonSerializerOptions opt = new ()
{
    WriteIndented = true
};
var ser = JsonSerializer.Serialize(persons, opt);
Console.WriteLine(ser);
var p = JsonSerializer.Deserialize<Person[]>(ser);
if(p != null)
foreach (var item in p)
{
    Console.WriteLine(item.Data());
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JsonPolymorphicGenerator\src\JsonPolymorphicGeneratorDemo\Person.cs" label="Person.cs" >

  This is the use of **JsonPolymorphicGenerator** in *Person.cs*

```csharp showLineNumbers 
using System.Text.Json.Serialization;

namespace JsonPolymorphicGeneratorDemo;

[JsonPolymorphic]
public abstract partial class Person
{
    
    public string? Name { get; set; }
    public abstract string Data();
}

public class Teacher : Person
{
    public override string Data()
    {
        return "Class Teacher:" + Name;
    }
}
public class Student : Person
{
    public override string Data()
    {
        return "Class Student:" + Name;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\JsonPolymorphicGenerator\src\JsonPolymorphicGeneratorDemo\obj\GX\GoLive.JsonPolymorphicGenerator\GoLive.JsonPolymorphicGenerator.PolymorphicAttributeGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 
using System.Text.Json.Serialization;

namespace JsonPolymorphicGeneratorDemo
{
    [JsonDerivedType(typeof(JsonPolymorphicGeneratorDemo.Teacher), "Teacher")]
    [JsonDerivedType(typeof(JsonPolymorphicGeneratorDemo.Student), "Student")]
    public partial class Person
    {
    }
}



```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project JsonPolymorphicGenerator ](/sources/JsonPolymorphicGenerator.zip)

:::


### Share JsonPolymorphicGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJsonPolymorphicGenerator&quote=JsonPolymorphicGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJsonPolymorphicGenerator&text=JsonPolymorphicGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJsonPolymorphicGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJsonPolymorphicGenerator&title=JsonPolymorphicGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJsonPolymorphicGenerator&title=JsonPolymorphicGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FJsonPolymorphicGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/JsonPolymorphicGenerator

## In the same category (Serializer)


### [ProtobufSourceGenerator](/docs/ProtobufSourceGenerator)


### [System.Text.Json](/docs/System.Text.Json)

