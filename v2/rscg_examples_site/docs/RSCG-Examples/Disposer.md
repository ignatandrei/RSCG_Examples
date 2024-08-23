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


<TOCInline toc={toc}  />

## Nuget / site data
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\Program.cs" label="Program.cs" >

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\ConnectionDB.cs" label="ConnectionDB.cs" >

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\DALDB.cs" label="DALDB.cs" >

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Disposer\src\IDisp\obj\GX\Disposer\Disposer.DisposableGenerator\DALDBDisposable.g.cs" label="DALDBDisposable.g.cs" >


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

### In the same category (Disposer) - 4 other generators


#### [BenutomoAutomaticDisposeImplSourceGenerator](/docs/BenutomoAutomaticDisposeImplSourceGenerator)


#### [Coplt.Dropping](/docs/Coplt.Dropping)


#### [DisposableHelpers](/docs/DisposableHelpers)


#### [IDisposableGenerator](/docs/IDisposableGenerator)

