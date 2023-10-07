---
sidebar_position: 650
title: 65 - Disposer
description: Generates partials for dispose resources
slug: /Disposer
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Disposer  by Hakan Fıstık


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Disposer?label=Disposer)](https://www.nuget.org/packages/Disposer/)
[![GitHub last commit](https://img.shields.io/github/last-commit/HakamFostok/Disposer?label=updated)](https://github.com/HakamFostok/Disposer)
![GitHub Repo stars](https://img.shields.io/github/stars/HakamFostok/Disposer?style=social)

## Details

### Info
:::info

Name: **Disposer**

A source generator for creating best-practice Disposing boilerplate using a [Disposable] attribute

Author: Hakan Fıstık

NuGet: 
*https://www.nuget.org/packages/Disposer/*   


You can find more details at https://github.com/HakamFostok/Disposer

Source : https://github.com/HakamFostok/Disposer

:::

### Original Readme
:::note

# Disposer

A Source Generator package that generates extension methods for enums, to allow fast "reflection".

> This source generator requires the .NET 6 SDK. You can target earlier frameworks like .NET Core 3.1 etc, but the _SDK_ must be at least 6.0.100

Add the package to your application using

```bash
dotnet add package Disposer
```


This adds a `<PackageReference>` to your project. You can additionally mark the package as `PrivateAsets="all"`.

> Setting `PrivateAssets="all"` means any projects referencing this one won't get a reference to the _Disposer_ package. <br/>

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <PackageReference Include="Disposer" Version="1.0.0" 
    PrivateAssets="all" />

</Project>
```

Adding the package will automatically add a marker attribute, `[Disposable]`, to your project.

To use the generator, add the `[EnumExtensions]` attribute to an enum. For example:

```csharp
[Disposer.Disposable]
public class MyClass
{
    partial void DisposeManaged()
    {
        // free managed resources here
    }

    partial void DisposeUnmanaged()
    {
        // free Unmanaged resources here
    }
}
```

This will generate a class another partial class which implement `IDisposable` interface:

```csharp
partial class MyClass : global::System.IDisposable
{
    partial void DisposeManaged();
    partial void DisposeUnmanaged();

    private bool disposed = false;

    ~MyClass()
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
```

:::

### About
:::note

Generates partials for dispose resources


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Disposer**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
	  <PackageReference Include="Disposer" Version="1.0.4" PrivateAssets="all" />
    
  </ItemGroup>
	 <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\Program.cs" label="Program.cs" >

  This is the use of **Disposer** in *Program.cs*

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

  This is the use of **Disposer** in *ConnectionDB.cs*

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\DALDB.cs" label="DALDB.cs" >

  This is the use of **Disposer** in *DALDB.cs*

```csharp showLineNumbers 
namespace IDisposableGeneratorDemo;


[Disposer.Disposable]
partial class DALDB :IDisposable
{
    
    private readonly ConnectionDB cn;
    private readonly ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

    partial void DisposeManaged()
    {
        cn.Dispose();
        cn1.Dispose();
    }

    partial void DisposeUnmanaged()
    {
        // free Unmanaged resources here
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\AutomaticDisposeImplAttribute.cs" label="AutomaticDisposeImplAttribute.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\AutomaticDisposeImplMode.cs" label="AutomaticDisposeImplMode.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\DisableAutomaticDisposeAttribute.cs" label="DisableAutomaticDisposeAttribute.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\EnableAutomaticDisposeAttribute.cs" label="EnableAutomaticDisposeAttribute.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\gen_DALDB_IDisposableGeneratorDemo_AutomaticDisposeImpl.cs" label="gen_DALDB_IDisposableGeneratorDemo_AutomaticDisposeImpl.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\ManagedObjectAsyncDisposeMethodAttribute.cs" label="ManagedObjectAsyncDisposeMethodAttribute.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\ManagedObjectDisposeMethodAttribute.cs" label="ManagedObjectDisposeMethodAttribute.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Benutomo.AutomaticDisposeImpl.SourceGenerator\Benutomo.AutomaticDisposeImpl.SourceGenerator.AutomaticDisposeGenerator\UnmanagedResourceReleaseMethodAttribute.cs" label="UnmanagedResourceReleaseMethodAttribute.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Disposer\Disposer.DisposableGenerator\DALDBDisposable.g.cs" label="DALDBDisposable.g.cs" >


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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\IDisposableGenerator.CSharp\IDisposableGenerator.IDisposableGenerator\Disposables.g.cs" label="Disposables.g.cs" >


```csharp showLineNumbers 
// <autogenerated/>
namespace IDisposableGeneratorDemo;

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\IDisposableGenerator.CSharp\IDisposableGenerator.IDisposableGenerator\GeneratedAttributes.g.cs" label="GeneratedAttributes.g.cs" >


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

[Download Example project Disposer ](/sources/Disposer.zip)

:::


### Share Disposer 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposer&quote=Disposer" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposer&text=Disposer:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposer" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposer&title=Disposer" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposer&title=Disposer&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDisposer" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Disposer

## In the same category (Disposer)


### [BenutomoAutomaticDisposeImplSourceGenerator](/docs/BenutomoAutomaticDisposeImplSourceGenerator)


### [DisposableHelpers](/docs/DisposableHelpers)

