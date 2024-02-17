# OptionsToString Incremental Source Generator

[![OptionToStringGenerator](https://github.com/Seekatar/OptionToStringGenerator/actions/workflows/dotnet.yml/badge.svg)](https://github.com/Seekatar/OptionToStringGenerator/actions/workflows/dotnet.yml)
[![codecov](https://codecov.io/gh/Seekatar/OptionToStringGenerator/branch/main/graph/badge.svg?token=X3J5MU9T3C)](https://codecov.io/gh/Seekatar/OptionToStringGenerator)

**Problem:** I have a configuration class for use with [IOptions](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options) and I want to safely log out its values at runtime.

**Solution:** Use an incremental source generator to generate an extension method to get a string with masked values for the properties.

> The methods to mask the values can be used outside of the generated code, too. See [below](#using-seekatarmask) for details.

This package generates an `OptionsToString`
extension method for a class. Using attributes you can control how the values are masked. You can use this to log out the values of your configuration at startup, or via a REST endpoint.

## Quick Example

Edit the source of your configuration class and decorate it with attributes.

```csharp
namespace Test;

[OptionsToString]
internal class PropertySimple
{
    [OutputMask]
    public string Secret { get; set; } = "Secret";

    public int RetryLimit { get; set; } = 5;

    [OutputRegex(Regex = "User Id=([^;]+).*Password=([^;]+)")]
    public string ConnectionString { get; set; } = "Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;";
}

// usage
_logger.LogInformation(new PropertySimple().OptionsToString());
```

Output:

```text
Test.PropertySimple:
  Secret           : "******"
  RetryLimit       : 5
  ConnectionString : "Server=myServerAddress;Database=myDataBase;User Id=***;Password=***;"
```

Alternatively, if you don't have the code for `PropertySimple` this will produce the same output.

```csharp
internal class PropertyConfig
{
    [OutputPropertyMask(nameof(IOptionsSimple.Secret))]
    [OutputPropertyRegex(nameof(IOptionsSimple.ConnectionString), Regex = "User Id=([^;]+).*Password=([^;]+)")]
    public PropertySimple? PropertySimple { get; set; }
}

// usage
_logger.LogInformation(new PropertyConfig().PropertySimple.OptionsToString());
```

## Usage

1. Add the [OptionToStringGenerator](https://www.nuget.org/packages/Seekatar.OptionToStringGenerator) NuGet package to your project.
2. If you can update the class
    1. Decorate a class with the `OptionsToString` attribute.
    1. Optionally decorate properties with an `Output*` attribute to specify how you want them to be masked. If you don't decorate a property, its full text is dumped out.
3. If you don't want to or can't update the class
    1. Add a property to your class of the Type you want to dump out.
    2. Decorate the property with multiple `OutputProperty*` attributes to control how the properties are masked.

### Example of Editing a Class

Here's a larger sample class that uses all the different types of masking. Anything without an attribute has its value written out in the clear. The output follows.

```csharp
namespace Test;
using Seekatar.OptionToStringGenerator;

[OptionsToString]
public class PublicOptions
{
    public class AClass
    {
        public string Name { get; set; } = "maybe this is secret";
        public override string ToString() => $"{nameof(AClass)}: {Name}";
    }

    public string PlainText { get; set; } = "hi mom";

    public char Why { get; set; } = 'Y';

    public int PlainInt { get; set; } = 42;

    public double PlainDouble { get; set; } = 3.141;

    public double PlainDecimal { get; set; } = 6.02;

    public DateTime PlainDateTime { get; set; } = new DateTime(2020, 1, 2, 3, 4, 5);

    public DateOnly PlainDatOnly { get; set; } = new DateOnly(2020, 1, 2);

    public TimeOnly PlainTimeOnly { get; set; } = new TimeOnly(12, 23, 2);

    public TimeSpan TimeSpan { get; set; } = new TimeSpan(1, 2, 3, 4, 5);

    public Guid UUID { get; set; } = Guid.Parse("6536b25c-3a45-48d8-8ea3-756e19f5bad1");

    public string? NullItem { get; set; }

    public AClass AnObject { get; set; } = new();

    [OutputRegex(Regex = @"AClass\:\s+(.*)")]
    public AClass AMaskedObject { get; set; } = new();

    [OutputMask]
    public string FullyMasked { get; set; } = "thisisasecret";

    [OutputMask(PrefixLen=3)]
    public string FirstThreeNotMasked { get; set; } = "abc1233435667";

    [OutputMask(SuffixLen=3)]
    public string LastThreeNotMasked { get; set; } = "abc1233435667";

    [OutputMask(PrefixLen = 3, SuffixLen=3)]
    public string FirstAndLastThreeNotMasked { get; set; } = "abc1233435667";

    [OutputMask(PrefixLen = 100)]
    public string NotMaskedSinceLongLength { get; set; } = "abc1233435667";

    [OutputLengthOnly]
    public string LengthOnly { get; set; } = "thisisasecretthatonlyshowsthelength";

    [OutputRegex(Regex="User Id=([^;]+).*Password=([^;]+)")]
    public string MaskUserAndPassword { get; set; } = "Server=server;Database=db;User Id=myUsername;Password=myPassword;";

    [OutputRegex(Regex="User Id=([^;]+).*Password=([^;]+)",IgnoreCase=true)]
    public string MaskUserAndPasswordIgnoreCase { get; set; } = "Server=server;Database=db;user Id=myUsername;Password=myPassword;";

    [OutputRegex(Regex = "User Id=([^;]+).*Password=([^;]+)")]
    public string RegexNotMatched { get; set; } = "Server=server;Database=db;user Id=myUsername;Password=myPassword;";

    public ConsoleColor Color { get; set; } = ConsoleColor.Red;

    [OutputIgnore]
    public string IgnoreMe { get; set; } = "abc1233435667";
}

// usage
var options = new PublicOptions();
_logger.LogInformation(options.OptionsToString());
```

The output has the class name (by default) followed by an indented list of all the properties' values masked as specified.

```text
Test.PublicOptions:
  PlainText                     : "hi mom"
  Why                           : "Y"
  PlainInt                      : 42
  PlainDouble                   : 3.141
  PlainDecimal                  : 6.02
  PlainDateTime                 : 01/02/2020 03:04:05
  PlainDatOnly                  : 01/02/2020
  PlainTimeOnly                 : 12:23
  TimeSpan                      : 1.02:03:04.0050000
  UUID                          : 6536b25c-3a45-48d8-8ea3-756e19f5bad1
  NullItem                      : null
  AnObject                      : "AClass: maybe this is secret"
  AMaskedObject                 : "AClass: ***"
  FullyMasked                   : "*************"
  FirstThreeNotMasked           : "abc**********"
  LastThreeNotMasked            : "**********667"
  FirstAndLastThreeNotMasked    : "abc*******667"
  NotMaskedSinceLongLength      : "abc1233435667"
  LengthOnly                    : Len = 35
  MaskUserAndPassword           : "Server=server;Database=db;User Id=***;Password=***;"
  MaskUserAndPasswordIgnoreCase : "Server=server;Database=db;user Id=***;Password=***;"
  RegexNotMatched               : "***Regex no match***!"
  Color                         : Red
  ```

### Example of Using a Property

Here's a similar example where you don't have the source for the class, or don't want to change it. In this case, you use multiple `OutputProperty*`  attributes, one for each property you want to mask.

This is from the tests where `PropertyPublicClass` is identical to `PublicOptions`, so the output will be the same aside from the class name.

```csharp
namespace Test;
using Seekatar.OptionToStringGenerator;

public class PropertyTestOptions
{
    public MyClass(IOption<PropertyPublicClass> options, ILogger<PropertyTestOptions> logger)
    {
        _options =options.Value;
        logger.LogInformation(options.OptionsToString());
    }

    [OutputPropertyRegex(nameof(PropertyPublicClass.AMaskedObject), Regex = @"AClass\:\s+(.*)")]
    [OutputPropertyMask(nameof(PropertyPublicClass.FullyMasked))]
    [OutputPropertyMask(nameof(PropertyPublicClass.FirstThreeNotMasked), PrefixLen = 3)]
    [OutputPropertyMask(nameof(PropertyPublicClass.LastThreeNotMasked), SuffixLen = 3)]
    [OutputPropertyMask(nameof(PropertyPublicClass.FirstAndLastThreeNotMasked), PrefixLen = 3, SuffixLen = 3)]
    [OutputPropertyMask(nameof(PropertyPublicClass.NotMaskedSinceLongLength), PrefixLen = 100)]
    [OutputPropertyLengthOnly(nameof(PropertyPublicClass.LengthOnly))]
    [OutputPropertyRegex(nameof(PropertyPublicClass.MaskUserAndPassword), Regex = "User Id=([^;]+).*Password=([^;]+)")]
    [OutputPropertyRegex(nameof(PropertyPublicClass.MaskUserAndPasswordIgnoreCase), Regex = "User Id=([^;]+).*Password=([^;]+)", IgnoreCase = true)]
    [OutputPropertyRegex(nameof(PropertyPublicClass.RegexNotMatched), Regex = "User Id=([^;]+).*Password=([^;]+)")]
    [OutputPropertyIgnore(nameof(PropertyPublicClass.IgnoreMe) )]
    public PropertyPublicClass? PublicClass { get; set; }
}

```

### Notes

- All public properties are included by default and output as plain text.
- Properties will be in the order they are defined in the class, unless `Sort=true` is set on the `OptionsToString` attribute.
- Parent class properties are included by default. Use `ExcludeParents = true` on the `OptionsToString` attribute to exclude them.
- Use the `OutputIgnore` attribute to exclude a property.
- `ToString()` is called on the property's value, then the mask is applied. You can have a custom `ToString()` method on a class to format its output then it will be masked as the `AClass` example above.
- When editing the class, only one `Output*` attribute is allowed per property. If more than one is set, you'll get a compile warning, and the last attribute set will be used.
- Regex strings with back slashes need to use a verbatim string or escape the back slashes (e.g.  `@"\s+"`  or `"\\s+"`).
- `OutputRegex` must have a `Regex` parameter, or you'll get a compile error.
- If the regex doesn't match the value, the output will be `***Regex no match***!` to indicate it didn't match.
- To customize the formatting of masked output see [below](#per-property-formatting-options)

### Formatting Options

There are properties on the `OptionsToStringAttribute` for classes and `OutputPropertyFormat` for properties to control how the output is generated.

| Name        | Description                                | Default           |
| ----------- | ------------------------------------------ | ----------------- |
| `Indent`    | The indenting string                       | "  " (Two spaces) |
| `Separator` | The name-value separator                   | ":"               |
| `Title`     | The title to use for the output. See below | Class name        |
| `Json`      | Format the output as JSON                  | false             |
| `Sort`      | Sort the properties                        | false             |

In addition to literal text, the `Title` parameter can include property names in braces. For example

```csharp
// for a class
[OptionsToString(Title = nameof(TitleOptions) + "_{StringProp}_{IntProp}")]
public class TitleOptions
{
    public int IntProp { get; set; } = 42;
    public string StringProp { get; set; } = "hi mom";
}

// for a property
internal class PropertyTestSimple
{
    [OutputPropertyFormat(Title = nameof(TitleOptions) + "_{StringProp}_{IntProp}")]
    public TitleOptions TitleOptions { get; set; } = new ();
}
```

Both will output

```text
TitleOptions_hi mom_42:
  IntProp    : 42
  StringProp : "hi mom"
```

### Per-Property Formatting Options

For types that take a format string to `ToString()` such as `DateTime`, numbers, etc., you can use the `OutputFormatToString` attribute. You can also supply a custom method to format a property. For example flattening an array and masking its values. The sample below shows a few examples:

```csharp
    # comma separate thousands
    [OutputFormatToString("N0")]
    public int PlainInt { get; set; } = 423433;

    # two decimal places
    [OutputFormatToString("0.00")]
    public double PlainDouble { get; set; } = 3.141;

    # use the U format for DateTime
    [OutputFormatToString("R")]
    public DateTime PlainDateTime { get; set; } = new DateTime(2020, 1, 2, 3, 4, 5);

    [OutputFormatProvider(typeof(FormatOptions), nameof(MyFormatter))]
    public List<string> Secrets { get; set; } = new List<string> { "secret", "hushhush", "psssst" };

    # mask each string in the array showing only the first 3 characters
    public static string? MyFormatter(List<string> o)
    {
        if (o is null) return null;
        return string.Join(",", o.Select(s => Mask.MaskSuffix(s, 3)));
    }
```

Output:

```text
  PlainInt      : 423,433
  PlainDouble   : 3.14
  PlainDateTime : Thu, 02 Jan 2020 03:04:05 GMT
  Secrets       : "sec***,hus*****,pss***"
```

### Collections

Instead of using `OutputFormatProvider`, you can create your own method to handle collections. The `MessagingOptions` test class does so by overriding `ToString` to get its options and all the children.

```csharp
public override string ToString()
{
    var sb = new StringBuilder(this.OptionsToString());
    sb.AppendLine();
    foreach (var c in Consumers ?? new Dictionary<string, ClientOptions>())
    {
        sb.AppendLine(c.Value.OptionsToString());
    }
    foreach (var p in Producers ?? new Dictionary<string, ClientOptions>())
    {
        sb.AppendLine(p.Value.OptionsToString());
    }

    return sb.ToString();
}
```

## Attributes

For a class use these attributes.

| Name                 | On     | Description                                                          |
| -------------------- | ------ | -------------------------------------------------------------------- |
| OptionsToString      | Class  | Marker for the class, and has formatting options                     |
| OutputMask           | Member | Mask the value with asterisks, with optional prefix and suffix clear |
| OutputRegex          | Member | Mask the value with a regex                                          |
| OutputLengthOnly     | Member | Only output the length of the value                                  |
| OutputIgnore         | Member | Ignore the property                                                  |
| OutputFormatToString | Member | Format the value using ToString() with a format string               |
| OutputFormatProvider | Member | Format the value using a custom method                               |

For a property, use these attributes on the property

| Name                     | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| OutputPropertyFormat     | Optional Formatting options                                    |
| OutputPropertyMask       | Mask the value with asterisks, with optional prefix and suffix |
| OutputPropertyRegex      | Mask the value with a regex                                    |
| OutputPropertyLengthOnly | Only output the length of the value                            |
| OutputPropertyIgnore     | Ignore the property                                            |

## Warnings and Errors

If attributes have invalid parameters you will get warnings or errors from the compiler. They are documented [here](https://github.com/Seekatar/OptionToStringGenerator/wiki/Error-Messages).

## Trouble Shooting

### Error CS9057

You may get an error when compiling your code that uses this package.

`##[error]#15 7.135 CSC : error CS9057: The analyzer assembly '/root/.nuget/packages/seekatar.optiontostringgenerator/0.1.4/analyzers/dotnet/cs/Seekatar.OptionToStringGenerator.dll' references version '4.6.0.0' of the compiler, which is newer than the currently running version '4.4.0.0'.`

You must use the .NET SDK 6.0.416 or higher. You can check your version with `dotnet --list-sdks`.

## Using Seekatar.Mask

The methods used by the generated code to mask a value are available when you include the source generator NuGet package. They are in the `Seekatar.Mask` namespace.

```csharp
using static Seekatar.Mask;

...
MaskSuffix("abc123", 3) // returns "abc***"
```

Methods are as follows. Each of these corresponds to an attribute as described [above](#attributes). All take `object?` and return `string?`. Check each for parameters that control usage.

| Method           | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| MaskAll          | Return a string of the same length as the input, with all characters masked |
| MaskLengthOnly   | Return `Len <length>`                                                       |
| MaskPrefix       | Mask the prefix of the string, showing only a few suffix characters         |
| MaskPrefixSuffix | Show only a few prefix and suffix characters                                |
| MaskRegex        | Mask capture groups of a regex                                              |
| MaskSuffix       | Mask the suffix of the string, showing only a few prefix characters         |

## Implementation

Big shout out to Andrew Lock and his [blog series](https://andrewlock.net/creating-a-source-generator-part-1-creating-an-incremental-source-generator/) on incremental source generators. I used that as a starting point for this project.

His blog tells his story of building a source generator and you learn better ways to do things as you progress through the blog.

In particular, in the last entry he breaks out the `Attributes` into their own assembly. In the initial generator, he injects the `Attributes` as code with these lines in the `Initialize` method of the generator, which is the typical method like this:

```csharp
context.RegisterPostInitializationOutput(ctx => ctx.AddSource(
    "ClassExtensionsAttribute.g.cs",
    SourceText.From(SourceGenerationHelper.Attribute, Encoding.UTF8)));
```

He says this works fine unless someone uses `InternalsVisibleTo` to expose the internals of one assembly to another. He tried several things to solve this before coming up with a robust solution in [part 8](https://andrewlock.net/creating-a-source-generator-part-8-solving-the-source-generator-marker-attribute-problem-part2/) of his series. There's quite a bit of advanced csproj editing that he covers to get it to work. I applied similar changes and everything but the unit tests worked. After viewing his [repo](https://github.com/andrewlock/StronglyTypedId), I found his original unit test helper methods to build the code on-the-fly for the unit tests was different. After picking up those changes, the unit tests worked.

### Basic Logic of OptionsToStringGenerator.Initialize()

This has the implementation of [IIncrementalGenerator](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.iincrementalgenerator).Initialize method. For this generator here's what I did:

1. Look for classes with at least one attribute (predicate, which must be very fast)
2. Look for ones with my `OptionToStringAttribute` (transform, which can be slower)
3. Execute() generates the code
    1. Take the syntax and get the semantic model of the class, extracting the name, accessibility, and list of properties with a `get`
    2. Generate the code for the extension method

## Branching Strategy

1. Branch from `main` for new features
2. Pushes will trigger a build and test run using GitHub Actions
3. When ready, create a PR to `main`
4. To push to the NuGet Gallery create a `releases/vX.X.X` branch and push to it.

## Debugging and Testing

To debug the generator, the `unit` test project calls `RunGeneratorsAndUpdateCompilation` to run the generator and get the output. The unit test output will be the C# code for the extension method of the objects.

The `integration` test project runs the generator then calls the extension methods and gets the output from it.

In both cases, the output is written to files and the Verify package is used to compare the output to a snapshot file.

For integration tests, if you make changes to the generator, you often have to restart Visual Studio to get it to load the new one.

## Links to Documentation

These are links to the MS documentation for the items I used in the generator.

[ISymbol](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isymbol?view=roslyn-dotnet-4.6.0) -- Base class for all semantic symbols

[IPropertySymbol](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.ipropertysymbol?view=roslyn-dotnet-4.6.0) -- Semantic for the property

- [GetMethod](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.ipropertysymbol.getmethod?view=roslyn-dotnet-4.6.0) -- is it a {get}
- [DeclaredAccessibility](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isymbol.declaredaccessibility) -- is it public?

[INamedTypeSymbol](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.inamedtypesymbol) -- More specific semantic for the class

- [GetAttributes](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isymbol.getattributes?view=roslyn-dotnet-4.6.0)
- [ContainingNamespace](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isymbol.containingnamespace?view=roslyn-dotnet-4.6.0)
- [DeclaredAccessibility](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isymbol.declaredaccessibility?view=roslyn-dotnet-4.6.0)
- [GetMembers](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.inamespaceortypesymbol.getmembers) -- get all the members of the class

## Links

- [Andrew Lock's blog series on incremental generators (Part 1)](https://andrewlock.net/creating-a-source-generator-part-1-creating-an-incremental-source-generator/)
- [Verify snapshot test tool](https://github.com/VerifyTests/Verify)
- [MS Build (csproj) Pack Doc](https://learn.microsoft.com/en-us/nuget/reference/msbuild-targets) covers some of the less frequently used options
- [MS LoggerMessage source generator source code](https://github.com/dotnet/runtime/tree/25c675ff78e0446fe596cea25c7e3969b0936a33/src/libraries/Microsoft.Extensions.Logging.Abstractions/gen) referenced by Andrew.
- [MS .NET Generators' source code](https://github.com/dotnet/extensions/tree/f34d120d2654057a31dc96d7f86dc42629044472/src/Generators)
