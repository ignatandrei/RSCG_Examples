---
sidebar_position: 440
title: 44 - SyncMethodGenerator
description: Generating Sync method from async
slug: /SyncMethodGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# SyncMethodGenerator  by Zomp Inc.


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Zomp.SyncMethodGenerator?label=Zomp.SyncMethodGenerator)](https://www.nuget.org/packages/Zomp.SyncMethodGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/zompinc/sync-method-generator?label=updated)](https://github.com/zompinc/sync-method-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/zompinc/sync-method-generator?style=social)

## Details

### Info
:::info

Name: **SyncMethodGenerator**

Sync Method Generator

Author: Zomp Inc.

NuGet: 
*https://www.nuget.org/packages/Zomp.SyncMethodGenerator/*   


You can find more details at https://github.com/zompinc/sync-method-generator

Source : https://github.com/zompinc/sync-method-generator

:::

### Original Readme
:::note

# Sync Method Generator

[![Build](https://github.com/zompinc/sync-method-generator/actions/workflows/build.yml/badge.svg)](https://github.com/zompinc/sync-method-generator/actions/workflows/build.yml)
![Support .NET Standard 2.0](https://img.shields.io/badge/dotnet%20version-.NET%20Standard%202.0-blue)
[![Nuget](https://img.shields.io/nuget/v/Zomp.SyncMethodGenerator)](https://www.nuget.org/packages/Zomp.SyncMethodGenerator)
[![codecov](https://codecov.io/gh/zompinc/sync-method-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/zompinc/sync-method-generator)

This [.NET source generator](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) produces a sync method from an async one.

## Use cases

- A library which exposes both sync and async version of a method
- An application has to process two kinds of data in the same way:
  - Large data from I/O which cannot be stored in memory before processing: Original async method
  - Small sample of data in memory, usually a sample of the larger data: Generated sync method

## How it works

Add `CreateSyncVersionAttribute` to your async method in your `partial` class

```cs
[Zomp.SyncMethodGenerator.CreateSyncVersion]
static async Task WriteAsync(ReadOnlyMemory<byte> buffer, Stream stream, 
CancellationToken ct)
    => await stream.WriteAsync(buffer, ct).ConfigureAwait(true);
```

And it will generate a sync version of the method:

```cs
static void Write(ReadOnlySpan<byte> buffer, Stream stream)
    => stream.Write(buffer);
```

A list of changes applied to the new synchronized method:

- Remove async modifier
- Remove await from methods as well as `foreach` statement
- Change types

  | From                                                                                                                                                                                       | To                                                                                                       |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
  | [Task](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task) or [ValueTask](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1)                | void                                                                                                     |
  | [Task](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1) or [ValueTask](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1) | T                                                                                                        |
  | [IAsyncEnumerable](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1)                                                                         | [IEnumerable](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1) |
  | [IAsyncEnumerator](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerator-1)                                                                         | [IEnumerator](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerator-1) |
  | [Memory](https://learn.microsoft.com/en-us/dotnet/api/system.memory-1)                                                                                                                 | [Span](https://learn.microsoft.com/en-us/dotnet/api/system.span-1)                                   |
  | [ReadOnlyMemory](https://learn.microsoft.com/en-us/dotnet/api/system.readonlymemory-1)                                                                                                 | [ReadOnlySpan](https://learn.microsoft.com/en-us/dotnet/api/system.readonlyspan-1)                   |

- Remove parameters
  - [CancellationToken](https://learn.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken)
  - [IProgress](https://learn.microsoft.com/en-us/dotnet/api/system.iprogress-1)
- Invocation changes
  - Remove [ConfigureAwait](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.configureawait)
  - Remove [WithCancellation](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskasyncenumerableextensions.withcancellation)
  - Remove `Async` suffix from method calls (e.g. [MoveNextAsync](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerator-1.movenextasync) becomes [MoveNext](https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator.movenext))
  - Remove [CancellationToken](https://learn.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken) parameter
  - Remove [IProgress.Report(T)](https://learn.microsoft.com/en-us/dotnet/api/system.iprogress-1.report) call
  - Remove [Memory.Span](https://learn.microsoft.com/en-us/dotnet/api/system.memory-1.span) property
- Remove `CreateSyncVersionAttribute`
- Update XML documentation

## Installation

To add the library use:

```sh
dotnet add package Zomp.SyncMethodGenerator
```


:::

### About
:::note

Generating Sync method from async


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SyncMethodGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Zomp.SyncMethodGenerator" Version="1.0.14" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\zomp\src\ZompDemo\Program.cs" label="Program.cs" >

  This is the use of **SyncMethodGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using Zomp.SyncMethodGeneratorDemo;

Console.WriteLine("Hello, World!");
Writer.Haha("a.txt", "Andrei Ignat");
Writer.Write("a.txt", "andrei ignat");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\zomp\src\ZompDemo\Writer.cs" label="Writer.cs" >

  This is the use of **SyncMethodGenerator** in *Writer.cs*

```csharp showLineNumbers 
namespace Zomp.SyncMethodGeneratorDemo;

partial class Writer
{
    [Zomp.SyncMethodGenerator.CreateSyncVersion]
    public static async Task WriteAsync(string file, string contents,
CancellationToken ct)
    {
        await File.WriteAllTextAsync(file, contents, ct).ConfigureAwait(true);
    }
    [Zomp.SyncMethodGenerator.CreateSyncVersion]
    public static async Task HahaAsync(ReadOnlyMemory<byte> buffer, Stream stream,
CancellationToken ct)
    => await stream.WriteAsync(buffer, ct).ConfigureAwait(true);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\zomp\src\ZompDemo\obj\GX\Zomp.SyncMethodGenerator\Zomp.SyncMethodGenerator.SyncMethodSourceGenerator\CreateSyncVersionAttribute.g.cs" label="CreateSyncVersionAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
namespace Zomp.SyncMethodGenerator
{
    /// <summary>
    /// An attribute that can be used to automatically generate a synchronous version of an async method. Must be used in a partial class.
    /// </summary>
    [System.AttributeUsage(System.AttributeTargets.Method)]
    internal class CreateSyncVersionAttribute : System.Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\zomp\src\ZompDemo\obj\GX\Zomp.SyncMethodGenerator\Zomp.SyncMethodGenerator.SyncMethodSourceGenerator\Zomp.SyncMethodGeneratorDemo.Writer.HahaAsync.g.cs" label="Zomp.SyncMethodGeneratorDemo.Writer.HahaAsync.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace Zomp.SyncMethodGeneratorDemo;
partial class Writer
{
    public static void Haha(global::System.ReadOnlySpan<byte> buffer, global::System.IO.Stream stream)
    => stream.Write(buffer);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\zomp\src\ZompDemo\obj\GX\Zomp.SyncMethodGenerator\Zomp.SyncMethodGenerator.SyncMethodSourceGenerator\Zomp.SyncMethodGeneratorDemo.Writer.WriteAsync.g.cs" label="Zomp.SyncMethodGeneratorDemo.Writer.WriteAsync.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace Zomp.SyncMethodGeneratorDemo;
partial class Writer
{
    public static void Write(string file, string contents)
    {
        global::System.IO.File.WriteAllText(file, contents);
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project SyncMethodGenerator ](/sources/SyncMethodGenerator.zip)

:::


### Share SyncMethodGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSyncMethodGenerator&quote=SyncMethodGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSyncMethodGenerator&text=SyncMethodGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSyncMethodGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSyncMethodGenerator&title=SyncMethodGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSyncMethodGenerator&title=SyncMethodGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSyncMethodGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SyncMethodGenerator

### In the same category (EnhancementClass) - 25 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [CopyTo](/docs/CopyTo)


#### [DudNet](/docs/DudNet)


#### [FastGenericNew](/docs/FastGenericNew)


#### [GeneratorEquals](/docs/GeneratorEquals)


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


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

