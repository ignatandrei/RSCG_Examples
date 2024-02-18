---
sidebar_position: 720
title: 72 - Meziantou.Polyfill
description: Generating polyfills that you can see source without de-compiling 
slug: /Meziantou.Polyfill
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Meziantou.Polyfill  by Gérald Barré


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Meziantou.Polyfill?label=Meziantou.Polyfill)](https://www.nuget.org/packages/Meziantou.Polyfill/)
[![GitHub last commit](https://img.shields.io/github/last-commit/meziantou/Meziantou.Polyfill?label=updated)](https://github.com/meziantou/Meziantou.Polyfill)
![GitHub Repo stars](https://img.shields.io/github/stars/meziantou/Meziantou.Polyfill?style=social)

## Details

### Info
:::info

Name: **Meziantou.Polyfill**

Source Generator to help multi-targeting projects.

Author: Gérald Barré

NuGet: 
*https://www.nuget.org/packages/Meziantou.Polyfill/*   


You can find more details at https://www.meziantou.net/polyfills-in-dotnet-to-ease-multi-targeting.htm

Source : https://github.com/meziantou/Meziantou.Polyfill

:::

### Original Readme
:::note

# Meziantou.Polyfill

Source Generator that adds polyfill methods and types. This helps working with multi-targeted projects.

You can use the following MSBuild properties to configure which polyfills are generated:

````xml
<PropertyGroup>
  <!-- semi-column separated list of name prefix -->
  <!-- Tip: The name of the generated polyfills are available in the generated "Debug.g.cs" file -->
  <MeziantouPolyfill_IncludedPolyfills>T:Type1|T:Type2|M:Member1</MeziantouPolyfill_IncludedPolyfills>
  <MeziantouPolyfill_ExcludedPolyfills>M:System.Diagnostics.</MeziantouPolyfill_ExcludedPolyfills>

  <!-- Optional: Output the generated files to the obj\GeneratedFiles folder  -->
  <EmitCompilerGeneratedFiles>True</EmitCompilerGeneratedFiles>
  <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GeneratedFiles</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
````

## How to add a new polyfill

- Create a new file named `<xml documentation id>.cs` in the project `Meziantou.Polyfill.Editor`
- Run `Meziantou.Polyfill.Generator`

Notes:
- All files must be self contained. Use a `file class` if needed.
- If you need to generate a file only when another polyfill is generated, add `// when <xml documentation id>` in the file


:::

### About
:::note

Generating polyfills that you can see source without de-compiling 


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Meziantou.Polyfill**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFrameworks>net7.0;netstandard2.0</TargetFrameworks>
	  <LangVersion>latest</LangVersion>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Meziantou.Polyfill" Version="1.0.28">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\Program.cs" label="Program.cs" >

  This is the use of **Meziantou.Polyfill** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
System.Console.WriteLine("Hello, World!");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\StartProcess.cs" label="StartProcess.cs" >

  This is the use of **Meziantou.Polyfill** in *StartProcess.cs*

```csharp showLineNumbers 
using System.Diagnostics;
using System.Threading.Tasks;

namespace Meziantou.PolyfillDemo
{

    internal class StartProcess
    {
        static async Task StartNotepad()
        {
            await Task.Delay(1000);
            var process = Process.Start("notepad.exe");

#if NET6_0_OR_GREATER
           await process.WaitForExitAsync();
#else
            process.WaitForExit();
#endif
            
        }
        static async Task StartNotepadPolyFill()
        {
            await Task.Delay(1000);
            var process = Process.Start("notepad.exe");
            //do remove nuget Meziantou.Polyfill - this line will not be ok.
            await process.WaitForExitAsync();

        }

    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\Debug.g.cs" label="Debug.g.cs" >


```csharp showLineNumbers 
// IncludedMembers: <null>
// ExcludedMembers: <null>
// System.Collections.Immutable.ImmutableArray`1: False
// System.Memory`1: False
// System.Net.Http.HttpContent: True
// System.ReadOnlyMemory`1: False
// System.ReadOnlySpan`1: False
// System.Span`1: False
// System.Threading.Tasks.ValueTask: False
// System.Threading.Tasks.ValueTask`1: False
//
// M:System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd``1(`0,System.Func{`0,``0,`1},``0): True
// M:System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0): True
// M:System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0,``1): True
// M:System.Collections.Generic.KeyValuePair`2.Deconstruct(`0@,`1@): True
// M:System.Collections.Generic.Queue`1.TryDequeue(`0@): True
// M:System.Collections.Immutable.ImmutableArray`1.AsSpan(System.Int32,System.Int32): False
// M:System.Collections.Immutable.ImmutableArray`1.AsSpan(System.Range): False
// M:System.Diagnostics.Process.WaitForExitAsync(System.Threading.CancellationToken): True
// M:System.IO.Stream.Read(System.Span{System.Byte}): False
// M:System.IO.Stream.ReadAsync(System.Memory{System.Byte},System.Threading.CancellationToken): False
// M:System.IO.Stream.ReadAtLeast(System.Span{System.Byte},System.Int32,System.Boolean): False
// M:System.IO.Stream.ReadAtLeastAsync(System.Memory{System.Byte},System.Int32,System.Boolean,System.Threading.CancellationToken): False
// M:System.IO.Stream.Write(System.ReadOnlySpan{System.Byte}): False
// M:System.IO.Stream.WriteAsync(System.ReadOnlyMemory{System.Byte},System.Threading.CancellationToken): False
// M:System.IO.StreamReader.ReadLineAsync(): False
// M:System.IO.StreamReader.ReadLineAsync(System.Threading.CancellationToken): False
// M:System.IO.TextReader.ReadAsync(System.Memory{System.Char},System.Threading.CancellationToken): False
// M:System.IO.TextReader.ReadToEndAsync(System.Threading.CancellationToken): True
// M:System.IO.TextWriter.WriteAsync(System.ReadOnlyMemory{System.Char},System.Threading.CancellationToken): False
// M:System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}): True
// M:System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IEqualityComparer{``1}): True
// M:System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}): True
// M:System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}): True
// M:System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}): True
// M:System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}): True
// M:System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0}): True
// M:System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}): True
// M:System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0}): True
// M:System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}): True
// M:System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0}): True
// M:System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEqualityComparer{``0}): True
// M:System.Linq.Enumerable.Zip``2(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1}): True
// M:System.MemoryExtensions.AsSpan(System.String,System.Int32,System.Int32): False
// M:System.MemoryExtensions.Contains``1(System.ReadOnlySpan{``0},``0): False
// M:System.MemoryExtensions.Contains``1(System.Span{``0},``0): False
// M:System.Net.Http.HttpContent.CopyTo(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken): True
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream): False
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Net.TransportContext): False
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken): True
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Threading.CancellationToken): True
// M:System.Net.Http.HttpContent.ReadAsStream(System.Threading.CancellationToken): True
// M:System.Net.Http.HttpContent.ReadAsStream: True
// M:System.String.Contains(System.Char): True
// M:System.String.Contains(System.Char,System.StringComparison): True
// M:System.String.Contains(System.String,System.StringComparison): True
// M:System.String.CopyTo(System.Span{System.Char}): False
// M:System.String.EndsWith(System.Char): True
// M:System.String.GetHashCode(System.StringComparison): True
// M:System.String.IndexOf(System.Char,System.StringComparison): True
// M:System.String.Replace(System.String,System.String,System.StringComparison): True
// M:System.String.ReplaceLineEndings(System.String): True
// M:System.String.ReplaceLineEndings: True
// M:System.String.Split(System.Char,System.Int32,System.StringSplitOptions): True
// M:System.String.Split(System.Char,System.StringSplitOptions): True
// M:System.String.StartsWith(System.Char): True
// M:System.String.TryCopyTo(System.Span{System.Char}): False
// M:System.Text.Encoding.GetString(System.ReadOnlySpan{System.Byte}): False
// M:System.Text.StringBuilder.Append(System.ReadOnlyMemory{System.Char}): False
// M:System.Text.StringBuilder.Append(System.ReadOnlySpan{System.Char}): False
// M:System.Text.StringBuilder.AppendJoin(System.Char,System.Object[]): True
// M:System.Text.StringBuilder.AppendJoin(System.Char,System.String[]): True
// M:System.Text.StringBuilder.AppendJoin(System.String,System.Object[]): True
// M:System.Text.StringBuilder.AppendJoin(System.String,System.String[]): True
// M:System.Text.StringBuilder.AppendJoin``1(System.Char,System.Collections.Generic.IEnumerable{``0}): True
// M:System.Text.StringBuilder.AppendJoin``1(System.String,System.Collections.Generic.IEnumerable{``0}): True
// M:System.Threading.CancellationTokenSource.CancelAsync: True
// M:System.Threading.Tasks.Task.WaitAsync(System.Threading.CancellationToken): True
// T:System.Collections.Generic.PriorityQueue`2: True
// T:System.Collections.Generic.ReferenceEqualityComparer: True
// T:System.Diagnostics.CodeAnalysis.AllowNullAttribute: True
// T:System.Diagnostics.CodeAnalysis.DisallowNullAttribute: True
// T:System.Diagnostics.CodeAnalysis.DoesNotReturnAttribute: True
// T:System.Diagnostics.CodeAnalysis.DoesNotReturnIfAttribute: True
// T:System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute: True
// T:System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes: True
// T:System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute: True
// T:System.Diagnostics.CodeAnalysis.MaybeNullAttribute: True
// T:System.Diagnostics.CodeAnalysis.MaybeNullWhenAttribute: True
// T:System.Diagnostics.CodeAnalysis.MemberNotNullAttribute: True
// T:System.Diagnostics.CodeAnalysis.MemberNotNullWhenAttribute: True
// T:System.Diagnostics.CodeAnalysis.NotNullAttribute: True
// T:System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute: True
// T:System.Diagnostics.CodeAnalysis.NotNullWhenAttribute: True
// T:System.Diagnostics.CodeAnalysis.RequiresAssemblyFilesAttribute: True
// T:System.Diagnostics.CodeAnalysis.RequiresDynamicCodeAttribute: True
// T:System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute: True
// T:System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute: True
// T:System.Diagnostics.CodeAnalysis.StringSyntaxAttribute: True
// T:System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute: True
// T:System.Diagnostics.CodeAnalysis.UnscopedRefAttribute: True
// T:System.Diagnostics.StackTraceHiddenAttribute: True
// T:System.HashCode: True
// T:System.Index: True
// T:System.Net.Http.ReadOnlyMemoryContent: False
// T:System.Range: True
// T:System.Runtime.CompilerServices.AsyncMethodBuilderAttribute: True
// T:System.Runtime.CompilerServices.CallerArgumentExpressionAttribute: True
// T:System.Runtime.CompilerServices.CollectionBuilderAttribute: True
// T:System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute: True
// T:System.Runtime.CompilerServices.DisableRuntimeMarshallingAttribute: True
// T:System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute: True
// T:System.Runtime.CompilerServices.InterpolatedStringHandlerAttribute: True
// T:System.Runtime.CompilerServices.IsExternalInit: True
// T:System.Runtime.CompilerServices.ModuleInitializerAttribute: True
// T:System.Runtime.CompilerServices.RequiredMemberAttribute: True
// T:System.Runtime.CompilerServices.SkipLocalsInitAttribute: True
// T:System.Runtime.CompilerServices.TupleElementNamesAttribute: False
// T:System.Runtime.InteropServices.SuppressGCTransitionAttribute: True
// T:System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute: True
// T:System.Runtime.Versioning.ObsoletedOSPlatformAttribute: True
// T:System.Runtime.Versioning.RequiresPreviewFeaturesAttribute: True
// T:System.Runtime.Versioning.SupportedOSPlatformAttribute: True
// T:System.Runtime.Versioning.SupportedOSPlatformGuardAttribute: True
// T:System.Runtime.Versioning.TargetPlatformAttribute: True
// T:System.Runtime.Versioning.UnsupportedOSPlatformAttribute: True
// T:System.Runtime.Versioning.UnsupportedOSPlatformGuardAttribute: True
// T:System.Threading.Tasks.TaskToAsyncResult: True
// T:System.ValueTuple: False
// T:System.ValueTuple`1: False
// T:System.ValueTuple`2: False
// T:System.ValueTuple`3: False
// T:System.ValueTuple`4: False
// T:System.ValueTuple`5: False
// T:System.ValueTuple`6: False
// T:System.ValueTuple`7: False
// T:System.ValueTuple`8: False
// T:System.ITupleInternal: False

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd``1(`0,System.Func{`0,``0,`1},``0).g.cs" label="M_System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd``1(`0,System.Func{`0,``0,`1},``0).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Concurrent;

static partial class PolyfillExtensions
{
    public static TValue GetOrAdd<TKey, TValue, TArg>(this ConcurrentDictionary<TKey, TValue> target, TKey key, Func<TKey, TArg, TValue> valueFactory, TArg factoryArgument)
        where TKey : notnull
    {
        return target.GetOrAdd(key, key => valueFactory(key, factoryArgument));
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0).g.cs" label="M_System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static TValue GetValueOrDefault<TKey, TValue>(this IReadOnlyDictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue)
        => dictionary.TryGetValue(key, out TValue? value) ? value : defaultValue;
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0,``1).g.cs" label="M_System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0,``1).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static TValue? GetValueOrDefault<TKey, TValue>(this IReadOnlyDictionary<TKey, TValue> dictionary, TKey key)
        => dictionary.GetValueOrDefault(key, default!);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Collections.Generic.KeyValuePair`2.Deconstruct(`0_,`1_).g.cs" label="M_System.Collections.Generic.KeyValuePair`2.Deconstruct(`0_,`1_).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static void Deconstruct<TKey, TValue>(this KeyValuePair<TKey, TValue> target, out TKey key, out TValue value)
    {
        key = target.Key;
        value = target.Value;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Collections.Generic.Queue`1.TryDequeue(`0_).g.cs" label="M_System.Collections.Generic.Queue`1.TryDequeue(`0_).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

