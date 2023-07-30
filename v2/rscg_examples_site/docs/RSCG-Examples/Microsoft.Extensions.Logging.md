---
sidebar_position: 70
title: 07 - Microsoft.Extensions.Logging
description: Logging defined and compiled
slug: /Microsoft.Extensions.Logging
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Microsoft.Extensions.Logging  by Microsoft

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/Microsoft.Extensions.Logging?label=Microsoft.Extensions.Logging)](https://www.nuget.org/packages/Microsoft.Extensions.Logging/)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/runtime?label=updated)](https://github.com/dotnet/runtime)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/runtime?style=social)

## Details

### Info
:::info

Name: **Microsoft.Extensions.Logging**

Logging infrastructure.

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/Microsoft.Extensions.Logging/*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/core/extensions/logger-message-generator-generators/

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

.NET (including the runtime repo) is licensed under the [MIT](LICENSE.TXT) license.


:::

### About
:::note

Logging defined and compiled


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Microsoft.Extensions.Logging**
```xml showLineNumbers {14}
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
		<PackageReference Include="Microsoft.Extensions.Logging.Console" Version="7.0.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Extensions.Logging\src\DemoLogging\Program.cs" label="Program.cs" >

  This is the use of **Microsoft.Extensions.Logging** in *Program.cs*

```csharp showLineNumbers 
using System.Text.Json;
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory = LoggerFactory.Create(
    builder =>
    //https://learn.microsoft.com/en-us/dotnet/core/extensions/console-log-formatter
    builder.AddSimpleConsole()
    //builder.AddJsonConsole(
    //    options =>
    //    options.JsonWriterOptions = new JsonWriterOptions()
    //    {
    //        Indented = true
    //    })
    ) ;

ILogger<SampleObject> logger = loggerFactory.CreateLogger<SampleObject>();
logger.LogInformation("test");
//https://learn.microsoft.com/en-us/dotnet/core/extensions/logger-message-generator
(new LoggingSample(logger)).TestLogging();
file readonly record struct SampleObject { }

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Extensions.Logging\src\DemoLogging\LogDemo.cs" label="LogDemo.cs" >

  This is the use of **Microsoft.Extensions.Logging** in *LogDemo.cs*

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
        LogWithCustomEventName();

        LogWithDynamicLogLevel("Vancouver", LogLevel.Warning, "BC");
        LogWithDynamicLogLevel("Vancouver", LogLevel.Information, "BC");

        UsingFormatSpecifier(_logger, 12345.6789);
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Microsoft.Extensions.Logging\src\DemoLogging\obj\GX\Microsoft.Extensions.Logging.Generators\Microsoft.Extensions.Logging.Generators.LoggerMessageGenerator\LoggerMessage.g.cs" label="LoggerMessage.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

    partial class LoggingSample
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Logging.Generators", "7.0.7.1805")]
        private static readonly global::System.Action<global::Microsoft.Extensions.Logging.ILogger, global::System.Double, global::System.Exception?> __UsingFormatSpecifierCallback =
            global::Microsoft.Extensions.Logging.LoggerMessage.Define<global::System.Double>(global::Microsoft.Extensions.Logging.LogLevel.Critical, new global::Microsoft.Extensions.Logging.EventId(20, nameof(UsingFormatSpecifier)), "Value is {value:E}", new global::Microsoft.Extensions.Logging.LogDefineOptions() { SkipEnabledCheck = true }); 

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Logging.Generators", "7.0.7.1805")]
        public static partial void UsingFormatSpecifier(global::Microsoft.Extensions.Logging.ILogger logger, global::System.Double value)
        {
            if (logger.IsEnabled(global::Microsoft.Extensions.Logging.LogLevel.Critical))
            {
                __UsingFormatSpecifierCallback(logger, value, null);
            }
        }
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Logging.Generators", "7.0.7.1805")]
        private static readonly global::System.Action<global::Microsoft.Extensions.Logging.ILogger, global::System.Exception?> __LogWithCustomEventNameCallback =
            global::Microsoft.Extensions.Logging.LoggerMessage.Define(global::Microsoft.Extensions.Logging.LogLevel.Trace, new global::Microsoft.Extensions.Logging.EventId(9, "CustomEventName"), "Fixed message", new global::Microsoft.Extensions.Logging.LogDefineOptions() { SkipEnabledCheck = true }); 

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Logging.Generators", "7.0.7.1805")]
        public partial void LogWithCustomEventName()
        {
            if (_logger.IsEnabled(global::Microsoft.Extensions.Logging.LogLevel.Trace))
            {
                __LogWithCustomEventNameCallback(_logger, null);
            }
        }
        /// <summary> This API supports the logging infrastructure and is not intended to be used directly from your code. It is subject to change in the future. </summary>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Logging.Generators", "7.0.7.1805")]
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Never)]
        private readonly struct __LogWithDynamicLogLevelStruct : global::System.Collections.Generic.IReadOnlyList<global::System.Collections.Generic.KeyValuePair<string, object?>>
        {
            private readonly global::System.String _city;
            private readonly global::System.String _province;

            public __LogWithDynamicLogLevelStruct(global::System.String city, global::System.String province)
            {
                this._city = city;
                this._province = province;

            }

            public override string ToString()
            {
                var city = this._city;
                var province = this._province;

                return $"Welcome to {city} {province}!";
            }

            public static readonly global::System.Func<__LogWithDynamicLogLevelStruct, global::System.Exception?, string> Format = (state, ex) => state.ToString();

            public int Count => 3;

            public global::System.Collections.Generic.KeyValuePair<string, object?> this[int index]
            {
                get => index switch
                {
                    0 => new global::System.Collections.Generic.KeyValuePair<string, object?>("city", this._city),
                    1 => new global::System.Collections.Generic.KeyValuePair<string, object?>("province", this._province),
                    2 => new global::System.Collections.Generic.KeyValuePair<string, object?>("{OriginalFormat}", "Welcome to {city} {province}!"),

                    _ => throw new global::System.IndexOutOfRangeException(nameof(index)),  // return the same exception LoggerMessage.Define returns in this case
                };
            }

            public global::System.Collections.Generic.IEnumerator<global::System.Collections.Generic.KeyValuePair<string, object?>> GetEnumerator()
            {
                for (int i = 0; i < 3; i++)
                {
                    yield return this[i];
                }
            }

            global::System.Collections.IEnumerator global::System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
        }

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Extensions.Logging.Generators", "7.0.7.1805")]
        public partial void LogWithDynamicLogLevel(global::System.String city, global::Microsoft.Extensions.Logging.LogLevel level, global::System.String province)
        {
            if (_logger.IsEnabled(level))
            {
                _logger.Log(
                    level,
                    new global::Microsoft.Extensions.Logging.EventId(10, nameof(LogWithDynamicLogLevel)),
                    new __LogWithDynamicLogLevelStruct(city, province),
                    null,
                    __LogWithDynamicLogLevelStruct.Format);
            }
        }
    }
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project Microsoft.Extensions.Logging ](/sources/Microsoft.Extensions.Logging.zip)

:::

### Download PDF

[Download PDF Microsoft.Extensions.Logging ](/pdfs/Microsoft.Extensions.Logging.pdf)

### Share Microsoft.Extensions.Logging 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Logging&quote=Microsoft.Extensions.Logging" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Logging&text=Microsoft.Extensions.Logging:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Logging" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Logging&title=Microsoft.Extensions.Logging" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Logging&title=Microsoft.Extensions.Logging&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMicrosoft.Extensions.Logging" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Microsoft.Extensions.Logging
