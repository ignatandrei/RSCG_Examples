---
sidebar_position: 1190
title: 119 - AutoGen
description: Generating function to map DTOs
slug: /AutoGen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# AutoGen  by Feast Antelcat


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Antelcat.AutoGen?label=Antelcat.AutoGen)](https://www.nuget.org/packages/Antelcat.AutoGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Antelcat/AutoGen?label=updated)](https://github.com/Antelcat/AutoGen)
![GitHub Repo stars](https://img.shields.io/github/stars/Antelcat/AutoGen?style=social)

## Details

### Info
:::info

Name: **AutoGen**

Auto generate anything you want

Author: Feast Antelcat

NuGet: 
*https://www.nuget.org/packages/Antelcat.AutoGen/*   


You can find more details at ,https://github.com/Antelcat/AutoGen

Source : https://github.com/Antelcat/AutoGen

:::

### Original Readme
:::note

# Antelcat.AutoGen

🇨🇳 [中文](https://github.com/Antelcat/AutoGen/README.zh.md)

Auto generate anything you may want
> ~~unless we can't~~

## Supported

### `Antelcat.AutoGen.ComponentModel` :  

+ #### `[AutoStringTo(string, Accessibility)]` :  

    Auto generate string To extension

    only on `assembly` and `static partial class`

    ![AutoStringTo](https://github.com/Antelcat/AutoGen/docs/GenerateStringTo.png)

+ #### `Mapping` :  

  + #### `[AutoMap(Accessibility)]` :  

    Auto generate mappings between types

    > Only on `partial method`

    ![AutoMapTo](https://github.com/Antelcat/AutoGen/docs/GenerateMap.png)

    > You can use to generate `shallow copy`

  + #### `[MapBetween(fromProperty, toProperty)]` :  

    Specify property mapping between types

    + `By` : Method being called when mapping this property

  + #### `[MapIgnore]` :  

    To be ignored when generate mapping code

  + #### `[MapInclude(property)]` :  

    Explicit include properties when `[MapIgnore]`

  + #### `[MapExclude(string)]` :  

    To be excluded when mapping

  + #### `[MapConstructor(params string[])]` :  

    Specified property to be added in constructor, will auto detect if `null`


+ #### `[AutoFilePath]`:
  
  Auto generate `FilePath` which is `ref readonly struct`

    ```csharp
    void Fun([CallerFilePath] string path = "")
    {
        var directory       = (FilePath)path << 1;
        var full            = directory / "Antelcat.AutoGen.Sample" / "Example.cs";
        var changeExtension = full - 2 + ".g.cs";
    }
    ``` 

+ #### `[AutoDeconstructIndexable]`:

  Auto generate `Deconstruct` method for `IList<>` and custom types

    ```csharp
    [assembly: AutoDeconstructIndexable(16/*default size is 16*/, typeof(Foo))]
  
    int[] list = [1,2,3];
    var (a, b, c) = list;
  
    class Foo{
        public object this[int index] => index;
    }
  
    var (a, b, c, d) = new Foo();
    ```

:::

### About
:::note

Generating function to map DTOs


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AutoGen**
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
	  <PackageReference Include="Antelcat.AutoGen" Version="1.0.0-pre-alpha-7" />
	</ItemGroup>

	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoGen\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **AutoGen** in *Program.cs*

```csharp showLineNumbers 
using mapperDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto= p.ToDTO();
Console.WriteLine(dto.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoGen\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **AutoGen** in *Person.cs*

```csharp showLineNumbers 

public class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoGen\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **AutoGen** in *PersonDTO.cs*

```csharp showLineNumbers 

using Antelcat.AutoGen.ComponentModel.Mapping;

namespace mapperDemo;
public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [MapIgnore]
    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoGen\src\mapperDemo\Extensions.cs" label="Extensions.cs" >

  This is the use of **AutoGen** in *Extensions.cs*

```csharp showLineNumbers 

using Antelcat.AutoGen.ComponentModel.Mapping;

namespace mapperDemo;

public static partial class Extensions
{
    [AutoMap(Extra = [nameof(AfterMap)])]
    public static partial PersonDTO ToDTO(this Person person);

    private static void AfterMap(Person person, PersonDTO personDTO)
    {
        person.ID= personDTO.ID;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoGen\src\mapperDemo\obj\GX\Antelcat.AutoGen.SourceGenerators\Antelcat.AutoGen.SourceGenerators.Generators.Mapping.MapperGenerator\AutoMap__.mapperDemo.Extensions.g.cs" label="AutoMap__.mapperDemo.Extensions.g.cs" >


```csharp showLineNumbers 
// <auto-generated/> By Antelcat.AutoGen
#pragma warning disable
#nullable enable
namespace mapperDemo
{
    partial class Extensions
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Antelcat.AutoGen.SourceGenerators.Generators.Mapping.MapperGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute]
        public static partial global::mapperDemo.PersonDTO ToDTO(this global::Person person)
        {
            var ret = new global::mapperDemo.PersonDTO()
            {
                ID = person.ID,
                FirstName = person.FirstName,
                LastName = person.LastName,
            };
            global::mapperDemo.Extensions.AfterMap(person, ret);
            return ret;
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project AutoGen ](/sources/AutoGen.zip)

:::


### Share AutoGen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoGen&quote=AutoGen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoGen&text=AutoGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoGen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoGen&title=AutoGen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoGen&title=AutoGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoGen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoGen

### In the same category (Mapper) - 6 other generators


#### [AutoDTO](/docs/AutoDTO)


#### [DynamicsMapper](/docs/DynamicsMapper)


#### [MagicMap](/docs/MagicMap)


#### [mapperly](/docs/mapperly)


#### [MapTo](/docs/MapTo)


#### [NextGenMapper](/docs/NextGenMapper)

