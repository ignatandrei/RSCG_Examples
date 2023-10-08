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


<TOCInline toc={toc} />

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\Program.cs" label="Program.cs" >

  This is the use of **Meziantou.Polyfill** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
System.Console.WriteLine("Hello, World!");

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\StartProcess.cs" label="StartProcess.cs" >

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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\Debug.g.cs" label="Debug.g.cs" >


```csharp showLineNumbers 
// IncludedMembers: <null>
// ExcludedMembers: <null>
// System.Collections.Immutable.ImmutableArray`1: True
// System.Memory`1: True
// System.Net.Http.HttpContent: True
// System.ReadOnlyMemory`1: True
// System.ReadOnlySpan`1: True
// System.Span`1: True
// System.Threading.Tasks.ValueTask: True
// System.Threading.Tasks.ValueTask`1: True
//
// M:System.Collections.Concurrent.ConcurrentDictionary`2.GetOrAdd``1(`0,System.Func{`0,``0,`1},``0): False
// M:System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0): False
// M:System.Collections.Generic.CollectionExtensions.GetValueOrDefault``2(System.Collections.Generic.IReadOnlyDictionary{``0,``1},``0,``1): False
// M:System.Collections.Generic.KeyValuePair`2.Deconstruct(`0@,`1@): False
// M:System.Collections.Generic.Queue`1.TryDequeue(`0@): False
// M:System.Collections.Immutable.ImmutableArray`1.AsSpan(System.Int32,System.Int32): False
// M:System.Collections.Immutable.ImmutableArray`1.AsSpan(System.Range): False
// M:System.Diagnostics.Process.WaitForExitAsync(System.Threading.CancellationToken): False
// M:System.IO.Stream.Read(System.Span{System.Byte}): False
// M:System.IO.Stream.ReadAsync(System.Memory{System.Byte},System.Threading.CancellationToken): False
// M:System.IO.Stream.ReadAtLeast(System.Span{System.Byte},System.Int32,System.Boolean): False
// M:System.IO.Stream.ReadAtLeastAsync(System.Memory{System.Byte},System.Int32,System.Boolean,System.Threading.CancellationToken): False
// M:System.IO.Stream.Write(System.ReadOnlySpan{System.Byte}): False
// M:System.IO.Stream.WriteAsync(System.ReadOnlyMemory{System.Byte},System.Threading.CancellationToken): False
// M:System.IO.StreamReader.ReadLineAsync(): False
// M:System.IO.StreamReader.ReadLineAsync(System.Threading.CancellationToken): False
// M:System.IO.TextReader.ReadAsync(System.Memory{System.Char},System.Threading.CancellationToken): False
// M:System.IO.TextReader.ReadToEndAsync(System.Threading.CancellationToken): False
// M:System.IO.TextWriter.WriteAsync(System.ReadOnlyMemory{System.Char},System.Threading.CancellationToken): False
// M:System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}): False
// M:System.Linq.Enumerable.DistinctBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IEqualityComparer{``1}): False
// M:System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}): False
// M:System.Linq.Enumerable.MaxBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}): False
// M:System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1}): False
// M:System.Linq.Enumerable.MinBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1},System.Collections.Generic.IComparer{``1}): False
// M:System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0}): False
// M:System.Linq.Enumerable.OrderDescending``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}): False
// M:System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0}): False
// M:System.Linq.Enumerable.Order``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IComparer{``0}): False
// M:System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0}): False
// M:System.Linq.Enumerable.ToHashSet``1(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEqualityComparer{``0}): False
// M:System.Linq.Enumerable.Zip``2(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1}): False
// M:System.MemoryExtensions.AsSpan(System.String,System.Int32,System.Int32): False
// M:System.MemoryExtensions.Contains``1(System.ReadOnlySpan{``0},``0): False
// M:System.MemoryExtensions.Contains``1(System.Span{``0},``0): False
// M:System.Net.Http.HttpContent.CopyTo(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken): False
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream): False
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Net.TransportContext): False
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Net.TransportContext,System.Threading.CancellationToken): False
// M:System.Net.Http.HttpContent.CopyToAsync(System.IO.Stream,System.Threading.CancellationToken): False
// M:System.Net.Http.HttpContent.ReadAsStream(System.Threading.CancellationToken): False
// M:System.Net.Http.HttpContent.ReadAsStream: False
// M:System.String.Contains(System.Char): False
// M:System.String.Contains(System.Char,System.StringComparison): False
// M:System.String.Contains(System.String,System.StringComparison): False
// M:System.String.CopyTo(System.Span{System.Char}): False
// M:System.String.EndsWith(System.Char): False
// M:System.String.GetHashCode(System.StringComparison): False
// M:System.String.IndexOf(System.Char,System.StringComparison): False
// M:System.String.Replace(System.String,System.String,System.StringComparison): False
// M:System.String.ReplaceLineEndings(System.String): False
// M:System.String.ReplaceLineEndings: False
// M:System.String.Split(System.Char,System.Int32,System.StringSplitOptions): False
// M:System.String.Split(System.Char,System.StringSplitOptions): False
// M:System.String.StartsWith(System.Char): False
// M:System.String.TryCopyTo(System.Span{System.Char}): False
// M:System.Text.Encoding.GetString(System.ReadOnlySpan{System.Byte}): False
// M:System.Text.StringBuilder.Append(System.ReadOnlyMemory{System.Char}): False
// M:System.Text.StringBuilder.Append(System.ReadOnlySpan{System.Char}): False
// M:System.Text.StringBuilder.AppendJoin(System.Char,System.Object[]): False
// M:System.Text.StringBuilder.AppendJoin(System.Char,System.String[]): False
// M:System.Text.StringBuilder.AppendJoin(System.String,System.Object[]): False
// M:System.Text.StringBuilder.AppendJoin(System.String,System.String[]): False
// M:System.Text.StringBuilder.AppendJoin``1(System.Char,System.Collections.Generic.IEnumerable{``0}): False
// M:System.Text.StringBuilder.AppendJoin``1(System.String,System.Collections.Generic.IEnumerable{``0}): False
// M:System.Threading.CancellationTokenSource.CancelAsync: True
// M:System.Threading.Tasks.Task.WaitAsync(System.Threading.CancellationToken): False
// T:System.Collections.Generic.PriorityQueue`2: False
// T:System.Collections.Generic.ReferenceEqualityComparer: False
// T:System.Diagnostics.CodeAnalysis.AllowNullAttribute: False
// T:System.Diagnostics.CodeAnalysis.DisallowNullAttribute: False
// T:System.Diagnostics.CodeAnalysis.DoesNotReturnAttribute: False
// T:System.Diagnostics.CodeAnalysis.DoesNotReturnIfAttribute: False
// T:System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute: False
// T:System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes: False
// T:System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembersAttribute: False
// T:System.Diagnostics.CodeAnalysis.MaybeNullAttribute: False
// T:System.Diagnostics.CodeAnalysis.MaybeNullWhenAttribute: False
// T:System.Diagnostics.CodeAnalysis.MemberNotNullAttribute: False
// T:System.Diagnostics.CodeAnalysis.MemberNotNullWhenAttribute: False
// T:System.Diagnostics.CodeAnalysis.NotNullAttribute: False
// T:System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute: False
// T:System.Diagnostics.CodeAnalysis.NotNullWhenAttribute: False
// T:System.Diagnostics.CodeAnalysis.RequiresAssemblyFilesAttribute: False
// T:System.Diagnostics.CodeAnalysis.RequiresDynamicCodeAttribute: False
// T:System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute: False
// T:System.Diagnostics.CodeAnalysis.SetsRequiredMembersAttribute: False
// T:System.Diagnostics.CodeAnalysis.StringSyntaxAttribute: False
// T:System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute: False
// T:System.Diagnostics.CodeAnalysis.UnscopedRefAttribute: False
// T:System.Diagnostics.StackTraceHiddenAttribute: False
// T:System.HashCode: False
// T:System.Index: False
// T:System.Net.Http.ReadOnlyMemoryContent: False
// T:System.Range: False
// T:System.Runtime.CompilerServices.AsyncMethodBuilderAttribute: False
// T:System.Runtime.CompilerServices.CallerArgumentExpressionAttribute: False
// T:System.Runtime.CompilerServices.CollectionBuilderAttribute: True
// T:System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute: False
// T:System.Runtime.CompilerServices.DisableRuntimeMarshallingAttribute: False
// T:System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute: False
// T:System.Runtime.CompilerServices.InterpolatedStringHandlerAttribute: False
// T:System.Runtime.CompilerServices.IsExternalInit: False
// T:System.Runtime.CompilerServices.ModuleInitializerAttribute: False
// T:System.Runtime.CompilerServices.RequiredMemberAttribute: False
// T:System.Runtime.CompilerServices.SkipLocalsInitAttribute: False
// T:System.Runtime.CompilerServices.TupleElementNamesAttribute: False
// T:System.Runtime.InteropServices.SuppressGCTransitionAttribute: False
// T:System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute: False
// T:System.Runtime.Versioning.ObsoletedOSPlatformAttribute: False
// T:System.Runtime.Versioning.RequiresPreviewFeaturesAttribute: False
// T:System.Runtime.Versioning.SupportedOSPlatformAttribute: False
// T:System.Runtime.Versioning.SupportedOSPlatformGuardAttribute: False
// T:System.Runtime.Versioning.TargetPlatformAttribute: False
// T:System.Runtime.Versioning.UnsupportedOSPlatformAttribute: False
// T:System.Runtime.Versioning.UnsupportedOSPlatformGuardAttribute: False
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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\Poly\src\Dm\obj\GX\Meziantou.Polyfill\Meziantou.Polyfill.PolyfillGenerator\M_System.Diagnostics.Process.WaitForExitAsync(System.Threading.CancellationToken).g.cs" label="M_System.Diagnostics.Process.WaitForExitAsync(System.Threading.CancellationToken).g.cs" >


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

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [BuilderGenerator](/docs/BuilderGenerator)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Decorator](/docs/RSCG_Decorator)


### [RSCG_Static](/docs/RSCG_Static)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)

