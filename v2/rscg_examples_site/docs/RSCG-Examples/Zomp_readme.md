# Sync Method Generator

[![Build](https://github.com/zompinc/sync-method-generator/actions/workflows/build.yml/badge.svg)](https://github.com/zompinc/sync-method-generator/actions/workflows/build.yml)
![Support .NET Standard 2.0](https://img.shields.io/badge/dotnet%20version-.NET%20Standard%202.0-blue)
[![Nuget](https://img.shields.io/nuget/v/Zomp.SyncMethodGenerator)](https://www.nuget.org/packages/Zomp.SyncMethodGenerator)
[![codecov](https://codecov.io/gh/zompinc/sync-method-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/zompinc/sync-method-generator)

This [.NET source generator](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) produces a sync method from an async one.

## Use cases

- A library which exposes both sync and async version of a method
- An application has to process two kinds of data in the same way:
  - Large data from I/O which cannot be stored in memory before processing: Original async method
  - Small sample of data in memory, usually a sample of the larger data: Generated sync method

## How it works

Add `CreateSyncVersionAttribute` to your async method in your `partial` class

```cs
[Zomp.SyncMethodGenerator.CreateSyncVersion]
static async Task WriteAsync(ReadOnlyMemory<byte> buffer, Stream stream, 
CancellationToken ct)
    => await stream.WriteAsync(buffer, ct).ConfigureAwait(true);
```

And it will generate a sync version of the method:

```cs
static void Write(ReadOnlySpan<byte> buffer, Stream stream)
    => stream.Write(buffer);
```

A list of changes applied to the new synchronized method:

- Remove async modifier
- Remove await from methods as well as `foreach` statement
- Change types

  | From                                                                                                                                                                                       | To                                                                                                       |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
  | [Task](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task) or [ValueTask](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1)                | void                                                                                                     |
  | [Task](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1) or [ValueTask](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1) | T                                                                                                        |
  | [IAsyncEnumerable](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1)                                                                         | [IEnumerable](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1) |
  | [IAsyncEnumerator](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerator-1)                                                                         | [IEnumerator](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerator-1) |
  | [Memory](https://learn.microsoft.com/en-us/dotnet/api/system.memory-1)                                                                                                                 | [Span](https://learn.microsoft.com/en-us/dotnet/api/system.span-1)                                   |
  | [ReadOnlyMemory](https://learn.microsoft.com/en-us/dotnet/api/system.readonlymemory-1)                                                                                                 | [ReadOnlySpan](https://learn.microsoft.com/en-us/dotnet/api/system.readonlyspan-1)                   |

- Remove parameters
  - [CancellationToken](https://learn.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken)
  - [IProgress](https://learn.microsoft.com/en-us/dotnet/api/system.iprogress-1)
- Invocation changes
  - Remove [ConfigureAwait](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.configureawait)
  - Remove [WithCancellation](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskasyncenumerableextensions.withcancellation)
  - Remove `Async` suffix from method calls (e.g. [MoveNextAsync](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerator-1.movenextasync) becomes [MoveNext](https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator.movenext))
  - Remove [CancellationToken](https://learn.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken) parameter
  - Remove [IProgress.Report(T)](https://learn.microsoft.com/en-us/dotnet/api/system.iprogress-1.report) call
  - Remove [Memory.Span](https://learn.microsoft.com/en-us/dotnet/api/system.memory-1.span) property
- Remove `CreateSyncVersionAttribute`
- Update XML documentation

## Installation

To add the library use:

```sh
dotnet add package Zomp.SyncMethodGenerator
```
