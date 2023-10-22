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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\Program.cs" label="Program.cs" >

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\DALDB.cs" label="DALDB.cs" >

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\gen_DALDB_IDisposableGeneratorDemo_AutomaticDisposeImpl.cs" label="gen_DALDB_IDisposableGeneratorDemo_AutomaticDisposeImpl.cs" >


```csharp showLineNumbers 
#nullable enable
#pragma warning disable CS0612,CS0618,CS0619
namespace IDisposableGeneratorDemo
{
    partial class DALDB // This is implementation class by AutomaticDisposeImpl.
    {
        [global::System.ComponentModel.Browsable(false)]
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("AutomaticDisposeImplによって生成されたフィールドです。一般のコードから参照してはいけません。")]
        private const int __generator_internal_BeNotInitiatedAnyDispose = 0;
        [global::System.ComponentModel.Browsable(false)]
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("AutomaticDisposeImplによって生成されたフィールドです。一般のコードから参照してはいけません。")]
        private const int __generator_internal_InitiatedSyncDispose  = 1;
        [global::System.ComponentModel.Browsable(false)]
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("AutomaticDisposeImplによって生成されたフィールドです。一般のコードから参照してはいけません。")]
        private const int __generator_internal_InitiatedAsyncDispose = 2;
        [global::System.ComponentModel.Browsable(false)]
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("AutomaticDisposeImplによって生成されたフィールドです。一般のコードから参照してはいけません。")]
        private const int __generator_internal_DisposeAlreadyCompleted = 9;
        [global::System.ComponentModel.Browsable(false)]
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("AutomaticDisposeImplによって生成されたフィールドです。一般のコードから参照してはいけません。")]
        private int __generator_internal_disposeState = __generator_internal_BeNotInitiatedAnyDispose;

        public bool IsDisposed => (global::System.Threading.Thread.VolatileRead(ref __generator_internal_disposeState) != __generator_internal_BeNotInitiatedAnyDispose);

        [global::System.ComponentModel.Browsable(false)]
        [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
        [global::System.Obsolete("AutomaticDisposeImplによって生成されたフィールドです。一般のコードから参照してはいけません。")]
        private int __generator_internal_managedObjectDisposeState = 0;

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                var managedObjectDisposeState = global::System.Threading.Interlocked.Exchange(ref __generator_internal_managedObjectDisposeState, 1);
                if (managedObjectDisposeState == 0)
                {
                    try
                    {
                        (this.cn as global::System.IDisposable)?.Dispose();
                    }
                    catch (global::System.Exception ex)
                    {
                        global::System.Diagnostics.Debug.Fail($"Caught an exception in the cn.Dispose() calling. Message=\"{ex.Message}\"");
                    }
                    try
                    {
                        (this.cn1 as global::System.IDisposable)?.Dispose();
                    }
                    catch (global::System.Exception ex)
                    {
                        global::System.Diagnostics.Debug.Fail($"Caught an exception in the cn1.Dispose() calling. Message=\"{ex.Message}\"");
                    }
                }
            }
        }

        public void Dispose()
        {
            var dispose_state = global::System.Threading.Interlocked.CompareExchange(ref __generator_internal_disposeState, __generator_internal_InitiatedSyncDispose, __generator_internal_BeNotInitiatedAnyDispose);
            if (dispose_state == __generator_internal_BeNotInitiatedAnyDispose)
            {

                // Dispose managed members and release unmaneged resources.
                Dispose(disposing: true);

                global::System.Threading.Thread.VolatileWrite(ref __generator_internal_disposeState, __generator_internal_DisposeAlreadyCompleted);
            }
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

