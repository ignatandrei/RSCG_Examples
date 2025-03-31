---
sidebar_position: 1320
title: 132 - UnionGen
description: Generating unions between types
slug: /UnionGen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# UnionGen  by M. Haslinger


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/UnionGen?label=UnionGen)](https://www.nuget.org/packages/UnionGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/markushaslinger/union_source_generator?label=updated)](https://github.com/markushaslinger/union_source_generator)
![GitHub Repo stars](https://img.shields.io/github/stars/markushaslinger/union_source_generator?style=social)

## Details

### Info
:::info

Name: **UnionGen**

A source generator for creating C# union types via a generic marker attribute.

Author: M. Haslinger

NuGet: 
*https://www.nuget.org/packages/UnionGen/*   


You can find more details at https://github.com/markushaslinger/union_source_generator

Source : https://github.com/markushaslinger/union_source_generator

:::

### Original Readme
:::note

# Union Source Generator

Union Source Generator is a C# source generator that generates a union type for a set of types. The generated union type can hold any _one_ of the specified types.
Consuming the type can be done by _exhaustive_ pattern matching.

The main component is one **generic attribute**, `UnionAttribute`, which is used to specify the types that the union can hold, on a `struct`:

```csharp
[Union<Result<int>, NotFound>]
public readonly partial struct SimpleObj;
```

This will result in a generated `SimpleObj` type that can hold any of the specified types, **but only one at a time**.
It also provides compile time checked _exhaustive_ `Switch` and `Match` methods to handle the different types.
Implicit conversions operators are generated as well as equality members.

```csharp
SimpleObj simple = CreateSimple();
simple.Switch(
              r =>  Console.WriteLine($"Found: {r}"),
              _ => Console.WriteLine("not found"));
int result = simple.Match(r => r.Value * 2,
                          _ => -1);

SimpleObj CreateSimple() => new NotFound();
```

> While the generator itself has to be a `netstandard2.0` project, the generated code assumes C#12 / .NET 8 at this point.

> This project is _heavily_ influenced by the great [OneOf](https://github.com/mcintyre321/OneOf) library. All credit for the original concept to its authors!

## Opinionated Naming Scheme 

This library is **opinionated** as it will try to assign '_readable_' names to the properties based on the specified types:

```csharp
SimpleObj simple = new SimpleObj(new Result<int>(12));
bool found = simple.IsNotFound;
Result<int> result = simple.AsResultOfInt32();
```

It even will try to detect collections and assign names like `ListOfFoo` or `DictionaryOfStringAndInt64`.

The same is true for the lambda parameter names in the `Match` & `Switch` methods.
For `Switch` they will get names like `forString` (or `forNone`) and for `Match` ones like `withString` (or `withNone`).

That can work great in many scenarios but will probably lead to bad naming in some cases - that's the trade-off I'm willing to accept.

## Union Object Size

We try to be smart and use as little memory as possible for the union object.

- They are `readonly struct`s
- Only those fields actually needed are generated
  - e.g. only a single reference field which is used for all reference types
  - if there are no reference types, no reference field is generated
  - if there are no value types, no value field is generated
- A single `byte` is used for storing the state so that they union object knows _what_ it is

Plus padding for alignment done by the runtime.

## Motivation

My main motivation was to finally learn more about writing source generators by creating one myself.
I haven't found a lot of resources regarding _generic_ marker attributes in combination with source generators, so I'm not sure my approach is optimal, but maybe it can serve as a starting point for others.

As a first project I wanted something with a small scope and I was always a little annoyed by the property names (`T0`, `T1`, ...) in the `OneOf` library (which they have to use due to the types being generic - even when using their source generator).
So this is what I decided to tackle.

## Quality

This is a two-day toy project without much testing (and no serious automated tests).
I will probably use it in my own projects in the future to see how far I'll get and fix issues as they arise.

Feedback (and PRs 😉) to make the implementation more robust, efficient and generally better are welcome, of course!

> Don't expect production grade reliability here!

:::

### About
:::note

Generating unions between types


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **UnionGen**
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
	  <PackageReference Include="UnionGen" Version="1.4.0" />
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnionGen\src\UnionTypesDemo\Program.cs" label="Program.cs" >

  This is the use of **UnionGen** in *Program.cs*

```csharp showLineNumbers 
using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
Console.WriteLine(data.IsNotFound);
data = SaveToDatabase.Save(1);
Console.WriteLine(data.IsResultOfInt32);

Console.WriteLine(data.AsResultOfInt32());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnionGen\src\UnionTypesDemo\ResultSave.cs" label="ResultSave.cs" >

  This is the use of **UnionGen** in *ResultSave.cs*

```csharp showLineNumbers 
using UnionGen.Types;
using UnionGen;
namespace UnionTypesDemo;

[Union<Result<int>, NotFound>]
public partial struct ResultSave
{
}



```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnionGen\src\UnionTypesDemo\SaveToDatabase.cs" label="SaveToDatabase.cs" >

  This is the use of **UnionGen** in *SaveToDatabase.cs*

```csharp showLineNumbers 
using UnionGen.Types;

namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {
        if(i ==0)
        {
            return new NotFound();
        }
        return new Result<int>(i);
    }
}



```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\UnionGen\src\UnionTypesDemo\obj\GX\UnionGen.Generator\UnionGen.UnionSourceGen\UnionTypesDemo.ResultSave.g.cs" label="UnionTypesDemo.ResultSave.g.cs" >


```csharp showLineNumbers 
// <auto-generated by UnionSourceGen />
#nullable enable
using System;
namespace UnionTypesDemo
{

    public readonly partial struct ResultSave : IEquatable<ResultSave>
    {
		private readonly UnionGen.Types.Result<int> _value0;
		private readonly UnionGen.Types.NotFound _value1;
		private readonly UnionGen.InternalUtil.StateByte _state;

		private ResultSave(int index, int actualTypeIndex)
		{
			_state = new UnionGen.InternalUtil.StateByte(index, actualTypeIndex);
		}

		public ResultSave(UnionGen.Types.Result<int> value): this(0, 0)
		{
			_value0 = value;
		}

		public ResultSave(UnionGen.Types.NotFound value): this(1, 1)
		{
			_value1 = value;
		}

		[Obsolete(UnionGen.InternalUtil.UnionGenInternalConst.DefaultConstructorWarning, true)]
		public ResultSave(): this(0, 0) {}

		public bool IsResultOfInt32 => _state.Index == 0;
		public bool IsNotFound => _state.Index == 1;

		public UnionGen.Types.Result<int> AsResultOfInt32() =>
			IsResultOfInt32
				? _value0
				: throw UnionGen.InternalUtil.ExceptionHelper.ThrowNotOfType(GetTypeName(0), GetTypeName(_state.ActualTypeIndex));
		
		public UnionGen.Types.NotFound AsNotFound() =>
			IsNotFound
				? _value1
				: throw UnionGen.InternalUtil.ExceptionHelper.ThrowNotOfType(GetTypeName(1), GetTypeName(_state.ActualTypeIndex));

		public static implicit operator ResultSave(UnionGen.Types.Result<int> value) => new ResultSave(value);
		public static implicit operator ResultSave(UnionGen.Types.NotFound value) => new ResultSave(value);
		public static bool operator ==(ResultSave left, ResultSave right) => left.Equals(right);
		public static bool operator !=(ResultSave left, ResultSave right) => !left.Equals(right);

		public TResult Match<TResult>(Func<UnionGen.Types.Result<int>, TResult> withResultOfInt32, Func<UnionGen.Types.NotFound, TResult> withNotFound) => 		
			_state.ActualTypeIndex switch
			{
				0 => withResultOfInt32(_value0),
				1 => withNotFound(_value1),
				_ => throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(_state.ActualTypeIndex)
			};

		public void Switch(Action<UnionGen.Types.Result<int>> forResultOfInt32, Action<UnionGen.Types.NotFound> forNotFound)		
		{
			switch (_state.ActualTypeIndex)
			{
				case 0: forResultOfInt32(_value0); break;
				case 1: forNotFound(_value1); break;
				default: throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(_state.ActualTypeIndex);
			}
		}

		public override string ToString() => 		
			_state.Index switch
			{
				0 => _value0.ToString()!,
				1 => _value1.ToString()!,
				_ => throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(_state.Index)
			};

		public bool Equals(ResultSave other) => 
			_state.Index == other._state.Index
				&& _state.Index switch 
				{
					0 => _value0.Equals(other._value0),
					1 => _value1.Equals(other._value1),
					_ => false
				};

		public override bool Equals(object? obj)
		{
			if (ReferenceEquals(null, obj))
			{
				return false;
			}
			return obj is ResultSave other && Equals(other);
		}

		public override int GetHashCode(){		
			unchecked
			{
				var hash = _state.Index switch
				{
					0 => _value0.GetHashCode(),
					1 => _value1.GetHashCode(),
					_ => 0
				};
				return (hash * 397) ^ _state.Index;
			}
		}

		public string GetTypeName(int index) =>
			index switch 
			{
				0 => "UnionGen.Types.Result<int>",
				1 => "UnionGen.Types.NotFound",
				_ => throw UnionGen.InternalUtil.ExceptionHelper.ThrowUnknownTypeIndex(index)
			};

    }

}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project UnionGen ](/sources/UnionGen.zip)

:::


### Share UnionGen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&quote=UnionGen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&text=UnionGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&title=UnionGen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen&title=UnionGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FUnionGen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/UnionGen

### In the same category (FunctionalProgramming) - 15 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Dusharp](/docs/Dusharp)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [polytype](/docs/polytype)


#### [rscg_demeter](/docs/rscg_demeter)


#### [rscg_queryables](/docs/rscg_queryables)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [Sera.Union](/docs/Sera.Union)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionsGenerator](/docs/UnionsGenerator)

