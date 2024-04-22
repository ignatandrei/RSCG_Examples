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
