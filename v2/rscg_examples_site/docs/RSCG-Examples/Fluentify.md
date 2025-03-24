---
sidebar_position: 1540
title: 154 - Fluentify
description: Generate fluent builder
slug: /Fluentify
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Fluentify  by Paul Martins


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Fluentify?label=Fluentify)](https://www.nuget.org/packages/Fluentify/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MooVC/fluentify?label=updated)](https://github.com/MooVC/fluentify)
![GitHub Repo stars](https://img.shields.io/github/stars/MooVC/fluentify?style=social)

## Details

### Info
:::info

Name: **Fluentify**

Package Description

Author: Paul Martins

NuGet: 
*https://www.nuget.org/packages/Fluentify/*   


You can find more details at https://github.com/MooVC/fluentify

Source : https://github.com/MooVC/fluentify

:::

### Original Readme
:::note

# Fluentify [![NuGet](https://img.shields.io/nuget/v/Fluentify?logo=nuget)](https://www.nuget.org/packages/Fluentify/) [![GitHub](https://img.shields.io/github/license/MooVC/Fluentify)](https://github.com/MooVC/fluentify/LICENSE.md)

Fluentify is a .NET Roslyn Source Generator designed to automate the creation of Fluent APIs. This tool enables engineers to rapidly develop rich, expressive, and maintainable APIs with ease. Utilizing Fluentify allows for cleaner code, easier maintenance, and more expressive interactions within your C# .NET applications.

If you are unfamiliar with Fluent Builder pattern, please review [Building Complex Objects in a Simple Way with C#](https://www.youtube.com/watch?v=kjxf3T4tRh4) by [Gui Ferreira](https://www.youtube.com/@gui.ferreira). Using its example, with Fluentify, we can transform how we configure movies from this:

```csharp
var movie = new Movie
{
    Actors =
    [
        new Actor
        {
            Birthday = 1940,
            FirstName = "Patrick",
            Surname = "Stewart",
        },
    ],
    Genre = Genre.SciFi,
    ReleasedOn = new DateOnly(1996, 12, 13),
    Title = "Star Trek: First Contact",
};
```

to this:

```csharp
var movie = new Movie()
   .OfGenre(Genre.SciFi)
   .WithTitle("Star Trek: First Contact")
   .ReleasedOn(new DateOnly(1996, 12, 13))
   .WithActors(actor => actor
       .WithFirstName("Patrick")
       .WithSurname("Stewart")
       .BornIn(1940));
```

This document will use the `Movie` example to describe how the features of Fluentify can be used to make the illustrated use of the Fluent Builder pattern possible. 

## Installation

To install Fluentify, use the following command in your package manager console:

```shell
install-package Fluentify
```

## Usage

Fluentify automatically creates extension methods for each property on types that have the `Fluentify` attribute, supporting both `class` and `record` types.

### Record Type Usage

```csharp
[Fluentify]
public record Actor(int Birthday, string FirstName, string Surname);

[Fluentify]
public record Movie(Actor[] Actors, Genre Genre, DateOnly ReleasedOn, string Title);
```

Marking the `record` type as `partial` will generate a default constructor, allowing for the `record` to be instantiated without first initializing the properties.

```csharp
[Fluentify]
public partial record Actor(int Birthday, string FirstName, string Surname);

// Allows for instantiation without property initialization
var actor = new Actor();
...
```

### Class Type Usage

```csharp
[Fluentify]
public class Actor
{
    public int Birthday { get; init; }
    public string FirstName { get; init; }
    public string Surname { get; init; }
}

[Fluentify]
public class Movie
{
    public Actor[] Actors { get; init; }
    public Genre Genre { get; init; }
    public DateOnly ReleasedOn { get; init; }
    public string Title { get; init; }
}
```

A `class` type is supported as long as the type has an accessible default constructor (implicit or explicit).

## Immutability

The generated extension methods preserve immutability, providing a new instance with the specified value applied to the associated property.

```csharp
var original = new Actor { Birthday = 1942 };
var @new = original.WithBirthday(1975);

Console.WriteLine(original.Birthday); // Displays 1942
Console.WriteLine(@new.Birthday);     // Displays 1975
```

## Auto Instantiation 

The value associated with a given property can be automatically instantiated, as long as that type associated with the property adheres to the `new()` constraint. A second extension method is generated for the property, accepting a `Func<T, T>` delegate as its parameter, which allows for the newly instantiated value to be configured before being applied.

```csharp
_ = movie.WithActors(actor => actor
    .WithBirthday(1940)
    .WithFirstName("Patrick")
    .WithSurname("Stewart"));
```

## Collection Parameterization 

Values can be appended to a list as long as the property type is `T[]`, `IEnumerable<T>`, `IReadOnlyCollection<T>`, `IReadOnlyList<T>`. Property types that derive from `ICollection<T>` and adhere to the `new()` constraint are also supported. Unlike with scalar properties, the generated extension method accepts a `params T[]`, allowing for one or more values to be specified in a single invocation.

```csharp
var original = new Movie { Actors = [picard] };
var @new = original.WithActors(worf);

Console.WriteLine(original.Actors.Length); // Displays 1
Console.WriteLine(@new.Actors.Length);     // Displays 2
```

## Custom Descriptors

The name of the generated extension method(s) can be customized via the `Descriptor` attribute.

### Record Type Usage

```csharp
[Fluentify]
public partial record Actor(
    [Descriptor("BornIn")] int Birthday,
    string FirstName,
    string Surname);

[Fluentify]
public partial record Movie(
    Actor[] Actors,
    [Descriptor("OfGenre")] Genre Genre,
    [Descriptor("ReleasedOn")] DateOnly ReleasedOn,
    string Title);
```

### Class Type Usage

```csharp
[Fluentify]
public class Actor
{
    [Descriptor("BornIn")]
    public int Birthday { get; init; }
    
    public string FirstName { get; init; }

    public string Surname { get; init; }
}

[Fluentify]
public class Movie
{
    public Actor[] Actors { get; init; }
    
    [Descriptor("OfGenre")] 
    public Genre Genre { get; init; }
    
    [Descriptor("ReleasedOn")]
    public DateOnly ReleasedOn { get; init; }
    
    public string Title { get; init; }
}
```

This allows for greater alignment with domain semantics:

```csharp
var movie = new Movie()
   .OfGenre(Genre.SciFi)
   .WithTitle("Star Trek: First Contact")
   .ReleasedOn(new DateOnly(1996, 12, 13))
   .WithActors(actor => actor
       .WithFirstName("Patrick")
       .WithSurname("Stewart")
       .BornIn(1940));
```

When no custom descriptor is specified, the extension method(s) will use the following pattern for all property types, except `bool`:

`With{PropertyName}`

For `bool`, the extension method will utilize the same name as the property.

## Property Exclusion

Specific properties can be excluded from generating Fluentify extension method(s) using the `Ignore` attribute:

### Record Type Usage

```csharp
[Fluentify]
public record Actor([Ignore] int Birthday, string FirstName, string Surname);
```

### Class Type Usage

```csharp
[Fluentify]
public class Actor
{
    [Ignore]
    public int Birthday { get; init; }
    public string FirstName { get; init; }
    public string Surname { get; init; }
}
```

This will result in an error if you try to use the ignored property in the chain:

```csharp
_ = actor
    .WithBirthday(1975) // IntelliSense Error: 'Actor' does not contain a definition for 'WithBirthday'
    .WithFirstName("Avery")
    .WithSurname("Brooks");
```

## Analyzers

Fluentify includes several analyzers to assist engineers with its usage. These are:

Rule ID                          | Category | Severity | Notes
:--------------------------------|:---------|:---------|:-------------------------------------------------------------------------
[FLTFY01](https://github.com/MooVC/fluentify/docs/rules/FLTFY01.md) | Design   | Warning  | Class must have an accessible parameterless constructor to use Fluentify
[FLTFY02](https://github.com/MooVC/fluentify/docs/rules/FLTFY02.md) | Usage    | Info     | Descriptor is disregarded from consideration by Fluentify
[FLTFY03](https://github.com/MooVC/fluentify/docs/rules/FLTFY03.md) | Usage    | Info     | Type does not utilize Fluentify
[FLTFY04](https://github.com/MooVC/fluentify/docs/rules/FLTFY04.md) | Naming   | Warning  | Descriptor must adhere to the naming conventions for Methods
[FLTFY05](https://github.com/MooVC/fluentify/docs/rules/FLTFY05.md) | Usage    | Info     | Type does not utilize Fluentify
[FLTFY06](https://github.com/MooVC/fluentify/docs/rules/FLTFY06.md) | Usage    | Info     | Property is already disregarded from consideration by Fluentify

## Building a Service

Combining Fluentify with additional, custom methods, can assist with the construction of complex types. For example:

```csharp
public class MyService
{
    public MyService(string connectionString, TimeSpan timeout)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(connectionString);
        ArgumentOutOfRangeException.ThrowIfLessThan(timeout.TotalSeconds, 1);

        ConnectionString = connectionString;
        Timeout = timeout;
    }

    public string ConnectionString { get; }

    public TimeSpan Timeout { get; }
}

[Fluentify]
public partial record MyServiceBuilder(
    [Descriptor("ConnectsTo")] string ConnectionString,
    [Descriptor("Waits")] int Timeout)
{
    public static MyServiceBuilder Default => new();
    
    public MyService Build()
    {
        return new MyService(ConnectionString, TimeSpan.FromSeconds(Timeout));
    }
}
```

In this example, a new instance of `MyService` can be created as follows:

```csharp
MyService service = MyServiceBuilder
    .Default
    .ConnectsTo("Some Connection String")
    .Waits(30)
    .Build();
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/MooVC/fluentify/LICENSE.md) file for details.

:::

### About
:::note

Generate fluent builder


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Fluentify**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="Fluentify" Version="1.1.0">
	      <PrivateAssets>all</PrivateAssets>
	      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	    </PackageReference>
	  </ItemGroup>

	  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **Fluentify** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person();
pOld= pOld.WithFirstName("Andrei").WithLastName("Ignat").WithMiddleName("G");

System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **Fluentify** in *Person.cs*

```csharp showLineNumbers 
namespace Builder;
[Fluentify.Fluentify]
public partial class Person
{
    public string FirstName { get; init; }
    public string? MiddleName { get; init; }
    public string LastName { get; init; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.ClassGenerator\Builder.PersonExtensions.WithFirstName.g.cs" label="Builder.PersonExtensions.WithFirstName.g.cs" >


```csharp showLineNumbers 
#if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
#nullable enable
#endif

#pragma warning disable CS8625

namespace Builder
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fluentify.Internal;

    public static partial class PersonExtensions
    {
        public static global::Builder.Person WithFirstName(
            this global::Builder.Person subject,
            string value)
        {
            subject.ThrowIfNull("subject");

            return new global::Builder.Person
            {
                FirstName = value,
                MiddleName = subject.MiddleName,
                LastName = subject.LastName,
            };
        }
    }
}

#pragma warning restore CS8625

#if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
#nullable restore
#endif
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.ClassGenerator\Builder.PersonExtensions.WithLastName.g.cs" label="Builder.PersonExtensions.WithLastName.g.cs" >


```csharp showLineNumbers 
#if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
#nullable enable
#endif

#pragma warning disable CS8625

namespace Builder
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fluentify.Internal;

    public static partial class PersonExtensions
    {
        public static global::Builder.Person WithLastName(
            this global::Builder.Person subject,
            string value)
        {
            subject.ThrowIfNull("subject");

            return new global::Builder.Person
            {
                FirstName = subject.FirstName,
                MiddleName = subject.MiddleName,
                LastName = value,
            };
        }
    }
}

#pragma warning restore CS8625

#if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
#nullable restore
#endif
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.ClassGenerator\Builder.PersonExtensions.WithMiddleName.g.cs" label="Builder.PersonExtensions.WithMiddleName.g.cs" >


```csharp showLineNumbers 
#if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
#nullable enable
#endif

#pragma warning disable CS8625

namespace Builder
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fluentify.Internal;

    public static partial class PersonExtensions
    {
        public static global::Builder.Person WithMiddleName(
            this global::Builder.Person subject,
            string? value)
        {
            subject.ThrowIfNull("subject");

            return new global::Builder.Person
            {
                FirstName = subject.FirstName,
                MiddleName = value,
                LastName = subject.LastName,
            };
        }
    }
}

#pragma warning restore CS8625

#if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
#nullable restore
#endif
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.DescriptorAttributeGenerator\DescriptorAttribute.g.cs" label="DescriptorAttribute.g.cs" >


```csharp showLineNumbers 
namespace Fluentify
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    [AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    internal sealed class DescriptorAttribute
        : Attribute
    {
        public DescriptorAttribute(string value)
        {
            Value = value;
        }

        public string Value { get; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.FluentifyAttributeGenerator\FluentifyAttribute.g.cs" label="FluentifyAttribute.g.cs" >


```csharp showLineNumbers 
namespace Fluentify
{
    using System;

    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal sealed class FluentifyAttribute
        : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.IgnoreAttributeGenerator\IgnoreAttribute.g.cs" label="IgnoreAttribute.g.cs" >


```csharp showLineNumbers 
namespace Fluentify
{
    using System;

    [AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    internal sealed class IgnoreAttribute
        : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\fluentify\src\Builder\obj\GX\Fluentify\Fluentify.InternalExtensionsGenerator\Fluentify.Internal.Extensions.g.cs" label="Fluentify.Internal.Extensions.g.cs" >


```csharp showLineNumbers 
namespace Fluentify.Internal
{
    using System;

    internal static class Extensions
    {
        public static void ThrowIfNull(this object subject, string paramName)
        {
            if (subject == null)
            {
                throw new ArgumentNullException(paramName);
            }
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Fluentify ](/sources/Fluentify.zip)

:::


### Share Fluentify 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFluentify&quote=Fluentify" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFluentify&text=Fluentify:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFluentify" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFluentify&title=Fluentify" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFluentify&title=Fluentify&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFluentify" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Fluentify

### In the same category (Builder) - 4 other generators


#### [Architect.DomainModeling](/docs/Architect.DomainModeling)


#### [BuilderGenerator](/docs/BuilderGenerator)


#### [Hsu.Sg.FluentMember](/docs/Hsu.Sg.FluentMember)


#### [StepwiseBuilderGenerator](/docs/StepwiseBuilderGenerator)

