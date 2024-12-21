---
sidebar_position: 1130
title: 113 - sourcedepend
description: Generating constructor for DI
slug: /sourcedepend
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# sourcedepend  by Colin Wilmans


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/sourcedepend?label=sourcedepend)](https://www.nuget.org/packages/sourcedepend/)
[![GitHub last commit](https://img.shields.io/github/last-commit/crwsolutions/sourcedepend?label=updated)](https://github.com/crwsolutions/sourcedepend)
![GitHub Repo stars](https://img.shields.io/github/stars/crwsolutions/sourcedepend?style=social)

## Details

### Info
:::info

Name: **sourcedepend**

A source generator for C# that uses Roslyn (the C# compiler) to allow you to generate your constructor for injection during compile time.

Author: Colin Wilmans

NuGet: 
*https://www.nuget.org/packages/sourcedepend/*   


You can find more details at https://github.com/crwsolutions/sourcedepend

Source : https://github.com/crwsolutions/sourcedepend

:::

### Original Readme
:::note

# Source Depend

A source generator for C# that uses [Roslyn](https://github.com/dotnet/roslyn) (the C# compiler) to help you with dependency injection (DI). It saves you from writing the constructor because this will be written for you (during compile time). Just tag the member with a **\[Dependency\]** attribute.

[![NuGet version (sourcedepend)](https://img.shields.io/nuget/v/sourcedepend?color=blue)](https://www.nuget.org/packages/sourcedepend/)
[![License](https://img.shields.io/github/license/crwsolutions/sourcedepend.svg)](https://github.com/crwsolutions/sourcedepend/blob/master/LICENSE.txt)

### Version history

- v0.1\. First implementation.
- v0.2\. Complete rewrite from ISourceGenerator to IIncrementalGenerator, this should boost performance
    + keep sealed and accessibility intact.
- v0.3\. Complete Rewrite: reorganized the code.
    + Allow one level of inheritance. 

## How to use it

Install it and add the attribute to the fields or properties you want be set in your constructor, like so:

```csharp
public partial class ExampleService
{
    [Dependency]
    private readonly AnotherService anotherService;

    [Dependency]
    AnotherService Prop { get; }
}
```

### Alternative assignment

It is also possible that the generated assignment is to an alternative property:

```csharp
public partial class ExampleService
{
    [Dependency(nameof(BindingContext))]
    AnotherService ViewModel => BindingContext as AnotherService;
}
```

### Inheritance

And it is possible to inherit from a base implementation that also uses the **\[Dependency\]** attribute:

```csharp
internal partial class BaseExampleService
{
    [Dependency]
    private readonly IForBaseService _someBaseService;
}

internal partial class ExampleService : BaseExampleService
{

}
```
### Add construction work

Because your constructor is highjacked, there are the alternative methods PreConstruct/PostConstruct to do your construction work:

```csharp
public partial class ExampleService
{
    [Dependency]
    private readonly AnotherService anotherService;

    ///This method will be called before the generated assignments
    partial void PreConstruct()
    {
        Initialize()
    }

    ///This method will be called after the generated assignments
    partial void PostConstruct() => anotherService.ConstructValue = "Hello from post-construct!";
}
```

These samples give the following combined generated code:

```csharp
namespace ConsoleApp
{
    public partial class ExampleService
    {
        public ExampleService(ConsoleApp.IAnotherService anotherService, ConsoleApp.AnotherService prop, ConsoleApp.AnotherService viewModel, ConsoleApp.IForBaseService someBaseService) : base(someBaseService)
        {
            PreConstruct();

            this.anotherService = anotherService;
            Prop = prop;
            BindingContext = viewModel;

            PostConstruct();
        }

        partial void PreConstruct();
        partial void PostConstruct();
    }
}

namespace ConsoleApp
{
    /// <inheritdoc/>
    internal partial class BaseExampleService
    {
        public BaseExampleService(ConsoleApp.IForBaseService someBaseService)
        {
            PreConstruct();

            this._someBaseService = someBaseService;

            PostConstruct();
        }

        partial void PreConstruct();
        partial void PostConstruct();
    }
}
```

## Installing

The package is available [on NuGet](https://www.nuget.org/packages/sourcedepend).
To install from the command line:

```shell
dotnet add package sourcedepend
```

Or use the Package Manager in Visual Studio.

## Contributing

The main supported IDE for development is Visual Studio 2019.

Questions, comments, bug reports, and pull requests are all welcome.
Bug reports that include steps to reproduce (including code) are
preferred. Even better, make them in the form of pull requests.

## Maintainers/Core team

Contributors can be found at the [contributors](https://github.com/crwsolutions/sourcedepend/graphs/contributors) page on Github.

## License

This software is open source, licensed under the MIT License.
See [LICENSE](https://github.com/crwsolutions/sourcedepend/blob/master/LICENSE) for details.
Check out the terms of the license before you contribute, fork, copy or do anything
with the code. If you decide to contribute you agree to grant copyright of all your contribution to this project and agree to
mention clearly if do not agree to these terms. Your work will be licensed with the project at MIT, along the rest of the code.


:::

### About
:::note

Generating constructor for DI


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **sourcedepend**
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
	  <PackageReference Include="SourceDepend" Version="0.3.0" />
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\sourcedepend\src\ConstructorDemo\Program.cs" label="Program.cs" >

  This is the use of **sourcedepend** in *Program.cs*

```csharp showLineNumbers 
using CtorDemo;

var p = new Person("Andrei", "Ignat");

Console.WriteLine(p.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\sourcedepend\src\ConstructorDemo\Person.cs" label="Person.cs" >

  This is the use of **sourcedepend** in *Person.cs*

```csharp showLineNumbers 

namespace CtorDemo;
internal partial class Person
{
    [Dependency]
    public readonly string? FirstName;
    [Dependency]
    public readonly string? LastName;
    
    public string FullName() => $"{FirstName} {LastName}";

    partial void PostConstruct()
    {
        Console.WriteLine("Person constructed");
    }
    partial void PreConstruct()
    {
        Console.WriteLine("Person constructing");
    }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\sourcedepend\src\ConstructorDemo\obj\GX\SourceDepend\SourceDepend.DependenciesGenerator\Dependency.Generated.g.cs" label="Dependency.Generated.g.cs" >


```csharp showLineNumbers 
// <auto-generated />

/// <summary>
/// Injects this item in the constructor. This will also highjack your constructor, so if you have any construct business, use PreConstruct() or PostConstruct() methods.
/// </summary>
/// <remarks>
/// Make sure your class is partial.
/// </remarks>
[System.AttributeUsage(System.AttributeTargets.Field | System.AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
[System.Diagnostics.Conditional("DependencyGenerator_DEBUG")]
internal sealed class DependencyAttribute : System.Attribute
{
    internal DependencyAttribute(string alternativePropertyName = null) { }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\sourcedepend\src\ConstructorDemo\obj\GX\SourceDepend\SourceDepend.DependenciesGenerator\Person_Dependency.g.cs" label="Person_Dependency.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable
namespace CtorDemo
{
    /// <inheritdoc/>
    internal partial class Person
    {
        public Person(string? FirstName, string? LastName)
        {
            PreConstruct();

            this.FirstName = FirstName;
            this.LastName = LastName;

            PostConstruct();
        }

        partial void PreConstruct();
        partial void PostConstruct();
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project sourcedepend ](/sources/sourcedepend.zip)

:::


### Share sourcedepend 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fsourcedepend&quote=sourcedepend" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fsourcedepend&text=sourcedepend:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fsourcedepend" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fsourcedepend&title=sourcedepend" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fsourcedepend&title=sourcedepend&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fsourcedepend" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/sourcedepend

### In the same category (Constructor) - 6 other generators


#### [AutoConstructor](/docs/AutoConstructor)


#### [AutoCtor](/docs/AutoCtor)


#### [AutoDeconstruct](/docs/AutoDeconstruct)


#### [ConstructorGenerator](/docs/ConstructorGenerator)


#### [PrimaryParameter](/docs/PrimaryParameter)


#### [QuickConstructor](/docs/QuickConstructor)

