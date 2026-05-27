---
sidebar_position: 2690
title: 269 - LinkDotNet.Enumeration
description: Good for replacing enum + switch patterns with string-based enumerations  with exhaustive pattern matching.
slug: /LinkDotNet.Enumeration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# LinkDotNet.Enumeration  by Steven Giesel


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/LinkDotNet.Enumeration?label=LinkDotNet.Enumeration)](https://www.nuget.org/packages/LinkDotNet.Enumeration/)
[![GitHub last commit](https://img.shields.io/github/last-commit/linkdotnet/Enumeration?label=updated)](https://github.com/linkdotnet/Enumeration)
![GitHub Repo stars](https://img.shields.io/github/stars/linkdotnet/Enumeration?style=social)

## Details

### Info
:::info

Name: **LinkDotNet.Enumeration**

Source code generated enumeration with completeness!

Author: Steven Giesel

NuGet: 
*https://www.nuget.org/packages/LinkDotNet.Enumeration/*   


You can find more details at https://github.com/linkdotnet/Enumeration

Source: https://github.com/linkdotnet/Enumeration

:::

### Author
:::note
Steven Giesel 
![Alt text](https://github.com/linkdotnet.png)
:::

## Original Readme
:::note

### Enumeration

[![.NET](https://github.com/linkdotnet/Enumeration/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linkdotnet/Enumeration/actions/workflows/dotnet.yml)
[![Nuget](https://img.shields.io/nuget/dt/LinkDotNet.Enumeration)](https://www.nuget.org/packages/LinkDotNet.Enumeration/)
[![GitHub tag](https://img.shields.io/github/v/tag/linkdotnet/Enumeration?include_prereleases&logo=github&style=flat-square)](https://github.com/linkdotnet/Enumeration/releases)

Source code generated string Enumeration with completeness!

###### What is in the box?

This source code generator let's you easily create string based enumerations with a lot of features.

```csharp
[Enumeration("Red", "Green", "Blue")]
public sealed partial record Color;
```

That's all you need to do to create a string based enumeration. You can either use it like this:

```csharp
var color = Color.Red;

// Create it by a string key:
var color = Color.Create("Red");
```

###### Exhaustiveness

The great benefit of the library is that you have support for exhaustiveness:


```csharp

var color = Color.Create("Red");

color.Match(
    red => Console.WriteLine("It's red!"),
    green => Console.WriteLine("It's green!"),
    blue => Console.WriteLine("It's blue!")
);
```

Or return a value:

```csharp
var color = Color.Create("Red");

var colorCode = color.Match(
    red => "#FF0000",
    green => "#00FF00",
    blue => "#0000FF"
);
```

###### More features!

######### Controlling field names

The `Enumeration` attribute accepts an optional first argument of type `Casing` to control how the static member names are derived from the string values. By default, the library uses `PascalCase` to convert string values into member names. If you want to preserve the original casing of the string values, you can set the `Casing` to `Preserve`.

```csharp
[Enumeration(Casing.Preserve, "red", "green", "blue")]
public sealed partial class Color;
```

Generates:

```csharp
public sealed partial class Color
{
    public static readonly Color red = new("red");
    public static readonly Color green = new("green");
    public static readonly Color blue = new("blue");
    // ...
```

The default is `PascalCase` to feel "natural" to C# developers.

######### Creating from a string key

Two methods are exposed `Create` and `TryCreate` to create an instance of the enumeration from a string key. The `Create` method will throw an `ArgumentException` if the key is not valid, while the `TryCreate` method will return a boolean indicating whether the creation was successful and output the created value through an out parameter.

```csharp
var color = Color.Create("Red"); // Throws if "Red" is not a valid key

if (Color.TryCreate("Red", out var color))
{
    // Use color
}
else
{
    // Handle invalid key
}
```

######### Parsing (IParsable)

The generated types implement `IParsable<T>` and `ISpanParsable<T>`, making them compatible with modern .NET features like Minimal APIs and Model Binding.

```csharp
if (Color.TryParse("Red", null, out var color))
{
    // Use color
}
```

######### Implicit/Explicit Conversions

Instances of the generated enumeration can be implicitly converted to strings (returns the `Key` property), and strings can be explicitly converted back to the enumeration type (calls `Create`).

```csharp
string colorKey = Color.Red; // Implicit conversion
var color = (Color)"Green"; // Explicit conversion
```

######### Equality and Comparison

Records implement value-based equality by default. For classes, `IEquatable<T>` is automatically implemented, comparing the `Key` property.

```csharp
var isRed = Color.Red == "Red"; // String comparison
var areEqual = Color.Red.Equals(Color.Create("Red")); // Value equality
```

######### Getting all values

Calling `All` will return a collection of all possible values. This is implemented using a `FrozenSet` to ensure immutability and thread-safety.

###### `JsonConverter` Generation

The library allows via the `GenerateJsonConverter` property on the `Enumeration` attribute to generate a `JsonConverter` for the enumeration type. This converter will handle serialization and deserialization of the enumeration values as their string keys.

```csharp
[Enumeration("Red", "Green", "Blue", GenerateJsonConverter = true)]
public sealed partial record Color;
```

This will generate a `JsonConverter` that can be used with `System.Text.Json` to serialize and deserialize `Color` instances as their string keys. The generated converter is called `\{TypeName}\}JsonConverter`.

######### Limitations

* Your code should run at least `net8.0` or later, as the library uses things like `FrozenSet`.


:::

### About
:::note

Good for replacing enum + switch patterns with string-based enumerations  with exhaustive pattern matching.





### Purpose


A source code generator that creates string-based enumerations (similar to Java enums / DDD value objects) with exhaustive pattern matching, replacing enum + switch patterns.





### How to Define


[Enumeration(Casing.Preserve, "None", "Dacia", "Tesla", "BMW", "Mercedes")]


public sealed partial record CarTypes;





### How to Use


CarTypes.TryParse("BMW", null, out var car);


car.Match(onBMW: () => "this is bmw", onDacia: () => "this is dacia", ...);





### Key Features


- Exhaustive matching: Match() requires all values


- Create / TryCreate: throws vs returns bool


- IParsable<T>: Minimal APIs & Model Binding


- Implicit string conversion


- CarTypes.All returns FrozenSet<CarTypes>


- JSON: GenerateJsonConverter = true


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **LinkDotNet.Enumeration**
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
    <PackageReference Include="LinkDotNet.Enumeration" Version="1.5.0" />
  </ItemGroup>

  
 

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinkDotNet.Enumeration\src\EnumDemo\Program.cs" label="Program.cs" >

  This is the use of **LinkDotNet.Enumeration** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using EnumDemo;
using System.Reflection;

Console.WriteLine("Hello, World!");
if(!CarTypes.TryParse("BMW", null,out var car))
{
    Console.WriteLine("Invalid car type");
    return;
}

var message = car.Match(
    onBMW: () => "this is bmw",
    onDacia: () => "this is dacia",
    onMercedes: () => "this is mercedes",
    onNone: () => "this is none",
    onTesla: () => "this is tesla"
    );

Console.WriteLine(message);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinkDotNet.Enumeration\src\EnumDemo\CarTypes.cs" label="CarTypes.cs" >

  This is the use of **LinkDotNet.Enumeration** in *CarTypes.cs*

```csharp showLineNumbers 
using LinkDotNet.Enumeration;
namespace EnumDemo;

[Enumeration(Casing.Preserve,"None", "Dacia", "Tesla", "BMW", "Mercedes")]
public sealed partial record CarTypes;

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinkDotNet.Enumeration\src\EnumDemo\obj\GX\LinkDotNet.Enumeration\LinkDotNet.Enumeration.EnumerationGenerator\CarTypes.g.cs" label="CarTypes.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using System;
using System.Collections.Frozen;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace EnumDemo;

[DebuggerDisplay("{Key}")]
public sealed partial record CarTypes : IParsable<CarTypes>, ISpanParsable<CarTypes>, ISpanFormattable
{
    /// <summary>Gets the string key that identifies this enumeration value.</summary>
    public string Key \{ get; init; \} = default!;

    private CarTypes(string key)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(key);
        Key = key;
    }

    /// <summary>Gets the <see cref="CarTypes"/> instance for <c>None</c>.</summary>
    public static readonly CarTypes None = new("None");
    /// <summary>Gets the <see cref="CarTypes"/> instance for <c>Dacia</c>.</summary>
    public static readonly CarTypes Dacia = new("Dacia");
    /// <summary>Gets the <see cref="CarTypes"/> instance for <c>Tesla</c>.</summary>
    public static readonly CarTypes Tesla = new("Tesla");
    /// <summary>Gets the <see cref="CarTypes"/> instance for <c>BMW</c>.</summary>
    public static readonly CarTypes BMW = new("BMW");
    /// <summary>Gets the <see cref="CarTypes"/> instance for <c>Mercedes</c>.</summary>
    public static readonly CarTypes Mercedes = new("Mercedes");

    /// <summary>Gets a frozen set of all valid <see cref="CarTypes"/> instances. Ordering is not guaranteed.</summary>
    public static FrozenSet<CarTypes> All \{ get; \} =
        new CarTypes[] \{ None, Dacia, Tesla, BMW, Mercedes }.ToFrozenSet();

    /// <summary>Creates the <see cref="CarTypes"/> instance matching <paramref name="key"/>.</summary>
    /// <param name="key">The key to look up. Must not be null, empty, or whitespace.</param>
    /// <returns>The matching <see cref="CarTypes"/> instance.</returns>
    /// <exception cref="ArgumentException">Thrown when <paramref name="key"/> is null, empty, or whitespace.</exception>
    /// <exception cref="InvalidOperationException">Thrown when <paramref name="key"/> does not match any known value.</exception>
    public static CarTypes Create(string key)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(key);
        return key switch
        {
            "None" => None,
            "Dacia" => Dacia,
            "Tesla" => Tesla,
            "BMW" => BMW,
            "Mercedes" => Mercedes,
            _ => throw new InvalidOperationException($"{key} is not a valid value for CarTypes")
        };
    }

    /// <summary>Tries to create the <see cref="CarTypes"/> instance matching <paramref name="key"/>.</summary>
    /// <param name="key">The key to look up.</param>
    /// <param name="value">When this method returns <see langword="true"/>, contains the matching <see cref="CarTypes"/> instance; otherwise <see langword="null"/>.</param>
    /// <returns><see langword="true"/> if a matching instance was found; otherwise <see langword="false"/>.</returns>
    public static bool TryCreate(string? key, [NotNullWhen(true)] out CarTypes? value)
    {
        value = key switch
        {
            "None" => None,
            "Dacia" => Dacia,
            "Tesla" => Tesla,
            "BMW" => BMW,
            "Mercedes" => Mercedes,
            _ => null
        };
        return value is not null;
    }

    /// <summary>Tries to create the <see cref="CarTypes"/> instance matching <paramref name="key"/> without allocating a string.</summary>
    /// <param name="key">The key span to look up.</param>
    /// <param name="value">When this method returns <see langword="true"/>, contains the matching <see cref="CarTypes"/> instance; otherwise <see langword="null"/>.</param>
    /// <returns><see langword="true"/> if a matching instance was found; otherwise <see langword="false"/>.</returns>
    public static bool TryCreate(ReadOnlySpan<char> key, [NotNullWhen(true)] out CarTypes? value)
    {
        value = key switch
        {
            "None" => None,
            "Dacia" => Dacia,
            "Tesla" => Tesla,
            "BMW" => BMW,
            "Mercedes" => Mercedes,
            _ => null
        };
        return value is not null;
    }

    /// <summary>Returns <see langword="true"/> if <paramref name="key"/> is a valid enumeration value.</summary>
    /// <param name="key">The key to check.</param>
    /// <returns><see langword="true"/> if the key is defined; otherwise <see langword="false"/>.</returns>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool IsDefined(string? key) => TryCreate(key, out _);

    /// <summary>Returns <see langword="true"/> if <paramref name="key"/> is a valid enumeration value without allocating a string.</summary>
    /// <param name="key">The key span to check.</param>
    /// <returns><see langword="true"/> if the key is defined; otherwise <see langword="false"/>.</returns>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool IsDefined(ReadOnlySpan<char> key) => TryCreate(key, out _);

    /// <inheritdoc />
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static CarTypes Parse(string s, IFormatProvider? provider) => Create(s);

    /// <inheritdoc />
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool TryParse(string? s, IFormatProvider? provider, [NotNullWhen(true)] out CarTypes? result) => TryCreate(s, out result);

    /// <inheritdoc />
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static CarTypes Parse(ReadOnlySpan<char> s, IFormatProvider? provider) => Create(s.ToString());

    /// <inheritdoc />
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool TryParse(ReadOnlySpan<char> s, IFormatProvider? provider, [NotNullWhen(true)] out CarTypes? result) => TryCreate(s, out result);

    /// <summary>Returns <see langword="true"/> when <paramref name="a"/>'s key equals <paramref name="b"/> using ordinal string comparison.</summary>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool operator ==(CarTypes? a, string? b)
        => a is not null && b is not null && a.Key.Equals(b, StringComparison.Ordinal);

    /// <summary>Returns <see langword="true"/> when <paramref name="a"/>'s key does not equal <paramref name="b"/>.</summary>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static bool operator !=(CarTypes? a, string? b) => !(a == b);

    /// <summary>Implicitly converts the <see cref="CarTypes"/> instance to its <see cref="Key"/>.</summary>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static implicit operator string(CarTypes value) => value.Key;

    /// <summary>Explicitly converts the <see cref="string"/> to a <see cref="CarTypes"/> instance.</summary>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static explicit operator CarTypes(string key) => Create(key);

    /// <summary>Returns the key of this enumeration value.</summary>
    /// <returns>The <see cref="Key"/> string.</returns>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public override string ToString() => Key;

    /// <inheritdoc />
    public bool TryFormat(Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider? provider)
    {
        if (Key.AsSpan().TryCopyTo(destination))
        {
            charsWritten = Key.Length;
            return true;
        }
        charsWritten = 0;
        return false;
    }

    /// <inheritdoc />
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public string ToString(string? format, IFormatProvider? provider) => Key;

    /// <summary>Returns the value corresponding to the current enumeration value.</summary>
    /// <param name="onNone">Returned when the current value is <see cref="None"/>.</param>
    /// <param name="onDacia">Returned when the current value is <see cref="Dacia"/>.</param>
    /// <param name="onTesla">Returned when the current value is <see cref="Tesla"/>.</param>
    /// <param name="onBMW">Returned when the current value is <see cref="BMW"/>.</param>
    /// <param name="onMercedes">Returned when the current value is <see cref="Mercedes"/>.</param>
    /// <typeparam name="T">The return type.</typeparam>
    /// <returns>The matched value.</returns>
    /// <exception cref="InvalidOperationException">Thrown when no case matches.</exception>
    public T Match<T>(T onNone, T onDacia, T onTesla, T onBMW, T onMercedes)
    {
        return Key switch
        {
            "None" => onNone,
            "Dacia" => onDacia,
            "Tesla" => onTesla,
            "BMW" => onBMW,
            "Mercedes" => onMercedes,
            _ => throw new InvalidOperationException($"Unhandled enumeration value: {Key}")
        };
    }

    /// <summary>Invokes the function corresponding to the current value and returns its result.</summary>
    /// <param name="onNone">Invoked when the current value is <see cref="None"/>.</param>
    /// <param name="onDacia">Invoked when the current value is <see cref="Dacia"/>.</param>
    /// <param name="onTesla">Invoked when the current value is <see cref="Tesla"/>.</param>
    /// <param name="onBMW">Invoked when the current value is <see cref="BMW"/>.</param>
    /// <param name="onMercedes">Invoked when the current value is <see cref="Mercedes"/>.</param>
    /// <typeparam name="T">The return type.</typeparam>
    /// <returns>The value returned by the matched function.</returns>
    /// <exception cref="InvalidOperationException">Thrown when no case matches.</exception>
    public T Match<T>(Func<T> onNone, Func<T> onDacia, Func<T> onTesla, Func<T> onBMW, Func<T> onMercedes)
    {
        return Key switch
        {
            "None" => onNone(),
            "Dacia" => onDacia(),
            "Tesla" => onTesla(),
            "BMW" => onBMW(),
            "Mercedes" => onMercedes(),
            _ => throw new InvalidOperationException($"Unhandled enumeration value: {Key}")
        };
    }

    /// <summary>Invokes the function corresponding to the current value, passing <paramref name="state"/>, and returns its result.</summary>
    /// <param name="state">The state to pass to the function.</param>
    /// <param name="onNone">Invoked when the current value is <see cref="None"/>.</param>
    /// <param name="onDacia">Invoked when the current value is <see cref="Dacia"/>.</param>
    /// <param name="onTesla">Invoked when the current value is <see cref="Tesla"/>.</param>
    /// <param name="onBMW">Invoked when the current value is <see cref="BMW"/>.</param>
    /// <param name="onMercedes">Invoked when the current value is <see cref="Mercedes"/>.</param>
    /// <typeparam name="T">The return type.</typeparam>
    /// <typeparam name="TState">The type of the state object.</typeparam>
    /// <returns>The value returned by the matched function.</returns>
    /// <exception cref="InvalidOperationException">Thrown when no case matches.</exception>
    public T Match<T, TState>(TState state, Func<TState, T> onNone, Func<TState, T> onDacia, Func<TState, T> onTesla, Func<TState, T> onBMW, Func<TState, T> onMercedes)
    {
        return Key switch
        {
            "None" => onNone(state),
            "Dacia" => onDacia(state),
            "Tesla" => onTesla(state),
            "BMW" => onBMW(state),
            "Mercedes" => onMercedes(state),
            _ => throw new InvalidOperationException($"Unhandled enumeration value: {Key}")
        };
    }

    /// <summary>Invokes the action corresponding to the current value.</summary>
    /// <param name="onNone">Invoked when the current value is <see cref="None"/>.</param>
    /// <param name="onDacia">Invoked when the current value is <see cref="Dacia"/>.</param>
    /// <param name="onTesla">Invoked when the current value is <see cref="Tesla"/>.</param>
    /// <param name="onBMW">Invoked when the current value is <see cref="BMW"/>.</param>
    /// <param name="onMercedes">Invoked when the current value is <see cref="Mercedes"/>.</param>
    /// <exception cref="InvalidOperationException">Thrown when no case matches.</exception>
    public void Match(Action onNone, Action onDacia, Action onTesla, Action onBMW, Action onMercedes)
    {
        switch (Key)
        {
            case "None": onNone(); return;
            case "Dacia": onDacia(); return;
            case "Tesla": onTesla(); return;
            case "BMW": onBMW(); return;
            case "Mercedes": onMercedes(); return;
            default: throw new InvalidOperationException($"Unhandled enumeration value: {Key}");
        }
    }

    /// <summary>Invokes the action corresponding to the current value, passing <paramref name="state"/>.</summary>
    /// <param name="state">The state to pass to the action.</param>
    /// <param name="onNone">Invoked when the current value is <see cref="None"/>.</param>
    /// <param name="onDacia">Invoked when the current value is <see cref="Dacia"/>.</param>
    /// <param name="onTesla">Invoked when the current value is <see cref="Tesla"/>.</param>
    /// <param name="onBMW">Invoked when the current value is <see cref="BMW"/>.</param>
    /// <param name="onMercedes">Invoked when the current value is <see cref="Mercedes"/>.</param>
    /// <typeparam name="TState">The type of the state object.</typeparam>
    /// <exception cref="InvalidOperationException">Thrown when no case matches.</exception>
    public void Match<TState>(TState state, Action<TState> onNone, Action<TState> onDacia, Action<TState> onTesla, Action<TState> onBMW, Action<TState> onMercedes)
    {
        switch (Key)
        {
            case "None": onNone(state); return;
            case "Dacia": onDacia(state); return;
            case "Tesla": onTesla(state); return;
            case "BMW": onBMW(state); return;
            case "Mercedes": onMercedes(state); return;
            default: throw new InvalidOperationException($"Unhandled enumeration value: {Key}");
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinkDotNet.Enumeration\src\EnumDemo\obj\GX\LinkDotNet.Enumeration\LinkDotNet.Enumeration.EnumerationGenerator\EnumerationAttribute.g.cs" label="EnumerationAttribute.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using System;

namespace LinkDotNet.Enumeration;

/// <summary>Specifies how static member names are derived from the string values.</summary>
internal enum Casing
{
    /// <summary>Converts each value to PascalCase (default).</summary>
    PascalCase,
    /// <summary>Uses the raw string value as the member name.</summary>
    Preserve
}

/// <summary>
/// Marks a <c>partial class</c> or <c>partial record</c> as a source-generated enumeration.
/// The generator emits: Key property, private constructor, static readonly fields,
/// All, Create, TryCreate, == / != operators, ToString, Match&lt;T&gt; and Match(Action).
/// </summary>
[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class EnumerationAttribute : Attribute
{
    public string[] Values \{ get; }
    public Casing MemberCasing \{ get; }
    /// <summary>
    /// When <see langword="true"/>, a <see cref="System.Text.Json.Serialization.JsonConverterAttribute"/>
    /// is applied to the enumeration type and a <c>\{TypeName}\}JsonConverter</c> class is generated
    /// that serializes and deserializes the type as its <c>Key</c> string using
    /// <see cref="System.Text.Json.JsonSerializer"/>.
    /// </summary>
    public bool GenerateJsonConverter \{ get; init; }
    public EnumerationAttribute(params string[] values) => (Values, MemberCasing) = (values, Casing.PascalCase);
    public EnumerationAttribute(Casing casing, params string[] values) => (Values, MemberCasing) = (values, casing);
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project LinkDotNet.Enumeration ](/sources/LinkDotNet.Enumeration.zip)

:::


### Share LinkDotNet.Enumeration 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinkDotNet.Enumeration&quote=LinkDotNet.Enumeration" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinkDotNet.Enumeration&text=LinkDotNet.Enumeration:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinkDotNet.Enumeration" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinkDotNet.Enumeration&title=LinkDotNet.Enumeration" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinkDotNet.Enumeration&title=LinkDotNet.Enumeration&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinkDotNet.Enumeration" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/LinkDotNet.Enumeration

<SameCategory />

