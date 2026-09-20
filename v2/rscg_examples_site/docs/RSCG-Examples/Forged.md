---
sidebar_position: 2950
title: 295 - Forged
description: Generating faker data from class
slug: /Forged
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveTests.mdx';

# Forged  by Angius


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Forged?label=Forged)](https://www.nuget.org/packages/Forged/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Atulin/Forged?label=updated)](https://github.com/Atulin/Forged)
![GitHub Repo stars](https://img.shields.io/github/stars/Atulin/Forged?style=social)

## Details

### Info
:::info

Name: **Forged**



Author: Angius

NuGet: 
*https://www.nuget.org/packages/Forged/*   


You can find more details at https://github.com/Atulin/Forged

Source: https://github.com/Atulin/Forged

:::

### Author
:::note
Angius 
![Alt text](https://github.com/Atulin.png)
:::

## Original Readme
:::note

### Forged

[![NuGet](https://img.shields.io/nuget/v/Atulin.Forged.svg)](https://www.nuget.org/packages/Atulin.Forged)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Atulin/Forged/LICENSE)
[![.NET 10](https://img.shields.io/badge/.NET-10.0-purple.svg)](https://dotnet.microsoft.com/)

A fast, strict, and strongly-typed data generator (faker) for C# powered by Source Generators.

Forged allows you to declaratively define how your models should be faked, leveraging the C# compiler to enforce required properties, nullability, and type-safety.

###### Features

- 🚀 **Source Generated**: No reflection, fast at runtime, and fully trim/AOT compatible.
- 🛡️ **Strict & Type-Safe**: Respects your class properties. If a property in your model is `required`, the faker will force you to provide a generator for it at compile time.
- 🌊 **Fluent API**: A clean and readable fluent API for configuring generators and their modifiers.
- 🎲 **Deterministic**: Pass a seeded `Random` instance to the faker to generate the exact same data every time.

###### Quick Start

1. Add the package to your project.
2. Decorate your model with `[Fake]`:

```csharp
[Fake]
public class Person
{
    public required Guid Id \{ get; set; }
    public required string FirstName \{ get; set; }
    public required string LastName \{ get; set; }
    public List<string>? MiddleNames \{ get; set; }
    public bool IsActive \{ get; set; }
    public DateTime? DateOfBirth \{ get; set; }
}
```

or create a partial class with `[Faker<T>]` attribute:

```csharp
[Faker<Person>]
public partial class PersonFaker;
```

3. The source generator will automatically create a `{ModelName}Faker` class for you. Configure it and generate data!

```csharp
using Forged.Core.Generators; 
using Forged.Core.Generators.Text; 

// The faker properties match your model's properties!
var faker = new PersonFaker
{
    Id = f => f.Text.Guid(GuidGenerator.Kind.V7),
    FirstName = f => f.Text.Alphanumeric(10),
    LastName = f => f.Text.Alphanumeric(10),
    
    // Non-required properties can be omitted, but you can still provide a generator:
    MiddleNames = f => f.Text
        .Alphanumeric(5)
        .Collection(3)
        .Refine(c => c.ToList()) // Map to List<string>
        .OrDefault(0.5f),        // 50% chance of being default (null)
        
    DateOfBirth = f => f.Temporal.Past().OrNull(0.2f), // 20% chance to be null
    IsActive = f => f.Random.Pick(true, false)
};

// Generate a single item
var person = faker.Get();

// Generate multiple items
var people = faker.Get(5);
```

> [!INFO]
> When using the `Faker<T>` attribute, the generated faker will have the same name,
> not `{ModelName}Faker`.

######### Deterministic Generation

If you need reproducible results (e.g. in unit tests), you can provide a seeded `Random` instance to the faker:

```csharp
var faker = new PersonFaker(new Random(12345)) 
{
    // ...
};
```

######### Localization

You can optionally provide a `CultureInfo` instance to the faker, which will be utilized by modifiers that support localization:

```csharp
var faker = new PersonFaker(locale: new CultureInfo("fr-FR")) 
{
    // ...
};
```

######### Referencing Other Properties

If you need to reference an already-generated value, you can use `.Memo()` and `.Func()` methods:

```csharp
// Unfortunate workaround, as `out var` does not work in object initializers.
MemoValueGenerator<string> first = null!;
MemoValueGenerator<string> last = null!;

var faker = new PersonFaker
{
    FirstName = f => f.Text.Pronounceable(5, 10).Memo(out first),
    LastName = f => f.Text.Pronounceable(5, 10).Memo(out last),
    MiddleNames = f => f.Basic.Func(() => $"{first} {last}"),
}
```

###### Available Generators

The `Forge` instance (`f` in the lambda expressions) provides access to built-in generators categorized by modules:

######### `Basic`
- `.Literal(T value)` - Creates a generator that always returns the specified literal value.
- `.Func(Func<T> func)` - Creates a generator that invokes the specified function.

######### `Random`
- `Pick<T>(params T[] items)` - Pick a single random item from the given collection.
- `Pick<T>(T[] items, int count)` - Pick an exact number of random items from the collection.
- `Pick<T>(T[] items, int minCount, int maxCount)` - Pick a variable number of random items from the collection.
- `Number<T>(T? min, T? max)` - Generate a random numeric value within the specified range (supports all numeric types).
- `WeightedPick<T>(T[] items, float[] weights)` - Pick an item from the collection using specified weights for probability distribution.
- `WeightedPick<T>((T item, float weight)[] items)` - Pick an item from an array of item-weight tuples.
- `Dice(string expression, RoundingMode mode)` - Roll dice using a dice expression (e.g. `2d6+4`).

######### `Temporal`
- `Between(DateTime? min, DateTime? max)` - Generate a random `DateTime` within the specified range.
- `Past(DateTime? earliest)` - Generate a random `DateTime` in the past, with an optional earliest bound.
- `Future(DateTime? latest)` - Generate a random `DateTime` in the future, with an optional latest bound.
- `DateBetween(DateOnly? min, DateOnly? max)` - Generate a random `DateOnly` within the specified range.
- `DateInPast(DateOnly? earliest)` - Generate a random `DateOnly` in the past, with an optional earliest bound.
- `DateInFuture(DateOnly? latest)` - Generate a random `DateOnly` in the future, with an optional latest bound.
- `TimeBetween(TimeOnly? min, TimeOnly? max)` - Generate a random `TimeOnly` within the specified range.

######### `Text`
- `Alphanumeric(int length)` - Generate a random alphanumeric string of fixed length.
- `Alphanumeric(int minLength, int maxLength)` - Generate a random alphanumeric string of variable length.
- `Alpha(int length)` - Generate a random alphabetic string of fixed length.
- `Alpha(int minLength, int maxLength)` - Generate a random alphabetic string of variable length.
- `Pronounceable(int length)` - Generate a random pronounceable string (syllable-based) of fixed length.
- `Pronounceable(int minLength, int maxLength)` - Generate a random pronounceable string of variable length.
- `Lorem(int length, LoremIpsumGenerator.Options? options = null)` - Generate Lorem Ipsum text with a fixed number of words.
- `Lorem(int minLength, int maxLength, LoremIpsumGenerator.Options? options = null)` - Generate Lorem Ipsum text with a variable number of words.
- `Hex(int length)` - Generate a random hexadecimal string of fixed length.
- `Hex(int minLength, int maxLength)` - Generate a random hexadecimal string of variable length.
- `Guid(GuidGenerator.Kind kind)` - Generate a GUID of the specified kind (supports V4 and V7).
- `Template(string template)` - Generate a string from a template with random placeholder replacements.

######### `Internet`
- `Username(float prefixChance, float suffixChance, float leetChance)` - Generates a random username with configurable probability for including prefixes, suffixes, and leet-speak character substitutions.
- `Domain(float ccSldChance = 0.0f)` - Generates a random domain name.
- `Email(EmailKind kind = EmailKind.Random, IGenerator<string>? provider = null)` - Generates a random email address.

###### Modifiers & Extensions

Any `Generator<T>` can be customized and composed using fluent methods. These methods can be chained to create complex generation pipelines.

######### Core Modifiers (on `Generator<T>`)
- `.Or(T other, float probability)` - Returns an alternative value with the specified probability (e.g., 0.2f = 20% chance).
- `.OrDefault(float probability)` - Returns the default value for type T with the specified probability.
- `.Refine<TNew>(Func<T, TNew> refiner)` - Transforms the generated value using the provided function.
- `.Enumerable(int length)` - Generates an `IEnumerable<T>` with a fixed number of items.
- `.Enumerable(int minLength, int maxLength)` - Generates an `IEnumerable<T>` with a variable number of items.
- `.Array(int length)` - Generates a `T[]` array with a fixed number of items.
- `.Array(int minLength, int maxLength)` - Generates a `T[]` array with a variable number of items.
- `.List(int length)` - Generates a `List<T>` with a fixed number of items.
- `.List(int minLength, int maxLength)` - Generates a `List<T>` with a variable number of items.
- `.HashSet(int length)` - Generates a `HashSet<T>` with a fixed number of unique items.
- `.HashSet(int minLength, int maxLength)` - Generates a `HashSet<T>` with a variable number of unique items.
- `.Cast<TOut>()` - Casts the generated value to the specified type.

######### Nullable & Struct Extensions
- `.OrNull(float probability)` - For struct generators, returns null with the specified probability.
- `.Nullable()` - Converts a struct generator to a nullable struct generator.

######### Collection Conversion Extensions
- `.AsList()` - Converts an `IEnumerable<T>` or `ICollection<T>` generator to a `List<T>` generator.
- `.AsHashSet()` - Converts an `IEnumerable<T>` or `ICollection<T>` generator to a `HashSet<T>` generator.
- `.AsDictionary<T, TKey, TValue>(keySelector, valueSelector)` - Converts an `IEnumerable<T>` generator to a `Dictionary<TKey, TValue>` using the provided selectors.

######### String-Specific Extensions
- `.ToUpper()` - Converts generated strings to uppercase.
- `.ToLower()` - Converts generated strings to lowercase.
- `.Range(int start, int? end = null)` - Produces substrings within the specified range.
- `.Replace(string oldValue, string newValue)` - Replaces all occurrences of a specified string with another string.
- `.Replace(char oldValue, char newValue)` - Replaces all occurrences of a specified char with another char.
- `.Replace(Regex regex, string newValue)` - Replaces substrings matching a regular expression with another string.
- `.ToTitleCase(CultureInfo? cultureInfo)` - Converts generated strings to title case using the specified culture.
- `.Capitalize(CultureInfo? cultureInfo)` - Capitalizes the first character of generated strings.
- `.Sentencify(int sentenceLength, CultureInfo? cultureInfo)` - Formats strings as proper sentences with a fixed word count.
- `.Sentencify(int minSentenceLength, int maxSentenceLength, CultureInfo? cultureInfo)` - Formats strings as proper sentences with a variable word count.

######### Temporal-Specific Extensions (DateTime)
- `.ToUtc()` - Converts generated DateTime values to UTC.
- `.ToLocal()` - Converts generated DateTime values to local time.
- `.ToDateOnly()` - Extracts the date component from DateTime values, producing DateOnly.
- `.ToTimeOnly()` - Extracts the time component from DateTime values, producing TimeOnly.
- `.TruncateToDate()` - Truncates DateTime values to date precision (sets time to midnight).

######### Formatting Extensions
- `.ToString()` - Converts generated values to their string representation.
- `.ToString(string format, CultureInfo? cultureInfo)` - Converts generated values to formatted strings using the specified format and culture (for types implementing `ISpanFormattable`).


:::

### About
:::note

Generating faker data from class


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Forged**
```xml showLineNumbers {13}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Atulin.Forged" Version="1.0.0" />
    <PackageReference Include="Microsoft.Extensions.FileProviders.Embedded" Version="10.0.12" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="18.10.1" />
    <PackageReference Include="MSTest.TestAdapter" Version="4.4.1" />
    <PackageReference Include="MSTest.TestFramework" Version="4.4.1" />
    <PackageReference Include="coverlet.collector" Version="10.0.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Mock\MockData.csproj" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Forged\src\Mock\IMyClock.cs" label="IMyClock.cs" >

  This is the use of **Forged** in *IMyClock.cs*

```csharp showLineNumbers 
namespace MockData;

public class IMyClock
{
    public DateTime MyNow \{ get; set; \} = DateTime.Now;
    //public DateTime GetNow()=>DateTime.Now;
    public DateTime GetUtcNow()=>DateTime.UtcNow;
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Forged\src\TestClock\TestClock.cs" label="TestClock.cs" >

  This is the use of **Forged** in *TestClock.cs*

```csharp showLineNumbers 


using Forged.Core;

namespace MockData
{
    [Faker<IMyClock>]
    public partial class QuickStartRepoStub \{ }
}

namespace TestClock
{


    [TestClass]
    public class TestClock
    {
        [TestMethod]
        public void TestMyClock()
        {
            
            var expectations = new QuickStartRepoStub()
            {

                MyNow = f => f.Temporal.Past(DateTime.Now.AddYears(-1))
            };
            //expectations.MyNow =()=>(DateTime.Now.AddYears(-1));

            IMyClock mock = expectations.Get();
            var data= mock.MyNow;
            Assert.AreEqual(DateTime.Now.Year -1, data.Year);

        }
    }

}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Forged\src\TestClock\obj\GX\Forged.Generator\Forged.Generator.ForgedGenerator\QuickStartRepoStub.g.cs" label="QuickStartRepoStub.g.cs" >
```csharp showLineNumbers 
//----------------------------------------------------------------------------
// <auto-generated>
//	This code was generated by Forged.Generator
//	Runtime version: 1.0.0
//
//    Changes to this file may cause incorrect behavior and will be lost if
//    the code is regenerated.
//</auto-generated>
//----------------------------------------------------------------------------
#nullable enable

namespace MockData;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("Forged.Generator", "1.0.0.0")]
public partial class QuickStartRepoStub : global::Forged.Core.Faker<IMyClock>
{
	public virtual global::System.Func<global::Forged.Core.Forge, global::Forged.Core.Generators.IGenerator<System.DateTime>>? MyNow \{ get; init; }

	// Constructor
	public QuickStartRepoStub(global::System.Random? random = null, global::System.Globalization.CultureInfo? locale = null) : base(random, locale) \{ }

	public override IMyClock Get()
	{
		var myNowGenerator = MyNow?.Invoke(this.Forge);

		return new IMyClock
		{
			MyNow = myNowGenerator?.Generate() ?? default!,
		};
	}
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Forged ](/sources/Forged.zip)

:::


### Share Forged 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FForged&quote=Forged" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FForged&text=Forged:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FForged" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FForged&title=Forged" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FForged&title=Forged&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FForged" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Forged

<SameCategory />

