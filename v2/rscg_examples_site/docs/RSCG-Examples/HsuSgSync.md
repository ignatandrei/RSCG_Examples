---
sidebar_position: 960
title: 96 - HsuSgSync
description: Generate code for async to sync methods
slug: /HsuSgSync
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# HsuSgSync  by Net Hsu


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Hsu.Sg.Sync?label=Hsu.Sg.Sync)](https://www.nuget.org/packages/Hsu.Sg.Sync/)
[![GitHub last commit](https://img.shields.io/github/last-commit/hsu-net/source-generators?label=updated)](https://github.com/hsu-net/source-generators)
![GitHub Repo stars](https://img.shields.io/github/stars/hsu-net/source-generators?style=social)

## Details

### Info
:::info

Name: **HsuSgSync**

an async method to sync source generator.

Author: Net Hsu

NuGet: 
*https://www.nuget.org/packages/Hsu.Sg.Sync/*   


You can find more details at https://github.com/hsu-net/source-generators

Source : https://github.com/hsu-net/source-generators

:::

### Original Readme
:::note

# Hsu.Sg

[![dev](https://github.com/hsu-net/source-generators/actions/workflows/build.yml/badge.svg?branch=dev)](https://github.com/hsu-net/source-generators/actions/workflows/build.yml)
[![preview](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml/badge.svg?branch=preview)](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml)
[![main](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml)
[![nuke build](https://img.shields.io/badge/nuke-build-yellow.svg)](https://github.com/nuke-build/nuke)

.NET source generators

## Package Version

| Name | Source | Stable | Preview |
|---|---|---|---|
| Hsu.Sg.Sync | Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.Sync?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Sync) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.Sync?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Sync) |
| Hsu.Sg.Sync | MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.Sync?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Sync) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.Sync?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Sync) |
| Hsu.Sg.Proxy | Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.Proxy?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Proxy) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.Proxy?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Proxy) |
| Hsu.Sg.Proxy | MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.Proxy?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Proxy) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.Proxy?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Proxy) |
| Hsu.Sg.FluentMember| Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.FluentMember?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.FluentMember) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.FluentMember?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.FluentMember) |
| Hsu.Sg.FluentMember| MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.FluentMember?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.FluentMember) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.FluentMember?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.FluentMember) |

## Package Features

### Hsu.Sg.Sync

Generate a synchronous method from an asynchronous method.

