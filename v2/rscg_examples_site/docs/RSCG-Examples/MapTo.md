---
sidebar_position: 670
title: 67 - MapTo
description: AutoGenerate Mapping
slug: /MapTo
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMapper.mdx';

# MapTo  by Mohammedreza Taikandi


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MapTo?label=MapTo)](https://www.nuget.org/packages/MapTo/)
[![GitHub last commit](https://img.shields.io/github/last-commit/mrtaikandi/MapTo?label=updated)](https://github.com/mrtaikandi/MapTo)
![GitHub Repo stars](https://img.shields.io/github/stars/mrtaikandi/MapTo?style=social)

## Details

### Info
:::info

Name: **MapTo**

An object to object mapping generator using Roslyn source generator.

Author: Mohammedreza Taikandi

NuGet: 
*https://www.nuget.org/packages/MapTo/*   


You can find more details at https://github.com/mrtaikandi/MapTo

Source: https://github.com/mrtaikandi/MapTo

:::

### Original Readme
:::note

# MapTo
[![Nuget](https://img.shields.io/nuget/v/mapto?logo=nuget)](https://www.nuget.org/packages/MapTo/)
![Publish Packages](https://github.com/mrtaikandi/MapTo/workflows/Publish%20Packages/badge.svg)

A convention based object to object mapper using [Roslyn source generator](https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.md).

MapTo is a library that programmatically generates the necessary code to map one object to another during compile-time. It eliminates the need to use reflection to map objects and makes it much faster in runtime. It provides compile-time safety checks and ease of use by leveraging extension methods.


## Installation
```
dotnet add package MapTo --prerelease
```

## Usage
Unlike other libraries that require a separate class to define the mappings, `MapTo` uses attributes to define and instruct it on generating the mappings. To start, declare the target class and annotate it with the `MapFrom` attribute to specify the source class.

```c#
using MapTo;

namespace App.ViewModels;

[MapFrom(typeof(App.Data.Models.User))]
public class UserViewModel 
{
    public string FirstName { get; init; }

    public string LastName { get; init; }
    
    [IgnoreProperty]
    public string FullName { get; set; }
}
```

To get an instance of `UserViewModel` from the `User` class, you can use the generated extension method:

```c#
var user = new User(id: 10) { FirstName = "John", LastName = "Doe" };

var vm = user.MapToUserViewModel(); // A generated extension method for User class.
```

Sometimes, the target class (UserViewModel in this case) might have read-only properties that need to be set during the mapping. To do that, you can define the properties without setters and declare the target class as partial. Changing the class to partial will allow the `MapTo` generator to create the necessary constructor to initialize the read-only properties.

```c#
[MapFrom(typeof(App.Data.Models.User))]
public partial class UserViewModel 
{
    public int Id { get; }
    
    public string FirstName { get; init; }

    public string LastName { get; init; }
    
    [IgnoreProperty]
    public string FullName { get; set; }
}
```

## Available Attributes

### MapFrom
As mentioned above, this attribute is used to specify the source class. It also can be used to specify custom methods to run on before or after the mapping process.

```c#
[MapFrom(typeof(App.Data.Models.User), BeforeMap = nameof(RunBeforeMap), AfterMap = nameof(RunAfterMap))]
public partial class UserViewModel
{
    public int Id { get; }

    ...
    
    // The BeforeMap method can also return a `User` type. If so, 
    // the returned value will be used as the source object.
    // Or it can return `null` to skip the mapping process and return `null` to 
    // the extension method's caller.
    private static void RunBeforeMap(User? source) { /* ... */ }
    
    private static void RunAfterMap(UserViewModel target) { /* ... */ }
}
```

### IgnoreProperty
By default, MapTo will include all properties with the same name (case-sensitive), whether read-only or not, in the mapping unless annotating them with the `IgnoreProperty` attribute.
```c#
[IgnoreProperty]
public string FullName { get; set; }
``` 

### MapProperty
This attribute gives you more control over how the annotated property should get mapped. For instance, if the annotated property should use a property in the source class with a different name.

```c#
[MapProperty(From = "Id")]
public int Key { get; set; }
```

### PropertyTypeConverter
A compilation error gets raised by default if the source and destination properties types are not implicitly convertible, but to convert the incompatible source type to the desired destination type, `PropertyTypeConverterAttribute` can be used.

This attribute will accept a static method in the target class or another class to convert the source type to the destination type. The method must have the following signature:

```c#
public static TDestination Convert(TSource source)

// or

public static TDestination Convert(TSource source, object[]? parameters)
```

```c#
[MapFrom(typeof(User))]
public partial class UserViewModel
{
    public DateTimeOffset RegisteredAt { get; set; }
    
    [IgnoreProperty]
    public ProfileViewModel Profile { get; set; }
    
    [MapProperty(From = nameof(User.Id))]    
    [PropertyTypeConverter(nameof(IntToHexConverter))]
    public string Key { get; }

    private static string IntToHexConverter(int source) => $"{source:X}"; // The converter method.
}
```


:::

### About
:::note

AutoGenerate Mapping


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MapTo**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
	  <PackageReference Include="MapTo" Version="0.9.1" />
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapTo\src\mapperDemo\Program.cs" label="Program.cs" >

  This is the use of **MapTo** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using mapperlyDemo;
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
PersonDTO dto = p.MapToPersonDTO();
Console.WriteLine(dto.FullName);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapTo\src\mapperDemo\Person.cs" label="Person.cs" >

  This is the use of **MapTo** in *Person.cs*

```csharp showLineNumbers 

public class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapTo\src\mapperDemo\PersonDTO.cs" label="PersonDTO.cs" >

  This is the use of **MapTo** in *PersonDTO.cs*

```csharp showLineNumbers 
using MapTo;

namespace mapperlyDemo;
[MapFrom(typeof(Person))]
public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    [IgnoreProperty]
    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MapTo\src\mapperDemo\obj\GX\MapTo\MapTo.MapToGenerator\mapperlyDemo.PersonDTO.g.cs" label="mapperlyDemo.PersonDTO.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace mapperlyDemo;

[global::System.CodeDom.Compiler.GeneratedCodeAttribute("MapTo", "0.9.1.51471")]
public static class PersonMapToExtensions
{
    [return: global::System.Diagnostics.CodeAnalysis.NotNullIfNotNull("person")]
    public static global::mapperlyDemo.PersonDTO? MapToPersonDTO(this Person? person)
    {
        if (ReferenceEquals(person, null))
        {
            return null;
        }

        return new PersonDTO
        {
            ID = person.ID,
            FirstName = person.FirstName,
            LastName = person.LastName
        };
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project MapTo ](/sources/MapTo.zip)

:::


### Share MapTo 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapTo&quote=MapTo" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapTo&text=MapTo:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapTo" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapTo&title=MapTo" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapTo&title=MapTo&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMapTo" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MapTo

aaa
<SameCategory />

