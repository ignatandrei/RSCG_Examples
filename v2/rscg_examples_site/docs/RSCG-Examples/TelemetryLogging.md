---
sidebar_position: 900
title: 90 - TelemetryLogging
description: Generating deep logging messages for a class
slug: /TelemetryLogging
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# TelemetryLogging  by Microsoft


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Microsoft.Extensions.Telemetry.Abstractions?label=Microsoft.Extensions.Telemetry.Abstractions)](https://www.nuget.org/packages/Microsoft.Extensions.Telemetry.Abstractions/)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/extensions?label=updated)](https://github.com/dotnet/extensions)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/extensions?style=social)

## Details

### Info
:::info

Name: **TelemetryLogging**

Common abstractions for high-level telemetry primitives.

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/Microsoft.Extensions.Telemetry.Abstractions/*   


You can find more details at https://andrewlock.net/behind-logproperties-and-the-new-telemetry-logging-source-generator/

Source : https://github.com/dotnet/extensions

:::

### Original Readme
:::note

# Enriched Capabilities

This repository contains a suite of libraries that provide facilities commonly needed when creating production-ready applications. Initially developed to support high-scale and high-availability services within Microsoft, such as Microsoft Teams, these libraries deliver functionality that can help make applications more efficient, more robust, and more manageable.

The major functional areas this repo addresses are:
- Compliance: Mechanisms to help manage application data according to privacy regulations and policies, which includes a data annotation framework, audit report generation, and telemetry redaction.
- Diagnostics: Provides a set of APIs that can be used to gather and report diagnostic information about the health of a service.
- Contextual Options: Extends the .NET Options model to enable experimentations in production.
- Resilience: Builds on top of the popular Polly library to provide sophisticated resilience pipelines to make applications robust to transient errors.
- Telemetry: Sophisticated telemetry facilities provide enhanced logging, metering, tracing, and latency measuring functionality.
- AspNetCore extensions: Provides different middlewares and extensions that can be used to build high-performance and high-availability ASP.NET Core services.
- Static Analysis: Curated static analysis settings to help improve your code.
- Testing: Dramatically simplifies testing around common .NET abstractions such as ILogger and the TimeProvider.

[![Build Status](https://dev.azure.com/dnceng/internal/_apis/build/status/r9/dotnet-r9?branchName=main)](https://dev.azure.com/dnceng/internal/_build/latest?definitionId=1223&branchName=main)
[![Help Wanted](https://img.shields.io/github/issues/dotnet/extensions/help%20wanted?style=flat-square&color=%232EA043&label=help%20wanted)](https://github.com/dotnet/extensions/labels/help%20wanted)
[![Discord](https://img.shields.io/discord/732297728826277939?style=flat-square&label=Discord&logo=discord&logoColor=white&color=7289DA)](https://aka.ms/dotnet-discord)

## How can I contribute?

We welcome contributions! Many people all over the world have helped make this project better.

* [Contributing](https://github.com/dotnet/extensions/CONTRIBUTING.md) explains what kinds of contributions we welcome
* [Build instructions](https://github.com/dotnet/extensions/docs/building.md) explains how to build and test

## Reporting security issues and security bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) <secure@microsoft.com>. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/msrc/faqs-report-an-issue). You can also find these instructions in this repo's [Security doc](https://github.com/dotnet/extensions/SECURITY.md).

Also see info about related [Microsoft .NET Core and ASP.NET Core Bug Bounty Program](https://www.microsoft.com/msrc/bounty-dot-net-core).

## Useful Links

* [.NET Core source index](https://source.dot.net) / [.NET Framework source index](https://referencesource.microsoft.com)
* [API Reference docs](https://docs.microsoft.com/dotnet/api)
* [.NET API Catalog](https://apisof.net) (incl. APIs from daily builds and API usage info)
* [API docs writing guidelines](https://github.com/dotnet/dotnet-api-docs/wiki) - useful when writing /// comments
* [.NET Discord Server](https://aka.ms/dotnet-discord) - a place to discuss the development of .NET and its ecosystem

## .NET Foundation

This project is a [.NET Foundation](https://www.dotnetfoundation.org/projects) project.

There are many .NET related projects on GitHub.

* [.NET home repo](https://github.com/Microsoft/dotnet) - links to 100s of .NET projects, from Microsoft and the community.
* [ASP.NET Core home](https://docs.microsoft.com/aspnet/core) - the best place to start learning about ASP.NET Core.

This project has adopted the code of conduct defined by the [Contributor Covenant](https://contributor-covenant.org) to clarify expected behavior in our community. For more information, see the [.NET Foundation Code of Conduct](https://www.dotnetfoundation.org/code-of-conduct).

General .NET OSS discussions: [.NET Foundation Discussions](https://github.com/dotnet-foundation/Home/discussions)

## License

.NET (including the runtime repo) is licensed under the [MIT](https://github.com/dotnet/extensions/LICENSE.TXT) license.


:::

### About
:::note

Generating deep logging messages for a class


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TelemetryLogging**
```xml showLineNumbers {15}
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
	<ItemGroup>
		<PackageReference Include="Microsoft.Extensions.Logging.Console" Version="8.0.0" />
		<PackageReference Include="Microsoft.Extensions.Telemetry.Abstractions" Version="8.0.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TelemetryLogging\src\DemoLogging\Program.cs" label="Program.cs" >

  This is the use of **TelemetryLogging** in *Program.cs*

```csharp showLineNumbers 
using System.Text.Json;
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory = LoggerFactory.Create(
    builder =>
    {
        //builder.AddSimpleConsole();
        builder.AddJsonConsole(
            options =>
            options.JsonWriterOptions = new JsonWriterOptions()
            {
                Indented = true
            });
    }
        
    ) ;

ILogger<Person> logger = loggerFactory.CreateLogger<Person>();
logger.LogInformation("test");
(new LoggingSample(logger)).TestLogging();
public record Person (string firstName, string LastName)
{
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TelemetryLogging\src\DemoLogging\LogDemo.cs" label="LogDemo.cs" >

  This is the use of **TelemetryLogging** in *LogDemo.cs*

```csharp showLineNumbers 
using Microsoft.Extensions.Logging;

public partial class LoggingSample
{
    private readonly ILogger _logger;

    public LoggingSample(ILogger logger)
    {
        _logger = logger;
    }

    [LoggerMessage(
        EventId = 20,
        Level = LogLevel.Critical,
        Message = "Value is {value:E}")]
    public static partial void UsingFormatSpecifier(
        ILogger logger, double value);

    [LoggerMessage(
        EventId = 19,
        Level = LogLevel.Information,
        Message = "Logging all person properties",
        EventName = "PersonLogging")]
    public partial void LogWithProperties([LogProperties] Person person);


    [LoggerMessage(
        EventId = 9,
        Level = LogLevel.Trace,
        Message = "Fixed message",
        EventName = "CustomEventName")]
    public partial void LogWithCustomEventName();

    [LoggerMessage(
        EventId = 10,
        Message = "Welcome to {city} {province}!")]
    public partial void LogWithDynamicLogLevel(
        string city, LogLevel level, string province);

    public void  TestLogging()
    {
        LogWithProperties(new Person("Andrei", "Ignat"));
        //LogWithCustomEventName();

        //LogWithDynamicLogLevel("Vancouver", LogLevel.Warning, "BC");
        //LogWithDynamicLogLevel("Vancouver", LogLevel.Information, "BC");

        //UsingFormatSpecifier(_logger, 12345.6789);
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TelemetryLogging\src\DemoLogging\obj\GX\Microsoft.Gen.Logging\Microsoft.Gen.Logging.LoggingGenerator\Logging.g.cs" label="Logging.g.cs" >


```csharp showLineNumbers 

// <auto-generated/>
#nullable enable
#pragma warning disable CS1591 // Compensate for https://github.com/dotnet/roslyn/issues/54103
partial class LoggingSample
{
    /// <summary>
    /// Logs "Value is {value:E}" at "Critical" level.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Gen.Logging", "8.0.0.0")]
    public static partial void UsingFormatSpecifier(global::Microsoft.Extensions.Logging.ILogger logger, double value)
    {
        var state = global::Microsoft.Extensions.Logging.LoggerMessageHelper.ThreadLocalState;

        _ = state.ReserveTagSpace(2);
        state.TagArray[1] = new("value", value);
        state.TagArray[0] = new("{OriginalFormat}", "Value is {value:E}");

        logger.Log(
            global::Microsoft.Extensions.Logging.LogLevel.Critical,
            new(20, nameof(UsingFormatSpecifier)),
            state,
            null,
            static (s, _) =>
            {
                var value = s.TagArray[1].Value;
                return global::System.FormattableString.Invariant($"Value is {value:E}");
            });

        state.Clear();
    }

    /// <summary>
    /// Logs "Logging all person properties" at "Information" level.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Gen.Logging", "8.0.0.0")]
    public partial void LogWithProperties(global::Person person)
    {
        if (!_logger.IsEnabled(global::Microsoft.Extensions.Logging.LogLevel.Information))
        {
            return;
        }

        var state = global::Microsoft.Extensions.Logging.LoggerMessageHelper.ThreadLocalState;

        _ = state.ReserveTagSpace(3);
        state.TagArray[2] = new("person.firstName", person?.firstName);
        state.TagArray[1] = new("person.LastName", person?.LastName);
        state.TagArray[0] = new("{OriginalFormat}", "Logging all person properties");

        _logger.Log(
            global::Microsoft.Extensions.Logging.LogLevel.Information,
            new(19, "PersonLogging"),
            state,
            null,
            static (s, _) =>
            {
                return "Logging all person properties";
            });

        state.Clear();
    }

    /// <summary>
    /// Logs "Fixed message" at "Trace" level.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Gen.Logging", "8.0.0.0")]
    public partial void LogWithCustomEventName()
    {
        if (!_logger.IsEnabled(global::Microsoft.Extensions.Logging.LogLevel.Trace))
        {
            return;
        }

        var state = global::Microsoft.Extensions.Logging.LoggerMessageHelper.ThreadLocalState;

        _ = state.ReserveTagSpace(1);
        state.TagArray[0] = new("{OriginalFormat}", "Fixed message");

        _logger.Log(
            global::Microsoft.Extensions.Logging.LogLevel.Trace,
            new(9, "CustomEventName"),
            state,
            null,
            static (s, _) =>
            {
                return "Fixed message";
            });

        state.Clear();
    }

    /// <summary>
    /// Logs "Welcome to {city} {province}!".
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Gen.Logging", "8.0.0.0")]
    public partial void LogWithDynamicLogLevel(string city, global::Microsoft.Extensions.Logging.LogLevel level, string province)
    {
        if (!_logger.IsEnabled(level))
        {
            return;
        }

        var state = global::Microsoft.Extensions.Logging.LoggerMessageHelper.ThreadLocalState;

        _ = state.ReserveTagSpace(3);
        state.TagArray[2] = new("city", city);
        state.TagArray[1] = new("province", province);
        state.TagArray[0] = new("{OriginalFormat}", "Welcome to {city} {province}!");

        _logger.Log(
            level,
            new(10, nameof(LogWithDynamicLogLevel)),
            state,
            null,
            static (s, _) =>
            {
                var city = s.TagArray[2].Value ?? "(null)";
                var province = s.TagArray[1].Value ?? "(null)";
                return global::System.FormattableString.Invariant($"Welcome to {city} {province}!");
            });

        state.Clear();
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project TelemetryLogging ](/sources/TelemetryLogging.zip)

:::


### Share TelemetryLogging 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTelemetryLogging&quote=TelemetryLogging" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTelemetryLogging&text=TelemetryLogging:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTelemetryLogging" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTelemetryLogging&title=TelemetryLogging" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTelemetryLogging&title=TelemetryLogging&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTelemetryLogging" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TelemetryLogging

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [AspectGenerator](/docs/AspectGenerator)


### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


### [BuilderGenerator](/docs/BuilderGenerator)


### [CopyCat](/docs/CopyCat)


### [DudNet](/docs/DudNet)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Ling.Audit](/docs/Ling.Audit)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Decorator](/docs/RSCG_Decorator)


### [RSCG_Static](/docs/RSCG_Static)


### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


### [StaticReflection](/docs/StaticReflection)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)

