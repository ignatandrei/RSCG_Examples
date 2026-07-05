---
sidebar_position: 2740
title: 274 - Dirge
description: 
slug: /Dirge
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDisposer.mdx';

# Dirge  by Kazuki Kohzuki


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Dirge?label=Dirge)](https://www.nuget.org/packages/Dirge/)
[![GitHub last commit](https://img.shields.io/github/last-commit/IkuzakIkuzok/Dirge?label=updated)](https://github.com/IkuzakIkuzok/Dirge)
![GitHub Repo stars](https://img.shields.io/github/stars/IkuzakIkuzok/Dirge?style=social)

## Details

### Info
:::info

Name: **Dirge**

Disposable Implementation Roslyn Generator Extension

Author: Kazuki Kohzuki

NuGet: 
*https://www.nuget.org/packages/Dirge/*   


You can find more details at https://github.com/IkuzakIkuzok/Dirge

Source: https://github.com/IkuzakIkuzok/Dirge

:::

### Author
:::note
Kazuki Kohzuki 
![Alt text](https://github.com/IkuzakIkuzok.png)
:::

## Original Readme
:::note


### Dirge

[![Test](https://github.com/IkuzakIkuzok/Dirge/actions/workflows/Test.yml/badge.svg)](https://github.com/IkuzakIkuzok/Dirge/actions/workflows/Test.yml)
[![Version](https://img.shields.io/nuget/v/Dirge?styles=flat)](https://www.nuget.org/packages/Dirge/#versions-body-tab)
[![Download](https://img.shields.io/nuget/dt/Dirge?styles=flat)](https://www.nuget.org/packages/Dirge/#versions-body-tab)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/IkuzakIkuzok/Dirge/blob/main/LICENSE)

Disposable Implementation Roslyn Generator Extension
###### Installation

You can install the EnumSerializer from [NuGet](https://www.nuget.org/packages/Dirge/).

###### Usage

Mark a class with the `[AutoDispose]` attribute and implement the `IDisposable` interface.
The generator will automatically generate the implementation of the `Dispose` method for you.

```C#
using Dirge;

namespace Test;

[AutoDispose]
internal partial class TestClass
{
    private readonly Stream _stream = new MemoryStream();
}
```

The generated code will look like this:
```C#
namespace Test;

partial class TestClass : IDisposable
{
    private bool __generated_disposed = false;

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (this.__generated_disposed) return;

        try
        {
            if (disposing)
            {
                this._stream?.Dispose();
            }
        }
        finally
        {
            this.__generated_disposed = true;
        }
    }
}
```

Note that this example is simplified for demonstration purposes.

To suppress the auto-generated Dispose call for a specific field, you can use the `[DoNotDispose]` attribute:
```C#
using Dirge;

namespace Test;

[AutoDispose]
internal partial class TestClass
{
    private readonly Stream _stream1 = new MemoryStream();

    [DoNotDispose]
    private readonly Stream _stream2 = new MemoryStream(); // This field will not be disposed by the generated Dispose method.
}
```

Ref-struct is also supported, but `IDisposable` will not be implemented regardless of the language version.

######### Conditional disposal

Conditional disposal, which allows you to specify conditions under which a field should be disposed, is also supported.
You can use the `[DoNotDisposeWhen]` attribute with a boolean field and a value to compare against:
```C#
using Dirge;

namespace Test;

[AutoDispose]
internal partial class TestClass
{
    private readonly bool _leaveOpen;

    [DoNotDisposeWhen(nameof(_leaveOpen), true)]
    private readonly Stream _stream;

    internal TestClass(Stream stream, bool leaveOpen)
    {
        this._stream = stream;
        this._leaveOpen = leaveOpen;
    }
}
```

This will prevent the generator from disposing the `_stream` field when the `_leaveOpen` field is `true`:
```C#
namespace Test;

partial class TestClass : IDisposable
{
    private bool __generated_disposed = false;

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (this.__generated_disposed) return;

        try
        {
            if (disposing)
            {
                if (!this._leaveOpen)
                {
                    this._stream?.Dispose();
                }
            }
        }
        finally
        {
            this.__generated_disposed = true;
        }
    }
}
```

######### Unmanaged resources

To safely release unmanaged resources, this generator also supports the implementation of a finalizer.
You can specify a method to release unmanaged resources through the `ReleaseUnmanagedResources` option:
```C#
using Dirge;
using System.IO;
        
namespace Test;
        
[AutoDispose(ReleaseUnmanagedResources = nameof(ReleaseUnmanagedResources))]
internal sealed partial class TestClass
{
    private readonly Stream _stream;

    internal void ReleaseUnmanagedResources()
    {
        // Custom logic to release unmanaged resources
    }
}
```

This will generate a finalizer that calls the specified method to release unmanaged resources:
```C#
namespace Test;

sealed partial class TestClass : IDisposable
{
    private bool __generated_disposed = false;

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }

    private void Dispose(bool disposing)
    {
        if (this.__generated_disposed) return;

        try
        {
            if (disposing)
            {
                this._stream?.Dispose();
            }

            ReleaseUnmanagedResources();
        }
        finally
        {
            this.__generated_disposed = true;
        }
    }

    ~TestClass()
    {
        Dispose(false);
    }
}
```

###### Constraints

To generate the `Dispose` method, the class (or struct) must meet the following constraints:
- It must be a non-static class.
- It must be a partial class or struct.
- It must not be a readonly struct.

For conditional disposal, the field specified in the `nameof` expression must be a boolean field.
Properties and methods are not supported for the current version.


:::

### About
:::note







Dirge is a Roslyn-based code generator that automatically implements the `IDisposable` pattern for C# classes.





Key Features:





1. AutoDispose Attribute: Mark any partial class with `[AutoDispose]` to automatically generate `Dispose()` and `Dispose(bool)` methods.





2. Automatic Field Disposal: The generator detects all disposable fields and automatically calls `.Dispose()` on them in the correct order.





:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Dirge**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	 <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>
	 <ItemGroup>
	   <PackageReference Include="Dirge" Version="3.0.0">
	     <PrivateAssets>all</PrivateAssets>
	     <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	   </PackageReference>
	 </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\Program.cs" label="Program.cs" >

  This is the use of **Dirge** in *Program.cs*

```csharp showLineNumbers 
using IDisposableGeneratorDemo;
//https://github.com/benutomo-dev/RoslynComponents
using (var db = new DALDB())
{
    Console.WriteLine("before releasing");
}
Console.WriteLine("after releasing");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\DALDB.cs" label="DALDB.cs" >

  This is the use of **Dirge** in *DALDB.cs*

```csharp showLineNumbers 
namespace IDisposableGeneratorDemo;

[Dirge.AutoDispose]
partial class DALDB 
{
    private ConnectionDB cn;
    private ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

  This is the use of **Dirge** in *ConnectionDB.cs*

```csharp showLineNumbers 
namespace IDisposableGeneratorDemo;

class ConnectionDB : IDisposable
{
    static int count = 0;
    public ConnectionDB()
    {
        Interlocked.Increment(ref count);
    }
    public void Dispose()
    {
        Console.WriteLine($"disposing connectiondb {Interlocked.Decrement(ref count)}");
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\obj\GX\Dirge\Dirge.Generators.DisposeGenerator\DALDB.GeneratedDispose.g.cs" label="DALDB.GeneratedDispose.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>

#pragma warning disable CS0282

namespace IDisposableGeneratorDemo
{
    partial class DALDB : global::System.IDisposable
    {
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Diagnostics.DebuggerBrowsable(global::System.Diagnostics.DebuggerBrowsableState.Never)]
        [global::System.Runtime.CompilerServices.CompilerGenerated]
        private bool __generated_disposed = false;

        public void Dispose()
        {
            Dispose(true);
            global::System.GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (this.__generated_disposed) return;

            try
            {
                if (disposing)
                {
                    this.cn?.Dispose();
                    this.cn1?.Dispose();
                }
            }
            finally
            {
                this.__generated_disposed = true;
            }
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\obj\GX\Dirge\Dirge.Generators.TypesGenerator\AutoDisposeAttribute.g.cs" label="AutoDisposeAttribute.g.cs" >
```csharp showLineNumbers 
// <auto-generated />

#nullable enable

namespace Dirge
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct, Inherited = false, AllowMultiple = false)]
    internal sealed class AutoDisposeAttribute : global::System.Attribute
    {
        public string? ReleaseUnmanagedResources \{ get; set; \} = null;

        internal AutoDisposeAttribute() \{ }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\obj\GX\Dirge\Dirge.Generators.TypesGenerator\DoNotDisposeAttribute.g.cs" label="DoNotDisposeAttribute.g.cs" >
```csharp showLineNumbers 
// <auto-generated />

namespace Dirge
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Field, Inherited = false, AllowMultiple = false)]
    internal sealed class DoNotDisposeAttribute : global::System.Attribute
    {
        internal DoNotDisposeAttribute() \{ }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Dirge\src\IDisp\obj\GX\Dirge\Dirge.Generators.TypesGenerator\DoNotDisposeWhenAttribute.g.cs" label="DoNotDisposeWhenAttribute.g.cs" >
```csharp showLineNumbers 
// <auto-generated />

namespace Dirge
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Field, Inherited = false, AllowMultiple = false)]
    internal sealed class DoNotDisposeWhenAttribute : global::System.Attribute
    {
        internal string FlagName \{ get; }

        internal bool FlagCondition \{ get; }

        internal DoNotDisposeWhenAttribute(string flagName, bool flagCondition)
        {
            this.FlagName = flagName;
            this.FlagCondition = flagCondition;
        }
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Dirge ](/sources/Dirge.zip)

:::


### Share Dirge 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDirge&quote=Dirge" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDirge&text=Dirge:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDirge" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDirge&title=Dirge" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDirge&title=Dirge&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDirge" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Dirge

<SameCategory />

