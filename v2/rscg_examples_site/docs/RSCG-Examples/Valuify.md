---
sidebar_position: 1780
title: 178 - Valuify
description: Generating Equals from properties
slug: /Valuify
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEquals.mdx';

# Valuify  by Paul Martins


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Valuify?label=Valuify)](https://www.nuget.org/packages/Valuify/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MooVC/valuify?label=updated)](https://github.com/MooVC/valuify)
![GitHub Repo stars](https://img.shields.io/github/stars/MooVC/valuify?style=social)

## Details

### Info
:::info

Name: **Valuify**

A .NET Roslyn source generator that enables record-like behavior for classes in projects using C# versions prior to 9.0.

Author: Paul Martins

NuGet: 
*https://www.nuget.org/packages/Valuify/*   


You can find more details at https://github.com/MooVC/valuify

Source: https://github.com/MooVC/valuify

:::

### Original Readme
:::note

# Valuify [![NuGet](https://img.shields.io/nuget/v/Valuify?logo=nuget)](https://www.nuget.org/packages/Valuify/) [![GitHub](https://img.shields.io/github/license/MooVC/Valuify)](https://github.com/MooVC/valuify/LICENSE.md)

Valuify is a .NET Roslyn Source Generator designed to enable record-like behavior for classes in projects using C# versions prior to 9.0. Valuify was created primarily to simplify the engineering associated with the creation of Roslyn Source Generators, with a focus on the caching capabilities associated with the `IIncrementalGenerator`. Valuify ensures that two distinct instances of a given type are considered equal based on their property values, allowing the generator to skip redundant code generation when input states remain unchanged, enhancing performance and reducing the overall footprint of code to be engineered and maintained.

While Valuify is primarily designed with Roslyn Source Generators in mind, it also benefits legacy codebases that lack access to the record type introduced in C# 9.0. When used alongside [Fluentify](https://github.com/MooVC/Fluentify), a complimentary Roslyn Source Generator that provides extension methods for creating projections, classes gain functionality equivalent to the `with` expression in records, preserving immutability while also providing for value-based equality.

## Installation

To install Valuify, use the following command in your package manager console:

```shell
install-package Valuify
```

## Usage

Valuify automatically creates the code required to support property based equality on `partial` classes that have the `Valuify` attribute.

```csharp
using Valuify;

[Valuify]
public partial class Property
{
    public string Name { get; set; }
    public string Type { get; set; }
}
```

Valuify will generate the following code for the above example:

### Equality Operator (==)

The Equality Operator provides the code neccessary to ensure that two instances are deemed equal based on their property values when checked using the == operator. When the type of a property is a scalar, the `global::System.Collections.Generic.EqualityComparer<T>.Default` instance is used t check for equality. When the type of a property implements `System.Collections.IEnumerable`, the `global::Valuify.Internal.SequenceEqualityComparer` is used, when ensures the instance associated with the property is checked for equality based on its contents, rather than its reference.

The following demonstrates the Equality Operator (==) code generated for `Property` type:

```csharp
partial class Property
{
    public static bool operator ==(Property left, Property right)
    {
        if (ReferenceEquals(left, right))
        {
            return true;
        }

        if (ReferenceEquals(left, null) || ReferenceEquals(right, null))
        {
            return false;
        }

        return global::System.Collections.Generic.EqualityComparer<string>.Default.Equals(left.Name, right.Name)
            && global::System.Collections.Generic.EqualityComparer<string>.Default.Equals(left.Type, right.Type);
    }
}
```

The Equality Operator (==) is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.Equality.g.cs`

The Equality Operator (==) will not be generated if the type explicitly defines an alternative implementation.

### Equals Method Override

The Equals Method Override provides the code neccessary to route calls directed towards the `object.Equals(object)` method to the `IEquatable<T>.Equals(T)` method.

The following demonstrates the Equals Method Override code generated for `Property` type:

```csharp
partial class Property
{
    public sealed override bool Equals(object other)
    {
        return Equals(other as Property);
    }
}
```

The Equals Method Override is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.Equals.g.cs`

The Equals Method Override will not be generated if the type explicitly defines an alternative implementation.

### Equatable Interface Annotation

The Equatable Interface Annotation provides the code neccessary to ensure the type declares that it implements `System.IEquatable<T>`.

The following demonstrates the Equatable Interface Annotation code generated for `Property` type:

```csharp
partial class Property
    : IEquatable<Property>
{
}
```

The Equatable Interface Annotation is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.IEquatable.g.cs`

The Equatable Interface Annotation will not be generated if the type already declares that it implements the interface, either explicitly on the type declaration or via its base type.

### Equatable Implementation

The Equatable Implementation provides the code neccessary to implement the `IEquatable<T>.Equals(T)` method, which serves to route calls to the Equality Operator (==) for the type.

The following demonstrates the Equatable Implementation code generated for `Property` type:

```csharp
partial class Property
{
    public bool Equals(Property other)
    {
        return this == other;
    }
}
```

The Equatable Implementation is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.IEquatable.Equals.g.cs`

The Equatable Implementation will not be generated if the type explicitly defines an alternative implementation.

### GetHashCode Method Override

The GetHashCode Method Override provides the code neccessary to override the base `object.GetHashCode()` method to generate a unique, or near-unique hash, based on the values for each property declared by the type. When the type of a property implements `System.Collections.IEnumerable`, the hash will account for the contents, rather than the collection reference. This is achieves using a custom implementation provided by `global::Valuify.Internal.HashCode.Combine(object[])`, which is akin to the [HashCode.Combine](https://learn.microsoft.com/en-us/dotnet/api/system.hashcode.combine?view=net-8.0) implementation, introduced in C# 8.0.

The following demonstrates the GetHashCode Method Override code generated for `Property` type:

```csharp
partial class Property
{
    public sealed override int GetHashCode()
    {
        return global::Valuify.Internal.HashCode.Combine(Name, Type);
    }
}
```

The GetHashCode Method Override is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.GetHashCode.g.cs`

The GetHashCode Method Override will not be generated if the type explicitly defines an alternative implementation.

### Inequality Operator (!=)

The Inequality Operator (!=) provides the code neccessary to ensure that two instances are deemed inequal based on differences in their property values when checked using the != operator. The implementation serves to route calls to the Equality Operator (==).

The following demonstrates the Inequality Operator (!=) code generated for `Property` type:

```csharp
partial class Property
{
    public static bool operator !=(Property left, Property right)
    {
        return !(left == right);
    }
}
```

The Inequality Operator (!=) is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.Inequality.g.cs`

The Inequality Operator (!=) will not be generated if the type explicitly defines an alternative implementation.

### ToString Method Override

The ToString Method Override provides the code neccessary to override the base `object.ToString()` method to generate a unique value based on the the values for each property declared by the type. The output is similar to that produced by the record type, introduced in C# 9.0.

The following demonstrates the ToString Method Override code generated for `Property` type:

```csharp
partial class Property
{
    public sealed override string ToString()
    {
        return string.Format("Property { Name = {0}, Type = {1} }", Name, Type);
    }
}
```

The ToString Method Override is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.ToString.g.cs`

The ToString Method Override will not be generated if the type explicitly defines an alternative implementation.

## Analyzers

Valuify includes several analyzers to assist engineers with its usage. These are:

Rule ID                          | Category | Severity | Notes
:--------------------------------|:---------|:---------|:-------------------------------------------------------------------------
[VALFY01](https://github.com/MooVC/valuify/docs/rules/VALFY01.md) | Usage    | Warning  | Type is not a class
[VALFY02](https://github.com/MooVC/valuify/docs/rules/VALFY02.md) | Usage    | Warning  | Type is not marked as partial
[VALFY03](https://github.com/MooVC/valuify/docs/rules/VALFY02.md) | Design   | Info     | Type does not declare any properties

## Contributing

Contributions are welcome - see the [CONTRIBUTING.md](https://github.com/MooVC/valuify/.github/CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/MooVC/valuify/LICENSE.md) file for details.


:::

### About
:::note

Generating Equals from properties


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Valuify**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Valuify" Version="1.1.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

 
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\Program.cs" label="Program.cs" >

  This is the use of **Valuify** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using GeneratorEqualsDemo;
var p1 = new Person()
{
    ID = 1,
    FirstName = "Andrei",
    LastName = "Ignat"
};
var p2= new Person()
{
    ID = 1,
    FirstName = "Andrei",
    LastName = "Ignat"
};
Console.WriteLine(p1==p2);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\Person.cs" label="Person.cs" >

  This is the use of **Valuify** in *Person.cs*

```csharp showLineNumbers 

namespace GeneratorEqualsDemo;

[Valuify.Valuify]
partial class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
  
    public string? LastName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.AttributeGenerator\ValuifyAttribute.g.cs" label="ValuifyAttribute.g.cs" >


```csharp showLineNumbers 
namespace Valuify
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal sealed class ValuifyAttribute
        : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.Equality.g.cs" label="GeneratorEqualsDemo.Person.Equality.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
    {
        public static bool operator ==(Person left, Person right)
        {
            if (ReferenceEquals(left, right))
            {
                return true;
            }

            if (ReferenceEquals(left, null) || ReferenceEquals(right, null))
            {
                return false;
            }

            return global::System.Collections.Generic.EqualityComparer<int>.Default.Equals(left.ID, right.ID)
                && global::System.Collections.Generic.EqualityComparer<string>.Default.Equals(left.FirstName, right.FirstName)
                && global::System.Collections.Generic.EqualityComparer<string>.Default.Equals(left.LastName, right.LastName);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.Equals.g.cs" label="GeneratorEqualsDemo.Person.Equals.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
    {
        public sealed override bool Equals(object other)
        {
            return Equals(other as Person);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.GetHashCode.g.cs" label="GeneratorEqualsDemo.Person.GetHashCode.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
    {
        public sealed override int GetHashCode()
        {
            return global::Valuify.Internal.HashCode.Combine(ID, FirstName, LastName);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.IEquatable.Equals.g.cs" label="GeneratorEqualsDemo.Person.IEquatable.Equals.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
    {
        public bool Equals(Person other)
        {
            return this == other;
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.IEquatable.g.cs" label="GeneratorEqualsDemo.Person.IEquatable.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
        : IEquatable<Person>
    {
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.Inequality.g.cs" label="GeneratorEqualsDemo.Person.Inequality.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
    {
        public static bool operator !=(Person left, Person right)
        {
            return !(left == right);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.ClassGenerator\GeneratorEqualsDemo.Person.ToString.g.cs" label="GeneratorEqualsDemo.Person.ToString.g.cs" >


```csharp showLineNumbers 
namespace GeneratorEqualsDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial class Person
    {
        public sealed override string ToString()
        {
            return string.Format("Person { ID = {0}, FirstName = {1}, LastName = {2} }", ID, FirstName, LastName);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.HashCodeGenerator\Valuify.Internal.HashCode.g.cs" label="Valuify.Internal.HashCode.g.cs" >


```csharp showLineNumbers 
namespace Valuify.Internal
{
    using System;
    using System.Collections;

    internal static class HashCode
    {
        private const int HashSeed = 0x1505;
        private const int HashPrime = -1521134295;

        public static int Combine(params object[] values)
        {
            int hash = HashSeed;

            foreach (object value in values)
            {
                if (value is IEnumerable && !(value is string))
                {
                    IEnumerable enumerable = (IEnumerable)value;

                    foreach (object element in enumerable)
                    {
                        hash = PerformCombine(hash, element);
                    }
                }
                else
                {
                    hash = PerformCombine(hash, value);
                }
            }

            return hash;
        }

        private static int PerformCombine(int hash, object value)
        {
            int other = GetHashCode(value);

            unchecked
            {
                return (other * HashPrime) + hash;
            }
        }

        private static int GetHashCode(object value)
        {
            int code = 0;

            if (value != null)
            {
                code = value.GetHashCode();
            }

            return code;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Valuify\src\GeneratorEqualsDemo\obj\GX\Valuify\Valuify.SequenceEqualityComparerGenerator\Valuify.Internal.SequenceEqualityComparer.g.cs" label="Valuify.Internal.SequenceEqualityComparer.g.cs" >


```csharp showLineNumbers 
namespace Valuify.Internal
{
    using System;
    using System.Collections;

    internal sealed class SequenceEqualityComparer
    {
        public static readonly SequenceEqualityComparer Default = new SequenceEqualityComparer();

        public bool Equals(IEnumerable left, IEnumerable right)
        {
            if (ReferenceEquals(left, right))
            {
                return true;
            }

            if (ReferenceEquals(left, null) || ReferenceEquals(null, right))
            {
                return false;
            }

            return Equals(left.GetEnumerator(), right.GetEnumerator());
        }

        public int GetHashCode(IEnumerable enumerable)
        {
            return HashCode.Combine(enumerable);
        }

        private static bool Equals(IEnumerator left, IEnumerator right)
        {
            while (left.MoveNext())
            {
                if (!right.MoveNext())
                {
                    return false;
                }

                if (!Equals(left.Current, right.Current))
                {
                    return false;
                }
            }

            return !right.MoveNext();
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Valuify ](/sources/Valuify.zip)

:::


### Share Valuify 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FValuify&quote=Valuify" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FValuify&text=Valuify:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FValuify" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FValuify&title=Valuify" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FValuify&title=Valuify&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FValuify" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Valuify

aaa
<SameCategory />

