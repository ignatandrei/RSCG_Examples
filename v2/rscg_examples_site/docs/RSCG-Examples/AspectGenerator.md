---
sidebar_position: 940
title: 94 - AspectGenerator
description: AOP for methods in the same project. Uses interceptors
slug: /AspectGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# AspectGenerator  by Igor Tkachev


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/AspectGenerator?label=AspectGenerator)](https://www.nuget.org/packages/AspectGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/igor-tkachev/AspectGenerator?label=updated)](https://github.com/igor-tkachev/AspectGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/igor-tkachev/AspectGenerator?style=social)

## Details

### Info
:::info

Name: **AspectGenerator**

The Aspect Generator can help you easily create your own aspects.

Author: Igor Tkachev

NuGet: 
*https://www.nuget.org/packages/AspectGenerator/*   


You can find more details at https://github.com/igor-tkachev/AspectGenerator

Source : https://github.com/igor-tkachev/AspectGenerator

:::

### Original Readme
:::note

# Aspect Generator

[![Test workflow](https://img.shields.io/github/actions/workflow/status/igor-tkachev/AspectGenerator/dotnet.yml?branch=master&label=test&logo=github&style=flat-square)](https://github.com/igor-tkachev/AspectGenerator/actions?workflow=.NET) [![NuGet Version and Downloads count](https://buildstats.info/nuget/AspectGenerator?includePreReleases=true)](https://www.nuget.org/packages/AspectGenerator)

The Aspect Generator can help you easily create your own aspects.




> [!WARNING]
> [Interceptors](https://github.com/dotnet/roslyn/blob/d71ec683082104e9122a4937abc768710c5f7782/docs/features/interceptors.md) are an experimental compiler feature planned to ship in .NET 8 (with support for C# only).
The feature may be subject to breaking changes or removal in a future release.

> [!NOTE]
> The community still has doubts about the usefulness of this feature. On the one hand, it looks like not kosher fake AOP. On the other hand, it works just fine. This project can help you to try it and share your own opinion.

## Download and Install

Install nuget

```bash
> dotnet add package AspectGenerator
```

Modify your project file

```xml
<PropertyGroup>
    ...
    <LangVersion>preview</LangVersion>
    <InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);AspectGenerator</InterceptorsPreviewNamespaces>

    <!-- Add these settings to specify generated files output path -->
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GeneratedFiles</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

## Read documentation

[How it works](https://github.com/igor-tkachev/AspectGenerator/wiki#how-it-works)

[Creating your own aspect](https://github.com/igor-tkachev/AspectGenerator/wiki#creating-your-own-aspect)

## OpenTelemetry Aspect example

Create OpenTelemetryFactory and Metrics aspect:

```c#
using System;
using System.Diagnostics;

using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace AspectGenerator
{
    /// <summary>
    /// Initializes OpenTelemetry.
    /// </summary>
    static class OpenTelemetryFactory
    {
        public static TracerProvider? Create()
        {
            return Sdk.CreateTracerProviderBuilder()
                .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("MySample"))
                .AddSource("Sample.Aspect")
                .AddConsoleExporter()
                .Build();
        }
    }

    /// <summary>
    /// Metrics aspect.
    /// </summary>
    [Aspect(
        // Specify the name of the method used in the 'using' statement
        // that returns an IDisposable object.
        OnUsing = nameof(OnUsing)
        )]
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    sealed class MetricsAttribute : Attribute
    {
        static readonly ActivitySource _activitySource = new("Sample.Aspect");

        public static Activity? OnUsing(InterceptInfo info)
        {
            return _activitySource.StartActivity(info.MemberInfo.Name);
        }
    }
}
```

Use it:

```c#
using System;
using System.Threading;

using Aspects;

namespace OpenTelemetryAspect
{
    static class Program
    {
        static void Main()
        {
            using var _ = OpenTelemetryFactory.Create();

            Method1();
            Method2();
            Method1();
        }

        [Metrics]
        public static void Method1()
        {
            Thread.Sleep(100);
        }

        [Metrics]
        public static void Method2()
        {
            Thread.Sleep(200);
        }
    }
}
```

Application output:

```
Activity.TraceId:            d47417e726824c7b39055efb4685a9dd
Activity.SpanId:             12fbf29f5b622e13
Activity.TraceFlags:         Recorded
Activity.ActivitySourceName: Sample.Aspect
Activity.DisplayName:        Method1
Activity.Kind:               Internal
Activity.StartTime:          2023-11-22T00:50:15.9079068Z
Activity.Duration:           00:00:00.1016180
Resource associated with Activity:
    service.name: MySample
    service.instance.id: 86dbd377-c850-42a3-b878-be07de30faf1
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.6.0

Activity.TraceId:            b90735bfb52cb0b52a504d02bc5ead2e
Activity.SpanId:             75109ef3af25a3e9
Activity.TraceFlags:         Recorded
Activity.ActivitySourceName: Sample.Aspect
Activity.DisplayName:        Method2
Activity.Kind:               Internal
Activity.StartTime:          2023-11-22T00:50:16.0360160Z
Activity.Duration:           00:00:00.2058166
Resource associated with Activity:
    service.name: MySample
    service.instance.id: 86dbd377-c850-42a3-b878-be07de30faf1
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.6.0

Activity.TraceId:            e9653008f381b6330a8e538e02b7a61d
Activity.SpanId:             be3d7cd1d4376bd7
Activity.TraceFlags:         Recorded
Activity.ActivitySourceName: Sample.Aspect
Activity.DisplayName:        Method1
Activity.Kind:               Internal
Activity.StartTime:          2023-11-22T00:50:16.2517480Z
Activity.Duration:           00:00:00.1135186
Resource associated with Activity:
    service.name: MySample
    service.instance.id: 86dbd377-c850-42a3-b878-be07de30faf1
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.6.0
```

Generated code:

```c#
// <auto-generated/>
#pragma warning disable
#nullable enable

using System;

using SR  = System.Reflection;
using SLE = System.Linq.Expressions;
using SCG = System.Collections.Generic;

namespace Aspects
{
    static partial class Interceptors
    {
        static SR.MethodInfo GetMethodInfo(SLE.Expression expr)
        {
            return expr switch
            {
                SLE.MethodCallExpression mc => mc.Method,
                _                           => throw new InvalidOperationException()
            };
        }

        static SR.MethodInfo MethodOf<T>(SLE.Expression<Func<T>> func) => GetMethodInfo(func.Body);
        static SR.MethodInfo MethodOf   (SLE.Expression<Action>  func) => GetMethodInfo(func.Body);

        static SR. MemberInfo                 Method1_Interceptor_MemberInfo        = MethodOf(() => OpenTelemetryAspect.Program.Method1());
        static SCG.Dictionary<string,object?> Method1_Interceptor_AspectArguments_0 = new ()
        {
        };
        //
        /// <summary>
        /// Intercepts OpenTelemetryAspect.Program.Method1().
        /// </summary>
        //
        // Intercepts Method1().
        [System.Runtime.CompilerServices.InterceptsLocation(@"P:\AspectGenerator\Examples\OpenTelemetryAspect\Program.cs", line: 14, character: 4)]
        //
        // Intercepts Method1().
        [System.Runtime.CompilerServices.InterceptsLocation(@"P:\AspectGenerator\Examples\OpenTelemetryAspect\Program.cs", line: 16, character: 4)]
        //
        [System.Runtime.CompilerServices.CompilerGenerated]
        //[System.Diagnostics.DebuggerStepThrough]
        public static void Method1_Interceptor()
        {
            // Aspects.MetricsAttribute
            //
            var __info__0 = new Aspects.InterceptInfo<Void>
            {
                MemberInfo      = Method1_Interceptor_MemberInfo,
                AspectType      = typeof(Aspects.MetricsAttribute),
                AspectArguments = Method1_Interceptor_AspectArguments_0,
            };

            using (Aspects.MetricsAttribute.OnUsing(__info__0))
            {
                OpenTelemetryAspect.Program.Method1();
            }
        }

        static SR. MemberInfo                 Method2_Interceptor_MemberInfo        = MethodOf(() => OpenTelemetryAspect.Program.Method2());
        static SCG.Dictionary<string,object?> Method2_Interceptor_AspectArguments_0 = new ()
        {
        };
        //
        /// <summary>
        /// Intercepts OpenTelemetryAspect.Program.Method2().
        /// </summary>
        //
        // Intercepts Method2().
        [System.Runtime.CompilerServices.InterceptsLocation(@"P:\AspectGenerator\Examples\OpenTelemetryAspect\Program.cs", line: 15, character: 4)]
        //
        [System.Runtime.CompilerServices.CompilerGenerated]
        //[System.Diagnostics.DebuggerStepThrough]
        public static void Method2_Interceptor()
        {
            // Aspects.MetricsAttribute
            //
            var __info__0 = new Aspects.InterceptInfo<Void>
            {
                MemberInfo      = Method2_Interceptor_MemberInfo,
                AspectType      = typeof(Aspects.MetricsAttribute),
                AspectArguments = Method2_Interceptor_AspectArguments_0,
            };

            using (Aspects.MetricsAttribute.OnUsing(__info__0))
            {
                OpenTelemetryAspect.Program.Method2();
            }
        }
    }
}
```

More advanced version of the Metrics aspect can also set activity status and support `await using`.

```c#
[Aspect(
    OnUsing      = nameof(OnUsing),
    OnAsyncUsing = nameof(OnAsyncUsing),
    OnFinally    = nameof(OnFinally)
    )]
[AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
sealed class MetricsAttribute : Attribute
{
    static readonly ActivitySource _activitySource = new("Sample.Aspect");

    public static Activity? OnUsing(InterceptInfo info)
    {
        var activity = _activitySource.StartActivity(info.MemberInfo.Name);

        info.Tag = activity;

        return activity;
    }

    class AsyncActivity(Activity activity) : IAsyncDisposable
    {
        public readonly Activity Activity = activity;

        public ValueTask DisposeAsync()
        {
            Activity.Dispose();
            return ValueTask.CompletedTask;
        }
    }

    public static IAsyncDisposable? OnAsyncUsing(InterceptInfo info)
    {
        var activity = _activitySource.StartActivity(info.MemberInfo.Name);

        if (activity == null)
            return null;

        var asyncActivity = new AsyncActivity(activity);

        info.Tag = asyncActivity;

        return asyncActivity;
    }

    public static void OnFinally(InterceptInfo info)
    {
        switch (info)
        {
            case { Tag: Activity activity, Exception: var ex } : SetStatus(activity,    ex); break;
            case { Tag: AsyncActivity aa,  Exception: var ex } : SetStatus(aa.Activity, ex); break;
        }

        static void SetStatus(Activity activity, Exception? ex) =>
            activity.SetStatus(ex is null ? ActivityStatusCode.Ok : ActivityStatusCode.Error);
    }
}
```


:::

### About
:::note

AOP for methods in the same project. Uses interceptors


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AspectGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AspectGenerator" Version="0.0.9-preview" OutputItemType="Analyzer"  />
  </ItemGroup>
<PropertyGroup>
    
    <InterceptorsPreviewNamespaces>$(InterceptorsPreviewNamespaces);AspectGenerator</InterceptorsPreviewNamespaces>

    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AspectGenerator\src\AG\Program.cs" label="Program.cs" >

  This is the use of **AspectGenerator** in *Program.cs*

```csharp showLineNumbers 
using AG;

var p=new Person { FirstName="Ignat", LastName="Andrei" };
var x= p.FullName();
Console.WriteLine(x);   
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AspectGenerator\src\AG\Person.cs" label="Person.cs" >

  This is the use of **AspectGenerator** in *Person.cs*

```csharp showLineNumbers 
namespace AG;

internal class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Metrics]
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AspectGenerator\src\AG\AG.cs" label="AG.cs" >

  This is the use of **AspectGenerator** in *AG.cs*

```csharp showLineNumbers 
using System.Diagnostics;
using AspectGenerator;
namespace AG;

[Aspect(
       // Specify the name of the method used in the 'using' statement
       // that returns an IDisposable object.
       OnUsing = nameof(OnUsing)
       )]
[AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
sealed class MetricsAttribute : Attribute
{
    //static readonly ActivitySource _activitySource = new("Sample.Aspect");

    public static Activity? OnUsing(InterceptInfo info)
    {
        Console.WriteLine($"Entering {info.MemberInfo.Name}");
        return null;
        //var data=_activitySource.StartActivity(info.MemberInfo.Name);
        //return data;
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AspectGenerator\src\AG\obj\GX\AspectGenerator\AspectGenerator.AspectSourceGenerator\AspectAttribute.g.cs" label="AspectAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable

using System;

#if AG_GENERATE_API || !AG_NOT_GENERATE_API

namespace AspectGenerator
{
	/// <summary>
	/// <para>Defines an aspect.</para>
	/// <para>Create a new attribute decorated with this attribute to define an aspect.</para>
	/// </summary>
	[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
#if AG_PUBLIC_API
	public
#endif
	sealed class AspectAttribute : Attribute
	{
		public string?   OnInit            { get; set; }
		public string?   OnUsing           { get; set; }
		public string?   OnUsingAsync      { get; set; }
		public string?   OnBeforeCall      { get; set; }
		public string?   OnBeforeCallAsync { get; set; }
		public string?   OnCall            { get; set; }
		public string?   OnAfterCall       { get; set; }
		public string?   OnAfterCallAsync  { get; set; }
		public string?   OnCatch           { get; set; }
		public string?   OnCatchAsync      { get; set; }
		public string?   OnFinally         { get; set; }
		public string?   OnFinallyAsync    { get; set; }
		public string[]? InterceptMethods  { get; set; }
		public bool      UseInterceptType  { get; set; }
		public bool      PassArguments     { get; set; }
		public bool      UseInterceptData  { get; set; }
	}

#if AG_PUBLIC_API
	public
#endif
	enum InterceptType
	{
		OnInit,
		OnUsing,
		OnBeforeCall,
		OnAfterCall,
		OnCatch,
		OnFinally
	}

#if AG_PUBLIC_API
	public
#endif
	enum InterceptResult
	{
		Continue,
		Return,
		ReThrow     = Continue,
		IgnoreThrow = Return
	}

#if AG_PUBLIC_API
	public
#endif
	struct Void
	{
	}

#if AG_PUBLIC_API
	public
#endif
	partial class InterceptInfo
	{
		public object?         Tag;
		public InterceptType   InterceptType;
		public InterceptResult InterceptResult;
		public Exception?      Exception;

		public InterceptInfo?                                        PreviousInfo;
		public System.Reflection.MemberInfo                          MemberInfo;
		public object?[]?                                            MethodArguments;
		public Type                                                  AspectType;
		public System.Collections.Generic.Dictionary<string,object?> AspectArguments;
	}

#if AG_PUBLIC_API
	public
#endif
	partial class InterceptInfo<T> : InterceptInfo
	{
		public T ReturnValue;
	}

#if AG_PUBLIC_API
	public
#endif
	partial struct InterceptData<T>
	{
		public object?         Tag;
		public InterceptType   InterceptType;
		public InterceptResult InterceptResult;
		public Exception?      Exception;

		public InterceptInfo<T>?                                     PreviousInfo;
		public System.Reflection.MemberInfo                          MemberInfo;
		public object?[]?                                            MethodArguments;
		public Type                                                  AspectType;
		public System.Collections.Generic.Dictionary<string,object?> AspectArguments;

		public T ReturnValue;
	}
}

#endif

#if AG_GENERATE_InterceptsLocationAttribute || !AG_NOT_GENERATE_InterceptsLocationAttribute

namespace System.Runtime.CompilerServices
{
	[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
	sealed class InterceptsLocationAttribute(string filePath, int line, int character) : Attribute
	{
	}
}

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AspectGenerator\src\AG\obj\GX\AspectGenerator\AspectGenerator.AspectSourceGenerator\Interceptors.g.cs" label="Interceptors.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#pragma warning disable
#nullable enable

using System;

using SR  = System.Reflection;
using SLE = System.Linq.Expressions;
using SCG = System.Collections.Generic;

namespace AspectGenerator
{
	using AspectGenerator = AspectGenerator;

	static partial class Interceptors
	{
		static SR.MethodInfo GetMethodInfo(SLE.Expression expr)
		{
			return expr switch
			{
				SLE.MethodCallExpression mc => mc.Method,
				_                           => throw new InvalidOperationException()
			};
		}

		static SR.MethodInfo MethodOf<T>(SLE.Expression<Func<T>> func) => GetMethodInfo(func.Body);
		static SR.MethodInfo MethodOf   (SLE.Expression<Action>  func) => GetMethodInfo(func.Body);

		static SR. MemberInfo                 FullName_Interceptor_MemberInfo        = MethodOf(() => default(AG.Person).FullName());
		static SCG.Dictionary<string,object?> FullName_Interceptor_AspectArguments_0 = new()
		{
		};
		//
		/// <summary>
		/// Intercepts AG.Person.FullName().
		/// </summary>
		//
		// Intercepts p.FullName().
		[System.Runtime.CompilerServices.InterceptsLocation(@"D:\gth\RSCG_Examples\v2\rscg_examples\AspectGenerator\src\AG\Program.cs", line: 4, character: 10)]
		//
		[System.Runtime.CompilerServices.CompilerGenerated]
		//[System.Diagnostics.DebuggerStepThrough]
		public static string FullName_Interceptor(this AG.Person __this__)
		{
			// AG.MetricsAttribute
			//
			var __info__0 = new AspectGenerator.InterceptInfo<string>
			{
				MemberInfo      = FullName_Interceptor_MemberInfo,
				AspectType      = typeof(AG.MetricsAttribute),
				AspectArguments = FullName_Interceptor_AspectArguments_0,
			};

			using (AG.MetricsAttribute.OnUsing(__info__0))
			{
				__info__0.ReturnValue = __this__.FullName();
			}

			return __info__0.ReturnValue;
		}
	}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project AspectGenerator ](/sources/AspectGenerator.zip)

:::


### Share AspectGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&quote=AspectGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&text=AspectGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&title=AspectGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator&title=AspectGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAspectGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AspectGenerator

### In the same category (EnhancementClass) - 26 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [FastGenericNew](/docs/FastGenericNew)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemberAccessor](/docs/MemberAccessor)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [QueryStringGenerator](/docs/QueryStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

