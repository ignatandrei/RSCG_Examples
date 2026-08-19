---
sidebar_position: 2790
title: 279 - ReflectionIT.DisposeGenerator
description: Automatically implements the IDisposable pattern for classes that contain disposable fields.
slug: /ReflectionIT.DisposeGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDisposer.mdx';

# ReflectionIT.DisposeGenerator  by Fons Sonnemans


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ReflectionIT.DisposeGenerator?label=ReflectionIT.DisposeGenerator)](https://www.nuget.org/packages/ReflectionIT.DisposeGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/sonnemaf/ReflectionIT.DisposeGenerator?label=updated)](https://github.com/sonnemaf/ReflectionIT.DisposeGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/sonnemaf/ReflectionIT.DisposeGenerator?style=social)

## Details

### Info
:::info

Name: **ReflectionIT.DisposeGenerator**

Package Description

Author: Fons Sonnemans

NuGet: 
*https://www.nuget.org/packages/ReflectionIT.DisposeGenerator/*   


You can find more details at https://github.com/sonnemaf/ReflectionIT.DisposeGenerator

Source: https://github.com/sonnemaf/ReflectionIT.DisposeGenerator

:::

### Author
:::note
Fons Sonnemans 
![Alt text](https://github.com/sonnemaf.png)
:::

## Original Readme
:::note

# ReflectionIT.DisposeGenerator

A source generator package that implements the dispose and async dispose patterns.

- https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/dispose-pattern
- https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
- https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-disposeasync

## NuGet package

| Package | Version |
| ------ | ------ |
| ReflectionIT.DisposeGenerator | [![NuGet](https://img.shields.io/nuget/v/ReflectionIT.DisposeGenerator)](https://www.nuget.org/packages/ReflectionIT.DisposeGenerator/) |

## Installation

```xml
<PackageReference Include="ReflectionIT.DisposeGenerator" Version="*" />
```

## Quick start

Annotate a **partial** class or struct with the `Disposable` attribute and mark disposable fields or properties with `Dispose`.

```cs
using System;
using System.IO;
using ReflectionIT.DisposeGenerator.Attributes;

[Disposable]
public partial class LogWriter : IDisposable {

    [Dispose]
    private readonly StreamWriter _streamWriter;

    public LogWriter(string path) => _streamWriter = new StreamWriter(path);

    public void WriteLine(string text) {
        ThrowIfDisposed();
        _streamWriter.WriteLine($"{DateTime.Now}\t{text}");
    }
}
```

The generator creates the dispose members for the annotated type, including `_isDisposed`, an `IsDisposed` property, and `ThrowIfDisposed()` by default.

## Requirements and diagnostics

- The annotated type must be `partial`.
- `[Disposable]` can be applied to classes and structs.
- `[Dispose]` and `[AsyncDispose]` can be applied to fields and properties.
- The generator emits `RITDG001` when a type annotated with `[Disposable]` is not declared `partial`.
- Members annotated with `[Dispose]` or `[AsyncDispose]` must support the generated dispose call pattern. Otherwise the generated code can produce compiler errors.

### RITDG001

`RITDG001`: Type `'{typeName}'` is annotated with `[Disposable]` and must be declared partial for ReflectionIT.DisposeGenerator to generate code.

## Attribute reference

### `DisposableAttribute`

| Property | Default | Description |
| --- | --- | --- |
| `OverrideDispose` | `false` | Generates `Dispose(bool)` as an override instead of generating a public `Dispose()` method. |
| `OverrideDisposeAsyncCore` | `false` | Generates `DisposeAsyncCore()` as an override instead of generating a public `DisposeAsync()` method. |
| `GenerateThrowIfDisposed` | `true` | Generates `ThrowIfDisposed()` for guarding public instance members. |
| `ExplicitInterfaceImplementation` | `false` | Generates explicit `IDisposable.Dispose()` and `IAsyncDisposable.DisposeAsync()` implementations when applicable. |
| `IsThreadSafe` | `false` | Uses thread-safe disposal state transitions via `Interlocked.CompareExchange`. |
| `HasUnmanagedResources` | `false` | Adds a finalizer and `ReleaseUnmanagedResources()` partial method support. |

### `DisposeAttribute`

| Property | Default | Description |
| --- | --- | --- |
| `SetToNull` | `false` | Sets the annotated field or property to `null` after disposal. |

### `AsyncDisposeAttribute`

| Property | Default | Description |
| --- | --- | --- |
| `SetToNull` | `false` | Sets the annotated field or property to `null` after asynchronous disposal. |
| `ConfigureAwait` | `true` | Controls the `ConfigureAwait(...)` value used for generated async disposal calls. |

## What gets generated

Depending on the options and the annotated members, the generator can create:

- `Dispose()`
- `Dispose(bool)`
- `DisposeAsync()`
- `DisposeAsyncCore()`
- `IsDisposed`
- `ThrowIfDisposed()`
- `_isDisposed`
- a finalizer
- `ReleaseUnmanagedResources()`

## Recommended use of `ThrowIfDisposed`

Call `ThrowIfDisposed()` at the start of public instance members that depend on resources managed by the generated dispose pattern. The generated method uses the generated `IsDisposed` property, so derived types can customize disposed-state checks through `IsDisposed` instead of overriding `ThrowIfDisposed()`.

```cs
using ReflectionIT.DisposeGenerator.Attributes;

[Disposable]
public partial class LogWriter : IDisposable {

    [Dispose]
    private readonly StreamWriter _streamWriter;

    public LogWriter(string path) => _streamWriter = new StreamWriter(path);

    public void WriteLine(string text) {
        ThrowIfDisposed();
        _streamWriter.WriteLine($"{DateTime.Now}\t{text}");
    }
}
```

This helps fail fast with an `ObjectDisposedException` when the instance is used after it has been disposed.

## `SetToNull` usage

Use `SetToNull` when the property or field should be set to `null` after disposal.

```cs
using ReflectionIT.DisposeGenerator.Attributes;

[Disposable]
public partial class LogWriter : IDisposable {

    [Dispose(SetToNull = true)]
    private StreamWriter StreamWriter \{ get; set; }

    public LogWriter(string path) => StreamWriter = new StreamWriter(path);

    public void WriteLine(string text) {
        ThrowIfDisposed();
        StreamWriter.WriteLine($"{DateTime.Now}\t{text}");
    }
}
```

This generates the following partial class, which disposes the `StreamWriter` property and sets it to `null`.

```cs
partial class LogWriter
{
    /// <summary>
    /// Releases all resources used by the current instance.
    /// </summary>
    public void Dispose() {
        Dispose(disposing: true);
        global::System.GC.SuppressFinalize(this);
    }

    /// <summary>
    /// Tracks whether the current instance has been disposed. This field must not be modified manually.
    /// </summary>
    private bool _isDisposed;

    /// <summary>
    /// Gets a value indicating whether the current instance has been disposed.
    /// </summary>
    protected virtual bool IsDisposed => _isDisposed;

    /// <summary>
    /// Throws an exception if the current instance has been disposed.
    /// </summary>
    protected void ThrowIfDisposed() {
        if (IsDisposed) {
            throw new global::System.ObjectDisposedException(nameof(LogWriter));
        }
    }

    /// <summary>
    /// Releases the unmanaged resources used by the current instance and optionally releases the managed resources.
    /// </summary>
    /// <param name="disposing">"true" to release managed resources; otherwise, "false".</param>
    protected virtual void Dispose(bool disposing) {
        if (_isDisposed) {
            return;
        }
        _isDisposed = true;
        if (disposing) {
            this.StreamWriter?.Dispose();
        }
        StreamWriter = null;
    }

}
```

## Async dispose

Use `AsyncDispose` for fields or properties that support `DisposeAsync()`.

```cs
using System;
using System.IO;
using ReflectionIT.DisposeGenerator.Attributes;

[Disposable]
public partial class LogWriter : IAsyncDisposable {

    [AsyncDispose]
    private readonly StreamWriter _streamWriter;

    public LogWriter(string path) => _streamWriter = new StreamWriter(path);
}
```

This generates `DisposeAsync()` and `DisposeAsyncCore()`. If the same member also has `[Dispose]`, the generator supports both sync and async cleanup patterns.

```cs
partial class LogWriter
{
    /// <summary>
    /// Asynchronously releases all resources used by the current instance.
    /// </summary>
    /// <returns>
    /// A task that represents the asynchronous dispose operation.
    /// </returns>
    public async global::System.Threading.Tasks.ValueTask DisposeAsync() {
        await DisposeAsyncCore().ConfigureAwait(false);
        global::System.GC.SuppressFinalize(this);
    }

    /// <summary>
    /// Tracks whether the current instance has been disposed. This field must not be modified manually.
    /// </summary>
    private bool _isDisposed;

    /// <summary>
    /// Gets a value indicating whether the current instance has been disposed.
    /// </summary>
    protected virtual bool IsDisposed => _isDisposed;

    /// <summary>
    /// Throws an exception if the current instance has been disposed.
    /// </summary>
    protected void ThrowIfDisposed() {
        if (IsDisposed) {
            throw new global::System.ObjectDisposedException(nameof(LogWriter));
        }
    }

    /// <summary>
    /// Asynchronously releases the resources used by the current instance.
    /// </summary>
    /// <returns>
    /// A task that represents the asynchronous dispose operation.
    /// </returns>
    protected virtual async global::System.Threading.Tasks.ValueTask DisposeAsyncCore() {
        if (_isDisposed) {
            return;
        }
        _isDisposed = true;
        if (this._streamWriter != null) {
            await this._streamWriter.DisposeAsync().ConfigureAwait(false);
        }
    }

}
```

## Implement the dispose pattern for a derived class

A class derived from a class that already implements `IDisposable` should not implement `IDisposable` again, because the base implementation of `IDisposable.Dispose` is inherited by derived classes.

Set `OverrideDispose = true` for the derived partial class. In that case, the public parameterless `Dispose()` method is not generated, and the protected `Dispose(bool)` method is generated as an override instead.

```cs
[Disposable(OverrideDispose = true)]
public partial class SecondLogWriter : LogWriter {

    [Dispose]
    private StreamWriter SecondStreamWriter \{ get; }

    public SecondLogWriter(string path) : base(path) => SecondStreamWriter = new StreamWriter(path + "2");

    public override void WriteLine(string text) {
        base.WriteLine(text);
        SecondStreamWriter.WriteLine($"{DateTime.Now}\t{text.ToUpper()}");
    }
}
```

This generates the following partial class, which disposes the `SecondStreamWriter` property.

```cs
partial class SecondLogWriter
{
    /// <summary>
    /// Tracks whether the current instance has been disposed. This field must not be modified manually.
    /// </summary>
    private bool _isDisposed;

    /// <summary>
    /// Gets a value indicating whether the current instance has been disposed.
    /// </summary>
    protected override bool IsDisposed => _isDisposed || base.IsDisposed;

    /// <summary>
    /// Throws an exception if the current instance has been disposed.
    /// </summary>
    protected void ThrowIfDisposed() {
        if (IsDisposed) {
            throw new global::System.ObjectDisposedException(nameof(SecondLogWriter));
        }
    }

    /// <summary>
    /// Releases the unmanaged resources used by the current instance and optionally releases the managed resources.
    /// </summary>
    /// <param name="disposing">"true" to release managed resources; otherwise, "false".</param>
    protected override void Dispose(bool disposing) {
        if (_isDisposed) {
            return;
        }
        _isDisposed = true;
        if (disposing) {
            this.SecondStreamWriter?.Dispose();
        }
        base.Dispose(disposing);
    }

}
```

## Unmanaged resources

Set `HasUnmanagedResources = true` to include unmanaged resource cleanup support.
Then implement the partial method `ReleaseUnmanagedResources()`, which releases the unmanaged resource.

If you need to work with unmanaged resources, it is strongly recommended to wrap the unmanaged `IntPtr` handle in a [SafeHandle](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose#safe-handles).

```cs
[Disposable(HasUnmanagedResources = true)]
public partial class LogWriterWithAnExtraIntPtr : IDisposable {

    private readonly IntPtr _pointer;

    [Dispose]
    private StreamWriter StreamWriter \{ get; }

    public LogWriterWithAnExtraIntPtr(string path) {
        StreamWriter = new StreamWriter(path);
        _pointer = Marshal.AllocHGlobal(cb: 128);
    }

    public void WriteLine(string text) => StreamWriter.WriteLine($"{DateTime.Now}\t{text}");

    protected virtual partial void ReleaseUnmanagedResources() => Marshal.FreeHGlobal(_pointer);
}
```

This generates the following partial class with a finalizer and a partial method named `ReleaseUnmanagedResources()` that you must implement.

```cs
partial class LogWriterWithAnExtraIntPtr
{
    /// <summary>
    /// Releases all resources used by the current instance.
    /// </summary>
    public void Dispose() {
        Dispose(disposing: true);
        global::System.GC.SuppressFinalize(this);
    }

    /// <summary>
    /// Releases unmanaged resources held by the current instance.
    /// </summary>
    ~LogWriterWithAnExtraIntPtr() {
        Dispose(disposing: false);
    }

    /// <summary>
    /// Releases unmanaged resources held by the current instance.
    /// </summary>
    protected virtual partial void ReleaseUnmanagedResources();

    /// <summary>
    /// Tracks whether the current instance has been disposed. This field must not be modified manually.
    /// </summary>
    private bool _isDisposed;

    /// <summary>
    /// Gets a value indicating whether the current instance has been disposed.
    /// </summary>
    protected virtual bool IsDisposed => _isDisposed;

    /// <summary>
    /// Throws an exception if the current instance has been disposed.
    /// </summary>
    protected void ThrowIfDisposed() {
        if (IsDisposed) {
            throw new global::System.ObjectDisposedException(nameof(LogWriterWithAnExtraIntPtr));
        }
    }

    /// <summary>
    /// Releases the unmanaged resources used by the current instance and optionally releases the managed resources.
    /// </summary>
    /// <param name="disposing">"true" to release managed resources; otherwise, "false".</param>
    protected virtual void Dispose(bool disposing) {
        if (_isDisposed) {
            return;
        }
        _isDisposed = true;
        if (disposing) {
            this.StreamWriter?.Dispose();
        }
        ReleaseUnmanagedResources();
    }

}
```

## Thread-safe disposal

Use `IsThreadSafe = true` to ensure thread-safe disposal via `Interlocked.CompareExchange`.

```cs
[Disposable(IsThreadSafe = true)]
public partial class LogWriter : IDisposable {

    [Dispose]
    private readonly StreamWriter _streamWriter;

    public LogWriter(string path) => _streamWriter = new StreamWriter(path);

    public void WriteLine(string text) => _streamWriter.WriteLine($"{DateTime.Now}\t{text}");
}
```

This generates the following partial class, which uses `Interlocked.CompareExchange` to ensure thread-safe disposal.

```cs
partial class LogWriter
{
    /// <summary>
    /// Releases all resources used by the current instance.
    /// </summary>
    public void Dispose() {
        Dispose(disposing: true);
        global::System.GC.SuppressFinalize(this);
    }

    /// <summary>
    /// Detects redundant Dispose() calls in a thread-safe manner. _isDisposed == 0 means Dispose(bool) has not been called yet, and _isDisposed == 1 means Dispose(bool) has already been called. This field must not be modified manually.
    /// </summary>
    private int _isDisposed;

    /// <summary>
    /// Gets a value indicating whether the current instance has been disposed.
    /// </summary>
    protected virtual bool IsDisposed => _isDisposed != 0;

    /// <summary>
    /// Throws an exception if the current instance has been disposed.
    /// </summary>
    protected void ThrowIfDisposed() {
        if (IsDisposed) {
            throw new global::System.ObjectDisposedException(nameof(LogWriter));
        }
    }

    /// <summary>
    /// Releases the unmanaged resources used by the current instance and optionally releases the managed resources.
    /// </summary>
    /// <param name="disposing">"true" to release managed resources; otherwise, "false".</param>
    protected virtual void Dispose(bool disposing) {
        if (global::System.Threading.Interlocked.CompareExchange(ref _isDisposed, 1, 0) != 0) {
            return;
        }
        if (disposing) {
            this._streamWriter?.Dispose();
        }
    }

}
```

## Troubleshooting

### Why do I get `RITDG001`?

The type marked with `[Disposable]` is not declared `partial`. Add the `partial` keyword to the class or struct declaration.

### Why do I get compiler errors for `Dispose()` or `DisposeAsync()` on an annotated member?

The generator emits calls to `Dispose()` for `[Dispose]` members and `DisposeAsync()` for `[AsyncDispose]` members. Make sure the annotated member supports the corresponding API.

### Why was no code generated?

Common reasons:

- the type is not `partial`
- no fields or properties were annotated with `[Dispose]` or `[AsyncDispose]`
- the type only has invalid attribute usage that prevents successful compilation

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.


:::

### About
:::note

Automatically implements the IDisposable pattern for classes that contain disposable fields.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ReflectionIT.DisposeGenerator**
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
	   <PackageReference Include="ReflectionIT.DisposeGenerator" Version="0.4.2-preview" />
	 </ItemGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ReflectionIT.DisposeGenerator\src\IDisp\Program.cs" label="Program.cs" >

  This is the use of **ReflectionIT.DisposeGenerator** in *Program.cs*

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ReflectionIT.DisposeGenerator\src\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

  This is the use of **ReflectionIT.DisposeGenerator** in *ConnectionDB.cs*

```csharp showLineNumbers 
using ReflectionIT.DisposeGenerator.Attributes;

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ReflectionIT.DisposeGenerator\src\IDisp\obj\GX\ReflectionIT.DisposeGenerator\ReflectionIT.DisposeGenerator.SourceGenerator\IDisposableGeneratorDemo.DALDB.g.cs" label="IDisposableGeneratorDemo.DALDB.g.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the ReflectionIT.DisposeGenerator source generator
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
#pragma warning disable
#nullable enable annotations

namespace IDisposableGeneratorDemo
{
    partial class DALDB
    {
        /// <summary>
        /// Releases all resources used by the current instance.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.DisposeGenerator", "0.4.2.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public void Dispose() {
            Dispose(disposing: true);
            global::System.GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Tracks whether the current instance has been disposed. This field must not be modified manually.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.DisposeGenerator", "0.4.2.0")]
        private bool _isDisposed;

        /// <summary>
        /// Gets a value indicating whether the current instance has been disposed.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.DisposeGenerator", "0.4.2.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected virtual bool IsDisposed => _isDisposed;

        /// <summary>
        /// Throws an exception if the current instance has been disposed.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.DisposeGenerator", "0.4.2.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected void ThrowIfDisposed() {
            if (IsDisposed) {
                throw new global::System.ObjectDisposedException(nameof(DALDB));
            }
        }

        /// <summary>
        /// Releases the unmanaged resources used by the current instance and optionally releases the managed resources.
        /// </summary>
        /// <param name="disposing">"true" to release managed resources; otherwise, "false".</param>
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.DisposeGenerator", "0.4.2.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected virtual void Dispose(bool disposing) {
            if (_isDisposed) {
                return;
            }
            _isDisposed = true;
            if (disposing) {
                this.cn?.Dispose();
                this.cn1?.Dispose();
            }
        }

    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ReflectionIT.DisposeGenerator ](/sources/ReflectionIT.DisposeGenerator.zip)

:::


### Share ReflectionIT.DisposeGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FReflectionIT.DisposeGenerator&quote=ReflectionIT.DisposeGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FReflectionIT.DisposeGenerator&text=ReflectionIT.DisposeGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FReflectionIT.DisposeGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FReflectionIT.DisposeGenerator&title=ReflectionIT.DisposeGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FReflectionIT.DisposeGenerator&title=ReflectionIT.DisposeGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FReflectionIT.DisposeGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ReflectionIT.DisposeGenerator

<SameCategory />

