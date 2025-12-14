---
sidebar_position: 2460
title: 246 - Imposter
description: Generate classes from interfaces and allows return of mock data.
slug: /Imposter
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveTests.mdx';

# Imposter  by Bitchiko Tchelidze


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Imposter?label=Imposter)](https://www.nuget.org/packages/Imposter/)
[![GitHub last commit](https://img.shields.io/github/last-commit/themidnightgospel/Imposter?label=updated)](https://github.com/themidnightgospel/Imposter)
![GitHub Repo stars](https://img.shields.io/github/stars/themidnightgospel/Imposter?style=social)

## Details

### Info
:::info

Name: **Imposter**

Imposter — Source-generated test doubles, zero runtime overhead. A high-performance Roslyn incremental source generator that produces imposters (mocks/stubs) for interfaces and overridable class members via GenerateImposterAttribute. Ships analyzer + runtime in a single package.

Author: Bitchiko Tchelidze

NuGet: 
*https://www.nuget.org/packages/Imposter/*   


You can find more details at https://github.com/themidnightgospel/Imposter

Source: https://github.com/themidnightgospel/Imposter

:::

### Author
:::note
Bitchiko Tchelidze 
![Alt text](https://github.com/themidnightgospel.png)
:::

### Original Readme
:::note

<p align="center">
  <img src="docs/imposter_logo.png" alt="Imposter logo" width="140" />
</p>

<p align="center">
    Fast and Memory-Efficient Mocking Library
</p>

[![Build, Test, and Format verification](https://github.com/themidnightgospel/Imposter/actions/workflows/build-and-test.yml/badge.svg?branch=master)](https://github.com/themidnightgospel/Imposter/actions/workflows/build-and-test.yml)
[![Nuget](https://img.shields.io/nuget/v/Imposter.svg)](https://www.nuget.org/packages/Imposter)

Imposter is a mocking library that's using roslyn source generators to achieve high performance and low memory footprint.

Visit the [Docs](https://themidnightgospel.github.io/Imposter/) for more information

## 🚀 Quick Start

Add nuget package reference:

```bash
dotnet add package Imposter
```

Pick an interface or non-sealed class that you would like to generate an imposter for.

Say we have a below interface

```csharp

namespace Application.Domain;

public interface ICalculator
{
    int Add(int a, int b);
}
```

Use `[GenerateImposter]` attribute in your **tests** project, this will generate an imoster

```csharp
[assembly: GenerateImposter(typeof(Application.Domain.ICalculator))]
```

Then use can use the generated imposter in your tests

```csharp
using System.Threading.Tasks;
using Imposter.Abstractions;

// c# 14
var imposter = ICalculator.Imposter();

// c# 9 - 13
// var imposter = new ICalculatorImposter();

imposter.Add(Arg<int>.Any(), Arg<int>.Any())
    .Returns(1)
    .Then()
    .Returns(2);

var calculator = imposter.Instance();

calculator.Add(1, 2); // 1
calculator.Add(1, 2); // 2
```

Learn more: https://themidnightgospel.github.io/Imposter/

## ✨ Feature-Rich

 - [Method Impersonation](https://themidnightgospel.github.io/Imposter/latest/methods/) 
 - [Property Impersonation](https://themidnightgospel.github.io/Imposter/latest/properties/)
 - [Indexer Impersonation](https://themidnightgospel.github.io/Imposter/latest/indexers/)
 - [Event Impersonation](https://themidnightgospel.github.io/Imposter/latest/events/)
 - [Class Impersonation](https://themidnightgospel.github.io/Imposter/latest/base-implementation/)
 - [Generics](https://themidnightgospel.github.io/Imposter/latest/generics/)
 - [Implicit & Explicit Modes](https://themidnightgospel.github.io/Imposter/latest/implicit-vs-explicit/)
 - [Use Base implementation](https://themidnightgospel.github.io/Imposter/latest/base-implementation/)
 - [Async Support](https://themidnightgospel.github.io/Imposter/latest/methods/#async-methods)
 - [Protected members Impersonation](https://themidnightgospel.github.io/Imposter/latest/methods/protected-members/)

## ⏱️ Benchmark

We benchmarked the simple method-impersonation scenario: we set up a `Square` method to return `input * input` and ran it for 1, 10, 100, and 1000 iterations.

```csharp
public interface ICalculator
{
    int Square(int input);
}
```

Mean execution time 

| Method      | Iteration | Mean            |
|-------------|-----------|----------------:|
| Moq         | 1         | 69,346.1 ns |  
| NSubstitute | 1         | 1,976.2 ns |   
| FakItEasy   | 1         | 2,006.7 ns |   
| Imposter    | 1         | **194.3 ns** |     
| Moq         | 10        | 686,282.9 ns |  
| NSubstitute | 10        | 11,201.6 ns |  
| FakItEasy   | 10        | 12,399.0 ns |   
| Imposter    | 10        | **1,896.7 ns** |   
| Moq         | 100       | 6,804,897.3 ns |
| NSubstitute | 100       | 335,390.6 ns | 
| FakItEasy   | 100       | 258,220.2 ns |   
| Imposter    | 100       | **34,011.7 ns** |  
| Moq         | 1000      | 99,710,929.5 ns |
| NSubstitute | 1000      | 26,986,939.0 ns |
| FakItEasy   | 1000      | 18,997,374.5 ns  |   
| Imposter    | 1000      | **2,452,970.7 ns** |


Allocated Memory

| Method      | Iteration | Allocated   |
|-------------|-----------|------------:|
| Moq         | 1         | 13.05 KB |
| NSubstitute | 1         | 7.84 KB |
| FakeItEasy  | 1         | 5.84 KB |
| Imposter    | 1         | **2.4 KB** |
| Moq         | 10        | 115.73 KB |
| NSubstitute | 10        | 29.29 KB |
| FakeItEasy  | 10        |  38.81 KB |
| Imposter    | 10        | **22.37 KB** |
| Moq         | 100       | 1416.91 KB |
| NSubstitute | 100       | 247.26 KB |
| FakeItEasy  | 100       |  1033.38 KB |
| Imposter    | 100       | **222.05 KB** |
| Moq         | 1000      | 42275.19 KB |
| NSubstitute | 1000      | 2420.82 KB |
| FakeItEasy  | 1000      |  77101.74 KB |
| Imposter    | 1000      | **2218.93 KB** |


Benchmark Environment

```
BenchmarkDotNet v0.15.6, Windows 11 (10.0.26200.6899)
13th Gen Intel Core i9-13900HX 2.20GHz, 1 CPU, 32 logical and 24 physical cores
.NET SDK 10.0.100
[Host]     : .NET 8.0.21 (8.0.21, 8.0.2125.47513), X64 RyuJIT x86-64-v3
DefaultJob : .NET 8.0.21 (8.0.21, 8.0.2125.47513), X64 RyuJIT x86-64-v3
```

See other benchmarks [benchmark](https://github.com/themidnightgospel/Imposter/blob/3172c333603fd2d76031b20be39753a9b62f31c3/benchmarks/Imposter.Benchmarks/ImposterVsMoqVsNSubstitute/SimpleMethodMockingBenchmarks.cs#L12)

## Docs
Docs: https://themidnightgospel.github.io/Imposter/

## License

Licensed under the MIT License. See LICENSE.txt for details.


:::

### About
:::note

Generate classes from interfaces and allows return of mock data.


Useful for testing and prototyping.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Imposter**
```xml showLineNumbers {23}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.5.0" />
   <PackageReference Include="MSTest.TestAdapter" Version="2.2.10" />
    <PackageReference Include="MSTest.TestFramework" Version="2.2.10" />
    <PackageReference Include="coverlet.collector" Version="3.2.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\MockData\MockData.csproj" />
  </ItemGroup>
	<ItemGroup>
		<PackageReference Include="Imposter" Version="0.1.4" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Imposter\src\TestClock\TestClock.cs" label="TestClock.cs" >

  This is the use of **Imposter** in *TestClock.cs*

```csharp showLineNumbers 

using MockData;
namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var mock = new IMyClockImposter();
        mock.GetUtcNow().Returns(DateTime.Now.AddYears(-1));
        mock.GetNow().Returns(DateTime.Now.AddYears(-1));
        IMyClock clock = mock.Instance();
        Assert.AreEqual(DateTime.Now.AddYears(-1).Year, clock.GetNow().Year);
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Imposter\src\TestClock\Usings.cs" label="Usings.cs" >

  This is the use of **Imposter** in *Usings.cs*

```csharp showLineNumbers 
global using Microsoft.VisualStudio.TestTools.UnitTesting;
global using Imposter.Abstractions;

[assembly: GenerateImposter(typeof(MockData.IMyClock))]


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Imposter\src\TestClock\obj\GX\Imposter.CodeGenerator\Imposter.CodeGenerator.CodeGenerator.ImposterGenerator\IMyClockImposter.g.cs" label="IMyClockImposter.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
#pragma warning disable
using global::System;
using global::System.Linq;
using global::System.Collections.Generic;
using global::System.Threading.Tasks;
using global::System.Diagnostics;
using global::System.Runtime.CompilerServices;
using global::Imposter.Abstractions;
using global::System.Collections.Concurrent;

namespace MockData
{
    [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
    public sealed class IMyClockImposter : global::Imposter.Abstractions.IHaveImposterInstance<global::MockData.IMyClock>
    {
        private readonly GetNowMethodImposter _getNowMethodImposter;
        private readonly GetUtcNowMethodImposter _getUtcNowMethodImposter;
        private readonly GetNowMethodInvocationHistoryCollection _getNowMethodInvocationHistoryCollection = new GetNowMethodInvocationHistoryCollection();
        private readonly GetUtcNowMethodInvocationHistoryCollection _getUtcNowMethodInvocationHistoryCollection = new GetUtcNowMethodInvocationHistoryCollection();
        public IGetNowMethodImposterBuilder GetNow()
        {
            return new GetNowMethodImposter.Builder(_getNowMethodImposter, _getNowMethodInvocationHistoryCollection);
        }

        public IGetUtcNowMethodImposterBuilder GetUtcNow()
        {
            return new GetUtcNowMethodImposter.Builder(_getUtcNowMethodImposter, _getUtcNowMethodInvocationHistoryCollection);
        }

        private readonly global::Imposter.Abstractions.ImposterMode _invocationBehavior;
        private ImposterTargetInstance _imposterInstance;
        global::MockData.IMyClock global::Imposter.Abstractions.IHaveImposterInstance<global::MockData.IMyClock>.Instance()
        {
            return _imposterInstance;
        }

        public delegate global::System.DateTime GetNowDelegate();
        public delegate void GetNowCallbackDelegate();
        public delegate global::System.Exception GetNowExceptionGeneratorDelegate();
        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetNowMethodInvocationHistory
        {
            bool Matches();
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        internal class GetNowMethodInvocationHistory : IGetNowMethodInvocationHistory
        {
            internal global::System.DateTime? Result;
            internal global::System.Exception? Exception;
            public GetNowMethodInvocationHistory(global::System.DateTime? Result, global::System.Exception? Exception)
            {
                this.Result = Result;
                this.Exception = Exception;
            }

            public bool Matches()
            {
                return true;
            }

            public override string ToString()
            {
                return "GetNow(" + "" + ")" + " => " + FormatValue(Result) + (Exception == null ? "" : " threw " + FormatValue(Exception));
            }

            private static string FormatValue(object? value)
            {
                return "<" + (value?.ToString() ?? "null") + ">";
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        internal class GetNowMethodInvocationHistoryCollection
        {
            private readonly global::System.Collections.Concurrent.ConcurrentStack<IGetNowMethodInvocationHistory> _invocationHistory = new global::System.Collections.Concurrent.ConcurrentStack<IGetNowMethodInvocationHistory>();
            internal void Add(IGetNowMethodInvocationHistory invocationHistory)
            {
                _invocationHistory.Push(invocationHistory);
            }

            internal int Count()
            {
                return _invocationHistory.Count(it => it.Matches());
            }

            public override string ToString()
            {
                return string.Join(Environment.NewLine, _invocationHistory.Select(invocation => invocation.ToString()));
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        class GetNowMethodInvocationImposterGroup
        {
            internal static GetNowMethodInvocationImposterGroup Default = new GetNowMethodInvocationImposterGroup();
            private readonly global::System.Collections.Concurrent.ConcurrentQueue<MethodInvocationImposter> _invocationImposters = new global::System.Collections.Concurrent.ConcurrentQueue<MethodInvocationImposter>();
            private MethodInvocationImposter? _lastestInvocationImposter;
            public GetNowMethodInvocationImposterGroup()
            {
            }

            internal MethodInvocationImposter AddInvocationImposter()
            {
                MethodInvocationImposter invocationImposter = new MethodInvocationImposter();
                _invocationImposters.Enqueue(invocationImposter);
                return invocationImposter;
            }

            private MethodInvocationImposter? GetInvocationImposter()
            {
                if (_invocationImposters.TryDequeue(out var invocationImposter))
                {
                    if (!invocationImposter.IsEmpty)
                    {
                        _lastestInvocationImposter = invocationImposter;
                    }

                    return invocationImposter;
                }

                return _lastestInvocationImposter;
            }

            public global::System.DateTime Invoke(global::Imposter.Abstractions.ImposterMode invocationBehavior, string methodDisplayName)
            {
                var invocationImposter = GetInvocationImposter();
                if (invocationImposter == null)
                {
                    if (invocationBehavior == global::Imposter.Abstractions.ImposterMode.Explicit)
                    {
                        throw new global::Imposter.Abstractions.MissingImposterException(methodDisplayName);
                    }

                    invocationImposter = MethodInvocationImposter.Default;
                }

                return invocationImposter.Invoke(invocationBehavior, methodDisplayName);
            }

            [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
            internal class MethodInvocationImposter
            {
                internal static MethodInvocationImposter Default;
                static MethodInvocationImposter()
                {
                    Default = new MethodInvocationImposter();
                    Default.Returns(DefaultResultGenerator);
                }

                private GetNowDelegate? _resultGenerator;
                private readonly global::System.Collections.Concurrent.ConcurrentQueue<GetNowCallbackDelegate> _callbacks = new global::System.Collections.Concurrent.ConcurrentQueue<GetNowCallbackDelegate>();
                internal bool IsEmpty => (_resultGenerator == null) && (_callbacks.Count == 0);

                public global::System.DateTime Invoke(global::Imposter.Abstractions.ImposterMode invocationBehavior, string methodDisplayName)
                {
                    if (_resultGenerator == null)
                    {
                        if (invocationBehavior == global::Imposter.Abstractions.ImposterMode.Explicit)
                        {
                            throw new global::Imposter.Abstractions.MissingImposterException(methodDisplayName);
                        }

                        _resultGenerator = DefaultResultGenerator;
                    }

                    global::System.DateTime result = _resultGenerator.Invoke();
                    foreach (var callback in _callbacks)
                    {
                        callback();
                    }

                    return result;
                }

                internal void Callback(GetNowCallbackDelegate callback)
                {
                    _callbacks.Enqueue(callback);
                }

                internal void Returns(GetNowDelegate resultGenerator)
                {
                    _resultGenerator = resultGenerator;
                }

                internal void Returns(global::System.DateTime value)
                {
                    _resultGenerator = () =>
                    {
                        return value;
                    };
                }

                internal void Throws(GetNowExceptionGeneratorDelegate exceptionGenerator)
                {
                    _resultGenerator = () =>
                    {
                        throw exceptionGenerator();
                    };
                }

                internal static global::System.DateTime DefaultResultGenerator()
                {
                    return default !;
                }
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetNowMethodInvocationImposterGroupCallback
        {
            IGetNowMethodInvocationImposterGroupContinuation Callback(GetNowCallbackDelegate callback);
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetNowMethodInvocationImposterGroupContinuation : IGetNowMethodInvocationImposterGroupCallback
        {
            IGetNowMethodInvocationImposterGroup Then();
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetNowMethodInvocationImposterGroup : IGetNowMethodInvocationImposterGroupCallback
        {
            IGetNowMethodInvocationImposterGroupContinuation Throws<TException>()
                where TException : global::System.Exception, new();
            IGetNowMethodInvocationImposterGroupContinuation Throws(global::System.Exception exception);
            IGetNowMethodInvocationImposterGroupContinuation Throws(GetNowExceptionGeneratorDelegate exceptionGenerator);
            IGetNowMethodInvocationImposterGroupContinuation Returns(GetNowDelegate resultGenerator);
            IGetNowMethodInvocationImposterGroupContinuation Returns(global::System.DateTime value);
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface GetNowInvocationVerifier
        {
            void Called(Count count);
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetNowMethodImposterBuilder : IGetNowMethodInvocationImposterGroup, IGetNowMethodInvocationImposterGroupCallback, GetNowInvocationVerifier
        {
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        internal class GetNowMethodImposter
        {
            private readonly global::System.Collections.Concurrent.ConcurrentStack<GetNowMethodInvocationImposterGroup> _invocationImposters = new global::System.Collections.Concurrent.ConcurrentStack<GetNowMethodInvocationImposterGroup>();
            private readonly GetNowMethodInvocationHistoryCollection _getNowMethodInvocationHistoryCollection;
            private readonly global::Imposter.Abstractions.ImposterMode _invocationBehavior;
            public GetNowMethodImposter(GetNowMethodInvocationHistoryCollection _getNowMethodInvocationHistoryCollection, global::Imposter.Abstractions.ImposterMode _invocationBehavior)
            {
                this._getNowMethodInvocationHistoryCollection = _getNowMethodInvocationHistoryCollection;
                this._invocationBehavior = _invocationBehavior;
            }

            public bool HasMatchingInvocationImposterGroup()
            {
                return FindMatchingInvocationImposterGroup() != null;
            }

            private GetNowMethodInvocationImposterGroup? FindMatchingInvocationImposterGroup()
            {
                if (_invocationImposters.TryPeek(out var invocationImposterGroup))
                    return invocationImposterGroup;
                else
                    return null;
            }

            public global::System.DateTime Invoke()
            {
                var matchingInvocationImposterGroup = FindMatchingInvocationImposterGroup();
                if (matchingInvocationImposterGroup == default)
                {
                    if (_invocationBehavior == global::Imposter.Abstractions.ImposterMode.Explicit)
                    {
                        throw new global::Imposter.Abstractions.MissingImposterException("DateTime IMyClock.GetNow()");
                    }

                    matchingInvocationImposterGroup = GetNowMethodInvocationImposterGroup.Default;
                }

                try
                {
                    var result = matchingInvocationImposterGroup.Invoke(_invocationBehavior, "DateTime IMyClock.GetNow()");
                    _getNowMethodInvocationHistoryCollection.Add(new GetNowMethodInvocationHistory(result, default));
                    return result;
                }
                catch (global::System.Exception ex)
                {
                    _getNowMethodInvocationHistoryCollection.Add(new GetNowMethodInvocationHistory(default !, ex));
                    throw;
                }
            }

            [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
            internal class Builder : IGetNowMethodImposterBuilder, IGetNowMethodInvocationImposterGroupContinuation
            {
                private readonly GetNowMethodImposter _imposter;
                private readonly GetNowMethodInvocationHistoryCollection _getNowMethodInvocationHistoryCollection;
                private readonly GetNowMethodInvocationImposterGroup _invocationImposterGroup;
                private GetNowMethodInvocationImposterGroup.MethodInvocationImposter _currentInvocationImposter;
                public Builder(GetNowMethodImposter _imposter, GetNowMethodInvocationHistoryCollection _getNowMethodInvocationHistoryCollection)
                {
                    this._imposter = _imposter;
                    this._getNowMethodInvocationHistoryCollection = _getNowMethodInvocationHistoryCollection;
                    this._invocationImposterGroup = new GetNowMethodInvocationImposterGroup();
                    _imposter._invocationImposters.Push(_invocationImposterGroup);
                    this._currentInvocationImposter = this._invocationImposterGroup.AddInvocationImposter();
                }

                IGetNowMethodInvocationImposterGroupContinuation IGetNowMethodInvocationImposterGroup.Throws<TException>()
                {
                    _currentInvocationImposter.Throws(() =>
                    {
                        throw new TException();
                    });
                    return this;
                }

                IGetNowMethodInvocationImposterGroupContinuation IGetNowMethodInvocationImposterGroup.Throws(global::System.Exception exception)
                {
                    _currentInvocationImposter.Throws(() =>
                    {
                        throw exception;
                    });
                    return this;
                }

                IGetNowMethodInvocationImposterGroupContinuation IGetNowMethodInvocationImposterGroup.Throws(GetNowExceptionGeneratorDelegate exceptionGenerator)
                {
                    _currentInvocationImposter.Throws(() =>
                    {
                        throw exceptionGenerator.Invoke();
                    });
                    return this;
                }

                IGetNowMethodInvocationImposterGroupContinuation IGetNowMethodInvocationImposterGroupCallback.Callback(GetNowCallbackDelegate callback)
                {
                    _currentInvocationImposter.Callback(callback);
                    return this;
                }

                IGetNowMethodInvocationImposterGroupContinuation IGetNowMethodInvocationImposterGroup.Returns(GetNowDelegate resultGenerator)
                {
                    _currentInvocationImposter.Returns(resultGenerator);
                    return this;
                }

                IGetNowMethodInvocationImposterGroupContinuation IGetNowMethodInvocationImposterGroup.Returns(global::System.DateTime value)
                {
                    _currentInvocationImposter.Returns(value);
                    return this;
                }

                IGetNowMethodInvocationImposterGroup IGetNowMethodInvocationImposterGroupContinuation.Then()
                {
                    this._currentInvocationImposter = _invocationImposterGroup.AddInvocationImposter();
                    return this;
                }

                void GetNowInvocationVerifier.Called(global::Imposter.Abstractions.Count count)
                {
                    var invocationCount = _getNowMethodInvocationHistoryCollection.Count();
                    if (!count.Matches(invocationCount))
                    {
                        throw new global::Imposter.Abstractions.VerificationFailedException(count, invocationCount, _getNowMethodInvocationHistoryCollection.ToString());
                    }
                }
            }
        }

        public delegate global::System.DateTime GetUtcNowDelegate();
        public delegate void GetUtcNowCallbackDelegate();
        public delegate global::System.Exception GetUtcNowExceptionGeneratorDelegate();
        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetUtcNowMethodInvocationHistory
        {
            bool Matches();
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        internal class GetUtcNowMethodInvocationHistory : IGetUtcNowMethodInvocationHistory
        {
            internal global::System.DateTime? Result;
            internal global::System.Exception? Exception;
            public GetUtcNowMethodInvocationHistory(global::System.DateTime? Result, global::System.Exception? Exception)
            {
                this.Result = Result;
                this.Exception = Exception;
            }

            public bool Matches()
            {
                return true;
            }

            public override string ToString()
            {
                return "GetUtcNow(" + "" + ")" + " => " + FormatValue(Result) + (Exception == null ? "" : " threw " + FormatValue(Exception));
            }

            private static string FormatValue(object? value)
            {
                return "<" + (value?.ToString() ?? "null") + ">";
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        internal class GetUtcNowMethodInvocationHistoryCollection
        {
            private readonly global::System.Collections.Concurrent.ConcurrentStack<IGetUtcNowMethodInvocationHistory> _invocationHistory = new global::System.Collections.Concurrent.ConcurrentStack<IGetUtcNowMethodInvocationHistory>();
            internal void Add(IGetUtcNowMethodInvocationHistory invocationHistory)
            {
                _invocationHistory.Push(invocationHistory);
            }

            internal int Count()
            {
                return _invocationHistory.Count(it => it.Matches());
            }

            public override string ToString()
            {
                return string.Join(Environment.NewLine, _invocationHistory.Select(invocation => invocation.ToString()));
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        class GetUtcNowMethodInvocationImposterGroup
        {
            internal static GetUtcNowMethodInvocationImposterGroup Default = new GetUtcNowMethodInvocationImposterGroup();
            private readonly global::System.Collections.Concurrent.ConcurrentQueue<MethodInvocationImposter> _invocationImposters = new global::System.Collections.Concurrent.ConcurrentQueue<MethodInvocationImposter>();
            private MethodInvocationImposter? _lastestInvocationImposter;
            public GetUtcNowMethodInvocationImposterGroup()
            {
            }

            internal MethodInvocationImposter AddInvocationImposter()
            {
                MethodInvocationImposter invocationImposter = new MethodInvocationImposter();
                _invocationImposters.Enqueue(invocationImposter);
                return invocationImposter;
            }

            private MethodInvocationImposter? GetInvocationImposter()
            {
                if (_invocationImposters.TryDequeue(out var invocationImposter))
                {
                    if (!invocationImposter.IsEmpty)
                    {
                        _lastestInvocationImposter = invocationImposter;
                    }

                    return invocationImposter;
                }

                return _lastestInvocationImposter;
            }

            public global::System.DateTime Invoke(global::Imposter.Abstractions.ImposterMode invocationBehavior, string methodDisplayName)
            {
                var invocationImposter = GetInvocationImposter();
                if (invocationImposter == null)
                {
                    if (invocationBehavior == global::Imposter.Abstractions.ImposterMode.Explicit)
                    {
                        throw new global::Imposter.Abstractions.MissingImposterException(methodDisplayName);
                    }

                    invocationImposter = MethodInvocationImposter.Default;
                }

                return invocationImposter.Invoke(invocationBehavior, methodDisplayName);
            }

            [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
            internal class MethodInvocationImposter
            {
                internal static MethodInvocationImposter Default;
                static MethodInvocationImposter()
                {
                    Default = new MethodInvocationImposter();
                    Default.Returns(DefaultResultGenerator);
                }

                private GetUtcNowDelegate? _resultGenerator;
                private readonly global::System.Collections.Concurrent.ConcurrentQueue<GetUtcNowCallbackDelegate> _callbacks = new global::System.Collections.Concurrent.ConcurrentQueue<GetUtcNowCallbackDelegate>();
                internal bool IsEmpty => (_resultGenerator == null) && (_callbacks.Count == 0);

                public global::System.DateTime Invoke(global::Imposter.Abstractions.ImposterMode invocationBehavior, string methodDisplayName)
                {
                    if (_resultGenerator == null)
                    {
                        if (invocationBehavior == global::Imposter.Abstractions.ImposterMode.Explicit)
                        {
                            throw new global::Imposter.Abstractions.MissingImposterException(methodDisplayName);
                        }

                        _resultGenerator = DefaultResultGenerator;
                    }

                    global::System.DateTime result = _resultGenerator.Invoke();
                    foreach (var callback in _callbacks)
                    {
                        callback();
                    }

                    return result;
                }

                internal void Callback(GetUtcNowCallbackDelegate callback)
                {
                    _callbacks.Enqueue(callback);
                }

                internal void Returns(GetUtcNowDelegate resultGenerator)
                {
                    _resultGenerator = resultGenerator;
                }

                internal void Returns(global::System.DateTime value)
                {
                    _resultGenerator = () =>
                    {
                        return value;
                    };
                }

                internal void Throws(GetUtcNowExceptionGeneratorDelegate exceptionGenerator)
                {
                    _resultGenerator = () =>
                    {
                        throw exceptionGenerator();
                    };
                }

                internal static global::System.DateTime DefaultResultGenerator()
                {
                    return default !;
                }
            }
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetUtcNowMethodInvocationImposterGroupCallback
        {
            IGetUtcNowMethodInvocationImposterGroupContinuation Callback(GetUtcNowCallbackDelegate callback);
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetUtcNowMethodInvocationImposterGroupContinuation : IGetUtcNowMethodInvocationImposterGroupCallback
        {
            IGetUtcNowMethodInvocationImposterGroup Then();
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetUtcNowMethodInvocationImposterGroup : IGetUtcNowMethodInvocationImposterGroupCallback
        {
            IGetUtcNowMethodInvocationImposterGroupContinuation Throws<TException>()
                where TException : global::System.Exception, new();
            IGetUtcNowMethodInvocationImposterGroupContinuation Throws(global::System.Exception exception);
            IGetUtcNowMethodInvocationImposterGroupContinuation Throws(GetUtcNowExceptionGeneratorDelegate exceptionGenerator);
            IGetUtcNowMethodInvocationImposterGroupContinuation Returns(GetUtcNowDelegate resultGenerator);
            IGetUtcNowMethodInvocationImposterGroupContinuation Returns(global::System.DateTime value);
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface GetUtcNowInvocationVerifier
        {
            void Called(Count count);
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        public interface IGetUtcNowMethodImposterBuilder : IGetUtcNowMethodInvocationImposterGroup, IGetUtcNowMethodInvocationImposterGroupCallback, GetUtcNowInvocationVerifier
        {
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        internal class GetUtcNowMethodImposter
        {
            private readonly global::System.Collections.Concurrent.ConcurrentStack<GetUtcNowMethodInvocationImposterGroup> _invocationImposters = new global::System.Collections.Concurrent.ConcurrentStack<GetUtcNowMethodInvocationImposterGroup>();
            private readonly GetUtcNowMethodInvocationHistoryCollection _getUtcNowMethodInvocationHistoryCollection;
            private readonly global::Imposter.Abstractions.ImposterMode _invocationBehavior;
            public GetUtcNowMethodImposter(GetUtcNowMethodInvocationHistoryCollection _getUtcNowMethodInvocationHistoryCollection, global::Imposter.Abstractions.ImposterMode _invocationBehavior)
            {
                this._getUtcNowMethodInvocationHistoryCollection = _getUtcNowMethodInvocationHistoryCollection;
                this._invocationBehavior = _invocationBehavior;
            }

            public bool HasMatchingInvocationImposterGroup()
            {
                return FindMatchingInvocationImposterGroup() != null;
            }

            private GetUtcNowMethodInvocationImposterGroup? FindMatchingInvocationImposterGroup()
            {
                if (_invocationImposters.TryPeek(out var invocationImposterGroup))
                    return invocationImposterGroup;
                else
                    return null;
            }

            public global::System.DateTime Invoke()
            {
                var matchingInvocationImposterGroup = FindMatchingInvocationImposterGroup();
                if (matchingInvocationImposterGroup == default)
                {
                    if (_invocationBehavior == global::Imposter.Abstractions.ImposterMode.Explicit)
                    {
                        throw new global::Imposter.Abstractions.MissingImposterException("DateTime IMyClock.GetUtcNow()");
                    }

                    matchingInvocationImposterGroup = GetUtcNowMethodInvocationImposterGroup.Default;
                }

                try
                {
                    var result = matchingInvocationImposterGroup.Invoke(_invocationBehavior, "DateTime IMyClock.GetUtcNow()");
                    _getUtcNowMethodInvocationHistoryCollection.Add(new GetUtcNowMethodInvocationHistory(result, default));
                    return result;
                }
                catch (global::System.Exception ex)
                {
                    _getUtcNowMethodInvocationHistoryCollection.Add(new GetUtcNowMethodInvocationHistory(default !, ex));
                    throw;
                }
            }

            [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
            internal class Builder : IGetUtcNowMethodImposterBuilder, IGetUtcNowMethodInvocationImposterGroupContinuation
            {
                private readonly GetUtcNowMethodImposter _imposter;
                private readonly GetUtcNowMethodInvocationHistoryCollection _getUtcNowMethodInvocationHistoryCollection;
                private readonly GetUtcNowMethodInvocationImposterGroup _invocationImposterGroup;
                private GetUtcNowMethodInvocationImposterGroup.MethodInvocationImposter _currentInvocationImposter;
                public Builder(GetUtcNowMethodImposter _imposter, GetUtcNowMethodInvocationHistoryCollection _getUtcNowMethodInvocationHistoryCollection)
                {
                    this._imposter = _imposter;
                    this._getUtcNowMethodInvocationHistoryCollection = _getUtcNowMethodInvocationHistoryCollection;
                    this._invocationImposterGroup = new GetUtcNowMethodInvocationImposterGroup();
                    _imposter._invocationImposters.Push(_invocationImposterGroup);
                    this._currentInvocationImposter = this._invocationImposterGroup.AddInvocationImposter();
                }

                IGetUtcNowMethodInvocationImposterGroupContinuation IGetUtcNowMethodInvocationImposterGroup.Throws<TException>()
                {
                    _currentInvocationImposter.Throws(() =>
                    {
                        throw new TException();
                    });
                    return this;
                }

                IGetUtcNowMethodInvocationImposterGroupContinuation IGetUtcNowMethodInvocationImposterGroup.Throws(global::System.Exception exception)
                {
                    _currentInvocationImposter.Throws(() =>
                    {
                        throw exception;
                    });
                    return this;
                }

                IGetUtcNowMethodInvocationImposterGroupContinuation IGetUtcNowMethodInvocationImposterGroup.Throws(GetUtcNowExceptionGeneratorDelegate exceptionGenerator)
                {
                    _currentInvocationImposter.Throws(() =>
                    {
                        throw exceptionGenerator.Invoke();
                    });
                    return this;
                }

                IGetUtcNowMethodInvocationImposterGroupContinuation IGetUtcNowMethodInvocationImposterGroupCallback.Callback(GetUtcNowCallbackDelegate callback)
                {
                    _currentInvocationImposter.Callback(callback);
                    return this;
                }

                IGetUtcNowMethodInvocationImposterGroupContinuation IGetUtcNowMethodInvocationImposterGroup.Returns(GetUtcNowDelegate resultGenerator)
                {
                    _currentInvocationImposter.Returns(resultGenerator);
                    return this;
                }

                IGetUtcNowMethodInvocationImposterGroupContinuation IGetUtcNowMethodInvocationImposterGroup.Returns(global::System.DateTime value)
                {
                    _currentInvocationImposter.Returns(value);
                    return this;
                }

                IGetUtcNowMethodInvocationImposterGroup IGetUtcNowMethodInvocationImposterGroupContinuation.Then()
                {
                    this._currentInvocationImposter = _invocationImposterGroup.AddInvocationImposter();
                    return this;
                }

                void GetUtcNowInvocationVerifier.Called(global::Imposter.Abstractions.Count count)
                {
                    var invocationCount = _getUtcNowMethodInvocationHistoryCollection.Count();
                    if (!count.Matches(invocationCount))
                    {
                        throw new global::Imposter.Abstractions.VerificationFailedException(count, invocationCount, _getUtcNowMethodInvocationHistoryCollection.ToString());
                    }
                }
            }
        }

        public IMyClockImposter(global::Imposter.Abstractions.ImposterMode invocationBehavior = global::Imposter.Abstractions.ImposterMode.Implicit)
        {
            this._getNowMethodImposter = new GetNowMethodImposter(_getNowMethodInvocationHistoryCollection, invocationBehavior);
            this._getUtcNowMethodImposter = new GetUtcNowMethodImposter(_getUtcNowMethodInvocationHistoryCollection, invocationBehavior);
            this._imposterInstance = new ImposterTargetInstance(this);
            this._invocationBehavior = invocationBehavior;
        }

        [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
        class ImposterTargetInstance : global::MockData.IMyClock
        {
            private readonly IMyClockImposter _imposter;
            public ImposterTargetInstance(IMyClockImposter _imposter)
            {
                this._imposter = _imposter;
            }

            public global::System.DateTime GetNow()
            {
                return _imposter._getNowMethodImposter.Invoke();
            }

            public global::System.DateTime GetUtcNow()
            {
                return _imposter._getUtcNowMethodImposter.Invoke();
            }
        }
    }

    [global::System.CodeDom.Compiler.GeneratedCode("Imposter.CodeGenerator", "0.1.4.0")]
    public static class IMyClockImposterExtensions
    {
        extension(global::MockData.IMyClock imposter)
        {
            public static global::MockData.IMyClockImposter Imposter(global::Imposter.Abstractions.ImposterMode invocationBehavior = global::Imposter.Abstractions.ImposterMode.Implicit) => new global::MockData.IMyClockImposter(invocationBehavior);
        }
    }
}
#nullable restore
#pragma warning restore

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Imposter ](/sources/Imposter.zip)

:::


### Share Imposter 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImposter&quote=Imposter" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImposter&text=Imposter:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImposter" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImposter&title=Imposter" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImposter&title=Imposter&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImposter" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Imposter

<SameCategory />

