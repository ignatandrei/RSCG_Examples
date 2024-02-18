---
sidebar_position: 880
title: 88 - Com
description: Generating Com Declarations
slug: /Com
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Com  by Microsoft


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/System.Runtime.InteropServices?label=System.Runtime.InteropServices)](https://www.nuget.org/packages/System.Runtime.InteropServices/)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/runtime?label=updated)](https://github.com/dotnet/runtime)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/runtime?style=social)

## Details

### Info
:::info

Name: **Com**

Provides types that support COM interop and platform invoke services.

Commonly Used Types:
System.Runtime.InteropServices.GCHandle
System.Runtime.InteropServices.GuidAttribute
System.Runtime.InteropServices.COMException
System.DllNotFoundException
System.Runtime.InteropServices.DllImportAttribute

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/System.Runtime.InteropServices/*   


You can find more details at https://learn.microsoft.com/en-us/dotnet/standard/native-interop/comwrappers-source-generation

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
  * [Install daily builds](https://github.com/dotnet/runtime/docs/project/dogfooding.md)
  * [Documentation](https://docs.microsoft.com/dotnet/core) (Get Started, Tutorials, Porting from .NET Framework, API reference, ...)
    * [Deploying apps](https://docs.microsoft.com/dotnet/core/deploying)
  * [Supported OS versions](https://github.com/dotnet/core/blob/main/os-lifecycle-policy.md)
* [Roadmap](https://github.com/dotnet/core/blob/main/roadmap.md)
* [Releases](https://github.com/dotnet/core/tree/main/release-notes)

## How can I contribute?

We welcome contributions! Many people all over the world have helped make this project better.

* [Contributing](https://github.com/dotnet/runtime/CONTRIBUTING.md) explains what kinds of contributions we welcome
* [Workflow Instructions](https://github.com/dotnet/runtime/docs/workflow/README.md) explains how to build and test
* [Get Up and Running on .NET Core](https://github.com/dotnet/runtime/docs/project/dogfooding.md) explains how to get nightly builds of the runtime and its libraries to test them in your own projects.

## Reporting security issues and security bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) <secure@microsoft.com>. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/msrc/faqs-report-an-issue). You can also find these instructions in this repo's [Security doc](https://github.com/dotnet/runtime/SECURITY.md).

Also see info about related [Microsoft .NET Core and ASP.NET Core Bug Bounty Program](https://www.microsoft.com/msrc/bounty-dot-net-core).

## Filing issues

This repo should contain issues that are tied to the runtime, the class libraries and frameworks, the installation of the `dotnet` binary (sometimes known as the `muxer`) and the installation of the .NET runtime and libraries.

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

.NET (including the runtime repo) is licensed under the [MIT](https://github.com/dotnet/runtime/LICENSE.TXT) license.


:::

### About
:::note

Generating Com Declarations


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Com**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
	  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
<!--
<PackageReference Include="System.Runtime.InteropServices" />
-->
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\COM\src\ComDemo\Program.cs" label="Program.cs" >

  This is the use of **Com** in *Program.cs*

```csharp showLineNumbers 
using test;

IShellExecute shellExecute = new ShellExecuteClass();

// Open a file using the default associated program
IntPtr result = shellExecute.ShellExecute(
    IntPtr.Zero, // HWND (handle to parent window)
    "open",      // Operation to perform
    "notepad.exe", // File to open (replace with your file or URL)
    "",           // Parameters
    "",           // Working directory
    1            // Show command (SW_SHOWNORMAL)
);

Console.WriteLine($"ShellExecute Result: {result}");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\COM\src\ComDemo\MyShell.cs" label="MyShell.cs" >

  This is the use of **Com** in *MyShell.cs*

```csharp showLineNumbers 
using System;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.Marshalling;

namespace test;

// Import the ShellExecute function from Shell32.dll using ComImport
[ComImport]
[Guid("00000000-0000-0000-C000-000000000046")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public interface IUnknown
{
    void QueryInterface(ref Guid riid, out IntPtr ppvObject);
    void AddRef();
    void Release();
}

//[ComImport]
[GeneratedComInterface(StringMarshalling = StringMarshalling.Utf8)]
[Guid("000214F9-0000-0000-C000-000000000046")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public partial interface IShellExecute
{
    IntPtr ShellExecute(IntPtr hwnd, string lpOperation, string lpFile, string lpParameters, string lpDirectory, int nShowCmd);
}


// Replace this with your actual ShellExecute COM class
public class ShellExecuteClass : IShellExecute
{
    public IntPtr ShellExecute(IntPtr hwnd, string lpOperation, string lpFile, string lpParameters, string lpDirectory, int nShowCmd)
    {
        // Implement the ShellExecute functionality
        return NativeMethods.ShellExecute(hwnd, lpOperation, lpFile, lpParameters, lpDirectory, nShowCmd);
    }
}

// NativeMethods class to import necessary functions from Shell32.dll
static class NativeMethods
{
    [DllImport("shell32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr ShellExecute(
        IntPtr hwnd,
        string lpOperation,
        string lpFile,
        string lpParameters,
        string lpDirectory,
        int nShowCmd
    );
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\COM\src\ComDemo\obj\GX\Microsoft.Interop.ComInterfaceGenerator\Microsoft.Interop.ComInterfaceGenerator\test.IShellExecute.cs" label="test.IShellExecute.cs" >


```csharp showLineNumbers 
// <auto-generated />
#pragma warning disable CS0612, CS0618
file unsafe class InterfaceInformation : global::System.Runtime.InteropServices.Marshalling.IIUnknownInterfaceType
{
    public static global::System.Guid Iid { get; } = new(new global::System.ReadOnlySpan<byte>(new byte[] { 249, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70 }));

    private static void** _vtable;
    public static void** ManagedVirtualMethodTable => _vtable != null ? _vtable : (_vtable = InterfaceImplementation.CreateManagedVirtualFunctionTable());
}

[global::System.Runtime.InteropServices.DynamicInterfaceCastableImplementationAttribute]
file unsafe partial interface InterfaceImplementation : global::test.IShellExecute
{
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Interop.ComInterfaceGenerator", "8.0.9.3103")]
    [global::System.Runtime.CompilerServices.SkipLocalsInitAttribute]
    nint global::test.IShellExecute.ShellExecute(nint hwnd, string lpOperation, string lpFile, string lpParameters, string lpDirectory, int nShowCmd)
    {
        var(__this, __vtable_native) = ((global::System.Runtime.InteropServices.Marshalling.IUnmanagedVirtualMethodTableProvider)this).GetVirtualMethodTableInfoForKey(typeof(global::test.IShellExecute));
        byte* __lpOperation_native = default;
        byte* __lpFile_native = default;
        byte* __lpParameters_native = default;
        byte* __lpDirectory_native = default;
        nint __retVal = default;
        int __invokeRetVal = default;
        // Setup - Perform required setup.
        scoped global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn __lpDirectory_native__marshaller = new();
        scoped global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn __lpParameters_native__marshaller = new();
        scoped global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn __lpFile_native__marshaller = new();
        scoped global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn __lpOperation_native__marshaller = new();
        try
        {
            // Marshal - Convert managed data to native data.
            __lpDirectory_native__marshaller.FromManaged(lpDirectory, stackalloc byte[global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn.BufferSize]);
            __lpParameters_native__marshaller.FromManaged(lpParameters, stackalloc byte[global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn.BufferSize]);
            __lpFile_native__marshaller.FromManaged(lpFile, stackalloc byte[global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn.BufferSize]);
            __lpOperation_native__marshaller.FromManaged(lpOperation, stackalloc byte[global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ManagedToUnmanagedIn.BufferSize]);
            {
                // PinnedMarshal - Convert managed data to native data that requires the managed data to be pinned.
                __lpDirectory_native = __lpDirectory_native__marshaller.ToUnmanaged();
                __lpParameters_native = __lpParameters_native__marshaller.ToUnmanaged();
                __lpFile_native = __lpFile_native__marshaller.ToUnmanaged();
                __lpOperation_native = __lpOperation_native__marshaller.ToUnmanaged();
                __invokeRetVal = ((delegate* unmanaged[MemberFunction]<void*, nint, byte*, byte*, byte*, byte*, int, nint*, int> )__vtable_native[3])(__this, hwnd, __lpOperation_native, __lpFile_native, __lpParameters_native, __lpDirectory_native, nShowCmd, &__retVal);
            }

            // NotifyForSuccessfulInvoke - Keep alive any managed objects that need to stay alive across the call.
            global::System.Runtime.InteropServices.Marshal.ThrowExceptionForHR(__invokeRetVal);
            global::System.GC.KeepAlive(this);
        }
        finally
        {
            // CleanupCallerAllocated - Perform cleanup of caller allocated resources.
            __lpDirectory_native__marshaller.Free();
            __lpParameters_native__marshaller.Free();
            __lpFile_native__marshaller.Free();
            __lpOperation_native__marshaller.Free();
        }

        return __retVal;
    }
}

file unsafe partial interface InterfaceImplementation
{
    [global::System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute(CallConvs = new[] { typeof(global::System.Runtime.CompilerServices.CallConvMemberFunction) })]
    internal static int ABI_ShellExecute(global::System.Runtime.InteropServices.ComWrappers.ComInterfaceDispatch* __this_native, nint hwnd, byte* __lpOperation_native, byte* __lpFile_native, byte* __lpParameters_native, byte* __lpDirectory_native, int nShowCmd, nint* __invokeRetValUnmanaged__param)
    {
        global::test.IShellExecute @this = default;
        string lpOperation = default;
        string lpFile = default;
        string lpParameters = default;
        string lpDirectory = default;
        ref nint __invokeRetValUnmanaged = ref *__invokeRetValUnmanaged__param;
        nint __invokeRetVal = default;
        int __retVal = default;
        try
        {
            // Unmarshal - Convert native data to managed data.
            lpDirectory = global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ConvertToManaged(__lpDirectory_native);
            lpParameters = global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ConvertToManaged(__lpParameters_native);
            lpFile = global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ConvertToManaged(__lpFile_native);
            lpOperation = global::System.Runtime.InteropServices.Marshalling.Utf8StringMarshaller.ConvertToManaged(__lpOperation_native);
            @this = global::System.Runtime.InteropServices.ComWrappers.ComInterfaceDispatch.GetInstance<global::test.IShellExecute>(__this_native);
            __invokeRetVal = @this.ShellExecute(hwnd, lpOperation, lpFile, lpParameters, lpDirectory, nShowCmd);
            // NotifyForSuccessfulInvoke - Keep alive any managed objects that need to stay alive across the call.
            __retVal = 0; // S_OK
            // Marshal - Convert managed data to native data.
            __invokeRetValUnmanaged = __invokeRetVal;
        }
        catch (global::System.Exception __exception)
        {
            __retVal = global::System.Runtime.InteropServices.Marshalling.ExceptionAsHResultMarshaller<int>.ConvertToUnmanaged(__exception);
        }

        return __retVal;
    }
}

file unsafe partial interface InterfaceImplementation
{
    internal static void** CreateManagedVirtualFunctionTable()
    {
        void** vtable = (void**)global::System.Runtime.CompilerServices.RuntimeHelpers.AllocateTypeAssociatedMemory(typeof(global::test.IShellExecute), sizeof(void*) * 4);
        {
            nint v0, v1, v2;
            global::System.Runtime.InteropServices.ComWrappers.GetIUnknownImpl(out v0, out v1, out v2);
            vtable[0] = (void*)v0;
            vtable[1] = (void*)v1;
            vtable[2] = (void*)v2;
        }

        {
            vtable[3] = (void*)(delegate* unmanaged[MemberFunction]<global::System.Runtime.InteropServices.ComWrappers.ComInterfaceDispatch*, nint, byte*, byte*, byte*, byte*, int, nint*, int> )&ABI_ShellExecute;
        }

        return vtable;
    }
}

namespace test
{
    [global::System.Runtime.InteropServices.Marshalling.IUnknownDerivedAttribute<InterfaceInformation, InterfaceImplementation>]
    public partial interface IShellExecute
    {
    }
}

namespace test
{
    public partial interface IShellExecute
    {
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Com ](/sources/Com.zip)

:::


### Share Com 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCom&quote=Com" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCom&text=Com:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCom" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCom&title=Com" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCom&title=Com&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCom" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Com

## In the same category (EnhancementProject)


### [BuildInfo](/docs/BuildInfo)


### [CommandLine](/docs/CommandLine)


### [DeeDee](/docs/DeeDee)


### [Mediator](/docs/Mediator)


### [PlantUmlClassDiagramGenerator](/docs/PlantUmlClassDiagramGenerator)


### [RSCG_AMS](/docs/RSCG_AMS)


### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)


### [ThisAssembly](/docs/ThisAssembly)

