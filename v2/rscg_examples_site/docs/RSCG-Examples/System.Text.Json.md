---
sidebar_position: 30
title: 03 - System.Text.Json
description: Json Serialize without reflection
slug: /System.Text.Json
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# System.Text.Json  by Microsoft


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/System.Text.Json?label=System.Text.Json)](https://www.nuget.org/packages/System.Text.Json/)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/runtime?label=updated)](https://github.com/dotnet/runtime)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/runtime?style=social)

## Details

### Info
:::info

Name: **System.Text.Json**

A minimalistic and fast JSON parser/deserializer, for full .NET

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/System.Text.Json/*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation

Source : https://github.com/dotnet/runtime

:::

### Original Readme
:::note

# .NET Runtime

[![Build Status](https://dev.azure.com/dnceng-public/public/_apis/build/status/dotnet/runtime/runtime?branchName=main)](https://dev.azure.com/dnceng-public/public/_build/latest?definitionId=129&branchName=main)
[![Help Wanted](https://img.shields.io/github/issues/dotnet/runtime/help%20wanted?style=flat-square&color=%232EA043&label=help%20wanted)](https://github.com/dotnet/runtime/labels/help%20wanted)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dotnet/runtime)
[![Discord](https://img.shields.io/discord/732297728826277939?style=flat-square&label=Discord&logo=discord&logoColor=white&color=7289DA)](https://aka.ms/dotnet-discord)

* [What is .NET?](#what-is-net)
* [How can I contribute?](#how-can-i-contribute)
* [Reporting security issues and security bugs](#reporting-security-issues-and-security-bugs)
* [Filing issues](#filing-issues)
* [Useful Links](#useful-links)
* [.NET Foundation](#net-foundation)
* [License](#license)

This repo contains the code to build the .NET runtime, libraries and shared host (`dotnet`) installers for
all supported platforms, as well as the sources to .NET runtime and libraries.

## What is .NET?

Official Starting Page: <https://dotnet.microsoft.com>

* [How to use .NET](https://docs.microsoft.com/dotnet/core/get-started) (with VS, VS Code, command-line CLI)
  * [Install official releases](https://dotnet.microsoft.com/download)
  * Install daily builds
  * [Documentation](https://docs.microsoft.com/dotnet/core) (Get Started, Tutorials, Porting from .NET Framework, API reference, ...)
    * [Deploying apps](https://docs.microsoft.com/dotnet/core/deploying)
  * [Supported OS versions](https://github.com/dotnet/core/blob/main/os-lifecycle-policy.md)
* [Roadmap](https://github.com/dotnet/core/blob/main/roadmap.md)
* [Releases](https://github.com/dotnet/core/tree/main/release-notes)

## How can I contribute?

We welcome contributions! Many people all over the world have helped make this project better.

* Contributing explains what kinds of contributions we welcome
* Workflow Instructions explains how to build and test
* Get Up and Running on .NET Core explains how to get nightly builds of the runtime and its libraries to test them in your own projects.

## Reporting security issues and security bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) <secure@microsoft.com>. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/msrc/faqs-report-an-issue). You can also find these instructions in this repo's Security doc.

Also see info about related [Microsoft .NET Core and ASP.NET Core Bug Bounty Program](https://www.microsoft.com/msrc/bounty-dot-net-core).

## Filing issues

This repo should contain issues that are tied to the runtime, the class libraries and frameworks, the installation of the `dotnet` binary (sometimes known as the `muxer`) and installation of the .NET runtime and libraries.

For other issues, please file them to their appropriate sibling repos. We have links to many of them on [our new issue page](https://github.com/dotnet/runtime/issues/new/choose).

## Useful Links

* [.NET Core source index](https://source.dot.net) / [.NET Framework source index](https://referencesource.microsoft.com)
* [API Reference docs](https://docs.microsoft.com/dotnet/api)
* [.NET API Catalog](https://apisof.net) (incl. APIs from daily builds and API usage info)
* [API docs writing guidelines](https://github.com/dotnet/dotnet-api-docs/wiki) - useful when writing /// comments
* [.NET Discord Server](https://aka.ms/dotnet-discord) - a place to discuss the development of .NET and its ecosystem

## .NET Foundation

.NET Runtime is a [.NET Foundation](https://www.dotnetfoundation.org/projects) project.

There are many .NET related projects on GitHub.

* [.NET home repo](https://github.com/Microsoft/dotnet) - links to 100s of .NET projects, from Microsoft and the community.
* [ASP.NET Core home](https://docs.microsoft.com/aspnet/core) - the best place to start learning about ASP.NET Core.

This project has adopted the code of conduct defined by the [Contributor Covenant](https://contributor-covenant.org) to clarify expected behavior in our community. For more information, see the [.NET Foundation Code of Conduct](https://www.dotnetfoundation.org/code-of-conduct).

General .NET OSS discussions: [.NET Foundation Discussions](https://github.com/dotnet-foundation/Home/discussions)

## License

.NET (including the runtime repo) is licensed under the MIT license.


:::

### About
:::note

Json Serialize without reflection


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **System.Text.Json**
```xml showLineNumbers {1}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\Program.cs" label="Program.cs" >

  This is the use of **System.Text.Json** in *Program.cs*

```csharp showLineNumbers 
using JsonSerializerOptionsExample;
using System.Text.Json;
//for asp.net core
//services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.AddContext<MyJsonContext>());
//https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string

string jsonString ="""
{
  "date": "2019-08-01T00:00:00",
  "temperatureCelsius": 25,
  "summary": "Hot"
}
""";
        WeatherForecast? weatherForecast= JsonSerializer.Deserialize(
            jsonString,
            typeof(WeatherForecast),
            new OptionsExampleContext(
                new JsonSerializerOptions(JsonSerializerDefaults.Web)))
                as WeatherForecast;
        Console.WriteLine($"Date={weatherForecast?.Date}");
        // output:
        //Date=8/1/2019 12:00:00 AM

        jsonString = JsonSerializer.Serialize(
            weatherForecast,
            typeof(WeatherForecast),
            new OptionsExampleContext(
                new JsonSerializerOptions(JsonSerializerDefaults.Web)));
        Console.WriteLine(jsonString);
jsonString = JsonSerializer.Serialize(
    weatherForecast,
    typeof(WeatherForecast),
    new OptionsExampleContext(
        new JsonSerializerOptions(JsonSerializerDefaults.General)));
Console.WriteLine(jsonString);
// output:
//{ "date":"2019-08-01T00:00:00","temperatureCelsius":25,"summary":"Hot"}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\WeatherForecast.cs" label="WeatherForecast.cs" >

  This is the use of **System.Text.Json** in *WeatherForecast.cs*

```csharp showLineNumbers 
namespace JsonSerializerOptionsExample;

public class WeatherForecast
{
    public DateTime Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\OptionsExampleContext.cs" label="OptionsExampleContext.cs" >

  This is the use of **System.Text.Json** in *OptionsExampleContext.cs*

```csharp showLineNumbers 
using System.Text.Json.Serialization;

namespace JsonSerializerOptionsExample;

[JsonSerializable(typeof(WeatherForecast))]
internal partial class OptionsExampleContext : JsonSerializerContext
{
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.DateTime.g.cs" label="OptionsExampleContext.DateTime.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    internal partial class OptionsExampleContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.DateTime>? _DateTime;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.DateTime> DateTime
        {
            get => _DateTime ??= Create_DateTime(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.DateTime> Create_DateTime(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.DateTime>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::System.DateTime))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.DateTime>(options, customConverter);
            }
            else
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.DateTime>(options, global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.DateTimeConverter);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.g.cs" label="OptionsExampleContext.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Text.Json.SourceGeneration", "7.0.9.1910")]
    internal partial class OptionsExampleContext
    {
        
        private static global::System.Text.Json.JsonSerializerOptions s_defaultOptions { get; } = new global::System.Text.Json.JsonSerializerOptions()
        {
            DefaultIgnoreCondition = global::System.Text.Json.Serialization.JsonIgnoreCondition.Never,
            IgnoreReadOnlyFields = false,
            IgnoreReadOnlyProperties = false,
            IncludeFields = false,
            WriteIndented = false,
        };
        
        private static global::JsonSerializerOptionsExample.OptionsExampleContext? s_defaultContext;
        
        /// <summary>
        /// The default <see cref="global::System.Text.Json.Serialization.JsonSerializerContext"/> associated with a default <see cref="global::System.Text.Json.JsonSerializerOptions"/> instance.
        /// </summary>
        public static global::JsonSerializerOptionsExample.OptionsExampleContext Default => s_defaultContext ??= new global::JsonSerializerOptionsExample.OptionsExampleContext(new global::System.Text.Json.JsonSerializerOptions(s_defaultOptions));
        
        /// <summary>
        /// The source-generated options associated with this context.
        /// </summary>
        protected override global::System.Text.Json.JsonSerializerOptions? GeneratedSerializerOptions { get; } = s_defaultOptions;
        
        /// <inheritdoc/>
        public OptionsExampleContext() : base(null)
        {
        }
        
        /// <inheritdoc/>
        public OptionsExampleContext(global::System.Text.Json.JsonSerializerOptions options) : base(options)
        {
        }
        
        private static global::System.Text.Json.Serialization.JsonConverter? GetRuntimeProvidedCustomConverter(global::System.Text.Json.JsonSerializerOptions options, global::System.Type type)
        {
            global::System.Collections.Generic.IList<global::System.Text.Json.Serialization.JsonConverter> converters = options.Converters;
        
            for (int i = 0; i < converters.Count; i++)
            {
                global::System.Text.Json.Serialization.JsonConverter? converter = converters[i];
        
                if (converter.CanConvert(type))
                {
                    if (converter is global::System.Text.Json.Serialization.JsonConverterFactory factory)
                    {
                        converter = factory.CreateConverter(type, options);
                        if (converter == null || converter is global::System.Text.Json.Serialization.JsonConverterFactory)
                        {
                            throw new global::System.InvalidOperationException(string.Format("The converter '{0}' cannot return null or a JsonConverterFactory instance.", factory.GetType()));
                        }
                    }
        
                    return converter;
                }
            }
        
            return null;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.GetJsonTypeInfo.g.cs" label="OptionsExampleContext.GetJsonTypeInfo.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    internal partial class OptionsExampleContext: global::System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver
    {
        /// <inheritdoc/>
        public override global::System.Text.Json.Serialization.Metadata.JsonTypeInfo GetTypeInfo(global::System.Type type)
        {
            if (type == typeof(global::JsonSerializerOptionsExample.WeatherForecast))
            {
                return this.WeatherForecast;
            }
        
            if (type == typeof(global::System.DateTime))
            {
                return this.DateTime;
            }
        
            if (type == typeof(global::System.Int32))
            {
                return this.Int32;
            }
        
            if (type == typeof(global::System.String))
            {
                return this.String;
            }
        
            return null!;
        }
        
        global::System.Text.Json.Serialization.Metadata.JsonTypeInfo? global::System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver.GetTypeInfo(global::System.Type type, global::System.Text.Json.JsonSerializerOptions options)
        {
            if (type == typeof(global::JsonSerializerOptionsExample.WeatherForecast))
            {
                return Create_WeatherForecast(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::System.DateTime))
            {
                return Create_DateTime(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::System.Int32))
            {
                return Create_Int32(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::System.String))
            {
                return Create_String(options, makeReadOnly: false);
            }
        
            return null;
        }
        
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.Int32.g.cs" label="OptionsExampleContext.Int32.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    internal partial class OptionsExampleContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.Int32>? _Int32;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.Int32> Int32
        {
            get => _Int32 ??= Create_Int32(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.Int32> Create_Int32(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.Int32>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::System.Int32))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.Int32>(options, customConverter);
            }
            else
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.Int32>(options, global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.Int32Converter);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.PropertyNames.g.cs" label="OptionsExampleContext.PropertyNames.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    internal partial class OptionsExampleContext
    {
        
        private static readonly global::System.Text.Json.JsonEncodedText PropName_Date = global::System.Text.Json.JsonEncodedText.Encode("Date");
        private static readonly global::System.Text.Json.JsonEncodedText PropName_TemperatureCelsius = global::System.Text.Json.JsonEncodedText.Encode("TemperatureCelsius");
        private static readonly global::System.Text.Json.JsonEncodedText PropName_Summary = global::System.Text.Json.JsonEncodedText.Encode("Summary");
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.String.g.cs" label="OptionsExampleContext.String.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    internal partial class OptionsExampleContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String>? _String;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String> String
        {
            get => _String ??= Create_String(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String> Create_String(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::System.String))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.String>(options, customConverter);
            }
            else
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.String>(options, global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.StringConverter);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.Json\src\DemoSerializeJSON\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\OptionsExampleContext.WeatherForecast.g.cs" label="OptionsExampleContext.WeatherForecast.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

namespace JsonSerializerOptionsExample
{
    internal partial class OptionsExampleContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonSerializerOptionsExample.WeatherForecast>? _WeatherForecast;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonSerializerOptionsExample.WeatherForecast> WeatherForecast
        {
            get => _WeatherForecast ??= Create_WeatherForecast(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonSerializerOptionsExample.WeatherForecast> Create_WeatherForecast(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonSerializerOptionsExample.WeatherForecast>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::JsonSerializerOptionsExample.WeatherForecast))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::JsonSerializerOptionsExample.WeatherForecast>(options, customConverter);
            }
            else
            {
                global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonSerializerOptionsExample.WeatherForecast> objectInfo = new global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonSerializerOptionsExample.WeatherForecast>()
                {
                    ObjectCreator = static () => new global::JsonSerializerOptionsExample.WeatherForecast(),
                    ObjectWithParameterizedConstructorCreator = null,
                    PropertyMetadataInitializer = _ => WeatherForecastPropInit(options),
                    ConstructorParameterMetadataInitializer = null,
                    NumberHandling = default,
                    SerializeHandler = WeatherForecastSerializeHandler
                };
        
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateObjectInfo<global::JsonSerializerOptionsExample.WeatherForecast>(options, objectInfo);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
        private static global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] WeatherForecastPropInit(global::System.Text.Json.JsonSerializerOptions options)
        {
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] properties = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[3];
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.DateTime> info0 = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.DateTime>()
            {
                IsProperty = true,
                IsPublic = true,
                IsVirtual = false,
                DeclaringType = typeof(global::JsonSerializerOptionsExample.WeatherForecast),
                Converter = null,
                Getter = static (obj) => ((global::JsonSerializerOptionsExample.WeatherForecast)obj).Date,
                Setter = static (obj, value) => ((global::JsonSerializerOptionsExample.WeatherForecast)obj).Date = value!,
                IgnoreCondition = null,
                HasJsonInclude = false,
                IsExtensionData = false,
                NumberHandling = default,
                PropertyName = "Date",
                JsonPropertyName = null
            };
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo propertyInfo0 = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreatePropertyInfo<global::System.DateTime>(options, info0);
            properties[0] = propertyInfo0;
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.Int32> info1 = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.Int32>()
            {
                IsProperty = true,
                IsPublic = true,
                IsVirtual = false,
                DeclaringType = typeof(global::JsonSerializerOptionsExample.WeatherForecast),
                Converter = null,
                Getter = static (obj) => ((global::JsonSerializerOptionsExample.WeatherForecast)obj).TemperatureCelsius,
                Setter = static (obj, value) => ((global::JsonSerializerOptionsExample.WeatherForecast)obj).TemperatureCelsius = value!,
                IgnoreCondition = null,
                HasJsonInclude = false,
                IsExtensionData = false,
                NumberHandling = default,
                PropertyName = "TemperatureCelsius",
                JsonPropertyName = null
            };
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo propertyInfo1 = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreatePropertyInfo<global::System.Int32>(options, info1);
            properties[1] = propertyInfo1;
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String> info2 = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String>()
            {
                IsProperty = true,
                IsPublic = true,
                IsVirtual = false,
                DeclaringType = typeof(global::JsonSerializerOptionsExample.WeatherForecast),
                Converter = null,
                Getter = static (obj) => ((global::JsonSerializerOptionsExample.WeatherForecast)obj).Summary!,
                Setter = static (obj, value) => ((global::JsonSerializerOptionsExample.WeatherForecast)obj).Summary = value!,
                IgnoreCondition = null,
                HasJsonInclude = false,
                IsExtensionData = false,
                NumberHandling = default,
                PropertyName = "Summary",
                JsonPropertyName = null
            };
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo propertyInfo2 = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreatePropertyInfo<global::System.String>(options, info2);
            properties[2] = propertyInfo2;
        
            return properties;
        }
        
        // Intentionally not a static method because we create a delegate to it. Invoking delegates to instance
        // methods is almost as fast as virtual calls. Static methods need to go through a shuffle thunk.
        private void WeatherForecastSerializeHandler(global::System.Text.Json.Utf8JsonWriter writer, global::JsonSerializerOptionsExample.WeatherForecast? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
        
            writer.WriteStartObject();
            writer.WriteString(PropName_Date, value.Date);
            writer.WriteNumber(PropName_TemperatureCelsius, value.TemperatureCelsius);
            writer.WriteString(PropName_Summary, value.Summary);
        
            writer.WriteEndObject();
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project System.Text.Json ](/sources/System.Text.Json.zip)

:::


### Share System.Text.Json 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.Json&quote=System.Text.Json" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.Json&text=System.Text.Json:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.Json" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.Json&title=System.Text.Json" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.Json&title=System.Text.Json&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.Json" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/System.Text.Json

## In the same category (Serializer)


### [jsonConverterSourceGenerator](/docs/jsonConverterSourceGenerator)


### [JsonPolymorphicGenerator](/docs/JsonPolymorphicGenerator)


### [ProtobufSourceGenerator](/docs/ProtobufSourceGenerator)

