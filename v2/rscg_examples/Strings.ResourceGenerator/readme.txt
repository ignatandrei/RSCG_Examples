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
* Values can either use standard formatting (e.g. {0}, {1}, etc) or interpolation (e.g. {name}), but not both
* Signatures must match for all languages

Parameters to strings also support type specifiers, formatting specifiers and signature ordering
* Format: `:format`, e.g. `"String with {0:n2} formatted"`
* Type: `@type`, e.g. `"String with {name@string}"`
* Order: `@order`, e.g. `String with {name@string@1}"` (order requires type as well)

Example of using all: `"String with {amount:n2@decimal@3}"'

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