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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\Program.cs" label="Program.cs" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\DALDB.cs" label="DALDB.cs" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\AutomaticDisposeImplAttribute.cs" label="AutomaticDisposeImplAttribute.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// 指定したクラスに破棄(<see cref=""System.IDisposable"" />,<see cref=""System.IAsyncDisposable"" />)をサポートするメンバを破棄する<see cref=""System.IDisposable.Dispose"" />メソッドおよび<see cref=""System.IAsyncDisposable.DisposeAsync"" />メソッド(当該クラスに<see cref=""System.IAsyncDisposable"" />インターフェイスが含まれている場合のみ)を自動実装する。
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Class)]
    internal class AutomaticDisposeImplAttribute : global::System.Attribute
    {
        /// <summary>
        /// 自動破棄実装の既定動作を設定する。
        /// </summary>
        public AutomaticDisposeImplMode Mode { get; set; }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\AutomaticDisposeImplMode.cs" label="AutomaticDisposeImplMode.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// 破棄(<see cref=""System.IDisposable"" />,<see cref=""System.IAsyncDisposable"" />)をサポートするメンバを自動実装Disposeの対象とすることに関する振る舞いの指定。
    /// </summary>
    internal enum AutomaticDisposeImplMode
    {
        /// <summary>
        /// <see cref=""System.IDisposable"" />,<see cref=""System.IAsyncDisposable"" />を継承する型を持つメンバは暗黙的に自動Dispose呼び出しの対象となる。
        /// </summary>
        Implicit,

        /// <summary>
        /// <see cref=""System.IDisposable"" />,<see cref=""System.IAsyncDisposable"" />を継承する型を持つメンバは自動Dispose呼び出しの対象となる。
        /// </summary>
        Explicit,
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\DisableAutomaticDisposeAttribute.cs" label="DisableAutomaticDisposeAttribute.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// このメンバに対して、<see cref=""System.IDisposable.Dispose"" />メソッドまたは<see cref=""System.IAsyncDisposable.DisposeAsync"" />メソッドの自動呼出しは行いません。このオブジェクトで破棄するのが不適当であるかユーザ自身が<see cref=""System.IDisposable.Dispose"" />メソッドまたは<see cref=""System.IAsyncDisposable.DisposeAsync"" />メソッドの呼び出しを実装するメンバです。
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property)]
    internal class DisableAutomaticDisposeAttribute : global::System.Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\EnableAutomaticDisposeAttribute.cs" label="EnableAutomaticDisposeAttribute.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// このオブジェクトの破棄と同時に自動的に<see cref=""System.IDisposable.Dispose"" />メソッドまたは<see cref=""System.IAsyncDisposable.DisposeAsync"" />メソッドを呼び出します。
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Field | global::System.AttributeTargets.Property)]
    internal class EnableAutomaticDisposeAttribute : global::System.Attribute
    {
        public EnableAutomaticDisposeAttribute() { }

        /// <summary>
        /// このオブジェクトの破棄と同時に自動的に<see cref=""System.IDisposable.Dispose"" />メソッドまたは<see cref=""System.IAsyncDisposable.DisposeAsync"" />メソッドを呼び出します。
        /// </summary>
        /// <param name=""linkedMembers"">このメンバの破棄に連動して破棄されるメンバ(ここで列挙されたメンバはEnable/DisableAutomaticDispose属性を省略可能)</param>
        public EnableAutomaticDisposeAttribute(params string[] dependencyMembers) { }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\gen_DALDB_IDisposableGeneratorDemo_AutomaticDisposeImpl.cs" label="gen_DALDB_IDisposableGeneratorDemo_AutomaticDisposeImpl.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\ManagedObjectAsyncDisposeMethodAttribute.cs" label="ManagedObjectAsyncDisposeMethodAttribute.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// <see cref=""Benutomo.AutomaticDisposeImplAttribute""/>を利用しているクラスで、ユーザが実装するマネージドオブジェクトを非同期的な処理による破棄を行うメソッドに付与する。このメソッドはデストラクタからは呼び出されない。デストラクタからも呼び出される必要がある場合はデストラクタで必要な処理を全て同期的に行うようにした上で<see cref=""Benutomo.UnmanagedResourceReleaseMethodAttribute"">を使用すること。この属性を付与するメソッドは引数なしで戻り値は<see cref=""System.Threading.ValueTask"" />などawait可能な型である必要がある。このメソッドはこのオブジェクトのDisposeAsync()が初めて実行された時に自動実装コードから呼び出される。ただし、このメソッドを所有するクラスがIDisposableも実装していて、かつ、Dispose()によってこのオブジェクトが破棄された場合は、この属性が付与されているメソッドは呼び出されず、<see cref=""Benutomo.ManagedObjectDisposeMethodAttribute"">が付与されているメソッドが呼び出される。
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method)]
    internal class ManagedObjectAsyncDisposeMethodAttribute : global::System.Attribute
    {
        /// <summary>
        /// <inheritdoc cref=""Benutomo.ManagedObjectAsyncDisposeMethodAttribute""/>
        /// </summary>
        public ManagedObjectAsyncDisposeMethodAttribute() { }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\ManagedObjectDisposeMethodAttribute.cs" label="ManagedObjectDisposeMethodAttribute.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// <see cref=""Benutomo.AutomaticDisposeImplAttribute""/>を利用しているクラスで、ユーザが実装するマネージドオブジェクトを同期的な処理による破棄を行うメソッドに付与する。このメソッドはデストラクタからは呼び出されない。デストラクタからも呼び出される必要がある場合は<see cref=""Benutomo.UnmanagedResourceReleaseMethodAttribute"">を使用すること。この属性を付与するメソッドは引数なしで戻り値はvoidである必要がある。このメソッドはこのオブジェクトのDispose()が初めて実行された時に自動実装コードから呼び出される。ただし、このメソッドを所有するクラスがIAsyncDisposableも実装していて、かつ、DisposeAsync()によってこのオブジェクトが破棄された場合は、この属性が付与されているメソッドは呼び出されず、<see cref=""Benutomo.ManagedObjectAsyncDisposeMethodAttribute"">が付与されているメソッドが呼び出される。
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method)]
    internal class ManagedObjectDisposeMethodAttribute : global::System.Attribute
    {
        /// <summary>
        /// <inheritdoc cref=""Benutomo.ManagedObjectDisposeMethodAttribute""/>
        /// </summary>
        public ManagedObjectDisposeMethodAttribute() { }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\UnmanagedResourceReleaseMethodAttribute.cs" label="UnmanagedResourceReleaseMethodAttribute.cs" >


```csharp showLineNumbers 
#pragma warning disable CS0436
#nullable enable

namespace Benutomo
{
    /// <summary>
    /// <see cref=""Benutomo.AutomaticDisposeImplAttribute""/>を利用しているクラスで、ユーザが実装するアンマネージドリソースの解放を行うメソッド(引数なしで戻り値はvoid)に付与する。このメソッドはこのオブジェクトのDispose()またはDisposeAsync()、デストラクタのいずれかが初めて実行された時に自動実装コードから呼び出される。この属性を付与したメソッドは、実装者の責任でGCのファイナライズスレッドから呼び出されても問題無いように実装しなければならないことに注意すること。
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method)]
    internal class UnmanagedResourceReleaseMethodAttribute : global::System.Attribute
    {
        /// <summary>
        /// <inheritdoc cref=""Benutomo.UnmanagedResourceReleaseMethodAttribute""/>
        /// </summary>
        public UnmanagedResourceReleaseMethodAttribute() { }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\DisposableHelpers.SourceGenerators\DisposableHelpers.SourceGenerators.DisposableGenerator\IDisposableGeneratorDemo.DALDB.cs" label="IDisposableGeneratorDemo.DALDB.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\Disposer\Disposer.DisposableGenerator\DALDBDisposable.g.cs" label="DALDBDisposable.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the Disposer source generator
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace IDisposableGeneratorDemo
{
    partial class DALDB : global::System.IDisposable
    {
        partial void DisposeManaged();
        partial void DisposeUnmanaged();

        private bool disposed = false;

        ~DALDB()
        {
            Dispose(false);
        }

        private void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                DisposeManaged();
            }

            DisposeUnmanaged();

            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            global::System.GC.SuppressFinalize(this);
        }
    }
}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\IDisposableGenerator.CSharp\IDisposableGenerator.IDisposableGenerator\Disposables.g.cs" label="Disposables.g.cs" >


```csharp showLineNumbers 
// <autogenerated/>
namespace IDisposableGeneratorDemo;

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\DisposableHelpers\src\DisposableHelpers\IDisp\obj\GX\IDisposableGenerator.CSharp\IDisposableGenerator.IDisposableGenerator\GeneratedAttributes.g.cs" label="GeneratedAttributes.g.cs" >


```csharp showLineNumbers 
// <autogenerated/>
#pragma warning disable SA1636, 8618
namespace IDisposableGenerator
{
    using System;

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    internal class CallOnDisposeAttribute : Attribute
    {
        public CallOnDisposeAttribute()
        {
        }
    }

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Event | AttributeTargets.Field | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    internal class DisposeFieldAttribute : Attribute
    {
        public DisposeFieldAttribute(bool owner)
        {
        }
    }

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal class GenerateDisposeAttribute : Attribute
    {
        public GenerateDisposeAttribute(bool stream)
        {
        }
    }

    // used only by a source generator to generate Dispose() and Dispose(bool).
    [AttributeUsage(AttributeTargets.Event | AttributeTargets.Field | AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    internal class NullOnDisposeAttribute : Attribute
    {
        public NullOnDisposeAttribute()
        {
        }
    }
}
#pragma warning restore SA1636, 8618

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

