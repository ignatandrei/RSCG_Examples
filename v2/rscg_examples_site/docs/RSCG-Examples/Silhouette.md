---
sidebar_position: 2490
title: 249 - Silhouette
description: Profiling .net applications
slug: /Silhouette
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveProfiler.mdx';

# Silhouette  by Kevin Gosse


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Silhouette?label=Silhouette)](https://www.nuget.org/packages/Silhouette/)
[![GitHub last commit](https://img.shields.io/github/last-commit/kevingosse/Silhouette?label=updated)](https://github.com/kevingosse/Silhouette)
![GitHub Repo stars](https://img.shields.io/github/stars/kevingosse/Silhouette?style=social)

## Details

### Info
:::info

Name: **Silhouette**

A library to build .NET profilers in .NET. No need for C++ anymore, just C#.

Author: Kevin Gosse

NuGet: 
*https://www.nuget.org/packages/Silhouette/*   


You can find more details at https://github.com/kevingosse/Silhouette

Source: https://github.com/kevingosse/Silhouette

:::

### Author
:::note
Kevin Gosse 
![Alt text](https://github.com/kevingosse.png)
:::

### Original Readme
:::note

Silhouette - A library to build .NET profilers in .NET
=======================

# Quick start

Create a new C# NativeAOT project. Reference the Silhouette nuget package and add a class inheriting from `Silhouette.CorProfilerCallback11Base` (you can use a different version of `CorProfilerCallbackBase` depending on the version of .NET you're targeting). Override the `Initialize` method. It will be called with the highest version number of `ICorProfilerInfo` supported by the target runtime.

```csharp

using Silhouette;

[Profiler("0A96F866-D763-4099-8E4E-ED1801BE9FBC")] // Use your own profiler GUID here
internal partial class CorProfilerCallback : CorProfilerCallback11Base
{
    protected override HResult Initialize(int iCorProfilerInfoVersion)
    {
        if (iCorProfilerInfoVersion < 11)
        {
            return HResult.E_FAIL;
        }

        var result = ICorProfilerInfo11.SetEventMask(COR_PRF_MONITOR.COR_PRF_ENABLE_STACK_SNAPSHOT | COR_PRF_MONITOR.COR_PRF_MONITOR_THREADS);

        return result;
    }
}
```

The `Profiler` attribute triggers a source-generator that emits the proper `DllGetClassObject` function and validates that the user is using the matching guid for the profiler. Alternatively, you can manually implement a `DllGetClassObject` method that will be called by the .NET runtime when initializing the profiler. Use the built-in `ClassFactory` implementation and give it an instance of your `CorProfiler` class.

```csharp
using Silhouette;
using System.Runtime.InteropServices;

internal class DllMain
{
     // This code is automatically generated when using the `[Profiler]` attribute on `CorProfilerCallback`
    [UnmanagedCallersOnly(EntryPoint = "DllGetClassObject")]
    public static unsafe HResult DllGetClassObject(Guid* rclsid, Guid* riid, nint* ppv)
    {
        // Use your own profiler GUID here
        if (*rclsid != new Guid("0A96F866-D763-4099-8E4E-ED1801BE9FBC"))
        {
            return HResult.CORPROF_E_PROFILER_CANCEL_ACTIVATION;
        }

        *ppv = ClassFactory.For(new CorProfilerBase());

        return HResult.S_OK;
    }
}
```

`CorProfilerXxBase` offers base virtual methods for all `ICorProfilerCallback` methods, so override the ones you're interested in:

```csharp
    protected override HResult ThreadCreated(ThreadId threadId)
    {
        Console.WriteLine($"Thread created: {threadId.Value}");
        return HResult.S_OK;
    }
```

Use the `ICorProfilerInfoXx` fields to access the `ICorProfilerInfo` APIs:

```csharp
    private unsafe string ResolveMethodName(nint ip)
    {
        try
        {
            var functionId = ICorProfilerInfo11.GetFunctionFromIP(ip).ThrowIfFailed();
            var functionInfo = ICorProfilerInfo2.GetFunctionInfo(functionId).ThrowIfFailed();
            using var metaDataImport = ICorProfilerInfo2.GetModuleMetaDataImport(functionInfo.ModuleId, CorOpenFlags.ofRead).ThrowIfFailed().Wrap();
            var methodProperties = metaDataImport.Value.GetMethodProps(new MdMethodDef(functionInfo.Token)).ThrowIfFailed();
            var typeDefProps = metaDataImport.Value.GetTypeDefProps(methodProperties.Class).ThrowIfFailed();

            return $"{typeDefProps.TypeName}.{methodProperties.Name}";
        }
        catch (Win32Exception)
        {
            return "<unknown>";
        }
    }
```

Most methods return an instance of `HResult<T>`. You can deconstruct it into a `(HResult error, T result)` and manually check the error code. You can also use the `ThrowIfFailed()` method that will return only the result and throw a `Win32Exception` if the error code is not `S_OK`.


:::

### About
:::note

Profiling .net applications


Measuring performance improvements


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Silhouette**
```xml showLineNumbers {13}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
	  <PublishAot>true</PublishAot>
	  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Silhouette" Version="3.2.0" />
  </ItemGroup>
	
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Silhouette\src\ProfilerDemo\Program.cs" label="Program.cs" >

  This is the use of **Silhouette** in *Program.cs*

```csharp showLineNumbers 
// See https://andrewlock.net/creating-a-dotnet-profiler-using-csharp-with-silhouette/
Console.WriteLine("Please read https://andrewlock.net/creating-a-dotnet-profiler-using-csharp-with-silhouette/");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Silhouette\src\ProfilerDemo\MyProfiler.cs" label="MyProfiler.cs" >

  This is the use of **Silhouette** in *MyProfiler.cs*

```csharp showLineNumbers 
using Silhouette;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace ProfilerDemo;

[Profiler("8AD62131-BF21-47C1-A4D4-3AEF5D7C75C6")]
internal class MyProfiler : CorProfilerCallback5Base
{
    protected override HResult Initialize(int iCorProfilerInfoVersion)
    {
        Console.WriteLine("[SilhouetteProf] Initialize");
        if (iCorProfilerInfoVersion < 5)
        {
            // we need at least ICorProfilerInfo5 and we got < 5
            return HResult.E_FAIL;
        }

        // Call SetEventMask to tell the .NET runtime which events we're interested in
        return ICorProfilerInfo5.SetEventMask(COR_PRF_MONITOR.COR_PRF_MONITOR_ALL);
    }
    protected override HResult ClassLoadStarted(ClassId classId)
    {
        try
        {
            ClassIdInfo classIdInfo = ICorProfilerInfo.GetClassIdInfo(classId).ThrowIfFailed();

            using ComPtr<IMetaDataImport>? metaDataImport = ICorProfilerInfo2
                                                                .GetModuleMetaDataImport(classIdInfo.ModuleId, CorOpenFlags.ofRead)
                                                                .ThrowIfFailed()
                                                                .Wrap();
            TypeDefPropsWithName classProps = metaDataImport.Value.GetTypeDefProps(classIdInfo.TypeDef).ThrowIfFailed();

            Console.WriteLine($"[SilhouetteProf] ClassLoadStarted: {classProps.TypeName}");
            return HResult.S_OK;
        }
        catch (Win32Exception ex)
        {
            Console.WriteLine($"[SilhouetteProf] ClassLoadStarted failed: {ex}");
            return ex.NativeErrorCode;
        }

    }
    protected override HResult Shutdown()
    {
        Console.WriteLine("[SilhouetteProf] Shutdown");
        return HResult.S_OK;
    }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Silhouette\src\ProfilerDemo\obj\GX\Silhouette.SourceGenerator\Silhouette.SourceGenerator.ProfilerAttributeSourceGenerator\silhouette.dllmain.g.cs" label="silhouette.dllmain.g.cs" >
```csharp showLineNumbers 
namespace Silhouette._Generated
{
    using System;
    using System.Runtime.InteropServices;

    file static class DllMain
    {
        [UnmanagedCallersOnly(EntryPoint = "DllGetClassObject")]
        public static unsafe HResult DllGetClassObject(Guid* rclsid, Guid* riid, nint* ppv)
        {
            if (*rclsid != new Guid("8ad62131-bf21-47c1-a4d4-3aef5d7c75c6"))
            {
                return HResult.CORPROF_E_PROFILER_CANCEL_ACTIVATION;
            }

            *ppv = ClassFactory.For(new global::ProfilerDemo.MyProfiler());
            return HResult.S_OK;
        }
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Silhouette ](/sources/Silhouette.zip)

:::


### Share Silhouette 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSilhouette&quote=Silhouette" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSilhouette&text=Silhouette:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSilhouette" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSilhouette&title=Silhouette" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSilhouette&title=Silhouette&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSilhouette" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Silhouette

<SameCategory />

