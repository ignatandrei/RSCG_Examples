---
sidebar_position: 320
title: 32 - Mediator
description: Gnerating mediator data without reflection
slug: /Mediator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Mediator  by Martin Othamar


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/Mediator.SourceGenerator?label=Mediator.SourceGenerator)](https://www.nuget.org/packages/Mediator.SourceGenerator)[![Nuget](https://img.shields.io/nuget/dt/Mediator.Abstractions?label=Mediator.Abstractions)](https://www.nuget.org/packages/Mediator.Abstractions)
[![GitHub last commit](https://img.shields.io/github/last-commit/martinothamar/Mediator?label=updated)](https://github.com/martinothamar/Mediator)
![GitHub Repo stars](https://img.shields.io/github/stars/martinothamar/Mediator?style=social)

## Details

### Info
:::info

Name: **Mediator**

A high performance .NET Mediator pattern implemenation using source generation.

Author: Martin Othamar

NuGet: 
*https://www.nuget.org/packages/Mediator.SourceGenerator*   

*https://www.nuget.org/packages/Mediator.Abstractions*   


You can find more details at https://github.com/martinothamar/Mediator

Source : https://github.com/martinothamar/Mediator

:::

### Original Readme
:::note

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/martinothamar/Mediator/build.yml?branch=main)](https://github.com/martinothamar/Mediator/actions)
[![GitHub](https://img.shields.io/github/license/martinothamar/Mediator?style=flat-square)](https://github.com/martinothamar/Mediator/blob/main/LICENSE)
[![Downloads](https://img.shields.io/nuget/dt/mediator.abstractions?style=flat-square)](https://www.nuget.org/packages/Mediator.Abstractions/)<br/>
[![Abstractions NuGet current](https://img.shields.io/nuget/v/Mediator.Abstractions?label=Mediator.Abstractions)](https://www.nuget.org/packages/Mediator.Abstractions)
[![SourceGenerator NuGet current](https://img.shields.io/nuget/v/Mediator.SourceGenerator?label=Mediator.SourceGenerator)](https://www.nuget.org/packages/Mediator.SourceGenerator)
[![Abstractions NuGet prerelease](https://img.shields.io/nuget/vpre/Mediator.Abstractions?label=Mediator.Abstractions)](https://www.nuget.org/packages/Mediator.Abstractions)
[![SourceGenerator NuGet prerelease](https://img.shields.io/nuget/vpre/Mediator.SourceGenerator?label=Mediator.SourceGenerator)](https://www.nuget.org/packages/Mediator.SourceGenerator)<br/>

# Mediator

> **Note**
>
> **Version 3.0** is currently being developed. See status and provide feedback [here (#98)](https://github.com/martinothamar/Mediator/issues/98)

This is a high performance .NET implementation of the Mediator pattern using the [source generators](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/) feature introduced in .NET 5.
The API and usage is mostly based on the great [MediatR](https://github.com/jbogard/MediatR) library, with some deviations to allow for better performance.
Packages are .NET Standard 2.1 compatible.

The mediator pattern is great for implementing cross cutting concern (logging, metrics, etc) and avoiding "fat" constructors due to lots of injected services.

Goals for this library
* High performance
  * Runtime performance can be the same for both runtime reflection and source generator based approaches, but it's easier to optimize in the latter case
* AOT friendly
  * MS are investing time in various AOT scenarios, and for example iOS requirees AOT compilation
* Build time errors instead of runtime errors
  * The generator includes diagnostics, i.e. if a handler is not defined for a request, a warning is emitted

In particular, source generators in this library is used to
* Generate code for DI registration
* Generate code for `IMediator` implementation
  * Request/Command/Query `Send` methods are monomorphized (1 method per T), the generic `ISender.Send` methods rely on these
  * You can use both `IMediator` and `Mediator`, the latter allows for better performance
* Generate diagnostics related messages and message handlers

See this great video by [@Elfocrash / Nick Chapsas](https://github.com/Elfocrash), covering both similarities and differences between Mediator and MediatR

[![Using MediatR in .NET? Maybe replace it with this](https://img.youtube.com/vi/aaFLtcf8cO4/0.jpg)](https://www.youtube.com/watch?v=aaFLtcf8cO4)

## Table of Contents

- [Mediator](#mediator)
  - [Table of Contents](#table-of-contents)
  - [2. Benchmarks](#2-benchmarks)
  - [3. Usage and abstractions](#3-usage-and-abstractions)
    - [3.1. Message types](#31-message-types)
    - [3.2. Handler types](#32-handler-types)
    - [3.3. Pipeline types](#33-pipeline-types)
      - [3.3.1. Message validation example](#331-message-validation-example)
      - [3.3.2. Error logging example](#332-error-logging-example)
    - [3.4. Configuration](#34-configuration)
  - [4. Getting started](#4-getting-started)
    - [4.1. Add package](#41-add-package)
    - [4.2. Add Mediator to DI container](#42-add-mediator-to-di-container)
    - [4.3. Create `IRequest<>` type](#43-create-irequest-type)
    - [4.4. Use pipeline behaviors](#44-use-pipeline-behaviors)
    - [4.5. Constrain `IPipelineBehavior<,>` message with open generics](#45-constrain-ipipelinebehavior-message-with-open-generics)
    - [4.6. Use notifications](#46-use-notifications)
    - [4.7. Polymorphic dispatch with notification handlers](#47-polymorphic-dispatch-with-notification-handlers)
    - [4.8. Notification handlers also support open generics](#48-notification-handlers-also-support-open-generics)
    - [4.9. Use streaming messages](#49-use-streaming-messages)
  - [5. Diagnostics](#5-diagnostics)
  - [6. Differences from MediatR](#6-differences-from-mediatr)

## 2. Benchmarks

This benchmark exposes the perf overhead of the libraries.
Mediator (this library) and MediatR methods show the overhead of the respective mediator implementations.
I've also included the [MessagePipe](https://github.com/Cysharp/MessagePipe) library as it also has great performance.

* `<SendRequest | Stream>_Baseline`: simple method call into the handler class
* `<SendRequest | Stream>_Mediator`: the concrete `Mediator` class generated by this library
* `<SendRequest | Stream>_MessagePipe`: the [MessagePipe](https://github.com/Cysharp/MessagePipe) library
* `<SendRequest | Stream>_IMediator`: call through the `IMediator` interface in this library
* `<SendRequest | Stream>_MediatR`: the [MediatR](https://github.com/jbogard/MediatR) library

See benchmarks code for more details on the measurement.

> **Warning**
>
> A current limitation of this library is that performance degrades significantly for projects with a large number of messages (>500)
> There is ongoing work on resolving this for version 3.0 ([#48](https://github.com/martinothamar/Mediator/issues/48)).

## 3. Usage and abstractions

There are two NuGet packages needed to use this library
* Mediator.SourceGenerator
  * To generate the `IMediator` implementation and dependency injection setup.
* Mediator.Abstractions
  * Message types (`IRequest<,>`, `INotification`), handler types (`IRequestHandler<,>`, `INotificationHandler<>`), pipeline types (`IPipelineBehavior`)

You install the source generator package into your edge/outermost project (i.e. ASP.NET Core application, Background worker project),
and then use the `Mediator.Abstractions` package wherever you define message types and handlers.
Standard message handlers are automatically picked up and added to the DI container in the generated `AddMediator` method.
*Pipeline behaviors need to be added manually (including pre/post/exception behaviors).*

For example implementations, see the samples folder.
See the ASP.NET Core clean architecture sample for a more real world setup.

### 3.1. Message types

* `IMessage` - marker interface
* `IStreamMessage` - marker interface
* `IBaseRequest` - marker interface for requests
* `IRequest` - a request message, no return value (`ValueTask<Unit>`)
* `IRequest<out TResponse>` - a request message with a response (`ValueTask<TResponse>`)
* `IStreamRequest<out TResponse>` - a request message with a streaming response (`IAsyncEnumerable<TResponse>`)
* `IBaseCommand` - marker interface for commands
* `ICommand` - a command message, no return value (`ValueTask<Unit>`)
* `ICommand<out TResponse>` - a command message with a response (`ValueTask<TResponse>`)
* `IStreamCommand<out TResponse>` - a command message with a streaming response (`IAsyncEnumerable<TResponse>`)
* `IBaseQuery` - marker interface for queries
* `IQuery<out TResponse>` - a query message with a response (`ValueTask<TResponse>`)
* `IStreamQuery<out TResponse>` - a query message with a streaming response (`IAsyncEnumerable<TResponse>`)
* `INotification` - a notification message, no return value (`ValueTask`)

As you can see, you can achieve the exact same thing with requests, commands and queries. But I find the distinction in naming useful if you for example use the CQRS pattern or for some reason have a preference on naming in your application.

### 3.2. Handler types

* `IRequestHandler<in TRequest>`
* `IRequestHandler<in TRequest, TResponse>`
* `IStreamRequestHandler<in TRequest, out TResponse>`
* `ICommandHandler<in TCommand>`
* `ICommandHandler<in TCommand, TResponse>`
* `IStreamCommandHandler<in TCommand, out TResponse>`
* `IQueryHandler<in TQuery, TResponse>`
* `IStreamQueryHandler<in TQuery, out TResponse>`
* `INotificationHandler<in TNotification>`

These types are used in correlation with the message types above.

### 3.3. Pipeline types

* `IPipelineBehavior<TMessage, TResponse>`
* `IStreamPipelineBehavior<TMessage, TResponse>`
* `MessagePreProcessor<TMessage, TResponse>`
* `MessagePostProcessor<TMessage, TResponse>`
* `MessageExceptionHandler<TMessage, TResponse, TException>`

#### 3.3.1. Message validation example

```csharp
// As a normal pipeline behavior
public sealed class MessageValidatorBehaviour<TMessage, TResponse> : IPipelineBehavior<TMessage, TResponse>
    where TMessage : IValidate
{
    public ValueTask<TResponse> Handle(
        TMessage message,
        CancellationToken cancellationToken,
        MessageHandlerDelegate<TMessage, TResponse> next
    )
    {
        if (!message.IsValid(out var validationError))
            throw new ValidationException(validationError);

        return next(message, cancellationToken);
    }
}

// Or as a pre-processor
public sealed class MessageValidatorBehaviour<TMessage, TResponse> : MessagePreProcessor<TMessage, TResponse>
    where TMessage : IValidate
{
    protected override ValueTask Handle(TMessage message, CancellationToken cancellationToken)
    {
        if (!message.IsValid(out var validationError))
            throw new ValidationException(validationError);

        return default;
    }
}

// Register as IPipelineBehavior<,> in either case
services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(MessageValidatorBehaviour<,>))
```

#### 3.3.2. Error logging example

```csharp
// As a normal pipeline behavior
public sealed class ErrorLoggingBehaviour<TMessage, TResponse> : IPipelineBehavior<TMessage, TResponse>
    where TMessage : IMessage
{
    private readonly ILogger<ErrorLoggingBehaviour<TMessage, TResponse>> _logger;

    public ErrorLoggingBehaviour(ILogger<ErrorLoggingBehaviour<TMessage, TResponse>> logger)
    {
        _logger = logger;
    }

    public async ValueTask<TResponse> Handle(
        TMessage message,
        CancellationToken cancellationToken,
        MessageHandlerDelegate<TMessage, TResponse> next
    )
    {
        try
        {
            return await next(message, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling message of type {messageType}", message.GetType().Name);
            throw;
        }
    }
}

// Or as an exception handler
public sealed class ErrorLoggingBehaviour<TMessage, TResponse> : MessageExceptionHandler<TMessage, TResponse>
    where TMessage : notnull, IMessage
{
    private readonly ILogger<ErrorLoggingBehaviour<TMessage, TResponse>> _logger;

    public ErrorLoggingBehaviour(ILogger<ErrorLoggingBehaviour<TMessage, TResponse>> logger)
    {
        _logger = logger;
    }

    protected override ValueTask<ExceptionHandlingResult<TResponse>> Handle(
        TMessage message,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        _logger.LogError(exception, "Error handling message of type {messageType}", message.GetType().Name);
        // Let the exception bubble up by using the base class helper NotHandled:
        return NotHandled;
        // Or if the exception is properly handled, you can just return your own response,
        // using the base class helper Handle().
        // This requires you to know something about TResponse,
        // so TResponse needs to be constrained to something,
        // typically with a static abstract member acting as a consructor on an interface or abstract class.
        return Handled(null!);
    }
}

// Register as IPipelineBehavior<,> in either case
services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(ErrorLoggingBehaviour<,>))
```

### 3.4. Configuration

There are two ways to configure Mediator. Configuration values are needed during compile-time since this is a source generator:
* Assembly level attribute for configuration: `MediatorOptionsAttribute`
* Options configuration delegate in `AddMediator` function.

```csharp
services.AddMediator(options =>
{
    options.Namespace = "SimpleConsole.Mediator";
    options.DefaultServiceLifetime = ServiceLifetime.Transient;
});

// or

[assembly: MediatorOptions(Namespace = "SimpleConsole.Mediator", DefaultServiceLifetime = ServiceLifetime.Transient)]
```

* `Namespace` - where the `IMediator` implementation is generated
* `DefaultServiceLifetime` - the DI service lifetime
  * `Singleton` - (default value) everything registered as singletons, minimal allocations
  * `Transient` - handlers registered as transient, `IMediator`/`Mediator`/`ISender`/`IPublisher` still singleton
  * `Scoped`    - mediator and handlers registered as scoped

## 4. Getting started

In this section we will get started with Mediator and go through a sample
illustrating the various ways the Mediator pattern can be used in an application.

See the full runnable sample code in the SimpleEndToEnd sample.

### 4.1. Add package

```pwsh
dotnet add package Mediator.SourceGenerator --version 2.0.*
dotnet add package Mediator.Abstractions --version 2.0.*
```
or
```xml
<PackageReference Include="Mediator.SourceGenerator" Version="2.0.*">
  <PrivateAssets>all</PrivateAssets>
  <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
</PackageReference>
<PackageReference Include="Mediator.Abstractions" Version="2.0.*" />
```

### 4.2. Add Mediator to DI container

In `ConfigureServices` or equivalent, call `AddMediator` (unless `MediatorOptions` is configured, default namespace is `Mediator`).
This registers your handler below.

```csharp
using Mediator;
using Microsoft.Extensions.DependencyInjection;
using System;

var services = new ServiceCollection(); // Most likely IServiceCollection comes from IHostBuilder/Generic host abstraction in Microsoft.Extensions.Hosting

services.AddMediator();
var serviceProvider = services.BuildServiceProvider();
```

### 4.3. Create `IRequest<>` type

```csharp
var mediator = serviceProvider.GetRequiredService<IMediator>();
var ping = new Ping(Guid.NewGuid());
var pong = await mediator.Send(ping);
Debug.Assert(ping.Id == pong.Id);

// ...

public sealed record Ping(Guid Id) : IRequest<Pong>;

public sealed record Pong(Guid Id);

public sealed class PingHandler : IRequestHandler<Ping, Pong>
{
    public ValueTask<Pong> Handle(Ping request, CancellationToken cancellationToken)
    {
        return new ValueTask<Pong>(new Pong(request.Id));
    }
}
```

As soon as you code up message types, the source generator will add DI registrations automatically (inside `AddMediator`).
P.S - You can inspect the code yourself - open `Mediator.g.cs` in VS from Project -> Dependencies -> Analyzers -> Mediator.SourceGenerator -> Mediator.SourceGenerator.MediatorGenerator,
or just F12 through the code.

### 4.4. Use pipeline behaviors

The pipeline behavior below validates all incoming `Ping` messages.
Pipeline behaviors currently must be added manually.

```csharp
services.AddMediator();
services.AddSingleton<IPipelineBehavior<Ping, Pong>, PingValidator>();

public sealed class PingValidator : IPipelineBehavior<Ping, Pong>
{
    public ValueTask<Pong> Handle(Ping request, MessageHandlerDelegate<Ping, Pong> next, CancellationToken cancellationToken)
    {
        if (request is null || request.Id == default)
            throw new ArgumentException("Invalid input");

        return next(request, cancellationToken);
    }
}
```

### 4.5. Constrain `IPipelineBehavior<,>` message with open generics

Add open generic handler to process all or a subset of messages passing through Mediator.
This handler will log any error that is thrown from message handlers (`IRequest`, `ICommand`, `IQuery`).
It also publishes a notification allowing notification handlers to react to errors.
Message pre- and post-processors along with the exception handlers can also constrain the generic type parameters in the same way.

```csharp
services.AddMediator();
services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(ErrorLoggerHandler<,>));

public sealed record ErrorMessage(Exception Exception) : INotification;
public sealed record SuccessfulMessage() : INotification;

public sealed class ErrorLoggerHandler<TMessage, TResponse> : IPipelineBehavior<TMessage, TResponse>
    where TMessage : IMessage // Constrained to IMessage, or constrain to IBaseCommand or any custom interface you've implemented
{
    private readonly ILogger<ErrorLoggerHandler<TMessage, TResponse>> _logger;
    private readonly IMediator _mediator;

    public ErrorLoggerHandler(ILogger<ErrorLoggerHandler<TMessage, TResponse>> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    public async ValueTask<TResponse> Handle(TMessage message, MessageHandlerDelegate<TMessage, TResponse> next, CancellationToken cancellationToken)
    {
        try
        {
            var response = await next(message, cancellationToken);
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling message");
            await _mediator.Publish(new ErrorMessage(ex));
            throw;
        }
    }
}
```

### 4.6. Use notifications

We can define a notification handler to catch errors from the above pipeline behavior.

```csharp
// Notification handlers are automatically added to DI container

public sealed class ErrorNotificationHandler : INotificationHandler<ErrorMessage>
{
    public ValueTask Handle(ErrorMessage error, CancellationToken cancellationToken)
    {
        // Could log to application insights or something...
        return default;
    }
}
```

### 4.7. Polymorphic dispatch with notification handlers

We can also define a notification handler that receives all notifications.

```csharp

public sealed class StatsNotificationHandler : INotificationHandler<INotification> // or any other interface deriving from INotification
{
    private long _messageCount;
    private long _messageErrorCount;

    public (long MessageCount, long MessageErrorCount) Stats => (_messageCount, _messageErrorCount);

    public ValueTask Handle(INotification notification, CancellationToken cancellationToken)
    {
        Interlocked.Increment(ref _messageCount);
        if (notification is ErrorMessage)
            Interlocked.Increment(ref _messageErrorCount);
        return default;
    }
}
```

### 4.8. Notification handlers also support open generics

```csharp
public sealed class GenericNotificationHandler<TNotification> : INotificationHandler<TNotification>
    where TNotification : INotification // Generic notification handlers will be registered as open constrained types automatically
{
    public ValueTask Handle(TNotification notification, CancellationToken cancellationToken)
    {
        return default;
    }
}
```


### 4.9. Use streaming messages

Since version 1.* of this library there is support for streaming using `IAsyncEnumerable`.

```csharp
var mediator = serviceProvider.GetRequiredService<IMediator>();

var ping = new StreamPing(Guid.NewGuid());

await foreach (var pong in mediator.CreateStream(ping))
{
    Debug.Assert(ping.Id == pong.Id);
    Console.WriteLine("Received pong!"); // Should log 5 times
}

// ...

public sealed record StreamPing(Guid Id) : IStreamRequest<Pong>;

public sealed record Pong(Guid Id);

public sealed class PingHandler : IStreamRequestHandler<StreamPing, Pong>
{
    public async IAsyncEnumerable<Pong> Handle(StreamPing request, [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        for (int i = 0; i < 5; i++)
        {
            await Task.Delay(1000, cancellationToken);
            yield return new Pong(request.Id);
        }
    }
}
```

## 5. Diagnostics

Since this is a source generator, diagnostics are also included. Examples below

* Missing request handler

Missing request handler

* Multiple request handlers found

Multiple request handlers found


## 6. Differences from [MediatR](https://github.com/jbogard/MediatR)

This is a work in progress list on the differences between this library and MediatR.

* `RequestHandlerDelegate<TResponse>()` -> `MessageHandlerDelegate<TMessage, TResponse>(TMessage message, CancellationToken cancellationToken)`
  * This is to avoid excessive closure allocations. I thin it's worthwhile when the cost is simply passing along the message and the cancellationtoken.
* No `ServiceFactory`
  * This library relies on the `Microsoft.Extensions.DependencyInjection`, so it only works with DI containers that integrate with those abstractions.
* Singleton service lifetime by default
  * MediatR in combination with `MediatR.Extensions.Microsoft.DependencyInjection` does transient service registration by default, which leads to a lot of allocations. Even if it is configured for singleton lifetime, `IMediator` and `ServiceFactory` services are registered as transient (not configurable).
* Methods return `ValueTask<T>` instead of `Task<T>`, to allow for fewer allocations (for example if the handler completes synchronously, or using async method builder pooling/`PoolingAsyncValueTaskMethodBuilder<T>`)
* This library doesn't support generic requests/notifications


:::

### About
:::note

Gnerating mediator data without reflection


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Mediator**
```xml showLineNumbers {15}
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
		<PackageReference Include="Mediator.Abstractions" Version="2.1.5" />
		<PackageReference Include="Mediator.SourceGenerator" Version="2.1.5" OutputItemType="Analyzer">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
		<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />
		
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mediator\src\MediatorDemo\Program.cs" label="Program.cs" >

  This is the use of **Mediator** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine("Hello, World!");
var services = new ServiceCollection();
services.AddMediator();
services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(GenericLoggerHandler<,>)); // This will run 1st

var serviceProvider = services.BuildServiceProvider();

var mediator = serviceProvider.GetRequiredService<IMediator>();
var id = Guid.NewGuid();
var request = new Ping(id);

var response = await mediator.Send(request);

Console.WriteLine("-----------------------------------");
Console.WriteLine("ID: " + id);
Console.WriteLine(request);
Console.WriteLine(response);


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mediator\src\MediatorDemo\GenericLoggerHandler.cs" label="GenericLoggerHandler.cs" >

  This is the use of **Mediator** in *GenericLoggerHandler.cs*

```csharp showLineNumbers 
public sealed class GenericLoggerHandler<TMessage, TResponse> : IPipelineBehavior<TMessage, TResponse>
    where TMessage : IMessage
{
    public async ValueTask<TResponse> Handle(TMessage message, CancellationToken cancellationToken, MessageHandlerDelegate<TMessage, TResponse> next)    
    {
        Console.WriteLine("1) Running logger handler");
        try
        {
            var response = await next(message, cancellationToken);
            Console.WriteLine("5) No error!");
            return response;
        }
        catch (Exception ex)
        {
            Console.WriteLine("error:"+ex.Message);
            throw;
        }
    }

}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mediator\src\MediatorDemo\PingPong.cs" label="PingPong.cs" >

  This is the use of **Mediator** in *PingPong.cs*

```csharp showLineNumbers 

public sealed record Ping(Guid Id) : IRequest<Pong>;

public sealed record Pong(Guid Id);


public sealed class PingHandler : IRequestHandler<Ping, Pong>
{
    public ValueTask<Pong> Handle(Ping request, CancellationToken cancellationToken)
    {
        Console.WriteLine("4) Returning pong!");
        return new ValueTask<Pong>(new Pong(request.Id));
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mediator\src\MediatorDemo\obj\GX\Mediator.SourceGenerator.Roslyn40\Mediator.SourceGenerator.IncrementalMediatorGenerator\Mediator.g.cs" label="Mediator.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Generated by the Mediator source generator.
// </auto-generated>

#pragma warning disable CS8019 // Unused usings
#pragma warning disable CS8321 // Unused local function
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Linq;

using SD = global::Microsoft.Extensions.DependencyInjection.ServiceDescriptor;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// DI extensions for Mediator.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    public static class MediatorDependencyInjectionExtensions
    {
        /// <summary>
        /// Adds the Mediator implementation and handlers of your application.
        /// </summary>
        public static IServiceCollection AddMediator(this IServiceCollection services)
        {
            return AddMediator(services, null);
        }

        internal sealed class Dummy { }

        /// <summary>
        /// Adds the Mediator implementation and handlers of your application, with specified options.
        /// </summary>
        public static IServiceCollection AddMediator(this IServiceCollection services, global::System.Action<global::Mediator.MediatorOptions> options)
        {
            var opts = new global::Mediator.MediatorOptions();
            if (options != null)
                options(opts);

            var configuredViaAttribute = false;
            if (opts.ServiceLifetime != global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton && !configuredViaAttribute)
            {
                var errMsg = "Invalid configuration detected for Mediator. ";
                errMsg += "Generated code for 'Singleton' lifetime, but got '" + opts.ServiceLifetime + "' lifetime from options. ";
                errMsg += "This means that the source generator hasn't seen the 'AddMediator' method call during compilation. ";
                errMsg += "Make sure that the 'AddMediator' method is called from the project that references the Mediator.SourceGenerator package.";
                throw new global::System.Exception(errMsg);
            }


            services.Add(new SD(typeof(global::Mediator.Mediator), typeof(global::Mediator.Mediator), global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton));
            services.TryAdd(new SD(typeof(global::Mediator.IMediator), sp => sp.GetRequiredService<global::Mediator.Mediator>(), global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton));
            services.TryAdd(new SD(typeof(global::Mediator.ISender), sp => sp.GetRequiredService<global::Mediator.Mediator>(), global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton));
            services.TryAdd(new SD(typeof(global::Mediator.IPublisher), sp => sp.GetRequiredService<global::Mediator.Mediator>(), global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton));

            services.TryAdd(new SD(typeof(global::PingHandler), typeof(global::PingHandler), global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton));
            services.Add(new SD(
                typeof(global::Mediator.RequestClassHandlerWrapper<global::Ping, global::Pong>),
                sp =>
                {
                    return new global::Mediator.RequestClassHandlerWrapper<global::Ping, global::Pong>(
                        sp.GetRequiredService<global::PingHandler>(),
                        sp.GetServices<global::Mediator.IPipelineBehavior<global::Ping, global::Pong>>()
                    );
                },
                global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton
            ));




            services.AddSingleton<Dummy>();

            return services;

        }
    }
}

namespace Mediator
{
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class RequestClassHandlerWrapper<TRequest, TResponse>
        where TRequest : class, global::Mediator.IRequest<TResponse>
    {
        private readonly global::Mediator.MessageHandlerDelegate<TRequest, TResponse> _rootHandler;

        public RequestClassHandlerWrapper(
            global::Mediator.IRequestHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.MessageHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Threading.Tasks.ValueTask<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class RequestStructHandlerWrapper<TRequest, TResponse>
        where TRequest : struct, global::Mediator.IRequest<TResponse>
    {
        private readonly global::Mediator.MessageHandlerDelegate<TRequest, TResponse> _rootHandler;

        public RequestStructHandlerWrapper(
            global::Mediator.IRequestHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.MessageHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Threading.Tasks.ValueTask<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class StreamRequestClassHandlerWrapper<TRequest, TResponse>
        where TRequest : class, global::Mediator.IStreamRequest<TResponse>
    {
        private readonly global::Mediator.StreamHandlerDelegate<TRequest, TResponse> _rootHandler;

        public StreamRequestClassHandlerWrapper(
            global::Mediator.IStreamRequestHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IStreamPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.StreamHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class StreamRequestStructHandlerWrapper<TRequest, TResponse>
        where TRequest : struct, global::Mediator.IStreamRequest<TResponse>
    {
        private readonly global::Mediator.StreamHandlerDelegate<TRequest, TResponse> _rootHandler;

        public StreamRequestStructHandlerWrapper(
            global::Mediator.IStreamRequestHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IStreamPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.StreamHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class CommandClassHandlerWrapper<TRequest, TResponse>
        where TRequest : class, global::Mediator.ICommand<TResponse>
    {
        private readonly global::Mediator.MessageHandlerDelegate<TRequest, TResponse> _rootHandler;

        public CommandClassHandlerWrapper(
            global::Mediator.ICommandHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.MessageHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Threading.Tasks.ValueTask<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class CommandStructHandlerWrapper<TRequest, TResponse>
        where TRequest : struct, global::Mediator.ICommand<TResponse>
    {
        private readonly global::Mediator.MessageHandlerDelegate<TRequest, TResponse> _rootHandler;

        public CommandStructHandlerWrapper(
            global::Mediator.ICommandHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.MessageHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Threading.Tasks.ValueTask<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class StreamCommandClassHandlerWrapper<TRequest, TResponse>
        where TRequest : class, global::Mediator.IStreamCommand<TResponse>
    {
        private readonly global::Mediator.StreamHandlerDelegate<TRequest, TResponse> _rootHandler;

        public StreamCommandClassHandlerWrapper(
            global::Mediator.IStreamCommandHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IStreamPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.StreamHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class StreamCommandStructHandlerWrapper<TRequest, TResponse>
        where TRequest : struct, global::Mediator.IStreamCommand<TResponse>
    {
        private readonly global::Mediator.StreamHandlerDelegate<TRequest, TResponse> _rootHandler;

        public StreamCommandStructHandlerWrapper(
            global::Mediator.IStreamCommandHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IStreamPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.StreamHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class QueryClassHandlerWrapper<TRequest, TResponse>
        where TRequest : class, global::Mediator.IQuery<TResponse>
    {
        private readonly global::Mediator.MessageHandlerDelegate<TRequest, TResponse> _rootHandler;

        public QueryClassHandlerWrapper(
            global::Mediator.IQueryHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.MessageHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Threading.Tasks.ValueTask<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class QueryStructHandlerWrapper<TRequest, TResponse>
        where TRequest : struct, global::Mediator.IQuery<TResponse>
    {
        private readonly global::Mediator.MessageHandlerDelegate<TRequest, TResponse> _rootHandler;

        public QueryStructHandlerWrapper(
            global::Mediator.IQueryHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.MessageHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Threading.Tasks.ValueTask<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class StreamQueryClassHandlerWrapper<TRequest, TResponse>
        where TRequest : class, global::Mediator.IStreamQuery<TResponse>
    {
        private readonly global::Mediator.StreamHandlerDelegate<TRequest, TResponse> _rootHandler;

        public StreamQueryClassHandlerWrapper(
            global::Mediator.IStreamQueryHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IStreamPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.StreamHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    internal sealed class StreamQueryStructHandlerWrapper<TRequest, TResponse>
        where TRequest : struct, global::Mediator.IStreamQuery<TResponse>
    {
        private readonly global::Mediator.StreamHandlerDelegate<TRequest, TResponse> _rootHandler;

        public StreamQueryStructHandlerWrapper(
            global::Mediator.IStreamQueryHandler<TRequest, TResponse> concreteHandler,
            global::System.Collections.Generic.IEnumerable<global::Mediator.IStreamPipelineBehavior<TRequest, TResponse>> pipelineBehaviours
        )
        {
            var handler = (global::Mediator.StreamHandlerDelegate<TRequest, TResponse>)concreteHandler.Handle;

            foreach (var pipeline in pipelineBehaviours.Reverse())
            {
                var handlerCopy = handler;
                var pipelineCopy = pipeline;
                handler = (TRequest message, System.Threading.CancellationToken cancellationToken) => pipelineCopy.Handle(message, cancellationToken, handlerCopy);
            }

            _rootHandler = handler;
        }

        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> Handle(TRequest request, global::System.Threading.CancellationToken cancellationToken) =>
            _rootHandler(request, cancellationToken);
    }

    /// <summary>
    /// Generated code for Mediator implementation.
    /// This type is also registered as a DI service.
    /// Can be used directly for high performance scenarios.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    public sealed partial class Mediator : global::Mediator.IMediator, global::Mediator.ISender, global::Mediator.IPublisher
    {
        private readonly global::System.IServiceProvider _sp;
        private FastLazyValue<DICache> _diCacheLazy;

        /// <summary>
        /// The lifetime of Mediator-related service registrations in DI container.
        /// </summary>
        public static global::Microsoft.Extensions.DependencyInjection.ServiceLifetime ServiceLifetime { get; } = global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton;

        private readonly global::System.Func<global::System.Collections.Generic.IEnumerable<object>, int> _getServicesLength;

        /// <summary>
        /// Constructor for DI, should not be used by consumer.
        /// </summary>
        public Mediator(global::System.IServiceProvider sp)
        {
            _sp = sp;
            _diCacheLazy = new FastLazyValue<DICache>(() => new DICache(_sp));

            global::System.Func<global::System.Collections.Generic.IEnumerable<object>, int> fastGetLength = s => ((object[])s).Length;
            global::System.Func<global::System.Collections.Generic.IEnumerable<object>, int> slowGetLength = s => s.Count();

            var dummy = sp.GetServices<global::Microsoft.Extensions.DependencyInjection.MediatorDependencyInjectionExtensions.Dummy>();
            _getServicesLength = dummy.GetType() == typeof(global::Microsoft.Extensions.DependencyInjection.MediatorDependencyInjectionExtensions.Dummy[])
                 ? fastGetLength : slowGetLength;
        }

        private struct FastLazyValue<T>
            where T : struct
        {
            private const long UNINIT = 0;
            private const long INITING = 1;
            private const long INITD = 2;
            
            

            private global::System.Func<T> _generator;
            private long _state;
            private T _value;

            public T Value
            {
                [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
                get
                {
                    if (_state != INITD)
                        return ValueSlow;

                    return _value;
                }
            }

            private T ValueSlow
            {
                [global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
                get
                {
                    var prevState = global::System.Threading.Interlocked.CompareExchange(ref _state, INITING, UNINIT);
                    switch (prevState)
                    {
                        case INITD:
                            // Someone has already completed init
                            return _value;
                        case INITING:
                            // Wait for someone else to complete
                            var spinWait = default(global::System.Threading.SpinWait);
                            while (global::System.Threading.Interlocked.Read(ref _state) < INITD)
                                spinWait.SpinOnce();
                            return _value;
                        case UNINIT:
                            _value = _generator();
                            global::System.Threading.Interlocked.Exchange(ref _state, INITD);
                            return _value;
                    }

                    return _value;
                }
            }


            public FastLazyValue(global::System.Func<T> generator)
            {
                _generator = generator;
                _state = UNINIT;
                _value = default;
            }
        }

                private readonly struct DICache
        {
            private readonly global::System.IServiceProvider _sp;

            public readonly global::Mediator.RequestClassHandlerWrapper<global::Ping, global::Pong> Wrapper_For_Ping;

            public DICache(global::System.IServiceProvider sp)
            {
                _sp = sp;

                Wrapper_For_Ping = sp.GetRequiredService<global::Mediator.RequestClassHandlerWrapper<global::Ping, global::Pong>>();
            }
        }

        /// <summary>
        /// Send a message of type global::Ping.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// </summary>
        /// <param name="message">Incoming message</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public global::System.Threading.Tasks.ValueTask<global::Pong> Send(
            global::Ping message,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowIfNull(message, nameof(message));
            
            return _diCacheLazy.Value.Wrapper_For_Ping.Handle(message, cancellationToken);
        }

        /// <summary>
        /// Send request.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="request">Incoming request</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public global::System.Threading.Tasks.ValueTask<TResponse> Send<TResponse>(
            global::Mediator.IRequest<TResponse> request,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            switch (request)
            {
                case global::Ping r:
                {
                    if(typeof(TResponse) == typeof(global::Pong))
                    {
                        var task = Send(r, cancellationToken);
                        return global::System.Runtime.CompilerServices.Unsafe.As<global::System.Threading.Tasks.ValueTask<global::Pong>, global::System.Threading.Tasks.ValueTask<TResponse>>(ref task);
                    }
                    else
                    {
                        return SendAsync(request, cancellationToken);
                    }
                }
                default:
                {
                    ThrowArgumentNullOrInvalidMessage(request, nameof(request));
                    return default;
                }
            }
            
        }

        /// <summary>
        /// Send request.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="request">Incoming request</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        private async global::System.Threading.Tasks.ValueTask<TResponse> SendAsync<TResponse>(
            global::Mediator.IRequest<TResponse> request,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            switch (request)
            {
                case global::Ping r:
                {
                    var response = await Send(r, cancellationToken);
                    return global::System.Runtime.CompilerServices.Unsafe.As<global::Pong, TResponse>(ref response);
                }
                default:
                {
                    ThrowArgumentNullOrInvalidMessage(request, nameof(request));
                    return default;
                }
            }
            
        }

        /// <summary>
        /// Create stream for request.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="request">Incoming message</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Async enumerable</returns>
        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> CreateStream<TResponse>(
            global::Mediator.IStreamRequest<TResponse> request,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(request);
            return default;
            
        }

        /// <summary>
        /// Send command.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="command">Incoming command</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public global::System.Threading.Tasks.ValueTask<TResponse> Send<TResponse>(
            global::Mediator.ICommand<TResponse> command,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(command);
            return default;
            
        }

        /// <summary>
        /// Send command.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="command">Incoming command</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        private async global::System.Threading.Tasks.ValueTask<TResponse> SendAsync<TResponse>(
            global::Mediator.ICommand<TResponse> command,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(command);
            return default;
            
        }

        /// <summary>
        /// Create stream for command.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="command">Incoming message</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Async enumerable</returns>
        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> CreateStream<TResponse>(
            global::Mediator.IStreamCommand<TResponse> command,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(command);
            return default;
            
        }

        /// <summary>
        /// Send query.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="query">Incoming query</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public global::System.Threading.Tasks.ValueTask<TResponse> Send<TResponse>(
            global::Mediator.IQuery<TResponse> query,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(query);
            return default;
            
        }

        /// <summary>
        /// Send query.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="query">Incoming query</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        private async global::System.Threading.Tasks.ValueTask<TResponse> SendAsync<TResponse>(
            global::Mediator.IQuery<TResponse> query,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(query);
            return default;
            
        }

        /// <summary>
        /// Create stream for query.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="query">Incoming message</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Async enumerable</returns>
        public global::System.Collections.Generic.IAsyncEnumerable<TResponse> CreateStream<TResponse>(
            global::Mediator.IStreamQuery<TResponse> query,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(query);
            return default;
            
        }

        /// <summary>
        /// Send message.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="message">Incoming message</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public async global::System.Threading.Tasks.ValueTask<object> Send(
            object message,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            switch (message)
            {
                case global::Ping m: return await Send(m, cancellationToken);
                default:
                {
                    ThrowArgumentNullOrInvalidMessage(message as global::Mediator.IMessage, nameof(message));
                    return default;
                }
            }
            
        }

        /// <summary>
        /// Create stream.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// Throws <see cref="global::Mediator.MissingMessageHandlerException"/> if no handler is registered.
        /// </summary>
        /// <param name="message">Incoming message</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Async enumerable</returns>
        public global::System.Collections.Generic.IAsyncEnumerable<object> CreateStream(
            object message,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            ThrowInvalidMessage(message as global::Mediator.IStreamMessage);
            return default;
            
        }

        /// <summary>
        /// Publish notification.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// </summary>
        /// <param name="notification">Incoming notification</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public global::System.Threading.Tasks.ValueTask Publish(
            object notification,
            global::System.Threading.CancellationToken cancellationToken = default
        )
        {
            return default;
            
        }


        /// <summary>
        /// Publish notification.
        /// Throws <see cref="global::System.ArgumentNullException"/> if message is null.
        /// </summary>
        /// <param name="notification">Incoming notification</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Awaitable task</returns>
        public global::System.Threading.Tasks.ValueTask Publish<TNotification>(
            TNotification notification,
            global::System.Threading.CancellationToken cancellationToken = default
        )
            where TNotification : global::Mediator.INotification
        {
            return default;
            
        }

        [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
        private static void ThrowInvalidMessage(object msg) =>
            throw new global::Mediator.MissingMessageHandlerException(msg);

        [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
        private static void ThrowArgumentNull(string paramName) =>
            throw new global::System.ArgumentNullException(paramName);

        private static void ThrowIfNull<T>(T argument, string paramName)
        {
            if (argument is null)
            {
                ThrowArgumentNull(paramName);
            }
        }

        [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
        private static void ThrowArgumentNullOrInvalidMessage(object msg, string paramName)
        {
            if (msg is null)
            {
                ThrowArgumentNull(paramName);
            }
            else
            {
                ThrowInvalidMessage(msg);
            }
        }

        [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
        private static void ThrowAggregateException(global::System.Collections.Generic.List<global::System.Exception> exceptions) =>
            throw new global::System.AggregateException(exceptions);

        private static void MaybeThrowAggregateException(global::System.Collections.Generic.List<global::System.Exception> exceptions)
        {
            if (exceptions != null)
            {
                ThrowAggregateException(exceptions);
            }
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mediator\src\MediatorDemo\obj\GX\Mediator.SourceGenerator.Roslyn40\Mediator.SourceGenerator.IncrementalMediatorGenerator\MediatorOptions.g.cs" label="MediatorOptions.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Generated by the Mediator source generator.
// </auto-generated>

namespace Mediator
{
    /// <summary>
    /// Provide options for the Mediator source generator.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    public sealed class MediatorOptions
    {
        /// <summary>
        /// The namespace in which the Mediator implementation is generated.
        /// </summary>
        public string Namespace { get; set; } = "Mediator";

        /// <summary>
        /// The default lifetime of the services registered in the DI container by
        /// the Mediator source generator.
        /// Singleton by default.
        /// </summary>
        public global::Microsoft.Extensions.DependencyInjection.ServiceLifetime ServiceLifetime { get; set; } =
            global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton;
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Mediator\src\MediatorDemo\obj\GX\Mediator.SourceGenerator.Roslyn40\Mediator.SourceGenerator.IncrementalMediatorGenerator\MediatorOptionsAttribute.g.cs" label="MediatorOptionsAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Generated by the Mediator source generator.
// </auto-generated>

namespace Mediator
{
    /// <summary>
    /// Provide options for the Mediator source generator.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Assembly, AllowMultiple = false)]
    [global::System.CodeDom.Compiler.GeneratedCode("Mediator.SourceGenerator", "2.1.0.0")]
    public sealed class MediatorOptionsAttribute : global::System.Attribute
    {
        /// <summary>
        /// The namespace in which the Mediator implementation is generated.
        /// </summary>
        public string Namespace { get; set; } = "Mediator";

        /// <summary>
        /// The default lifetime of the services registered in the DI container by
        /// the Mediator source generator.
        /// Singleton by default.
        /// </summary>
        public global::Microsoft.Extensions.DependencyInjection.ServiceLifetime ServiceLifetime { get; set; } =
            global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton;
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Mediator ](/sources/Mediator.zip)

:::


### Share Mediator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMediator&quote=Mediator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMediator&text=Mediator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMediator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMediator&title=Mediator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMediator&title=Mediator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMediator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Mediator

## In the same category (EnhancementProject)


### [BuildInfo](/docs/BuildInfo)


### [Com](/docs/Com)


### [CommandLine](/docs/CommandLine)


### [DeeDee](/docs/DeeDee)


### [RSCG_AMS](/docs/RSCG_AMS)


### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)


### [ThisAssembly](/docs/ThisAssembly)

