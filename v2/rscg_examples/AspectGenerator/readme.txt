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
