---
sidebar_position: 2940
title: 294 - Slang.Net
description: Generate localization files from strings
slug: /Slang.Net
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFilesToCode.mdx';

# Slang.Net  by Egor Zheludkov


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Slang.Net?label=Slang.Net)](https://www.nuget.org/packages/Slang.Net/)
[![GitHub last commit](https://img.shields.io/github/last-commit/egorozh/Slang.NET?label=updated)](https://github.com/egorozh/Slang.NET/)
![GitHub Repo stars](https://img.shields.io/github/stars/egorozh/Slang.NET?style=social)

## Details

### Info
:::info

Name: **Slang.Net**

Type-safe i18n for .NET

Author: Egor Zheludkov

NuGet: 
*https://www.nuget.org/packages/Slang.Net/*   


You can find more details at https://github.com/egorozh/Slang.NET/

Source: https://github.com/egorozh/Slang.NET/

:::

### Author
:::note
Egor Zheludkov 
![Alt text](https://github.com/egorozh.png)
:::

## Original Readme
:::note

![Slang.NET](https://raw.githubusercontent.com/egorozh/Slang.NET/main/assets/icon-128.png)

### Slang.NET

[![Nuget](https://img.shields.io/nuget/v/Slang.Net?label=Slang.Net)](https://www.nuget.org/packages/Slang.Net)
[![Nuget](https://img.shields.io/nuget/v/Slang.CLI?label=Slang.CLI)](https://www.nuget.org/packages/Slang.CLI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Type-safe i18n for .NET

###### About this library

Slang.NET is a .NET port of the [slang](https://pub.dev/packages/slang) from the Dart/Flutter community with new
features (like string format).

You can view how the generated
files [general](https://github.com/egorozh/Slang.NET/blob/develop/Slang.Tests/Integration/Resources/_expected_header.output), [en](https://github.com/egorozh/Slang.NET/blob/develop/Slang.Tests/Integration/Resources/_expected_en.output),
and [de](https://github.com/egorozh/Slang.NET/blob/develop/Slang.Tests/Integration/Resources/_expected_de.output) look

###### Getting Started:

Install the library as a NuGet package:

```powershell
Install-Package dotnet add package Slang.Net
```

######### Add JSON files:

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

######### Include JSON files as AdditionalFiles:

```xml

<ItemGroup>
    <AdditionalFiles Include="i18n\*.i18n.json" />
    <AdditionalFiles Include="slang.json" />
</ItemGroup>
```

######### Add a partial class:

``` csharp
[Translations(InputFileName = "strings")]
public partial class Strings;
```

######### Done!

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

###### Features

- [String Interpolation](#string-interpolation)
- [Typed Parameters](#typed-parameters)
- [Comments](#comments)
- [String Format](#string-format)
- [Pluralization](#pluralization)
- [Linked Translations](#linked-translations)
- [Lists](#lists)
- [Maps](#maps)

######### String Interpolation

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

######### Typed Parameters

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

######### Comments

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

######### String Format

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

######### Pluralization

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

######### Linked Translations

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

######### Lists

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

######### Maps

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

###### Slang CLI

######### Translate with GPT

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

###### Additional Materials

######### Articles
- [Хабр (ru)](https://habr.com/ru/articles/874066/)
- [Medium (en)](https://medium.com/@egorozh.dev/simple-net-app-localization-with-slang-net-0d8a6363a459)

######### Videos
- [Youtube (ru)](https://youtu.be/95l-KzxW9tM)


:::

### About
:::note

Generate localization files from strings


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Slang.Net**
```xml showLineNumbers {21}
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
		<AdditionalFiles Include="i18n\*.i18n.json" />
		<AdditionalFiles Remove="i18n\AllText_ro-Ro.i18n.json" />
		<AdditionalFiles Include="slang.json" />
	</ItemGroup>

	<ItemGroup>
	  <PackageReference Include="Slang.Net" Version="10.1.1" />
	</ItemGroup>	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\i18n\AllText.i18n.json" label="AllText.i18n.json" >

  This is the use of **Slang.Net** in *AllText.i18n.json*

```csharp showLineNumbers 
{
	"page1": {
		"MyText": "List of Persons"
	}
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\i18n\AllText_ro.i18n.json" label="AllText_ro.i18n.json" >

  This is the use of **Slang.Net** in *AllText_ro.i18n.json*

```csharp showLineNumbers 
{
	"page1": {
		"MyText": "Lista persoanelor"
	}
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\Trans.cs" label="Trans.cs" >

  This is the use of **Slang.Net** in *Trans.cs*

```csharp showLineNumbers 
using Slang;

namespace EmbedDemo;

[Translations(InputFileName = "AllText")]
public partial class TranslateAllText;

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\Program.cs" label="Program.cs" >

  This is the use of **Slang.Net** in *Program.cs*

```csharp showLineNumbers 
using EmbedDemo;
using System.Globalization;

Console.WriteLine("Hello, World!");

TranslateAllText.SetCulture(new CultureInfo("en-US"));
Console.WriteLine(TranslateAllText.Instance.Root.Page1.MyText);

TranslateAllText.SetCulture(new CultureInfo("ro-RO")    );
Console.WriteLine(TranslateAllText.Instance.Root.Page1.MyText);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\obj\GX\Slang.Generator\Slang.Generator.TranslateGenerator\TranslateAllText.g.cs" label="TranslateAllText.g.cs" >
```csharp showLineNumbers 
// Generated file. Do not edit.
//
//
// Locales: 2
//
// Built on 20.09.2026 at 16:12 UTC

#nullable enable

using Slang;
using EmbedDemo;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Threading;

namespace EmbedDemo
{
	partial class TranslateAllText
	{
		private static readonly CultureInfo _en_US = new CultureInfo("en-US");
		private static readonly CultureInfo _ro = new CultureInfo("ro");

        private static readonly Dictionary<CultureInfo, TranslateAllText> _translations =
            new Dictionary<CultureInfo, TranslateAllText>(capacity: 2)
            {
				{_en_US, new TranslateAllText() },
				{_ro, new TranslateAllTextRo() }
            };


		public static CultureInfo BaseCulture => _en_US;

		public static IReadOnlyList<CultureInfo> SupportedCultures => _translations.Keys.ToList();
		
		public static TranslationsInstance Instance \{ get; \} = new TranslationsInstance();

		public static void SetCulture(CultureInfo culture, bool uiOnly = false)
		{
			if (!uiOnly)
				CultureInfo.CurrentCulture = culture;

			CultureInfo.CurrentUICulture = culture;
			
			Instance.OnCultureChanged();
		}
		
		public class TranslationsInstance : INotifyPropertyChanged
		{
			public event PropertyChangedEventHandler? PropertyChanged;
	
			public TranslateAllText Root
			{
				get
				{
					var culture = CultureInfo.CurrentUICulture;

					if (_translations.TryGetValue(culture, out var translation))
						return translation;
			
					var sameCulture = SupportedCultures.FirstOrDefault(c => c.TwoLetterISOLanguageName == culture.TwoLetterISOLanguageName);

					if (sameCulture != null)
						return _translations[sameCulture];

					return _translations[BaseCulture];
				}
			}

			public void OnCultureChanged()
			{	
				PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Root)));
			}
		}	
	}
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\obj\GX\Slang.Generator\Slang.Generator.TranslateGenerator\TranslateAllText_en-US.g.cs" label="TranslateAllText_en-US.g.cs" >
```csharp showLineNumbers 
#nullable enable

using Slang;
using EmbedDemo;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;

namespace EmbedDemo
{
	partial class TranslateAllText
	{
		protected virtual TranslateAllText _root \{ get; \} // ignore: unused_field

		public TranslateAllText()
		{
			_root = this;
			Page1 = new TranslateAllTextPage1EnUs(_root);
		}

		// Translations
		public virtual TranslateAllTextPage1EnUs Page1 \{ get; }

		// Path: Page1
		public class TranslateAllTextPage1EnUs
		{
			public TranslateAllTextPage1EnUs(TranslateAllText root)
			{
				this._root = root;
			}

			protected virtual TranslateAllText _root \{ get; \} // ignore: unused_field

			// Translations

			/// In en, this message translates to:
			/// **"List of Persons"**
			public virtual string MyText => "List of Persons";
		}

   }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Slang.Net\src\EmbedDemo\obj\GX\Slang.Generator\Slang.Generator.TranslateGenerator\TranslateAllText_ro.g.cs" label="TranslateAllText_ro.g.cs" >
```csharp showLineNumbers 
#nullable enable

using Slang;
using EmbedDemo;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;

namespace EmbedDemo
{
	partial class TranslateAllTextRo : TranslateAllText
	{
		protected override TranslateAllTextRo _root \{ get; \} // ignore: unused_field

		public TranslateAllTextRo()
		{
			_root = this;
			Page1 = new TranslateAllTextPage1Ro(_root);
		}

		// Translations
		public override TranslateAllTextPage1Ro Page1 \{ get; }

		// Path: Page1
		public class TranslateAllTextPage1Ro : TranslateAllTextPage1EnUs
		{
			public TranslateAllTextPage1Ro(TranslateAllTextRo root) : base(root)
			{
				this._root = root;
			}

			protected override TranslateAllTextRo _root \{ get; \} // ignore: unused_field

			// Translations

			/// In ro, this message translates to:
			/// **"Lista persoanelor"**
			public override string MyText => "Lista persoanelor";
		}

   }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Slang.Net ](/sources/Slang.Net.zip)

:::


### Share Slang.Net 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSlang.Net&quote=Slang.Net" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSlang.Net&text=Slang.Net:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSlang.Net" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSlang.Net&title=Slang.Net" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSlang.Net&title=Slang.Net&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSlang.Net" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Slang.Net

<SameCategory />

