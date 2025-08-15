---
sidebar_position: 1610
title: 161 - Immediate.Handlers
description: Generating mediator like handlers
slug: /Immediate.Handlers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Immediate.Handlers  by Stuart Turner


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Immediate.Handlers?label=Immediate.Handlers)](https://www.nuget.org/packages/Immediate.Handlers/)
[![GitHub last commit](https://img.shields.io/github/last-commit/immediateplatform/Immediate.Handlers?label=updated)](https://github.com/immediateplatform/Immediate.Handlers)
![GitHub Repo stars](https://img.shields.io/github/stars/immediateplatform/Immediate.Handlers?style=social)

## Details

### Info
:::info

Name: **Immediate.Handlers**

TBD

Author: Stuart Turner

NuGet: 
*https://www.nuget.org/packages/Immediate.Handlers/*   


You can find more details at https://github.com/immediateplatform/Immediate.Handlers

Source: https://github.com/immediateplatform/Immediate.Handlers

:::

### Original Readme
:::note

# Immediate.Handlers

[![NuGet](https://img.shields.io/nuget/v/Immediate.Handlers.svg?style=plastic)](https://www.nuget.org/packages/Immediate.Handlers/)
[![GitHub release](https://img.shields.io/github/release/ImmediatePlatform/Immediate.Handlers.svg)](https://GitHub.com/ImmediatePlatform/Immediate.Handlers/releases/)
[![GitHub license](https://img.shields.io/github/license/ImmediatePlatform/Immediate.Handlers.svg)](https://github.com/ImmediatePlatform/Immediate.Handlers/blob/master/license.txt) 
[![GitHub issues](https://img.shields.io/github/issues/ImmediatePlatform/Immediate.Handlers.svg)](https://GitHub.com/ImmediatePlatform/Immediate.Handlers/issues/) 
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/ImmediatePlatform/Immediate.Handlers.svg)](https://GitHub.com/ImmediatePlatform/Immediate.Handlers/issues?q=is%3Aissue+is%3Aclosed) 
[![GitHub Actions](https://github.com/ImmediatePlatform/Immediate.Handlers/actions/workflows/build.yml/badge.svg)](https://github.com/ImmediatePlatform/Immediate.Handlers/actions)
---

Immediate.Handlers is an implementation of the mediator pattern in .NET using source-generation. All pipeline behaviors
are determined and the call-tree built at compile-time; meaning that all dependencies are enforced via compile-time
safety checks. Behaviors and dependencies are obtained via DI at runtime based on compile-time determined dependencies.

#### Examples
* Minimal Api: [Normal](https://github.com/immediateplatform/Immediate.Handlers/samples/Normal)

## Installing Immediate.Handlers

You can install [Immediate.Handlers with NuGet](https://www.nuget.org/packages/Immediate.Handlers):

    Install-Package Immediate.Handlers
    
Or via the .NET Core command line interface:

    dotnet add package Immediate.Handlers

Either commands, from Package Manager Console or .NET Core CLI, will download and install Immediate.Handlers.

## Using Immediate.Handlers
### Creating Handlers

Create a Handler by adding the following code:

```cs
[Handler]
public static partial class GetUsersQuery
{
    public record Query;

    private static ValueTask<IEnumerable<User>> HandleAsync(
        Query _,
        UsersService usersService,
        CancellationToken token
	)
    {
        return usersService.GetUsers();
    }
}
```

This will automatically create a new class, `GetUsersQuery.Handler`, which encapsulates the following:
* attaching any behaviors defined for all queries in the assembly
* using a class to receive any DI services, such as `UsersService`

Any consumer can now do the following:
```cs
public class Consumer(GetUsersQuery.Handler handler)
{
	public async Task Consumer(CancellationToken token)
	{
		var response = await handler.HandleAsync(new(), token);
		// do something with response
	}
}
```

For Command handlers, use a `ValueTask`, and Immediate.Handlers will insert a return type
of `ValueTuple` to your handler automatically. 
```cs
[Handler]
public static partial class CreateUserCommand
{
    public record Command(string Email);

    private static async ValueTask HandleAsync( 
        Command command,
        UsersService usersService,
        CancellationToken token
	)
    {
        await usersService.CreateUser(command.Email);
    }
}
```

In case your project layout does not allow direct for references between consumer and handler, the handler will also be
registered as an `IHandler<TRequest, Response>`.

```cs
public class Consumer(IHandler<Query, IEnumerable<User>> handler)
{
	public async Task Consumer(CancellationToken token)
	{
		var response = await handler.HandleAsync(new(), token);
		// do something with response
	}
}
```

### Creating Behaviors

Create a behavior by implementing the `Immediate.Handlers.Shared.Behaviors<,>` class, as so:
```cs
public sealed class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
	: Behavior<TRequest, TResponse>
{
	public override async ValueTask<TResponse> HandleAsync(TRequest request, CancellationToken cancellationToken)
	{
		logger.LogInformation("LoggingBehavior.Enter");
		var response = await Next(request, cancellationToken);
		logger.LogInformation("LoggingBehavior.Exit");
		return response;
	}
}
```

This can be registered assembly-wide using:
```cs
[assembly: Behaviors(
	typeof(LoggingBehavior<,>)
)]
```

or on an individual handler using:
```cs
[Handler]
[Behavior(
	typeof(LoggingBehavior<,>)
)]
public static class GetUsersQuery
{
	// ..
}
```

Once added to the pipeline, the behavior will be called as part of the pipeline to handle a request.

Note: adding a `[Behavior]` attribute to a handler will disregard all assembly-wide behaviors for that handler, so any
global behaviors necessary must be independently added to the handler override behaviors list.

#### Behavior Constraints

A constraint can be added to a behavior by using:
```cs
public sealed class LoggingBehavior<TRequest, TResponse>
	: Behavior<TRequest, TResponse>
	where TRequest : IRequestConstraint
	where TResponse : IResponseConstraint
```

When a pipeline is generated, all potential behaviors are evaluated against the request and response types, and if
either type does not match a given constraint, the behavior is not added to the generated pipeline.

### Registering with `IServiceCollection`

Immediate.Handlers supports `Microsoft.Extensions.DependencyInjection.Abstractions` directly. 

#### Registering Handlers

```cs
services.AddHandlers();
```

This registers all classes in the assembly marked with `[Handler]`.

#### Registering Behaviors

```cs
services.AddBehaviors();
```

This registers all behaviors referenced in any `[Behaviors]` attribute.

### Using with Swashbuckle
For Swagger to work the JSON schema generated is required to have unique schemaId's. To achieve this, Swashbuckle uses class names as simple schemaId's.
When using Immediate Handlers classes with a controller action inside, you might end up with Swashbuckle stating an error similar to this:

```
Swashbuckle.AspNetCore.SwaggerGen.SwaggerGeneratorException: Failed to generate schema for type - MyApp.Api.DeleteUser+Command. See inner exception
System.InvalidOperationException: Can't use schemaId "$Command" for type "$MyApp.Api.DeleteUser+Command". The same schemaId is already used for type "$MyApp.Api.CreateUserCommand+Command"
```

This error indicates Swashbuckle is trying to use two classes named `Command` from two (or more) different Handlers in different namespaces.

To fix this, you have to define the following options in your SwaggerGen configuration:

```cs
builder.Services.AddSwaggerGen( options =>
{
    options.CustomSchemaIds(x => x.FullName?.Replace("+", ".", StringComparison.Ordinal));
});
```

## Performance Comparisons

All performance benchmarks reported use the following environment:
```
// * Summary *

BenchmarkDotNet v0.13.12, Windows 11 (10.0.22621.3007/22H2/2022Update/SunValley2)
12th Gen Intel Core i7-12700H, 1 CPU, 20 logical and 14 physical cores
.NET SDK 8.0.101
  [Host]     : .NET 8.0.1 (8.0.123.58001), X64 RyuJIT AVX2
  DefaultJob : .NET 8.0.1 (8.0.123.58001), X64 RyuJIT AVX2
```

#### [Benchmarks.Simple](https://github.com/immediateplatform/Immediate.Handlers/benchmarks/Benchmark.Simple)

This benchmark tests the various mediator implementations with a single request/response handler.

| Method                       | Mean       | Error     | Ratio | Rank | Allocated |
|----------------------------- |-----------:|----------:|------:|-----:|----------:|
| SendRequest_Baseline         |  0.7701 ns | 0.0180 ns |  1.00 |    1 |         - |
| SendRequest_IHandler         | 15.6780 ns | 0.0476 ns | 20.36 |    2 |         - |
| SendRequest_ImmediateHandler | 16.6023 ns | 0.0561 ns | 21.56 |    3 |         - |
| SendRequest_Mediator         | 27.2993 ns | 0.4269 ns | 35.49 |    4 |         - |
| SendRequest_IMediator        | 31.3420 ns | 0.1006 ns | 40.64 |    5 |         - |
| SendRequest_MediatR          | 68.3384 ns | 0.3453 ns | 88.73 |    6 |     240 B |

#### [Benchmarks.Large](https://github.com/immediateplatform/Immediate.Handlers/benchmarks/Benchmark.Large)

This benchmark tests the various mediator implementations in the face of 999 request/response handlers.

| Method                        | Mean        | Error     | Ratio  | Rank | Allocated |
|------------------------------ |------------:|----------:|-------:|-----:|----------:|
| SendRequest_Baseline          |   0.5656 ns | 0.0252 ns |   1.00 |    1 |         - |
| SendRequest_ImmediateHandler  |  15.4346 ns | 0.0516 ns |  27.34 |    2 |         - |
| SendRequest_IHandler          |  16.0959 ns | 0.0552 ns |  28.50 |    3 |         - |
| SendRequest_Mediator          |  27.4104 ns | 0.0449 ns |  48.54 |    4 |         - |
| SendRequest_MediatR           |  80.0953 ns | 0.4749 ns | 141.83 |    5 |     240 B |
| SendRequest_IMediator         | 435.3890 ns | 1.6399 ns | 771.01 |    6 |         - |

#### [Benchmarks.Behaviors](https://github.com/immediateplatform/Immediate.Handlers/benchmarks/Benchmark.Behaviors)

This benchmark tests a more realistic scenario of using 1 behavior and 1 service.

| Method                       | Mean      | Error    | Ratio | Rank | Allocated |
|----------------------------- |----------:|---------:|------:|-----:|----------:|
| SendRequest_Baseline         |  56.71 ns | 0.174 ns |  1.00 |    1 |      40 B |
| SendRequest_IHandler         |  78.90 ns | 0.304 ns |  1.39 |    2 |      40 B |
| SendRequest_ImmediateHandler |  80.02 ns | 0.288 ns |  1.41 |    3 |      40 B |
| SendRequest_Mediator         | 101.23 ns | 0.263 ns |  1.78 |    4 |      40 B |
| SendRequest_IMediator        | 104.92 ns | 0.297 ns |  1.85 |    5 |      40 B |
| SendRequest_MediatR          | 201.27 ns | 1.023 ns |  3.55 |    6 |     560 B |


:::

### About
:::note

Generating mediator like handlers


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Immediate.Handlers**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Immediate.Handlers" Version="1.6.1" />
		<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />
		<PackageReference Include="Microsoft.Extensions.Logging.Abstractions" Version="8.0.1" />		
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.Handlers\src\Mediator\Program.cs" label="Program.cs" >

  This is the use of **Immediate.Handlers** in *Program.cs*

```csharp showLineNumbers 

Console.WriteLine("Hello, World!");
ServiceCollection services = new ();
services.AddSingleton<ILoggerFactory, NullLoggerFactory>();
services.AddSingleton(typeof(ILogger<>), typeof(NullLogger<>));
services.AddHandlers();
services.AddBehaviors();
IHandler<Ping, Pong> handler = services.BuildServiceProvider().GetRequiredService<IHandler<Ping, Pong>>();
var id = Guid.NewGuid();
var request = new Ping(id);
var pong = await handler.HandleAsync(request, CancellationToken.None);
Console.WriteLine($"Got pong with id {pong.Id}!");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.Handlers\src\Mediator\PingPong.cs" label="PingPong.cs" >

  This is the use of **Immediate.Handlers** in *PingPong.cs*

```csharp showLineNumbers 
using Immediate.Handlers.Shared;

public sealed record Ping(Guid Id);// : IRequest<Pong>;

public sealed record Pong(Guid Id);


[Handler]
[Behaviors(
    typeof(LoggingBehavior<,>)
)]
public static partial class PingHandler //: IPipelineAction<Ping, Pong>
{

    private static async ValueTask<Pong> HandleAsync(Ping request, CancellationToken token)
    {
        await Task.Delay(1000);
        Console.WriteLine("Returning pong!");
        return new Pong(request.Id);
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.Handlers\src\Mediator\GenericLoggerHandler.cs" label="GenericLoggerHandler.cs" >

  This is the use of **Immediate.Handlers** in *GenericLoggerHandler.cs*

```csharp showLineNumbers 

public sealed class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>>? logger)
    : Behavior<TRequest, TResponse>
{
    public override async ValueTask<TResponse> HandleAsync(TRequest request, CancellationToken cancellationToken)
    {
        Console.WriteLine("I am a logging behaviour");
        logger?.LogInformation("LoggingBehavior.Enter");
        var response = await Next(request, cancellationToken);
        logger?.LogInformation("LoggingBehavior.Exit");
        return response;
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.Handlers\src\Mediator\globals.cs" label="globals.cs" >

  This is the use of **Immediate.Handlers** in *globals.cs*

```csharp showLineNumbers 
global using Microsoft.Extensions.DependencyInjection;
global using Immediate.Handlers.Shared;
global using Microsoft.Extensions.Logging;
global using Mediator;
global using Microsoft.Extensions.Logging.Abstractions;

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.Handlers\src\Mediator\obj\GX\Immediate.Handlers.Generators\Immediate.Handlers.Generators.ImmediateHandlers.ImmediateHandlersGenerator\IH..PingHandler.g.cs" label="IH..PingHandler.g.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;

#pragma warning disable CS1591

partial class PingHandler
{
	public sealed partial class Handler : global::Immediate.Handlers.Shared.IHandler<global::Ping, global::Pong>
	{
		private readonly global::PingHandler.HandleBehavior _handleBehavior;
		private readonly global::LoggingBehavior<global::Ping, global::Pong> _loggingBehavior;

		public Handler(
			global::PingHandler.HandleBehavior handleBehavior,
			global::LoggingBehavior<global::Ping, global::Pong> loggingBehavior
		)
		{
			var handlerType = typeof(PingHandler);

			_handleBehavior = handleBehavior;

			_loggingBehavior = loggingBehavior;
			_loggingBehavior.HandlerType = handlerType;

			_loggingBehavior.SetInnerHandler(_handleBehavior);
		}

		public async global::System.Threading.Tasks.ValueTask<global::Pong> HandleAsync(
			global::Ping request,
			global::System.Threading.CancellationToken cancellationToken = default
		)
		{
			return await _loggingBehavior
				.HandleAsync(request, cancellationToken)
				.ConfigureAwait(false);
		}
	}

	[global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
	public sealed class HandleBehavior : global::Immediate.Handlers.Shared.Behavior<global::Ping, global::Pong>
	{

		public HandleBehavior(
		)
		{
		}

		public override async global::System.Threading.Tasks.ValueTask<global::Pong> HandleAsync(
			global::Ping request,
			global::System.Threading.CancellationToken cancellationToken
		)
		{
			return await global::PingHandler
				.HandleAsync(
					request
					, cancellationToken
				)
				.ConfigureAwait(false);
		}
	}

	[global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
	public static IServiceCollection AddHandlers(
		IServiceCollection services,
		ServiceLifetime lifetime = ServiceLifetime.Scoped
	)
	{
		services.Add(new(typeof(global::PingHandler.Handler), typeof(global::PingHandler.Handler), lifetime));
		services.Add(new(typeof(global::Immediate.Handlers.Shared.IHandler<global::Ping, global::Pong>), typeof(global::PingHandler.Handler), lifetime));
		services.Add(new(typeof(global::PingHandler.HandleBehavior), typeof(global::PingHandler.HandleBehavior), lifetime));
		return services;
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.Handlers\src\Mediator\obj\GX\Immediate.Handlers.Generators\Immediate.Handlers.Generators.ImmediateHandlers.ImmediateHandlersGenerator\IH.ServiceCollectionExtensions.g.cs" label="IH.ServiceCollectionExtensions.g.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

#pragma warning disable CS1591

namespace Mediator;

public static class HandlerServiceCollectionExtensions
{
	public static IServiceCollection AddBehaviors(
		this IServiceCollection services)
	{
		services.TryAddTransient(typeof(global::LoggingBehavior<,>));
		
		return services;
	}

	public static IServiceCollection AddHandlers(
		this IServiceCollection services,
		ServiceLifetime lifetime = ServiceLifetime.Scoped
	)
	{
		global::PingHandler.AddHandlers(services, lifetime);
		
		return services;
	}
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project Immediate.Handlers ](/sources/Immediate.Handlers.zip)

:::


### Share Immediate.Handlers 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImmediate.Handlers&quote=Immediate.Handlers" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImmediate.Handlers&text=Immediate.Handlers:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImmediate.Handlers" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImmediate.Handlers&title=Immediate.Handlers" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImmediate.Handlers&title=Immediate.Handlers&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FImmediate.Handlers" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Immediate.Handlers

### In the same category (Mediator) - 2 other generators


#### [DeeDee](/docs/DeeDee)


#### [Mediator](/docs/Mediator)

