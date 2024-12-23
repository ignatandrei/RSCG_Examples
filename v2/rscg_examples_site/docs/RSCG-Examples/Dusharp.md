---
sidebar_position: 1600
title: 160 - Dusharp
description: Generate tagged union
slug: /Dusharp
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Dusharp  by Vitali


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Dusharp?label=Dusharp)](https://www.nuget.org/packages/Dusharp/)
[![GitHub last commit](https://img.shields.io/github/last-commit/kolebynov/Dusharp?label=updated)](https://github.com/kolebynov/Dusharp)
![GitHub Repo stars](https://img.shields.io/github/stars/kolebynov/Dusharp?style=social)

## Details

### Info
:::info

Name: **Dusharp**

Dusharp is a C# source generator for creating discriminated unions.

Author: Vitali

NuGet: 
*https://www.nuget.org/packages/Dusharp/*   


You can find more details at https://github.com/kolebynov/Dusharp

Source : https://github.com/kolebynov/Dusharp

:::

### Original Readme
:::note

# Dusharp

[![NuGet](https://img.shields.io/nuget/v/Dusharp)](https://www.nuget.org/packages/Dusharp/)

**Dusharp** is a C# source generator library for creating **discriminated unions**. This library allows you to define union types with ease, using attributes and partial methods. It is inspired by functional languages but built for C# developers.

## Features

- ✅ **Create unions**: Define discriminated unions using attributes.
- ✅ **Match method**: Pattern match on union cases in a type-safe way.
- ✅ **Equality**: Automatic equality comparison for unions.
- ✅ **Generics**: Generics support for union types.
- ✅ **Pretty print**: Using overloaded `ToString()`.
- ❌ **JSON serialization/deserialization**: Support for unions with `System.Text.Json` (coming soon).
- ❌ **Struct unions**: With efficient memory layout for unions as structs (coming soon).

## Installation

Dusharp is available as a NuGet package. You can install it using the NuGet package manager:

```bash
dotnet add package Dusharp
```

## Usage

`Dusharp` uses attributes to generate discriminated unions and case methods. Here's how to get started:

### 1. Define a Union
To define a union, annotate a class with the `[Dusharp.UnionAttribute]` attribute.

```csharp
using Dusharp;

[Union]
public partial class Shape<T>
    where T : struct, INumber<T>
{
}
```

### 2. Define Union Cases
Define union cases by creating public static partial methods and marking them with the `[Dusharp.UnionCaseAttribute]` attribute. The method body will be automatically generated.

```csharp
using Dusharp;

[Union]
public partial class Shape<T>
    where T : struct, INumber<T>
{
    [UnionCase]
    public static partial Shape<T> Circle(T radius);

    [UnionCase]
    public static partial Shape<T> Rectangle(T width, T height);
}
```

### 3. Match on Union
You can easily perform pattern matching on a union using the `Match` method. The source generator will create the `Match` method based on the defined union cases.

```csharp
Shape<double> shape = Shape<double>.Circle(5.0);

string result = shape.Match(
    radius => $"Circle with radius {radius}",
    (width, height) => $"Rectangle with width {width} and height {height}");

Console.WriteLine(result); // Output: Circle with radius 5.0
```

### 4. Compare Unions
Union cases can be compared for equality using the auto-generated equality methods. This allows for checking if two unions are the same.

```csharp
Shape<double> shape1 = Shape<double>.Circle(5.0);
Shape<double> shape2 = Shape<double>.Circle(5.0);

Console.WriteLine(shape1.Equals(shape2)); // True
Console.WriteLine(shape1 == shape2); // True
```

## Upcoming Features
- **JSON serialization/deserialization**: Support for JSON (de)serialization via System.Text.Json.
- **Struct unions**: More efficient unions using structs with effective data layout.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

:::

### About
:::note

Generate tagged union


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Dusharp**
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
	  <PackageReference Include="Dusharp" Version="0.4.0">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>

	

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\Program.cs" label="Program.cs" >

  This is the use of **Dusharp** in *Program.cs*

```csharp showLineNumbers 
using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
data.Match(
    ok => Console.WriteLine(ok),
    ()=> Console.WriteLine("Not found")
);

data = SaveToDatabase.Save(1);
data.Match(
    ok => Console.WriteLine(ok),
    () => Console.WriteLine("Not found")
);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\ResultSave.cs" label="ResultSave.cs" >

  This is the use of **Dusharp** in *ResultSave.cs*

```csharp showLineNumbers 
using Dusharp;
namespace UnionTypesDemo;


[Union]
public partial class ResultSave
{
    [UnionCase]
    public static partial ResultSave Ok(int i);
    [UnionCase]
    public static partial ResultSave NotFound();
    
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\SaveToDatabase.cs" label="SaveToDatabase.cs" >

  This is the use of **Dusharp** in *SaveToDatabase.cs*

```csharp showLineNumbers 
namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {

        if (i == 0)
        {
            return ResultSave.NotFound();
        }
        return ResultSave.Ok(i); ;
    }
}



```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\obj\GX\Dusharp\Dusharp.UnionSourceGenerator\Dusharp.EmbeddedCode.ExceptionUtils.cs" label="Dusharp.EmbeddedCode.ExceptionUtils.cs" >


```csharp showLineNumbers 
// <auto-generated> This file has been auto generated. </auto-generated>
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace Dusharp
{
	public static class ExceptionUtils
	{
		[MethodImpl(MethodImplOptions.AggressiveInlining)]
		public static void ThrowIfNull<T>(this T value, string paramName)
			where T : class
		{
			if (value == null)
			{
				ThrowArgumentNull(paramName);
			}
		}

		[MethodImpl(MethodImplOptions.NoInlining)]
		public static void ThrowUnionInInvalidState() =>
			throw new InvalidOperationException("Union in invalid state.");

		[MethodImpl(MethodImplOptions.NoInlining)]
		private static void ThrowArgumentNull(string paramName) => throw new ArgumentNullException(paramName);
	}
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\obj\GX\Dusharp\Dusharp.UnionSourceGenerator\Dusharp.EmbeddedCode.UnionAttribute.cs" label="Dusharp.EmbeddedCode.UnionAttribute.cs" >


```csharp showLineNumbers 
// <auto-generated> This file has been auto generated. </auto-generated>
#nullable enable
using System;

namespace Dusharp
{
	[AttributeUsage(AttributeTargets.Class)]
	public sealed class UnionAttribute : Attribute
	{
	}
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\obj\GX\Dusharp\Dusharp.UnionSourceGenerator\Dusharp.EmbeddedCode.UnionCaseAttribute.cs" label="Dusharp.EmbeddedCode.UnionCaseAttribute.cs" >


```csharp showLineNumbers 
// <auto-generated> This file has been auto generated. </auto-generated>
#nullable enable
using System;

namespace Dusharp
{
	[AttributeUsage(AttributeTargets.Method)]
	public sealed class UnionCaseAttribute : Attribute
	{
	}
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\obj\GX\Dusharp\Dusharp.UnionSourceGenerator\UnionTypesDemo.ResultSave.Dusharp.g.cs" label="UnionTypesDemo.ResultSave.Dusharp.g.cs" >


```csharp showLineNumbers 
// <auto-generated> This file has been auto generated. </auto-generated>
#nullable enable
namespace UnionTypesDemo
{
	[System.Diagnostics.CodeAnalysis.SuppressMessage("", "CA1000", Justification = "For generic unions.")]
	abstract partial class ResultSave : System.IEquatable<ResultSave>
	{
		private ResultSave() {}

		public void Match(System.Action<int> okCase, System.Action notFoundCase)
		{
			Dusharp.ExceptionUtils.ThrowIfNull(okCase, "okCase");
			Dusharp.ExceptionUtils.ThrowIfNull(notFoundCase, "notFoundCase");

			{
				var unionCase = this as OkCase;
				if (!object.ReferenceEquals(unionCase, null)) { okCase(unionCase.i); return; }
			}

			{
				var unionCase = this as NotFoundCase;
				if (!object.ReferenceEquals(unionCase, null)) { notFoundCase(); return; }
			}

			Dusharp.ExceptionUtils.ThrowUnionInInvalidState();
		}

		public TRet Match<TRet>(System.Func<int, TRet> okCase, System.Func<TRet> notFoundCase)
		{
			Dusharp.ExceptionUtils.ThrowIfNull(okCase, "okCase");
			Dusharp.ExceptionUtils.ThrowIfNull(notFoundCase, "notFoundCase");

			{
				var unionCase = this as OkCase;
				if (!object.ReferenceEquals(unionCase, null)) { return okCase(unionCase.i); }
			}

			{
				var unionCase = this as NotFoundCase;
				if (!object.ReferenceEquals(unionCase, null)) { return notFoundCase(); }
			}

			Dusharp.ExceptionUtils.ThrowUnionInInvalidState();
			return default!;
		}

		public void Match<TState>(TState state, System.Action<TState, int> okCase, System.Action<TState> notFoundCase)
		{
			Dusharp.ExceptionUtils.ThrowIfNull(okCase, "okCase");
			Dusharp.ExceptionUtils.ThrowIfNull(notFoundCase, "notFoundCase");

			{
				var unionCase = this as OkCase;
				if (!object.ReferenceEquals(unionCase, null)) { okCase(state, unionCase.i); return; }
			}

			{
				var unionCase = this as NotFoundCase;
				if (!object.ReferenceEquals(unionCase, null)) { notFoundCase(state); return; }
			}

			Dusharp.ExceptionUtils.ThrowUnionInInvalidState();
		}

		public TRet Match<TState, TRet>(TState state, System.Func<TState, int, TRet> okCase, System.Func<TState, TRet> notFoundCase)
		{
			Dusharp.ExceptionUtils.ThrowIfNull(okCase, "okCase");
			Dusharp.ExceptionUtils.ThrowIfNull(notFoundCase, "notFoundCase");

			{
				var unionCase = this as OkCase;
				if (!object.ReferenceEquals(unionCase, null)) { return okCase(state, unionCase.i); }
			}

			{
				var unionCase = this as NotFoundCase;
				if (!object.ReferenceEquals(unionCase, null)) { return notFoundCase(state); }
			}

			Dusharp.ExceptionUtils.ThrowUnionInInvalidState();
			return default!;
		}

		public virtual bool Equals(ResultSave? other) { return object.ReferenceEquals(this, other); }
		public override bool Equals(object? other) { return object.ReferenceEquals(this, other); }
		public override int GetHashCode() { return System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(this); }
		public static bool operator ==(ResultSave? left, ResultSave? right)
		{
			return !object.ReferenceEquals(left, null) ? left.Equals(right) : object.ReferenceEquals(left, right);
		}

		public static bool operator !=(ResultSave? left, ResultSave? right)
		{
			return !object.ReferenceEquals(left, null) ? !left.Equals(right) : !object.ReferenceEquals(left, right);
		}

		private sealed class OkCase : ResultSave
		{
			public readonly int i;
			public OkCase(int i)
			{
				this.i = i;
			}

			public override string ToString()
			{
				return $"Ok {{ i = {i} }}";
			}

			public override bool Equals(ResultSave? other)
			{
				if (object.ReferenceEquals(this, other)) return true;
				var otherCasted = other as OkCase;
				if (object.ReferenceEquals(otherCasted, null)) return false;
				return StructuralEquals(otherCasted);
			}

			public override bool Equals(object? other)
			{
				if (object.ReferenceEquals(this, other)) return true;
				var otherCasted = other as OkCase;
				if (object.ReferenceEquals(otherCasted, null)) return false;
				return StructuralEquals(otherCasted);
			}

			public override int GetHashCode()
			{
				unchecked { return System.Collections.Generic.EqualityComparer<int>.Default.GetHashCode(i!) * -1521134295 + "Ok".GetHashCode(); }
			}

			private bool StructuralEquals(OkCase other)
			{
				return System.Collections.Generic.EqualityComparer<int>.Default.Equals(i, other.i);
			}
		}

		public static partial ResultSave Ok(int i)
		{
			return new OkCase(i);
		}

		private sealed class NotFoundCase : ResultSave
		{
			public static readonly NotFoundCase Instance = new NotFoundCase();
			public NotFoundCase()
			{
			}

			public override string ToString()
			{
				return "NotFound";
			}
		}

		public static partial ResultSave NotFound()
		{
			return NotFoundCase.Instance;
		}
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dusharp\src\UnionTypesDemo\obj\GX\Sera.TaggedUnion.Analyzers\Sera.TaggedUnion.Analyzers.Generators.UnionGenerator\UnionTypesDemo.ResultSave.union.g.cs" label="UnionTypesDemo.ResultSave.union.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable

using Sera.TaggedUnion;

namespace UnionTypesDemo {

public partial struct ResultSave
    : global::Sera.TaggedUnion.ITaggedUnion
    , global::System.IEquatable<ResultSave>
    , global::System.IComparable<ResultSave>
#if NET7_0_OR_GREATER
    , global::System.Numerics.IEqualityOperators<ResultSave, ResultSave, bool>
    , global::System.Numerics.IComparisonOperators<ResultSave, ResultSave, bool>
#endif
{
    private __impl_ _impl;
    private ResultSave(__impl_ _impl) { this._impl = _impl; }

    public readonly Tags Tag
    {
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        get => this._impl._tag;
    }

    public enum Tags : byte
    {
        Ok = 1,
        NotFound = 2,
    }

    [global::System.Runtime.CompilerServices.CompilerGenerated]
    private struct __impl_
    {
        public __unmanaged_ _unmanaged_;
        public readonly Tags _tag;

        [global::System.Runtime.CompilerServices.CompilerGenerated]
        [global::System.Runtime.InteropServices.StructLayout(global::System.Runtime.InteropServices.LayoutKind.Explicit)]
        internal struct __unmanaged_
        {
            [global::System.Runtime.InteropServices.FieldOffset(0)]
            public int _0;
        }

        public __impl_(Tags _tag)
        {
            global::System.Runtime.CompilerServices.Unsafe.SkipInit(out this._unmanaged_);
            this._tag = _tag;
        }
    }

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static ResultSave MakeOk(int value)
    {
        var _impl = new __impl_(Tags.Ok);
        _impl._unmanaged_._0 = value;
        return new ResultSave(_impl);
    }
    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static ResultSave MakeNotFound()
    {
        var _impl = new __impl_(Tags.NotFound);
        return new ResultSave(_impl);
    }

    public readonly bool IsOk
    {
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        get => this._impl._tag == Tags.Ok;
    }
    public readonly bool IsNotFound
    {
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        get => this._impl._tag == Tags.NotFound;
    }

    public int Ok
    {
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        readonly get => !this.IsOk ? default! : this._impl._unmanaged_._0!;
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        set { if (this.IsOk) { this._impl._unmanaged_._0 = value; } }
    }

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public readonly bool Equals(ResultSave other) => this.Tag != other.Tag ? false : this.Tag switch
    {
        Tags.Ok => global::System.Collections.Generic.EqualityComparer<int>.Default.Equals(this.Ok, other.Ok),
        _ => true,
    };

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public readonly override int GetHashCode() => this.Tag switch
    {
        Tags.Ok => global::System.HashCode.Combine(this.Tag, this.Ok),
        _ => global::System.HashCode.Combine(this.Tag),
    };

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public readonly override bool Equals(object? obj) => obj is ResultSave other && Equals(other);

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static bool operator ==(ResultSave left, ResultSave right) => Equals(left, right);
    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static bool operator !=(ResultSave left, ResultSave right) => !Equals(left, right);

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public readonly int CompareTo(ResultSave other) => this.Tag != other.Tag ? global::System.Collections.Generic.Comparer<Tags>.Default.Compare(this.Tag, other.Tag) : this.Tag switch
    {
        Tags.Ok => global::System.Collections.Generic.Comparer<int>.Default.Compare(this.Ok, other.Ok),
        _ => 0,
    };

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static bool operator <(ResultSave left, ResultSave right) => left.CompareTo(right) < 0;
    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static bool operator >(ResultSave left, ResultSave right) => left.CompareTo(right) > 0;
    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static bool operator <=(ResultSave left, ResultSave right) => left.CompareTo(right) <= 0;
    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public static bool operator >=(ResultSave left, ResultSave right) => left.CompareTo(right) >= 0;

    [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    public readonly override string ToString() => this.Tag switch
    {
        Tags.Ok => $"{nameof(ResultSave)}.{nameof(Tags.Ok)} {{ {this.Ok} }}",
        Tags.NotFound => $"{nameof(ResultSave)}.{nameof(Tags.NotFound)}",
        _ => nameof(ResultSave),
    };
}

} // namespace UnionTypesDemo

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Dusharp ](/sources/Dusharp.zip)

:::


### Share Dusharp 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDusharp&quote=Dusharp" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDusharp&text=Dusharp:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDusharp" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDusharp&title=Dusharp" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDusharp&title=Dusharp&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDusharp" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Dusharp

### In the same category (FunctionalProgramming) - 14 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [polytype](/docs/polytype)


#### [rscg_queryables](/docs/rscg_queryables)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [Sera.Union](/docs/Sera.Union)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionGen](/docs/UnionGen)


#### [UnionsGenerator](/docs/UnionsGenerator)

