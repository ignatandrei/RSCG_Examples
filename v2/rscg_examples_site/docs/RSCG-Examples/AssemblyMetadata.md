---
sidebar_position: 2600
title: 260 - AssemblyMetadata
description:  Generates compile-time assembly metadata constants (build date, year, time, etc.) — access build info as typed properties without runtime reflection.
slug: /AssemblyMetadata
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementProject.mdx';

# AssemblyMetadata  by Benjamin Abt


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/AssemblyMetadata?label=AssemblyMetadata)](https://www.nuget.org/packages/AssemblyMetadata/)
[![GitHub last commit](https://img.shields.io/github/last-commit/BenjaminAbt/AssemblyMetadata?label=updated)](https://github.com/BenjaminAbt/AssemblyMetadata)
![GitHub Repo stars](https://img.shields.io/github/stars/BenjaminAbt/AssemblyMetadata?style=social)

## Details

### Info
:::info

Name: **AssemblyMetadata**

Assembly Metadata Information

Author: Benjamin Abt

NuGet: 
*https://www.nuget.org/packages/AssemblyMetadata/*   


You can find more details at https://github.com/BenjaminAbt/AssemblyMetadata

Source: https://github.com/BenjaminAbt/AssemblyMetadata

:::

### Author
:::note
Benjamin Abt 
![Alt text](https://github.com/BenjaminAbt.png)
:::

## Original Readme
:::note

### AssemblyMetadata

<p align="center">
    <img src="res/assembly-metadata-logo-small.png" alt="AssemblyMetadata" width="160" />
</p>

[![Main Build](https://github.com/BenjaminAbt/AssemblyMetadata/actions/workflows/main-build.yml/badge.svg)](https://github.com/BenjaminAbt/AssemblyMetadata/actions/workflows/main-build.yml)
[![NuGet](https://img.shields.io/nuget/v/AssemblyMetadata.svg?logo=nuget&label=AssemblyMetadata)](https://www.nuget.org/packages/AssemblyMetadata)
[![NuGet Downloads](https://img.shields.io/nuget/dt/AssemblyMetadata?logo=nuget&label=Downloads)](https://www.nuget.org/packages/AssemblyMetadata)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/BenjaminAbt/AssemblyMetadata/LICENSE)
[![.NET](https://img.shields.io/badge/.NET-8%20%7C%209%20%7C%2010%20%7C%2011-512BD4?logo=dotnet)](https://dotnet.microsoft.com)

| Framework | .NET 10 | .NET 9 | .NET 8 | .NET Standard / 4.6.2+ |
|---|---|---|---|---|
| Supported | ✅ | ✅ | ✅ |✅ |

A **Roslyn incremental source generator** that embeds build-time metadata - timestamp, date and
time components - as **compile-time constants** directly into your assembly.
Zero runtime overhead. No reflection. No configuration required.

---

###### Table of Contents

- [Why AssemblyMetadata?](#why-assemblymetadata)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
  - [Display Build Timestamp](#display-build-timestamp)
  - [Parse into DateTimeOffset](#parse-into-datetimeoffset)
  - [Reconstruct from FileTime (zero-allocation)](#reconstruct-from-filetime-zero-allocation)
  - [Use Individual Components](#use-individual-components)
  - [Build Age Check](#build-age-check)
  - [Health Endpoint](#health-endpoint)
- [Target Frameworks](#target-frameworks)
- [License](#license)

---

###### Why AssemblyMetadata?

Knowing *when* an assembly was built is useful for diagnostics, "About" screens, deployment
validation, and telemetry. The traditional approaches all have trade-offs:

| Approach | Runtime cost | Dependency | Works with AOT? |
|---|---|---|---|
| Read `AssemblyInformationalVersion` attribute | Reflection at runtime | None | ⚠️ Limited |
| Embed a resource file with the date | Resource deserialization | Build task | ⚠️ Yes |
| **AssemblyMetadata (this package)** | **Zero - values are `const`** | **None (analyzer only)** | **✅ Yes** |

AssemblyMetadata solves this differently:

- **Compile-time constants** - values are `const`, so the JIT can inline and dead-code-eliminate them
- **Zero-cost access** - reading the timestamp costs nothing beyond a register load
- **No dependencies at runtime** - the NuGet package ships as a Roslyn source generator;
  nothing is added to your runtime dependency graph
- **NativeAOT-compatible** - `const` fields have no reflection or dynamic dispatch
- **Incremental generator** - uses the modern Roslyn `IIncrementalGenerator` API, so the generator
  only re-runs when the compilation changes, keeping build times fast

---

###### Installation

Add the package to **any project** that needs build metadata:

```xml
<PackageReference Include="AssemblyMetadata"
                  Version="LATEST_VERSION"
                  OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false" />
```

> **`OutputItemType="Analyzer"`** and **`ReferenceOutputAssembly="false"`** are required.
> They instruct MSBuild to load the package as a Roslyn source generator (not a regular assembly
> reference), producing zero runtime dependencies.

---

###### Quick Start

After adding the package, the generated class `AssemblyMetadataInfo` is immediately available
anywhere in your project under the `BenjaminAbt.AssemblyMetadata` namespace:

```csharp
using BenjaminAbt.AssemblyMetadata;

// ISO 8601 UTC timestamp of the build
string timestamp = AssemblyMetadataInfo.BuildInfo.BuildTimestamp;
// → "2026-03-02T14:35:07.1234567+00:00"

Console.WriteLine($"Built on {AssemblyMetadataInfo.BuildInfo.BuildDateYear}-"
                + $"{AssemblyMetadataInfo.BuildInfo.BuildDateMonth:D2}-"
                + $"{AssemblyMetadataInfo.BuildInfo.BuildDateDay:D2} "
                + $"at {AssemblyMetadataInfo.BuildInfo.BuildTimeHour:D2}:"
                + $"{AssemblyMetadataInfo.BuildInfo.BuildTimeMinute:D2}:"
                + $"{AssemblyMetadataInfo.BuildInfo.BuildTimeSecond:D2} UTC");
```

No additional configuration, properties, or attributes are required.

---

###### API Reference

The generator produces a single file (`AssemblyMetadataInfo.gen.cs`) in the
`BenjaminAbt.AssemblyMetadata` namespace. All members are `public const`.

######### `AssemblyMetadataInfo.BuildInfo`

| Member | Type | Description |
|---|---|---|
| `BuildTimestamp` | `string` | Build time as a UTC ISO 8601 round-trip string (`"o"` format specifier) |
| `BuildFileTimeUtc` | `long` | Build time as a Windows FileTime - 100-nanosecond intervals since 1601-01-01T00:00:00Z |
| `BuildDateYear` | `int` | Year component of the UTC build date |
| `BuildDateMonth` | `int` | Month component of the UTC build date (1–12) |
| `BuildDateDay` | `int` | Day component of the UTC build date (1–31) |
| `BuildTimeHour` | `int` | Hour component of the UTC build time (0–23) |
| `BuildTimeMinute` | `int` | Minute component of the UTC build time (0–59) |
| `BuildTimeSecond` | `int` | Second component of the UTC build time (0–59) |

---

###### Usage Examples

######### Display Build Timestamp

```csharp
using BenjaminAbt.AssemblyMetadata;

Console.WriteLine(AssemblyMetadataInfo.BuildInfo.BuildTimestamp);
// → 2026-03-02T14:35:07.1234567+00:00
```

######### Parse into DateTimeOffset

Use the `"o"` round-trip format specifier to parse the stored constant back into a
`DateTimeOffset` - the same format used by the generator:

```csharp
using System;
using BenjaminAbt.AssemblyMetadata;

DateTimeOffset buildOn = DateTimeOffset.ParseExact(
    AssemblyMetadataInfo.BuildInfo.BuildTimestamp, "o", null);

Console.WriteLine($"Built {(DateTimeOffset.UtcNow - buildOn).Days} days ago.");
```

######### Reconstruct from FileTime (zero-allocation)

`BuildFileTimeUtc` lets you reconstruct a `DateTimeOffset` without any string parsing:

```csharp
using System;
using BenjaminAbt.AssemblyMetadata;

DateTimeOffset buildOn =
    DateTimeOffset.FromFileTime(AssemblyMetadataInfo.BuildInfo.BuildFileTimeUtc);
```

This is the fastest way to get a `DateTimeOffset` representation of the build time.

######### Use Individual Components

The integer constants allow zero-allocation formatting and direct numeric comparison:

```csharp
using BenjaminAbt.AssemblyMetadata;

// Compose a date string without DateTimeOffset overhead
string buildDate =
    $"{AssemblyMetadataInfo.BuildInfo.BuildDateYear}-"
  + $"{AssemblyMetadataInfo.BuildInfo.BuildDateMonth:D2}-"
  + $"{AssemblyMetadataInfo.BuildInfo.BuildDateDay:D2}";

// Direct year comparison - no parsing, no allocation
if (AssemblyMetadataInfo.BuildInfo.BuildDateYear < 2025)
    Console.WriteLine("Assembly was built before 2025.");
```

######### Build Age Check

```csharp
using System;
using BenjaminAbt.AssemblyMetadata;

TimeSpan age = DateTimeOffset.UtcNow
    - DateTimeOffset.FromFileTime(AssemblyMetadataInfo.BuildInfo.BuildFileTimeUtc);

if (age.TotalDays > 30)
    Console.WriteLine($"Warning: this build is {(int)age.TotalDays} days old.");
```

######### Health Endpoint

Expose the build timestamp in an ASP.NET Core health or info endpoint:

```csharp
using BenjaminAbt.AssemblyMetadata;

app.MapGet("/info", () => new
{
    BuildTimestamp = AssemblyMetadataInfo.BuildInfo.BuildTimestamp,
    BuildYear      = AssemblyMetadataInfo.BuildInfo.BuildDateYear,
    BuildMonth     = AssemblyMetadataInfo.BuildInfo.BuildDateMonth,
    BuildDay       = AssemblyMetadataInfo.BuildInfo.BuildDateDay,
});
```

---

###### License

[MIT](https://github.com/BenjaminAbt/AssemblyMetadata/LICENSE) © [BEN ABT](https://benjamin-abt.com/)

Please donate - if possible - to institutions of your choice such as child cancer aid,
children's hospices, etc. Thanks!


:::

### About
:::note

 Generates compile-time assembly metadata constants (build date, year, time, etc.) — access build info as typed properties without runtime reflection.





How to use





1. Add the package as an Analyzer (no runtime reference needed):


```xml


<PackageReference Include="AssemblyMetadata" Version="2.0.16" PrivateAssets="all"   


    OutputItemType="Analyzer" ReferenceOutputAssembly="false" />


```





2. Use the generated AssemblyMetadataInfo class directly:


```csharp


Console.WriteLine(BenjaminAbt.AssemblyMetadata.AssemblyMetadataInfo.BuildInfo.BuildDateYear);


```





You can use for  Embedding build date/time metadata into assemblies as compile-time constants — useful for version screens, diagnostics, or 'built on' display info without runtime I/O or reflection.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AssemblyMetadata**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AssemblyMetadata" Version="2.0.16" OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false"  />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AssemblyMetadata\src\DemoMeta\Program.cs" label="Program.cs" >

  This is the use of **AssemblyMetadata** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(BenjaminAbt.AssemblyMetadata.AssemblyMetadataInfo.BuildInfo.BuildDateYear);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AssemblyMetadata\src\DemoMeta\obj\GX\BenjaminAbt.AssemblyMetadata\BenjaminAbt.AssemblyMetadata.AssemblyMetadataGenerator\AssemblyMetadataInfo.gen.cs" label="AssemblyMetadataInfo.gen.cs" >
```csharp showLineNumbers 
// <auto-generated />
namespace BenjaminAbt.AssemblyMetadata
{
    internal static class AssemblyMetadataInfo
    {
        /// <summary>Contains compile-time build metadata constants.</summary>
        internal static class BuildInfo
        {
            /// <summary>Build time as UTC ISO 8601 string.</summary>
            public const string BuildTimestamp = "2026-04-03T05:50:57.6130105+00:00";

            /// <summary>Build time as Windows FileTime (100-ns intervals since 1601-01-01 UTC).</summary>
            public const long BuildFileTimeUtc = 134196690576130105L;

            /// <summary>Year component of the build date (UTC).</summary>
            public const int BuildDateYear = 2026;

            /// <summary>Month component of the build date (UTC).</summary>
            public const int BuildDateMonth = 4;

            /// <summary>Day component of the build date (UTC).</summary>
            public const int BuildDateDay = 3;

            /// <summary>Hour component of the build time (UTC, 24-hour).</summary>
            public const int BuildTimeHour = 5;

            /// <summary>Minute component of the build time (UTC).</summary>
            public const int BuildTimeMinute = 50;

            /// <summary>Second component of the build time (UTC).</summary>
            public const int BuildTimeSecond = 57;
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project AssemblyMetadata ](/sources/AssemblyMetadata.zip)

:::


### Share AssemblyMetadata 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata&quote=AssemblyMetadata" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata&text=AssemblyMetadata:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata&title=AssemblyMetadata" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata&title=AssemblyMetadata&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAssemblyMetadata" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AssemblyMetadata

<SameCategory />

