---
sidebar_position: 50
title: 05 - System.Text.RegularExpressions
description: Regex compiled
slug: /System.Text.RegularExpressions
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# System.Text.RegularExpressions  by Microsoft


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/System.Text.RegularExpressions?label=System.Text.RegularExpressions)](https://www.nuget.org/packages/System.Text.RegularExpressions/)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/runtime?label=updated)](https://github.com/dotnet/runtime)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/runtime?style=social)

## Details

### Info
:::info

Name: **System.Text.RegularExpressions**

Provides the System.Text.RegularExpressions.Regex class, an implementation of a regular expression engine.

Commonly Used Types:
System.Text.RegularExpressions.Regex
System.Text.RegularExpressions.RegexOptions
System.Text.RegularExpressions.Match
System.Text.RegularExpressions.Group
System.Text.RegularExpressions.Capture
System.Text.RegularExpressions.MatchEvaluator

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/System.Text.RegularExpressions/*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-source-generators/

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

Regex compiled


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **System.Text.RegularExpressions**
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.RegularExpressions\src\DemoRegex\Program.cs" label="Program.cs" >

  This is the use of **System.Text.RegularExpressions** in *Program.cs*

```csharp showLineNumbers 
using Demo;
//https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-source-generators
//https://devblogs.microsoft.com/dotnet/regular-expression-improvements-in-dotnet-7/
var x = "Abc";
Console.WriteLine(DemoRegex.EvaluateText(x));
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.RegularExpressions\src\DemoRegex\WeatherForecast.cs" label="WeatherForecast.cs" >

  This is the use of **System.Text.RegularExpressions** in *WeatherForecast.cs*

```csharp showLineNumbers 
using System.Text.RegularExpressions;

namespace Demo;

public partial class DemoRegex
{
    [GeneratedRegex("abc|def", RegexOptions.IgnoreCase, "en-US")]
    private static partial Regex AbcOrDefGeneratedRegex();

    public static bool EvaluateText(string text)
    {
        return (AbcOrDefGeneratedRegex().IsMatch(text));
        
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\System.Text.RegularExpressions\src\DemoRegex\obj\GX\System.Text.RegularExpressions.Generator\System.Text.RegularExpressions.Generator.RegexGenerator\RegexGenerator.g.cs" label="RegexGenerator.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
#pragma warning disable CS0162 // Unreachable code
#pragma warning disable CS0164 // Unreferenced label
#pragma warning disable CS0219 // Variable assigned but never used

namespace Demo
{
    partial class DemoRegex
    {
        /// <remarks>
        /// Pattern explanation:<br/>
        /// <code>
        /// ○ Match with 2 alternative expressions, atomically.<br/>
        ///     ○ Match a sequence of expressions.<br/>
        ///         ○ Match a character in the set [Aa].<br/>
        ///         ○ Match a character in the set [Bb].<br/>
        ///         ○ Match a character in the set [Cc].<br/>
        ///     ○ Match a sequence of expressions.<br/>
        ///         ○ Match a character in the set [Dd].<br/>
        ///         ○ Match a character in the set [Ee].<br/>
        ///         ○ Match a character in the set [Ff].<br/>
        /// </code>
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.10.26716")]
        private static partial global::System.Text.RegularExpressions.Regex AbcOrDefGeneratedRegex() => global::System.Text.RegularExpressions.Generated.AbcOrDefGeneratedRegex_0.Instance;
    }
}

namespace System.Text.RegularExpressions.Generated
{
    using System;
    using System.CodeDom.Compiler;
    using System.Collections;
    using System.ComponentModel;
    using System.Globalization;
    using System.Runtime.CompilerServices;
    using System.Text.RegularExpressions;
    using System.Threading;

    /// <summary>Custom <see cref="Regex"/>-derived type for the AbcOrDefGeneratedRegex method.</summary>
    [GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.10.26716")]
    file sealed class AbcOrDefGeneratedRegex_0 : Regex
    {
        /// <summary>Cached, thread-safe singleton instance.</summary>
        internal static readonly AbcOrDefGeneratedRegex_0 Instance = new();
    
        /// <summary>Initializes the instance.</summary>
        private AbcOrDefGeneratedRegex_0()
        {
            base.pattern = "abc|def";
            base.roptions = RegexOptions.IgnoreCase;
            ValidateMatchTimeout(Utilities.s_defaultTimeout);
            base.internalMatchTimeout = Utilities.s_defaultTimeout;
            base.factory = new RunnerFactory();
            base.capsize = 1;
        }
    
        /// <summary>Provides a factory for creating <see cref="RegexRunner"/> instances to be used by methods on <see cref="Regex"/>.</summary>
        private sealed class RunnerFactory : RegexRunnerFactory
        {
            /// <summary>Creates an instance of a <see cref="RegexRunner"/> used by methods on <see cref="Regex"/>.</summary>
            protected override RegexRunner CreateInstance() => new Runner();
        
            /// <summary>Provides the runner that contains the custom logic implementing the specified regular expression.</summary>
            private sealed class Runner : RegexRunner
            {
                /// <summary>Scan the <paramref name="inputSpan"/> starting from base.runtextstart for the next match.</summary>
                /// <param name="inputSpan">The text being scanned by the regular expression.</param>
                protected override void Scan(ReadOnlySpan<char> inputSpan)
                {
                    // Search until we can't find a valid starting position, we find a match, or we reach the end of the input.
                    while (TryFindNextPossibleStartingPosition(inputSpan) &&
                           !TryMatchAtCurrentPosition(inputSpan) &&
                           base.runtextpos != inputSpan.Length)
                    {
                        base.runtextpos++;
                        if (Utilities.s_hasTimeout)
                        {
                            base.CheckTimeout();
                        }
                    }
                }
        
                /// <summary>Search <paramref name="inputSpan"/> starting from base.runtextpos for the next location a match could possibly start.</summary>
                /// <param name="inputSpan">The text being scanned by the regular expression.</param>
                /// <returns>true if a possible match was found; false if no more matches are possible.</returns>
                private bool TryFindNextPossibleStartingPosition(ReadOnlySpan<char> inputSpan)
                {
                    int pos = base.runtextpos;
                    ulong charMinusLow;
                    
                    // Any possible match is at least 3 characters.
                    if (pos <= inputSpan.Length - 3)
                    {
                        // The pattern matches a character in the set [CFcf] at index 2.
                        // Find the next occurrence. If it can't be found, there's no match.
                        ReadOnlySpan<char> span = inputSpan.Slice(pos);
                        for (int i = 0; i < span.Length - 2; i++)
                        {
                            int indexOfPos = span.Slice(i + 2).IndexOfAny("CFcf");
                            if (indexOfPos < 0)
                            {
                                goto NoMatchFound;
                            }
                            i += indexOfPos;
                            
                            if (((long)((0x9000000090000000UL << (int)(charMinusLow = (uint)span[i] - 'A')) & (charMinusLow - 64)) < 0) &&
                                ((long)((0x9000000090000000UL << (int)(charMinusLow = (uint)span[i + 1] - 'B')) & (charMinusLow - 64)) < 0))
                            {
                                base.runtextpos = pos + i;
                                return true;
                            }
                        }
                    }
                    
                    // No match found.
                    NoMatchFound:
                    base.runtextpos = inputSpan.Length;
                    return false;
                }
        
                /// <summary>Determine whether <paramref name="inputSpan"/> at base.runtextpos is a match for the regular expression.</summary>
                /// <param name="inputSpan">The text being scanned by the regular expression.</param>
                /// <returns>true if the regular expression matches at the current position; otherwise, false.</returns>
                private bool TryMatchAtCurrentPosition(ReadOnlySpan<char> inputSpan)
                {
                    int pos = base.runtextpos;
                    int matchStart = pos;
                    ReadOnlySpan<char> slice = inputSpan.Slice(pos);
                    
                    // Match with 2 alternative expressions, atomically.
                    {
                        if (slice.IsEmpty)
                        {
                            return false; // The input didn't match.
                        }
                        
                        switch (slice[0])
                        {
                            case 'A' or 'a':
                                if ((uint)slice.Length < 3 ||
                                    !slice.Slice(1).StartsWith("bc", StringComparison.OrdinalIgnoreCase)) // Match the string "bc" (ordinal case-insensitive)
                                {
                                    return false; // The input didn't match.
                                }
                                
                                pos += 3;
                                slice = inputSpan.Slice(pos);
                                break;
                                
                            case 'D' or 'd':
                                if ((uint)slice.Length < 3 ||
                                    !slice.Slice(1).StartsWith("ef", StringComparison.OrdinalIgnoreCase)) // Match the string "ef" (ordinal case-insensitive)
                                {
                                    return false; // The input didn't match.
                                }
                                
                                pos += 3;
                                slice = inputSpan.Slice(pos);
                                break;
                                
                            default:
                                return false; // The input didn't match.
                        }
                    }
                    
                    // The input matched.
                    base.runtextpos = pos;
                    base.Capture(0, matchStart, pos);
                    return true;
                }
            }
        }

    }
    
    /// <summary>Helper methods used by generated <see cref="Regex"/>-derived implementations.</summary>
    [GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.10.26716")]
    file static class Utilities
    {
        /// <summary>Default timeout value set in <see cref="AppContext"/>, or <see cref="Regex.InfiniteMatchTimeout"/> if none was set.</summary>
        internal static readonly TimeSpan s_defaultTimeout = AppContext.GetData("REGEX_DEFAULT_MATCH_TIMEOUT") is TimeSpan timeout ? timeout : Regex.InfiniteMatchTimeout;
        
        /// <summary>Whether <see cref="s_defaultTimeout"/> is non-infinite.</summary>
        internal static readonly bool s_hasTimeout = s_defaultTimeout != Timeout.InfiniteTimeSpan;
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project System.Text.RegularExpressions ](/sources/System.Text.RegularExpressions.zip)

:::


### Share System.Text.RegularExpressions 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&quote=System.Text.RegularExpressions" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&text=System.Text.RegularExpressions:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&title=System.Text.RegularExpressions" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions&title=System.Text.RegularExpressions&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSystem.Text.RegularExpressions" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/System.Text.RegularExpressions

### In the same category (EnhancementClass) - 25 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [FastGenericNew](/docs/FastGenericNew)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [QueryStringGenerator](/docs/QueryStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

