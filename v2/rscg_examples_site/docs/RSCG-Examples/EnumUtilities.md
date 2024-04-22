---
sidebar_position: 1310
title: 131 - EnumUtilities
description: Enum to string- and multiple other extensions for an enum
slug: /EnumUtilities
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# EnumUtilities  by Fabricio Godoy


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/EnumUtilities?label=EnumUtilities)](https://www.nuget.org/packages/EnumUtilities/)
[![GitHub last commit](https://img.shields.io/github/last-commit/skarllot/EnumUtilities?label=updated)](https://github.com/skarllot/EnumUtilities)
![GitHub Repo stars](https://img.shields.io/github/stars/skarllot/EnumUtilities?style=social)

## Details

### Info
:::info

Name: **EnumUtilities**

Provides generic enum functions such as bitwise operations, fast HasFlag, and others.

Author: Fabricio Godoy

NuGet: 
*https://www.nuget.org/packages/EnumUtilities/*   


You can find more details at https://github.com/skarllot/EnumUtilities

Source : https://github.com/skarllot/EnumUtilities

:::

### Original Readme
:::note

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
- [CategoriesExtensions](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.CategoriesExtensions.g.cs)
  - ToStringFast(this Categories)
  - IsDefined(this Categories)
  - InterlockedAdd(this ref Categories, int)
  - InterlockedDecrement(this ref Categories)
  - InterlockedIncrement(this ref Categories)
  - InterlockedCompareExchange(this ref Categories, Categories, Categories)
  - InterlockedExchange(this ref Categories, Categories)
- [CategoriesFactory](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.CategoriesFactory.g.cs)
  - TryParse(string?, StringComparison, out Categories)
  - TryParseIgnoreCase(string?, out Categories)
  - TryParse(string?, out Categories)
  - TryParse(string?, StringComparison)
  - TryParseIgnoreCase(string?)
  - TryParse(string?)
  - GetValues()
  - GetNames()
- [CategoriesValidation](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.CategoriesValidation.g.cs)
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
- [ColoursExtensions](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.ColoursExtensions.g.cs)
  - ToStringFast(this Colours)
  - IsDefined(this Colours)
  - InterlockedAnd(this ref Colours, Colours)
  - InterlockedOr(this ref Colours, Colours)
  - InterlockedCompareExchange(this ref Colours, Colours, Colours)
  - InterlockedExchange(this ref Colours, Colours)
- [ColoursFactory](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.ColoursFactory.g.cs)
  - TryParse(string?, StringComparison, out Colours)
  - TryParse(string?, out Colours)
  - TryParseIgnoreCase(string?, out Colours)
  - TryParse(string?)
  - TryParseIgnoreCase(string?)
  - TryParse(string?, StringComparison)
  - GetValues()
  - GetNames()
- [ColoursValidation](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.ColoursValidation.g.cs)
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
- [PaymentMethodExtensions](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodExtensions.g.cs)
  - ToEnumMemberValue(this PaymentMethod)
- [PaymentMethodFactory](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodFactory.g.cs)
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
- [PaymentMethodExtensions](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodExtensions.g.cs)
  - GetDescription(this PaymentMethod)
- [PaymentMethodFactory](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.PaymentMethodFactory.g.cs)
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
- [WeekDaysExtensions](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.WeekDaysExtensions.g.cs)
  - GetDisplayShortName(this WeekDays)
  - GetDisplayName(this WeekDays)
  - GetDescription(this WeekDays)
- [WeekDaysFactory](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.WeekDaysFactory.g.cs)
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

This will generate the following JSON converter: [SeasonJsonConverter](https://github.com/skarllot/EnumUtilities/tests/EnumUtilities.IntegrationTests/Generated/Raiqub.Generators.EnumUtilities/Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator/Raiqub.Generators.EnumUtilities.IntegrationTests.Models.SeasonJsonConverter.g.cs).

## Contributing

If something is not working for you or if you think that the source file
should change, feel free to create an issue or Pull Request.
I will be happy to discuss and potentially integrate your ideas!

## License

See the [LICENSE](https://github.com/skarllot/EnumUtilities/LICENSE) file for details.


:::

### About
:::note

Enum to string- and multiple other extensions for an enum


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **EnumUtilities**
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
    <PackageReference Include="Raiqub.Generators.EnumUtilities" Version="1.6.14" />
  </ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EnumUtilities\src\EnumClassDemo\Program.cs" label="Program.cs" >

  This is the use of **EnumUtilities** in *Program.cs*

```csharp showLineNumbers 
using EnumClassDemo;
Console.WriteLine(Colors.None.ToStringFast());
Console.WriteLine(Colors.None.ToEnumMemberValue());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EnumUtilities\src\EnumClassDemo\Colors.cs" label="Colors.cs" >

  This is the use of **EnumUtilities** in *Colors.cs*

```csharp showLineNumbers 
using Raiqub.Generators.EnumUtilities;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EnumClassDemo;
[EnumGenerator]
[Flags]
//[JsonConverterGenerator]
//[JsonConverter(typeof(ColorJsonConverter))]
public enum Colors
{
    //[Display(ShortName = "This should be never seen")]
    [EnumMember(Value = "This should be never seen")]
    None =0,
    Red=1,
    Green=2,
    Blue=4,
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EnumUtilities\src\EnumClassDemo\Program.cs" label="Program.cs" >

  This is the use of **EnumUtilities** in *Program.cs*

```csharp showLineNumbers 
using EnumClassDemo;
Console.WriteLine(Colors.None.ToStringFast());
Console.WriteLine(Colors.None.ToEnumMemberValue());
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EnumUtilities\src\EnumClassDemo\obj\GX\Raiqub.Generators.EnumUtilities\Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator\EnumClassDemo.ColorsExtensions.g.cs" label="EnumClassDemo.ColorsExtensions.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System;
using System.Runtime.CompilerServices;
using System.Threading;

#pragma warning disable CS1591 // publicly visible type or member must be documented

namespace EnumClassDemo
{
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Raiqub.Generators.EnumUtilities", "1.6.0.0")]
    public static partial class ColorsExtensions
    {
        /// <summary>Converts the value of this instance to its equivalent string representation.</summary>
        /// <returns>The string representation of the value of this instance.</returns>
        public static string ToStringFast(this Colors value)
        {
            return value switch
            {
                Colors.None => nameof(Colors.None),
                Colors.Red => nameof(Colors.Red),
                Colors.Green => nameof(Colors.Green),
                Colors.Blue => nameof(Colors.Blue),
                _ => value.ToString()
            };
        }

        /// <summary>Returns a boolean telling whether the value of this instance exists in the enumeration.</summary>
        /// <returns><c>true</c> if the value of this instance exists in the enumeration; <c>false</c> otherwise.</returns>
        public static bool IsDefined(this Colors value)
        {
            return ColorsValidation.IsDefined(value);
        }

    #if NET5_0_OR_GREATER
        /// <summary>Bitwise "ands" two enumerations and replaces the first value with the result, as an atomic operation.</summary>
        /// <param name="location">A variable containing the first value to be combined.</param>
        /// <param name="value">The value to be combined with the value at <paramref name="location" />.</param>
        /// <returns>The original value in <paramref name="location" />.</returns>
        public static Colors InterlockedAnd(this ref Colors location, Colors value)
        {
            ref int locationRaw = ref Unsafe.As<Colors, int>(ref location);
            int resultRaw = Interlocked.And(ref locationRaw, Unsafe.As<Colors, int>(ref value));
            return Unsafe.As<int, Colors>(ref resultRaw);
        }

        /// <summary>Bitwise "ors" two enumerations and replaces the first value with the result, as an atomic operation.</summary>
        /// <param name="location">A variable containing the first value to be combined.</param>
        /// <param name="value">The value to be combined with the value at <paramref name="location" />.</param>
        /// <returns>The original value in <paramref name="location" />.</returns>
        public static Colors InterlockedOr(this ref Colors location, Colors value)
        {
            ref int locationRaw = ref Unsafe.As<Colors, int>(ref location);
            int resultRaw = Interlocked.Or(ref locationRaw, Unsafe.As<Colors, int>(ref value));
            return Unsafe.As<int, Colors>(ref resultRaw);
        }
    #endif

        /// <summary>Compares two enumerations for equality and, if they are equal, replaces the first value.</summary>
        /// <param name="location">The destination, whose value is compared with <paramref name="comparand" /> and possibly replaced.</param>
        /// <param name="value">The value that replaces the destination value if the comparison results in equality.</param>
        /// <param name="comparand">The value that is compared to the value at <paramref name="location" />.</param>
        /// <returns>The original value in <paramref name="location" />.</returns>
        public static Colors InterlockedCompareExchange(this ref Colors location, Colors value, Colors comparand)
        {
            ref int locationRaw = ref Unsafe.As<Colors, int>(ref location);
            int resultRaw = Interlocked.CompareExchange(ref locationRaw, Unsafe.As<Colors, int>(ref value), Unsafe.As<Colors, int>(ref comparand));
            return Unsafe.As<int, Colors>(ref resultRaw);
        }

        /// <summary>Sets an enumeration value to a specified value and returns the original value, as an atomic operation.</summary>
        /// <param name="location">The variable to set to the specified value.</param>
        /// <param name="value">The value to which the <paramref name="location" /> parameter is set.</param>
        /// <returns>The original value of <paramref name="location" />.</returns>
        public static Colors InterlockedExchange(this ref Colors location, Colors value)
        {
            ref int locationRaw = ref Unsafe.As<Colors, int>(ref location);
            int resultRaw = Interlocked.Exchange(ref locationRaw, Unsafe.As<Colors, int>(ref value));
            return Unsafe.As<int, Colors>(ref resultRaw);
        }

        public static string ToEnumMemberValue(this Colors value)
        {
            return value switch
            {
                Colors.None => "This should be never seen",
                Colors.Red => nameof(Colors.Red),
                Colors.Green => nameof(Colors.Green),
                Colors.Blue => nameof(Colors.Blue),
                _ => value.ToString()
            };
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EnumUtilities\src\EnumClassDemo\obj\GX\Raiqub.Generators.EnumUtilities\Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator\EnumClassDemo.ColorsFactory.g.cs" label="EnumClassDemo.ColorsFactory.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;

#pragma warning disable CS1591 // publicly visible type or member must be documented

namespace EnumClassDemo
{
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Raiqub.Generators.EnumUtilities", "1.6.0.0")]
    public static partial class ColorsFactory
    {
        /// <summary>
        /// Converts the string representation of the name or numeric value of one or more enumerated constants to
        /// an equivalent enumerated object. The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert.</param>
        /// <param name="comparisonType">One of the enumeration values that specifies how the strings will be compared.</param>
        /// <param name="result">
        /// When this method returns, result contains an object of type Colors whose value is represented by value
        /// if the parse operation succeeds. If the parse operation fails, result contains the default value of the
        /// underlying type of Colors. Note that this value need not be a member of the Colors enumeration.
        /// </param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        /// <exception cref="ArgumentException"><paramref name="comparisonType"/> is not a <see cref="StringComparison"/> value.</exception>
        public static bool TryParse(
            [NotNullWhen(true)] string? name,
            StringComparison comparisonType,
            out Colors result)
        {
            switch (name)
            {
                case { } s when s.Equals(nameof(Colors.None), comparisonType):
                    result = Colors.None;
                    return true;
                case { } s when s.Equals(nameof(Colors.Red), comparisonType):
                    result = Colors.Red;
                    return true;
                case { } s when s.Equals(nameof(Colors.Green), comparisonType):
                    result = Colors.Green;
                    return true;
                case { } s when s.Equals(nameof(Colors.Blue), comparisonType):
                    result = Colors.Blue;
                    return true;
                case { } s when TryParseNumeric(s, comparisonType, out int val):
                    result = (Colors)val;
                    return true;
                default:
                    return Enum.TryParse(name, out result);
            }
        }

        /// <summary>
        /// Converts the string representation of the name or numeric value of one or more enumerated constants to
        /// an equivalent enumerated object. The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert.</param>
        /// <param name="result">
        /// When this method returns, result contains an object of type Colors whose value is represented by value
        /// if the parse operation succeeds. If the parse operation fails, result contains the default value of the
        /// underlying type of Colors. Note that this value need not be a member of the Colors enumeration.
        /// </param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
            [NotNullWhen(true)] string? name,
            out Colors result)
        {
            switch (name)
            {
                case nameof(Colors.None):
                    result = Colors.None;
                    return true;
                case nameof(Colors.Red):
                    result = Colors.Red;
                    return true;
                case nameof(Colors.Green):
                    result = Colors.Green;
                    return true;
                case nameof(Colors.Blue):
                    result = Colors.Blue;
                    return true;
                case { } s when TryParseNumeric(s, StringComparison.Ordinal, out int val):
                    result = (Colors)val;
                    return true;
                default:
                    return Enum.TryParse(name, out result);
            }
        }

        /// <summary>
        /// Converts the string representation of the name or numeric value of one or more enumerated constants to
        /// an equivalent enumerated object. The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert.</param>
        /// <param name="result">
        /// When this method returns, result contains an object of type Colors whose value is represented by value
        /// if the parse operation succeeds. If the parse operation fails, result contains the default value of the
        /// underlying type of Colors. Note that this value need not be a member of the Colors enumeration.
        /// </param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParseIgnoreCase(
            [NotNullWhen(true)] string? name,
            out Colors result)
        {
            return TryParse(name, StringComparison.OrdinalIgnoreCase, out result);
        }

        /// <summary>
        /// Converts the string representation of the name or numeric value of one or more enumerated constants to
        /// an equivalent enumerated object.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert.</param>
        /// <returns>
        /// Contains an object of type Colors whose value is represented by value if the parse operation succeeds.
        /// If the parse operation fails, result contains <c>null</c> value.
        /// </returns>
        public static Colors? TryParse(string? name)
        {
            return TryParse(name, out Colors result) ? result : null;
        }

        /// <summary>
        /// Converts the string representation of the name or numeric value of one or more enumerated constants to
        /// an equivalent enumerated object.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert.</param>
        /// <returns>
        /// Contains an object of type Colors whose value is represented by value if the parse operation succeeds.
        /// If the parse operation fails, result contains <c>null</c> value.
        /// </returns>
        public static Colors? TryParseIgnoreCase(string? name)
        {
            return TryParse(name, StringComparison.OrdinalIgnoreCase, out Colors result) ? result : null;
        }

        /// <summary>
        /// Converts the string representation of the name or numeric value of one or more enumerated constants to
        /// an equivalent enumerated object.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert.</param>
        /// <param name="comparisonType">One of the enumeration values that specifies how the strings will be compared.</param>
        /// <returns>
        /// Contains an object of type Colors whose value is represented by value if the parse operation succeeds.
        /// If the parse operation fails, result contains <c>null</c> value.
        /// </returns>
        /// <exception cref="ArgumentException"><paramref name="comparisonType"/> is not a <see cref="StringComparison"/> value.</exception>
        public static Colors? TryParse(string? name, StringComparison comparisonType)
        {
            return TryParse(name, comparisonType, out Colors result) ? result : null;
        }

        /// <summary>
        /// Converts the string representation of the value associated with one enumerated constant to
        /// an equivalent enumerated object. The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="enumMemberValue">The value as defined with <see cref="System.Runtime.Serialization.EnumMemberAttribute"/>.</param>
        /// <param name="comparisonType">One of the enumeration values that specifies how the strings will be compared.</param>
        /// <param name="result">
        /// When this method returns, result contains an object of type Colors whose value is represented by value
        /// if the parse operation succeeds. If the parse operation fails, result contains the default value of the
        /// underlying type of Colors. Note that this value need not be a member of the Colors enumeration.
        /// </param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        /// <exception cref="ArgumentException"><paramref name="comparisonType"/> is not a <see cref="StringComparison"/> value.</exception>
        public static bool TryParseFromEnumMemberValue(
            [NotNullWhen(true)] string? enumMemberValue,
            StringComparison comparisonType,
            out Colors result)
        {
            switch (enumMemberValue)
            {
                case { } s when s.Equals("This should be never seen", comparisonType):
                    result = Colors.None;
                    return true;
                case { } s when s.Equals(nameof(Colors.Red), comparisonType):
                    result = Colors.Red;
                    return true;
                case { } s when s.Equals(nameof(Colors.Green), comparisonType):
                    result = Colors.Green;
                    return true;
                case { } s when s.Equals(nameof(Colors.Blue), comparisonType):
                    result = Colors.Blue;
                    return true;
                default:
                    result = default;
                    return false;
            }
        }

        /// <summary>
        /// Converts the string representation of the value associated with one enumerated constant to
        /// an equivalent enumerated object. The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="enumMemberValue">The value as defined with <see cref="System.Runtime.Serialization.EnumMemberAttribute"/>.</param>
        /// <param name="result">
        /// When this method returns, result contains an object of type Colors whose value is represented by value
        /// if the parse operation succeeds. If the parse operation fails, result contains the default value of the
        /// underlying type of Colors. Note that this value need not be a member of the Colors enumeration.
        /// </param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParseFromEnumMemberValue([NotNullWhen(true)] string? enumMemberValue, out Colors result)
        {
            return TryParseFromEnumMemberValue(enumMemberValue, StringComparison.Ordinal, out result);
        }

        /// <summary>
        /// Converts the string representation of the value associated with one enumerated constant to
        /// an equivalent enumerated object.
        /// </summary>
        /// <param name="enumMemberValue">The value as defined with <see cref="System.Runtime.Serialization.EnumMemberAttribute"/>.</param>
        /// <param name="comparisonType">One of the enumeration values that specifies how the strings will be compared.</param>
        /// <returns>
        /// Contains an object of type Colors whose value is represented by value if the parse operation succeeds.
        /// If the parse operation fails, result contains a null value.
        /// </returns>
        /// <exception cref="ArgumentException"><paramref name="comparisonType"/> is not a <see cref="StringComparison"/> value.</exception>
        public static Colors? TryParseFromEnumMemberValue(string? enumMemberValue, StringComparison comparisonType)
        {
            return TryParseFromEnumMemberValue(enumMemberValue, comparisonType, out Colors result) ? result : null;
        }

        /// <summary>
        /// Converts the string representation of the value associated with one enumerated constant to
        /// an equivalent enumerated object.
        /// </summary>
        /// <param name="enumMemberValue">The value as defined with <see cref="System.Runtime.Serialization.EnumMemberAttribute"/>.</param>
        /// <returns>
        /// Contains an object of type Colors whose value is represented by value if the parse operation succeeds.
        /// If the parse operation fails, result contains a null value.
        /// </returns>
        public static Colors? TryParseFromEnumMemberValue(string? enumMemberValue)
        {
            return TryParseFromEnumMemberValue(enumMemberValue, StringComparison.Ordinal, out Colors result) ? result : null;
        }

        /// <summary>Retrieves an array of the values of the constants in the Colors enumeration.</summary>
        /// <returns>An array that contains the values of the constants in Colors.</returns>
        public static Colors[] GetValues()
        {
            return new[]
            {
                Colors.None,
                Colors.Red,
                Colors.Green,
                Colors.Blue,
            };
        }

        /// <summary>Retrieves an array of the names of the constants in Colors enumeration.</summary>
        /// <returns>A string array of the names of the constants in Colors.</returns>
        public static string[] GetNames()
        {
            return new[]
            {
                nameof(Colors.None),
                nameof(Colors.Red),
                nameof(Colors.Green),
                nameof(Colors.Blue),
            };
        }

        private static bool TryParseNumeric(
            string name,
            StringComparison comparisonType,
            out int result)
        {
            switch (comparisonType)
            {
                case StringComparison.CurrentCulture:
                case StringComparison.CurrentCultureIgnoreCase:
                    return int.TryParse(name, NumberStyles.Integer, NumberFormatInfo.CurrentInfo, out result);
                case StringComparison.InvariantCulture:
                case StringComparison.InvariantCultureIgnoreCase:
                case StringComparison.Ordinal:
                case StringComparison.OrdinalIgnoreCase:
                    return int.TryParse(name, NumberStyles.Integer, NumberFormatInfo.InvariantInfo, out result);
                default:
                    return int.TryParse(name, out result);
            }
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EnumUtilities\src\EnumClassDemo\obj\GX\Raiqub.Generators.EnumUtilities\Raiqub.Generators.EnumUtilities.EnumUtilitiesGenerator\EnumClassDemo.ColorsValidation.g.cs" label="EnumClassDemo.ColorsValidation.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System;
using System.Diagnostics.CodeAnalysis;

#pragma warning disable CS1591 // publicly visible type or member must be documented

namespace EnumClassDemo
{
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Raiqub.Generators.EnumUtilities", "1.6.0.0")]
    public static partial class ColorsValidation
    {
        /// <summary>Returns a boolean telling whether the value of <see cref="Colors"/> instance exists in the enumeration.</summary>
        /// <returns><c>true</c> if the value of <see cref="Colors"/> instance exists in the enumeration; <c>false</c> otherwise.</returns>
        public static bool IsDefined(Colors value)
        {
            return value switch
            {
                Colors.None => true,
                Colors.Red => true,
                Colors.Green => true,
                Colors.Blue => true,
                _ => false
            };
        }

        public static bool IsDefined(
            [NotNullWhen(true)] string? name,
            StringComparison comparisonType)
        {
            return name switch
            {
                { } s when s.Equals(nameof(Colors.None), comparisonType) => true,
                { } s when s.Equals(nameof(Colors.Red), comparisonType) => true,
                { } s when s.Equals(nameof(Colors.Green), comparisonType) => true,
                { } s when s.Equals(nameof(Colors.Blue), comparisonType) => true,
                _ => false
            };
        }

        public static bool IsDefinedIgnoreCase([NotNullWhen(true)] string? name)
        {
            return IsDefined(name, StringComparison.OrdinalIgnoreCase);
        }

        public static bool IsDefined([NotNullWhen(true)] string? name)
        {
            return name switch
            {
                nameof(Colors.None) => true,
                nameof(Colors.Red) => true,
                nameof(Colors.Green) => true,
                nameof(Colors.Blue) => true,
                _ => false
            };
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project EnumUtilities ](/sources/EnumUtilities.zip)

:::


### Share EnumUtilities 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumUtilities&quote=EnumUtilities" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumUtilities&text=EnumUtilities:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumUtilities" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumUtilities&title=EnumUtilities" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumUtilities&title=EnumUtilities&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEnumUtilities" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/EnumUtilities

### In the same category (Enum) - 4 other generators


#### [CredFetoEnum](/docs/CredFetoEnum)


#### [EnumClass](/docs/EnumClass)


#### [FusionReactor](/docs/FusionReactor)


#### [NetEscapades.EnumGenerators](/docs/NetEscapades.EnumGenerators)

