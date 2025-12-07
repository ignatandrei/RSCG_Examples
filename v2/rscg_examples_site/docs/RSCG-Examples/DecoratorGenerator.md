---
sidebar_position: 2420
title: 242 - DecoratorGenerator
description: adding decorator for classes/ interfaces
slug: /DecoratorGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDecorator.mdx';

# DecoratorGenerator  by Leopoldo Fu


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/DecoratorGenerator?label=DecoratorGenerator)](https://www.nuget.org/packages/DecoratorGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/CodingFlow/decorator-generator?label=updated)](https://github.com/CodingFlow/decorator-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/CodingFlow/decorator-generator?style=social)

## Details

### Info
:::info

Name: **DecoratorGenerator**

Source generator for decorator pattern boilerplate code in C#.

When implementing the decorator pattern in C#, it requires adding boilerplate code for every interface that needs to support decorators, namely the abstract class. Boilerplate is tedious to write and error-prone. This source generator solves this problem by automatically generating the abstract class. It only needs to be told which interfaces it should generate the abstract class for.

Author: Leopoldo Fu

NuGet: 
*https://www.nuget.org/packages/DecoratorGenerator/*   


You can find more details at https://github.com/CodingFlow/decorator-generator

Source: https://github.com/CodingFlow/decorator-generator

:::

### Author
:::note
Leopoldo Fu 
![Alt text](https://github.com/CodingFlow.png)
:::

### Original Readme
:::note

# Decorator Generator

[![Nuget](https://img.shields.io/nuget/v/DecoratorGenerator)](https://www.nuget.org/packages/DecoratorGenerator)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/CodingFlow/decorator-generator/pull-request.yml)
[![Nuget](https://img.shields.io/nuget/dt/DecoratorGenerator)](https://www.nuget.org/packages/DecoratorGenerator)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/CodingFlow)](https://github.com/sponsors/CodingFlow)

Source generator for decorator pattern boilerplate code in C#.

When implementing the [decorator pattern in C#](https://en.wikipedia.org/wiki/Decorator_pattern#C#), it requires adding boilerplate code for every interface that needs to support decorators, namely the abstract class. Boilerplate is tedious to write and error-prone. This source generator solves this problem by automatically generating the abstract class. It only needs to be told which interfaces it should generate the abstract class for.

![decorator-pattern-uml](https://user-images.githubusercontent.com/3643313/220009438-a2ef1990-af1e-4b56-a5c9-b3f1aed2d80f.png)

# Getting Started

## Installation

Add the library via NuGet to the project(s) that you want to auto-generate abstract decorator classes for:

- Either via Project > Manage NuGet Packages... / Browse / search for decorator-generator / Install
- Or by running a command in the Package Manager Console

```c#
Install-Package DecoratorGenerator
```

## Usage

Add a `Decorate` attribute to the interface:

```c#
using DecoratorGenerator;

namespace SampleLibrary;

[Decorate]
public interface ICat
{
    string Meow();
}
```

Since this library is an [incremental source generator](https://github.com/dotnet/roslyn/blob/d8c21d64ca958840bdaa2898cb2324397dc57bbb/docs/features/incremental-generators.md), the abstract class should be generated after saving the changes to interface's file. The generated class will be named after the interface, but without the `I` prefix. In this case, since the interface is `ICat` the class will be `CatDecorator`. Then create your decorator class as usual:

```c#
namespace SampleLibrary;

public class BarkingCat : CatDecorator
{
    public BarkingCat(ICat cat) : base(cat)
    {

    }

    public override string Meow()
    {
        return $"woof woof - {base.Meow()}";
    }
}

```

Example usage of the decorator:

```c#
using SampleLibrary;

namespace SampleApp;

partial class Program
{

    static void Main(string[] args)
    {
        var cat = new BarkingCat(new Cat());
        var sound = cat.Meow();

        Console.WriteLine(sound);
    }

}
```

# Configuration

## List of Target Interfaces in a Config file

To generate decorator abstract classes for third party interfaces, Decorator Generator will look for a struct named `WrapperList` and generate classes of the types in the fields of the `WrapperList`:

```c#
using Amazon.DynamoDBv2.DataModel;

public struct WrapperList
{
    // name the field whatever you want, the name isn't used, only the type is used.
    IDynamoDBContext dynamoDBContext;
}
```

In this case, it will generate a class for `IDynamoDBContext` called `DynamoDBContextDecorator`. This feature will also work for your own interfaces if you prefer this approach instead of using the attribute.


:::

### About
:::note

adding decorator for classes/ interfaces


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DecoratorGenerator**
```xml showLineNumbers {14}
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
	  <PackageReference Include="DecoratorGenerator" Version="0.3.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DecoratorGenerator\src\DecoratorDemo\Program.cs" label="Program.cs" >

  This is the use of **DecoratorGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using DecoratorDemo;

Console.WriteLine("Hello, World!");
IPerson person = new Person();
person = new LogPerson(person);
person.FirstName = "Andrei";
person.LastName = "Ignat";
Console.WriteLine(person.FullName());
var birthDate = new DateTime(1970, 4, 16);
var age = await person.CalculateAgeAsync(birthDate);
Console.WriteLine($"Age is {age}");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DecoratorGenerator\src\DecoratorDemo\Person.cs" label="Person.cs" >

  This is the use of **DecoratorGenerator** in *Person.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;

namespace DecoratorDemo;

internal class Person : IPerson
{
    public string FirstName \{ get; set; \} = string.Empty;
    public string LastName \{ get; set; \} = string.Empty;
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
    public async Task<int> CalculateAgeAsync(DateTime birthDate)
    {
        await Task.Delay(100); // Simulate async work
        var today = DateTime.Today;
        var age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age)) age--;
        return age;
    }

}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DecoratorGenerator\src\DecoratorDemo\IPerson.cs" label="IPerson.cs" >

  This is the use of **DecoratorGenerator** in *IPerson.cs*

```csharp showLineNumbers 
using DecoratorGenerator;
using System;
using System.Collections.Generic;
using System.Text;

namespace DecoratorDemo;

[Decorate]
public interface IPerson
{
    public string FirstName \{ get; set; }
    public string LastName \{ get; set; }
    public string FullName();

    public Task<int> CalculateAgeAsync(DateTime birthDate);
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DecoratorGenerator\src\DecoratorDemo\LogPerson.cs" label="LogPerson.cs" >

  This is the use of **DecoratorGenerator** in *LogPerson.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;

namespace DecoratorDemo;

internal class LogPerson : PersonDecorator
{
    public LogPerson(IPerson person) : base(person)
    {
    }
    public override string FirstName
    {
        get
        {
            Console.WriteLine($"FirstName getter called, returning {base.FirstName}");
            return base.FirstName;
        }
        set
        {
            Console.WriteLine($"FirstName setter called, setting value to {value}");
            base.FirstName = value;
        }
    }
    public override string FullName()
    {
        Console.WriteLine($"FullName() called for {FirstName} {LastName}" );
        return base.FullName();
    }
    public override async Task<int> CalculateAgeAsync(DateTime birthDate)
    {
        Console.WriteLine($"CalculateAgeAsync called with birthDate: {birthDate.ToShortDateString()}");
        return await base.CalculateAgeAsync(birthDate);
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DecoratorGenerator\src\DecoratorDemo\obj\GX\DecoratorGenerator\DecoratorGenerator.Main\PersonDecorator.generated.cs" label="PersonDecorator.generated.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable restore
namespace DecoratorDemo;

public abstract class PersonDecorator : IPerson
{
    private IPerson person;

    protected PersonDecorator(IPerson person) {
        this.person = person;
    }

    public virtual string FirstName \{ get => person.FirstName; set => person.FirstName = value; }

    public virtual string LastName \{ get => person.LastName; set => person.LastName = value; }

    public virtual string FullName() {
        return person.FullName();
    }

    public virtual System.Threading.Tasks.Task<int> CalculateAgeAsync(System.DateTime birthDate) {
        return person.CalculateAgeAsync(birthDate);
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project DecoratorGenerator ](/sources/DecoratorGenerator.zip)

:::


### Share DecoratorGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDecoratorGenerator&quote=DecoratorGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDecoratorGenerator&text=DecoratorGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDecoratorGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDecoratorGenerator&title=DecoratorGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDecoratorGenerator&title=DecoratorGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDecoratorGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DecoratorGenerator

<SameCategory />

