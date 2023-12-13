---
sidebar_position: 710
title: 71 - DisposableHelpers
description: Generating boilerplate for thread safe Dispose
slug: /DisposableHelpers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# DisposableHelpers  by Clynt Neiko Rupinta


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/DisposableHelpers?label=DisposableHelpers)](https://www.nuget.org/packages/DisposableHelpers/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Kiryuumaru/DisposableHelpers?label=updated)](https://github.com/Kiryuumaru/DisposableHelpers)
![GitHub Repo stars](https://img.shields.io/github/stars/Kiryuumaru/DisposableHelpers?style=social)

## Details

### Info
:::info

Name: **DisposableHelpers**

Disposable helpers for IDisposable and IAsyncDisposable.

Author: Clynt Neiko Rupinta

NuGet: 
*https://www.nuget.org/packages/DisposableHelpers/*   


You can find more details at https://github.com/Kiryuumaru/DisposableHelpers

Source : https://github.com/Kiryuumaru/DisposableHelpers

:::

### Original Readme
:::note

# DisposableHelpers

Disposable helpers for IDisposable and IAsyncDisposable with source generators. Also capable of both anonymous disposable and anonymous async disposable.

**NuGets**

|Name|Info|
| ------------------- | :------------------: |
|DisposableHelpers|[![NuGet](https://buildstats.info/nuget/DisposableHelpers?includePreReleases=true)](https://www.nuget.org/packages/DisposableHelpers/)|

## Installation
```csharp
// Install release version
Install-Package DisposableHelpers

// Install pre-release version
Install-Package DisposableHelpers -pre
```

## Supported frameworks
.NET Standard 2.0 and above - see https://github.com/dotnet/standard/blob/master/docs/versions.md for compatibility matrix

## Usage

### Disposable
```csharp
using DisposableHelpers;

namespace YourNamespace
{
    public class SampleDisposable : Disposable
    {
        private SampleUnmanagedResource resources;
        
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                resources.Release();
            }
            base.Dispose(disposing);
        }
    }
}
```
### Disposable Source Generator
```csharp
using DisposableHelpers.Attributes;

namespace YourNamespace
{
    [Disposable]
    public partial class SampleDisposable
    {
        private SampleUnmanagedResource resources;
        
        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                resources.Release();
            }
            base.Dispose(disposing);
        }
    }
}
```
### Anonymous Disposable
```csharp
using DisposableHelpers;

namespace YourNamespace
{
    public static class Program
    {
        private static SampleUnmanagedResource resources;
        
        public static void Main(string[] args)
        {
            Disposable disposable = new Disposable(disposing =>
            {
                if (disposing)
                {
                    resources.Release();
                }
            });

            disposable.Dispose();
        }
    }
}
```
### AsyncDisposable
```csharp
using DisposableHelpers;

namespace YourNamespace
{
    public class SampleAsyncDisposable : AsyncDisposable
    {
        private SampleAsyncUnmanagedResource resources;
        
        protected override async ValueTask Dispose(bool isDisposing)
        {
            if (isDisposing)
            {
                await resources.Release();
            }
            return base.Dispose(isDisposing);
        }
    }
}
```
### AsyncDisposable Source Generator
```csharp
using DisposableHelpers.Attributes;

namespace YourNamespace
{
    [AsyncDisposable]
    public partial class SampleAsyncDisposable
    {
        private SampleAsyncUnmanagedResource resources;
        
        protected async ValueTask Dispose(bool isDisposing)
        {
            if (isDisposing)
            {
                await resources.Release();
            }
            return base.Dispose(isDisposing);
        }
    }
}
```
### Anonymous AsyncDisposable
```csharp
using DisposableHelpers;

namespace YourNamespace
{
    public static class Program
    {
        private static SampleAsyncUnmanagedResource resources;
        
        public static async void Main(string[] args)
        {
            AsyncDisposable disposable = new AsyncDisposable(async disposing =>
            {
                if (disposing)
                {
                    await resources.Release();
                }
            });

            await disposable.DisposeAsync();
        }
    }
}
```
### Want To Support This Project?
All I have ever asked is to be active by submitting bugs, features, and sending those pull requests down!.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://ko-fi.com/kiryuumaru)


:::

### About
:::note

Generating boilerplate for thread safe Dispose


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DisposableHelpers**
```xml showLineNumbers {16}
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
 	   <PackageReference Include="DisposableHelpers" Version="1.1.16" />
 	 </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\IDisp\Program.cs" label="Program.cs" >

  This is the use of **DisposableHelpers** in *Program.cs*

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\IDisp\DALDB.cs" label="DALDB.cs" >

  This is the use of **DisposableHelpers** in *DALDB.cs*

```csharp showLineNumbers 
using DisposableHelpers.Attributes;
using System.Resources;

namespace IDisposableGeneratorDemo;


[Disposable]
partial class DALDB 
{
    
    private readonly ConnectionDB cn;
    private readonly ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

    protected void Dispose(bool disposing)
    {
        if (disposing)
        {
            cn.Dispose();
            cn1.Dispose();
        }
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

  This is the use of **DisposableHelpers** in *ConnectionDB.cs*

```csharp showLineNumbers 
namespace IDisposableGeneratorDemo;

class ConnectionDB : IDisposable
{
    public void Dispose()
    {
        Console.WriteLine("disposing connectiondb");
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\IDisp\obj\GX\DisposableHelpers.SourceGenerators\DisposableHelpers.SourceGenerators.DisposableGenerator\IDisposableGeneratorDemo.DALDB.cs" label="IDisposableGeneratorDemo.DALDB.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable
namespace IDisposableGeneratorDemo
{
    partial class DALDB : global::System.IDisposable
    {
#nullable disable
        /// <summary>
        /// Finalizes an instance of the <see cref = "Disposable"/> class.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        ~DALDB()
        {
            Dispose(false);
        }

        /// <summary>
        /// Gets a value indicating whether this object is in the process of disposing.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public bool IsDisposing => global::System.Threading.Interlocked.CompareExchange(ref disposeStage, DisposalStarted, DisposalStarted) == DisposalStarted;

        /// <summary>
        /// Gets a value indicating whether this object has been disposed.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public bool IsDisposed => global::System.Threading.Interlocked.CompareExchange(ref disposeStage, DisposalComplete, DisposalComplete) == DisposalComplete;

        /// <summary>
        /// Gets a value indicating whether this object has been disposed or is in the process of being disposed.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public bool IsDisposedOrDisposing => global::System.Threading.Interlocked.CompareExchange(ref disposeStage, DisposalNotStarted, DisposalNotStarted) != DisposalNotStarted;

        /// <summary>
        /// Gets the object name, for use in any <see cref = "global::System.ObjectDisposedException"/> thrown by this object.
        /// </summary>
        /// <remarks>
        /// Subclasses can override this property if they would like more control over the object name appearing in any <see cref = "global::System.ObjectDisposedException"/>
        /// thrown by this <see cref = "Disposable"/>. This can be particularly useful in debugging and diagnostic scenarios.
        /// </remarks>
        /// <value>
        /// The object name, which defaults to the class name.
        /// </value>
        
#nullable enable
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected virtual string? ObjectName => GetType().FullName;

#nullable disable
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        private const int DisposalNotStarted = 0;
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        private const int DisposalStarted = 1;
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        private const int DisposalComplete = 2;
        // see the constants defined above for valid values
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        private int disposeStage;
        /// <summary>
        /// Occurs when this object is about to be disposed.
        /// </summary>
        
#nullable enable
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public event global::System.EventHandler? Disposing;
        /// <summary>
        /// Disposes of this object, if it hasn't already been disposed.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public void Dispose()
        {
            if (global::System.Threading.Interlocked.CompareExchange(ref disposeStage, DisposalStarted, DisposalNotStarted) != DisposalNotStarted)
            {
                return;
            }

            OnDisposing();
            Disposing = null;
            Dispose(true);
            global::System.GC.SuppressFinalize(this);
            global::System.Threading.Interlocked.Exchange(ref disposeStage, DisposalComplete);
        }

        /// <summary>
        /// Verifies that this object is not in the process of disposing, throwing an exception if it is.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected void VerifyNotDisposing()
        {
            if (IsDisposing)
            {
                throw new global::System.ObjectDisposedException(ObjectName);
            }
        }

        /// <summary>
        /// Verifies that this object has not been disposed, throwing an exception if it is.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected void VerifyNotDisposed()
        {
            if (IsDisposed)
            {
                throw new global::System.ObjectDisposedException(ObjectName);
            }
        }

        /// <summary>
        /// Verifies that this object is not being disposed or has been disposed, throwing an exception if either of these are true.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected void VerifyNotDisposedOrDisposing()
        {
            if (IsDisposedOrDisposing)
            {
                throw new global::System.ObjectDisposedException(ObjectName);
            }
        }

        /// <summary>
        /// Raises the <see cref = "Disposing"/> event.
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCode("DisposableHelpers.SourceGenerators.DisposableGenerator", "1.0.0.0")]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        protected virtual void OnDisposing()
        {
            Disposing?.Invoke(this, new global::System.EventArgs());
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project DisposableHelpers ](/sources/DisposableHelpers.zip)

:::


### Share DisposableHelpers 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposableHelpers&quote=DisposableHelpers" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposableHelpers&text=DisposableHelpers:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposableHelpers" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposableHelpers&title=DisposableHelpers" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposableHelpers&title=DisposableHelpers&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposableHelpers" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DisposableHelpers

## In the same category (Disposer)


### [BenutomoAutomaticDisposeImplSourceGenerator](/docs/BenutomoAutomaticDisposeImplSourceGenerator)


### [Disposer](/docs/Disposer)


### [IDisposableGenerator](/docs/IDisposableGenerator)

