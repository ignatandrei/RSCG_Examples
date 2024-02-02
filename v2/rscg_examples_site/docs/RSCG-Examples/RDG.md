---
sidebar_position: 870
title: 87 - RDG
description: Generating replacing for minimal API Map
slug: /RDG
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RDG  by Microsoft


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/Microsoft.Extensions.Http?label=Microsoft.Extensions.Http)](https://www.nuget.org/packages/Microsoft.Extensions.Http)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/aspnetcore?label=updated)](https://github.com/dotnet/aspnetcore)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/aspnetcore?style=social)

## Details

### Info
:::info

Name: **RDG**

The HttpClient factory is a pattern for configuring and retrieving named HttpClients in a composable way. The HttpClient factory provides extensibility to plug in DelegatingHandlers that address cross-cutting concerns such as service location, load balancing, and reliability. The default HttpClient factory provides built-in diagnostics and logging and manages the lifetimes of connections in a performant way.
      Commonly used types:
      System.Net.Http.IHttpClientFactory

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/Microsoft.Extensions.Http*   


You can find more details at https://learn.microsoft.com/en-us/aspnet/core/fundamentals/aot/request-delegate-generator/rdg?view=aspnetcore-8.0

Source : https://github.com/dotnet/aspnetcore

:::

### Original Readme
:::note

ASP.NET Core
============

[![.NET Foundation](https://img.shields.io/badge/.NET%20Foundation-blueviolet.svg)](https://www.dotnetfoundation.org/)
[![MIT License](https://img.shields.io/github/license/dotnet/aspnetcore?color=%230b0&style=flat-square)](https://github.com/dotnet/aspnetcore/blob/main/LICENSE.txt) [![Help Wanted](https://img.shields.io/github/issues/dotnet/aspnetcore/help%20wanted?color=%232EA043&label=help%20wanted&style=flat-square)](https://github.com/dotnet/aspnetcore/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) [![Good First Issues](https://img.shields.io/github/issues/dotnet/aspnetcore/good%20first%20issue?color=%23512BD4&label=good%20first%20issue&style=flat-square)](https://github.com/dotnet/aspnetcore/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
[![Discord](https://img.shields.io/discord/732297728826277939?style=flat-square&label=Discord&logo=discord&logoColor=white&color=7289DA)](https://aka.ms/dotnet-discord)

ASP.NET Core is an open-source and cross-platform framework for building modern cloud-based internet-connected applications, such as web apps, IoT apps, and mobile backends. ASP.NET Core apps run on [.NET](https://dot.net), a free, cross-platform, and open-source application runtime. It was architected to provide an optimized development framework for apps that are deployed to the cloud or run on-premises. It consists of modular components with minimal overhead, so you retain flexibility while constructing your solutions. You can develop and run your ASP.NET Core apps cross-platform on Windows, Mac, and Linux. [Learn more about ASP.NET Core](https://learn.microsoft.com/aspnet/core/).

## Get started

Follow the [Getting Started](https://learn.microsoft.com/aspnet/core/getting-started) instructions.

Also check out the [.NET Homepage](https://www.microsoft.com/net) for released versions of .NET, getting started guides, and learning resources.

See the [Triage Process](https://github.com/dotnet/aspnetcore/blob/main/docs/TriageProcess.md) document for more information on how we handle incoming issues.

## How to engage, contribute, and give feedback

Some of the best ways to contribute are to try things out, file issues, join in design conversations,
and make pull-requests.

* [Download our latest daily builds](https://github.com/dotnet/aspnetcore/docs/DailyBuilds.md)
* Follow along with the development of ASP.NET Core:
    * [Community Standup](https://live.asp.net): The community standup is held every week and streamed live on YouTube. You can view past standups in the linked playlist.
    * [Roadmap](https://aka.ms/aspnet/roadmap): The schedule and milestone themes for ASP.NET Core.
* [Build ASP.NET Core source code](https://github.com/dotnet/aspnetcore/docs/BuildFromSource.md)
* Check out the [contributing](https://github.com/dotnet/aspnetcore/CONTRIBUTING.md) page to see the best places to log issues and start discussions.

## Reporting security issues and bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC)  secure@microsoft.com. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://technet.microsoft.com/en-us/security/ff852094.aspx).

## Related projects

These are some other repos for related projects:

* [Documentation](https://github.com/aspnet/Docs) - documentation sources for https://learn.microsoft.com/aspnet/core/
* [Entity Framework Core](https://github.com/dotnet/efcore) - data access technology
* [Runtime](https://github.com/dotnet/runtime) - cross-platform runtime for cloud, mobile, desktop, and IoT apps
* [Razor](https://github.com/dotnet/razor) - the Razor compiler and tooling for working with Razor syntax (.cshtml, .razor)

## Code of conduct

See [CODE-OF-CONDUCT](https://github.com/dotnet/aspnetcore/CODE-OF-CONDUCT.md)

## Nightly builds

This table includes links to download the latest builds of the ASP.NET Core Shared Framework. Also included are links to download the Windows Hosting Bundle, which includes the ASP.NET Core Shared Framework, the .NET Runtime Shared Framework, and the IIS plugin (ASP.NET Core Module). You can download the latest .NET Runtime builds [here](https://github.com/dotnet/runtime/blob/main/docs/project/dogfooding.md#nightly-builds-table), and the latest .NET SDK builds [here](https://github.com/dotnet/installer#table). **If you're unsure what you need, then install the SDK; it has everything except the IIS plugin.**

| Platform | Shared Framework (Installer) | Shared Framework (Binaries) | Hosting Bundle (Installer) |
| :--------- | :----------: | :----------: | :----------: |
| **Windows x64** | [Installer](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-win-x64.exe) | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-win-x64.zip) | [Installer](https://aka.ms/dotnet/9.0/daily/dotnet-hosting-win.exe) |
| **Windows x86** | [Installer](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-win-x86.exe) | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-win-x86.zip) | [Installer](https://aka.ms/dotnet/9.0/daily/dotnet-hosting-win.exe) |
| **Windows arm64** | [Installer](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-win-arm64.exe) | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-win-arm64.zip) | [Installer](https://aka.ms/dotnet/9.0/daily/dotnet-hosting-win.exe) |
| **macOS x64** | **N/A** | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-osx-x64.tar.gz) | **N/A** |
| **macOS arm64** | **N/A** | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-osx-arm64.tar.gz) | **N/A** |
| **Linux x64** | [Deb Installer](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-x64.deb) - [RPM Installer](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-x64.rpm) | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-linux-x64.tar.gz) | **N/A** |
| **Linux arm** | **N/A** | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-linux-arm.tar.gz) | **N/A** |
| **Linux arm64** | [RPM Installer](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-aarch64.rpm) | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-linux-arm64.tar.gz) | **N/A** |
| **Linux-musl-x64** | **N/A** | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-linux-musl-x64.tar.gz) | **N/A** |
| **Linux-musl-arm** | **N/A** | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-linux-musl-arm.tar.gz) | **N/A** |
| **Linux-musl-arm64** | **N/A** | [Binaries](https://aka.ms/dotnet/9.0/daily/aspnetcore-runtime-linux-musl-arm64.tar.gz) | **N/A** |


:::

### About
:::note

Generating replacing for minimal API Map


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RDG**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk.Web">

	<PropertyGroup>
		<TargetFramework>net8.0</TargetFramework>
		<Nullable>enable</Nullable>
		<ImplicitUsings>enable</ImplicitUsings>
		<InvariantGlobalization>true</InvariantGlobalization>
	</PropertyGroup>

	<ItemGroup>
		<!--
		<PackageReference Include="Microsoft.Extensions.Http"></PackageReference>
		-->
		<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />
		<PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
	</ItemGroup>

	<PropertyGroup>
		<EnableRequestDelegateGenerator>true</EnableRequestDelegateGenerator>
	</PropertyGroup>


	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RDG\src\RDGDemoWebApi\Program.cs" label="Program.cs" >

  This is the use of **RDG** in *Program.cs*

```csharp showLineNumbers 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RDG\src\RDGDemoWebApi\obj\GX\Microsoft.AspNetCore.Http.RequestDelegateGenerator\Microsoft.AspNetCore.Http.RequestDelegateGenerator.RequestDelegateGenerator\GeneratedRouteBuilderExtensions.g.cs" label="GeneratedRouteBuilderExtensions.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
#nullable enable

namespace System.Runtime.CompilerServices
{
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.Http.RequestDelegateGenerator, Version=8.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "8.0.0.0")]
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    file sealed class InterceptsLocationAttribute : Attribute
    {
        public InterceptsLocationAttribute(string filePath, int line, int column)
        {
        }
    }
}

namespace Microsoft.AspNetCore.Http.Generated
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Diagnostics;
    using System.Diagnostics.CodeAnalysis;
    using System.Globalization;
    using System.Linq;
    using System.Reflection;
    using System.Runtime.CompilerServices;
    using System.Text.Json;
    using System.Text.Json.Serialization.Metadata;
    using System.Threading.Tasks;
    using System.IO;
    using Microsoft.AspNetCore.Antiforgery;
    using Microsoft.AspNetCore.Routing;
    using Microsoft.AspNetCore.Routing.Patterns;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Http.Json;
    using Microsoft.AspNetCore.Http.Metadata;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Primitives;
    using Microsoft.Extensions.Options;

    using MetadataPopulator = System.Func<System.Reflection.MethodInfo, Microsoft.AspNetCore.Http.RequestDelegateFactoryOptions?, Microsoft.AspNetCore.Http.RequestDelegateMetadataResult>;
    using RequestDelegateFactoryFunc = System.Func<System.Delegate, Microsoft.AspNetCore.Http.RequestDelegateFactoryOptions, Microsoft.AspNetCore.Http.RequestDelegateMetadataResult?, Microsoft.AspNetCore.Http.RequestDelegateResult>;

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.Http.RequestDelegateGenerator, Version=8.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "8.0.0.0")]
    file static class GeneratedRouteBuilderExtensionsCore
    {
        private static readonly JsonOptions FallbackJsonOptions = new();
        private static readonly string[] GetVerb = new[] { global::Microsoft.AspNetCore.Http.HttpMethods.Get };

        [InterceptsLocation(@"D:\gth\RSCG_Examples\v2\rscg_examples\RDG\src\RDGDemoWebApi\Program.cs", 22, 5)]
        internal static RouteHandlerBuilder MapGet0(
            this IEndpointRouteBuilder endpoints,
            [StringSyntax("Route")] string pattern,
            Delegate handler)
        {
            MetadataPopulator populateMetadata = (methodInfo, options) =>
            {
                Debug.Assert(options != null, "RequestDelegateFactoryOptions not found.");
                Debug.Assert(options.EndpointBuilder != null, "EndpointBuilder not found.");
                options.EndpointBuilder.Metadata.Add(new System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.Http.RequestDelegateGenerator, Version=8.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "8.0.0.0"));
                options.EndpointBuilder.Metadata.Add(new ProducesResponseTypeMetadata(statusCode: StatusCodes.Status200OK, type: typeof(global::WeatherForecast[]), contentTypes: GeneratedMetadataConstants.JsonContentType));
                return new RequestDelegateMetadataResult { EndpointMetadata = options.EndpointBuilder.Metadata.AsReadOnly() };
            };
            RequestDelegateFactoryFunc createRequestDelegate = (del, options, inferredMetadataResult) =>
            {
                Debug.Assert(options != null, "RequestDelegateFactoryOptions not found.");
                Debug.Assert(options.EndpointBuilder != null, "EndpointBuilder not found.");
                Debug.Assert(options.EndpointBuilder.ApplicationServices != null, "ApplicationServices not found.");
                Debug.Assert(options.EndpointBuilder.FilterFactories != null, "FilterFactories not found.");
                var handler = Cast(del, global::WeatherForecast[] () => throw null!);
                EndpointFilterDelegate? filteredInvocation = null;
                var serviceProvider = options.ServiceProvider ?? options.EndpointBuilder.ApplicationServices;
                var jsonOptions = serviceProvider?.GetService<IOptions<JsonOptions>>()?.Value ?? FallbackJsonOptions;
                var jsonSerializerOptions = jsonOptions.SerializerOptions;
                jsonSerializerOptions.MakeReadOnly();
                var objectJsonTypeInfo = (JsonTypeInfo<object?>)jsonSerializerOptions.GetTypeInfo(typeof(object));
                var responseJsonTypeInfo =  (JsonTypeInfo<global::WeatherForecast[]?>)jsonSerializerOptions.GetTypeInfo(typeof(global::WeatherForecast[]));

                if (options.EndpointBuilder.FilterFactories.Count > 0)
                {
                    filteredInvocation = GeneratedRouteBuilderExtensionsCore.BuildFilterDelegate(ic =>
                    {
                        if (ic.HttpContext.Response.StatusCode == 400)
                        {
                            return ValueTask.FromResult<object?>(Results.Empty);
                        }
                        return ValueTask.FromResult<object?>(handler());
                    },
                    options.EndpointBuilder,
                    handler.Method);
                }

                Task RequestHandler(HttpContext httpContext)
                {
                    var wasParamCheckFailure = false;
                    if (wasParamCheckFailure)
                    {
                        httpContext.Response.StatusCode = 400;
                        return Task.CompletedTask;
                    }
                    var result = handler();
                    return GeneratedRouteBuilderExtensionsCore.WriteJsonResponseAsync(httpContext.Response, result, responseJsonTypeInfo);
                }

                async Task RequestHandlerFiltered(HttpContext httpContext)
                {
                    var wasParamCheckFailure = false;
                    if (wasParamCheckFailure)
                    {
                        httpContext.Response.StatusCode = 400;
                    }
                    var result = await filteredInvocation(EndpointFilterInvocationContext.Create(httpContext));
                    if (result is not null)
                    {
                        await GeneratedRouteBuilderExtensionsCore.ExecuteReturnAsync(result, httpContext, objectJsonTypeInfo);
                    }
                }

                RequestDelegate targetDelegate = filteredInvocation is null ? RequestHandler : RequestHandlerFiltered;
                var metadata = inferredMetadataResult?.EndpointMetadata ?? ReadOnlyCollection<object>.Empty;
                return new RequestDelegateResult(targetDelegate, metadata);
            };
            return MapCore(
                endpoints,
                pattern,
                handler,
                GetVerb,
                populateMetadata,
                createRequestDelegate);
        }



        internal static RouteHandlerBuilder MapCore(
            this IEndpointRouteBuilder routes,
            string pattern,
            Delegate handler,
            IEnumerable<string>? httpMethods,
            MetadataPopulator populateMetadata,
            RequestDelegateFactoryFunc createRequestDelegate)
        {
            return RouteHandlerServices.Map(routes, pattern, handler, httpMethods, populateMetadata, createRequestDelegate);
        }

        private static T Cast<T>(Delegate d, T _) where T : Delegate
        {
            return (T)d;
        }

        private static EndpointFilterDelegate BuildFilterDelegate(EndpointFilterDelegate filteredInvocation, EndpointBuilder builder, MethodInfo mi)
        {
            var routeHandlerFilters =  builder.FilterFactories;
            var context0 = new EndpointFilterFactoryContext
            {
                MethodInfo = mi,
                ApplicationServices = builder.ApplicationServices,
            };
            var initialFilteredInvocation = filteredInvocation;
            for (var i = routeHandlerFilters.Count - 1; i >= 0; i--)
            {
                var filterFactory = routeHandlerFilters[i];
                filteredInvocation = filterFactory(context0, filteredInvocation);
            }
            return filteredInvocation;
        }

        private static Task ExecuteReturnAsync(object? obj, HttpContext httpContext, JsonTypeInfo<object?> jsonTypeInfo)
        {
            if (obj is IResult r)
            {
                return r.ExecuteAsync(httpContext);
            }
            else if (obj is string s)
            {
                return httpContext.Response.WriteAsync(s);
            }
            else
            {
                return WriteJsonResponseAsync(httpContext.Response, obj, jsonTypeInfo);
            }
        }

        [UnconditionalSuppressMessage("Trimming", "IL2026:RequiresUnreferencedCode",
            Justification = "The 'JsonSerializer.IsReflectionEnabledByDefault' feature switch, which is set to false by default for trimmed ASP.NET apps, ensures the JsonSerializer doesn't use Reflection.")]
        [UnconditionalSuppressMessage("AOT", "IL3050:RequiresDynamicCode", Justification = "See above.")]
        private static Task WriteJsonResponseAsync<T>(HttpResponse response, T? value, JsonTypeInfo<T?> jsonTypeInfo)
        {
            var runtimeType = value?.GetType();

            if (jsonTypeInfo.ShouldUseWith(runtimeType))
            {
                return HttpResponseJsonExtensions.WriteAsJsonAsync(response, value, jsonTypeInfo, default);
            }

            return response.WriteAsJsonAsync<object?>(value, jsonTypeInfo.Options);
        }

        private static bool HasKnownPolymorphism(this JsonTypeInfo jsonTypeInfo)
            => jsonTypeInfo.Type.IsSealed || jsonTypeInfo.Type.IsValueType || jsonTypeInfo.PolymorphismOptions is not null;

        private static bool ShouldUseWith(this JsonTypeInfo jsonTypeInfo, [NotNullWhen(false)] Type? runtimeType)
            => runtimeType is null || jsonTypeInfo.Type == runtimeType || jsonTypeInfo.HasKnownPolymorphism();


    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.Http.RequestDelegateGenerator, Version=8.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "8.0.0.0")]
    file static class GeneratedMetadataConstants
    {
        public static readonly string[] JsonContentType = new [] { "application/json" };
        public static readonly string[] PlaintextContentType = new [] { "text/plain" };
        public static readonly string[] FormFileContentType = new[] { "multipart/form-data" };
        public static readonly string[] FormContentType = new[] { "multipart/form-data", "application/x-www-form-urlencoded" };
    }


    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.AspNetCore.Http.RequestDelegateGenerator, Version=8.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60", "8.0.0.0")]
    file sealed class LogOrThrowExceptionHelper
    {
        private readonly ILogger? _rdgLogger;
        private readonly bool _shouldThrow;

        public LogOrThrowExceptionHelper(IServiceProvider? serviceProvider, RequestDelegateFactoryOptions? options)
        {
            var loggerFactory = serviceProvider?.GetRequiredService<ILoggerFactory>();
            _rdgLogger = loggerFactory?.CreateLogger("Microsoft.AspNetCore.Http.RequestDelegateGenerator.RequestDelegateGenerator");
            _shouldThrow = options?.ThrowOnBadRequest ?? false;
        }

        public void RequestBodyIOException(IOException exception)
        {
            if (_rdgLogger != null)
            {
                _requestBodyIOException(_rdgLogger, exception);
            }
        }

        private static readonly Action<ILogger, Exception?> _requestBodyIOException =
            LoggerMessage.Define(LogLevel.Debug, new EventId(1, "RequestBodyIOException"), "Reading the request body failed with an IOException.");

        public void InvalidJsonRequestBody(string parameterTypeName, string parameterName, Exception exception)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Failed to read parameter \"{0} {1}\" from the request body as JSON.", parameterTypeName, parameterName);
                throw new BadHttpRequestException(message, exception);
            }

            if (_rdgLogger != null)
            {
                _invalidJsonRequestBody(_rdgLogger, parameterTypeName, parameterName, exception);
            }
        }

        private static readonly Action<ILogger, string, string, Exception?> _invalidJsonRequestBody =
            LoggerMessage.Define<string, string>(LogLevel.Debug, new EventId(2, "InvalidJsonRequestBody"), "Failed to read parameter \"{ParameterType} {ParameterName}\" from the request body as JSON.");

        public void ParameterBindingFailed(string parameterTypeName, string parameterName, string sourceValue)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Failed to bind parameter \"{0} {1}\" from \"{2}\".", parameterTypeName, parameterName, sourceValue);
                throw new BadHttpRequestException(message);
            }

            if (_rdgLogger != null)
            {
                _parameterBindingFailed(_rdgLogger, parameterTypeName, parameterName, sourceValue, null);
            }
        }

        private static readonly Action<ILogger, string, string, string, Exception?> _parameterBindingFailed =
            LoggerMessage.Define<string, string, string>(LogLevel.Debug, new EventId(3, "ParameterBindingFailed"), "Failed to bind parameter \"{ParameterType} {ParameterName}\" from \"{SourceValue}\".");

        public void RequiredParameterNotProvided(string parameterTypeName, string parameterName, string source)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Required parameter \"{0} {1}\" was not provided from {2}.", parameterTypeName, parameterName, source);
                throw new BadHttpRequestException(message);
            }

            if (_rdgLogger != null)
            {
                _requiredParameterNotProvided(_rdgLogger, parameterTypeName, parameterName, source, null);
            }
        }

        private static readonly Action<ILogger, string, string, string, Exception?> _requiredParameterNotProvided =
            LoggerMessage.Define<string, string, string>(LogLevel.Debug, new EventId(4, "RequiredParameterNotProvided"), "Required parameter \"{ParameterType} {ParameterName}\" was not provided from {Source}.");

        public void ImplicitBodyNotProvided(string parameterName)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Implicit body inferred for parameter \"{0}\" but no body was provided. Did you mean to use a Service instead?", parameterName);
                throw new BadHttpRequestException(message);
            }

            if (_rdgLogger != null)
            {
                _implicitBodyNotProvided(_rdgLogger, parameterName, null);
            }
        }

        private static readonly Action<ILogger, string, Exception?> _implicitBodyNotProvided =
            LoggerMessage.Define<string>(LogLevel.Debug, new EventId(5, "ImplicitBodyNotProvided"), "Implicit body inferred for parameter \"{ParameterName}\" but no body was provided. Did you mean to use a Service instead?");

        public void UnexpectedJsonContentType(string? contentType)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Expected a supported JSON media type but got \"{0}\".", contentType);
                throw new BadHttpRequestException(message, StatusCodes.Status415UnsupportedMediaType);
            }

            if (_rdgLogger != null)
            {
                _unexpectedJsonContentType(_rdgLogger, contentType ?? "(none)", null);
            }
        }

        private static readonly Action<ILogger, string, Exception?> _unexpectedJsonContentType =
            LoggerMessage.Define<string>(LogLevel.Debug, new EventId(6, "UnexpectedContentType"), "Expected a supported JSON media type but got \"{ContentType}\".");

        public void UnexpectedNonFormContentType(string? contentType)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Expected a supported form media type but got \"{0}\".", contentType);
                throw new BadHttpRequestException(message, StatusCodes.Status415UnsupportedMediaType);
            }

            if (_rdgLogger != null)
            {
                _unexpectedNonFormContentType(_rdgLogger, contentType ?? "(none)", null);
            }
        }

        private static readonly Action<ILogger, string, Exception?> _unexpectedNonFormContentType =
            LoggerMessage.Define<string>(LogLevel.Debug, new EventId(7, "UnexpectedNonFormContentType"), "Expected a supported form media type but got \"{ContentType}\".");

        public void InvalidFormRequestBody(string parameterTypeName, string parameterName, Exception exception)
        {
            if (_shouldThrow)
            {
                var message = string.Format(CultureInfo.InvariantCulture, "Failed to read parameter \"{0} {1}\" from the request body as form.", parameterTypeName, parameterName);
                throw new BadHttpRequestException(message, exception);
            }

            if (_rdgLogger != null)
            {
                _invalidFormRequestBody(_rdgLogger, parameterTypeName, parameterName, exception);
            }
        }

        private static readonly Action<ILogger, string, string, Exception?> _invalidFormRequestBody =
            LoggerMessage.Define<string, string>(LogLevel.Debug, new EventId(8, "InvalidFormRequestBody"), "Failed to read parameter \"{ParameterType} {ParameterName}\" from the request body as form.");
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RDG ](/sources/RDG.zip)

:::


### Share RDG 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRDG&quote=RDG" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRDG&text=RDG:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRDG" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRDG&title=RDG" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRDG&title=RDG&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRDG" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RDG

## In the same category (API)


### [Microsoft.Extensions.Configuration.Binder](/docs/Microsoft.Extensions.Configuration.Binder)


### [MinimalApiBuilder](/docs/MinimalApiBuilder)


### [Refit](/docs/Refit)


### [RSCG_WebAPIExports](/docs/RSCG_WebAPIExports)


### [SafeRouting](/docs/SafeRouting)


### [SkinnyControllersCommon](/docs/SkinnyControllersCommon)

