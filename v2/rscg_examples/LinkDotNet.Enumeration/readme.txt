# Enumeration

[![.NET](https://github.com/linkdotnet/Enumeration/actions/workflows/dotnet.yml/badge.svg)](https://github.com/linkdotnet/Enumeration/actions/workflows/dotnet.yml)
[![Nuget](https://img.shields.io/nuget/dt/LinkDotNet.Enumeration)](https://www.nuget.org/packages/LinkDotNet.Enumeration/)
[![GitHub tag](https://img.shields.io/github/v/tag/linkdotnet/Enumeration?include_prereleases&logo=github&style=flat-square)](https://github.com/linkdotnet/Enumeration/releases)

Source code generated string Enumeration with completeness!

## What is in the box?

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

## Exhaustiveness

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

## More features!

### Controlling field names

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

### Creating from a string key

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

### Parsing (IParsable)

The generated types implement `IParsable<T>` and `ISpanParsable<T>`, making them compatible with modern .NET features like Minimal APIs and Model Binding.

```csharp
if (Color.TryParse("Red", null, out var color))
{
    // Use color
}
```

### Implicit/Explicit Conversions

Instances of the generated enumeration can be implicitly converted to strings (returns the `Key` property), and strings can be explicitly converted back to the enumeration type (calls `Create`).

```csharp
string colorKey = Color.Red; // Implicit conversion
var color = (Color)"Green"; // Explicit conversion
```

### Equality and Comparison

Records implement value-based equality by default. For classes, `IEquatable<T>` is automatically implemented, comparing the `Key` property.

```csharp
var isRed = Color.Red == "Red"; // String comparison
var areEqual = Color.Red.Equals(Color.Create("Red")); // Value equality
```

### Getting all values

Calling `All` will return a collection of all possible values. This is implemented using a `FrozenSet` to ensure immutability and thread-safety.

## `JsonConverter` Generation

The library allows via the `GenerateJsonConverter` property on the `Enumeration` attribute to generate a `JsonConverter` for the enumeration type. This converter will handle serialization and deserialization of the enumeration values as their string keys.

```csharp
[Enumeration("Red", "Green", "Blue", GenerateJsonConverter = true)]
public sealed partial record Color;
```

This will generate a `JsonConverter` that can be used with `System.Text.Json` to serialize and deserialize `Color` instances as their string keys. The generated converter is called `{TypeName}JsonConverter`.

### Limitations

* Your code should run at least `net8.0` or later, as the library uses things like `FrozenSet`.
