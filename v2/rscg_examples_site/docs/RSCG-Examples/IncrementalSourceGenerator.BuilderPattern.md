---
sidebar_position: 2830
title: 283 - IncrementalSourceGenerator.BuilderPattern
description: Generate builder pattern code for classes with many properties
slug: /IncrementalSourceGenerator.BuilderPattern
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBuilder.mdx';

# IncrementalSourceGenerator.BuilderPattern  by Martin Barrett Nielsen


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/IncrementalSourceGenerator.BuilderPattern?label=IncrementalSourceGenerator.BuilderPattern)](https://www.nuget.org/packages/IncrementalSourceGenerator.BuilderPattern/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MartinBarrettNielsen11/Incremental-source-generator-builder-pattern?label=updated)](https://github.com/MartinBarrettNielsen11/Incremental-source-generator-builder-pattern)
![GitHub Repo stars](https://img.shields.io/github/stars/MartinBarrettNielsen11/Incremental-source-generator-builder-pattern?style=social)

## Details

### Info
:::info

Name: **IncrementalSourceGenerator.BuilderPattern**

Incremental source generator that that reduces boilerplate in test object builders 
            by generating the repetitive structure, while enabling developers to focus on the 
            more meaningful, hand-crafted logic via partial classes

Author: Martin Barrett Nielsen

NuGet: 
*https://www.nuget.org/packages/IncrementalSourceGenerator.BuilderPattern/*   


You can find more details at https://github.com/MartinBarrettNielsen11/Incremental-source-generator-builder-pattern

Source: https://github.com/MartinBarrettNielsen11/Incremental-source-generator-builder-pattern

:::

### Author
:::note
Martin Barrett Nielsen 
![Alt text](https://github.com/MartinBarrettNielsen11.png)
:::

## Original Readme
:::note



:::

### About
:::note

Generate builder pattern code for classes with many properties


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **IncrementalSourceGenerator.BuilderPattern**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
	  <Nullable>enable</Nullable>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="IncrementalSourceGenerator.BuilderPattern" Version="1.0.2" />
	  </ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IncrementalSourceGenerator.BuilderPattern\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **IncrementalSourceGenerator.BuilderPattern** in *Program.cs*

```csharp showLineNumbers 
using Builder;

Console.WriteLine("create person builder");

var p = new PersonBuilder()
    .WithFirstName("Andrei")
    .WithLastName("Ignat")
    .Build();
    


Console.WriteLine(p.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IncrementalSourceGenerator.BuilderPattern\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **IncrementalSourceGenerator.BuilderPattern** in *Person.cs*

```csharp showLineNumbers 
using Generator;
namespace Builder;

[Builder(typeof(Person))]
public partial class PersonBuilder
{
    
}

public class Person
{
    public string FirstName \{ get; set; }
    public string LastName \{ get; set; }
    public string FullName() => $"{FirstName} {LastName}";
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IncrementalSourceGenerator.BuilderPattern\src\Builder\obj\GX\Generator\Generator.Generator\BuilderAttribute.g.cs" label="BuilderAttribute.g.cs" >
```csharp showLineNumbers 
#nullable enable
#pragma warning disable CA1813, CA1019, IDE0065, IDE0034, IDE0055

using System;

namespace Generator;

[System.CodeDom.Compiler.GeneratedCode("Generator", "v1")]
[AttributeUsage(AttributeTargets.Class)]
public sealed class BuilderAttribute(Type type) : Attribute
{
    public Type TargetType \{ get; \} = type;
}

#pragma warning restore CA1813, CA1019, IDE0065, IDE0034, IDE0055
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IncrementalSourceGenerator.BuilderPattern\src\Builder\obj\GX\Generator\Generator.Generator\Builder_Person.g.cs" label="Builder_Person.g.cs" >
```csharp showLineNumbers 
#nullable enable
#pragma warning disable IDE0055, IDE0008

using System;
using System.Linq;
using System.Collections.Generic;
using Generator;

namespace Builder;

[System.CodeDom.Compiler.GeneratedCode("Generator", "v1")]
public partial class Person
{
    private Func<Builder.PersonBuilder> _factory = () => new();   
    private readonly List<Action<Builder.PersonBuilder>> _domainRules = new();
    /// <summary> 
    /// Returns configured instance of Builder.PersonBuilder 
    /// </summary>
    public Builder.PersonBuilder Build()
    {
        Builder.PersonBuilder instance = _factory();

        _domainRules.ForEach(action => action(instance));

        return instance;
    }
}

#pragma warning restore IDE0055, IDE0008
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IncrementalSourceGenerator.BuilderPattern\src\Builder\obj\GX\Generator\Generator.Generator\Builder_PersonBuilder.g.cs" label="Builder_PersonBuilder.g.cs" >
```csharp showLineNumbers 
#nullable enable
#pragma warning disable IDE0055, IDE0008

using System;
using System.Linq;
using System.Collections.Generic;
using Generator;

namespace Builder;

[System.CodeDom.Compiler.GeneratedCode("Generator", "v1")]
public partial class PersonBuilder
{
    private Func<Builder.Person> _factory = () => new();   
    private readonly List<Action<Builder.Person>> _domainRules = new();
    private Func<string>? _firstName;
    private Func<string>? _lastName;

    public PersonBuilder WithFirstName(string @firstName)
    {
        return WithFirstName(() => @firstName);
    }
    public PersonBuilder WithFirstName(Func<string> @firstName)
    {
        _firstName = @firstName;
        return this;
    }

    public PersonBuilder WithLastName(string @lastName)
    {
        return WithLastName(() => @lastName);
    }
    public PersonBuilder WithLastName(Func<string> @lastName)
    {
        _lastName = @lastName;
        return this;
    }
    /// <summary> 
    /// Returns configured instance of Builder.Person 
    /// </summary>
    public Builder.Person Build()
    {
        Builder.Person instance = _factory();

        if(_firstName is not null)
            instance.FirstName = _firstName.Invoke();

        if(_lastName is not null)
            instance.LastName = _lastName.Invoke();

        _domainRules.ForEach(action => action(instance));

        return instance;
    }
}

#pragma warning restore IDE0055, IDE0008
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\IncrementalSourceGenerator.BuilderPattern\src\Builder\obj\GX\Generator\Generator.Generator\DomainAssertionExtensions.g.cs" label="DomainAssertionExtensions.g.cs" >
```csharp showLineNumbers 
#pragma warning disable IDE0055, IDE0008
#nullable enable

using System;
using System.Collections.Generic;

namespace Generator;

[System.CodeDom.Compiler.GeneratedCode("Generator", "v1")]
public static class DomainAssertionExtensions
{
    /// <summary>
    /// Adds a domain validation rule to be executed during the build phase.
    /// </summary>
    /// <param name="_domainRules">The list of post-build domain rules.</param>
    /// <param name="predicate">A function that returns true when the entity violates a rule.</param>
    /// <param name="errorMessage">The error message that will be thrown if the rule fails.</param>
    public static void AddDomainRule<TEntity>(
        this List<Action<TEntity>> _domainRules,
        Func<TEntity, bool> predicate,
        string errorMessage)
    {
        _domainRules.Add(e =>
        {
            if (predicate(e))
                throw new InvalidOperationException(errorMessage);
        });
    }
}

#pragma warning restore IDE0055, IDE0008
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project IncrementalSourceGenerator.BuilderPattern ](/sources/IncrementalSourceGenerator.BuilderPattern.zip)

:::


### Share IncrementalSourceGenerator.BuilderPattern 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIncrementalSourceGenerator.BuilderPattern&quote=IncrementalSourceGenerator.BuilderPattern" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIncrementalSourceGenerator.BuilderPattern&text=IncrementalSourceGenerator.BuilderPattern:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIncrementalSourceGenerator.BuilderPattern" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIncrementalSourceGenerator.BuilderPattern&title=IncrementalSourceGenerator.BuilderPattern" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIncrementalSourceGenerator.BuilderPattern&title=IncrementalSourceGenerator.BuilderPattern&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FIncrementalSourceGenerator.BuilderPattern" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/IncrementalSourceGenerator.BuilderPattern

<SameCategory />

