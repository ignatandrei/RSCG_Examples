![Slang.NET](https://raw.githubusercontent.com/egorozh/Slang.NET/main/assets/icon-128.png)

# Slang.NET

[![Nuget](https://img.shields.io/nuget/v/Slang.Net?label=Slang.Net)](https://www.nuget.org/packages/Slang.Net)
[![Nuget](https://img.shields.io/nuget/v/Slang.CLI?label=Slang.CLI)](https://www.nuget.org/packages/Slang.CLI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Type-safe i18n for .NET

## About this library

Slang.NET is a .NET port of the [slang](https://pub.dev/packages/slang) from the Dart/Flutter community with new
features (like string format).

You can view how the generated
files [general](https://github.com/egorozh/Slang.NET/blob/develop/Slang.Tests/Integration/Resources/_expected_header.output), [en](https://github.com/egorozh/Slang.NET/blob/develop/Slang.Tests/Integration/Resources/_expected_en.output),
and [de](https://github.com/egorozh/Slang.NET/blob/develop/Slang.Tests/Integration/Resources/_expected_de.output) look

## Getting Started:

Install the library as a NuGet package:

```powershell
Install-Package dotnet add package Slang.Net
```

### Add JSON files:

> **Important** file must end with ".i18n.json". This is necessary so that the SourceGenerator does not track changes to
> other AdditionalFiles.

`i18n/strings_en.i18n.json` or `i18n/strings_en-US.i18n.json` or `i18n/strings.i18n.json` (for base culture)

> **Note** The locale part of the file name is `language[-Script][-COUNTRY]`, so a script subtag is supported as
> well: `i18n/strings_sr-Cyrl-RS.i18n.json`, `i18n/strings_sr-Latn-RS.i18n.json`, `i18n/strings_zh-Hant.i18n.json`.

```json
{
  "screen": {
    "locale1": "Locale 1"
  }
}
```

`i18n/strings_ru.i18n.json` or `i18n/strings_ru-RU.i18n.json`

```json
{
  "screen": {
    "locale1": "Локаль 1"
  }
}
```

`slang.json`

```json
{
  "base_culture": "en" // or "en-EN"
}
```

> **Recommendation** It is recommended to specify the country code, such as "en-US," for proper functionality when
> formatting strings, especially if you will be retrieving the list of cultures from SupportedCultures.

### Include JSON files as AdditionalFiles:

```xml

<ItemGroup>
    <AdditionalFiles Include="i18n\*.i18n.json" />
    <AdditionalFiles Include="slang.json" />
</ItemGroup>
```

### Add a partial class:

``` csharp
[Translations(InputFileName = "strings")]
public partial class Strings;
```

### Done!

```csharp
Strings.SetCulture(new CultureInfo("ru-RU")); 

Console.WriteLine(Strings.Instance.Root.Screen.Locale1); // Локаль 1

Strings.SetCulture(new CultureInfo("en-US"));

Console.WriteLine(Strings.Instance.Root.Screen.Locale1); // Locale 1
```

or

```xaml
  <MenuItem  Header="{Binding Root.Screen.Locale1, Source={x:Static localization:Strings.Instance}}" />
```

## Features

- [String Interpolation](#string-interpolation)
- [Typed Parameters](#typed-parameters)
- [Comments](#comments)
- [String Format](#string-format)
- [Pluralization](#pluralization)
- [Linked Translations](#linked-translations)
- [Lists](#lists)
- [Maps](#maps)

### String Interpolation

You can specify parameters passed at runtime..

```json
{
  "Hello": "Hello {name}"
}
```

The generated code will look like this:

```csharp
/// In en, this message translates to:
/// **"Hello {name}"**
public virtual string Hello(object name) => $"Hello {name}";
```

### Typed Parameters

Parameters are typed as `object` by default. This is convenient because it offers maximum flexibility.

You can specify the type using two syntax options:
1 - Simple:

```json
{
  "greet": "Hello {name: string}, you are {age: int} years old"
}
```

2 - Using a placeholders, which allows you to specify a type or format string (see [String Format](#string-format)).

```json
{
  "greet2": "Hello {name}, you are {age} years old",
  "@greet2": {
    "placeholders": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "int"
      }
    }
  }
}
```

The generated code will look like this:

```csharp
/// In ru, this message translates to:
/// **"Hello {name}, you are {age} years old"**
public virtual string Greet(string name, int age) => $"Hello {name}, you are {age} years old";
```

### Comments

You can add comments to your translation files.

```json
{
  "@@locale": "en", // fully ignored
  "mainScreen": {
    "button": "Submit",
    // ignored as translation but rendered as a comment
    "@button": "The submit button shown at the bottom",
    // or use 
    "button2": "Submit",
    "@button2": {
      "description": "The submit button shown at the bottom"
    }
  }
}
```

The generated code will look like this:

```csharp
/// The submit button shown at the bottom
///
/// In ru, this message translates to:
/// **"Submit"**
public virtual string Button => "Submit";
```

### String Format

This library supports embedding format via `ToString(format)` for the following types: `int`, `long`, `double`,
`decimal`, `float`, `DateTime`, `DateOnly`, `TimeOnly`, `TimeSpan`. For other types, the format string is passed through
`string.Format(format, locale)`.

```json
{
  "dateExample": "Date {date}",
  "@dateExample": {
    "placeholders": {
      "date": {
        "type": "DateTime",
        "format": "dd MMMM HH:mm"
      }
    }
  }
}
```

```csharp
String s = Strings.Instance.Root.DateExample(DateTime.Now); // Date 17 October 22:25
```

The generated code will look like this:

```csharp
/// In ru, this message translates to:
/// **"Date {date}"**
public virtual string DateExample(DateTime date)
{
	string dateString = date.ToString("dd MMMM HH:mm");
	return $"Date {dateString}";
}
```

### Pluralization

This library uses the concept
defined [here](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html).

Some languages have support out of the box.
See [here](https://github.com/egorozh/Slang.NET/blob/develop/Slang/PluralResolverMap.cs).

Plurals are detected by the following keywords: `zero`, `one`, `two`, `few`, `many`, `other`.

```json
{
  "someKey": {
    "apple": {
      "one": "I have {n} apple.",
      "other": "I have {n} apples."
    }
  }
}
```

```csharp
String a = Strings.Instance.Root.SomeKey.Apple(n: 1); // I have 1 apple.
String b = Strings.Instance.Root.SomeKey.Apple(n: 2); // I have 2 apples.    
```

The generated code will look like this:

```csharp
public virtual string Apple(int n) => PluralResolvers.Cardinal("en")(n,
					one: $"I have {n} apple.",
					other: $"I have {n} apples.");
```

The detected plurals are **cardinals** by default.

To specify ordinals, you need to add the `(ordinal)` modifier.

```json
{
  "someKey": {
    "apple(cardinal)": {
      "one": "I have {n} apple.",
      "other": "I have {n} apples."
    },
    "place(ordinal)": {
      "one": "{n}st place.",
      "two": "{n}nd place.",
      "few": "{n}rd place.",
      "other": "{n}th place."
    }
  }
}
```

By default, the parameter name is `n`. You can change that by adding a modifier.

```json
{
  "someKey": {
    "apple(param=appleCount)": {
      "one": "I have one apple.",
      "other": "I have multiple apples."
    }
  }
}
```

```csharp
String a = Strings.Instance.Root.SomeKey.Apple(appleCount: 1); // notice 'appleCount' instead of 'n'
```

You can set the default parameter globally using `PluralParameter`.

```csharp
[Translations(
    InputFileName = "strings",
    PluralParameter = "count")]
internal partial class Strings;
```

### Linked Translations

You can link one translation to another. Add the prefix `@:` followed by the **absolute** path to the desired
translation.

```json
{
  "fields": {
    "name": "my name is {firstName}",
    "age": "I am {age} years old"
  },
  "introduce": "Hello, @:fields.name and @:fields.age"
}
```

```dart
String s = Strings.Instance.Root.Introduce(firstName: "Tom", age: 27); // Hello, my name is Tom and I am 27 years old.
```

The generated code will look like this:

```csharp
/// In ru, this message translates to:
/// **"Hello, {_root.Fields.Name(firstName: firstName)} and {_root.Fields.Age(age: age)}"**
public virtual string Introduce(object firstName, object age) => $"Hello, {_root.Fields.Name(firstName: firstName)} and {_root.Fields.Age(age: age)}";
```

Optionally, you can escape linked translations by surrounding the path with `{}`:

```json
{
  "fields": {
    "name": "my name is {firstName}"
  },
  "introduce": "Hello, @:{fields.name}inator"
}
```

### Lists

You can also place lists inside lists!

```json
{
  "niceList": [
    "hello",
    "nice",
    [
      "first item in nested list",
      "second item in nested list"
    ],
    {
      "wow": "WOW!",
      "ok": "OK!"
    },
    {
      "aMapEntry": "access via key",
      "anotherEntry": "access via second key"
    }
  ]
}
```

```csharp
String a = Strings.Instance.Root.NiceList[1]; // "nice"
String b = Strings.Instance.Root.NiceList[2][0]; // "first item in nested list"
String c = Strings.Instance.Root.NiceList[3].Ok; // "OK!"
String d = Strings.Instance.Root.NiceList[4].AMapEntry; // "access via key"
```

The generated code will look like this:

```csharp
public virtual List<dynamic> NiceList => [
				"hello",
				"nice",
				new[]{
					"first item in nested list",
					"second item in nested list",
		    },
				new Feature1NiceList0i3Ru(_root),
				new Feature1NiceList0i4Ru(_root),
	];
```

### Maps

You can access each translation using string keys.

Add the `(map)` modifier.

```json
{
  "a(map)": {
    "helloWorld": "hello"
  },
  "b": {
    "b0": "hey",
    "b1(map)": {
      "hiThere": "hi"
    }
  }
}
```

Now you can access translations using keys:

```csharp
String a = Strings.Instance.Root.A["helloWorld"]; // "hello"
String b = Strings.Instance.Root.B.B0; // "hey"
String c = Strings.Instance.Root.B.B1["hiThere"]; // "hi"
```

The generated code will look like this:

```csharp
/// In ru, this message translates to:
/// **"hey"**
public virtual string B0 => "hey";
public virtual IReadOnlyDictionary<string, string> B1 => new Dictionary<string, string> {
					{"hiThere", "hi"},
};
```

## Slang CLI

### Translate with GPT

Take advantage of GPT to internationalize your app with context-aware translations.

Install Slang CLI:

```bash
dotnet tool install --global Slang.CLI
```

Then add the following configuration in your slang.json:

```json
{
  "base_culture": "en",
  "gpt": {
    "base_culture": "ru",
    "model": "gpt-4o-mini",
    "description": "Showcase for Slang.Net.Gpt"
  }
}
```

Then use slang-gpt:

```bash
slang gpt --target=en --api-key=<api-key>
```

See more: [Documentation](Utilities/Gpt/README.md)

## Additional Materials

### Articles
- [Хабр (ru)](https://habr.com/ru/articles/874066/)
- [Medium (en)](https://medium.com/@egorozh.dev/simple-net-app-localization-with-slang-net-0d8a6363a459)

### Videos
- [Youtube (ru)](https://youtu.be/95l-KzxW9tM)
