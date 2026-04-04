---
sidebar_position: 2660
title: 266 - Aigamo.MatchGenerator
description: Generates exhaustive Match() extension methods for enums and abstract record hierarchies (tagged unions), ensuring compile-time safety — all cases must be handled.
slug: /Aigamo.MatchGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# Aigamo.MatchGenerator  by Aigamo


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Aigamo.MatchGenerator?label=Aigamo.MatchGenerator)](https://www.nuget.org/packages/Aigamo.MatchGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ycanardeau/MatchGenerator?label=updated)](https://github.com/ycanardeau/MatchGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/ycanardeau/MatchGenerator?style=social)

## Details

### Info
:::info

Name: **Aigamo.MatchGenerator**

Package Description

Author: Aigamo

NuGet: 
*https://www.nuget.org/packages/Aigamo.MatchGenerator/*   


You can find more details at https://github.com/ycanardeau/MatchGenerator

Source: https://github.com/ycanardeau/MatchGenerator

:::

### Author
:::note
Aigamo 
![Alt text](https://github.com/ycanardeau.png)
:::

## Original Readme
:::note

### MatchGenerator

**Bring exhaustive pattern matching to C# enums and unions with zero boilerplate.**

[MatchGenerator](https://github.com/ycanardeau/MatchGenerator) is a Roslyn source generator that creates `Match` extension methods for your enums and discriminated-union-like types, enabling concise, expressive, and compile-time safe branching.

###### Features

- Generate `Match` extension methods for enums and unions
- Exhaustive by design (no missing cases)
- Attribute-driven (opt-in per type)
- Supports generics (`Match<U>`)
- Respects effective accessibility
- Zero runtime cost (pure source generation)

###### Getting Started

######### 1. Install the package

```bash
dotnet add package Aigamo.MatchGenerator
```

######### 2. Annotate your type

########## Enum example

```csharp
using Aigamo.MatchGenerator;

[GenerateMatch]
public enum Gender
{
	Male = 1,
	Female,
}
```

########## Union example

```csharp
using Aigamo.MatchGenerator;

[GenerateMatch]
abstract record MaritalStatus;

sealed record Single : MaritalStatus;
sealed record Married : MaritalStatus;
sealed record Divorced : MaritalStatus;
sealed record Widowed : MaritalStatus;
```

######### 3. Use `Match`

########## Enum

```csharp
var message = gender.Match(
	onMale: () => "male",
	onFemale: () => "female"
);
```

########## Union

```csharp
var message = maritalStatus.Match(
	onSingle: x => "single",
	onMarried: x => "married",
	onDivorced: x => "divorced",
	onWidowed: x => "widowed"
);
```

###### Why use MatchGenerator?

######### Without MatchGenerator

########## Enum

```csharp
var message = gender switch
{
	Gender.Male => "male",
	Gender.Female => "female",
	_ => throw new UnreachableException(),
};
```

########## Union

```csharp
var message = maritalStatus switch
{
	Single x => "single",
	Married x => "married",
	Divorced x => "divorced",
	Widowed x => "widowed",
	_ => throw new UnreachableException(),
};
```

######### With MatchGenerator

```csharp
var message = gender.Match(
	onMale: () => "male",
	onFemale: () => "female"
);
```

- More concise
- More readable
- No default case required
- Compile-time safety

###### Exhaustiveness Guarantee

All cases must be handled.

If a new enum value or union type is added:

```csharp
public enum Gender
{
	Male = 1,
	Female,
	Other,
}
```

or

```csharp
sealed record Separated : MaritalStatus;
```

Existing `Match` calls will fail to compile until updated. This ensures no cases are missed.

###### Generated Code (Example)

######### Enum

```csharp
internal static class GenderMatchExtensions
{
	public static U Match<U>(
		this Gender value,
		Func<U> onFemale,
		Func<U> onMale
	)
	{
		return value switch
		{
			Gender.Female => onFemale(),
			Gender.Male => onMale(),
			_ => throw new UnreachableException(),
		};
	}
}
```

######### Union

```csharp
internal static class MaritalStatusMatchExtensions
{
	public static U Match<U>(
		this MaritalStatus value,
		Func<Divorced, U> onDivorced,
		Func<Married, U> onMarried,
		Func<Single, U> onSingle,
		Func<Widowed, U> onWidowed
	)
	{
		return value switch
		{
			Divorced x => onDivorced(x),
			Married x => onMarried(x),
			Single x => onSingle(x),
			Widowed x => onWidowed(x),
			_ => throw new UnreachableException(),
		};
	}
}
```

###### References

- [Introducing C# Source Generators - .NET Blog](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/)
- [roslyn/docs/features/source-generators.cookbook.md at main · dotnet/roslyn](https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md)
- [roslyn/docs/features/incremental-generators.cookbook.md at main · dotnet/roslyn](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md)
- [Domain Modeling Made Functional: Tackle Software Complexity with Domain-Driven Design and F### by Scott Wlaschin](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)
- [It Seems the C# Team Is Finally Considering Supporting Discriminated Unions - DEV Community](https://dev.to/canro91/it-seems-the-c-team-is-finally-considering-supporting-discriminated-unions-59k3)
- [salvois/DiscriminatedOnions: A stinky but tasty hack to emulate F#-like discriminated unions in C#](https://github.com/salvois/DiscriminatedOnions)


:::

### About
:::note

Generates exhaustive Match() extension methods for enums and abstract record hierarchies (tagged unions), ensuring compile-time safety — all cases must be handled.


How to use





 1. Add [GenerateMatch] attribute to an enum or abstract record:





 [GenerateMatch]


 public enum CarTypes \{ None, Dacia, Tesla, BMW, Mercedes }





 [GenerateMatch]


 abstract record MaritalStatus;


 sealed record Single : MaritalStatus;


 sealed record Married : MaritalStatus;





 2. Use the generated .Match() method — all cases required (compile error if any missing):





 var msg = car.Match(


     onBMW: () => "this is bmw",


     onDacia: () => "this is dacia",


     onMercedes: () => "this is mercedes",


     onNone: () => "this is none",


     onTesla: () => "this is tesla"


 );





You can use for  Transforming enums/records into exhaustive pattern matching (discriminated unions style). 


If a case is missing in Match(), it's a compile-time error





:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Aigamo.MatchGenerator**
```xml showLineNumbers {16}
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
    <PackageReference Include="Aigamo.MatchGenerator" Version="0.0.0-preview013" />
  </ItemGroup>

  
 

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **Aigamo.MatchGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EnumDemo;
using System.Reflection;

Console.WriteLine("Hello, World!");
CarTypes car = CarTypes.BMW;
var message = car.Match(
    onBMW: () => "this is bmw",
    onDacia: () => "this is dacia",
    onMercedes: () => "this is mercedes",
    onNone: () => "this is none",
    onTesla: () => "this is tesla"
    );

Console.WriteLine(message);
MaritalStatus maritalStatus = new Divorced();

var messageStatus = maritalStatus.Match(
    onSingle: x => "single",
    onMarried: x => "married",
    onDivorced: x => "divorced",
    onWidowed: x => "widowed"
);
Console.WriteLine(messageStatus);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\CarTypes.cs" label="CarTypes.cs" >

  This is the use of **Aigamo.MatchGenerator** in *CarTypes.cs*

```csharp showLineNumbers 
using Aigamo.MatchGenerator;
namespace EnumDemo;

[GenerateMatch]
public enum CarTypes 
{
    None,
    Dacia,
    
    Tesla,
    
    BMW,
    
    Mercedes,
}


[GenerateMatch]
abstract record MaritalStatus;

sealed record Single : MaritalStatus;
sealed record Married : MaritalStatus;
sealed record Divorced : MaritalStatus;
sealed record Widowed : MaritalStatus;
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\obj\GX\Aigamo.MatchGenerator\Aigamo.MatchGenerator.SourceGenerator\CarTypesMatchExtensions.g.cs" label="CarTypesMatchExtensions.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
using System;
using System.Diagnostics;

namespace EnumDemo;

public static class CarTypesMatchExtensions
{
	public static U Match<U>(
		this CarTypes value,
		Func<U> onBMW,
		Func<U> onDacia,
		Func<U> onMercedes,
		Func<U> onNone,
		Func<U> onTesla
	)
	{
		return value switch
		{
			CarTypes.BMW => onBMW(),
			CarTypes.Dacia => onDacia(),
			CarTypes.Mercedes => onMercedes(),
			CarTypes.None => onNone(),
			CarTypes.Tesla => onTesla(),
			_ => throw new UnreachableException(),
		};
	}
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\obj\GX\Aigamo.MatchGenerator\Aigamo.MatchGenerator.SourceGenerator\GenerateMatchAttribute.g.cs" label="GenerateMatchAttribute.g.cs" >
```csharp showLineNumbers 
using System;

namespace Aigamo.MatchGenerator;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum)]
internal sealed class GenerateMatchAttribute : Attribute;
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\obj\GX\Aigamo.MatchGenerator\Aigamo.MatchGenerator.SourceGenerator\MaritalStatusMatchExtensions.g.cs" label="MaritalStatusMatchExtensions.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
using System;
using System.Diagnostics;

namespace EnumDemo;

internal static class MaritalStatusMatchExtensions
{
	public static U Match<U>(
		this MaritalStatus value,
		Func<Divorced, U> onDivorced,
		Func<Married, U> onMarried,
		Func<Single, U> onSingle,
		Func<Widowed, U> onWidowed
	)
	{
		return value switch
		{
			Divorced x => onDivorced(x),
			Married x => onMarried(x),
			Single x => onSingle(x),
			Widowed x => onWidowed(x),
			_ => throw new UnreachableException(),
		};
	}
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\obj\GX\TaggedEnum\TaggedEnum.TaggedEnumSourceGenerator\EnumDemoEnumDemo.CarTypesTaggedEnum.g.cs" label="EnumDemoEnumDemo.CarTypesTaggedEnum.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using TaggedEnum;

namespace EnumDemo;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public static class EnumDemoCarTypesExtension {
	private static readonly Dictionary<global::EnumDemo.CarTypes, string> ValueNameMap = new(new EnumDemoCarTypesComparer()) {
		
		{global::EnumDemo.CarTypes.None, "None"},
		{global::EnumDemo.CarTypes.Dacia, "Dacia"},
		{global::EnumDemo.CarTypes.Tesla, "Tesla"},
		{global::EnumDemo.CarTypes.BMW, "BMW"},
		{global::EnumDemo.CarTypes.Mercedes, "Mercedes"},
	};

	

	

	

	

		extension(global::EnumDemo.CarTypes self) {
			public string Data {
			[MethodImpl(MethodImplOptions.AggressiveInlining)]
			[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
			get =>
				self switch {
				
			global::EnumDemo.CarTypes.None => (string)"this is none",
			global::EnumDemo.CarTypes.Dacia => (string)"this is dacia",
			global::EnumDemo.CarTypes.Tesla => (string)"this is tesla",
			global::EnumDemo.CarTypes.BMW => (string)"this is bwm",
			global::EnumDemo.CarTypes.Mercedes => (string)"this is mercedes",
					_ => DataNotFoundException.ThrowWithMessage<string>($"Data of {ValueNameMap[self]} not found.")
				};
		}
	}

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static string ToStringFast(this global::EnumDemo.CarTypes self)
	=> self switch {
	
			global::EnumDemo.CarTypes.None => "None",
			global::EnumDemo.CarTypes.Dacia => "Dacia",
			global::EnumDemo.CarTypes.Tesla => "Tesla",
			global::EnumDemo.CarTypes.BMW => "BMW",
			global::EnumDemo.CarTypes.Mercedes => "Mercedes",
		_ => UnreachableException.ThrowWithMessage<string>("Never reach here.")
	};

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static bool HasName(this global::EnumDemo.CarTypes self, string name)
		=> self.ToStringFast() == name;

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static bool HasData(this global::EnumDemo.CarTypes self, string data)
		=> self.Data == data;

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static bool Equals(this global::EnumDemo.CarTypes self, global::EnumDemo.CarTypes v)
		=> self == v;

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static bool TryGetDataByName(string name, [NotNullWhen(true)]out string? v) {
		v = name switch {
		
			"None" => (string)"this is none",
			"Dacia" => (string)"this is dacia",
			"Tesla" => (string)"this is tesla",
			"BMW" => (string)"this is bwm",
			"Mercedes" => (string)"this is mercedes",
			_ => null
		};
		return v is not null;
	}

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static bool TryGetValueByName(string name, [NotNullWhen(true)]out global::EnumDemo.CarTypes? v) {
		v = name switch {
		
			"None" => global::EnumDemo.CarTypes.None,
			"Dacia" => global::EnumDemo.CarTypes.Dacia,
			"Tesla" => global::EnumDemo.CarTypes.Tesla,
			"BMW" => global::EnumDemo.CarTypes.BMW,
			"Mercedes" => global::EnumDemo.CarTypes.Mercedes,
			_ => null
		};
		return v is not null;
	}

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
	public static bool TryGetValueByData(string data, [NotNullWhen(true)]out global::EnumDemo.CarTypes? v) {
		v = data switch {
		
			(string)"this is none" => global::EnumDemo.CarTypes.None,
			(string)"this is dacia" => global::EnumDemo.CarTypes.Dacia,
			(string)"this is tesla" => global::EnumDemo.CarTypes.Tesla,
			(string)"this is bwm" => global::EnumDemo.CarTypes.BMW,
			(string)"this is mercedes" => global::EnumDemo.CarTypes.Mercedes,
			_ => null
		};
		return v is not null;
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
internal sealed class EnumDemoCarTypesComparer: IEqualityComparer<global::EnumDemo.CarTypes> {
	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	public bool Equals(global::EnumDemo.CarTypes x, global::EnumDemo.CarTypes y) => x == y;

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	public int GetHashCode([DisallowNull] global::EnumDemo.CarTypes obj) => (int)obj;
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
internal sealed class EnumDemoCarTypesstringComparer: IEqualityComparer<string> {
	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	public bool Equals(string? x, string? y) => x == y;

	[MethodImpl(MethodImplOptions.AggressiveInlining)]
	public int GetHashCode([DisallowNull] string obj) => obj.GetHashCode();
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class EnumDemoCarTypesToDataConverter: JsonConverter<global::EnumDemo.CarTypes> {
	public override global::EnumDemo.CarTypes Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		string? token = reader.GetString();
		return 	string.IsNullOrEmpty(token)
	? JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't convert data \"{token}\" to global::EnumDemo.CarTypes.")
	: EnumDemoCarTypesExtension.TryGetValueByData(token, out var result)
		? result.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{token}\" in global::EnumDemo.CarTypes data.");
	}

	public override void Write(Utf8JsonWriter writer, global::EnumDemo.CarTypes value, JsonSerializerOptions options) {
		writer.WriteStringValue(value.Data);
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class EnumDemoCarTypesArrayToDataArrayConverter: JsonConverter<global::EnumDemo.CarTypes[]> {
	public override global::EnumDemo.CarTypes[] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByData(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes data."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, global::EnumDemo.CarTypes[] arr, JsonSerializerOptions options) {
		writer.WriteStartArray();
		for (int i = 0, len = arr.Length; i < len; ++i) {
			writer.WriteStringValue(arr[i].Data);
		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class NullableEnumDemoCarTypesArrayToDataArrayConverter: JsonConverter<global::EnumDemo.CarTypes?[]> {
	public override global::EnumDemo.CarTypes?[] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes?>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.Null:
					list.Add(null);
					continue;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByData(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes data."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, global::EnumDemo.CarTypes?[] arr, JsonSerializerOptions options) {
		writer.WriteStartArray();
		for (int i = 0, len = arr.Length; i < len; ++i) {
			var v = arr[i];
			if (v is null) {
				writer.WriteNullValue();
			} else {
				writer.WriteStringValue(v.Value.Data);
			}

		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class EnumDemoCarTypesEnumerableToDataEnumerableConverter: JsonConverter<IEnumerable<global::EnumDemo.CarTypes>> {
	public override IEnumerable<global::EnumDemo.CarTypes> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByData(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes data."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, IEnumerable<global::EnumDemo.CarTypes> values, JsonSerializerOptions options) {
		writer.WriteStartArray();
		foreach (var v in values) {
			writer.WriteStringValue(v.Data);
		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class NullableEnumDemoCarTypesEnumerableToDataEnumerableConverter: JsonConverter<IEnumerable<global::EnumDemo.CarTypes?>> {
	public override IEnumerable<global::EnumDemo.CarTypes?> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes?>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.Null:
					list.Add(null);
					continue;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByData(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes data."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, IEnumerable<global::EnumDemo.CarTypes?> values, JsonSerializerOptions options) {
		writer.WriteStartArray();
		foreach (var v in values) {
			if (v is null) {
				writer.WriteNullValue();
			} else {
				writer.WriteStringValue(v.Value.Data);
			}
		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class EnumDemoCarTypesToNameConverter: JsonConverter<global::EnumDemo.CarTypes> {
	public override global::EnumDemo.CarTypes Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		string? token = reader.GetString();
		return string.IsNullOrEmpty(token)
			? JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't convert name \"{token}\" to global::EnumDemo.CarTypes.")
			: EnumDemoCarTypesExtension.TryGetValueByName(token, out var result)
				? result.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{token}\" in global::EnumDemo.CarTypes name.");
	}

	public override void Write(Utf8JsonWriter writer, global::EnumDemo.CarTypes value, JsonSerializerOptions options) {
		writer.WriteStringValue(value.ToStringFast());
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class EnumDemoCarTypesArrayToNameArrayConverter: JsonConverter<global::EnumDemo.CarTypes[]> {
	public override global::EnumDemo.CarTypes[] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByName(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes name."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, global::EnumDemo.CarTypes[] arr, JsonSerializerOptions options) {
		writer.WriteStartArray();
		for (int i = 0, len = arr.Length; i < len; ++i) {
			writer.WriteStringValue(arr[i].ToStringFast());
		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class NullableEnumDemoCarTypesArrayToNameArrayConverter: JsonConverter<global::EnumDemo.CarTypes?[]> {
	public override global::EnumDemo.CarTypes?[] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes?>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.Null:
					list.Add(null);
					continue;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByName(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes name."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, global::EnumDemo.CarTypes?[] arr, JsonSerializerOptions options) {
		writer.WriteStartArray();
		for (int i = 0, len = arr.Length; i < len; ++i) {
			var v = arr[i];
			if (v is null) {
				writer.WriteNullValue();
			} else {
				writer.WriteStringValue(v.Value.ToStringFast());
			}
		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class EnumDemoCarTypesEnumerableToNameEnumerableConverter: JsonConverter<IEnumerable<global::EnumDemo.CarTypes>> {
	public override IEnumerable<global::EnumDemo.CarTypes> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByName(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes name."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, IEnumerable<global::EnumDemo.CarTypes> values, JsonSerializerOptions options) {
		writer.WriteStartArray();
		foreach (var v in values) {
			writer.WriteStringValue(v.ToStringFast());
		}
		writer.WriteEndArray();
	}
}

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("TaggedEnum", "1.0")]
public sealed class NullableEnumDemoCarTypesEnumerableToNameEnumerableConverter: JsonConverter<IEnumerable<global::EnumDemo.CarTypes?>> {
	public override IEnumerable<global::EnumDemo.CarTypes?> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
		var list = new List<global::EnumDemo.CarTypes?>();
		while (reader.Read()) {
			switch (reader.TokenType) {
				case JsonTokenType.StartArray:
					continue;
				case JsonTokenType.EndArray:
					goto label;
				case JsonTokenType.Null:
					list.Add(null);
					continue;
				case JsonTokenType.String:
					var v = reader.GetString() is not {} token ? UnreachableException.ThrowWithMessage<string>("JsonTokenType is string but reader.GetString() is null.") : token;
					list.Add(EnumDemoCarTypesExtension.TryGetValueByName(
						v,
						out var item)
						? item!.Value : JsonException.ThrowWithMessage<global::EnumDemo.CarTypes>($"Couldn't find \"{v}\" in global::EnumDemo.CarTypes name."));
					continue;
				default:
					continue;
			}
		}
		label:
		return list.ToArray();
	}

	public override void Write(Utf8JsonWriter writer, IEnumerable<global::EnumDemo.CarTypes?> values, JsonSerializerOptions options) {
		writer.WriteStartArray();
		foreach (var v in values) {
			if (v is null) {
				writer.WriteNullValue();
			} else {
				writer.WriteStringValue(v.Value.ToStringFast());
			}
		}
		writer.WriteEndArray();
	}
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Aigamo.MatchGenerator\src\EnumDemo\obj\GX\TaggedEnum\TaggedEnum.TaggedEnumSourceGenerator\TaggedEnumAttribute.g.cs" label="TaggedEnumAttribute.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System.Text.Json;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;

namespace TaggedEnum;

internal static class JsonExceptionExtensions {
	extension(JsonException) {
		[DoesNotReturn]
		public static T ThrowWithMessage<T>(string msg)
			=> throw new JsonException(msg);
	}
}

internal static class UnreachableExceptionExtensions {
	extension(UnreachableException) {
		[DoesNotReturn]
		public static T ThrowWithMessage<T>(string msg)
			=> throw new UnreachableException(msg);
	}
}

#pragma warning disable CA1050 // Declare types in namespaces
[AttributeUsage(
	AttributeTargets.Field,
	Inherited = false,
	AllowMultiple = false
	)]
internal sealed class Data<TValue>(TValue v): Attribute {
	public TValue V \{ get; private set; \} = v;
}

[AttributeUsage(
	AttributeTargets.Field,
	Inherited = false,
	AllowMultiple = false
	)]
// TValue default is string
internal sealed class Data: Attribute {
	public object? V \{ get; }

	public Data(object str) {
		V = str;
	}

	public Data() {}
}
#pragma warning restore CA1050 // Declare types in namespaces

#pragma warning disable CA1050 // Declare types in namespaces
[AttributeUsage(
	AttributeTargets.Enum,
	Inherited = false,
	AllowMultiple = false
	)]
internal sealed class Tagged<TValue>: Attribute {
	public bool Inline = true;

	public bool UseSwitch = true;

	public bool AllowDuplicate = false;
}

[AttributeUsage(
	AttributeTargets.Enum,
	Inherited = false,
	AllowMultiple = false
	)]
// TValue default is string
internal sealed class Tagged: Attribute {
		public bool UseAll = false;

	public bool Inline = true;

	public bool UseSwitch = true;

	public bool AllowDuplicate = false;
}
#pragma warning restore CA1050 // Declare types in namespaces

public sealed class DataNotFoundException(string msg): Exception(msg) {
	[DoesNotReturn]
	public static T ThrowWithMessage<T>(string message) => throw new DataNotFoundException(message);
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Aigamo.MatchGenerator ](/sources/Aigamo.MatchGenerator.zip)

:::


### Share Aigamo.MatchGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAigamo.MatchGenerator&quote=Aigamo.MatchGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAigamo.MatchGenerator&text=Aigamo.MatchGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAigamo.MatchGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAigamo.MatchGenerator&title=Aigamo.MatchGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAigamo.MatchGenerator&title=Aigamo.MatchGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAigamo.MatchGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Aigamo.MatchGenerator

<SameCategory />