Usages see [README](https://github.com/hsu-net/source-generators/src/Hsu.Sg.Sync/README.md)

### Hsu.Sg.Proxy

Generate a proxy object from a `struct` or `class` or `interface`.

Usages see [README](https://github.com/hsu-net/source-generators/src/Hsu.Sg.Proxy/README.md)

### Hsu.Sg.FluentMember

Generate a fluent method from a `struct` or `class`.

Usages see [README](https://github.com/hsu-net/source-generators/src/Hsu.Sg.FluentMember/README.md)

## References

- [Source Generators Cookbook](https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md)
- [Incremental Generators](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md)

## License

[MIT](https://github.com/hsu-net/source-generators/LICENSE)

:::

### About
:::note

Generate code for async to sync methods


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **HsuSgSync**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Hsu.Sg.Sync" Version="2023.412.21" OutputItemType="Analyzer" >
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HsuSgSync\src\HsuSgSync\Program.cs" label="Program.cs" >

  This is the use of **HsuSgSync** in *Program.cs*

```csharp showLineNumbers 
using HsuSgSync;

var p=new Person();
var result=await p.RunAsync();
Console.WriteLine(result);
result=p.Run();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HsuSgSync\src\HsuSgSync\Person.cs" label="Person.cs" >

  This is the use of **HsuSgSync** in *Person.cs*

```csharp showLineNumbers 
using System.ComponentModel;
using Hsu.Sg.Sync;
namespace HsuSgSync;
[Sync]
internal partial class Person
{   
    public async Task<bool> RunAsync()
    {
        await Task.Delay(1000);
        return true;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HsuSgSync\src\HsuSgSync\obj\GX\Hsu.Sg.Sync\Hsu.Sg.Sync.Generator\Hsu.Sg.Sync.SyncAttribute.g.cs" label="Hsu.Sg.Sync.SyncAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;

namespace Hsu.Sg.Sync
{
    /// <summary>
    /// The flag to generate async method to sync method.
    /// </summary>
    [AttributeUsage(
        System.AttributeTargets.Interface |
        System.AttributeTargets.Struct |
        System.AttributeTargets.Class,
        AllowMultiple = false,
        Inherited = false)]
    internal sealed class SyncAttribute : Attribute
    {
        /// <summary>
        ///     Only <c>interface</c> or <c>abstract</c> async methods are generated.
        /// </summary>
        public bool Definable { get; set; }
        
        /// <summary>
        /// The public async methods are generated.
        /// </summary>
        public bool Public { get; set; } = true;

        /// <summary>
        /// The internal async methods are generated.
        /// </summary>
        public bool Internal { get; set; } = true;

        /// <summary>
        /// The private async methods are generated.
        /// </summary>
        public bool Private { get; set; } = true;

        /// <summary>
        /// Only [SyncGen] async methods are generated.
        /// </summary>
        public bool Only { get; set; } = false;

        /// <summary>
        /// The suffix of sync method name when not end with Async.
        /// </summary>
        /// <remarks>default is `Sync`</remarks>
        public string Suffix { get; set; } = string.Empty;

        /// <summary>
        /// Whether generate attributes.
        /// </summary>
        public bool Attribute { get; set; } = false;

        /// <summary>
        /// To generate with attributes
        /// </summary>
        public string[] AttributeIncludes { get; set; } = null;

        /// <summary>
        /// To generate without attributes
        /// </summary>
        public string[] AttributeExcludes { get; set; } = null;

        public SyncAttribute()
        {
            Public = true;
            Internal = true;
            Private = true;
            Only = false;
            Suffix = string.Empty;
        }
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
    internal sealed class SyncGenAttribute : Attribute
    {
        /// <summary>
        /// Ignore to generate sync methods. 
        /// </summary>
        public bool Ignore { get; set; } = false;
        
        /// <summary>
        /// The specific name of sync method.
        /// </summary>
        public string Identifier { get; set; } = string.Empty;

        /// <summary>
        /// The suffix of sync method name when not end with Async.
        /// </summary>
        /// <remarks>default is `Sync`</remarks>
        public string Suffix { get; set; } = string.Empty;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HsuSgSync\src\HsuSgSync\obj\GX\Hsu.Sg.Sync\Hsu.Sg.Sync.Generator\Hsu.Sg.Sync.SyncHelper.g.cs" label="Hsu.Sg.Sync.SyncHelper.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System;

namespace Hsu.Sg.Sync
{
    internal static partial class SyncHelper
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Run(Task task)
        {
            Nito.AsyncEx.AsyncContext.Run(async () => await task);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static T Run<T>(Task<T> task)
        {
            return Nito.AsyncEx.AsyncContext.Run(async () => await task);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Run(Func<Task> task)
        {
            Nito.AsyncEx.AsyncContext.Run(async () => await task());
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static T Run<T>(Func<Task<T>> task)
        {
            return Nito.AsyncEx.AsyncContext.Run(async () => await task());
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HsuSgSync\src\HsuSgSync\obj\GX\Hsu.Sg.Sync\Hsu.Sg.Sync.Generator\Hsu.Sg.Sync.SyncHelper.ValueTask.g.cs" label="Hsu.Sg.Sync.SyncHelper.ValueTask.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System;

namespace Hsu.Sg.Sync
{
    internal static partial class SyncHelper
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Run(ValueTask task)
        {
            Nito.AsyncEx.AsyncContext.Run(async () => await task);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static T Run<T>(ValueTask<T> task)
        {
            return Nito.AsyncEx.AsyncContext.Run(async () => await task);
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Run(Func<ValueTask> task)
        {
            Nito.AsyncEx.AsyncContext.Run(async () => await task());
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static T Run<T>(Func<ValueTask<T>> task)
        {
            return Nito.AsyncEx.AsyncContext.Run(async () => await task());
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HsuSgSync\src\HsuSgSync\obj\GX\Hsu.Sg.Sync\Hsu.Sg.Sync.Generator\HsuSgSync.Person.sync.g.cs" label="HsuSgSync.Person.sync.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
// Generated 1 sync methods by SyncGenerator
// ValueTaskSupported : True
// DefaultImplementationsOfInterfacesSupported : True
// Metadata { Only = False, Definable = False, Public = True, Internal = True, Private = True, Attribute = False  }

using System.ComponentModel;

namespace HsuSgSync;

internal partial class Person
{
    /// <inheritdoc cref="RunAsync()" />
    /// <remarks></remarks>
    public bool Run() 
    	=> Hsu.Sg.Sync.SyncHelper.Run(() => RunAsync());
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project HsuSgSync ](/sources/HsuSgSync.zip)

:::


### Share HsuSgSync 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsuSgSync&quote=HsuSgSync" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsuSgSync&text=HsuSgSync:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsuSgSync" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsuSgSync&title=HsuSgSync" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsuSgSync&title=HsuSgSync&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHsuSgSync" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/HsuSgSync

### In the same category (EnhancementClass) - 25 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [FastGenericNew](/docs/FastGenericNew)


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


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

