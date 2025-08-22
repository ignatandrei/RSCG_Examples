---
sidebar_position: 2010
title: 201 - Strings.ResourceGenerator
description: Generating strongly typed string resources - with parameter and Localization
slug: /Strings.ResourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Strings.ResourceGenerator  by Birgir Kristmannsson


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Strings.ResourceGenerator?label=Strings.ResourceGenerator)](https://www.nuget.org/packages/Strings.ResourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/biggik/Strings.ResourceGenerator?label=updated)](https://github.com/biggik/Strings.ResourceGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/biggik/Strings.ResourceGenerator?style=social)

## Details

### Info
:::info

Name: **Strings.ResourceGenerator**

A Roslyn ISourceGenerator that reads string resources from various file formats and generates resource accessors

Author: Birgir Kristmannsson

NuGet: 
*https://www.nuget.org/packages/Strings.ResourceGenerator/*   


You can find more details at https://github.com/biggik/Strings.ResourceGenerator

Source: https://github.com/biggik/Strings.ResourceGenerator

:::

### Original Readme
:::note

# Strings.ResourceGenerator
Roslyn source generator that takes strings from various file formats and creates resource accessors that access strings resources in a controlled manner

Current support is for:

* .strings files (one per language, e.g. Errors.strings and Errors.de.strings)
* .strings file (multiple language support in a side-by-side fashion, with embedded configuration)
* .json files (multiple language support)
* .yaml files (multiple language support)

The generated accessors use the current region when selecting the language to pick strings from at runtime, but also accessor for per-language fetching of resources, e.g. via Errors.Neutral.MyErrorString and Errors.DE.MyErrorString

For all of the formats the following applies:
* Keys must be unique for each string resource
* Values can either use standard formatting (e.g. {0}, {1}, etc) or interpolation (e.g. \{name\}), but not both
* Signatures must match for all languages

Parameters to strings also support type specifiers, formatting specifiers and signature ordering
* Format: `:format`, e.g. `"String with {0:n2} formatted"`
* Type: `@type`, e.g. `"String with \{name@string\}"`
* Order: `@order`, e.g. `String with \{name@string@1\}"` (order requires type as well)

Example of using all: `"String with \{amount:n2@decimal@3\}"'

See examples of files online on the [project site](https://github.com/biggik/Strings.ResourceGenerator/tree/main/Strings.ResourceGenerator.Examples/Resources)

## .strings files

A .strings file is simply a UTF-8 encoded flat file of string resources in a key=value format.

A slightly more complex version of a .strings file includes configuration and allows for multi-locale strings

### .strings only
The format of the file should be 
```
ResourceKey=Resource value
ExceptionLogging=An exception has occurred. Error message is {message}
```
### .strings with multi-locale
The format of the file should be 
```
[Configuration]
namespace=MyLibrary.Namespace

[Resources]
/* Used by exception logger middleware */
ExceptionLogging=An exception has occurred. Error message is {message}
is:ExceptionLogging=Villa kom upp. Villuskilaboð voru {message}

/* Or, alternatively, skip the resource key for additional locale resources */
ExceptionLogging2=An exception has occurred. Error message is {message}
is:Villa kom upp. Villuskilaboð voru {message}
```

## .json files

.json files can be used to add strings. Json files need to be serializable from `Strings.ResourceGenerator.Models.StringsModel` (using [NewtonSoft Json](https://www.newtonsoft.com/json))

## .yaml files

.yaml files can be used to add strings. Yaml files need to be serializable from `Strings.ResourceGenerator.Models.StringsModel` (using [YamlDotNet](https://github.com/aaubry/YamlDotNet))

# How to get started

Reference the Strings.ResourceGenerate Nuget package

Modify the reference as follows
```
		<PackageReference Include="Strings.ResourceGenerator" Version="0.6.0">
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
```

Include configuration for AdditionalFiles for the generator, here is one example:
```
	<ItemGroup>
		<AdditionalFiles Include="Resources\*.strings" />
		<AdditionalFiles Include="Resources\JsonExample.json" />
		<AdditionalFiles Include="Resources\NeutralExample.yaml" />
		<AdditionalFiles Include="Resources\JsonExample.json" />
		<AdditionalFiles Include="Resources\strings.config" />
	</ItemGroup>
```

## Configuration
While no configuration is required, the following are options to configure basic settings of the generator.
Configuration is done by differently based on the type of source file, but is embedded in the file in all cases except where a strings.config file is used. This should be fairly obvious from the example project on GitHub.

A generic strings.config is the default where a more specific Errors.strings.config could be used for Errors.strings

The defaults for the parameters are as follows
public=false
preferConst=true
prefix=
namespace=Strings.Resources

### public

if set to true, then the string accessor classes are generated as `public` classes, suitable in library implementations consumed by other assemblies, otherwise the accessors are `internal`

### preferConst

if set to true (the default), then, where possible, accessors are generated as `public const string` instead of `public static string`
This is not possible for multiple languages, since there a lookup is done based on the locale, so the value is never constant

### prefix

If set, then generated classes will be prefixed, e.g. for Errors.strings and a prefix of `Application`, the generated class would be `ApplicationErrors`

## namespace

If set, then generated classes will be generated in the specified namespace, otherwise they will default to the `Strings.Resources` namespace

## Examples

See Strings.ResourceGenerator.Examples project. In its Resources folder are examples of 

- .strings files and a strings.config file (see [MultiLanguageExample.strings](https://github.com/biggik/Strings.ResourceGenerator/blob/main/Strings.ResourceGenerator.Examples/Resources/MultiLanguageExample.strings), [MultiLanguageExample.is.strings](https://github.com/biggik/Strings.ResourceGenerator/blob/main/Strings.ResourceGenerator.Examples/Resources/MultiLanguageExample.is.strings), [strings.config](https://github.com/biggik/Strings.ResourceGenerator/blob/main/Strings.ResourceGenerator.Examples/Resources/strings.config))
- .strings file with config and multi-locale resources (see [MultiLocaleStrings.strings](https://github.com/biggik/Strings.ResourceGenerator/blob/main/Strings.ResourceGenerator.Examples/Resources/MultiLocaleStrings.strings))
- .yml file with config and single-locale resources (see [NeutralExample.yaml](https://github.com/biggik/Strings.ResourceGenerator/blob/main/Strings.ResourceGenerator.Examples/Resources/NeutralExample.yaml))
- .json file with config and multi-locale resources (see [JsonExample.json](https://github.com/biggik/Strings.ResourceGenerator/blob/main/Strings.ResourceGenerator.Examples/Resources/JsonExample.json))

## Generation

For .strings files, empty and commented out lines (prefixed by # or //) are ignored in string generation

## Validation

For multi-language string resources, validation is done on:
* resource keys - each language must have all the same keys
* resource string parameters - each parameterized resource key must have the same signature for all languages

## TODO

Consider supporting XLiff [https://en.wikipedia.org/wiki/XLIFF]

# Release notes

## 0.5.0
Initial release with support for .strings files

## 0.5.1
Adding support for .json and .yaml files as well as generation that supports direct access to locale resources via generated resource accessors

## 0.5.2
Minor update. Fixed one typo, and generate configuration entries into source as comments

## 0.5.3
Minor update. Fixed deserialization of json config

## 0.5.4
Minor update. Fixed documentation generation for public interface

## 0.5.5
Minor update. Fixed documentation generation for public properties

## 0.5.6
Minor update. 

## 0.6.0
Update to .strings handling to allow for multi-locale and configuration in a single file
Documentation updated

## 0.6.1
Allow resource key to be optional (.strings file) for additional locale strings

## 0.6.2
Temporarily stop splitting long lines due to complexity with interpolation

## 0.6.3
Generate generator version into header comments (for clarity)

## 0.6.4
Added [ExcludeFromCodeCoverage] attribute to generated classes (configurable)

## 0.6.5
Fixed configuration and improved unit tests

## 0.6.6
Fixed issue with full namespaces in type declaration parameters

## 0.6.7
Fixed normalization of escaped strings

## 0.6.8
Encode documentation for valid XML

## 0.6.9
Re-fixed normalization. Code requires refactoring from seriously old implementation that mixes responsibilities. But for now ...

## 0.6.10
Set, and allow to configure, a custom Justification message for ExcludeFromCodeCoverage attributes

## 0.6.11
Add rudimentary support for multi-line raw strings

## 0.7.0
Refactored to use IIncrementalGenerator instead of ISourceGenerator on request https://github.com/biggik/Strings.ResourceGenerator/issues/1

:::

### About
:::note

Generating strongly typed string resources - with parameter and Localization


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Strings.ResourceGenerator**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	
	<ItemGroup>
		<AdditionalFiles Include="TestData\*.json" />
	</ItemGroup>
	
	<ItemGroup>
	  <PackageReference Include="Strings.ResourceGenerator" Version="0.7.0" OutputItemType="Analyzer" ReferenceOutputAssembly="false" GeneratePathProperty="true" PrivateAssets="all" />
	</ItemGroup>
	

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Strings.ResourceGenerator\src\EmbedDemo\Program.cs" label="Program.cs" >

  This is the use of **Strings.ResourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using Strings.ResourceGenerator.Examples.Resources;
Console.WriteLine("Hello, World!");
Console.WriteLine(Countries.Goodbye("World"));

Console.WriteLine(Countries.IT.Goodbye("Mondo"));
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Strings.ResourceGenerator\src\EmbedDemo\TestData\Countries.json" label="Countries.json" >

  This is the use of **Strings.ResourceGenerator** in *Countries.json*

```csharp showLineNumbers 
{
	"config": {
		"public": true,
		"namespace": "Strings.ResourceGenerator.Examples.Resources"
	},
	"strings": [
				{
			"key": "Goodbye",
			"values": [
				{
					"value": "Goodbye {within@string}"
				},
				{
					"locale": "it",
					"value": "Ciao {within@string}"
				}
			]
		}
	]
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Strings.ResourceGenerator\src\EmbedDemo\obj\GX\Strings.ResourceGenerator\Strings.ResourceGenerator.ResourceGenerator\Countries.g.cs" label="Countries.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Collections.Generic;
using System.Globalization;

namespace Strings.ResourceGenerator.Examples.Resources
{
    //  Strings.ResourceGenerator v0.7.0.0 by Status ehf - Generated 2025-08-01 15:26:22 (UTC)
    //  Generated from: D:\gth\RSCG_Examples\v2\rscg_examples\Strings.ResourceGenerator\src\EmbedDemo\TestData\Countries.json, D:\gth\RSCG_Examples\v2\rscg_examples\Strings.ResourceGenerator\src\EmbedDemo\TestData\Countries.json
    //        1 string with interpolation parameters
    /// <summary>
    /// Generated string accessor class for Countries
    /// Configuration []
    ///     Namespace              : Strings.ResourceGenerator.Examples.Resources
    ///     Public                 : True
    ///     Prefix                 : 
    ///     Const                  : False
    ///     ExcludeCoverage        : True
    ///     ExcludeCoverageMessage : Auto-generated from string resources
    /// </summary>
    [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage(Justification = "Auto-generated from string resources")]
    public static class Countries
    {
        // Lazy initializers for each locale
        private static readonly Lazy<IGeneratedLocalizerForCountries> _neutral = new Lazy<IGeneratedLocalizerForCountries>(() => InitializeLocalizerFor("Neutral"));
        private static readonly Lazy<IGeneratedLocalizerForCountries> _it = new Lazy<IGeneratedLocalizerForCountries>(() => InitializeLocalizerFor("IT"));

        private static IGeneratedLocalizerForCountries InitializeLocalizerFor(string locale)
        {
            if (locale == "IT")
            {
                return new GeneratedLocalizerForCountriesIT();
            }
            else
            {
                return new GeneratedLocalizerForCountriesNeutral();
            }
        }

        private static IGeneratedLocalizerForCountries Current
        {
            get
            {
                if (CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.ToUpper() == "IT")
                {
                    return _it.Value;
                }
                else
                {
                    return _neutral.Value;
                }
            }
        }

        /// <summary>
        /// Accessor for the 'neutral' locale
        /// </summary>
        public static IGeneratedLocalizerForCountries Neutral => _neutral.Value;

        /// <summary>
        /// Accessor for the 'it' locale
        /// </summary>
        public static IGeneratedLocalizerForCountries IT => _it.Value;

        #region String accessors

        /// <summary>
        /// Neutral: Goodbye {within} <br/>
        /// IT: Ciao {within}
        /// </summary>
        public static string Goodbye(string within) => Current.Goodbye(within);
        #endregion

        /// <summary>
        /// Format the string identified by <paramref name="name"/> with the given parameters
        /// </summary>
        public static string Format(string name, params object[] args)
        {
            return args == null || args.Length == 0 ? name : string.Format(name, args);
        }

        /// <summary>
        /// Unescape unnecessary escapes when string is not used as part of code
        /// </summary>
        public static string Unescape(string value)
        {
            return value.Replace("\\", "");
        }

        /// <summary>
        /// Get the string identified by <paramref name="name"/> formatted with the specified parameters
        /// </summary>
        public static string GetString(string name, params object[] args) => Current.GetString(name, args);

        /// <summary>
        /// Get the string identified by <paramref name="name"/> formatted with the specified parameters, or empty string if not found
        /// 
        /// </summary>
        public static string GetStringOrEmpty(string name, params object[] args) => Current.GetStringOrEmpty(name, args);

        #region IGeneratedLocalizerForCountries
        /// <summary>
        /// Interface IGeneratedLocalizerForCountries for string access to Countries resources
        /// </summary>
        public interface IGeneratedLocalizerForCountries
        {
            /// <summary>
            /// Get the string identified by <paramref name="name"/> formatted with the specified parameters
            /// </summary>
            string GetString(string name, params object[] args);

            /// <summary>
            /// Get the string identified by <paramref name="name"/> formatted with the specified parameters, or empty string if not found
            /// </summary>
            string GetStringOrEmpty(string name, params object[] args);

            /// <summary>
            /// Goodbye {within}
            /// </summary>
            string Goodbye(string within);
        }
        #endregion

        #region GeneratedLocalizerForCountriesBase
        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage(Justification = "Auto-generated from string resources")]
        private abstract class GeneratedLocalizerForCountriesBase
        {
            #region Generic string lookup (by dictionary)
            private readonly Lazy<Dictionary<string, string>> lookup;
            protected Dictionary<string, string> Lookup => lookup.Value;

            protected GeneratedLocalizerForCountriesBase()
            {
                lookup = new Lazy<Dictionary<string, string>>(() => InitializeLookupResources());
            }

            /// <summary>
            /// Get the string identified by <paramref name="name"/> formatted with the specified parameters
            /// </summary>
            public string GetString(string name, params object[] args)
            {
                if (lookup.Value.ContainsKey(name))
                {
                    var s = lookup.Value[name];
                    return args == null || args.Length == 0 ? s : string.Format(s, args);
                }

                throw new ArgumentException($"Lookup value {name} is not found in localized resources in Countries");
            }

            /// <summary>
            /// Get the string identified by <paramref name="name"/> formatted with the specified parameters, or empty string if not found
            /// </summary>
            public string GetStringOrEmpty(string name, params object[] args)
            {
                try
                {
                    return GetString(name, args);
                }
                catch (ArgumentException)
                {
                    return "";
                }
            }

            protected abstract Dictionary<string, string> InitializeLookupResources();
            #endregion

        }
        #endregion

        #region GeneratedLocalizerForCountriesIT
        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage(Justification = "Auto-generated from string resources")]
        private class GeneratedLocalizerForCountriesIT : GeneratedLocalizerForCountriesBase, IGeneratedLocalizerForCountries
        {
            #region Generic string lookup (by dictionary)
            protected override Dictionary<string, string> InitializeLookupResources() =>
                new Dictionary<string, string>
                {
                    { "Goodbye", "Ciao {within}" },
                };
            #endregion
            #region String accessors
            public string Goodbye(string within) => $"Ciao {within}";
            #endregion
        }
        #endregion

        #region GeneratedLocalizerForCountriesNeutral
        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage(Justification = "Auto-generated from string resources")]
        private class GeneratedLocalizerForCountriesNeutral : GeneratedLocalizerForCountriesBase, IGeneratedLocalizerForCountries
        {
            #region Generic string lookup (by dictionary)
            protected override Dictionary<string, string> InitializeLookupResources() =>
                new Dictionary<string, string>
                {
                    { "Goodbye", "Goodbye {within}" },
                };
            #endregion
            #region String accessors
            public string Goodbye(string within) => $"Goodbye {within}";
            #endregion
        }
        #endregion

    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project Strings.ResourceGenerator ](/sources/Strings.ResourceGenerator.zip)

:::


### Share Strings.ResourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrings.ResourceGenerator&quote=Strings.ResourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrings.ResourceGenerator&text=Strings.ResourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrings.ResourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrings.ResourceGenerator&title=Strings.ResourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrings.ResourceGenerator&title=Strings.ResourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStrings.ResourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Strings.ResourceGenerator

### In the same category (FilesToCode) - 14 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [corecraft](/docs/corecraft)


#### [Datacute.EmbeddedResourcePropertyGenerator](/docs/Datacute.EmbeddedResourcePropertyGenerator)


#### [DotnetYang](/docs/DotnetYang)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [LingoGen](/docs/LingoGen)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_JSON2Class](/docs/RSCG_JSON2Class)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


#### [ThisAssembly.Strings](/docs/ThisAssembly.Strings)


#### [Weave](/docs/Weave)

