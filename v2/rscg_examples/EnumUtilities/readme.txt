# Enum Utilities

[![Build status](https://github.com/skarllot/EnumUtilities/actions/workflows/dotnet.yml/badge.svg?branch=main)](https://github.com/skarllot/EnumUtilities/actions)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/skarllot/EnumUtilities/badge)](https://securityscorecards.dev/viewer/?uri=github.com/skarllot/EnumUtilities)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/EngRajabi/Enum.Source.Generator/master/LICENSE)
[![Nuget](https://img.shields.io/nuget/v/Raiqub.Generators.EnumUtilities)](https://www.nuget.org/packages/Raiqub.Generators.EnumUtilities)
[![Nuget](https://img.shields.io/nuget/dt/Raiqub.Generators.EnumUtilities?label=Nuget.org%20Downloads&style=flat-square&color=blue)](https://www.nuget.org/packages/Raiqub.Generators.EnumUtilities)

_A source generator for C# that uses Roslyn to create extensions and parsers for enumerations_

[🏃 Quickstart](#quickstart) &nbsp; | &nbsp; [📗 Guide](#guide) &nbsp; | &nbsp; [📦 NuGet](https://www.nuget.org/packages/Raiqub.Generators.EnumUtilities)

<hr />

A source generator for C# that uses Roslyn to create extensions and parsers for enumerations, allowing to get a value associated to enum member or parse back from attribute value to enum member. All code generated at compile time thus avoid using reflection or boilerplate code.

## Compatibility

Raiqub.Generators.EnumUtilities runs with Roslyn compiler so does not introduce a new dependency to your project besides a library containing the EnumGenerator attribute.

It requires at least the .NET 6 SDK to run, but you can target earlier frameworks.

## Quickstart

Add the package to your application using

```shell
dotnet add package Raiqub.Generators.EnumUtilities
```

Adding the package will automatically add a marker attribute, `[EnumGenerator]`, to your project.

To use the generator, add the `[EnumGenerator]` attribute to an enum. For example:
 ```csharp
[EnumGenerator]
public enum Categories
{
    Electronics,
    Food,
    Automotive,
    Arts,
    BeautyCare,
    Fashion
}
```

This will generate 3 classes with the following methods:
- [CategoriesExtensions](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.CategoriesExtensions.g.cs)
  - ToStringFast(this Categories)
  - IsDefined(this Categories)
  - InterlockedAdd(this ref Categories, int)
  - InterlockedDecrement(this ref Categories)
  - InterlockedIncrement(this ref Categories)
  - InterlockedCompareExchange(this ref Categories, Categories, Categories)
  - InterlockedExchange(this ref Categories, Categories)
- [CategoriesFactory](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.CategoriesFactory.g.cs)
  - TryParse(string?, StringComparison, out Categories)
  - TryParseIgnoreCase(string?, out Categories)
  - TryParse(string?, out Categories)
  - TryParse(string?, StringComparison)
  - TryParseIgnoreCase(string?)
  - TryParse(string?)
  - GetValues()
  - GetNames()
- [CategoriesValidation](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.CategoriesValidation.g.cs)
  - IsDefined(Categories)
  - IsDefined(string?, StringComparison)
  - IsDefinedIgnoreCase(string?)
  - IsDefined(string?)

Bit flags enums are supported too:
```csharp
[Flags]
[EnumGenerator]
public enum Colours
{
    Red = 1,
    Blue = 2,
    Green = 4,
}
```

Then 3 classes will be generated with the following methods:
- [ColoursExtensions](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.ColoursExtensions.g.cs)
  - ToStringFast(this Colours)
  - IsDefined(this Colours)
  - InterlockedAnd(this ref Colours, Colours)
  - InterlockedOr(this ref Colours, Colours)
  - InterlockedCompareExchange(this ref Colours, Colours, Colours)
  - InterlockedExchange(this ref Colours, Colours)
- [ColoursFactory](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.ColoursFactory.g.cs)
  - TryParse(string?, StringComparison, out Colours)
  - TryParse(string?, out Colours)
  - TryParseIgnoreCase(string?, out Colours)
  - TryParse(string?)
  - TryParseIgnoreCase(string?)
  - TryParse(string?, StringComparison)
  - GetValues()
  - GetNames()
- [ColoursValidation](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.ColoursValidation.g.cs)
  - IsDefined(Colours)
  - IsDefined(string?, StringComparison)
  - IsDefinedIgnoreCase(string?)
  - IsDefined(string?)

All generated code are properly nullable annotated and removed from code coverage.

## Guide
The following attributes are supported:

### [EnumMemberAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.serialization.enummemberattribute)

Example:

```csharp
[EnumGenerator]
public enum PaymentMethod
{
    [EnumMember(Value = "Credit card")]
    Credit,
    [EnumMember(Value = "Debit card")]
    Debit,
    Cash,
    Cheque
}
```

This will generate the following methods:
- [PaymentMethodExtensions](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodExtensions.g.cs)
  - ToEnumMemberValue(this PaymentMethod)
- [PaymentMethodFactory](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodFactory.g.cs)
  - TryParseFromEnumMemberValue(string?, StringComparison, out PaymentMethod)
  - TryParseFromEnumMemberValue(string?, out PaymentMethod)
  - TryParseFromEnumMemberValue(string?, StringComparison)
  - TryParseFromEnumMemberValue(string?)

### [DescriptionAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.descriptionattribute)

Example:

```csharp
[EnumGenerator]
public enum PaymentMethod
{
    Credit,
    Debit,
    [Description("The payment by using physical cash")]
    Cash,
    Cheque
}
```

This will generate the following methods:
- [PaymentMethodExtensions](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodExtensions.g.cs)
  - GetDescription(this PaymentMethod)
- [PaymentMethodFactory](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodFactory.g.cs)
  - TryCreateFromDescription(string?, StringComparison, out PaymentMethod)
  - TryCreateFromDescription(string?, out PaymentMethod)
  - TryCreateFromDescription(string?, StringComparison)
  - TryCreateFromDescription(string?)

### [DisplayAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.displayattribute)

Example:

```csharp
[EnumGenerator]
public enum WeekDays
{
    [Display(
        Name = nameof(Strings.MondayFull),
        ShortName = nameof(Strings.MondayShort),
        Description = nameof(Strings.MondayDescription),
        ResourceType = typeof(Strings))]
    Monday,
    [Display(ShortName = "Tue")]
    Tuesday,
    [Display]
    Wednesday,
    [Display(Name = "Thursday")]
    Thursday,
    [Display(Name = "Friday", ShortName = "Fri")]
    Friday,
    [Display(ShortName = "Sat", Description = "Almost the last day of the week")]
    Saturday,
    [Display(Description = "The last day of the week")]
    Sunday
}
```

Note that if `ResourceType` is provided the generated code will correctly get the value from resource.

This will generate the following methods:
- [WeekDaysExtensions](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.WeekDaysExtensions.g.cs)
  - GetDisplayShortName(this WeekDays)
  - GetDisplayName(this WeekDays)
  - GetDescription(this WeekDays)
- [WeekDaysFactory](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.WeekDaysFactory.g.cs)
  - TryCreateFromDisplayShortName(string?, StringComparison, out WeekDays)
  - TryCreateFromDisplayShortName(string?, out WeekDays)
  - TryCreateFromDisplayShortName(string?, StringComparison)
  - TryCreateFromDisplayShortName(string?)
  - TryCreateFromDisplayName(string?, StringComparison, out WeekDays)
  - TryCreateFromDisplayName(string?, out WeekDays)
  - TryCreateFromDisplayName(string?, StringComparison)
  - TryCreateFromDisplayName(string?)
  - TryCreateFromDescription(string?, StringComparison, out WeekDays)
  - TryCreateFromDescription(string?, out WeekDays)
  - TryCreateFromDescription(string?, StringComparison)
  - TryCreateFromDescription(string?)

### JSON Serialization

Besides the member name, supports the [EnumMemberAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.serialization.enummemberattribute) and [JsonPropertyNameAttribute](https://docs.microsoft.com/en-us/dotnet/api/system.text.json.serialization.jsonpropertynameattribute) attributes.

Example:

```csharp
[JsonConverterGenerator]
[JsonConverter(typeof(SeasonJsonConverter))]
public enum Season
{
    [EnumMember(Value = "\ud83c\udf31")]
    Spring = 1,
    [EnumMember(Value = "\u2600\ufe0f")]
    Summer,
    [EnumMember(Value = "\ud83c\udf42")]
    Autumn,
    [EnumMember(Value = "\u26c4")]
    Winter
}
```

This will generate the following JSON converter: [SeasonJsonConverter](./tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.SeasonJsonConverter.g.cs).

## Contributing

If something is not working for you or if you think that the source file
should change, feel free to create an issue or Pull Request.
I will be happy to discuss and potentially integrate your ideas!

## License

See the [LICENSE](./LICENSE) file for details.
