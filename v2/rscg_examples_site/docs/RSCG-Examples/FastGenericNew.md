---
sidebar_position: 400
title: 40 - FastGenericNew
description: Creating instances fast. As generator show source code. Otherwise could be a dll
slug: /FastGenericNew
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# FastGenericNew  by Boring3 Nyrest


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/FastGenericNew.SourceGenerator?label=FastGenericNew.SourceGenerator)](https://www.nuget.org/packages/FastGenericNew.SourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Nyrest/FastGenericNew?label=updated)](https://github.com/Nyrest/FastGenericNew)
![GitHub Repo stars](https://img.shields.io/github/stars/Nyrest/FastGenericNew?style=social)

## Details

### Info
:::info

Name: **FastGenericNew**

Configurable Source Generator of FastGenericNew
Minimum required: .NET Standard 2.0 & C# 8.0
The ultimate fast alternative to Activator.CreateInstance

Up to 50x faster than Activator.CreateInstance
Generic Parameters Support
Non-Public Constructor Support
No Generic Constraints
TryGetValue-like TryFastNew API
Link Mode PublishTrimmed Support
C# 8 Nullable Support
C# 10 Parameterless struct constructors Support (Both invokes or not)

Author: Boring3 Nyrest

NuGet: 
*https://www.nuget.org/packages/FastGenericNew.SourceGenerator/*   


You can find more details at https://github.com/Nyrest/FastGenericNew

Source : https://github.com/Nyrest/FastGenericNew

:::

### Original Readme
:::note

<div align="center">
  <a href="https://github.com/Nyrest/FastGenericNew"><img height="320" src="https://github.com/Nyrest/FastGenericNew/raw/main/Assets/FastGenericNew-Wide.svg"></img></a>
  
  <a href="https://github.com/Nyrest/FastGenericNew/actions/workflows/tests.yml"><img src="https://img.shields.io/github/workflow/status/Nyrest/FastGenericNew/Tests?style=for-the-badge"></img></a>
  <a href="https://www.nuget.org/packages/FastGenericNew/"><img src="https://img.shields.io/nuget/vpre/FastGenericNew?style=for-the-badge&color=0065b3"></img></a>
  <a href="https://www.nuget.org/packages/FastGenericNew.SourceGenerator/"><img src="https://img.shields.io/nuget/vpre/FastGenericNew.SourceGenerator?label=SourceGenerator&style=for-the-badge&color=0065b3"></img></a>
</div>

## ✨ Features

- ✔️ **The best** `CreateInstance` ever
  - Up to 50x faster than `Activator.CreateInstance`
  - Generic Parameters Support
  - Zero boxing/unboxing
  - TryGetValue-like TryFastNew API
  - Link Mode `PublishTrimmed` Support
  - Non-Public Constructor Support
  - No Generic Constraints
  - Compatible with .NET Standard 2.0
  - Multiple backend implementations.
  - Heavily tested on Win/Mac/Linux

- 🪛 **Modern** Compiler Integration
  - Source Generator v2 (Incremental Generator)
  - Highly Configurable ([Props](https://github.com/Nyrest/FastGenericNew/wiki/SourceGenerator-Options))
  - Multi-threaded Generation

- 🔥 **Lastest** C#/.NET Features Support
  - [C# 8 Nullable](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types) Support
  - [C# 10 Parameterless struct constructors](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-10.0/parameterless-struct-constructors) Support (Both invokes or not)
  - WebAssembly Support

## 🔧 Installation

> You should only use one of them

### Pre-Compiled Version

```powershell
dotnet add package FastGenericNew --version 3.1.0-preview1
```

```xml
<ItemGroup>
  <PackageReference Include="FastGenericNew" Version="3.1.0-preview1" />
</ItemGroup>
```

### SourceGenerator Version

```powershell
dotnet add package FastGenericNew.SourceGenerator --version 3.1.0-preview1
```

```xml
<ItemGroup>
  <PackageReference Include="FastGenericNew.SourceGenerator" Version="3.1.0-preview1" />
</ItemGroup>
```
#### SourceGeneratorV2 requires
> ***.NET Standard 2.0*** or above  
> ***C# 8.0*** or above  
> ***Roslyn 4.0.1*** or above  
> ***Modern IDE*** *(Optional)*  [VS2022, Rider, VSCode]

## 📖 Examples

```cs
using FastGenericNew;

// Simply replace 'Activator' to 'FastNew'
var obj = FastNew.CreateInstance<T>();

// With parameter(s)
var obj2 = FastNew.CreateInstance<T, string>("text");
var obj3 = FastNew.CreateInstance<T, string, int>("text", 0);

// Try pattern
// NOTE: Try pattern will only check the constructor could be called (exist & callable)
//       It will not catch or handle any exceptions thrown in the constructor.
if (FastNew.TryCreateInstance<T, string>("arg0", out T result));
{
    // ...
}
```

### Notes

> **With .NET Framework**, `Activator.CreateInstance<T>()` invokes the parameterless constructor of **ValueType** if  
> the constraint is `where T : new()` but appears to **ignore the parameterless constructor if the constraint is `where T : struct`**.  
> **But `FastNew.CreateInstance<T>()` will always invoke the parameterless constructor if it's available.**  
> 
> If you don't want to invoke the parameterless constructor of **ValueType**.  
> Consider to use `FastNew.NewOrDefault<T>()` which **will never invoke the parameterless constructor of `ValueType`**

## 🚀 Benchmark  

### **Environment**

``` ini
BenchmarkDotNet=v0.13.1, OS=Windows 10.0.22000
AMD Ryzen 9 3900X, 1 CPU, 24 logical and 12 physical cores
.NET SDK=6.0.200-preview.22055.15
  [Host]             : .NET 6.0.2 (6.0.222.6406), X64 RyuJIT
  .NET 5.0           : .NET 5.0.14 (5.0.1422.5710), X64 RyuJIT
  .NET 6.0           : .NET 6.0.2 (6.0.222.6406), X64 RyuJIT
  .NET Framework 4.8 : .NET Framework 4.8 (4.8.4470.0), X64 RyuJIT
```

### Reference Types

[![Benchmark Result of Reference Types](https://raw.githubusercontent.com/Nyrest/FastGenericNew/main/Assets/Benchmark_ReferenceType.png)](https://github.com/Nyrest/FastGenericNew/blob/main/FastGenericNew.Benchmarks/Benchmarks/ReferenceTypeBenchmark.cs)

### Value Types

[![Benchmark Result of Value Types](https://raw.githubusercontent.com/Nyrest/FastGenericNew/main/Assets/Benchmark_ValueType.png)](https://github.com/Nyrest/FastGenericNew/blob/main/FastGenericNew.Benchmarks/Benchmarks/ValueTypeBenchmark.cs)

## 📜 License

FastGenericNew is licensed under the MIT license.


:::

### About
:::note

Creating instances fast. As generator show source code. Otherwise could be a dll


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **FastGenericNew**
```xml showLineNumbers {14}
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
	  <PackageReference Include="FastGenericNew.SourceGenerator" Version="3.1.0-preview1">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\Program.cs" label="Program.cs" >

  This is the use of **FastGenericNew** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using FastGenericNew;
using FastGenericNewDemo;

Console.WriteLine("Hello, World!");
//private constructor
var p= FastNew.CreateInstance<Person>() ;
Console.WriteLine(p.FirstName);
//public constructor
p = FastNew.CreateInstance<Person,string>("test");
Console.WriteLine(p.FirstName);


```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\Person.cs" label="Person.cs" >

  This is the use of **FastGenericNew** in *Person.cs*

```csharp showLineNumbers 
namespace FastGenericNewDemo;

class Person
{
    private Person()
    {
        FirstName = "Andrei";
    }
    public Person(string firstName)
    {
        this.FirstName=firstName;
    }
    public string FirstName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\obj\GX\FastGenericNew.SourceGenerator\FastGenericNew.SourceGenerator.Generator\FastNew.CreateInstance.g.cs" label="FastNew.CreateInstance.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by FastGenericNew.SourceGenerator
//     Please do not modify this file directly
// <auto-generated/>
//------------------------------------------------------------------------------
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Reflection.Emit;
using System.ComponentModel;

namespace @FastGenericNew
{
public static partial class FastNew{

        /// <summary>
        /// <para>Create an instance of <typeparamref name="T" /></para>
        /// <para>Returns <c><see langword="new" /> <typeparamref name="T" />()</c> if <typeparamref name="T"/> is a <see cref="ValueType"/>(struct)</para>
        /// <para>This <b>CAN</b> call the Parameterless Constructor of the <see cref="ValueType"/>(struct)</para>
        /// </summary>
        /// <typeparam name="T">The type to create.</typeparam>
        /// <returns>A new instance of <typeparamref name="T" /></returns>
        /// <remarks>
        /// Equivalent to <c><see langword="new" /> <typeparamref name="T" />()</c> for both Reference Types and Value Types
        /// </remarks>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
	    public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>()
	    {
#if NETFRAMEWORK
            return global::@FastGenericNew.FastNew<T>.CompiledDelegate();
#else
		    return typeof(T).IsValueType
                ? System.Activator.CreateInstance<T>() // This will be optimized by JIT
                : global::@FastGenericNew.FastNew<T>.CompiledDelegate();
#endif
	    }
        /// <summary>
        /// Create an instance of <typeparamref name="T" /> <br/>
        /// Returns <c><see langword="default" />(<typeparamref name="T" />)</c> if <typeparamref name="T"/> is a <see cref="ValueType"/>(struct) <br/>
        /// This <b>WILL NOT</b> call the Parameterless Constructor of the <see cref="ValueType"/>(struct)
        /// </summary>
        /// <typeparam name="T">The type to create.</typeparam>
        /// <returns>A new instance of <typeparamref name="T" /></returns>
        /// <remarks>
        /// For reference types, equivalent to <c><see langword="new" /> <typeparamref name="T" />()</c> <br/>
        /// For value types, equivalent to <c><see langword="default" />(<typeparamref name="T" />)</c>
        /// </remarks>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
	    public static T NewOrDefault<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>()
	    {
#if NETFRAMEWORK
		    return global::@FastGenericNew.FastNew<T>._isValueTypeT
#else
		    return typeof(T).IsValueType
#endif
                ? default(T)! // This will never be null since T is a ValueType
                : FastNew<T>.CompiledDelegate();
	    }
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0>(TArg0 p0) =>
global::@FastGenericNew.FastNew<T, TArg0>.CompiledDelegate(p0);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1>(TArg0 p0, TArg1 p1) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1>.CompiledDelegate(p0, p1);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2>(TArg0 p0, TArg1 p1, TArg2 p2) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2>.CompiledDelegate(p0, p1, p2);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3>.CompiledDelegate(p0, p1, p2, p3);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4>.CompiledDelegate(p0, p1, p2, p3, p4);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>.CompiledDelegate(p0, p1, p2, p3, p4, p5);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, TArg13 p13) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, TArg13 p13, TArg14 p14) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14);
public static T CreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, TArg13 p13, TArg14 p14, TArg15 p15) =>
global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15);
}
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\obj\GX\FastGenericNew.SourceGenerator\FastGenericNew.SourceGenerator.Generator\FastNew.TryCreateInstance.g.cs" label="FastNew.TryCreateInstance.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by FastGenericNew.SourceGenerator
//     Please do not modify this file directly
// <auto-generated/>
//------------------------------------------------------------------------------
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Reflection.Emit;
using System.ComponentModel;

namespace @FastGenericNew
{
public static partial class FastNew{

	    [MethodImpl(MethodImplOptions.AggressiveInlining)]
	    public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>(out T result)
	    {
            if(global::@FastGenericNew.FastNew<T>.IsValid)
            {
#if NETFRAMEWORK
                result = global::@FastGenericNew.FastNew<T>.CompiledDelegate();
#else
		        result = typeof(T).IsValueType
                    ? System.Activator.CreateInstance<T>()
                    : global::@FastGenericNew.FastNew<T>.CompiledDelegate();
#endif
                return true;
            }
	        //Unsafe.SkipInit<T>(out result);
            result = default!;
	        return false;
	    }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
	    public static bool TryNewOrDefault<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>(out T result)
	    {
            if(global::@FastGenericNew.FastNew<T>.IsValid)
            {
#if NETFRAMEWORK
		        result = global::@FastGenericNew.FastNew<T>._isValueTypeT
#else
    		    result = typeof(T).IsValueType
#endif
                    ? default(T)! // This will never be null since T is a ValueType
                    : FastNew<T>.CompiledDelegate();
                    return true;
            }
	        //Unsafe.SkipInit<T>(out result);
            result = default!;
	        return false;
	    }
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0>(TArg0 p0, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0>.CompiledDelegate(p0);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1>(TArg0 p0, TArg1 p1, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1>.CompiledDelegate(p0, p1);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2>(TArg0 p0, TArg1 p1, TArg2 p2, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2>.CompiledDelegate(p0, p1, p2);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3>.CompiledDelegate(p0, p1, p2, p3);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4>.CompiledDelegate(p0, p1, p2, p3, p4);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>.CompiledDelegate(p0, p1, p2, p3, p4, p5);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, TArg13 p13, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, TArg13 p13, TArg14 p14, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14);
return true;
}
result = default!;return false;
}
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public static bool TryCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>(TArg0 p0, TArg1 p1, TArg2 p2, TArg3 p3, TArg4 p4, TArg5 p5, TArg6 p6, TArg7 p7, TArg8 p8, TArg9 p9, TArg10 p10, TArg11 p11, TArg12 p12, TArg13 p13, TArg14 p14, TArg15 p15, out T result)
{
if (global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>.IsValid)
{
result = global::@FastGenericNew.FastNew<T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>.CompiledDelegate(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15);
return true;
}
result = default!;return false;
}
}
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\obj\GX\FastGenericNew.SourceGenerator\FastGenericNew.SourceGenerator.Generator\FastNew{T}.g.cs" label="FastNew{T}.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by FastGenericNew.SourceGenerator
//     Please do not modify this file directly
// <auto-generated/>
//------------------------------------------------------------------------------
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Reflection.Emit;
using System.ComponentModel;

namespace @FastGenericNew
{
internal 
#if NETFRAMEWORK
static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>
    {
#if NETFRAMEWORK
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal static readonly bool _isValueTypeT = typeof(T).IsValueType;
#endif
		/// <summary>
		/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
		/// Could be <see langword="null" /> if the constructor couldn't be found.
		/// </summary>
		public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, Type.EmptyTypes, null);

	    public static readonly Func<T> CompiledDelegate = System.Linq.Expressions.Expression.Lambda<Func<T>>(typeof(T).IsValueType
            ? (global::@FastGenericNew.FastNew<T>.CachedConstructor != null
                ? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(global::@FastGenericNew.FastNew<T>.CachedConstructor)
                : (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(typeof(T)))
            : ((global::@FastGenericNew.FastNew<T>.CachedConstructor != null && !typeof(T).IsAbstract)
                ? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(global::@FastGenericNew.FastNew<T>.CachedConstructor)
                : (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>()))
            , Array.Empty<System.Linq.Expressions.ParameterExpression>()).Compile();
    
        public static readonly bool IsValid = typeof(T).IsValueType || (global::@FastGenericNew.FastNew<T>.CachedConstructor != null && !typeof(T).IsAbstract);
    }
#else
static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>
    {
		/// <summary>
		/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
		/// Could be <see langword="null" /> if the constructor couldn't be found.
		/// </summary>
		public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, Type.EmptyTypes, null);

#if NETFRAMEWORK
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal static readonly bool _isValueTypeT = typeof(T).IsValueType;
#endif

	    public static readonly Func<T> CompiledDelegate;
    
        public static readonly bool IsValid = typeof(T).IsValueType || (global::@FastGenericNew.FastNew<T>.CachedConstructor != null && !typeof(T).IsAbstract);
    
        static FastNew()
        {
            var dm = new DynamicMethod("", typeof(T), global::@FastGenericNew._FastNewDynMetClosure.InstanceOnlyArray, restrictedSkipVisibility: true);
            var il = dm.GetILGenerator();
            if (IsValid)
            {
                if (global::@FastGenericNew.FastNew<T>.CachedConstructor != null)
                    il.Emit(OpCodes.Newobj, CachedConstructor!);
                else
                {
                    il.DeclareLocal(typeof(T));
                    //il.Emit(OpCodes.Ldloca_S, (short)0)
                    //il.Emit(OpCodes.Initobj, typeof(T));
                    il.Emit(OpCodes.Ldloc_0);
                }
            }
            else
            {
                il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
            }
            il.Emit(OpCodes.Ret);
            CompiledDelegate = (Func<T>)dm.CreateDelegate(typeof(Func<T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
        }
    }
#endif
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
}, null);
public static readonly Func<TArg0, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(10);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, T>)dm.CreateDelegate(typeof(Func<TArg0, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
}, null);
public static readonly Func<TArg0, TArg1, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(11);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(12);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(13);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(14);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(15);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(16);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(17);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(18);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(19);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
typeof(TArg10),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
var p10 = System.Linq.Expressions.Expression.Parameter(typeof(TArg10));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9), typeof(TArg10) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(20);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Ldarg_S, (byte)11);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
typeof(TArg10),
typeof(TArg11),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
var p10 = System.Linq.Expressions.Expression.Parameter(typeof(TArg10));
var p11 = System.Linq.Expressions.Expression.Parameter(typeof(TArg11));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9), typeof(TArg10), typeof(TArg11) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(21);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Ldarg_S, (byte)11);
il.Emit(OpCodes.Ldarg_S, (byte)12);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
typeof(TArg10),
typeof(TArg11),
typeof(TArg12),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
var p10 = System.Linq.Expressions.Expression.Parameter(typeof(TArg10));
var p11 = System.Linq.Expressions.Expression.Parameter(typeof(TArg11));
var p12 = System.Linq.Expressions.Expression.Parameter(typeof(TArg12));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9), typeof(TArg10), typeof(TArg11), typeof(TArg12) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(22);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Ldarg_S, (byte)11);
il.Emit(OpCodes.Ldarg_S, (byte)12);
il.Emit(OpCodes.Ldarg_S, (byte)13);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
typeof(TArg10),
typeof(TArg11),
typeof(TArg12),
typeof(TArg13),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
var p10 = System.Linq.Expressions.Expression.Parameter(typeof(TArg10));
var p11 = System.Linq.Expressions.Expression.Parameter(typeof(TArg11));
var p12 = System.Linq.Expressions.Expression.Parameter(typeof(TArg12));
var p13 = System.Linq.Expressions.Expression.Parameter(typeof(TArg13));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9), typeof(TArg10), typeof(TArg11), typeof(TArg12), typeof(TArg13) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(23);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Ldarg_S, (byte)11);
il.Emit(OpCodes.Ldarg_S, (byte)12);
il.Emit(OpCodes.Ldarg_S, (byte)13);
il.Emit(OpCodes.Ldarg_S, (byte)14);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
typeof(TArg10),
typeof(TArg11),
typeof(TArg12),
typeof(TArg13),
typeof(TArg14),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
var p10 = System.Linq.Expressions.Expression.Parameter(typeof(TArg10));
var p11 = System.Linq.Expressions.Expression.Parameter(typeof(TArg11));
var p12 = System.Linq.Expressions.Expression.Parameter(typeof(TArg12));
var p13 = System.Linq.Expressions.Expression.Parameter(typeof(TArg13));
var p14 = System.Linq.Expressions.Expression.Parameter(typeof(TArg14));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9), typeof(TArg10), typeof(TArg11), typeof(TArg12), typeof(TArg13), typeof(TArg14) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(24);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Ldarg_S, (byte)11);
il.Emit(OpCodes.Ldarg_S, (byte)12);
il.Emit(OpCodes.Ldarg_S, (byte)13);
il.Emit(OpCodes.Ldarg_S, (byte)14);
il.Emit(OpCodes.Ldarg_S, (byte)15);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
internal static partial class FastNew<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>
{
/// <summary>
/// The constructor of <typeparamref name="T" /> with given arguments. <br/>
/// Could be <see langword="null" /> if the constructor couldn't be found.
/// </summary>
public static readonly ConstructorInfo? CachedConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic, null, new Type[]
{
typeof(TArg0),
typeof(TArg1),
typeof(TArg2),
typeof(TArg3),
typeof(TArg4),
typeof(TArg5),
typeof(TArg6),
typeof(TArg7),
typeof(TArg8),
typeof(TArg9),
typeof(TArg10),
typeof(TArg11),
typeof(TArg12),
typeof(TArg13),
typeof(TArg14),
typeof(TArg15),
}, null);
public static readonly Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15, T> CompiledDelegate;
public static readonly bool IsValid;
static FastNew()
{
IsValid = CachedConstructor != null && !typeof(T).IsAbstract;
#if NETFRAMEWORK
var p0 = System.Linq.Expressions.Expression.Parameter(typeof(TArg0));
var p1 = System.Linq.Expressions.Expression.Parameter(typeof(TArg1));
var p2 = System.Linq.Expressions.Expression.Parameter(typeof(TArg2));
var p3 = System.Linq.Expressions.Expression.Parameter(typeof(TArg3));
var p4 = System.Linq.Expressions.Expression.Parameter(typeof(TArg4));
var p5 = System.Linq.Expressions.Expression.Parameter(typeof(TArg5));
var p6 = System.Linq.Expressions.Expression.Parameter(typeof(TArg6));
var p7 = System.Linq.Expressions.Expression.Parameter(typeof(TArg7));
var p8 = System.Linq.Expressions.Expression.Parameter(typeof(TArg8));
var p9 = System.Linq.Expressions.Expression.Parameter(typeof(TArg9));
var p10 = System.Linq.Expressions.Expression.Parameter(typeof(TArg10));
var p11 = System.Linq.Expressions.Expression.Parameter(typeof(TArg11));
var p12 = System.Linq.Expressions.Expression.Parameter(typeof(TArg12));
var p13 = System.Linq.Expressions.Expression.Parameter(typeof(TArg13));
var p14 = System.Linq.Expressions.Expression.Parameter(typeof(TArg14));
var p15 = System.Linq.Expressions.Expression.Parameter(typeof(TArg15));
CompiledDelegate = (System.Linq.Expressions.Expression.Lambda<Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15, T>>(IsValid
? (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.New(CachedConstructor!, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15)
: (System.Linq.Expressions.Expression)System.Linq.Expressions.Expression.Call(global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>())
, new System.Linq.Expressions.ParameterExpression[] { p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15 })).Compile();
#else
var dm = new DynamicMethod("", typeof(T), new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure), typeof(TArg0), typeof(TArg1), typeof(TArg2), typeof(TArg3), typeof(TArg4), typeof(TArg5), typeof(TArg6), typeof(TArg7), typeof(TArg8), typeof(TArg9), typeof(TArg10), typeof(TArg11), typeof(TArg12), typeof(TArg13), typeof(TArg14), typeof(TArg15) }, restrictedSkipVisibility: true);
var il = dm.GetILGenerator(25);
if (IsValid)
{
il.Emit(OpCodes.Ldarg_1);
il.Emit(OpCodes.Ldarg_2);
il.Emit(OpCodes.Ldarg_3);
il.Emit(OpCodes.Ldarg_S, (byte)4);
il.Emit(OpCodes.Ldarg_S, (byte)5);
il.Emit(OpCodes.Ldarg_S, (byte)6);
il.Emit(OpCodes.Ldarg_S, (byte)7);
il.Emit(OpCodes.Ldarg_S, (byte)8);
il.Emit(OpCodes.Ldarg_S, (byte)9);
il.Emit(OpCodes.Ldarg_S, (byte)10);
il.Emit(OpCodes.Ldarg_S, (byte)11);
il.Emit(OpCodes.Ldarg_S, (byte)12);
il.Emit(OpCodes.Ldarg_S, (byte)13);
il.Emit(OpCodes.Ldarg_S, (byte)14);
il.Emit(OpCodes.Ldarg_S, (byte)15);
il.Emit(OpCodes.Ldarg_S, (byte)16);
il.Emit(OpCodes.Newobj, CachedConstructor!);
}
else
{
il.Emit(OpCodes.Call, global::@FastGenericNew.ThrowHelper.GetSmartThrow<T>());
}
il.Emit(OpCodes.Ret);
CompiledDelegate = (Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15, T>)dm.CreateDelegate(typeof(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15, T>), global::@FastGenericNew._FastNewDynMetClosure.Instance);
#endif
}
}
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\obj\GX\FastGenericNew.SourceGenerator\FastGenericNew.SourceGenerator.Generator\ThrowHelper.g.cs" label="ThrowHelper.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by FastGenericNew.SourceGenerator
//     Please do not modify this file directly
// <auto-generated/>
//------------------------------------------------------------------------------
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Reflection.Emit;
using System.ComponentModel;

namespace @FastGenericNew
{

    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static partial class ThrowHelper
    {
        [MethodImpl(MethodImplOptions.NoInlining | MethodImplOptions.NoOptimization)]

#if NET5_0_OR_GREATER
        [DynamicDependency("SmartThrowImpl``1()", typeof(global::@FastGenericNew.ThrowHelper))]
#endif

        public static System.Reflection.MethodInfo GetSmartThrow<T>() => typeof(global::@FastGenericNew.ThrowHelper).GetMethod("SmartThrowImpl", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)!.MakeGenericMethod(typeof(T));

        public static T SmartThrowImpl<T>()
        {
            var qualifiedName = typeof(T).AssemblyQualifiedName;

            if (typeof(T).IsInterface)
                throw new System.MissingMethodException($"Cannot create an instance of an interface: '{ qualifiedName }'");

            if (typeof(T).IsAbstract)
                throw new System.MissingMethodException($"Cannot create an abstract class: '{ qualifiedName }'");

            throw new System.MissingMethodException($"No match constructor found in type: '{ qualifiedName }'");
        }
    }
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\obj\GX\FastGenericNew.SourceGenerator\FastGenericNew.SourceGenerator.Generator\TypeNew.CreateInstance.g.cs" label="TypeNew.CreateInstance.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by FastGenericNew.SourceGenerator
//     Please do not modify this file directly
// <auto-generated/>
//------------------------------------------------------------------------------
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Reflection.Emit;
using System.ComponentModel;

namespace @FastGenericNew
{
public static partial class FastNew{
public static Func<T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T>(Type type) =>
(Func<T>)typeof(FastNew<>).MakeGenericType(type).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0>(Type type, Type p0) =>
(Func<TArg0, T>)typeof(FastNew<,>).MakeGenericType(type, p0).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1>(Type type, Type p0, Type p1) =>
(Func<TArg0, TArg1, T>)typeof(FastNew<,,>).MakeGenericType(type, p0, p1).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2>(Type type, Type p0, Type p1, Type p2) =>
(Func<TArg0, TArg1, TArg2, T>)typeof(FastNew<,,,>).MakeGenericType(type, p0, p1, p2).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3>(Type type, Type p0, Type p1, Type p2, Type p3) =>
(Func<TArg0, TArg1, TArg2, TArg3, T>)typeof(FastNew<,,,,>).MakeGenericType(type, p0, p1, p2, p3).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, T>)typeof(FastNew<,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, T>)typeof(FastNew<,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, T>)typeof(FastNew<,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, T>)typeof(FastNew<,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, T>)typeof(FastNew<,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, T>)typeof(FastNew<,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9, Type p10) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, T>)typeof(FastNew<,,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9, Type p10, Type p11) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, T>)typeof(FastNew<,,,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9, Type p10, Type p11, Type p12) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, T>)typeof(FastNew<,,,,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9, Type p10, Type p11, Type p12, Type p13) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, T>)typeof(FastNew<,,,,,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9, Type p10, Type p11, Type p12, Type p13, Type p14) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, T>)typeof(FastNew<,,,,,,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14).GetField("CompiledDelegate")!.GetValue(null)!;public static Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15, T> GetCreateInstance<
#if NET5_0_OR_GREATER
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
#endif
T, TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15>(Type type, Type p0, Type p1, Type p2, Type p3, Type p4, Type p5, Type p6, Type p7, Type p8, Type p9, Type p10, Type p11, Type p12, Type p13, Type p14, Type p15) =>
(Func<TArg0, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, TArg8, TArg9, TArg10, TArg11, TArg12, TArg13, TArg14, TArg15, T>)typeof(FastNew<,,,,,,,,,,,,,,,,>).MakeGenericType(type, p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15).GetField("CompiledDelegate")!.GetValue(null)!;}
}

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\FastGenericNew\src\FastGenericNewDemo\obj\GX\FastGenericNew.SourceGenerator\FastGenericNew.SourceGenerator.Generator\_DynMetClosure.g.cs" label="_DynMetClosure.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by FastGenericNew.SourceGenerator
//     Please do not modify this file directly
// <auto-generated/>
//------------------------------------------------------------------------------
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Reflection.Emit;
using System.ComponentModel;

namespace @FastGenericNew
{

    [EditorBrowsable(EditorBrowsableState.Never)]
    internal sealed partial class _FastNewDynMetClosure
    {
        public static readonly Type[] InstanceOnlyArray = new Type[] { typeof(global::@FastGenericNew._FastNewDynMetClosure) };

        public static readonly global::@FastGenericNew._FastNewDynMetClosure Instance = new global::@FastGenericNew._FastNewDynMetClosure();
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project FastGenericNew ](/sources/FastGenericNew.zip)

:::


### Share FastGenericNew 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFastGenericNew&quote=FastGenericNew" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFastGenericNew&text=FastGenericNew:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFastGenericNew" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFastGenericNew&title=FastGenericNew" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFastGenericNew&title=FastGenericNew&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFastGenericNew" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/FastGenericNew

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [BenutomoAutomaticDisposeImplSourceGenerator](/docs/BenutomoAutomaticDisposeImplSourceGenerator)


### [CommunityToolkit.Mvvm](/docs/CommunityToolkit.Mvvm)


### [EnumClass](/docs/EnumClass)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [MorrisMoxy](/docs/MorrisMoxy)


### [NetEscapades.EnumGenerators](/docs/NetEscapades.EnumGenerators)


### [PropertyChangedSourceGenerator](/docs/PropertyChangedSourceGenerator)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Static](/docs/RSCG_Static)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.Json](/docs/System.Text.Json)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)

