---
sidebar_position: 1260
title: 126 - LinqGen.Generator
description: No-alloc for Linq operations
slug: /LinqGen.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementProject.mdx';

# LinqGen.Generator  by Maxwell Keonwoo Kang


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/LinqGen.Generator?label=LinqGen.Generator)](https://www.nuget.org/packages/LinqGen.Generator/)[![Nuget](https://img.shields.io/nuget/dt/LinqGen?label=LinqGen)](https://www.nuget.org/packages/LinqGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/cathei/LinqGen?label=updated)](https://github.com/cathei/LinqGen)
![GitHub Repo stars](https://img.shields.io/github/stars/cathei/LinqGen?style=social)

## Details

### Info
:::info

Name: **LinqGen.Generator**

Package Description

Author: Maxwell Keonwoo Kang

NuGet: 
*https://www.nuget.org/packages/LinqGen.Generator/*   

*https://www.nuget.org/packages/LinqGen/*   


You can find more details at https://github.com/cathei/LinqGen

Source: https://github.com/cathei/LinqGen

:::

### Original Readme
:::note

# LinqGen ⚡
[![Nuget](https://img.shields.io/nuget/v/LinqGen)](https://www.nuget.org/packages?q=LinqGen)
[![openupm](https://img.shields.io/npm/v/com.cathei.linqgen?label=openupm&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.cathei.linqgen/)
[![Discord](https://img.shields.io/discord/942240862354702376?color=%235865F2&label=discord&logo=discord&logoColor=%23FFFFFF)](https://discord.gg/kpuRTkpeQC)

## Linq meets Source Generator

LinqGen is project to optimize Linq queries using source generation of user code.

It aims to make allocation-free, specialized Linq queries per your type.

## Install
Install from NuGet, both [LinqGen](https://www.nuget.org/packages/LinqGen) as library and [LinqGen.Generator](https://www.nuget.org/packages/LinqGen.Generator) as incremental source generator.

```xml
<ItemGroup>
    <PackageReference Include="LinqGen" Version="0.3.1" />
    <PackageReference Include="LinqGen.Generator" Version="0.3.1" />
</ItemGroup>
```

For Unity, you can install as git package from Unity Package Manager.
```
https://github.com/cathei/LinqGen.git?path=LinqGen.Unity/Packages/com.cathei.linqgen
```
Or install via OpenUPM.
```
openupm add com.cathei.linqgen
```

### Any questions?

Feel free to make an issue, or ask me directly from [Discord](https://discord.gg/kpuRTkpeQC)!

## Usage
Just add `Gen()` in front of your Linq query.
It will generate code to ensure zero-allocation, may have slightly better performance.
```csharp
using Cathei.LinqGen;
 
int[] array = new int[] { 1, 2, 3, 4, 5 };

int result = array.Gen()
                  .Where(x => x % 2 == 0)
                  .Select(x => x * 2)
                  .Sum();
```

For additional performance boost, use struct functions with `IStructFunction` interface.
```csharp
int result = array.Gen()
                  .Where(new Predicate())
                  .Select(new Selector())
                  .Sum();
```

This is benchmark result for above code. You can see full benchmark results [here](https://github.com/cathei/LinqGen/docs/BenchmarksResults.

|             Method |  Count |     Mean |   Error |  StdDev | Ratio | Allocated | Alloc Ratio |
|------------------- |------- |---------:|--------:|--------:|------:|----------:|------------:|
|            ForLoop | 100000 | 449.8 us | 4.56 us | 4.27 us |  0.50 |         - |       0.000 |
|        ForEachLoop | 100000 | 444.3 us | 1.48 us | 1.39 us |  0.49 |         - |       0.000 |
|               Linq | 100000 | 899.8 us | 5.65 us | 5.01 us |  1.00 |     105 B |       1.000 |
|    LinqGenDelegate | 100000 | 576.2 us | 4.43 us | 4.14 us |  0.64 |       1 B |       0.010 |
|      LinqGenStruct | 100000 | 449.8 us | 4.06 us | 3.60 us |  0.50 |         - |       0.000 |

## Why not just use struct Linq implementations?

Because of [this issue](https://github.com/dotnet/runtime/discussions/77192),
struct linq implementations with many generics must do runtime lookup.
Which makes them not much faster than original Linq.

Also, they have to have bunch of type information and tricks for type inference.
Which makes your code hard to read and understand. The error messages or stack trace will be very messy as well.

Using source generation also makes your code friendly for AOT platforms, such as Unity,
which has [maximum generic depth](https://forum.unity.com/threads/il2cpp-max-nested-generic-types.540534/).

Being source generator makes `LinqGen` core library much small than other struct linq implementations, though it may grow as user uses Linq operations.

## How does LinqGen work?

LinqGen has two part of assembly, `LinqGen` and `LinqGen.Generator`.
The `LinqGen` assembly contains a stub method and types, which helps you autocomplete and helps generator infer types.

After you write a Linq query with stub methods, then `LinqGen.Generator` runs and replace the stub methods with generated methods.

How is it possible, while modifying user code is not allowed with source generators?
It's because everything `LinqGen.Generator` generates designed to be precede over stub methods on [overload resolution](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/expressions#11782-method-invocations).

## Does LinqGen works with Unity Burst compiler?

**Yes!** LinqGen is aiming to support Unity Burst compiler. Below code is sample of using LinqGen in Burst-compiled job system.

```csharp
[BurstCompile(CompileSynchronously = true)]
public struct LinqGenSampleJob : IJob
{
    [ReadOnly]
    public NativeArray<int> Input;

    [WriteOnly]
    public NativeArray<int> Output;

    public void Execute()
    {
        int index = 0;

        foreach (var item in Input.Gen()
                     .Select(new Selector())
                     .Order(new Comparer()))
        {
            Output[index++] = item;
        }
    }
}

public struct Selector : IStructFunction<int, int>
{
    public int Invoke(int arg) => arg * 10;
}

public struct Comparer : IComparer<int>
{
    public int Compare(int x, int y) => x - y;
}
```

## Supported methods (working-in-progress)
[List of Linq Operations](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/standard-query-operators-overview)

### Generations
* Empty
* Range
* Repeat

### Operations
* Select
* Where
* Cast, OfType
* Skip, Take, TakeLast
* SkipWhile, TakeWhile
* Distinct
* Order, OrderBy, OrderByDescending
* ThenBy, ThenByDescending
* GroupBy
* Concat
* Prepend, Append

### Evaluations
* GetEnumerator
* ToArray, ToList
* Any, All
* First, FirstOrDefault
* Last, LastOrDefault
* Count
* Aggregate
* Sum
  * Supports duck typing with `+` operator overload
* Min, Max
* MinBy, MaxBy

### Etc
* Gen
    * Converts IEnumerable to LinqGen enumerable
* AsEnumerable
    * Converts LinqGen enumerable to IEnumerable
* RemoveAll

## Limitations
* Element or key types that used with LinqGen must have at least `internal` accessibility.
* Struct enumerable should implement `IStructEnumerable<,>` interface.
* LinqGen queries should be treated as anonymous type, it cannot be used as return value or instance member. If you have these needs, use `AsEnumerable()` to convert.
* LinqGen may not work well when `[InternalsVisibleTo]` is used while both assemblies are using LinqGen. It can be solved when [this language feature](https://github.com/dotnet/csharplang/issues/6794) is implemented.

## Further readings
* Jon Skeet's [Edulinq](https://codeblog.jonskeet.uk/category/edulinq/), reimplementing Linq-to-objects.
* Article about [alloc-free Linq implementation and limitations](https://blog.devgenius.io/like-regular-linq-but-faster-and-without-allocations-is-it-possible-3d4724632e2a).


:::

### About
:::note

No-alloc for Linq operations


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **LinqGen.Generator**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="LinqGen" Version="0.3.1" />
    <PackageReference Include="LinqGen.Generator" Version="0.3.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinqGen.Generator\src\LinqDemo\Program.cs" label="Program.cs" >

  This is the use of **LinqGen.Generator** in *Program.cs*

```csharp showLineNumbers 
using Cathei.LinqGen;
int[] a= [1,2,3];
var s = a
    .Select(x => x * x)
    .Where(it => it < 8)
    .Sum()
;

var result = a.Gen()
                  .Select(x => x * x)
                  .Where(it => it < 8)
                  .Sum();

Console.WriteLine(s == result);
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinqGen.Generator\src\LinqDemo\obj\GX\LinqGen.Generator\Cathei.LinqGen.Generator.LinqGenIncrementalGenerator\LinqGen.Gen_3082270848.g.cs" label="LinqGen.Gen_3082270848.g.cs" >


```csharp showLineNumbers 
// DO NOT EDIT
// Generated by LinqGen.Generator
#nullable disable
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Cathei.LinqGen;
using Cathei.LinqGen.Hidden;

namespace Cathei.LinqGen.Hidden
{
    // Non-exported Enumerable should consider anonymous type, thus it will be internal
    internal struct Gen_wRtaM3 : IInternalStub<int>
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        internal Gen_wRtaM3(int[] source_wRtaM3) : this()
        {
            this.source_wRtaM3 = source_wRtaM3;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int Count() => this.source_wRtaM3.Length;
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public Select_6q5z23 Select(Func<int, int> selector_6q5z23) => new Select_6q5z23(this, selector_6q5z23);
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal int[] source_wRtaM3;
    }
}

namespace Cathei.LinqGen
{
    // Extension class needs to be internal to prevent ambiguous resolution
    internal static partial class LinqGenExtensions_Gen_wRtaM3
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static Gen_wRtaM3 Gen(this int[] source_wRtaM3) => new Gen_wRtaM3(source_wRtaM3);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinqGen.Generator\src\LinqDemo\obj\GX\LinqGen.Generator\Cathei.LinqGen.Generator.LinqGenIncrementalGenerator\LinqGen.Select_2792511626.g.cs" label="LinqGen.Select_2792511626.g.cs" >


```csharp showLineNumbers 
// DO NOT EDIT
// Generated by LinqGen.Generator
#nullable disable
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Cathei.LinqGen;
using Cathei.LinqGen.Hidden;

namespace Cathei.LinqGen.Hidden
{
    // Non-exported Enumerable should consider anonymous type, thus it will be internal
    internal struct Select_6q5z23 : IInternalStub<int>
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        internal Select_6q5z23(in Gen_wRtaM3 source, Func<int, int> selector_6q5z23) : this()
        {
            this.source_wRtaM3 = source.source_wRtaM3;
            this.selector_6q5z23 = selector_6q5z23;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int Count() => this.source_wRtaM3.Length;
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public Where_kc5pa1 Where(Func<int, bool> predicate_kc5pa1) => new Where_kc5pa1(this, predicate_kc5pa1);
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal int[] source_wRtaM3;
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal Func<int, int> selector_6q5z23;
    }
}

namespace Cathei.LinqGen
{
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\LinqGen.Generator\src\LinqDemo\obj\GX\LinqGen.Generator\Cathei.LinqGen.Generator.LinqGenIncrementalGenerator\LinqGen.Where_1460257278.g.cs" label="LinqGen.Where_1460257278.g.cs" >


```csharp showLineNumbers 
// DO NOT EDIT
// Generated by LinqGen.Generator
#nullable disable
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Cathei.LinqGen;
using Cathei.LinqGen.Hidden;

namespace Cathei.LinqGen.Hidden
{
    // Non-exported Enumerable should consider anonymous type, thus it will be internal
    internal struct Where_kc5pa1 : IInternalStub<int>
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        internal Where_kc5pa1(in Select_6q5z23 source, Func<int, bool> predicate_kc5pa1) : this()
        {
            this.source_wRtaM3 = source.source_wRtaM3;
            this.selector_6q5z23 = source.selector_6q5z23;
            this.predicate_kc5pa1 = predicate_kc5pa1;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        internal int[] source_wRtaM3;
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal Func<int, int> selector_6q5z23;
        [EditorBrowsable(EditorBrowsableState.Never)]
        internal Func<int, bool> predicate_kc5pa1;
    }
}

namespace Cathei.LinqGen
{
    // Extension class needs to be internal to prevent ambiguous resolution
    internal static partial class LinqGenExtensions_Where_kc5pa1
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static int Sum(this Where_kc5pa1 source)
        {
            int index_wRtaM3 = default;
            index_wRtaM3 = -1;
            int result_x5AfL3 = default;
            while (true)
            {
                if ((uint)++index_wRtaM3 >= (uint)source.source_wRtaM3.Length)
                    break;
                var current_wRtaM3 = source.source_wRtaM3[index_wRtaM3];
                var current_6q5z23 = source.selector_6q5z23.Invoke(current_wRtaM3);
                if (!source.predicate_kc5pa1.Invoke(current_6q5z23))
                    continue;
                result_x5AfL3 += current_6q5z23;
            }

            return result_x5AfL3;
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project LinqGen.Generator ](/sources/LinqGen.Generator.zip)

:::


### Share LinqGen.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinqGen.Generator&quote=LinqGen.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinqGen.Generator&text=LinqGen.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinqGen.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinqGen.Generator&title=LinqGen.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinqGen.Generator&title=LinqGen.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FLinqGen.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/LinqGen.Generator

aaa
<SameCategory />