static partial class PolyfillExtensions
{
    public static bool TryDequeue<T>(this Queue<T> target, [MaybeNullWhen(false)] out T result)
    {
        if (target.Count == 0)
        {
            result = default;
            return false;
        }

        result = target.Dequeue();
        return true;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Diagnostics.Process.WaitForExitAsync(System.Threading.CancellationToken).g.cs" label="M_System.Diagnostics.Process.WaitForExitAsync(System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Threading.Tasks;
using System.Threading;
using System.Diagnostics;
using System;

static partial class PolyfillExtensions
{
    public static async Task WaitForExitAsync(this Process target, CancellationToken cancellationToken = default)
    {
        // https://source.dot.net/#System.Diagnostics.Process/System/Diagnostics/Process.cs,b6a5b00714a61f06
        // Because the process has already started by the time this method is called,
        // we're in a race against the process to set up our exit handlers before the process
        // exits. As a result, there are several different flows that must be handled:
        //
        // CASE 1: WE ENABLE EVENTS
        // This is the "happy path". In this case we enable events.
        //
        // CASE 1.1: PROCESS EXITS OR IS CANCELED AFTER REGISTERING HANDLER
        // This case continues the "happy path". The process exits or waiting is canceled after
        // registering the handler and no special cases are needed.
        //
        // CASE 1.2: PROCESS EXITS BEFORE REGISTERING HANDLER
        // It's possible that the process can exit after we enable events but before we reigster
        // the handler. In that case we must check for exit after registering the handler.
        //
        //
        // CASE 2: PROCESS EXITS BEFORE ENABLING EVENTS
        // The process may exit before we attempt to enable events. In that case EnableRaisingEvents
        // will throw an exception like this:
        //     System.InvalidOperationException : Cannot process request because the process (42) has exited.
        // In this case we catch the InvalidOperationException. If the process has exited, our work
        // is done and we return. If for any reason (now or in the future) enabling events fails
        // and the process has not exited, bubble the exception up to the user.
        //
        //
        // CASE 3: USER ALREADY ENABLED EVENTS
        // In this case the user has already enabled raising events. Re-enabling events is a no-op
        // as the value hasn't changed. However, no-op also means that if the process has already
        // exited, EnableRaisingEvents won't throw an exception.
        //
        // CASE 3.1: PROCESS EXITS OR IS CANCELED AFTER REGISTERING HANDLER
        // (See CASE 1.1)
        //
        // CASE 3.2: PROCESS EXITS BEFORE REGISTERING HANDLER
        // (See CASE 1.2)
        if (!target.HasExited)
        {
            // Early out for cancellation before doing more expensive work
            cancellationToken.ThrowIfCancellationRequested();
        }
        try
        {
            // CASE 1: We enable events
            // CASE 2: Process exits before enabling events (and throws an exception)
            // CASE 3: User already enabled events (no-op)
            target.EnableRaisingEvents = true;
        }
        catch (InvalidOperationException)
        {
            // CASE 2: If the process has exited, our work is done, otherwise bubble the
            // exception up to the user
            if (target.HasExited)
            {
                return;
            }
            throw;
        }
        var tcs = new TaskCompletionSourceWithCancellation<bool>();
        void Handler(object? s, EventArgs e) => tcs.TrySetResult(true);
        target.Exited += Handler;
        try
        {
            if (target.HasExited)
            {
                // CASE 1.2 & CASE 3.2: Handle race where the process exits before registering the handler
                return;
            }
            // CASE 1.1 & CASE 3.1: Process exits or is canceled here
            await tcs.WaitWithCancellationAsync(cancellationToken).ConfigureAwait(false);
        }
        finally
        {
            target.Exited -= Handler;
        }

        target.WaitForExit();
    }

    private sealed class TaskCompletionSourceWithCancellation<T> : TaskCompletionSource<T>
    {
        private CancellationToken _cancellationToken;
        public TaskCompletionSourceWithCancellation() : base(TaskCreationOptions.RunContinuationsAsynchronously)
        {
        }
        private void OnCancellation()
        {
            TrySetCanceled(_cancellationToken);
        }
#if NETCOREAPP3_1_OR_GREATER
        public async ValueTask<T> WaitWithCancellationAsync(CancellationToken cancellationToken)
        {
            _cancellationToken = cancellationToken;
            await using (cancellationToken.UnsafeRegister(s => ((TaskCompletionSourceWithCancellation<T>)s!).OnCancellation(), this))
            {
                return await Task.ConfigureAwait(false);
            }
        }
#else
        public async Task<T> WaitWithCancellationAsync(CancellationToken cancellationToken)
        {
            _cancellationToken = cancellationToken;
            using (cancellationToken.Register(s => ((TaskCompletionSourceWithCancellation<T>)s!).OnCancellation(), this))
            {
                return await Task.ConfigureAwait(false);
            }
        }
#endif
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.IO.TextReader.ReadToEndAsync(System.Threading.CancellationToken).g.cs" label="M_System.IO.TextReader.ReadToEndAsync(System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.IO;
using System.Threading;
using System.Threading.Tasks;

static partial class PolyfillExtensions
{
    public static Task<string> ReadToEndAsync(this TextReader target, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return target.ReadToEndAsync();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}).g.cs" label="M_System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector, IEqualityComparer<TKey>? comparer)
    {
        var hashSet = new HashSet<TKey>(comparer);
        foreach (var item in source)
        {
            var key = keySelector(item);
            if (hashSet.Add(key))
                yield return item;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IEqualityComparer{``1}).g.cs" label="M_System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IEqualityComparer{``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
    {
        var hashSet = new HashSet<TKey>();
        foreach (var item in source)
        {
            var key = keySelector(item);
            if (hashSet.Add(key))
                yield return item;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}).g.cs" label="M_System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static TSource? MaxBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
    {
        return source.MaxBy(keySelector, comparer: null);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}).g.cs" label="M_System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static TSource? MaxBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector, IComparer<TKey>? comparer)
    {
        if (source == null)
            throw new ArgumentNullException(nameof(source));

        if (keySelector == null)
            throw new ArgumentNullException(nameof(keySelector));

        comparer ??= Comparer<TKey>.Default;

        using IEnumerator<TSource> e = source.GetEnumerator();

        if (!e.MoveNext())
        {
            if (default(TSource) is null)
            {
                return default;
            }
            else
            {
                throw new InvalidOperationException("Sequence contains no elements");
            }
        }

        TSource value = e.Current;
        TKey key = keySelector(value);

        if (default(TKey) is null)
        {
            if (key == null)
            {
                TSource firstValue = value;

                do
                {
                    if (!e.MoveNext())
                    {
                        // All keys are null, surface the first element.
                        return firstValue;
                    }

                    value = e.Current;
                    key = keySelector(value);
                }
                while (key == null);
            }

            while (e.MoveNext())
            {
                TSource nextValue = e.Current;
                TKey nextKey = keySelector(nextValue);
                if (nextKey != null && comparer.Compare(nextKey, key) > 0)
                {
                    key = nextKey;
                    value = nextValue;
                }
            }
        }
        else
        {
            if (comparer == Comparer<TKey>.Default)
            {
                while (e.MoveNext())
                {
                    TSource nextValue = e.Current;
                    TKey nextKey = keySelector(nextValue);
                    if (Comparer<TKey>.Default.Compare(nextKey, key) > 0)
                    {
                        key = nextKey;
                        value = nextValue;
                    }
                }
            }
            else
            {
                while (e.MoveNext())
                {
                    TSource nextValue = e.Current;
                    TKey nextKey = keySelector(nextValue);
                    if (comparer.Compare(nextKey, key) > 0)
                    {
                        key = nextKey;
                        value = nextValue;
                    }
                }
            }
        }

        return value;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}).g.cs" label="M_System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static TSource? MinBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
    {
        return source.MinBy(keySelector, comparer: null);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}).g.cs" label="M_System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static TSource? MinBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector, IComparer<TKey>? comparer)
    {
        if (source == null)
            throw new ArgumentNullException(nameof(source));

        if (keySelector == null)
            throw new ArgumentNullException(nameof(keySelector));

        comparer ??= Comparer<TKey>.Default;

        using IEnumerator<TSource> e = source.GetEnumerator();

        if (!e.MoveNext())
        {
            if (default(TSource) is null)
            {
                return default;
            }
            else
            {
                throw new InvalidOperationException("Sequence contains no elements");
            }
        }

        TSource value = e.Current;
        TKey key = keySelector(value);

        if (default(TKey) is null)
        {
            if (key == null)
            {
                TSource firstValue = value;

                do
                {
                    if (!e.MoveNext())
                    {
                        // All keys are null, surface the first element.
                        return firstValue;
                    }

                    value = e.Current;
                    key = keySelector(value);
                }
                while (key == null);
            }

            while (e.MoveNext())
            {
                TSource nextValue = e.Current;
                TKey nextKey = keySelector(nextValue);
                if (nextKey != null && comparer.Compare(nextKey, key) < 0)
                {
                    key = nextKey;
                    value = nextValue;
                }
            }
        }
        else
        {
            if (comparer == Comparer<TKey>.Default)
            {
                while (e.MoveNext())
                {
                    TSource nextValue = e.Current;
                    TKey nextKey = keySelector(nextValue);
                    if (Comparer<TKey>.Default.Compare(nextKey, key) < 0)
                    {
                        key = nextKey;
                        value = nextValue;
                    }
                }
            }
            else
            {
                while (e.MoveNext())
                {
                    TSource nextValue = e.Current;
                    TKey nextKey = keySelector(nextValue);
                    if (comparer.Compare(nextKey, key) < 0)
                    {
                        key = nextKey;
                        value = nextValue;
                    }
                }
            }
        }

        return value;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0}).g.cs" label="M_System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Linq;

static partial class PolyfillExtensions
{
    public static IOrderedEnumerable<T> OrderDescending<T>(this IEnumerable<T> source)
    {
        return source.OrderByDescending(_ => _);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}).g.cs" label="M_System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Linq;

static partial class PolyfillExtensions
{
    public static IOrderedEnumerable<T> OrderDescending<T>(this IEnumerable<T> source, IComparer<T>? comparer)
    {
        return source.OrderByDescending(_ => _, comparer);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0}).g.cs" label="M_System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Linq;

static partial class PolyfillExtensions
{
    public static IOrderedEnumerable<T> Order<T>(this IEnumerable<T> source)
    {
        return source.OrderBy(_ => _);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}).g.cs" label="M_System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Linq;

static partial class PolyfillExtensions
{
    public static IOrderedEnumerable<T> Order<T>(this IEnumerable<T> source, IComparer<T>? comparer)
    {
        return source.OrderBy(_ => _, comparer);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0}).g.cs" label="M_System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static HashSet<TSource> ToHashSet<TSource>(this IEnumerable<TSource> source)
        => source.ToHashSet(null);
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEqualityComparer{``0}).g.cs" label="M_System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEqualityComparer{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;

static partial class PolyfillExtensions
{
    public static HashSet<TSource> ToHashSet<TSource>(this IEnumerable<TSource> source, IEqualityComparer<TSource>? comparer)
        => new HashSet<TSource>(source, comparer);
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Linq.Enumerable.Zip``2(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1}).g.cs" label="M_System.Linq.Enumerable.Zip``2(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Linq;

static partial class PolyfillExtensions
{
    public static IEnumerable<(TFirst left, TSecond right)> Zip<TFirst, TSecond>(this IEnumerable<TFirst> first, IEnumerable<TSecond> second)
    {
        return first.Zip(second, (x, y) => (x, y));
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Net.Http.HttpContent.CopyTo(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken).g.cs" label="M_System.Net.Http.HttpContent.CopyTo(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading;

static partial class PolyfillExtensions
{
    public static void CopyTo(this HttpContent target, Stream stream, TransportContext? context, CancellationToken cancellationToken)
    {
        target.CopyToAsync(stream, context, cancellationToken).Wait(cancellationToken);
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken).g.cs" label="M_System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

static partial class PolyfillExtensions
{
    public static async Task CopyToAsync(this HttpContent target, Stream stream, TransportContext? context, CancellationToken cancellationToken)
    {
        if (stream == null)
            throw new ArgumentNullException(nameof(stream));

        var method = typeof(HttpContent).GetMethod("SerializeToStreamAsync", 
            BindingFlags.NonPublic | BindingFlags.Instance, 
            binder: null, 
            new Type[] { typeof(Stream), typeof(TransportContext) },
            modifiers: null);

        await (Task)method!.Invoke(target, new object?[] { stream, context })!;
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Threading.CancellationToken).g.cs" label="M_System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

static partial class PolyfillExtensions
{
    public static Task CopyToAsync(this HttpContent target, Stream stream, CancellationToken cancellationToken) => target.CopyToAsync(stream, cancellationToken);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Net.Http.HttpContent.ReadAsStream(System.Threading.CancellationToken).g.cs" label="M_System.Net.Http.HttpContent.ReadAsStream(System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.IO;
using System.Net.Http;
using System.Threading;

static partial class PolyfillExtensions
{
    public static Stream ReadAsStream(this HttpContent httpContent, CancellationToken cancellationToken)
    {
        var ms = new MemoryStream();
        httpContent.CopyTo(ms, context: null, cancellationToken);
        ms.Seek(0, SeekOrigin.Begin);
        return ms;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Net.Http.HttpContent.ReadAsStream.g.cs" label="M_System.Net.Http.HttpContent.ReadAsStream.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.IO;
using System.Net.Http;
using System.Threading;

static partial class PolyfillExtensions
{
    public static Stream ReadAsStream(this HttpContent httpContent)
    {
        return httpContent.ReadAsStream(CancellationToken.None);    
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.Contains(System.Char).g.cs" label="M_System.String.Contains(System.Char).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
	public static bool Contains(this string target, char value)
	{
		return target.IndexOf(value) != -1;
	}
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.Contains(System.Char,System.StringComparison).g.cs" label="M_System.String.Contains(System.Char,System.StringComparison).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
	public static bool Contains(this string target, char value, System.StringComparison comparisonType)
	{
		return target.IndexOf(value, comparisonType) != -1;
	}
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.Contains(System.String,System.StringComparison).g.cs" label="M_System.String.Contains(System.String,System.StringComparison).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
	public static bool Contains(this string target, string value, System.StringComparison comparisonType)
	{
		return target.IndexOf(value, comparisonType) != -1;
	}
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.EndsWith(System.Char).g.cs" label="M_System.String.EndsWith(System.Char).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
    public static bool EndsWith(this string target, char value)
    {
        return target.Length > 0 && target[target.Length - 1] == value;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.GetHashCode(System.StringComparison).g.cs" label="M_System.String.GetHashCode(System.StringComparison).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;

static partial class PolyfillExtensions
{
    public static int GetHashCode(this string target, StringComparison comparisonType)
    {
        return Helpers.FromComparison(comparisonType).GetHashCode(target);
    }
}

file class Helpers
{
    public static StringComparer FromComparison(StringComparison comparisonType) =>
        comparisonType switch
        {
            StringComparison.CurrentCulture => StringComparer.CurrentCulture,
            StringComparison.CurrentCultureIgnoreCase => StringComparer.CurrentCultureIgnoreCase,
            StringComparison.InvariantCulture => StringComparer.InvariantCulture,
            StringComparison.InvariantCultureIgnoreCase => StringComparer.InvariantCultureIgnoreCase,
            StringComparison.Ordinal => StringComparer.Ordinal,
            StringComparison.OrdinalIgnoreCase => StringComparer.OrdinalIgnoreCase,
            _ => throw new ArgumentException("The string comparison type passed in is currently not supported.", nameof(comparisonType)),
        };
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.IndexOf(System.Char,System.StringComparison).g.cs" label="M_System.String.IndexOf(System.Char,System.StringComparison).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
    public static int IndexOf(this string target, char value, System.StringComparison comparisonType)
    {
        return target.IndexOf(value.ToString(), comparisonType);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.Replace(System.String,System.String,System.StringComparison).g.cs" label="M_System.String.Replace(System.String,System.String,System.StringComparison).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Text;

static partial class PolyfillExtensions
{
    public static string Replace(this string target, string oldValue, string? newValue, StringComparison comparisonType)
    {
        if (oldValue == null)
            throw new ArgumentNullException(nameof(oldValue));

        if (oldValue == "")
            throw new ArgumentException("The value cannot be an empty string.", nameof(oldValue));

        var sb = new StringBuilder();

        var previousIndex = 0;
        while (target.IndexOf(oldValue, previousIndex, comparisonType) is var index and not -1)
        {
            sb.Append(target, previousIndex, index - previousIndex);
            sb.Append(newValue);
            previousIndex = index + oldValue.Length;
        }

        sb.Append(target, previousIndex, target.Length - previousIndex);
        return sb.ToString();
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.ReplaceLineEndings(System.String).g.cs" label="M_System.String.ReplaceLineEndings(System.String).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Text;

static partial class PolyfillExtensions
{
    public static string ReplaceLineEndings(this string target, string replacementText)
    {
        var sb = new StringBuilder();

        var previousIndex = 0;
        while (target.IndexOfAny(Constants.NewLineChars, previousIndex) is var index and not -1)
        {
            sb.Append(target, previousIndex, index - previousIndex);
            sb.Append(replacementText);

            previousIndex = index + 1;
            if (target[index] == '\r' && index + 1 < target.Length && target[index + 1] == '\n')
            {
                previousIndex++;
            }
        }

        sb.Append(target, previousIndex, target.Length - previousIndex);
        return sb.ToString();
    }
}

file static class Constants
{
    public static readonly char[] NewLineChars = new char[] { '\n', '\r', '\f', '\u0085', '\u2028', '\u2029' };
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.ReplaceLineEndings.g.cs" label="M_System.String.ReplaceLineEndings.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
    public static string ReplaceLineEndings(this string target)
    {
        return target.ReplaceLineEndings(System.Environment.NewLine);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.Split(System.Char,System.Int32,System.StringSplitOptions).g.cs" label="M_System.String.Split(System.Char,System.Int32,System.StringSplitOptions).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;

static partial class PolyfillExtensions
{
    public static string[] Split(this string target, char separator, int count, StringSplitOptions options = StringSplitOptions.None)
    {
        return target.Split(new char[] { separator }, count, options);
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.Split(System.Char,System.StringSplitOptions).g.cs" label="M_System.String.Split(System.Char,System.StringSplitOptions).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;

static partial class PolyfillExtensions
{
    public static string[] Split(this string target, char separator, StringSplitOptions options = StringSplitOptions.None)
    {
        return target.Split(new char[] { separator }, options);
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.String.StartsWith(System.Char).g.cs" label="M_System.String.StartsWith(System.Char).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
static partial class PolyfillExtensions
{
    public static bool StartsWith(this string target, char value)
    {
        return target.Length > 0 && target[0] == value;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Text.StringBuilder.AppendJoin(System.Char,System.Object[]).g.cs" label="M_System.Text.StringBuilder.AppendJoin(System.Char,System.Object[]).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Text;

static partial class PolyfillExtensions
{
    public static StringBuilder AppendJoin(this StringBuilder target, char separator, params object?[] values)
    {
        var first = true;
        foreach (var value in values)
        {
            if (!first)
            {
                target.Append(separator);
            }

            target.Append(value);
            first = false;
        }

        return target;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Text.StringBuilder.AppendJoin(System.Char,System.String[]).g.cs" label="M_System.Text.StringBuilder.AppendJoin(System.Char,System.String[]).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Text;

static partial class PolyfillExtensions
{
    public static StringBuilder AppendJoin(this StringBuilder target, char separator, params string?[] values)
    {
        var first = true;
        foreach (var value in values)
        {
            if (!first)
            {
                target.Append(separator);
            }

            target.Append(value);
            first = false;
        }

        return target;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Text.StringBuilder.AppendJoin(System.String,System.Object[]).g.cs" label="M_System.Text.StringBuilder.AppendJoin(System.String,System.Object[]).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Text;

static partial class PolyfillExtensions
{
    public static StringBuilder AppendJoin(this StringBuilder target, string? separator, params object?[] values)
    {
        var first = true;
        foreach (var value in values)
        {
            if (!first)
            {
                target.Append(separator);
            }

            target.Append(value);
            first = false;
        }

        return target;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Text.StringBuilder.AppendJoin(System.String,System.String[]).g.cs" label="M_System.Text.StringBuilder.AppendJoin(System.String,System.String[]).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Text;

static partial class PolyfillExtensions
{
    public static StringBuilder AppendJoin(this StringBuilder target, string? separator, params string?[] values)
    {
        var first = true;
        foreach (var value in values)
        {
            if (!first)
            {
                target.Append(separator);
            }

            target.Append(value);
            first = false;
        }

        return target;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Text.StringBuilder.AppendJoin``1(System.Char,System.Collections.Generic.IEnumerable{``0}).g.cs" label="M_System.Text.StringBuilder.AppendJoin``1(System.Char,System.Collections.Generic.IEnumerable{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Text;

static partial class PolyfillExtensions
{
    public static StringBuilder AppendJoin<T>(this StringBuilder target, char separator, IEnumerable<T> values)
    {
        var first = true;
        foreach (var value in values)
        {
            if (!first)
            {
                target.Append(separator);
            }

            target.Append(value);
            first = false;
        }

        return target;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Text.StringBuilder.AppendJoin``1(System.String,System.Collections.Generic.IEnumerable{``0}).g.cs" label="M_System.Text.StringBuilder.AppendJoin``1(System.String,System.Collections.Generic.IEnumerable{``0}).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Collections.Generic;
using System.Text;

static partial class PolyfillExtensions
{
    public static StringBuilder AppendJoin<T>(this StringBuilder target, string? separator, IEnumerable<T> values)
    {
        var first = true;
        foreach (var value in values)
        {
            if (!first)
            {
                target.Append(separator);
            }

            target.Append(value);
            first = false;
        }

        return target;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Threading.CancellationTokenSource.CancelAsync.g.cs" label="M_System.Threading.CancellationTokenSource.CancelAsync.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Threading;
using System.Threading.Tasks;

static partial class PolyfillExtensions
{
    public static Task CancelAsync(this CancellationTokenSource target)
    {
        target.Cancel();
        return Task.CompletedTask;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Threading.Tasks.Task.WaitAsync(System.Threading.CancellationToken).g.cs" label="M_System.Threading.Tasks.Task.WaitAsync(System.Threading.CancellationToken).g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System.Threading.Tasks;
using System.Threading;

static partial class PolyfillExtensions
{
    /// <summary>
    /// Gets a <see cref="Task{TResult}"/> that will complete when the <paramref name="task"/> completes or when the specified <paramref name="cancellationToken"/> has cancellation requested.
    /// </summary>
    /// <typeparam name="TResult">The type of the task result.</typeparam>
    /// <param name="task">The task to wait on for completion.</param>
    /// <param name="cancellationToken">The <see cref="CancellationToken"/> to monitor for a cancellation request.</param>
    /// <returns>The <see cref="Task{TResult}"/> representing the asynchronous wait.</returns>
    public static Task<TResult> WaitAsync<TResult>(this Task<TResult> task, CancellationToken cancellationToken)
    {
        if (task.IsCompleted || (!cancellationToken.CanBeCanceled))
        {
            return task;
        }

        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromCanceled<TResult>(cancellationToken);
        }

        return WaitTask.WaitTaskAsync(task, cancellationToken);
    }
}

file sealed class WaitTask
{
    public static async Task<TResult> WaitTaskAsync<TResult>(Task<TResult> task, CancellationToken cancellationToken)
    {
        var tcs = new TaskCompletionSource<TResult>(TaskCreationOptions.RunContinuationsAsynchronously);
        using (cancellationToken.Register(static state => ((TaskCompletionSource<TResult>)state!).SetCanceled(), tcs, false))
        {
            var t = await Task.WhenAny(task, tcs.Task).ConfigureAwait(false);
            return t.GetAwaiter().GetResult();
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Collections.Generic.PriorityQueue`2.g.cs" label="T_System.Collections.Generic.PriorityQueue`2.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;

namespace System.Collections.Generic
{
    /// <summary>
    ///  Represents a min priority queue.
    /// </summary>
    /// <typeparam name="TElement">Specifies the type of elements in the queue.</typeparam>
    /// <typeparam name="TPriority">Specifies the type of priority associated with enqueued elements.</typeparam>
    /// <remarks>
    ///  Implements an array-backed quaternary min-heap. Each element is enqueued with an associated priority
    ///  that determines the dequeue order: elements with the lowest priority get dequeued first.
    /// </remarks>
    [DebuggerDisplay("Count = {Count}")]
    internal class PriorityQueue<TElement, TPriority>
    {
        /// <summary>
        /// Represents an implicit heap-ordered complete d-ary tree, stored as an array.
        /// </summary>
        private (TElement Element, TPriority Priority)[] _nodes;

        /// <summary>
        /// Custom comparer used to order the heap.
        /// </summary>
        private readonly IComparer<TPriority>? _comparer;

        /// <summary>
        /// Lazily-initialized collection used to expose the contents of the queue.
        /// </summary>
        private UnorderedItemsCollection? _unorderedItems;

        /// <summary>
        /// The number of nodes in the heap.
        /// </summary>
        private int _size;

        /// <summary>
        /// Version updated on mutation to help validate enumerators operate on a consistent state.
        /// </summary>
        private int _version;

        /// <summary>
        /// Specifies the arity of the d-ary heap, which here is quaternary.
        /// It is assumed that this value is a power of 2.
        /// </summary>
        private const int Arity = 4;

        /// <summary>
        /// The binary logarithm of <see cref="Arity" />.
        /// </summary>
        private const int Log2Arity = 2;

#if DEBUG
        static PriorityQueue()
        {
            Debug.Assert(Log2Arity > 0 && Math.Pow(2, Log2Arity) == Arity);
        }
#endif

        /// <summary>
        ///  Initializes a new instance of the <see cref="PriorityQueue{TElement, TPriority}"/> class.
        /// </summary>
        public PriorityQueue()
        {
            _nodes = Array.Empty<(TElement, TPriority)>();
            _comparer = InitializeComparer(null);
        }

        /// <summary>
        ///  Initializes a new instance of the <see cref="PriorityQueue{TElement, TPriority}"/> class
        ///  with the specified initial capacity.
        /// </summary>
        /// <param name="initialCapacity">Initial capacity to allocate in the underlying heap array.</param>
        /// <exception cref="ArgumentOutOfRangeException">
        ///  The specified <paramref name="initialCapacity"/> was negative.
        /// </exception>
        public PriorityQueue(int initialCapacity)
            : this(initialCapacity, comparer: null)
        {
        }

        /// <summary>
        ///  Initializes a new instance of the <see cref="PriorityQueue{TElement, TPriority}"/> class
        ///  with the specified custom priority comparer.
        /// </summary>
        /// <param name="comparer">
        ///  Custom comparer dictating the ordering of elements.
        ///  Uses <see cref="Comparer{T}.Default" /> if the argument is <see langword="null"/>.
        /// </param>
        public PriorityQueue(IComparer<TPriority>? comparer)
        {
            _nodes = Array.Empty<(TElement, TPriority)>();
            _comparer = InitializeComparer(comparer);
        }

        /// <summary>
        ///  Initializes a new instance of the <see cref="PriorityQueue{TElement, TPriority}"/> class
        ///  with the specified initial capacity and custom priority comparer.
        /// </summary>
        /// <param name="initialCapacity">Initial capacity to allocate in the underlying heap array.</param>
        /// <param name="comparer">
        ///  Custom comparer dictating the ordering of elements.
        ///  Uses <see cref="Comparer{T}.Default" /> if the argument is <see langword="null"/>.
        /// </param>
        /// <exception cref="ArgumentOutOfRangeException">
        ///  The specified <paramref name="initialCapacity"/> was negative.
        /// </exception>
        public PriorityQueue(int initialCapacity, IComparer<TPriority>? comparer)
        {
            if (initialCapacity < 0)
                throw new ArgumentOutOfRangeException(nameof(initialCapacity), $"{nameof(initialCapacity)} ('{initialCapacity}') must be a non-negative value.");

            _nodes = new (TElement, TPriority)[initialCapacity];
            _comparer = InitializeComparer(comparer);
        }

        /// <summary>
        ///  Initializes a new instance of the <see cref="PriorityQueue{TElement, TPriority}"/> class
        ///  that is populated with the specified elements and priorities.
        /// </summary>
        /// <param name="items">The pairs of elements and priorities with which to populate the queue.</param>
        /// <exception cref="ArgumentNullException">
        ///  The specified <paramref name="items"/> argument was <see langword="null"/>.
        /// </exception>
        /// <remarks>
        ///  Constructs the heap using a heapify operation,
        ///  which is generally faster than enqueuing individual elements sequentially.
        /// </remarks>
        public PriorityQueue(IEnumerable<(TElement Element, TPriority Priority)> items)
            : this(items, comparer: null)
        {
        }

        /// <summary>
        ///  Initializes a new instance of the <see cref="PriorityQueue{TElement, TPriority}"/> class
        ///  that is populated with the specified elements and priorities,
        ///  and with the specified custom priority comparer.
        /// </summary>
        /// <param name="items">The pairs of elements and priorities with which to populate the queue.</param>
        /// <param name="comparer">
        ///  Custom comparer dictating the ordering of elements.
        ///  Uses <see cref="Comparer{T}.Default" /> if the argument is <see langword="null"/>.
        /// </param>
        /// <exception cref="ArgumentNullException">
        ///  The specified <paramref name="items"/> argument was <see langword="null"/>.
        /// </exception>
        /// <remarks>
        ///  Constructs the heap using a heapify operation,
        ///  which is generally faster than enqueuing individual elements sequentially.
        /// </remarks>
        public PriorityQueue(IEnumerable<(TElement Element, TPriority Priority)> items, IComparer<TPriority>? comparer)
        {
            if (items == null)
                throw new ArgumentNullException(nameof(items));

            _nodes = EnumerableHelpers.ToArray(items, out _size);
            _comparer = InitializeComparer(comparer);

            if (_size > 1)
            {
                Heapify();
            }
        }

        /// <summary>
        ///  Gets the number of elements contained in the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        public int Count => _size;

        /// <summary>
        ///  Gets the priority comparer used by the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        public IComparer<TPriority> Comparer => _comparer ?? Comparer<TPriority>.Default;

        /// <summary>
        ///  Gets a collection that enumerates the elements of the queue in an unordered manner.
        /// </summary>
        /// <remarks>
        ///  The enumeration does not order items by priority, since that would require N * log(N) time and N space.
        ///  Items are instead enumerated following the internal array heap layout.
        /// </remarks>
        public UnorderedItemsCollection UnorderedItems => _unorderedItems ??= new UnorderedItemsCollection(this);

        /// <summary>
        ///  Adds the specified element with associated priority to the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        /// <param name="element">The element to add to the <see cref="PriorityQueue{TElement, TPriority}"/>.</param>
        /// <param name="priority">The priority with which to associate the new element.</param>
        public void Enqueue(TElement element, TPriority priority)
        {
            // Virtually add the node at the end of the underlying array.
            // Note that the node being enqueued does not need to be physically placed
            // there at this point, as such an assignment would be redundant.

            int currentSize = _size;
            _version++;

            if (_nodes.Length == currentSize)
            {
                Grow(currentSize + 1);
            }

            _size = currentSize + 1;

            if (_comparer == null)
            {
                MoveUpDefaultComparer((element, priority), currentSize);
            }
            else
            {
                MoveUpCustomComparer((element, priority), currentSize);
            }
        }

        /// <summary>
        ///  Returns the minimal element from the <see cref="PriorityQueue{TElement, TPriority}"/> without removing it.
        /// </summary>
        /// <exception cref="InvalidOperationException">The <see cref="PriorityQueue{TElement, TPriority}"/> is empty.</exception>
        /// <returns>The minimal element of the <see cref="PriorityQueue{TElement, TPriority}"/>.</returns>
        public TElement Peek()
        {
            if (_size == 0)
            {
                throw new InvalidOperationException("Queue empty.");
            }

            return _nodes[0].Element;
        }

        /// <summary>
        ///  Removes and returns the minimal element from the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        /// <exception cref="InvalidOperationException">The queue is empty.</exception>
        /// <returns>The minimal element of the <see cref="PriorityQueue{TElement, TPriority}"/>.</returns>
        public TElement Dequeue()
        {
            if (_size == 0)
            {
                throw new InvalidOperationException("Queue empty.");
            }

            TElement element = _nodes[0].Element;
            RemoveRootNode();
            return element;
        }

        /// <summary>
        ///  Removes the minimal element and then immediately adds the specified element with associated priority to the <see cref="PriorityQueue{TElement, TPriority}"/>,
        /// </summary>
        /// <param name="element">The element to add to the <see cref="PriorityQueue{TElement, TPriority}"/>.</param>
        /// <param name="priority">The priority with which to associate the new element.</param>
        /// <exception cref="InvalidOperationException">The queue is empty.</exception>
        /// <returns>The minimal element removed before performing the enqueue operation.</returns>
        /// <remarks>
        ///  Implements an extract-then-insert heap operation that is generally more efficient
        ///  than sequencing Dequeue and Enqueue operations: in the worst case scenario only one
        ///  shift-down operation is required.
        /// </remarks>
        public TElement DequeueEnqueue(TElement element, TPriority priority)
        {
            if (_size == 0)
            {
                throw new InvalidOperationException("Queue empty.");
            }

            (TElement Element, TPriority Priority) root = _nodes[0];

            if (_comparer == null)
            {
                if (Comparer<TPriority>.Default.Compare(priority, root.Priority) > 0)
                {
                    MoveDownDefaultComparer((element, priority), 0);
                }
                else
                {
                    _nodes[0] = (element, priority);
                }
            }
            else
            {
                if (_comparer.Compare(priority, root.Priority) > 0)
                {
                    MoveDownCustomComparer((element, priority), 0);
                }
                else
                {
                    _nodes[0] = (element, priority);
                }
            }

            _version++;
            return root.Element;
        }

        /// <summary>
        ///  Removes the minimal element from the <see cref="PriorityQueue{TElement, TPriority}"/>,
        ///  and copies it to the <paramref name="element"/> parameter,
        ///  and its associated priority to the <paramref name="priority"/> parameter.
        /// </summary>
        /// <param name="element">The removed element.</param>
        /// <param name="priority">The priority associated with the removed element.</param>
        /// <returns>
        ///  <see langword="true"/> if the element is successfully removed;
        ///  <see langword="false"/> if the <see cref="PriorityQueue{TElement, TPriority}"/> is empty.
        /// </returns>
        public bool TryDequeue([MaybeNullWhen(false)] out TElement element, [MaybeNullWhen(false)] out TPriority priority)
        {
            if (_size != 0)
            {
                (element, priority) = _nodes[0];
                RemoveRootNode();
                return true;
            }

            element = default;
            priority = default;
            return false;
        }

        /// <summary>
        ///  Returns a value that indicates whether there is a minimal element in the <see cref="PriorityQueue{TElement, TPriority}"/>,
        ///  and if one is present, copies it to the <paramref name="element"/> parameter,
        ///  and its associated priority to the <paramref name="priority"/> parameter.
        ///  The element is not removed from the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        /// <param name="element">The minimal element in the queue.</param>
        /// <param name="priority">The priority associated with the minimal element.</param>
        /// <returns>
        ///  <see langword="true"/> if there is a minimal element;
        ///  <see langword="false"/> if the <see cref="PriorityQueue{TElement, TPriority}"/> is empty.
        /// </returns>
        public bool TryPeek([MaybeNullWhen(false)] out TElement element, [MaybeNullWhen(false)] out TPriority priority)
        {
            if (_size != 0)
            {
                (element, priority) = _nodes[0];
                return true;
            }

            element = default;
            priority = default;
            return false;
        }

        /// <summary>
        ///  Adds the specified element with associated priority to the <see cref="PriorityQueue{TElement, TPriority}"/>,
        ///  and immediately removes the minimal element, returning the result.
        /// </summary>
        /// <param name="element">The element to add to the <see cref="PriorityQueue{TElement, TPriority}"/>.</param>
        /// <param name="priority">The priority with which to associate the new element.</param>
        /// <returns>The minimal element removed after the enqueue operation.</returns>
        /// <remarks>
        ///  Implements an insert-then-extract heap operation that is generally more efficient
        ///  than sequencing Enqueue and Dequeue operations: in the worst case scenario only one
        ///  shift-down operation is required.
        /// </remarks>
        public TElement EnqueueDequeue(TElement element, TPriority priority)
        {
            if (_size != 0)
            {
                (TElement Element, TPriority Priority) root = _nodes[0];

                if (_comparer == null)
                {
                    if (Comparer<TPriority>.Default.Compare(priority, root.Priority) > 0)
                    {
                        MoveDownDefaultComparer((element, priority), 0);
                        _version++;
                        return root.Element;
                    }
                }
                else
                {
                    if (_comparer.Compare(priority, root.Priority) > 0)
                    {
                        MoveDownCustomComparer((element, priority), 0);
                        _version++;
                        return root.Element;
                    }
                }
            }

            return element;
        }

        /// <summary>
        ///  Enqueues a sequence of element/priority pairs to the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        /// <param name="items">The pairs of elements and priorities to add to the queue.</param>
        /// <exception cref="ArgumentNullException">
        ///  The specified <paramref name="items"/> argument was <see langword="null"/>.
        /// </exception>
        public void EnqueueRange(IEnumerable<(TElement Element, TPriority Priority)> items)
        {
            if (items == null)
                throw new ArgumentNullException(nameof(items));

            int count = 0;
            var collection = items as ICollection<(TElement Element, TPriority Priority)>;
            if (collection is not null && (count = collection.Count) > _nodes.Length - _size)
            {
                Grow(checked(_size + count));
            }

            if (_size == 0)
            {
                // build using Heapify() if the queue is empty.

                if (collection is not null)
                {
                    collection.CopyTo(_nodes, 0);
                    _size = count;
                }
                else
                {
                    int i = 0;
                    (TElement, TPriority)[] nodes = _nodes;
                    foreach ((TElement element, TPriority priority) in items)
                    {
                        if (nodes.Length == i)
                        {
                            Grow(i + 1);
                            nodes = _nodes;
                        }

                        nodes[i++] = (element, priority);
                    }

                    _size = i;
                }

                _version++;

                if (_size > 1)
                {
                    Heapify();
                }
            }
            else
            {
                foreach ((TElement element, TPriority priority) in items)
                {
                    Enqueue(element, priority);
                }
            }
        }

        /// <summary>
        ///  Enqueues a sequence of elements pairs to the <see cref="PriorityQueue{TElement, TPriority}"/>,
        ///  all associated with the specified priority.
        /// </summary>
        /// <param name="elements">The elements to add to the queue.</param>
        /// <param name="priority">The priority to associate with the new elements.</param>
        /// <exception cref="ArgumentNullException">
        ///  The specified <paramref name="elements"/> argument was <see langword="null"/>.
        /// </exception>
        public void EnqueueRange(IEnumerable<TElement> elements, TPriority priority)
        {
            if (elements == null)
                throw new ArgumentNullException(nameof(elements));

            int count;
            if (elements is ICollection<TElement> collection &&
                (count = collection.Count) > _nodes.Length - _size)
            {
                Grow(checked(_size + count));
            }

            if (_size == 0)
            {
                // build using Heapify() if the queue is empty.

                int i = 0;
                (TElement, TPriority)[] nodes = _nodes;
                foreach (TElement element in elements)
                {
                    if (nodes.Length == i)
                    {
                        Grow(i + 1);
                        nodes = _nodes;
                    }

                    nodes[i++] = (element, priority);
                }

                _size = i;
                _version++;

                if (i > 1)
                {
                    Heapify();
                }
            }
            else
            {
                foreach (TElement element in elements)
                {
                    Enqueue(element, priority);
                }
            }
        }

        /// <summary>
        ///  Removes all items from the <see cref="PriorityQueue{TElement, TPriority}"/>.
        /// </summary>
        public void Clear()
        {
            Array.Clear(_nodes, 0, _size);
            _size = 0;
            _version++;
        }

        /// <summary>
        ///  Ensures that the <see cref="PriorityQueue{TElement, TPriority}"/> can hold up to
        ///  <paramref name="capacity"/> items without further expansion of its backing storage.
        /// </summary>
        /// <param name="capacity">The minimum capacity to be used.</param>
        /// <exception cref="ArgumentOutOfRangeException">
        ///  The specified <paramref name="capacity"/> is negative.
        /// </exception>
        /// <returns>The current capacity of the <see cref="PriorityQueue{TElement, TPriority}"/>.</returns>
        public int EnsureCapacity(int capacity)
        {
            if (capacity < 0)
                throw new ArgumentOutOfRangeException(nameof(capacity), $"{nameof(capacity)} ('{capacity}') must be a non-negative value.");

            if (_nodes.Length < capacity)
            {
                Grow(capacity);
                _version++;
            }

            return _nodes.Length;
        }

        /// <summary>
        ///  Sets the capacity to the actual number of items in the <see cref="PriorityQueue{TElement, TPriority}"/>,
        ///  if that is less than 90 percent of current capacity.
        /// </summary>
        /// <remarks>
        ///  This method can be used to minimize a collection's memory overhead
        ///  if no new elements will be added to the collection.
        /// </remarks>
        public void TrimExcess()
        {
            int threshold = (int)(_nodes.Length * 0.9);
            if (_size < threshold)
            {
                Array.Resize(ref _nodes, _size);
                _version++;
            }
        }

        /// <summary>
        /// Grows the priority queue to match the specified min capacity.
        /// </summary>
        private void Grow(int minCapacity)
        {
            Debug.Assert(_nodes.Length < minCapacity);

            const int GrowFactor = 2;
            const int MinimumGrow = 4;

            int newcapacity = GrowFactor * _nodes.Length;

            // Allow the queue to grow to maximum possible capacity (~2G elements) before encountering overflow.
            // Note that this check works even when _nodes.Length overflowed thanks to the (uint) cast
            if ((uint)newcapacity > ArrayHelpers.MaxLength) newcapacity = ArrayHelpers.MaxLength;

            // Ensure minimum growth is respected.
            newcapacity = Math.Max(newcapacity, _nodes.Length + MinimumGrow);

            // If the computed capacity is still less than specified, set to the original argument.
            // Capacities exceeding Array.MaxLength will be surfaced as OutOfMemoryException by Array.Resize.
            if (newcapacity < minCapacity) newcapacity = minCapacity;

            Array.Resize(ref _nodes, newcapacity);
        }

        /// <summary>
        /// Removes the node from the root of the heap
        /// </summary>
        private void RemoveRootNode()
        {
            int lastNodeIndex = --_size;
            _version++;

            if (lastNodeIndex > 0)
            {
                (TElement Element, TPriority Priority) lastNode = _nodes[lastNodeIndex];
                if (_comparer == null)
                {
                    MoveDownDefaultComparer(lastNode, 0);
                }
                else
                {
                    MoveDownCustomComparer(lastNode, 0);
                }
            }

            _nodes[lastNodeIndex] = default;
        }

        /// <summary>
        /// Gets the index of an element's parent.
        /// </summary>
        private static int GetParentIndex(int index) => (index - 1) >> Log2Arity;

        /// <summary>
        /// Gets the index of the first child of an element.
        /// </summary>
        private static int GetFirstChildIndex(int index) => (index << Log2Arity) + 1;

        /// <summary>
        /// Converts an unordered list into a heap.
        /// </summary>
        private void Heapify()
        {
            // Leaves of the tree are in fact 1-element heaps, for which there
            // is no need to correct them. The heap property needs to be restored
            // only for higher nodes, starting from the first node that has children.
            // It is the parent of the very last element in the array.

            (TElement Element, TPriority Priority)[] nodes = _nodes;
            int lastParentWithChildren = GetParentIndex(_size - 1);

            if (_comparer == null)
            {
                for (int index = lastParentWithChildren; index >= 0; --index)
                {
                    MoveDownDefaultComparer(nodes[index], index);
                }
            }
            else
            {
                for (int index = lastParentWithChildren; index >= 0; --index)
                {
                    MoveDownCustomComparer(nodes[index], index);
                }
            }
        }

        /// <summary>
        /// Moves a node up in the tree to restore heap order.
        /// </summary>
        private void MoveUpDefaultComparer((TElement Element, TPriority Priority) node, int nodeIndex)
        {
            // Instead of swapping items all the way to the root, we will perform
            // a similar optimization as in the insertion sort.

            Debug.Assert(_comparer is null);
            Debug.Assert(0 <= nodeIndex && nodeIndex < _size);

            (TElement Element, TPriority Priority)[] nodes = _nodes;

            while (nodeIndex > 0)
            {
                int parentIndex = GetParentIndex(nodeIndex);
                (TElement Element, TPriority Priority) parent = nodes[parentIndex];

                if (Comparer<TPriority>.Default.Compare(node.Priority, parent.Priority) < 0)
                {
                    nodes[nodeIndex] = parent;
                    nodeIndex = parentIndex;
                }
                else
                {
                    break;
                }
            }

            nodes[nodeIndex] = node;
        }

        /// <summary>
        /// Moves a node up in the tree to restore heap order.
        /// </summary>
        private void MoveUpCustomComparer((TElement Element, TPriority Priority) node, int nodeIndex)
        {
            // Instead of swapping items all the way to the root, we will perform
            // a similar optimization as in the insertion sort.

            Debug.Assert(_comparer is not null);
            Debug.Assert(0 <= nodeIndex && nodeIndex < _size);

            IComparer<TPriority> comparer = _comparer;
            (TElement Element, TPriority Priority)[] nodes = _nodes;

            while (nodeIndex > 0)
            {
                int parentIndex = GetParentIndex(nodeIndex);
                (TElement Element, TPriority Priority) parent = nodes[parentIndex];

                if (comparer.Compare(node.Priority, parent.Priority) < 0)
                {
                    nodes[nodeIndex] = parent;
                    nodeIndex = parentIndex;
                }
                else
                {
                    break;
                }
            }

            nodes[nodeIndex] = node;
        }

        /// <summary>
        /// Moves a node down in the tree to restore heap order.
        /// </summary>
        private void MoveDownDefaultComparer((TElement Element, TPriority Priority) node, int nodeIndex)
        {
            // The node to move down will not actually be swapped every time.
            // Rather, values on the affected path will be moved up, thus leaving a free spot
            // for this value to drop in. Similar optimization as in the insertion sort.

            Debug.Assert(_comparer is null);
            Debug.Assert(0 <= nodeIndex && nodeIndex < _size);

            (TElement Element, TPriority Priority)[] nodes = _nodes;
            int size = _size;

            int i;
            while ((i = GetFirstChildIndex(nodeIndex)) < size)
            {
                // Find the child node with the minimal priority
                (TElement Element, TPriority Priority) minChild = nodes[i];
                int minChildIndex = i;

                int childIndexUpperBound = Math.Min(i + Arity, size);
                while (++i < childIndexUpperBound)
                {
                    (TElement Element, TPriority Priority) nextChild = nodes[i];
                    if (Comparer<TPriority>.Default.Compare(nextChild.Priority, minChild.Priority) < 0)
                    {
                        minChild = nextChild;
                        minChildIndex = i;
                    }
                }

                // Heap property is satisfied; insert node in this location.
                if (Comparer<TPriority>.Default.Compare(node.Priority, minChild.Priority) <= 0)
                {
                    break;
                }

                // Move the minimal child up by one node and
                // continue recursively from its location.
                nodes[nodeIndex] = minChild;
                nodeIndex = minChildIndex;
            }

            nodes[nodeIndex] = node;
        }

        /// <summary>
        /// Moves a node down in the tree to restore heap order.
        /// </summary>
        private void MoveDownCustomComparer((TElement Element, TPriority Priority) node, int nodeIndex)
        {
            // The node to move down will not actually be swapped every time.
            // Rather, values on the affected path will be moved up, thus leaving a free spot
            // for this value to drop in. Similar optimization as in the insertion sort.

            Debug.Assert(_comparer is not null);
            Debug.Assert(0 <= nodeIndex && nodeIndex < _size);

            IComparer<TPriority> comparer = _comparer;
            (TElement Element, TPriority Priority)[] nodes = _nodes;
            int size = _size;

            int i;
            while ((i = GetFirstChildIndex(nodeIndex)) < size)
            {
                // Find the child node with the minimal priority
                (TElement Element, TPriority Priority) minChild = nodes[i];
                int minChildIndex = i;

                int childIndexUpperBound = Math.Min(i + Arity, size);
                while (++i < childIndexUpperBound)
                {
                    (TElement Element, TPriority Priority) nextChild = nodes[i];
                    if (comparer.Compare(nextChild.Priority, minChild.Priority) < 0)
                    {
                        minChild = nextChild;
                        minChildIndex = i;
                    }
                }

                // Heap property is satisfied; insert node in this location.
                if (comparer.Compare(node.Priority, minChild.Priority) <= 0)
                {
                    break;
                }

                // Move the minimal child up by one node and continue recursively from its location.
                nodes[nodeIndex] = minChild;
                nodeIndex = minChildIndex;
            }

            nodes[nodeIndex] = node;
        }

        /// <summary>
        /// Initializes the custom comparer to be used internally by the heap.
        /// </summary>
        private static IComparer<TPriority>? InitializeComparer(IComparer<TPriority>? comparer)
        {
            if (typeof(TPriority).IsValueType)
            {
                if (comparer == Comparer<TPriority>.Default)
                {
                    // if the user manually specifies the default comparer,
                    // revert to using the optimized path.
                    return null;
                }

                return comparer;
            }
            else
            {
                // Currently the JIT doesn't optimize direct Comparer<T>.Default.Compare
                // calls for reference types, so we want to cache the comparer instance instead.
                // TODO https://github.com/dotnet/runtime/issues/10050: Update if this changes in the future.
                return comparer ?? Comparer<TPriority>.Default;
            }
        }

        /// <summary>
        ///  Enumerates the contents of a <see cref="PriorityQueue{TElement, TPriority}"/>, without any ordering guarantees.
        /// </summary>
        [DebuggerDisplay("Count = {Count}")]
        public sealed class UnorderedItemsCollection : IReadOnlyCollection<(TElement Element, TPriority Priority)>, ICollection
        {
            internal readonly PriorityQueue<TElement, TPriority> _queue;

            internal UnorderedItemsCollection(PriorityQueue<TElement, TPriority> queue) => _queue = queue;

            public int Count => _queue._size;
            object ICollection.SyncRoot => this;
            bool ICollection.IsSynchronized => false;

            void ICollection.CopyTo(Array array, int index)
            {
                if (array == null)
                    throw new ArgumentNullException(nameof(array));

                if (array.Rank != 1)
                {
                    throw new ArgumentException("Only single dimensional arrays are supported for the requested action.", nameof(array));
                }

                if (array.GetLowerBound(0) != 0)
                {
                    throw new ArgumentException("The lower bound of target array must be zero.", nameof(array));
                }

                if (index < 0 || index > array.Length)
                {
                    throw new ArgumentOutOfRangeException(nameof(index), index, "Index was out of range. Must be non-negative and less than or equal to the size of the collection.");
                }

                if (array.Length - index < _queue._size)
                {
                    throw new ArgumentException("Offset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection.");
                }

                try
                {
                    Array.Copy(_queue._nodes, 0, array, index, _queue._size);
                }
                catch (ArrayTypeMismatchException)
                {
                    throw new ArgumentException("Target array type is not compatible with the type of items in the collection.", nameof(array));
                }
            }

            /// <summary>
            ///  Enumerates the element and priority pairs of a <see cref="PriorityQueue{TElement, TPriority}"/>,
            ///  without any ordering guarantees.
            /// </summary>
            public struct Enumerator : IEnumerator<(TElement Element, TPriority Priority)>
            {
                private readonly PriorityQueue<TElement, TPriority> _queue;
                private readonly int _version;
                private int _index;
                private (TElement, TPriority) _current;

                internal Enumerator(PriorityQueue<TElement, TPriority> queue)
                {
                    _queue = queue;
                    _index = 0;
                    _version = queue._version;
                    _current = default;
                }

                /// <summary>
                /// Releases all resources used by the <see cref="Enumerator"/>.
                /// </summary>
                public void Dispose() { }

                /// <summary>
                /// Advances the enumerator to the next element of the <see cref="UnorderedItems"/>.
                /// </summary>
                /// <returns><see langword="true"/> if the enumerator was successfully advanced to the next element; <see langword="false"/> if the enumerator has passed the end of the collection.</returns>
                public bool MoveNext()
                {
                    PriorityQueue<TElement, TPriority> localQueue = _queue;

                    if (_version == localQueue._version && ((uint)_index < (uint)localQueue._size))
                    {
                        _current = localQueue._nodes[_index];
                        _index++;
                        return true;
                    }

                    return MoveNextRare();
                }

                private bool MoveNextRare()
                {
                    if (_version != _queue._version)
                    {
                        throw new InvalidOperationException("Collection was modified after the enumerator was instantiated.");
                    }

                    _index = _queue._size + 1;
                    _current = default;
                    return false;
                }

                /// <summary>
                /// Gets the element at the current position of the enumerator.
                /// </summary>
                public (TElement Element, TPriority Priority) Current => _current;
                object IEnumerator.Current => _current;

                void IEnumerator.Reset()
                {
                    if (_version != _queue._version)
                    {
                        throw new InvalidOperationException("Collection was modified after the enumerator was instantiated.");
                    }

                    _index = 0;
                    _current = default;
                }
            }

            /// <summary>
            /// Returns an enumerator that iterates through the <see cref="UnorderedItems"/>.
            /// </summary>
            /// <returns>An <see cref="Enumerator"/> for the <see cref="UnorderedItems"/>.</returns>
            public Enumerator GetEnumerator() => new Enumerator(_queue);

            IEnumerator<(TElement Element, TPriority Priority)> IEnumerable<(TElement Element, TPriority Priority)>.GetEnumerator() =>
                _queue.Count == 0 ? EnumerableHelpers.GetEmptyEnumerator<(TElement Element, TPriority Priority)>() :
                GetEnumerator();

            IEnumerator IEnumerable.GetEnumerator() => ((IEnumerable<(TElement Element, TPriority Priority)>)this).GetEnumerator();
        }
    }
}

file static class EnumerableHelpers
{
    internal static T[] ToArray<T>(IEnumerable<T> source, out int length)
    {
        if (source is ICollection<T> ic)
        {
            int count = ic.Count;
            if (count != 0)
            {
                // Allocate an array of the desired size, then copy the elements into it. Note that this has the same
                // issue regarding concurrency as other existing collections like List<T>. If the collection size
                // concurrently changes between the array allocation and the CopyTo, we could end up either getting an
                // exception from overrunning the array (if the size went up) or we could end up not filling as many
                // items as 'count' suggests (if the size went down).  This is only an issue for concurrent collections
                // that implement ICollection<T>, which as of .NET 4.6 is just ConcurrentDictionary<TKey, TValue>.
                T[] arr = new T[count];
                ic.CopyTo(arr, 0);
                length = count;
                return arr;
            }
        }
        else
        {
            using (var en = source.GetEnumerator())
            {
                if (en.MoveNext())
                {
                    const int DefaultCapacity = 4;
                    T[] arr = new T[DefaultCapacity];
                    arr[0] = en.Current;
                    int count = 1;

                    while (en.MoveNext())
                    {
                        if (count == arr.Length)
                        {
                            // This is the same growth logic as in List<T>:
                            // If the array is currently empty, we make it a default size.  Otherwise, we attempt to
                            // double the size of the array.  Doubling will overflow once the size of the array reaches
                            // 2^30, since doubling to 2^31 is 1 larger than Int32.MaxValue.  In that case, we instead
                            // constrain the length to be Array.MaxLength (this overflow check works because of the
                            // cast to uint).
                            int newLength = count << 1;
                            if ((uint)newLength > ArrayHelpers.MaxLength)
                            {
                                newLength = ArrayHelpers.MaxLength <= count ? count + 1 : ArrayHelpers.MaxLength;
                            }

                            Array.Resize(ref arr, newLength);
                        }

                        arr[count++] = en.Current;
                    }

                    length = count;
                    return arr;
                }
            }
        }

        length = 0;
        return Array.Empty<T>();
    }

    internal static IEnumerator<T> GetEmptyEnumerator<T>() =>
         ((IEnumerable<T>)Array.Empty<T>()).GetEnumerator();
}

file static class ArrayHelpers
{
    public const int MaxLength = 0X7FFFFFC7;
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Collections.Generic.ReferenceEqualityComparer.g.cs" label="T_System.Collections.Generic.ReferenceEqualityComparer.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Runtime.CompilerServices;

namespace System.Collections.Generic
{
    /// <summary>
    /// An <see cref="IEqualityComparer{Object}"/> that uses reference equality (<see cref="object.ReferenceEquals(object?, object?)"/>)
    /// instead of value equality (<see cref="object.Equals(object?)"/>) when comparing two object instances.
    /// </summary>
    /// <remarks>
    /// The <see cref="ReferenceEqualityComparer"/> type cannot be instantiated. Instead, use the <see cref="Instance"/> property
    /// to access the singleton instance of this type.
    /// </remarks>
    internal sealed class ReferenceEqualityComparer : IEqualityComparer<object?>, IEqualityComparer
    {
        private ReferenceEqualityComparer() { }

        /// <summary>
        /// Gets the singleton <see cref="ReferenceEqualityComparer"/> instance.
        /// </summary>
        public static ReferenceEqualityComparer Instance { get; } = new ReferenceEqualityComparer();

        /// <summary>
        /// Determines whether two object references refer to the same object instance.
        /// </summary>
        /// <param name="x">The first object to compare.</param>
        /// <param name="y">The second object to compare.</param>
        /// <returns>
        /// <see langword="true"/> if both <paramref name="x"/> and <paramref name="y"/> refer to the same object instance
        /// or if both are <see langword="null"/>; otherwise, <see langword="false"/>.
        /// </returns>
        /// <remarks>
        /// This API is a wrapper around <see cref="object.ReferenceEquals(object?, object?)"/>.
        /// It is not necessarily equivalent to calling <see cref="object.Equals(object?, object?)"/>.
        /// </remarks>
        public new bool Equals(object? x, object? y) => ReferenceEquals(x, y);

        /// <summary>
        /// Returns a hash code for the specified object. The returned hash code is based on the object
        /// identity, not on the contents of the object.
        /// </summary>
        /// <param name="obj">The object for which to retrieve the hash code.</param>
        /// <returns>A hash code for the identity of <paramref name="obj"/>.</returns>
        /// <remarks>
        /// This API is a wrapper around <see cref="RuntimeHelpers.GetHashCode(object)"/>.
        /// It is not necessarily equivalent to calling <see cref="object.GetHashCode()"/>.
        /// </remarks>
        public int GetHashCode(object? obj)
        {
            // Depending on target framework, RuntimeHelpers.GetHashCode might not be annotated
            // with the proper nullability attribute. We'll suppress any warning that might
            // result.
            return RuntimeHelpers.GetHashCode(obj!);
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.AllowNullAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.AllowNullAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>
///   Specifies that <see langword="null"/> is allowed as an input even if the
///   corresponding type disallows it.
/// </summary>
/// <summary>Specifies that null is allowed as an input even if the corresponding type disallows it.</summary>
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Parameter | AttributeTargets.Property, Inherited = false)]
internal sealed class AllowNullAttribute : Attribute
{
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.DisallowNullAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.DisallowNullAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that null is disallowed as an input even if the corresponding type allows it.</summary>
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Parameter | AttributeTargets.Property, Inherited = false)]
internal sealed class DisallowNullAttribute : Attribute
{ }
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.DoesNotReturnAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.DoesNotReturnAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Applied to a method that will never return under any circumstance.</summary>
[AttributeUsage(AttributeTargets.Method, Inherited = false)]
internal sealed class DoesNotReturnAttribute : Attribute
{
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.DoesNotReturnIfAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.DoesNotReturnIfAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that the method will not return if the associated Boolean parameter is passed the specified value.</summary>
[AttributeUsage(AttributeTargets.Parameter, Inherited = false)]
internal sealed class DoesNotReturnIfAttribute : Attribute
{
    /// <summary>Initializes the attribute with the specified parameter value.</summary>
    /// <param name="parameterValue">
    /// The condition parameter value. Code after the method will be considered unreachable by diagnostics if the argument to
    /// the associated parameter matches this value.
    /// </param>
    public DoesNotReturnIfAttribute(bool parameterValue) => ParameterValue = parameterValue;

    /// <summary>Gets the condition parameter value.</summary>
    public bool ParameterValue { get; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Indicates that certain members on a specified <see cref="global::System.Type"/> are accessed dynamically,
    /// for example through <see cref="global::System.Reflection"/>.
    /// </summary>
    /// <remarks>
    /// This allows tools to understand which members are being accessed during the execution
    /// of a program.
    ///
    /// This attribute is valid on members whose type is <see cref="global::System.Type"/> or <see cref="string"/>.
    ///
    /// When this attribute is applied to a location of type <see cref="string"/>, the assumption is
    /// that the string represents a fully qualified type name.
    ///
    /// When this attribute is applied to a class, interface, or struct, the members specified
    /// can be accessed dynamically on <see cref="global::System.Type"/> instances returned from calling
    /// <see cref="object.GetType"/> on instances of that class, interface, or struct.
    ///
    /// If the attribute is applied to a method it's treated as a special case and it implies
    /// the attribute should be applied to the "this" parameter of the method. As such the attribute
    /// should only be used on instance methods of types assignable to System.Type (or string, but no methods
    /// will use it there).
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.ReturnValue |
        global::System.AttributeTargets.GenericParameter |
        global::System.AttributeTargets.Parameter |
        global::System.AttributeTargets.Property |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Struct,
        Inherited = false)]
    internal sealed class DynamicallyAccessedMembersAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute"/> class
        /// with the specified member types.
        /// </summary>
        /// <param name="memberTypes">The types of members dynamically accessed.</param>
        public DynamicallyAccessedMembersAttribute(global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes memberTypes)
        {
            MemberTypes = memberTypes;
        }

        /// <summary>
        /// Gets the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes"/> which specifies the type
        /// of members dynamically accessed.
        /// </summary>
        public global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes MemberTypes { get; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.g.cs" label="T_System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Specifies the types of members that are dynamically accessed.
    ///
    /// This enumeration has a <see cref="global::System.FlagsAttribute"/> attribute that allows a
    /// bitwise combination of its member values.
    /// </summary>
    [global::System.Flags]
    internal enum DynamicallyAccessedMemberTypes
    {
        /// <summary>
        /// Specifies no members.
        /// </summary>
        None = 0,

        /// <summary>
        /// Specifies the default, parameterless public constructor.
        /// </summary>
        PublicParameterlessConstructor = 0x0001,

        /// <summary>
        /// Specifies all public constructors.
        /// </summary>
        PublicConstructors = 0x0002 | global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.PublicParameterlessConstructor,

        /// <summary>
        /// Specifies all non-public constructors.
        /// </summary>
        NonPublicConstructors = 0x0004,

        /// <summary>
        /// Specifies all public methods.
        /// </summary>
        PublicMethods = 0x0008,

        /// <summary>
        /// Specifies all non-public methods.
        /// </summary>
        NonPublicMethods = 0x0010,

        /// <summary>
        /// Specifies all public fields.
        /// </summary>
        PublicFields = 0x0020,

        /// <summary>
        /// Specifies all non-public fields.
        /// </summary>
        NonPublicFields = 0x0040,

        /// <summary>
        /// Specifies all public nested types.
        /// </summary>
        PublicNestedTypes = 0x0080,

        /// <summary>
        /// Specifies all non-public nested types.
        /// </summary>
        NonPublicNestedTypes = 0x0100,

        /// <summary>
        /// Specifies all public properties.
        /// </summary>
        PublicProperties = 0x0200,

        /// <summary>
        /// Specifies all non-public properties.
        /// </summary>
        NonPublicProperties = 0x0400,

        /// <summary>
        /// Specifies all public events.
        /// </summary>
        PublicEvents = 0x0800,

        /// <summary>
        /// Specifies all non-public events.
        /// </summary>
        NonPublicEvents = 0x1000,

        /// <summary>
        /// Specifies all interfaces implemented by the type.
        /// </summary>
        Interfaces = 0x2000,

        /// <summary>
        /// Specifies all members.
        /// </summary>
        All = ~global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.None
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// States a dependency that one member has on another.
    /// </summary>
    /// <remarks>
    /// This can be used to inform tooling of a dependency that is otherwise not evident purely from
    /// metadata and IL, for example a member relied on via reflection.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Method,
        AllowMultiple = true, Inherited = false)]
    internal sealed class DynamicDependencyAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute"/> class
        /// with the specified signature of a member on the same type as the consumer.
        /// </summary>
        /// <param name="memberSignature">The signature of the member depended on.</param>
        public DynamicDependencyAttribute(string memberSignature)
        {
            MemberSignature = memberSignature;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute"/> class
        /// with the specified signature of a member on a <see cref="global::System.Type"/>.
        /// </summary>
        /// <param name="memberSignature">The signature of the member depended on.</param>
        /// <param name="type">The <see cref="global::System.Type"/> containing <paramref name="memberSignature"/>.</param>
        public DynamicDependencyAttribute(string memberSignature, global::System.Type type)
        {
            MemberSignature = memberSignature;
            Type = type;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DynamicDependencyAttribute"/> class
        /// with the specified signature of a member on a type in an assembly.
        /// </summary>
        /// <param name="memberSignature">The signature of the member depended on.</param>
        /// <param name="typeName">The full name of the type containing the specified member.</param>
        /// <param name="assemblyName">The assembly name of the type containing the specified member.</param>
        public DynamicDependencyAttribute(string memberSignature, string typeName, string assemblyName)
        {
            MemberSignature = memberSignature;
            TypeName = typeName;
            AssemblyName = assemblyName;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute"/> class
        /// with the specified types of members on a <see cref="global::System.Type"/>.
        /// </summary>
        /// <param name="memberTypes">The types of members depended on.</param>
        /// <param name="type">The <see cref="global::System.Type"/> containing the specified members.</param>
        public DynamicDependencyAttribute(global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes memberTypes, global::System.Type type)
        {
            MemberTypes = memberTypes;
            Type = type;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute"/> class
        /// with the specified types of members on a type in an assembly.
        /// </summary>
        /// <param name="memberTypes">The types of members depended on.</param>
        /// <param name="typeName">The full name of the type containing the specified members.</param>
        /// <param name="assemblyName">The assembly name of the type containing the specified members.</param>
        public DynamicDependencyAttribute(global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes memberTypes, string typeName, string assemblyName)
        {
            MemberTypes = memberTypes;
            TypeName = typeName;
            AssemblyName = assemblyName;
        }

        /// <summary>
        /// Gets the signature of the member depended on.
        /// </summary>
        /// <remarks>
        /// Either <see cref="MemberSignature"/> must be a valid string or <see cref="MemberTypes"/>
        /// must not equal <see cref="global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.None"/>, but not both.
        /// </remarks>
        public string? MemberSignature { get; }

        /// <summary>
        /// Gets the <see cref="global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes"/> which specifies the type
        /// of members depended on.
        /// </summary>
        /// <remarks>
        /// Either <see cref="MemberSignature"/> must be a valid string or <see cref="MemberTypes"/>
        /// must not equal <see cref="global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.None"/>, but not both.
        /// </remarks>
        public global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes MemberTypes { get; }

        /// <summary>
        /// Gets the <see cref="global::System.Type"/> containing the specified member.
        /// </summary>
        /// <remarks>
        /// If neither <see cref="Type"/> nor <see cref="TypeName"/> are specified,
        /// the type of the consumer is assumed.
        /// </remarks>
        public global::System.Type? Type { get; }

        /// <summary>
        /// Gets the full name of the type containing the specified member.
        /// </summary>
        /// <remarks>
        /// If neither <see cref="Type"/> nor <see cref="TypeName"/> are specified,
        /// the type of the consumer is assumed.
        /// </remarks>
        public string? TypeName { get; }

        /// <summary>
        /// Gets the assembly name of the specified type.
        /// </summary>
        /// <remarks>
        /// <see cref="AssemblyName"/> is only valid when <see cref="TypeName"/> is specified.
        /// </remarks>
        public string? AssemblyName { get; }

        /// <summary>
        /// Gets or sets the condition in which the dependency is applicable, e.g. "DEBUG".
        /// </summary>
        public string? Condition { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.MaybeNullAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.MaybeNullAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that an output may be null even if the corresponding type disallows it.</summary>
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Parameter | AttributeTargets.Property | AttributeTargets.ReturnValue, Inherited = false)]
internal sealed class MaybeNullAttribute : Attribute
{ 
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.MaybeNullWhenAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.MaybeNullWhenAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that when a method returns <see cref="ReturnValue"/>, the parameter may be null even if the corresponding type disallows it.</summary>
[AttributeUsage(AttributeTargets.Parameter, Inherited = false)]
internal sealed class MaybeNullWhenAttribute : Attribute
{
    /// <summary>Initializes the attribute with the specified return value condition.</summary>
    /// <param name="returnValue">
    /// The return value condition. If the method returns this value, the associated parameter may be null.
    /// </param>
    public MaybeNullWhenAttribute(bool returnValue) => ReturnValue = returnValue;

    /// <summary>Gets the return value condition.</summary>
    public bool ReturnValue { get; }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.MemberNotNullAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.MemberNotNullAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that the method or property will ensure that the listed field and property members have not-null values.</summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, Inherited = false, AllowMultiple = true)]
internal sealed class MemberNotNullAttribute : Attribute
{
    /// <summary>Initializes the attribute with a field or property member.</summary>
    /// <param name="member">
    /// The field or property member that is promised to be not-null.
    /// </param>
    public MemberNotNullAttribute(string member) => Members = new[] { member };

    /// <summary>Initializes the attribute with the list of field and property members.</summary>
    /// <param name="members">
    /// The list of field and property members that are promised to be not-null.
    /// </param>
    public MemberNotNullAttribute(params string[] members) => Members = members;

    /// <summary>Gets field or property member names.</summary>
    public string[] Members { get; }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.MemberNotNullWhenAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.MemberNotNullWhenAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that the method or property will ensure that the listed field and property members have not-null values when returning with the specified return value condition.</summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, Inherited = false, AllowMultiple = true)]
internal sealed class MemberNotNullWhenAttribute : Attribute
{
    /// <summary>Initializes the attribute with the specified return value condition and a field or property member.</summary>
    /// <param name="returnValue">
    /// The return value condition. If the method returns this value, the associated parameter will not be null.
    /// </param>
    /// <param name="member">
    /// The field or property member that is promised to be not-null.
    /// </param>
    public MemberNotNullWhenAttribute(bool returnValue, string member)
    {
        ReturnValue = returnValue;
        Members = new[] { member };
    }

    /// <summary>Initializes the attribute with the specified return value condition and list of field and property members.</summary>
    /// <param name="returnValue">
    /// The return value condition. If the method returns this value, the associated parameter will not be null.
    /// </param>
    /// <param name="members">
    /// The list of field and property members that are promised to be not-null.
    /// </param>
    public MemberNotNullWhenAttribute(bool returnValue, params string[] members)
    {
        ReturnValue = returnValue;
        Members = members;
    }

    /// <summary>Gets the return value condition.</summary>
    public bool ReturnValue { get; }

    /// <summary>Gets field or property member names.</summary>
    public string[] Members { get; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.NotNullAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.NotNullAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that an output will not be null even if the corresponding type allows it. Specifies that an input argument was not null when the call returns.</summary>
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Parameter | AttributeTargets.Property | AttributeTargets.ReturnValue, Inherited = false)]
internal sealed class NotNullAttribute : Attribute
{
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that the output will be non-null if the named parameter is non-null.</summary>
[AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property | AttributeTargets.ReturnValue, AllowMultiple = true, Inherited = false)]
internal sealed class NotNullIfNotNullAttribute : Attribute
{
    /// <summary>Initializes the attribute with the associated parameter name.</summary>
    /// <param name="parameterName">
    /// The associated parameter name.  The output will be non-null if the argument to the parameter specified is non-null.
    /// </param>
    public NotNullIfNotNullAttribute(string parameterName) => ParameterName = parameterName;

    /// <summary>Gets the associated parameter name.</summary>
    public string ParameterName { get; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.NotNullWhenAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.NotNullWhenAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis;

/// <summary>Specifies that when a method returns <see cref="ReturnValue"/>, the parameter will not be null even if the corresponding type allows it.</summary>
[AttributeUsage(AttributeTargets.Parameter, Inherited = false)]
internal sealed class NotNullWhenAttribute : Attribute
{
    /// <summary>Initializes the attribute with the specified return value condition.</summary>
    /// <param name="returnValue">
    /// The return value condition. If the method returns this value, the associated parameter will not be null.
    /// </param>
    public NotNullWhenAttribute(bool returnValue) => ReturnValue = returnValue;

    /// <summary>Gets the return value condition.</summary>
    public bool ReturnValue { get; }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.RequiresAssemblyFilesAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.RequiresAssemblyFilesAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Indicates that the specified member requires assembly files to be on disk.
    /// </summary>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Event |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Property,
        Inherited = false, AllowMultiple = false)]
    internal sealed class RequiresAssemblyFilesAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.RequiresAssemblyFilesAttribute"/> class.
        /// </summary>
        public RequiresAssemblyFilesAttribute()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.RequiresAssemblyFilesAttribute"/> class.
        /// </summary>
        /// <param name="message">
        /// A message that contains information about the need for assembly files to be on disk.
        /// </param>
        public RequiresAssemblyFilesAttribute(string message)
        {
            Message = message;
        }

        /// <summary>
        /// Gets an optional message that contains information about the need for
        /// assembly files to be on disk.
        /// </summary>
        public string? Message { get; }

        /// <summary>
        /// Gets or sets an optional URL that contains more information about the member,
        /// why it requires assembly files to be on disk, and what options a consumer has
        /// to deal with it.
        /// </summary>
        public string? Url { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.RequiresDynamicCodeAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.RequiresDynamicCodeAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Indicates that the specified method requires the ability to generate new code at runtime,
    /// for example through <see cref="global::System.Reflection"/>.
    /// </summary>
    /// <remarks>
    /// This allows tools to understand which methods are unsafe to call when compiling ahead of time.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Class,
        Inherited = false)]
    internal sealed class RequiresDynamicCodeAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.RequiresDynamicCodeAttribute"/> class
        /// with the specified message.
        /// </summary>
        /// <param name="message">
        /// A message that contains information about the usage of dynamic code.
        /// </param>
        public RequiresDynamicCodeAttribute(string message)
        {
            Message = message;
        }

        /// <summary>
        /// Gets a message that contains information about the usage of dynamic code.
        /// </summary>
        public string Message { get; }

        /// <summary>
        /// Gets or sets an optional URL that contains more information about the method,
        /// why it requires dynamic code, and what options a consumer has to deal with it.
        /// </summary>
        public string? Url { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Indicates that the specified method requires dynamic access to code that is not referenced
    /// statically, for example through <see cref="global::System.Reflection"/>.
    /// </summary>
    /// <remarks>
    /// This allows tools to understand which methods are unsafe to call when removing unreferenced
    /// code from an application.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Class, Inherited = false)]
    internal sealed class RequiresUnreferencedCodeAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute"/> class
        /// with the specified message.
        /// </summary>
        /// <param name="message">
        /// A message that contains information about the usage of unreferenced code.
        /// </param>
        public RequiresUnreferencedCodeAttribute(string message)
        {
            Message = message;
        }

        /// <summary>
        /// Gets a message that contains information about the usage of unreferenced code.
        /// </summary>
        public string Message { get; }

        /// <summary>
        /// Gets or sets an optional URL that contains more information about the method,
        /// why it requires unreferenced code, and what options a consumer has to deal with it.
        /// </summary>
        public string? Url { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Specifies that this constructor sets all required members for the current type, and callers
    /// do not need to set any required members themselves.
    /// </summary>
    [AttributeUsage(AttributeTargets.Constructor, AllowMultiple = false, Inherited = false)]
    internal sealed class SetsRequiredMembersAttribute : Attribute
    { }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>Specifies the syntax used in a string.</summary>
    [AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    internal sealed class StringSyntaxAttribute : Attribute
    {
        /// <summary>Initializes the <see cref="StringSyntaxAttribute"/> with the identifier of the syntax used.</summary>
        /// <param name="syntax">The syntax identifier.</param>
        public StringSyntaxAttribute(string syntax)
        {
            Syntax = syntax;
            Arguments = Array.Empty<object?>();
        }

        /// <summary>Initializes the <see cref="StringSyntaxAttribute"/> with the identifier of the syntax used.</summary>
        /// <param name="syntax">The syntax identifier.</param>
        /// <param name="arguments">Optional arguments associated with the specific syntax employed.</param>
        public StringSyntaxAttribute(string syntax, params object?[] arguments)
        {
            Syntax = syntax;
            Arguments = arguments;
        }

        /// <summary>Gets the identifier of the syntax used.</summary>
        public string Syntax { get; }

        /// <summary>Optional arguments associated with the specific syntax employed.</summary>
        public object?[] Arguments { get; }

        /// <summary>The syntax identifier for strings containing composite formats for string formatting.</summary>
        public const string CompositeFormat = nameof(CompositeFormat);

        /// <summary>The syntax identifier for strings containing date format specifiers.</summary>
        public const string DateOnlyFormat = nameof(DateOnlyFormat);

        /// <summary>The syntax identifier for strings containing date and time format specifiers.</summary>
        public const string DateTimeFormat = nameof(DateTimeFormat);

        /// <summary>The syntax identifier for strings containing <see cref="Enum"/> format specifiers.</summary>
        public const string EnumFormat = nameof(EnumFormat);

        /// <summary>The syntax identifier for strings containing <see cref="Guid"/> format specifiers.</summary>
        public const string GuidFormat = nameof(GuidFormat);

        /// <summary>The syntax identifier for strings containing JavaScript Object Notation (JSON).</summary>
        public const string Json = nameof(Json);

        /// <summary>The syntax identifier for strings containing numeric format specifiers.</summary>
        public const string NumericFormat = nameof(NumericFormat);

        /// <summary>The syntax identifier for strings containing regular expressions.</summary>
        public const string Regex = nameof(Regex);

        /// <summary>The syntax identifier for strings containing time format specifiers.</summary>
        public const string TimeOnlyFormat = nameof(TimeOnlyFormat);

        /// <summary>The syntax identifier for strings containing <see cref="TimeSpan"/> format specifiers.</summary>
        public const string TimeSpanFormat = nameof(TimeSpanFormat);

        /// <summary>The syntax identifier for strings containing URIs.</summary>
        public const string Uri = nameof(Uri);

        /// <summary>The syntax identifier for strings containing XML.</summary>
        public const string Xml = nameof(Xml);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Suppresses reporting of a specific rule violation, allowing multiple suppressions on a
    /// single code artifact.
    /// </summary>
    /// <remarks>
    /// <see cref="global::System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute"/> is different than
    /// <see cref="global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute"/> in that it doesn't have a
    /// <see cref="global::System.Diagnostics.ConditionalAttribute"/>. So it is always preserved in the compiled assembly.
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    internal sealed class UnconditionalSuppressMessageAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute"/>
        /// class, specifying the category of the tool and the identifier for an analysis rule.
        /// </summary>
        /// <param name="category">The category for the attribute.</param>
        /// <param name="checkId">The identifier of the analysis rule the attribute applies to.</param>
        public UnconditionalSuppressMessageAttribute(string category, string checkId)
        {
            Category = category;
            CheckId = checkId;
        }

        /// <summary>
        /// Gets the category identifying the classification of the attribute.
        /// </summary>
        /// <remarks>
        /// The <see cref="Category"/> property describes the tool or tool analysis category
        /// for which a message suppression attribute applies.
        /// </remarks>
        public string Category { get; }

        /// <summary>
        /// Gets the identifier of the analysis tool rule to be suppressed.
        /// </summary>
        /// <remarks>
        /// Concatenated together, the <see cref="Category"/> and <see cref="CheckId"/>
        /// properties form a unique check identifier.
        /// </remarks>
        public string CheckId { get; }

        /// <summary>
        /// Gets or sets the scope of the code that is relevant for the attribute.
        /// </summary>
        /// <remarks>
        /// The Scope property is an optional argument that specifies the metadata scope for which
        /// the attribute is relevant.
        /// </remarks>
        public string? Scope { get; set; }

        /// <summary>
        /// Gets or sets a fully qualified path that represents the target of the attribute.
        /// </summary>
        /// <remarks>
        /// The <see cref="Target"/> property is an optional argument identifying the analysis target
        /// of the attribute. An example value is "System.IO.Stream.ctor():System.Void".
        /// Because it is fully qualified, it can be long, particularly for targets such as parameters.
        /// The analysis tool user interface should be capable of automatically formatting the parameter.
        /// </remarks>
        public string? Target { get; set; }

        /// <summary>
        /// Gets or sets an optional argument expanding on exclusion criteria.
        /// </summary>
        /// <remarks>
        /// The <see cref="MessageId "/> property is an optional argument that specifies additional
        /// exclusion where the literal metadata target is not sufficiently precise. For example,
        /// the <see cref="global::System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute"/> cannot be applied within a method,
        /// and it may be desirable to suppress a violation against a statement in the method that will
        /// give a rule violation, but not against all statements in the method.
        /// </remarks>
        public string? MessageId { get; set; }

        /// <summary>
        /// Gets or sets the justification for suppressing the code analysis message.
        /// </summary>
        public string? Justification { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.CodeAnalysis.UnscopedRefAttribute.g.cs" label="T_System.Diagnostics.CodeAnalysis.UnscopedRefAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics.CodeAnalysis
{
    /// <summary>
    /// Used to indicate a byref escapes and is not scoped.
    /// </summary>
    /// <remarks>
    /// <para>
    /// There are several cases where the C# compiler treats a <see langword="ref"/> as implicitly
    /// <see langword="scoped"/> - where the compiler does not allow the <see langword="ref"/> to escape the method.
    /// </para>
    /// <para>
    /// For example:
    /// <list type="number">
    ///     <item><see langword="this"/> for <see langword="struct"/> instance methods.</item>
    ///     <item><see langword="ref"/> parameters that refer to <see langword="ref"/> <see langword="struct"/> types.</item>
    ///     <item><see langword="out"/> parameters.</item>
    /// </list>
    /// </para>
    /// <para>
    /// This attribute is used in those instances where the <see langword="ref"/> should be allowed to escape.
    /// </para>
    /// <para>
    /// Applying this attribute, in any form, has impact on consumers of the applicable API. It is necessary for
    /// API authors to understand the lifetime implications of applying this attribute and how it may impact their users.
    /// </para>
    /// </remarks>
    [AttributeUsageAttribute(
        AttributeTargets.Method | AttributeTargets.Property | AttributeTargets.Parameter,
        AllowMultiple = false,
        Inherited = false)]
    internal sealed class UnscopedRefAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UnscopedRefAttribute"/> class.
        /// </summary>
        public UnscopedRefAttribute() { }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Diagnostics.StackTraceHiddenAttribute.g.cs" label="T_System.Diagnostics.StackTraceHiddenAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Diagnostics
{
    /// <summary>
    /// Types and Methods attributed with StackTraceHidden will be omitted from the stack trace text shown in StackTrace.ToString()
    /// and Exception.StackTrace
    /// </summary>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Struct,
        Inherited = false)]
    internal sealed class StackTraceHiddenAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Diagnostics.StackTraceHiddenAttribute"/> class.
        /// </summary>
        public StackTraceHiddenAttribute() { }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.HashCode.g.cs" label="T_System.HashCode.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

/*

The xxHash32 implementation is based on the code published by Yann Collet:
https://raw.githubusercontent.com/Cyan4973/xxHash/5c174cfa4e45a42f94082dc0d4539b39696afea1/xxhash.c

  xxHash - Fast Hash algorithm
  Copyright (C) 2012-2016, Yann Collet
  
  BSD 2-Clause License (http://www.opensource.org/licenses/bsd-license.php)
  
  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are
  met:
  
  * Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the following disclaimer
  in the documentation and/or other materials provided with the
  distribution.
  
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
  You can contact the author at :
  - xxHash homepage: http://www.xxhash.com
  - xxHash source repository : https://github.com/Cyan4973/xxHash

*/

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;

namespace System
{
    // xxHash32 is used for the hash code.
    // https://github.com/Cyan4973/xxHash

    internal struct HashCode
    {
        private static readonly uint s_seed = GenerateGlobalSeed();

        private const uint Prime1 = 2654435761U;
        private const uint Prime2 = 2246822519U;
        private const uint Prime3 = 3266489917U;
        private const uint Prime4 = 668265263U;
        private const uint Prime5 = 374761393U;

        private uint _v1, _v2, _v3, _v4;
        private uint _queue1, _queue2, _queue3;
        private uint _length;

        private static uint GenerateGlobalSeed()
        {
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                byte[] tmp = new byte[sizeof(uint)];
                rng.GetBytes(tmp);
                return (uint)BitConverter.ToInt32(tmp, startIndex: 0);
            }
        }

        public static int Combine<T1>(T1 value1)
        {
            // Provide a way of diffusing bits from something with a limited
            // input hash space. For example, many enums only have a few
            // possible hashes, only using the bottom few bits of the code. Some
            // collections are built on the assumption that hashes are spread
            // over a larger space, so diffusing the bits may help the
            // collection work more efficiently.

            var hc1 = (uint)(value1?.GetHashCode() ?? 0);

            uint hash = MixEmptyState();
            hash += 4;

            hash = QueueRound(hash, hc1);

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2>(T1 value1, T2 value2)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);

            uint hash = MixEmptyState();
            hash += 8;

            hash = QueueRound(hash, hc1);
            hash = QueueRound(hash, hc2);

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2, T3>(T1 value1, T2 value2, T3 value3)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);
            var hc3 = (uint)(value3?.GetHashCode() ?? 0);

            uint hash = MixEmptyState();
            hash += 12;

            hash = QueueRound(hash, hc1);
            hash = QueueRound(hash, hc2);
            hash = QueueRound(hash, hc3);

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2, T3, T4>(T1 value1, T2 value2, T3 value3, T4 value4)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);
            var hc3 = (uint)(value3?.GetHashCode() ?? 0);
            var hc4 = (uint)(value4?.GetHashCode() ?? 0);

            Initialize(out uint v1, out uint v2, out uint v3, out uint v4);

            v1 = Round(v1, hc1);
            v2 = Round(v2, hc2);
            v3 = Round(v3, hc3);
            v4 = Round(v4, hc4);

            uint hash = MixState(v1, v2, v3, v4);
            hash += 16;

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2, T3, T4, T5>(T1 value1, T2 value2, T3 value3, T4 value4, T5 value5)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);
            var hc3 = (uint)(value3?.GetHashCode() ?? 0);
            var hc4 = (uint)(value4?.GetHashCode() ?? 0);
            var hc5 = (uint)(value5?.GetHashCode() ?? 0);

            Initialize(out uint v1, out uint v2, out uint v3, out uint v4);

            v1 = Round(v1, hc1);
            v2 = Round(v2, hc2);
            v3 = Round(v3, hc3);
            v4 = Round(v4, hc4);

            uint hash = MixState(v1, v2, v3, v4);
            hash += 20;

            hash = QueueRound(hash, hc5);

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2, T3, T4, T5, T6>(T1 value1, T2 value2, T3 value3, T4 value4, T5 value5, T6 value6)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);
            var hc3 = (uint)(value3?.GetHashCode() ?? 0);
            var hc4 = (uint)(value4?.GetHashCode() ?? 0);
            var hc5 = (uint)(value5?.GetHashCode() ?? 0);
            var hc6 = (uint)(value6?.GetHashCode() ?? 0);

            Initialize(out uint v1, out uint v2, out uint v3, out uint v4);

            v1 = Round(v1, hc1);
            v2 = Round(v2, hc2);
            v3 = Round(v3, hc3);
            v4 = Round(v4, hc4);

            uint hash = MixState(v1, v2, v3, v4);
            hash += 24;

            hash = QueueRound(hash, hc5);
            hash = QueueRound(hash, hc6);

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2, T3, T4, T5, T6, T7>(T1 value1, T2 value2, T3 value3, T4 value4, T5 value5, T6 value6, T7 value7)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);
            var hc3 = (uint)(value3?.GetHashCode() ?? 0);
            var hc4 = (uint)(value4?.GetHashCode() ?? 0);
            var hc5 = (uint)(value5?.GetHashCode() ?? 0);
            var hc6 = (uint)(value6?.GetHashCode() ?? 0);
            var hc7 = (uint)(value7?.GetHashCode() ?? 0);

            Initialize(out uint v1, out uint v2, out uint v3, out uint v4);

            v1 = Round(v1, hc1);
            v2 = Round(v2, hc2);
            v3 = Round(v3, hc3);
            v4 = Round(v4, hc4);

            uint hash = MixState(v1, v2, v3, v4);
            hash += 28;

            hash = QueueRound(hash, hc5);
            hash = QueueRound(hash, hc6);
            hash = QueueRound(hash, hc7);

            hash = MixFinal(hash);
            return (int)hash;
        }

        public static int Combine<T1, T2, T3, T4, T5, T6, T7, T8>(T1 value1, T2 value2, T3 value3, T4 value4, T5 value5, T6 value6, T7 value7, T8 value8)
        {
            var hc1 = (uint)(value1?.GetHashCode() ?? 0);
            var hc2 = (uint)(value2?.GetHashCode() ?? 0);
            var hc3 = (uint)(value3?.GetHashCode() ?? 0);
            var hc4 = (uint)(value4?.GetHashCode() ?? 0);
            var hc5 = (uint)(value5?.GetHashCode() ?? 0);
            var hc6 = (uint)(value6?.GetHashCode() ?? 0);
            var hc7 = (uint)(value7?.GetHashCode() ?? 0);
            var hc8 = (uint)(value8?.GetHashCode() ?? 0);

            Initialize(out uint v1, out uint v2, out uint v3, out uint v4);

            v1 = Round(v1, hc1);
            v2 = Round(v2, hc2);
            v3 = Round(v3, hc3);
            v4 = Round(v4, hc4);

            v1 = Round(v1, hc5);
            v2 = Round(v2, hc6);
            v3 = Round(v3, hc7);
            v4 = Round(v4, hc8);

            uint hash = MixState(v1, v2, v3, v4);
            hash += 32;

            hash = MixFinal(hash);
            return (int)hash;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static void Initialize(out uint v1, out uint v2, out uint v3, out uint v4)
        {
            v1 = s_seed + Prime1 + Prime2;
            v2 = s_seed + Prime2;
            v3 = s_seed;
            v4 = s_seed - Prime1;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static uint Round(uint hash, uint input)
        {
            return BitOperations.RotateLeft(hash + input * Prime2, 13) * Prime1;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static uint QueueRound(uint hash, uint queuedValue)
        {
            return BitOperations.RotateLeft(hash + queuedValue * Prime3, 17) * Prime4;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static uint MixState(uint v1, uint v2, uint v3, uint v4)
        {
            return BitOperations.RotateLeft(v1, 1) + BitOperations.RotateLeft(v2, 7) + BitOperations.RotateLeft(v3, 12) + BitOperations.RotateLeft(v4, 18);
        }

        private static uint MixEmptyState()
        {
            return s_seed + Prime5;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static uint MixFinal(uint hash)
        {
            hash ^= hash >> 15;
            hash *= Prime2;
            hash ^= hash >> 13;
            hash *= Prime3;
            hash ^= hash >> 16;
            return hash;
        }

        public void Add<T>(T value)
        {
            Add(value?.GetHashCode() ?? 0);
        }

        public void Add<T>(T value, IEqualityComparer<T>? comparer)
        {
            Add(comparer != null ? comparer.GetHashCode(value) : (value?.GetHashCode() ?? 0));
        }

        private void Add(int value)
        {
            // The original xxHash works as follows:
            // 0. Initialize immediately. We can't do this in a struct (no
            //    default ctor).
            // 1. Accumulate blocks of length 16 (4 uints) into 4 accumulators.
            // 2. Accumulate remaining blocks of length 4 (1 uint) into the
            //    hash.
            // 3. Accumulate remaining blocks of length 1 into the hash.

            // There is no need for #3 as this type only accepts ints. _queue1,
            // _queue2 and _queue3 are basically a buffer so that when
            // ToHashCode is called we can execute #2 correctly.

            // We need to initialize the xxHash32 state (_v1 to _v4) lazily (see
            // #0) nd the last place that can be done if you look at the
            // original code is just before the first block of 16 bytes is mixed
            // in. The xxHash32 state is never used for streams containing fewer
            // than 16 bytes.

            // To see what's really going on here, have a look at the Combine
            // methods.

            var val = (uint)value;

            // Storing the value of _length locally shaves of quite a few bytes
            // in the resulting machine code.
            uint previousLength = _length++;
            uint position = previousLength % 4;

            // Switch can't be inlined.

            if (position == 0)
                _queue1 = val;
            else if (position == 1)
                _queue2 = val;
            else if (position == 2)
                _queue3 = val;
            else // position == 3
            {
                if (previousLength == 3)
                    Initialize(out _v1, out _v2, out _v3, out _v4);

                _v1 = Round(_v1, _queue1);
                _v2 = Round(_v2, _queue2);
                _v3 = Round(_v3, _queue3);
                _v4 = Round(_v4, val);
            }
        }

        public int ToHashCode()
        {
            // Storing the value of _length locally shaves of quite a few bytes
            // in the resulting machine code.
            uint length = _length;

            // position refers to the *next* queue position in this method, so
            // position == 1 means that _queue1 is populated; _queue2 would have
            // been populated on the next call to Add.
            uint position = length % 4;

            // If the length is less than 4, _v1 to _v4 don't contain anything
            // yet. xxHash32 treats this differently.

            uint hash = length < 4 ? MixEmptyState() : MixState(_v1, _v2, _v3, _v4);

            // _length is incremented once per Add(Int32) and is therefore 4
            // times too small (xxHash length is in bytes, not ints).

            hash += length * 4;

            // Mix what remains in the queue

            // Switch can't be inlined right now, so use as few branches as
            // possible by manually excluding impossible scenarios (position > 1
            // is always false if position is not > 0).
            if (position > 0)
            {
                hash = QueueRound(hash, _queue1);
                if (position > 1)
                {
                    hash = QueueRound(hash, _queue2);
                    if (position > 2)
                        hash = QueueRound(hash, _queue3);
                }
            }

            hash = MixFinal(hash);
            return (int)hash;
        }

#pragma warning disable 0809
        // Obsolete member 'memberA' overrides non-obsolete member 'memberB'. 
        // Disallowing GetHashCode and Equals is by design

        // * We decided to not override GetHashCode() to produce the hash code 
        //   as this would be weird, both naming-wise as well as from a
        //   behavioral standpoint (GetHashCode() should return the object's
        //   hash code, not the one being computed).

        // * Even though ToHashCode() can be called safely multiple times on
        //   this implementation, it is not part of the contract. If the
        //   implementation has to change in the future we don't want to worry
        //   about people who might have incorrectly used this type.

        [Obsolete("HashCode is a mutable struct and should not be compared with other HashCodes. Use ToHashCode to retrieve the computed hash code.", error: true)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public override int GetHashCode() => throw new NotSupportedException("HashCode is a mutable struct and should not be compared with other HashCodes. Use ToHashCode to retrieve the computed hash code.");

        [Obsolete("HashCode is a mutable struct and should not be compared with other HashCodes.", error: true)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public override bool Equals(object? obj) => throw new NotSupportedException("HashCode is a mutable struct and should not be compared with other HashCodes.");
#pragma warning restore 0809
    }
}

file static partial class LocalAppContextSwitches
{
    private static int s_useNonRandomizedHashSeed;
    public static bool UseNonRandomizedHashSeed
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        get => GetCachedSwitchValue("Switch.System.Data.UseNonRandomizedHashSeed", ref s_useNonRandomizedHashSeed);
    }
}

// Helper method for local caching of compatibility quirks. Keep this lean and simple - this file is included into
// every framework assembly that implements any compatibility quirks.
file static partial class LocalAppContextSwitches
{
    // Returns value of given switch using provided cache.
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    internal static bool GetCachedSwitchValue(string switchName, ref int cachedSwitchValue)
    {
        // The cached switch value has 3 states: 0 - unknown, 1 - true, -1 - false
        if (cachedSwitchValue < 0) return false;
        if (cachedSwitchValue > 0) return true;

        return GetCachedSwitchValueInternal(switchName, ref cachedSwitchValue);
    }

    private static bool GetCachedSwitchValueInternal(string switchName, ref int cachedSwitchValue)
    {
        bool isSwitchEnabled;

        bool hasSwitch = AppContext.TryGetSwitch(switchName, out isSwitchEnabled);
        if (!hasSwitch)
        {
            isSwitchEnabled = GetSwitchDefaultValue(switchName);
        }

        AppContext.TryGetSwitch(@"TestSwitch.LocalAppContext.DisableCaching", out bool disableCaching);
        if (!disableCaching)
        {
            cachedSwitchValue = isSwitchEnabled ? 1 /*true*/ : -1 /*false*/;
        }

        return isSwitchEnabled;
    }

    // Provides default values for switches if they're not always false by default
    private static bool GetSwitchDefaultValue(string switchName)
    {
        if (switchName == "Switch.System.Runtime.Serialization.SerializationGuard")
        {
            return true;
        }

        return false;
    }
}

// NOTE: This class is a copy from src\Common\src\CoreLib\System\Numerics\BitOperations.cs only for HashCode purposes.
// Any changes to the BitOperations class should be done in there instead.
file static class BitOperations
{
    /// <summary>
    /// Rotates the specified value left by the specified number of bits.
    /// Similar in behavior to the x86 instruction ROL.
    /// </summary>
    /// <param name="value">The value to rotate.</param>
    /// <param name="offset">The number of bits to rotate by.
    /// Any value outside the range [0..31] is treated as congruent mod 32.</param>
    /// <returns>The rotated value.</returns>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static uint RotateLeft(uint value, int offset)
        => (value << offset) | (value >> (32 - offset));

    /// <summary>
    /// Rotates the specified value left by the specified number of bits.
    /// Similar in behavior to the x86 instruction ROL.
    /// </summary>
    /// <param name="value">The value to rotate.</param>
    /// <param name="offset">The number of bits to rotate by.
    /// Any value outside the range [0..63] is treated as congruent mod 64.</param>
    /// <returns>The rotated value.</returns>
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static ulong RotateLeft(ulong value, int offset)
        => (value << offset) | (value >> (64 - offset));
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Index.g.cs" label="T_System.Index.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System
{
    /// <summary>Represent a type can be used to index a collection either from the start or the end.</summary>
    /// <remarks>
    /// Index is used by the C# compiler to support the new index syntax
    /// <code>
    /// int[] someArray = new int[5] { 1, 2, 3, 4, 5 } ;
    /// int lastElement = someArray[^1]; // lastElement = 5
    /// </code>
    /// </remarks>
    internal readonly struct Index : global::System.IEquatable<global::System.Index>
    {
        private readonly int _value;

        /// <summary>Construct an Index using a value and indicating if the index is from the start or from the end.</summary>
        /// <param name="value">The index value. it has to be zero or positive number.</param>
        /// <param name="fromEnd">Indicating if the index is from the start or from the end.</param>
        /// <remarks>
        /// If the Index constructed from the end, index value 1 means pointing at the last element and index value 0 means pointing at beyond last element.
        /// </remarks>
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        public Index(int value, bool fromEnd = false)
        {
            if (value < 0)
            {
                global::System.Index.ThrowHelper.ThrowValueArgumentOutOfRange_NeedNonNegNumException();
            }

            if (fromEnd)
                _value = ~value;
            else
                _value = value;
        }

        // The following private constructors mainly created for perf reason to avoid the checks
        private Index(int value)
        {
            _value = value;
        }

        /// <summary>Create an Index pointing at first element.</summary>
        public static global::System.Index Start => new global::System.Index(0);

        /// <summary>Create an Index pointing at beyond last element.</summary>
        public static global::System.Index End => new global::System.Index(~0);

        /// <summary>Create an Index from the start at the position indicated by the value.</summary>
        /// <param name="value">The index value from the start.</param>
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        public static global::System.Index FromStart(int value)
        {
            if (value < 0)
            {
                global::System.Index.ThrowHelper.ThrowValueArgumentOutOfRange_NeedNonNegNumException();
            }

            return new global::System.Index(value);
        }

        /// <summary>Create an Index from the end at the position indicated by the value.</summary>
        /// <param name="value">The index value from the end.</param>
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        public static global::System.Index FromEnd(int value)
        {
            if (value < 0)
            {
                global::System.Index.ThrowHelper.ThrowValueArgumentOutOfRange_NeedNonNegNumException();
            }

            return new global::System.Index(~value);
        }

        /// <summary>Returns the index value.</summary>
        public int Value
        {
            get
            {
                if (_value < 0)
                    return ~_value;
                else
                    return _value;
            }
        }

        /// <summary>Indicates whether the index is from the start or the end.</summary>
        public bool IsFromEnd => _value < 0;

        /// <summary>Calculate the offset from the start using the giving collection length.</summary>
        /// <param name="length">The length of the collection that the Index will be used with. length has to be a positive value</param>
        /// <remarks>
        /// For performance reason, we don't validate the input length parameter and the returned offset value against negative values.
        /// we don't validate either the returned offset is greater than the input length.
        /// It is expected Index will be used with collections which always have non negative length/count. If the returned offset is negative and
        /// then used to index a collection will get out of range exception which will be same affect as the validation.
        /// </remarks>
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        public int GetOffset(int length)
        {
            int offset = _value;
            if (IsFromEnd)
            {
                // offset = length - (~value)
                // offset = length + (~(~value) + 1)
                // offset = length + value + 1

                offset += length + 1;
            }
            return offset;
        }

        /// <summary>Indicates whether the current Index object is equal to another object of the same type.</summary>
        /// <param name="value">An object to compare with this object</param>
        public override bool Equals([global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] object? value) => value is global::System.Index && _value == ((global::System.Index)value)._value;

        /// <summary>Indicates whether the current Index object is equal to another Index object.</summary>
        /// <param name="other">An object to compare with this object</param>
        public bool Equals(global::System.Index other) => _value == other._value;

        /// <summary>Returns the hash code for this instance.</summary>
        public override int GetHashCode() => _value;

        /// <summary>Converts integer number to an Index.</summary>
        public static implicit operator global::System.Index(int value) => FromStart(value);

        /// <summary>Converts the value of the current Index object to its equivalent string representation.</summary>
        public override string ToString()
        {
            if (IsFromEnd)
                return ToStringFromEnd();

            return ((uint)Value).ToString();
        }

        private string ToStringFromEnd()
        {
            return '^' + Value.ToString();
        }

        private static class ThrowHelper
        {
            [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
            public static void ThrowValueArgumentOutOfRange_NeedNonNegNumException()
            {
                throw new global::System.ArgumentOutOfRangeException("value", "Non-negative number required.");
            }
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Range.g.cs" label="T_System.Range.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System
{
    /// <summary>Represent a range has start and end indexes.</summary>
    /// <remarks>
    /// Range is used by the C# compiler to support the range syntax.
    /// <code>
    /// int[] someArray = new int[5] { 1, 2, 3, 4, 5 };
    /// int[] subArray1 = someArray[0..2]; // { 1, 2 }
    /// int[] subArray2 = someArray[1..^0]; // { 2, 3, 4, 5 }
    /// </code>
    /// </remarks>
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    internal readonly struct Range : global::System.IEquatable<global::System.Range>
    {
        /// <summary>Represent the inclusive start index of the Range.</summary>
        public global::System.Index Start { get; }

        /// <summary>Represent the exclusive end index of the Range.</summary>
        public global::System.Index End { get; }

        /// <summary>Construct a Range object using the start and end indexes.</summary>
        /// <param name="start">Represent the inclusive start index of the range.</param>
        /// <param name="end">Represent the exclusive end index of the range.</param>
        public Range(global::System.Index start, global::System.Index end)
        {
            Start = start;
            End = end;
        }

        /// <summary>Indicates whether the current Range object is equal to another object of the same type.</summary>
        /// <param name="value">An object to compare with this object</param>
        public override bool Equals([global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)] object? value) =>
            value is global::System.Range r &&
            r.Start.Equals(Start) &&
            r.End.Equals(End);

        /// <summary>Indicates whether the current Range object is equal to another Range object.</summary>
        /// <param name="other">An object to compare with this object</param>
        public bool Equals(global::System.Range other) => other.Start.Equals(Start) && other.End.Equals(End);

        /// <summary>Returns the hash code for this instance.</summary>
        public override int GetHashCode()
        {
            return global::System.Range.HashHelpers.Combine(Start.GetHashCode(), End.GetHashCode());
        }

        /// <summary>Converts the value of the current Range object to its equivalent string representation.</summary>
        public override string ToString()
        {
            return Start.ToString() + ".." + End.ToString();
        }

        /// <summary>Create a Range object starting from start index to the end of the collection.</summary>
        public static global::System.Range StartAt(global::System.Index start) => new global::System.Range(start, global::System.Index.End);

        /// <summary>Create a Range object starting from first element in the collection to the end Index.</summary>
        public static global::System.Range EndAt(global::System.Index end) => new global::System.Range(global::System.Index.Start, end);

        /// <summary>Create a Range object starting from first element to the end.</summary>
        public static global::System.Range All => new global::System.Range(global::System.Index.Start, global::System.Index.End);

        /// <summary>Calculate the start offset and length of range object using a collection length.</summary>
        /// <param name="length">The length of the collection that the range will be used with. length has to be a positive value.</param>
        /// <remarks>
        /// For performance reason, we don't validate the input length parameter against negative values.
        /// It is expected Range will be used with collections which always have non negative length/count.
        /// We validate the range is inside the length scope though.
        /// </remarks>
        [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        public (int Offset, int Length) GetOffsetAndLength(int length)
        {
            int start;
            global::System.Index startIndex = Start;
            if (startIndex.IsFromEnd)
                start = length - startIndex.Value;
            else
                start = startIndex.Value;

            int end;
            global::System.Index endIndex = End;
            if (endIndex.IsFromEnd)
                end = length - endIndex.Value;
            else
                end = endIndex.Value;

            if ((uint)end > (uint)length || (uint)start > (uint)end)
            {
                global::System.Range.ThrowHelper.ThrowArgumentOutOfRangeException();
            }

            return (start, end - start);
        }

        private static class HashHelpers
        {
            public static int Combine(int h1, int h2)
            {
                uint rol5 = ((uint)h1 << 5) | ((uint)h1 >> 27);
                return ((int)rol5 + h1) ^ h2;
            }
        }

        private static class ThrowHelper
        {
            [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
            public static void ThrowArgumentOutOfRangeException()
            {
                throw new global::System.ArgumentOutOfRangeException("length");
            }
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.AsyncMethodBuilderAttribute.g.cs" label="T_System.Runtime.CompilerServices.AsyncMethodBuilderAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Indicates the type of the async method builder that should be used by a language compiler to
    /// build the attributed async method or to build the attributed type when used as the return type
    /// of an async method.
    /// </summary>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Struct |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Delegate |
        global::System.AttributeTargets.Enum |
        global::System.AttributeTargets.Method,
        Inherited = false, AllowMultiple = false)]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    internal sealed class AsyncMethodBuilderAttribute : global::System.Attribute
    {
        /// <summary>Initializes the <see cref="global::System.Runtime.CompilerServices.AsyncMethodBuilderAttribute"/>.</summary>
        /// <param name="builderType">The <see cref="global::System.Type"/> of the associated builder.</param>
        public AsyncMethodBuilderAttribute(global::System.Type builderType) => BuilderType = builderType;

        /// <summary>Gets the <see cref="global::System.Type"/> of the associated builder.</summary>
        public global::System.Type BuilderType { get; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.CallerArgumentExpressionAttribute.g.cs" label="T_System.Runtime.CompilerServices.CallerArgumentExpressionAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// An attribute that allows parameters to receive the expression of other parameters.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Parameter, AllowMultiple = false, Inherited = false)]
    internal sealed class CallerArgumentExpressionAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Runtime.CompilerServices.CallerArgumentExpressionAttribute"/> class.
        /// </summary>
        /// <param name="parameterName">The condition parameter value.</param>
        public CallerArgumentExpressionAttribute(string parameterName)
        {
            ParameterName = parameterName;
        }

        /// <summary>
        /// Gets the parameter name the expression is retrieved from.
        /// </summary>
        public string ParameterName { get; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.CollectionBuilderAttribute.g.cs" label="T_System.Runtime.CompilerServices.CollectionBuilderAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct | AttributeTargets.Interface, Inherited = false)]
#if SYSTEM_PRIVATE_CORELIB
    public
#else
    internal
#endif
    sealed class CollectionBuilderAttribute : Attribute
    {
        /// <summary>Initialize the attribute to refer to the <paramref name="methodName"/> method on the <paramref name="builderType"/> type.</summary>
        /// <param name="builderType">The type of the builder to use to construct the collection.</param>
        /// <param name="methodName">The name of the method on the builder to use to construct the collection.</param>
        /// <remarks>
        /// <paramref name="methodName"/> must refer to a static method that accepts a single parameter of
        /// type <see cref="ReadOnlySpan{T}"/> and returns an instance of the collection being built containing
        /// a copy of the data from that span.  In future releases of .NET, additional patterns may be supported.
        /// </remarks>
        public CollectionBuilderAttribute(Type builderType, string methodName)
        {
            BuilderType = builderType;
            MethodName = methodName;
        }

        /// <summary>Gets the type of the builder to use to construct the collection.</summary>
        public Type BuilderType { get; }

        /// <summary>Gets the name of the method on the builder to use to construct the collection.</summary>
        /// <remarks>This should match the metadata name of the target method. For example, this might be ".ctor" if targeting the type's constructor.</remarks>
        public string MethodName { get; }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute.g.cs" label="T_System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Indicates that compiler support for a particular feature is required for the location where this attribute is applied.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.All, AllowMultiple = true, Inherited = false)]
    internal sealed class CompilerFeatureRequiredAttribute : global::System.Attribute
    {
        /// <summary>
        /// Creates a new instance of the <see cref="global::System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute"/> type.
        /// </summary>
        /// <param name="featureName">The name of the feature to indicate.</param>
        public CompilerFeatureRequiredAttribute(string featureName)
        {
            FeatureName = featureName;
        }

        /// <summary>
        /// The name of the compiler feature.
        /// </summary>
        public string FeatureName { get; }

        /// <summary>
        /// If true, the compiler can choose to allow access to the location where this attribute is applied if it does not understand <see cref="FeatureName"/>.
        /// </summary>
        public bool IsOptional { get; set; }

        /// <summary>
        /// The <see cref="FeatureName"/> used for the ref structs C# feature.
        /// </summary>
        public const string RefStructs = nameof(RefStructs);

        /// <summary>
        /// The <see cref="FeatureName"/> used for the required members C# feature.
        /// </summary>
        public const string RequiredMembers = nameof(RequiredMembers);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.DisableRuntimeMarshallingAttribute.g.cs" label="T_System.Runtime.CompilerServices.DisableRuntimeMarshallingAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Disables the built-in runtime managed/unmanaged marshalling subsystem for
    /// P/Invokes, Delegate types, and unmanaged function pointer invocations.
    /// </summary>
    /// <remarks>
    /// The built-in marshalling subsystem has some behaviors that cannot be changed due to
    /// backward-compatibility requirements. This attribute allows disabling the built-in
    /// subsystem and instead uses the following rules for P/Invokes, Delegates,
    /// and unmanaged function pointer invocations:
    ///
    /// - All value types that do not contain reference type fields recursively (<c>unmanaged</c> in C#) are blittable
    /// - Value types that recursively have any fields that have <c>[StructLayout(LayoutKind.Auto)]</c> are disallowed from interop.
    /// - All reference types are disallowed from usage in interop scenarios.
    /// - SetLastError support in P/Invokes is disabled.
    /// - varargs support is disabled.
    /// - LCIDConversionAttribute support is disabled.
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.Assembly, Inherited = false, AllowMultiple = false)]
    internal sealed class DisableRuntimeMarshallingAttribute : global::System.Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute.g.cs" label="T_System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Indicates which arguments to a method involving an interpolated string handler should be passed to that handler.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Parameter, AllowMultiple = false, Inherited = false)]
    internal sealed class InterpolatedStringHandlerArgumentAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute"/> class.
        /// </summary>
        /// <param name="argument">The name of the argument that should be passed to the handler.</param>
        /// <remarks><see langword="null"/> may be used as the name of the receiver in an instance method.</remarks>
        public InterpolatedStringHandlerArgumentAttribute(string argument)
        {
            Arguments = new string[] { argument };
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute"/> class.
        /// </summary>
        /// <param name="arguments">The names of the arguments that should be passed to the handler.</param>
        /// <remarks><see langword="null"/> may be used as the name of the receiver in an instance method.</remarks>
        public InterpolatedStringHandlerArgumentAttribute(params string[] arguments)
        {
            Arguments = arguments;
        }

        /// <summary>
        /// Gets the names of the arguments that should be passed to the handler.
        /// </summary>
        /// <remarks><see langword="null"/> may be used as the name of the receiver in an instance method.</remarks>
        public string[] Arguments { get; }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.InterpolatedStringHandlerAttribute.g.cs" label="T_System.Runtime.CompilerServices.InterpolatedStringHandlerAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Indicates the attributed type is to be used as an interpolated string handler.
    /// </summary>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Struct,
        AllowMultiple = false, Inherited = false)]
    internal sealed class InterpolatedStringHandlerAttribute : global::System.Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.IsExternalInit.g.cs" label="T_System.Runtime.CompilerServices.IsExternalInit.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Reserved to be used by the compiler for tracking metadata.
    /// This class should not be used by developers in source code.
    /// </summary>
    [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
    internal static class IsExternalInit
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.ModuleInitializerAttribute.g.cs" label="T_System.Runtime.CompilerServices.ModuleInitializerAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Used to indicate to the compiler that a method should be called
    /// in its containing module's initializer.
    /// </summary>
    /// <remarks>
    /// When one or more valid methods
    /// with this attribute are found in a compilation, the compiler will
    /// emit a module initializer which calls each of the attributed methods.
    ///
    /// Certain requirements are imposed on any method targeted with this attribute:
    /// - The method must be `static`.
    /// - The method must be an ordinary member method, as opposed to a property accessor, constructor, local function, etc.
    /// - The method must be parameterless.
    /// - The method must return `void`.
    /// - The method must not be generic or be contained in a generic type.
    /// - The method's effective accessibility must be `internal` or `public`.
    ///
    /// The specification for module initializers in the .NET runtime can be found here:
    /// https://github.com/dotnet/runtime/blob/main/docs/design/specs/Ecma-335-Augments.md#module-initializer
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, Inherited = false)]
    internal sealed class ModuleInitializerAttribute : global::System.Attribute
    {
        public ModuleInitializerAttribute()
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.RequiredMemberAttribute.g.cs" label="T_System.Runtime.CompilerServices.RequiredMemberAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Specifies that a type has required members or that a member is required.
    /// </summary>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Struct |
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Property,
        AllowMultiple = false,
        Inherited = false)]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    internal sealed class RequiredMemberAttribute : global::System.Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.CompilerServices.SkipLocalsInitAttribute.g.cs" label="T_System.Runtime.CompilerServices.SkipLocalsInitAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.CompilerServices
{
    /// <summary>
    /// Used to indicate to the compiler that the <c>.locals init</c> flag should not be set in method headers.
    /// </summary>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Module |
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Struct |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Property |
        global::System.AttributeTargets.Event,
        Inherited = false)]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    internal sealed class SkipLocalsInitAttribute : global::System.Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.InteropServices.SuppressGCTransitionAttribute.g.cs" label="T_System.Runtime.InteropServices.SuppressGCTransitionAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.InteropServices
{
    /// <summary>
    /// An attribute used to indicate a GC transition should be skipped when making an unmanaged function call.
    /// </summary>
    /// <example>
    /// Example of a valid use case. The Win32 `GetTickCount()` function is a small performance related function
    /// that reads some global memory and returns the value. In this case, the GC transition overhead is significantly
    /// more than the memory read.
    /// <code>
    /// using System;
    /// using System.Runtime.InteropServices;
    /// class Program
    /// {
    ///     [DllImport("Kernel32")]
    ///     [SuppressGCTransition]
    ///     static extern int GetTickCount();
    ///     static void Main()
    ///     {
    ///         Console.WriteLine($"{GetTickCount()}");
    ///     }
    /// }
    /// </code>
    /// </example>
    /// <remarks>
    /// This attribute is ignored if applied to a method without the <see cref="global::System.Runtime.InteropServices.DllImportAttribute"/>.
    ///
    /// Forgoing this transition can yield benefits when the cost of the transition is more than the execution time
    /// of the unmanaged function. However, avoiding this transition removes some of the guarantees the runtime
    /// provides through a normal P/Invoke. When exiting the managed runtime to enter an unmanaged function the
    /// GC must transition from Cooperative mode into Preemptive mode. Full details on these modes can be found at
    /// https://github.com/dotnet/runtime/blob/main/docs/coding-guidelines/clr-code-guide.md#2.1.8.
    /// Suppressing the GC transition is an advanced scenario and should not be done without fully understanding
    /// potential consequences.
    ///
    /// One of these consequences is an impact to Mixed-mode debugging (https://docs.microsoft.com/visualstudio/debugger/how-to-debug-in-mixed-mode).
    /// During Mixed-mode debugging, it is not possible to step into or set breakpoints in a P/Invoke that
    /// has been marked with this attribute. A workaround is to switch to native debugging and set a breakpoint in the native function.
    /// In general, usage of this attribute is not recommended if debugging the P/Invoke is important, for example
    /// stepping through the native code or diagnosing an exception thrown from the native code.
    ///
    /// The runtime may load the native library for method marked with this attribute in advance before the method is called for the first time.
    /// Usage of this attribute is not recommended for platform neutral libraries with conditional platform specific code.
    ///
    /// The P/Invoke method that this attribute is applied to must have all of the following properties:
    ///   * Native function always executes for a trivial amount of time (less than 1 microsecond).
    ///   * Native function does not perform a blocking syscall (e.g. any type of I/O).
    ///   * Native function does not call back into the runtime (e.g. Reverse P/Invoke).
    ///   * Native function does not throw exceptions.
    ///   * Native function does not manipulate locks or other concurrency primitives.
    ///
    /// Consequences of invalid uses of this attribute:
    ///   * GC starvation.
    ///   * Immediate runtime termination.
    ///   * Data corruption.
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, Inherited = false)]
    internal sealed class SuppressGCTransitionAttribute : global::System.Attribute
    {
        public SuppressGCTransitionAttribute()
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute.g.cs" label="T_System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.InteropServices
{
    /// <summary>
    /// Any method marked with <see cref="global::System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute" /> can be directly called from
    /// native code. The function token can be loaded to a local variable using the <see href="https://docs.microsoft.com/dotnet/csharp/language-reference/operators/pointer-related-operators#address-of-operator-">address-of</see> operator
    /// in C# and passed as a callback to a native method.
    /// </summary>
    /// <remarks>
    /// Methods marked with this attribute have the following restrictions:
    ///   * Method must be marked "static".
    ///   * Must not be called from managed code.
    ///   * Must only have <see href="https://docs.microsoft.com/dotnet/framework/interop/blittable-and-non-blittable-types">blittable</see> arguments.
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, Inherited = false)]
    internal sealed class UnmanagedCallersOnlyAttribute : global::System.Attribute
    {
        public UnmanagedCallersOnlyAttribute()
        {
        }

        /// <summary>
        /// Optional. If omitted, the runtime will use the default platform calling convention.
        /// </summary>
        /// <remarks>
        /// Supplied types must be from the official "System.Runtime.CompilerServices" namespace and
        /// be of the form "CallConvXXX".
        /// </remarks>
        public global::System.Type[]? CallConvs;

        /// <summary>
        /// Optional. If omitted, no named export is emitted during compilation.
        /// </summary>
        public string? EntryPoint;
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.ObsoletedOSPlatformAttribute.g.cs" label="T_System.Runtime.Versioning.ObsoletedOSPlatformAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    /// <summary>
    /// Marks APIs that were obsoleted in a given operating system version.
    /// </summary>
    /// <remarks>
    /// Primarily used by OS bindings to indicate APIs that should not be used anymore.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Assembly |
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Enum |
        global::System.AttributeTargets.Event |
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Module |
        global::System.AttributeTargets.Property |
        global::System.AttributeTargets.Struct,
        AllowMultiple = true, Inherited = false)]
    internal sealed class ObsoletedOSPlatformAttribute : Attribute // global::System.Runtime.Versioning.OSPlatformAttribute
    {
        public ObsoletedOSPlatformAttribute(string platformName)
            //: base(platformName)
        {
        }

        public ObsoletedOSPlatformAttribute(string platformName, string? message)
            //: base(platformName)
        {
            Message = message;
        }

        public string? Message { get; }

        public string? Url { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.RequiresPreviewFeaturesAttribute.g.cs" label="T_System.Runtime.Versioning.RequiresPreviewFeaturesAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Assembly |
        global::System.AttributeTargets.Module |
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Delegate |
        global::System.AttributeTargets.Struct |
        global::System.AttributeTargets.Enum |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Property |
        global::System.AttributeTargets.Field |
        AttributeTargets.Event, Inherited = false)]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    internal sealed class RequiresPreviewFeaturesAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Runtime.Versioning.RequiresPreviewFeaturesAttribute"/> class.
        /// </summary>
        public RequiresPreviewFeaturesAttribute() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="global::System.Runtime.Versioning.RequiresPreviewFeaturesAttribute"/> class with the specified message.
        /// </summary>
        /// <param name="message">An optional message associated with this attribute instance.</param>
        public RequiresPreviewFeaturesAttribute(string? message)
        {
            Message = message;
        }

        /// <summary>
        /// Returns the optional message associated with this attribute instance.
        /// </summary>
        public string? Message { get; }

        /// <summary>
        /// Returns the optional URL associated with this attribute instance.
        /// </summary>
        public string? Url { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.SupportedOSPlatformAttribute.g.cs" label="T_System.Runtime.Versioning.SupportedOSPlatformAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    /// <summary>
    /// Records the operating system (and minimum version) that supports an API. Multiple attributes can be
    /// applied to indicate support on multiple operating systems.
    /// </summary>
    /// <remarks>
    /// Callers can apply a <see cref="global::System.Runtime.Versioning.SupportedOSPlatformAttribute " />
    /// or use guards to prevent calls to APIs on unsupported operating systems.
    ///
    /// A given platform should only be specified once.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Assembly |
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Enum |
        global::System.AttributeTargets.Event |
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Module |
        global::System.AttributeTargets.Property |
        global::System.AttributeTargets.Struct,
        AllowMultiple = true, Inherited = false)]
    internal sealed class SupportedOSPlatformAttribute : Attribute // global::System.Runtime.Versioning.OSPlatformAttribute
    {
        public SupportedOSPlatformAttribute(string platformName)
            //: base(platformName)
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.SupportedOSPlatformGuardAttribute.g.cs" label="T_System.Runtime.Versioning.SupportedOSPlatformGuardAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    /// <summary>
    /// Annotates a custom guard field, property or method with a supported platform name and optional version.
    /// Multiple attributes can be applied to indicate guard for multiple supported platforms.
    /// </summary>
    /// <remarks>
    /// Callers can apply a <see cref="global::System.Runtime.Versioning.SupportedOSPlatformGuardAttribute " /> to a field, property or method
    /// and use that field, property or method in a conditional or assert statements in order to safely call platform specific APIs.
    ///
    /// The type of the field or property should be boolean, the method return type should be boolean in order to be used as platform guard.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Property,
        AllowMultiple = true, Inherited = false)]
    internal sealed class SupportedOSPlatformGuardAttribute : Attribute // global::System.Runtime.Versioning.OSPlatformAttribute
    {
        public SupportedOSPlatformGuardAttribute(string platformName)
            //: base(platformName)
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.TargetPlatformAttribute.g.cs" label="T_System.Runtime.Versioning.TargetPlatformAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    /// <summary>
    /// Records the platform that the project targeted.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Assembly, AllowMultiple = false, Inherited = false)]
    internal sealed class TargetPlatformAttribute : Attribute // global::System.Runtime.Versioning.OSPlatformAttribute
    {
        public TargetPlatformAttribute(string platformName)
            //: base(platformName)
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.UnsupportedOSPlatformAttribute.g.cs" label="T_System.Runtime.Versioning.UnsupportedOSPlatformAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    /// <summary>
    /// Marks APIs that were removed in a given operating system version.
    /// </summary>
    /// <remarks>
    /// Primarily used by OS bindings to indicate APIs that are only available in
    /// earlier versions.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Assembly |
        global::System.AttributeTargets.Class |
        global::System.AttributeTargets.Constructor |
        global::System.AttributeTargets.Enum |
        global::System.AttributeTargets.Event |
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Interface |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Module |
        global::System.AttributeTargets.Property |
        global::System.AttributeTargets.Struct,
        AllowMultiple = true, Inherited = false)]
    internal sealed class UnsupportedOSPlatformAttribute : Attribute // global::System.Runtime.Versioning.OSPlatformAttribute
    {
        public UnsupportedOSPlatformAttribute(string platformName)
            //: base(platformName)
        {
        }
        public UnsupportedOSPlatformAttribute(string platformName, string? message)
            //: base(platformName)
        {
            Message = message;
        }

        public string? Message { get; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Runtime.Versioning.UnsupportedOSPlatformGuardAttribute.g.cs" label="T_System.Runtime.Versioning.UnsupportedOSPlatformGuardAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace System.Runtime.Versioning
{
    /// <summary>
    /// Annotates the custom guard field, property or method with an unsupported platform name and optional version.
    /// Multiple attributes can be applied to indicate guard for multiple unsupported platforms.
    /// </summary>
    /// <remarks>
    /// Callers can apply a <see cref="global::System.Runtime.Versioning.UnsupportedOSPlatformGuardAttribute " /> to a field, property or method
    /// and use that  field, property or method in a conditional or assert statements as a guard to safely call APIs unsupported on those platforms.
    ///
    /// The type of the field or property should be boolean, the method return type should be boolean in order to be used as platform guard.
    /// </remarks>
    [global::System.AttributeUsage(
        global::System.AttributeTargets.Field |
        global::System.AttributeTargets.Method |
        global::System.AttributeTargets.Property,
        AllowMultiple = true, Inherited = false)]
    internal sealed class UnsupportedOSPlatformGuardAttribute : Attribute // global::System.Runtime.Versioning.OSPlatformAttribute
    {
        public UnsupportedOSPlatformGuardAttribute(string platformName)
            //: base(platformName)
        {
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\T_System.Threading.Tasks.TaskToAsyncResult.g.cs" label="T_System.Threading.Tasks.TaskToAsyncResult.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable annotations
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Diagnostics;

namespace System.Threading.Tasks
{
    /// <summary>
    /// Provides methods for using <see cref="Task"/> to implement the Asynchronous Programming Model
    /// pattern based on "Begin" and "End" methods.
    /// </summary>
    internal static class TaskToAsyncResult
    {
        /// <summary>Creates a new <see cref="IAsyncResult"/> from the specified <see cref="Task"/>, optionally invoking <paramref name="callback"/> when the task has completed.</summary>
        /// <param name="task">The <see cref="Task"/> to be wrapped in an <see cref="IAsyncResult"/>.</param>
        /// <param name="callback">The callback to be invoked upon <paramref name="task"/>'s completion. If <see langword="null"/>, no callback will be invoked.</param>
        /// <param name="state">The state to be stored in the <see cref="IAsyncResult"/>.</param>
        /// <returns>An <see cref="IAsyncResult"/> to represent the task's asynchronous operation. This instance will also be passed to <paramref name="callback"/> when it's invoked.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="task"/> is null.</exception>
        /// <remarks>
        /// In conjunction with the <see cref="End(IAsyncResult)"/> or <see cref="End{TResult}(IAsyncResult)"/> methods, this method may be used
        /// to implement the Begin/End pattern (also known as the Asynchronous Programming Model pattern, or APM). It is recommended to not expose this pattern
        /// in new code; the methods on <see cref="TaskToAsyncResult"/> are intended only to help implement such Begin/End methods when they must be exposed, for example
        /// because a base class provides virtual methods for the pattern, or when they've already been exposed and must remain for compatibility.  These methods enable
        /// implementing all of the core asynchronous logic via <see cref="Task"/>s and then easily implementing Begin/End methods around that functionality.
        /// </remarks>
        public static IAsyncResult Begin(Task task, AsyncCallback? callback, object? state)
        {
#if NET6_0_OR_GREATER
            ArgumentNullException.ThrowIfNull(task);
#else
            if (task is null)
            {
                throw new ArgumentNullException(nameof(task));
            }
#endif

            return new TaskAsyncResult(task, state, callback);
        }

        /// <summary>Waits for the <see cref="Task"/> wrapped by the <see cref="IAsyncResult"/> returned by <see cref="Begin"/> to complete.</summary>
        /// <param name="asyncResult">The <see cref="IAsyncResult"/> for which to wait.</param>
        /// <exception cref="ArgumentNullException"><paramref name="asyncResult"/> is null.</exception>
        /// <exception cref="ArgumentException"><paramref name="asyncResult"/> was not produced by a call to <see cref="Begin"/>.</exception>
        /// <remarks>This will propagate any exception stored in the wrapped <see cref="Task"/>.</remarks>
        public static void End(IAsyncResult asyncResult) =>
            Unwrap(asyncResult).GetAwaiter().GetResult();

        /// <summary>Waits for the <see cref="Task{TResult}"/> wrapped by the <see cref="IAsyncResult"/> returned by <see cref="Begin"/> to complete.</summary>
        /// <param name="asyncResult">The <see cref="IAsyncResult"/> for which to wait.</param>
        /// <returns>The result of the <see cref="Task{TResult}"/> wrapped by the <see cref="IAsyncResult"/>.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="asyncResult"/> is null.</exception>
        /// <exception cref="ArgumentException"><paramref name="asyncResult"/> was not produced by a call to <see cref="Begin"/>.</exception>
        /// <remarks>This will propagate any exception stored in the wrapped <see cref="Task{TResult}"/>.</remarks>
        public static TResult End<TResult>(IAsyncResult asyncResult) =>
            Unwrap<TResult>(asyncResult).GetAwaiter().GetResult();

        /// <summary>Extracts the underlying <see cref="Task"/> from an <see cref="IAsyncResult"/> created by <see cref="Begin"/>.</summary>
        /// <param name="asyncResult">The <see cref="IAsyncResult"/> created by <see cref="Begin"/>.</param>
        /// <returns>The <see cref="Task"/> wrapped by the <see cref="IAsyncResult"/>.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="asyncResult"/> is null.</exception>
        /// <exception cref="ArgumentException"><paramref name="asyncResult"/> was not produced by a call to <see cref="Begin"/>.</exception>
        public static Task Unwrap(IAsyncResult asyncResult)
        {
#if NET6_0_OR_GREATER
            ArgumentNullException.ThrowIfNull(asyncResult);
#else
            if (asyncResult is null)
            {
                throw new ArgumentNullException(nameof(asyncResult));
            }
#endif

            if ((asyncResult as TaskAsyncResult)?._task is not Task task)
            {
                throw new ArgumentException(null, nameof(asyncResult));
            }

            return task;
        }

        /// <summary>Extracts the underlying <see cref="Task{TResult}"/> from an <see cref="IAsyncResult"/> created by <see cref="Begin"/>.</summary>
        /// <param name="asyncResult">The <see cref="IAsyncResult"/> created by <see cref="Begin"/>.</param>
        /// <returns>The <see cref="Task{TResult}"/> wrapped by the <see cref="IAsyncResult"/>.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="asyncResult"/> is null.</exception>
        /// <exception cref="ArgumentException">
        /// <paramref name="asyncResult"/> was not produced by a call to <see cref="Begin"/>,
        /// or the <see cref="Task{TResult}"/> provided to <see cref="Begin"/> was used a generic type parameter
        /// that's different from the <typeparamref name="TResult"/> supplied to this call.
        /// </exception>
        public static Task<TResult> Unwrap<TResult>(IAsyncResult asyncResult)
        {
#if NET6_0_OR_GREATER
            ArgumentNullException.ThrowIfNull(asyncResult);
#else
            if (asyncResult is null)
            {
                throw new ArgumentNullException(nameof(asyncResult));
            }
#endif

            if ((asyncResult as TaskAsyncResult)?._task is not Task<TResult> task)
            {
                throw new ArgumentException(null, nameof(asyncResult));
            }

            return task;
        }

        /// <summary>Provides a simple <see cref="IAsyncResult"/> that wraps a <see cref="Task"/>.</summary>
        /// <remarks>
        /// We could use the Task as the IAsyncResult if the Task's AsyncState is the same as the object state,
        /// but that's very rare, in particular in a situation where someone cares about allocation, and always
        /// using TaskAsyncResult simplifies things and enables additional optimizations.
        /// </remarks>
        private sealed class TaskAsyncResult : IAsyncResult
        {
            /// <summary>The wrapped Task.</summary>
            internal readonly Task _task;
            /// <summary>Callback to invoke when the wrapped task completes.</summary>
            private readonly AsyncCallback? _callback;

            /// <summary>Initializes the IAsyncResult with the Task to wrap and the associated object state.</summary>
            /// <param name="task">The Task to wrap.</param>
            /// <param name="state">The new AsyncState value.</param>
            /// <param name="callback">Callback to invoke when the wrapped task completes.</param>
            internal TaskAsyncResult(Task task, object? state, AsyncCallback? callback)
            {
                Debug.Assert(task is not null);

                _task = task;
                AsyncState = state;

                if (task.IsCompleted)
                {
                    // The task has already completed.  Treat this as synchronous completion.
                    // Invoke the callback; no need to store it.
                    CompletedSynchronously = true;
                    callback?.Invoke(this);
                }
                else if (callback is not null)
                {
                    // Asynchronous completion, and we have a callback; schedule it. We use OnCompleted rather than ContinueWith in
                    // order to avoid running synchronously if the task has already completed by the time we get here but still run
                    // synchronously as part of the task's completion if the task completes after (the more common case).
                    _callback = callback;
                    _task.ConfigureAwait(continueOnCapturedContext: false)
                         .GetAwaiter()
                         .OnCompleted(() => _callback.Invoke(this));
                }
            }

            /// <inheritdoc/>
            public object? AsyncState { get; }

            /// <inheritdoc/>
            public bool CompletedSynchronously { get; }

            /// <inheritdoc/>
            public bool IsCompleted => _task.IsCompleted;

            /// <inheritdoc/>
            public WaitHandle AsyncWaitHandle => ((IAsyncResult)_task).AsyncWaitHandle;
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Meziantou.Polyfill ](/sources/Meziantou.Polyfill.zip)

:::


### Share Meziantou.Polyfill 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMeziantou.Polyfill&quote=Meziantou.Polyfill" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMeziantou.Polyfill&text=Meziantou.Polyfill:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMeziantou.Polyfill" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMeziantou.Polyfill&title=Meziantou.Polyfill" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMeziantou.Polyfill&title=Meziantou.Polyfill&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMeziantou.Polyfill" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Meziantou.Polyfill

### In the same category (EnhancementClass) - 24 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [BuilderGenerator](/docs/BuilderGenerator)


#### [CopyTo](/docs/CopyTo)


#### [DudNet](/docs/DudNet)


#### [FastGenericNew](/docs/FastGenericNew)


#### [GeneratorEquals](/docs/GeneratorEquals)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemoryPack](/docs/MemoryPack)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)

