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