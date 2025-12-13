---
sidebar_position: 2450
title: 245 - Monify
description: Generate primitive strongly typed wrapper around a single value object
slug: /Monify
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitivePrimitiveObsession.mdx';

# Monify  by Paul Martin


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Monify?label=Monify)](https://www.nuget.org/packages/Monify/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MooVC/monify?label=updated)](https://github.com/MooVC/monify)
![GitHub Repo stars](https://img.shields.io/github/stars/MooVC/monify?style=social)

## Details

### Info
:::info

Name: **Monify**

Monify, a .NET Roslyn source generator, automates the creation of strongly-typed wrappers around single values, improving semantic clarity, type safety, and maintainability.

Author: Paul Martin

NuGet: 
*https://www.nuget.org/packages/Monify/*   


You can find more details at https://github.com/MooVC/monify

Source: https://github.com/MooVC/monify

:::

### Author
:::note
Paul Martin 
![Alt text](https://github.com/MooVC.png)
:::

### Original Readme
:::note

# Monify [![NuGet](https://img.shields.io/nuget/v/Monify?logo=nuget)](https://www.nuget.org/packages/Monify/) [![GitHub](https://img.shields.io/github/license/MooVC/Monify)](https://github.com/MooVC/monify/LICENSE.md)

Monify, a .NET Roslyn source generator, automates the creation of strongly-typed wrappers around single values, improving semantic clarity, type safety, and maintainability.

## Requirements

- C# v2.0 or later.
- Visual Studio 2022 v17.4 or later, or any compatible IDE that supports Roslyn source generators.

## Installation

To install Monify, use the following command in your package manager console:

```shell
install-package Monify
```

## Usage

Monify turns a `class`, `record`, or `struct` into a strongly typed wrapper around a single value. To opt in, annotate a `partial` type with the `Monify` attribute and specify the encapsulated value type.

```csharp
using Monify;

[Monify<int>]
public partial struct Age;
```

For language versions earlier than C# 11:

```csharp
using Monify;

[Monify(Type = typeof(int))]
public partial struct Age;
```

### Generated Members

When applied, Monify generates the boilerplate needed for a lightweight value object:

- A private readonly field `_value` that stores the encapsulated value.
- A constructor accepting the underlying value: `Age(int value)`.
- Implicit conversion operators to and from the encapsulated type.
- Implementations of `IEquatable<Age>` and `IEquatable<int>`.
- Equality (`==`) and inequality (`!=`) operators for comparing with other instances or with the underlying value.
- Overrides of `Equals(object)`, `GetHashCode()`, and `ToString()`.

### Example

```csharp
Age age = 42;       // implicit conversion from int
int value = age;    // implicit conversion to int

if (age == value)
{
    // comparisons work with both Age and int
}
```

Classes annotated with `Monify` are `sealed` automatically to preserve immutability. Types must be `partial` and cannot declare additional state; the included analyzers will warn when these guidelines are not followed.

### Nested wrappers and circular guards

Monify also follows chains of nested wrappers and automatically emits the necessary implicit conversions so the outermost wrapper can convert directly to and from the innermost value type. For example, if `Money` wraps `Amount` and `Amount` wraps `decimal`, conversions will be generated for every hop, allowing callers to cast `Money` to `decimal` (and vice versa) without manual glue code.

To keep the generator safe, conversion discovery halts as soon as a type repeats in the chain. This prevents circular relationships (e.g. `Outer` wrapping `Inner` while `Inner` wraps `Outer`) from producing infinite loops or ambiguous operators while still supporting arbitrarily deep, non-circular nesting.

## Analyzers

Monify includes several analyzers to assist engineers with its usage. These are:

Rule ID                          | Category | Severity | Notes
:--------------------------------|:---------|:---------|:-------------------------------------------------------------------------
[MONFY01](https://github.com/MooVC/monify/docs/rules/MONFY01.md) | Usage    | Warning  | Type is not compatible with Monify
[MONFY02](https://github.com/MooVC/monify/docs/rules/MONFY02.md) | Usage    | Warning  | Type is not Partial
[MONFY03](https://github.com/MooVC/monify/docs/rules/MONFY03.md) | Design   | Error    | Type captures State
[MONFY04](https://github.com/MooVC/monify/docs/rules/MONFY04.md) | Design   | Error    | Self Referencing Type

## Contributing

Contributions are welcome - see the [CONTRIBUTING.md](https://github.com/MooVC/monify/.github/CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/MooVC/monify/LICENSE.md) file for details.

:::

### About
:::note

Generate primitive strongly typed wrapper around a single value object


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Monify**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Monify" Version="1.3.1">
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\Program.cs" label="Program.cs" >

  This is the use of **Monify** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using PrimitiveDemo;

Console.WriteLine("Hello, World!");
Person p= new ();
p.Age = 55;
Console.WriteLine($"Person's age is {p.Age}");
Console.WriteLine($"Is adult: {p.IsAdult}");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\Person.cs" label="Person.cs" >

  This is the use of **Monify** in *Person.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;

namespace PrimitiveDemo;

[Monify.Monify<int>]
public partial struct Age;
internal class Person
{
    public Age Age \{ get; set; }
    public bool IsAdult => Age >= 18;
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.AttributeGenerator\MonifyAttribute.Generic.g.cs" label="MonifyAttribute.Generic.g.cs" >
```csharp showLineNumbers 
namespace Monify
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false, AllowMultiple = false)]
    internal sealed class MonifyAttribute<T>
        : Attribute
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.AttributeGenerator\MonifyAttribute.NonGeneric.g.cs" label="MonifyAttribute.NonGeneric.g.cs" >
```csharp showLineNumbers 
namespace Monify
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false, AllowMultiple = false)]
    internal sealed class MonifyAttribute
        : Attribute
    {
        private Type _type;

        public Type Type
        {
            get
            {
                return _type;
            }
            set
            {
                _type = value;
            }
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.HashCodeGenerator\Monify.Internal.HashCode.g.cs" label="Monify.Internal.HashCode.g.cs" >
```csharp showLineNumbers 
namespace Monify.Internal
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.SequenceEqualityComparerGenerator\Monify.Internal.SequenceEqualityComparer.g.cs" label="Monify.Internal.SequenceEqualityComparer.g.cs" >
```csharp showLineNumbers 
namespace Monify.Internal
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.ConvertFrom.g.cs" label="PrimitiveDemo.Age.ConvertFrom.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public static implicit operator int(Age subject)
        {
            if (ReferenceEquals(subject, null))
            {
                throw new ArgumentNullException("subject");
            }

            return subject._value;
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.ConvertTo.g.cs" label="PrimitiveDemo.Age.ConvertTo.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public static implicit operator Age(int value)
        {
            return new Age(value);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.ctor.g.cs" label="PrimitiveDemo.Age.ctor.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public Age(int value)
        {
            _value = value;
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.Equality.Self.g.cs" label="PrimitiveDemo.Age.Equality.Self.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public static bool operator ==(Age left, Age right)
        {
            if (ReferenceEquals(left, right))
            {
                return true;
            }

            if (ReferenceEquals(left, null) || ReferenceEquals(right, null))
            {
                return false;
            }

            return left.Equals(right);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.Equality.Value.g.cs" label="PrimitiveDemo.Age.Equality.Value.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public static bool operator ==(Age left, int right)
        {
            if (ReferenceEquals(left, right))
            {
                return true;
            }

            if (ReferenceEquals(left, null) || ReferenceEquals(right, null))
            {
                return false;
            }

            return left.Equals(right);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.Equals.g.cs" label="PrimitiveDemo.Age.Equals.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public override bool Equals(object other)
        {
            if (other is Age)
            {
                return Equals((Age)other);
            }

            return false;
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.GetHashCode.g.cs" label="PrimitiveDemo.Age.GetHashCode.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public override int GetHashCode()
        {
            return global::Monify.Internal.HashCode.Combine(_value);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.IEquatable.Self.Equals.g.cs" label="PrimitiveDemo.Age.IEquatable.Self.Equals.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public bool Equals(Age other)
        {
            if (ReferenceEquals(this, other))
            {
                return true;
            }

            if (ReferenceEquals(other, null))
            {
                return false;
            }

            return Equals(other._value);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.IEquatable.Self.g.cs" label="PrimitiveDemo.Age.IEquatable.Self.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age : IEquatable<Age>
    {
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.IEquatable.Value.Equals.g.cs" label="PrimitiveDemo.Age.IEquatable.Value.Equals.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public bool Equals(int other)
        {
            if (ReferenceEquals(this, other))
            {
                return true;
            }

            if (ReferenceEquals(other, null))
            {
                return false;
            }

            return global::System.Collections.Generic.EqualityComparer<int>.Default.Equals(_value, other);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.IEquatable.Value.g.cs" label="PrimitiveDemo.Age.IEquatable.Value.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age : IEquatable<int>
    {
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.Inequality.Self.g.cs" label="PrimitiveDemo.Age.Inequality.Self.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public static bool operator !=(Age left, Age right)
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.Inequality.Value.g.cs" label="PrimitiveDemo.Age.Inequality.Value.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public static bool operator !=(Age left, int right)
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age.ToString.g.cs" label="PrimitiveDemo.Age.ToString.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        public override string ToString()
        {
            return string.Format("Age {{ {0} }}", _value);
        }
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Monify\src\PrimitiveDemo\obj\GX\Monify\Monify.TypeGenerator\PrimitiveDemo.Age._value.g.cs" label="PrimitiveDemo.Age._value.g.cs" >
```csharp showLineNumbers 
namespace PrimitiveDemo
{
    using System;
    using System.Collections.Generic;

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable disable
    #endif

    partial struct Age
    {
        private readonly int _value;
    }

    #if NET5_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
    #nullable restore
    #endif
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Monify ](/sources/Monify.zip)

:::


### Share Monify 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMonify&quote=Monify" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMonify&text=Monify:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMonify" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMonify&title=Monify" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMonify&title=Monify&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMonify" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Monify

<SameCategory />

