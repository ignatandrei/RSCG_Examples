---
sidebar_position: 1330
title: 133 - FusionReactor
description: Enums to string and other extensions
slug: /FusionReactor
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# FusionReactor  by OhFlowi


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/FusionReactor.SourceGenerators.EnumExtensions?label=FusionReactor.SourceGenerators.EnumExtensions)](https://www.nuget.org/packages/FusionReactor.SourceGenerators.EnumExtensions)
[![GitHub last commit](https://img.shields.io/github/last-commit/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions?label=updated)](https://github.com/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions)
![GitHub Repo stars](https://img.shields.io/github/stars/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions?style=social)

## Details

### Info
:::info

Name: **FusionReactor**

A C# incremental source generator to create extensions for an enum type.
      The extensions should be very fast and without reflections.

Author: OhFlowi

NuGet: 
*https://www.nuget.org/packages/FusionReactor.SourceGenerators.EnumExtensions*   


You can find more details at https://github.com/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions

Source: https://github.com/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions

:::

### Original Readme
:::note

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions/master/LICENSE)
[![Nuget](https://img.shields.io/nuget/dt/FusionReactor.SourceGenerators.EnumExtensions?label=Nuget.org%20Downloads&style=flat-square&color=blue)](https://www.nuget.org/packages/FusionReactor.SourceGenerators.EnumExtensions)
[![Nuget](https://img.shields.io/nuget/vpre/FusionReactor.SourceGenerators.EnumExtensions.svg?label=NuGet)](https://www.nuget.org/packages/FusionReactor.SourceGenerators.EnumExtensions)

# FusionReactor.SourceGenerators.EnumExtensions
A C# source generator to create extensions for an enum type.
- Optimized for speed and low resource consumption
- Support for non-standard enum declarations
```csharp
public enum EPublicFoo : byte
```
- .NET 8+ support by using [FrozenDictionary](https://learn.microsoft.com/en-us/dotnet/api/system.collections.frozen.frozendictionary-2) & [FrozenSet](https://learn.microsoft.com/en-us/dotnet/api/system.collections.frozen.frozenset-1)
- .NET 5+ support by using [IReadOnlyDictionary](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlydictionary-2) & [IReadOnlySet](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlyset-1)
- .NET Framework 4.5+ support by using [IReadOnlyDictionary](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlydictionary-2) & [HashSet](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1)

**Package** - [FusionReactor.SourceGenerators.EnumExtensions](https://www.nuget.org/packages/FusionReactor.SourceGenerators.EnumExtensions/)

Add the package to your application using

```bash
dotnet add package FusionReactor.SourceGenerators.EnumExtensions
```

Adding the package will automatically add a marker attribute, `[GenerateEnumExtensions]`, to your project.

To use the generator, add the `[GenerateEnumExtensions]` attribute to an enum. For example:

```csharp
[GenerateEnumExtensions]
public enum EPublicFoo
{
    [Display(
        ShortName = "Fo",
        Name = "Foo - 0",
        Description = "Zero",
        Prompt = "ooF",
        GroupName = "Foos",
        Order = 0)]
    Foo = 0,

    [Display(
        ShortName = "Ba",
        Name = "Bar - 1",
        Description = "One",
        Prompt = "raB",
        GroupName = "Bars",
        Order = 1)]
    Bar = 1,

    Batz = 2,
}

```

This will generate a class called `EPublicFooExtensions` (`EPublicFoo` + `Extensions`), which contains a number of helper methods. The new class is splitted in two files (`EPublicFoo` + `Extensions.Base.g.cs` & `EPublicFoo` + `Extensions.DisplayAttribute.g.cs`)

`EPublicFooExtensions.Base.g.cs`:

```csharp
/// <summary>
/// Extension methods for the <see cref = "EPublicFoo"/> enum.
/// </summary>
[GeneratedCode("FusionReactor.SourceGenerators.EnumExtensions", null)]
public static partial class EPublicFooExtensions
{
#if NET8_0_OR_GREATER
    private static readonly FrozenDictionary<EPublicFoo, Int32> content = new Dictionary<EPublicFoo, Int32>
    {
        {
            EPublicFoo.Foo,
            0
        },
        {
            EPublicFoo.Bar,
            1
        },
        {
            EPublicFoo.Batz,
            2
        },
    }
    .ToFrozenDictionary();
#else
    private static readonly Dictionary<EPublicFoo, Int32> contentDictionary = new Dictionary<EPublicFoo, Int32>
    {
        {
            EPublicFoo.Foo,
            0
        },
        {
            EPublicFoo.Bar,
            1
        },
        {
            EPublicFoo.Batz,
            2
        },
    };

    private static readonly IReadOnlyDictionary<EPublicFoo, Int32> content
        = new ReadOnlyDictionary<EPublicFoo, Int32>(contentDictionary);
#endif

#if NET8_0_OR_GREATER
    private static readonly FrozenSet<string> names = new []
    {
        "Foo",
        "Bar",
        "Batz",
    }
    .ToFrozenSet();
#elif NET5_0_OR_GREATER
    private static readonly IReadOnlySet<string> names = new HashSet<string>()
    {
        "Foo",
        "Bar",
        "Batz",
    };
#else
    private static readonly HashSet<string> names = new HashSet<string>()
    {
        "Foo",
        "Bar",
        "Batz",
    };
#endif

#if NET8_0_OR_GREATER
    private static readonly FrozenSet<EPublicFoo> values = new []
    {
        EPublicFoo.Foo,
        EPublicFoo.Bar,
        EPublicFoo.Batz,
    }
    .ToFrozenSet();
#elif NET5_0_OR_GREATER
    private static readonly IReadOnlySet<EPublicFoo> values = new HashSet<EPublicFoo>()
    {
        EPublicFoo.Foo,
        EPublicFoo.Bar,
        EPublicFoo.Batz,
    };
#else
    private static readonly HashSet<EPublicFoo> values = new HashSet<EPublicFoo>()
    {
        EPublicFoo.Foo,
        EPublicFoo.Bar,
        EPublicFoo.Batz,
    };
#endif

    /// <summary>
    /// Gets the content dictionary containing mappings of <see cref = "EPublicFoo"/> enum values to values.
    /// </summary>
    /// <returns>The read-only content dictionary.</returns>
#if NET8_0_OR_GREATER
    public static FrozenDictionary<EPublicFoo, Int32> GetContent()
#else
    public static IReadOnlyDictionary<EPublicFoo, Int32> GetContent()
#endif
    {
        return content;
    }

    /// <summary>
    /// Gets the content dictionary containing mappings of <see cref = "EPublicFoo"/> enum values to values.
    /// </summary>
    /// <param name = "enumValue">The enum value for which to get the content dictionary.</param>
    /// <returns>The read-only content dictionary.</returns>
#if NET8_0_OR_GREATER
    public static FrozenDictionary<EPublicFoo, Int32> GetContent(this EPublicFoo enumValue)
#else
    public static IReadOnlyDictionary<EPublicFoo, Int32> GetContent(this EPublicFoo enumValue)
#endif
    {
        return content;
    }

    /// <summary>
    /// Retrieves the name of the constant in the <see cref = "EPublicFoo"/>.
    /// </summary>
    /// <param name = "enumValue">The enum value to convert.</param>
    /// <returns>
    /// A string containing the name of the <see cref = "EPublicFoo"/>;
    /// or <see langword="null"/> if no such constant is found.
    /// </returns>
    public static string? GetName(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => nameof(EPublicFoo.Foo),
            EPublicFoo.Bar => nameof(EPublicFoo.Bar),
            EPublicFoo.Batz => nameof(EPublicFoo.Batz),
            _ => null
        };
    }

    /// <summary>
    /// Retrieves all available names of the <see cref = "EPublicFoo"/>.
    /// </summary>
    /// <returns>An enumerable collection of <see cref = "EPublicFoo"/> names.</returns>
#if NET8_0_OR_GREATER
    public static FrozenSet<string> GetNames()
#elif NET5_0_OR_GREATER
    public static IReadOnlySet<string> GetNames()
#else
    public static HashSet<string> GetNames()
#endif
    {
        return names;
    }

    /// <summary>
    /// Retrieves all available names of the <see cref = "EPublicFoo"/>.
    /// </summary>
    /// <param name = "enumValue">The enumeration value.</param>
    /// <returns>An enumerable collection of <see cref = "EPublicFoo"/> names.</returns>
#if NET8_0_OR_GREATER
    public static FrozenSet<string> GetNames(this EPublicFoo enumValue)
#elif NET5_0_OR_GREATER
    public static IReadOnlySet<string> GetNames(this EPublicFoo enumValue)
#else
    public static HashSet<string> GetNames(this EPublicFoo enumValue)
#endif
    {
        return names;
    }

    /// <summary>
    /// Retrieves all available values of the <see cref = "EPublicFoo"/>.
    /// </summary>
    /// <returns>An enumerable collection of <see cref = "EPublicFoo"/> values.</returns>
#if NET8_0_OR_GREATER
    public static FrozenSet<EPublicFoo> GetValues()
#elif NET5_0_OR_GREATER
    public static IReadOnlySet<EPublicFoo> GetValues()
#else
    public static HashSet<EPublicFoo> GetValues()
#endif
    {
        return values;
    }

    /// <summary>
    /// Retrieves all available values of the <see cref = "EPublicFoo"/>.
    /// </summary>
    /// <param name = "enumValue">The enumeration value.</param>
    /// <returns>An enumerable collection of <see cref = "EPublicFoo"/> values.</returns>
#if NET8_0_OR_GREATER
    public static FrozenSet<EPublicFoo> GetValues(this EPublicFoo enumValue)
#elif NET5_0_OR_GREATER
    public static IReadOnlySet<EPublicFoo> GetValues(this EPublicFoo enumValue)
#else
    public static HashSet<EPublicFoo> GetValues(this EPublicFoo enumValue)
#endif
    {
        return values;
    }

    /// <summary>
    /// Parses the specified string representation of the enumeration value to its corresponding
    /// <see cref = "EPublicFoo"/> value.
    /// </summary>
    /// <param name = "value">A string containing the name or value to convert.</param>
    /// <param name = "ignoreCase">
    /// A boolean indicating whether to ignore case during the parsing. Default is <c>false</c>.
    /// </param>
    /// <returns>
    /// The <see cref = "EPublicFoo"/> value equivalent to the specified string representation.
    /// </returns>
    public static EPublicFoo Parse(string value, bool ignoreCase = false)
    {
        if (ignoreCase)
        {
            return value.ToLowerInvariant() switch
            {
                "foo" => EPublicFoo.Foo,
                "bar" => EPublicFoo.Bar,
                "batz" => EPublicFoo.Batz,
                _ => throw new ArgumentException(),
            };
        }
        else
        {
            return value switch
            {
                "Foo" => EPublicFoo.Foo,
                "Bar" => EPublicFoo.Bar,
                "Batz" => EPublicFoo.Batz,
                _ => throw new ArgumentException(),
            };
        }
    }

    /// <summary>
    /// Parses the specified string representation of the enumeration value to its corresponding
    /// <see cref = "EPublicFoo"/> value.
    /// </summary>
    /// <param name = "enumValue">The current <see cref = "EPublicFoo"/> value.</param>
    /// <param name = "value">A string containing the name or value to convert.</param>
    /// <param name = "ignoreCase">
    /// A boolean indicating whether to ignore case during the parsing. Default is <c>false</c>.
    /// </param>
    /// <returns>
    /// The <see cref = "EPublicFoo"/> value equivalent to the specified string representation.
    /// </returns>
    public static EPublicFoo Parse(this EPublicFoo enumValue, string value, bool ignoreCase = false)
    {
        if (ignoreCase)
        {
            return value.ToLowerInvariant() switch
            {
                "foo" => EPublicFoo.Foo,
                "bar" => EPublicFoo.Bar,
                "batz" => EPublicFoo.Batz,
                _ => throw new ArgumentException(),
            };
        }
        else
        {
            return value switch
            {
                "Foo" => EPublicFoo.Foo,
                "Bar" => EPublicFoo.Bar,
                "Batz" => EPublicFoo.Batz,
                _ => throw new ArgumentException(),
            };
        }
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "EPublicFoo"/> enumeration value.
    /// </summary>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "EPublicFoo"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(EPublicFoo) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(string value, out EPublicFoo? result)
    {
        return TryParse(value, false, out result);
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "EPublicFoo"/> enumeration value.
    /// </summary>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "ignoreCase">A boolean indicating whether case should be ignored when parsing.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "EPublicFoo"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(EPublicFoo) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(string value, bool ignoreCase, out EPublicFoo? result)
    {
        if (ignoreCase)
        {
            result = value.ToLowerInvariant() switch
            {
                "foo" => EPublicFoo.Foo,
                "bar" => EPublicFoo.Bar,
                "batz" => EPublicFoo.Batz,
                _ => null,
            };
        }
        else
        {
            result = value switch
            {
                "Foo" => EPublicFoo.Foo,
                "Bar" => EPublicFoo.Bar,
                "Batz" => EPublicFoo.Batz,
                _ => null,
            };
        }

        return result != null;
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "EPublicFoo"/> enumeration value.
    /// </summary>
    /// <param name = "enumValue">The enumeration value to parse.</param>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "EPublicFoo"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(EPublicFoo) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(this EPublicFoo enumValue, string value, out EPublicFoo? result)
    {
        return TryParse(value, false, out result);
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "EPublicFoo"/> enumeration value.
    /// </summary>
    /// <param name = "enumValue">The enumeration value to parse.</param>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "ignoreCase">A boolean indicating whether case should be ignored when parsing.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "EPublicFoo"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(EPublicFoo) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(this EPublicFoo enumValue, string value, bool ignoreCase, out EPublicFoo? result)
    {
        if (ignoreCase)
        {
            result = value.ToLowerInvariant() switch
            {
                "foo" => EPublicFoo.Foo,
                "bar" => EPublicFoo.Bar,
                "batz" => EPublicFoo.Batz,
                _ => null,
            };
        }
        else
        {
            result = value switch
            {
                "Foo" => EPublicFoo.Foo,
                "Bar" => EPublicFoo.Bar,
                "Batz" => EPublicFoo.Batz,
                _ => null,
            };
        }

        return result != null;
    }
}
```

`EPublicFooExtensions.DisplayAttribute.g.cs`:
```csharp
public static partial class EPublicFooExtensions
{
#if !NET8_0_OR_GREATER
    private static readonly Dictionary<EPublicFoo, DisplayResult?> displayResultsDictionary = new Dictionary<EPublicFoo, DisplayResult?>
    {
        {
            EPublicFoo.Foo,
            new DisplayResult
            {
                ShortName = "Fo",
                Name = "Foo - 0",
                Description = "Zero",
                Prompt = "ooF",
                GroupName = "Foos",
                Order = 0,
            }
        },
        {
            EPublicFoo.Bar,
            new DisplayResult
            {
                ShortName = "Ba",
                Name = "Bar - 1",
                Description = "One",
                Prompt = "raB",
                GroupName = "Bars",
                Order = 1,
            }
        },
        {
            EPublicFoo.Batz,
            null
        },
    };
#endif
    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <returns>The display attribute result or the enum value.</returns>
#if NET8_0_OR_GREATER
    public static FrozenDictionary<EPublicFoo, DisplayResult?> DisplayResults => new Dictionary<EPublicFoo, DisplayResult?>
    {
        {
            EPublicFoo.Foo,
            new DisplayResult
            {
                ShortName = "Fo",
                Name = "Foo - 0",
                Description = "Zero",
                Prompt = "ooF",
                GroupName = "Foos",
                Order = 0,
        }},
        {
            EPublicFoo.Bar,
            new DisplayResult
            {
                ShortName = "Ba",
                Name = "Bar - 1",
                Description = "One",
                Prompt = "raB",
                GroupName = "Bars",
                Order = 1,
            }},
        {
            EPublicFoo.Batz,
            null
        },
    }
    .ToFrozenDictionary();
#else
    public static IReadOnlyDictionary<EPublicFoo, DisplayResult?> DisplayResults => new ReadOnlyDictionary<EPublicFoo, DisplayResult?>(displayResultsDictionary);
#endif

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.ShortName"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayShortName(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => "Fo",
            EPublicFoo.Bar => "Ba",
            EPublicFoo.Batz => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Name"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The name or the enum value.</returns>
    public static string? DisplayName(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => "Foo - 0",
            EPublicFoo.Bar => "Bar - 1",
            EPublicFoo.Batz => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Description"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayDescription(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => "Zero",
            EPublicFoo.Bar => "One",
            EPublicFoo.Batz => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Prompt"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayPrompt(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => "ooF",
            EPublicFoo.Bar => "raB",
            EPublicFoo.Batz => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.GroupName"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayGroupName(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => "Foos",
            EPublicFoo.Bar => "Bars",
            EPublicFoo.Batz => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Order"/> of the <see cref = "EPublicFoo"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static int? DisplayOrder(this EPublicFoo enumValue)
    {
        return enumValue switch
        {
            EPublicFoo.Foo => 0,
            EPublicFoo.Bar => 1,
            EPublicFoo.Batz => null,
            _ => null
        };
    }
}
```


The generated extension files are available in your IDE under the Source Generators files.

## Contributing

Create an [issue](https://github.com/OhFlowi/FusionReactor.SourceGenerators.EnumExtensions/issues/new) if you find a BUG or have a Suggestion or Question. If you want to develop this project :

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

FusionReactor.SourceGenerators.EnumExtensions is Copyright © 2024 [OhFlowi](https://github.com/OhFlowi) under the MIT License.


:::

### About
:::note

Enums to string and other extensions


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **FusionReactor**
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
    <PackageReference Include="FusionReactor.SourceGenerators.EnumExtensions" Version="1.1.0" />
  </ItemGroup>

  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FusionReactor\src\EnumClassDemo\Program.cs" label="Program.cs" >

  This is the use of **FusionReactor** in *Program.cs*

```csharp showLineNumbers 
using EnumClassDemo;
Console.WriteLine(Colors.None.GetName());
Console.WriteLine(ColorsExtensions.GetContent()[Colors.None]);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FusionReactor\src\EnumClassDemo\Colors.cs" label="Colors.cs" >

  This is the use of **FusionReactor** in *Colors.cs*

```csharp showLineNumbers 
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace EnumClassDemo;

//[Flags]
[FusionReactor.SourceGenerators.EnumExtensions.GenerateEnumExtensions]
public enum Colors
{
    [Display(
         ShortName = "None",
         Name = "none - 0",
         Description = "Zero",
         Prompt = "ooF",
         GroupName = "Color1",
         Order = 0)]
    None =0,
    Red=1,
    Green=2,
    Blue=4,
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FusionReactor\src\EnumClassDemo\obj\GX\FusionReactor.SourceGenerators.EnumExtensions\FusionReactor.SourceGenerators.EnumExtensions.EnumExtensionsGenerator\ColorsExtensions.Base.g.cs" label="ColorsExtensions.Base.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using System;
using System.CodeDom.Compiler;
using System.Collections;
#if NET8_0_OR_GREATER
using System.Collections.Frozen;
#endif
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace EnumClassDemo;
/// <summary>
/// Extension methods for the <see cref = "Colors"/> enum.
/// </summary>
[GeneratedCode("FusionReactor.SourceGenerators.EnumExtensions", null)]
public static partial class ColorsExtensions
{
#if NET8_0_OR_GREATER
private static readonly FrozenDictionary<Colors, Int32> content
  = new Dictionary<Colors, Int32>
    {
        { Colors.None, 0 },
{ Colors.Red, 1 },
{ Colors.Green, 2 },
{ Colors.Blue, 4 },

    }
    .ToFrozenDictionary();
#else
    private static readonly Dictionary<Colors, Int32> contentDictionary = new Dictionary<Colors, Int32>
    {
        {
            Colors.None,
            0
        },
        {
            Colors.Red,
            1
        },
        {
            Colors.Green,
            2
        },
        {
            Colors.Blue,
            4
        },
    };
    private static readonly IReadOnlyDictionary<Colors, Int32> content = new ReadOnlyDictionary<Colors, Int32>(contentDictionary);
#endif
#if NET8_0_OR_GREATER
private static readonly FrozenSet<string> names = new []
{
    "None",
"Red",
"Green",
"Blue",

}
.ToFrozenSet();
#elif NET5_0_OR_GREATER
private static readonly IReadOnlySet<string> names = new HashSet<string>()
{
    "None",
"Red",
"Green",
"Blue",

};
#else
    private static readonly HashSet<string> names = new HashSet<string>()
    {
        "None",
        "Red",
        "Green",
        "Blue",
    };
#endif
#if NET8_0_OR_GREATER
private static readonly FrozenSet<Colors> values = new []
{
    Colors.None,
Colors.Red,
Colors.Green,
Colors.Blue,

}
.ToFrozenSet();
#elif NET5_0_OR_GREATER
private static readonly IReadOnlySet<Colors> values = new HashSet<Colors>()
{
    Colors.None,
Colors.Red,
Colors.Green,
Colors.Blue,

};
#else
    private static readonly HashSet<Colors> values = new HashSet<Colors>()
    {
        Colors.None,
        Colors.Red,
        Colors.Green,
        Colors.Blue,
    };
#endif
    /// <summary>
    /// Gets the content dictionary containing mappings of <see cref = "Colors"/> enum values to values.
    /// </summary>
    /// <returns>The read-only content dictionary.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenDictionary<Colors, Int32> GetContent()
#else
    public static IReadOnlyDictionary<Colors, Int32> GetContent()
#endif
    {
        return content;
    }

    /// <summary>
    /// Gets the content dictionary containing mappings of <see cref = "Colors"/> enum values to values.
    /// </summary>
    /// <param name = "enumValue">The enum value for which to get the content dictionary.</param>
    /// <returns>The read-only content dictionary.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenDictionary<Colors, Int32> GetContent(this Colors enumValue)
#else
    public static IReadOnlyDictionary<Colors, Int32> GetContent(this Colors enumValue)
#endif
    {
        return content;
    }

    /// <summary>
    /// Retrieves the name of the constant in the <see cref = "Colors"/>.
    /// </summary>
    /// <param name = "enumValue">The enum value to convert.</param>
    /// <returns>
    /// A string containing the name of the <see cref = "Colors"/>;
    /// or <see langword="null"/> if no such constant is found.
    /// </returns>
    public static string? GetName(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => nameof(Colors.None),
            Colors.Red => nameof(Colors.Red),
            Colors.Green => nameof(Colors.Green),
            Colors.Blue => nameof(Colors.Blue),
            _ => null
        };
    }

    /// <summary>
    /// Retrieves all available names of the <see cref = "Colors"/>.
    /// </summary>
    /// <returns>An enumerable collection of <see cref = "Colors"/> names.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenSet<string> GetNames()
#elif NET5_0_OR_GREATER
public static IReadOnlySet<string> GetNames()
#else
    public static HashSet<string> GetNames()
#endif
    {
        return names;
    }

    /// <summary>
    /// Retrieves all available names of the <see cref = "Colors"/>.
    /// </summary>
    /// <param name = "enumValue">The enumeration value.</param>
    /// <returns>An enumerable collection of <see cref = "Colors"/> names.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenSet<string> GetNames(this Colors enumValue)
#elif NET5_0_OR_GREATER
public static IReadOnlySet<string> GetNames(this Colors enumValue)
#else
    public static HashSet<string> GetNames(this Colors enumValue)
#endif
    {
        return names;
    }

    /// <summary>
    /// Retrieves all available values of the <see cref = "Colors"/>.
    /// </summary>
    /// <returns>An enumerable collection of <see cref = "Colors"/> values.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenSet<Colors> GetValues()
#elif NET5_0_OR_GREATER
public static IReadOnlySet<Colors> GetValues()
#else
    public static HashSet<Colors> GetValues()
#endif
    {
        return values;
    }

    /// <summary>
    /// Retrieves all available values of the <see cref = "Colors"/>.
    /// </summary>
    /// <param name = "enumValue">The enumeration value.</param>
    /// <returns>An enumerable collection of <see cref = "Colors"/> values.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenSet<Colors> GetValues(this Colors enumValue)
#elif NET5_0_OR_GREATER
public static IReadOnlySet<Colors> GetValues(this Colors enumValue)
#else
    public static HashSet<Colors> GetValues(this Colors enumValue)
#endif
    {
        return values;
    }

    /// <summary>
    /// Parses the specified string representation of the enumeration value to its corresponding
    /// <see cref = "Colors"/> value.
    /// </summary>
    /// <param name = "value">A string containing the name or value to convert.</param>
    /// <param name = "ignoreCase">
    /// A boolean indicating whether to ignore case during the parsing. Default is <c>false</c>.
    /// </param>
    /// <returns>
    /// The <see cref = "Colors"/> value equivalent to the specified string representation.
    /// </returns>
    public static Colors Parse(string value, bool ignoreCase = false)
    {
        if (ignoreCase)
        {
            return value.ToLowerInvariant() switch
            {
                "none" => Colors.None,
                "red" => Colors.Red,
                "green" => Colors.Green,
                "blue" => Colors.Blue,
                _ => throw new ArgumentException(),
            };
        }
        else
        {
            return value switch
            {
                "None" => Colors.None,
                "Red" => Colors.Red,
                "Green" => Colors.Green,
                "Blue" => Colors.Blue,
                _ => throw new ArgumentException(),
            };
        }
    }

    /// <summary>
    /// Parses the specified string representation of the enumeration value to its corresponding
    /// <see cref = "Colors"/> value.
    /// </summary>
    /// <param name = "enumValue">The current <see cref = "Colors"/> value.</param>
    /// <param name = "value">A string containing the name or value to convert.</param>
    /// <param name = "ignoreCase">
    /// A boolean indicating whether to ignore case during the parsing. Default is <c>false</c>.
    /// </param>
    /// <returns>
    /// The <see cref = "Colors"/> value equivalent to the specified string representation.
    /// </returns>
    public static Colors Parse(this Colors enumValue, string value, bool ignoreCase = false)
    {
        if (ignoreCase)
        {
            return value.ToLowerInvariant() switch
            {
                "none" => Colors.None,
                "red" => Colors.Red,
                "green" => Colors.Green,
                "blue" => Colors.Blue,
                _ => throw new ArgumentException(),
            };
        }
        else
        {
            return value switch
            {
                "None" => Colors.None,
                "Red" => Colors.Red,
                "Green" => Colors.Green,
                "Blue" => Colors.Blue,
                _ => throw new ArgumentException(),
            };
        }
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "Colors"/> enumeration value.
    /// </summary>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "Colors"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(Colors) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(string value, out Colors? result)
    {
        return TryParse(value, false, out result);
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "Colors"/> enumeration value.
    /// </summary>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "ignoreCase">A boolean indicating whether case should be ignored when parsing.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "Colors"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(Colors) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(string value, bool ignoreCase, out Colors? result)
    {
        if (ignoreCase)
        {
            result = value.ToLowerInvariant() switch
            {
                "none" => Colors.None,
                "red" => Colors.Red,
                "green" => Colors.Green,
                "blue" => Colors.Blue,
                _ => null,
            };
        }
        else
        {
            result = value switch
            {
                "None" => Colors.None,
                "Red" => Colors.Red,
                "Green" => Colors.Green,
                "Blue" => Colors.Blue,
                _ => null,
            };
        }

        return result != null;
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "Colors"/> enumeration value.
    /// </summary>
    /// <param name = "enumValue">The enumeration value to parse.</param>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "Colors"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(Colors) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(this Colors enumValue, string value, out Colors? result)
    {
        return TryParse(value, false, out result);
    }

    /// <summary>
    /// Tries to parse the specified string representation of an enumeration value to its corresponding
    /// <see cref = "Colors"/> enumeration value.
    /// </summary>
    /// <param name = "enumValue">The enumeration value to parse.</param>
    /// <param name = "value">The string representation of the enumeration value.</param>
    /// <param name = "ignoreCase">A boolean indicating whether case should be ignored when parsing.</param>
    /// <param name = "result">
    /// When this method returns, contains the <see cref = "Colors"/> value equivalent
    /// to the string representation, if the parse succeeded, or default(Colors) if the parse failed.</param>
    /// <returns><c>true</c> if the parsing was successful; otherwise, <c>false</c>.</returns>
    public static bool TryParse(this Colors enumValue, string value, bool ignoreCase, out Colors? result)
    {
        if (ignoreCase)
        {
            result = value.ToLowerInvariant() switch
            {
                "none" => Colors.None,
                "red" => Colors.Red,
                "green" => Colors.Green,
                "blue" => Colors.Blue,
                _ => null,
            };
        }
        else
        {
            result = value switch
            {
                "None" => Colors.None,
                "Red" => Colors.Red,
                "Green" => Colors.Green,
                "Blue" => Colors.Blue,
                _ => null,
            };
        }

        return result != null;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FusionReactor\src\EnumClassDemo\obj\GX\FusionReactor.SourceGenerators.EnumExtensions\FusionReactor.SourceGenerators.EnumExtensions.EnumExtensionsGenerator\ColorsExtensions.DisplayAttribute.g.cs" label="ColorsExtensions.DisplayAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using System;
using System.Collections;
#if NET8_0_OR_GREATER
using System.Collections.Frozen;
#endif
using System.Collections.Generic;
using System.Collections.ObjectModel;
using FusionReactor.SourceGenerators.EnumExtensions;

namespace EnumClassDemo;
public static partial class ColorsExtensions
{
#if !NET8_0_OR_GREATER
    private static readonly Dictionary<Colors, DisplayResult?> displayResultsDictionary = new Dictionary<Colors, DisplayResult?>
    {
        {
            Colors.None,
            new DisplayResult
            {
                ShortName = "None",
                Name = "none - 0",
                Description = "Zero",
                Prompt = "ooF",
                GroupName = "Color1",
                Order = 0,
            }
        },
        {
            Colors.Red,
            null
        },
        {
            Colors.Green,
            null
        },
        {
            Colors.Blue,
            null
        },
    };
#endif
    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <returns>The display attribute result or the enum value.</returns>
    
#if NET8_0_OR_GREATER
public static FrozenDictionary<Colors, DisplayResult?> DisplayResults
  => new Dictionary<Colors, DisplayResult?>
    {
        { Colors.None, new DisplayResult {ShortName = "None",
Name = "none - 0",
Description = "Zero",
Prompt = "ooF",
GroupName = "Color1",
Order = 0,
}},
{ Colors.Red, null },
{ Colors.Green, null },
{ Colors.Blue, null },

    }
    .ToFrozenDictionary();
#else
    public static IReadOnlyDictionary<Colors, DisplayResult?> DisplayResults => new ReadOnlyDictionary<Colors, DisplayResult?>(displayResultsDictionary);

#endif
    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.ShortName"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayShortName(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => "None",
            Colors.Red => null,
            Colors.Green => null,
            Colors.Blue => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Name"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The name or the enum value.</returns>
    public static string? DisplayName(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => "none - 0",
            Colors.Red => null,
            Colors.Green => null,
            Colors.Blue => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Description"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayDescription(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => "Zero",
            Colors.Red => null,
            Colors.Green => null,
            Colors.Blue => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Prompt"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayPrompt(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => "ooF",
            Colors.Red => null,
            Colors.Green => null,
            Colors.Blue => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.GroupName"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static string? DisplayGroupName(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => "Color1",
            Colors.Red => null,
            Colors.Green => null,
            Colors.Blue => null,
            _ => null
        };
    }

    /// <summary>
    /// Returns the <see cref = "System.ComponentModel.DataAnnotations.DisplayAttribute.Order"/> of the <see cref = "Colors"/> enum.
    /// </summary>
    /// <param name = "enumValue">The enum value.</param>
    /// <returns>The display name or the enum value.</returns>
    public static int? DisplayOrder(this Colors enumValue)
    {
        return enumValue switch
        {
            Colors.None => 0,
            Colors.Red => null,
            Colors.Green => null,
            Colors.Blue => null,
            _ => null
        };
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FusionReactor\src\EnumClassDemo\obj\GX\FusionReactor.SourceGenerators.EnumExtensions\FusionReactor.SourceGenerators.EnumExtensions.EnumExtensionsGenerator\DisplayResult.g.cs" label="DisplayResult.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using System;
using System.CodeDom.Compiler;

namespace FusionReactor.SourceGenerators.EnumExtensions;
/// <inheritdoc cref = "System.ComponentModel.DataAnnotations.DisplayAttribute"/>
[GeneratedCode("FusionReactor.SourceGenerators.EnumExtensions", null)]
public class DisplayResult
{
    /// <summary>
    /// Gets or sets the ShortName attribute property, which may be a resource key string.
    /// </summary>
    public string? ShortName { get; set; }
    /// <summary>
    /// Gets or sets the Name attribute property, which may be a resource key string.
    /// </summary>
    public string? Name { get; set; }
    /// <summary>
    /// Gets or sets the Description attribute property, which may be a resource key string.
    /// </summary>
    public string? Description { get; set; }
    /// <summary>
    /// Gets or sets the Prompt attribute property, which may be a resource key string.
    /// </summary>
    public string? Prompt { get; set; }
    /// <summary>
    /// Gets or sets the GroupName attribute property, which may be a resource key string.
    /// </summary>
    public string? GroupName { get; set; }
    /// <summary>
    /// Gets or sets the order in which this field should be displayed.  If this property is not set then
    /// the presentation layer will automatically determine the order.  Setting this property explicitly
    /// allows an override of the default behavior of the presentation layer.
    /// </summary>
    public int? Order { get; set; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FusionReactor\src\EnumClassDemo\obj\GX\FusionReactor.SourceGenerators.EnumExtensions\FusionReactor.SourceGenerators.EnumExtensions.EnumExtensionsGenerator\GenerateEnumExtensionsAttribute.g.cs" label="GenerateEnumExtensionsAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
using System;
using System.CodeDom.Compiler;

namespace FusionReactor.SourceGenerators.EnumExtensions;
/// <summary>
/// Attribute to mark an enum for FusionReactor.SourceGenerators.EnumExtensions extension generations.
/// </summary>
/// <remarks>
/// This attribute is used to mark an enum for FusionReactor.SourceGenerators.EnumExtensions extension generations.
/// </remarks>
[GeneratedCode("FusionReactor.SourceGenerators.EnumExtensions", null)]
[AttributeUsage(AttributeTargets.Enum)]
public class GenerateEnumExtensionsAttribute : Attribute
{
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project FusionReactor ](/sources/FusionReactor.zip)

:::


### Share FusionReactor 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFusionReactor&quote=FusionReactor" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFusionReactor&text=FusionReactor:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFusionReactor" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFusionReactor&title=FusionReactor" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFusionReactor&title=FusionReactor&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFusionReactor" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/FusionReactor

aaa
<SameCategory />

