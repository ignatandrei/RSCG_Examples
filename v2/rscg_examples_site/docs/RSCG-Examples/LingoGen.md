---
sidebar_position: 1200
title: 120 - LingoGen
description: Translating from multiple languages
slug: /LingoGen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# LingoGen  by Ruben Broere


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RubenBroere.LingoGen?label=RubenBroere.LingoGen)](https://www.nuget.org/packages/RubenBroere.LingoGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/RubenBroere/lingo-gen?label=updated)](https://github.com/RubenBroere/lingo-gen)
![GitHub Repo stars](https://img.shields.io/github/stars/RubenBroere/lingo-gen?style=social)

## Details

### Info
:::info

Name: **LingoGen**

A Roslyn source generator for statically typed string localization

Author: Ruben Broere

NuGet: 
*https://www.nuget.org/packages/RubenBroere.LingoGen/*   


You can find more details at https://github.com/RubenBroere/lingo-gen

Source : https://github.com/RubenBroere/lingo-gen

:::

### Original Readme
:::note

# LingoGen

LingoGen is a Roslyn source generator that generates strongly typed localized strings from a json file.

## Why strongly typed localized strings?

- **Compile time safety**: You can't misspell a key or use a key that doesn't exist.
- **Refactoring**: If you rename a key, the compiler will tell you all the places you need to update.
- **Discoverability**: You get intellisense for all your localized strings.
- **Performance**: The classes are build on compile time so no lookup in dictionaries.
- **Easy to use**: Just add a json file and the required translations and you're good to go.
- **Feedback**: LingoGen has a lot of warning and error feedback to help you create good translations.

## How to use

1. Add the `RubenBroere.LingoGen` package to your project.
2. Create a [lingo.json](#lingo-json) file with the translations.
3. Add the [lingo.json](#lingo-json) file to your `.csproj` as an `AdditionalFiles` item.   
4. Use the generated classes in your code.

```csharp
using LingoGen;

public class MyClass
{
    public void MyMethod()
    {
        // From the lingo.json phrase "Sorry for the inconvenience."
        Console.WriteLine(Lingo.SorryForTheInconvenience);
        // Returns "Sorry voor het ongemak." if the current UI culture is Dutch. 
    }
}
```

## Lingo JSON

The Lingo.json file is a json file that contains the metadata, phrases and nouns.
As of now nouns are not supported but will be in the future.

### Metadata

Metadata stores global configuration and is required for LingoGen to work.

```json
{
  "metadata": {
    "version": "0.0.0",
    "languages": ["nl", "fr"] 
  }
}
```

- `version` (optional): The version of the lingo file. May be used for future features.
- `languages` (required): An array of languages that are supported by the lingo file. English is always supported.

LingoGen uses `CultureInfo.CurrentUICulture.TwoLetterISOLanguageName` to determine the current language. 
If the current language is not supported, an error string will be returned. 

### Phrases

Phrases are the main feature as of now. They are the localized strings that are generated.

```json
{
  "phrases": {
    "Sorry for the inconvenience.": {
      "nl": "Sorry voor het ongemak.",
      "fr": "Désolé pour le dérangement."
    },
    "Select a(n) {Noun}": {
      "nl": "Selecteer een {Noun}",
      "fr": "Sélectionnez un(e) {Noun}"
    }
  }
}
```

- `phrases` (required): A dictionary of english phrases with the required translations for the languages specified in the metadata. 

A phrase can contain arguments which are enclosed in curly braces.
This phrase will generate a method with the arguments as parameters. 

### Nouns

Nouns are currently not supported but will be in the future.

```json
{
  "nouns": {
    "World": {
      "en": ["world", "worlds"],
      "nl": ["wereld", "werelden"],
      "fr": ["monde", "mondes"]
    },
    "Person": {
      "en": ["person", "people"],
      "nl": ["persoon", "mensen"],
      "fr": ["personne", "personnes"]
    }
  }
}
```

- `nouns` (required): A dictionary of nouns with the required translations for the languages specified in the metadata.

## Lingo generated classes

The lingo generated classes are generated in the namespace `LingoGen` and are named after the keywords inside the [lingo.json](#lingo-json).

### Phrases

```json
{
  "phrases": {
    "Sorry for the inconvenience.": {
      "nl": "Sorry voor het ongemak.",
      "fr": "Désolé pour le dérangement."
    },
    "Select a(n) {Noun}": {
      "nl": "Selecteer een {Noun}",
      "fr": "Sélectionnez un(e) {Noun}"
    }
  }
}
```

These example phrases will generate the following property and method:

```csharp
// In 'Lingo.SorryForTheInconvenience.g.cs' 

/// <summary>
/// Sorry for the inconvenience.
/// </summary>
public static string SorryForTheInconvenience => CultureInfo.CurrentUICulture.TwoLetterISOLanguageName switch
{
    "nl" => "Sorry voor het ongemak.",
    "fr" => "Désolé pour le dérangement.",
    "en" => "Sorry for the inconvenience.",
    _ => $"[ No 'SorryForTheInconvenience' lingo for '{CultureInfo.CurrentUICulture.TwoLetterISOLanguageName}' ]"
};

// In 'Lingo.SelectAn_.g.cs'

/// <summary>
/// Select a(n) {Noun}
/// </summary>
public static string SelectAn_(string Noun) => CultureInfo.CurrentUICulture.TwoLetterISOLanguageName switch
{
    "nl" => $"Selecteer een {Noun}",
    "fr" => $"Sélectionnez un(e) {Noun}",
    "en" => $"Select a(n) {Noun}",
    _ => $"[ No 'SelectAn_' lingo for '{CultureInfo.CurrentUICulture.TwoLetterISOLanguageName}' ]"
};
```

All phrases are generated in a separate file with the name of the phrase.
This will make the incremental source generator faster than one big class. 

## Roadmap

- [ ] Nouns
- [ ] Custom noun metadata

:::

### About
:::note

Translating from multiple languages


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **LingoGen**
```xml showLineNumbers {19}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <None Remove="lingo.json" />
  </ItemGroup>

  <ItemGroup>
    <AdditionalFiles Include="lingo.json" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="RubenBroere.LingoGen" Version="0.2.1" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LingoGen\src\TranslateDemo\Program.cs" label="Program.cs" >

  This is the use of **LingoGen** in *Program.cs*

```csharp showLineNumbers 
using System.Globalization;

var name = "Andrei ";

CultureInfo newCulture = new CultureInfo("en");
Thread.CurrentThread.CurrentUICulture = newCulture;

Console.WriteLine(LingoGen.Lingo.Hello_(name));

newCulture = new CultureInfo("fr");
Thread.CurrentThread.CurrentUICulture = newCulture;

Console.WriteLine(LingoGen.Lingo.Hello_(name));

newCulture = new CultureInfo("it");
Thread.CurrentThread.CurrentUICulture = newCulture;

Console.WriteLine(LingoGen.Lingo.Hello_(name));

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LingoGen\src\TranslateDemo\obj\GX\LingoGen.Generator\LingoGen.Generator.LingoGenerator\Lingo.g.cs" label="Lingo.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>


namespace LingoGen;

/// <summary>
/// Static class containing all lingo entries.
/// </summary>
public static partial class Lingo
{

}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LingoGen\src\TranslateDemo\obj\GX\LingoGen.Generator\LingoGen.Generator.LingoGenerator\Lingo.Hello_.g.cs" label="Lingo.Hello_.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Globalization;

namespace LingoGen;

public static partial class Lingo
{
    /// <summary>
    /// Hello {Name}
    /// </summary>
    public static string Hello_(string Name) => CultureInfo.CurrentUICulture.TwoLetterISOLanguageName switch
    {
        "it" => $"Buongiorno {Name}",
        "fr" => $"Bonjour {Name}",
        "en" => $"Hello {Name}",
        _ => $"[ No 'Hello_' lingo for '{CultureInfo.CurrentUICulture.TwoLetterISOLanguageName}' ]"
    };
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project LingoGen ](/sources/LingoGen.zip)

:::


### Share LingoGen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLingoGen&quote=LingoGen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLingoGen&text=LingoGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLingoGen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLingoGen&title=LingoGen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLingoGen&title=LingoGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLingoGen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/LingoGen

### In the same category (FilesToCode) - 9 other generators


#### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


#### [corecraft](/docs/corecraft)


#### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


#### [NotNotAppSettings](/docs/NotNotAppSettings)


#### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


#### [ResXGenerator](/docs/ResXGenerator)


#### [RSCG_Utils](/docs/RSCG_Utils)


#### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


#### [Weave](/docs/Weave)

