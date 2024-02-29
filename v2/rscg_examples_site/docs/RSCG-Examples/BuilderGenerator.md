---
sidebar_position: 660
title: 66 - BuilderGenerator
description: Generating Builder class for an object
slug: /BuilderGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# BuilderGenerator  by Mell Grubb


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/BuilderGenerator?label=BuilderGenerator)](https://www.nuget.org/packages/BuilderGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MelGrubb/BuilderGenerator?label=updated)](https://github.com/MelGrubb/BuilderGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/MelGrubb/BuilderGenerator?style=social)

## Details

### Info
:::info

Name: **BuilderGenerator**

Generates builder classes for testing and/or seed data.

Author: Mell Grubb

NuGet: 
*https://www.nuget.org/packages/BuilderGenerator/*   


You can find more details at https://github.com/MelGrubb/BuilderGenerator

Source : https://github.com/MelGrubb/BuilderGenerator

:::

### Original Readme
:::note

[![Nuget](https://img.shields.io/nuget/dt/buildergenerator)](https://www.nuget.org/packages/BuilderGenerator/)
[![GitHub](https://img.shields.io/github/license/melgrubb/buildergenerator)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/melgrubb/buildergenerator)](https://github.com/MelGrubb/BuilderGenerator/issues)
[![CI](https://github.com/MelGrubb/BuilderGenerator/actions/workflows/ci.yml/badge.svg)](https://github.com/MelGrubb/BuilderGenerator/actions/workflows/ci.yml)
[![Discord](https://img.shields.io/discord/813785114722697258?logo=discord&logoColor=white)](https://discord.com/channels/813785114722697258/1099524153436012694)

# Builder Generator #

This is a .Net Source Generator designed to add "Builders" to your projects. [Builders](https://en.wikipedia.org/wiki/Builder_pattern) are an object creation pattern, similar to the [Object Mother](https://martinfowler.com/bliki/ObjectMother.html) pattern. Object Mothers and Builders are most commonly used to create objects for testing, but they can be used anywhere you want "canned" objects.

For more complete documentation, please see the [documentation site](https://melgrubb.github.io/BuilderGenerator/) or the raw [documentation source](https://github.com/MelGrubb/BuilderGenerator/blob/main/docs/index.md).

## Known Issues ##

This project has moved to the .Net 6 version of source generators, which unfortuntely means that it's incompatible with Visual Studio 2019. It's also breaking the GitHub build pipeline at the moment. It all seems to work just fine in VS2022 though. If you're stuck on .Net 5 and VS2019, you can always use the v1.x series, although its usage is different.

## Installation ##

BuilderGenerator is installed as an analyzer via NuGet package (https://www.nuget.org/packages/BuilderGenerator/). You can find it through the "Manage NuGet Packages" dialog in Visual Studio, or from the command line.

```ps
Install-Package BuilderGenerator
```

## Usage ##

After installation, create a partial class to define your builder in. Decorate it with the ```BuilderFor``` attribute, specifying the type of class that the builder is meant to build (e.g. ```[BuilderFor(typeof(Foo))]```. Define any factory and helper methods in this partial class. Meanwhile, another partial class definition will be auto-generated which contains all the "boring" parts such as the backing fields and "with" methods.

## Version History ##
- v2.3.0
    - Major caching and performance improvements
    - Internal code cleanup
    - Conversion of templates to embedded resources

- v2.2.0
  - Changed generated file extension to .g.cs

- v2.0.7
  - Fixed #13, NetStandard2.0 compatibility

- v2.0.6
  - Fixed #12, Generated files now marked with auth-generated header

- v2.0.5
  - Fixed #14, duplicate properties

- v2.0.3
  - Attempting to fix NuGet packaging problems

- v2.0.2
  - Setters for base class properties rendering properly

- v2.0.1
  - Improved error handling

- v2.0.0
  - Updated to .Net 6 and IIncrementalGenerator (See note above about incompatibility with VS2019)
  - Changed usage pattern from marking target classes with attributes to marking partial builder classes

- v1.2
  - Solution reorganization
  - Version number synchronization
  - Automated build pipeline

- v1.0
  - First major release

- v0.5
  - Public beta
  - Working NuGet package
  - Customizable templates

## Roadmap ##

- Read-only collection support in default templates
- Attribute-less generation of partial classes
- Completed documentation
- Unit tests for generation components

## Attributions ##

The BuilderGenerator logo includes [tools](https://thenounproject.com/term/tools/11192) by John Caserta from the Noun Project.


:::

### About
:::note

Generating Builder class for an object


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **BuilderGenerator**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="BuilderGenerator" Version="2.3.0" />
	  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuilderGenerator\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **BuilderGenerator** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person();
pOld.FirstName = "Andrei";
pOld.LastName = "Ignat";
pOld.MiddleName = "G";
var build = new PersonBuilder()
    .WithFirstName(pOld.FirstName)
    .WithMiddleName("")
    .WithLastName(pOld.LastName)
    ;
    
var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuilderGenerator\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **BuilderGenerator** in *Person.cs*

```csharp showLineNumbers 
namespace Builder;
public class Person
{
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuilderGenerator\src\Builder\PersonBuilder.cs" label="PersonBuilder.cs" >

  This is the use of **BuilderGenerator** in *PersonBuilder.cs*

```csharp showLineNumbers 
namespace Builder;

[BuilderGenerator.BuilderFor(typeof(Person))]
public partial class PersonBuilder
{
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuilderGenerator\src\Builder\obj\GX\BuilderGenerator\BuilderGenerator.BuilderGenerator\BuilderBaseClass.cs" label="BuilderBaseClass.cs" >


```csharp showLineNumbers 
#nullable disable

namespace BuilderGenerator
{
    /// <summary>Base class for object builder classes.</summary>
    /// <typeparam name="T">The type of the objects built by this builder.</typeparam>
    public abstract class Builder<T> where T : class
    {
        /// <summary>Gets or sets the object returned by this builder.</summary>
        /// <value>The constructed object.</value>
        #pragma warning disable CA1720 // Identifier contains type name
        protected System.Lazy<T> Object { get; set; }
        #pragma warning restore CA1720 // Identifier contains type name

        /// <summary>Builds the object instance.</summary>
        /// <returns>The constructed object.</returns>
        public abstract T Build();

        protected virtual void PostProcess(T value)
        {
        }

        /// <summary>Sets the object to be returned by this instance.</summary>
        /// <param name="value">The object to be returned.</param>
        /// <returns>A reference to this builder instance.</returns>
        public Builder<T> WithObject(T value)
        {
            Object = new System.Lazy<T>(() => value);

            return this;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuilderGenerator\src\Builder\obj\GX\BuilderGenerator\BuilderGenerator.BuilderGenerator\BuilderForAttribute.cs" label="BuilderForAttribute.cs" >


```csharp showLineNumbers 
namespace BuilderGenerator
{
    [System.AttributeUsage(System.AttributeTargets.Class)]
    public class BuilderForAttribute : System.Attribute
    {
        public bool IncludeInternals { get; }
        public System.Type Type { get; }

        public BuilderForAttribute(System.Type type, bool includeInternals = false)
        {
            IncludeInternals = includeInternals;
            Type = type;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BuilderGenerator\src\Builder\obj\GX\BuilderGenerator\BuilderGenerator.BuilderGenerator\PersonBuilder.g.cs" label="PersonBuilder.g.cs" >


```csharp showLineNumbers 
#nullable disable

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by BuilderGenerator at 2024-02-04T20:27:28 in 33.1967ms.
// </auto-generated>
//------------------------------------------------------------------------------
using System.CodeDom.Compiler;


namespace Builder
{
    public partial class PersonBuilder : BuilderGenerator.Builder<Builder.Person>
    {
        public System.Lazy<string> FirstName = new System.Lazy<string>(() => default(string));
        public System.Lazy<string> LastName = new System.Lazy<string>(() => default(string));
        public System.Lazy<string?> MiddleName = new System.Lazy<string?>(() => default(string?));

        public override Builder.Person Build()
        {
            if (Object?.IsValueCreated != true)
            {
                Object = new System.Lazy<Builder.Person>(() =>
                {
                    var result = new Builder.Person
                    {
                        FirstName = FirstName.Value,
                        LastName = LastName.Value,
                        MiddleName = MiddleName.Value,
                    };

                    return result;
                });

                PostProcess(Object.Value);
            }

            return Object.Value;
        }

        public PersonBuilder WithFirstName(string value)
        {
            return WithFirstName(() => value);
        }

        public PersonBuilder WithFirstName(System.Func<string> func)
        {
            FirstName = new System.Lazy<string>(func);
            return this;
        }

        public PersonBuilder WithoutFirstName()
        {
            FirstName = new System.Lazy<string>(() => default(string));
            return this;
        }

        public PersonBuilder WithLastName(string value)
        {
            return WithLastName(() => value);
        }

        public PersonBuilder WithLastName(System.Func<string> func)
        {
            LastName = new System.Lazy<string>(func);
            return this;
        }

        public PersonBuilder WithoutLastName()
        {
            LastName = new System.Lazy<string>(() => default(string));
            return this;
        }

        public PersonBuilder WithMiddleName(string? value)
        {
            return WithMiddleName(() => value);
        }

        public PersonBuilder WithMiddleName(System.Func<string?> func)
        {
            MiddleName = new System.Lazy<string?>(func);
            return this;
        }

        public PersonBuilder WithoutMiddleName()
        {
            MiddleName = new System.Lazy<string?>(() => default(string?));
            return this;
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project BuilderGenerator ](/sources/BuilderGenerator.zip)

:::


### Share BuilderGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&quote=BuilderGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&text=BuilderGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&title=BuilderGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator&title=BuilderGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBuilderGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/BuilderGenerator

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

