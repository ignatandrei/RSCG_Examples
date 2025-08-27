---
sidebar_position: 1630
title: 163 - TypedSignalR.Client
description: Creating typed Signal R clients
slug: /TypedSignalR.Client
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveSignalR.mdx';

# TypedSignalR.Client  by nenoNaninu


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/TypedSignalR.Client?label=TypedSignalR.Client)](https://www.nuget.org/packages/TypedSignalR.Client/)
[![GitHub last commit](https://img.shields.io/github/last-commit/nenoNaninu/TypedSignalR.Client?label=updated)](https://github.com/nenoNaninu/TypedSignalR.Client)
![GitHub Repo stars](https://img.shields.io/github/stars/nenoNaninu/TypedSignalR.Client?style=social)

## Details

### Info
:::info

Name: **TypedSignalR.Client**

C# Source Generator to create strongly typed SignalR Client.

Author: nenoNaninu

NuGet: 
*https://www.nuget.org/packages/TypedSignalR.Client/*   


You can find more details at https://github.com/nenoNaninu/TypedSignalR.Client

Source: https://github.com/nenoNaninu/TypedSignalR.Client

:::

### Original Readme
:::note

# TypedSignalR.Client

[![NuGet](https://img.shields.io/nuget/v/TypedSignalR.Client.svg)](https://www.nuget.org/packages/TypedSignalR.Client)
[![build-and-test](https://github.com/nenoNaninu/TypedSignalR.Client/actions/workflows/build-and-test.yaml/badge.svg?branch=master)](https://github.com/nenoNaninu/TypedSignalR.Client/actions/workflows/build-and-test.yaml)

C# [Source Generator](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) to create strongly typed SignalR clients.

## Table of Contents
- [Install](#install)
- [Why TypedSignalR.Client?](#why-typedsignalrclient)
- [API](#api)
- [Usage](#usage)
  - [Client](#client)
    - [Cancellation](#cancellation)
  - [Server](#server)
- [Recommendation](#recommendation)
  - [Sharing a Project](#sharing-a-project)
  - [Client Code Format](#client-code-format)
- [Streaming Support](#streaming-support)
- [Client Results Support](#client-results-support)
- [Compile-Time Error Support](#compile-time-error-support)
- [Generated Source Code](#generated-source-code)
- [Related Work](#related-work)

## Install
NuGet: [TypedSignalR.Client](https://www.nuget.org/packages/TypedSignalR.Client/)

```
dotnet add package Microsoft.AspNetCore.SignalR.Client
dotnet add package TypedSignalR.Client
```

## Why TypedSignalR.Client?
The ASP.NET Core SignalR C# client is not strongly typed.
To call a Hub (server-side) method, we must specify the method defined in Hub using a string.
We also have to determine the return type manually.
Moreover, registering client methods called from a server also requires specifying the method name as a string, and we must set parameter types manually.

```cs
// C# SignalR Client
// without TypedSignalR.Client

// Specify a hub method to invoke using string.
await connection.InvokeAsync("HubMethod1");

// Manually determine a return type.
// Parameters are cast to object type.
var guid = await connection.InvokeAsync<Guid>("HubMethod2", "message", 99);

// Registering a client method requires a string, and parameter types must be set manually.
var subscription = connection.On<string, DateTime>("ClientMethod", (message, dateTime) => {});
```

These are very painful and cause bugs easily.
Moreover, if we change the code on the server-side, the modification on the client-side becomes very troublesome. 
The leading cause of the problems is that they are not strongly typed.

TypedSignalR.Client aims to generate strongly typed SignalR clients using interfaces in which the server and client methods are defined. 
Defining interfaces is helpful not only for the client-side but also for the server-side.
See [Usage](#usage) section for details.

```cs
// C# SignalR Client
// with TypedSignalR.Client

// First, create a hub proxy.
IHub hubProxy = connection.CreateHubProxy<IHub>();

// Invoke a hub method through hub proxy.
// We no longer need to specify the method using a string.
await hubProxy.HubMethod1();

// Both parameters and return types are strongly typed.
var guid = await hubProxy.HubMethod2("message", 99);

// Client method registration is also strongly typed, so it's safe and easy.
var subscription = connection.Register<IReceiver>(new Receiver());

// Defining interfaces are useful not only for the client-side but also for the server-side.
// See Usage in this README.md for details.
interface IHub
{
    Task HubMethod1();
    Task<Guid> HubMethod2(string message, int value);
}

interface IReceiver
{
    Task ClientMethod(string message, DateTime dateTime);
}

class Receiver : IReceiver
{
    // implementation
}
```

## API
This Source Generator provides two extension methods and one interface. 

```cs
static class HubConnectionExtensions
{
    THub CreateHubProxy<THub>(this HubConnection connection, CancellationToken cancellationToken = default){...}
    IDisposable Register<TReceiver>(this HubConnection connection, TReceiver receiver){...}
}

// An interface for observing SignalR events.
interface IHubConnectionObserver
{
    Task OnClosed(Exception? exception);
    Task OnReconnected(string? connectionId);
    Task OnReconnecting(Exception? exception);
}
```

Use it as follows. 

```cs
HubConnection connection = ...;

IHub hub = connection.CreateHubProxy<IHub>();
IDisposable subscription = connection.Register<IReceiver>(new Receiver());
```

## Usage
For example, we have the following interface defined.

```cs
public class UserDefinedType
{
    public Guid Id { get; set; }
    public DateTime Datetime { get; set; }
}

// The return type of methods on the client-side must be Task. 
public interface IClientContract
{
    // Of course, user defined type is OK. 
    Task ClientMethod1(string user, string message, UserDefinedType userDefine);
    Task ClientMethod2();
}

// The return type of methods on the hub-side must be Task or Task<T>. 
public interface IHubContract
{
    Task<string> HubMethod1(string user, string message);
    Task HubMethod2();
}

class Receiver1 : IClientContract
{
    // implementation
}

class Receiver2 : IClientContract, IHubConnectionObserver
{
    // implementation
}
```

### Client
It's very easy to use. 

```cs
HubConnection connection = ...;

var hub = connection.CreateHubProxy<IHubContract>();
var subscription1 = connection.Register<IClientContract>(new Receiver1());

// When an instance of a class that implements IHubConnectionObserver is registered (Receiver2 in this case), 
// the method defined in IHubConnectionObserver is automatically registered regardless of the type argument. 
var subscription2 = connection.Register<IClientContract>(new Receiver2());

// Invoke hub methods
hub.HubMethod1("user", "message");

// Unregister the receiver
subscription.Dispose();
```

#### Cancellation
In ASP.NET Core SignalR, `CancellationToken` is passed for each invoke.

On the other hand, in TypedSignalR.Client, `CancellationToken` is passed only once when creating a hub proxy.
The passed `CancelationToken` will be used for each invoke internally.

```cs
var cts = new CancellationTokenSource();

// The following two are equivalent.

// 1: ASP.NET Core SignalR Client
var ret =  await connection.InvokeAsync<string>("HubMethod1", "user", "message", cts.Token);
await connection.InvokeAsync("HubMethod2", cts.Token);

// 2: TypedSignalR.Client
var hubProxy = connection.CreateHubProxy<IHubContract>(cts.Token);
var ret = await hubProxy.HubMethod1("user", "message");
await hubProxy.HubMethod2();
```

### Server
Using the interface definitions, we can write as follows on the server-side (ASP.NET Core). 
TypedSignalR.Client is not necessary.

```cs
using Microsoft.AspNetCore.SignalR;

public class SomeHub : Hub<IClientContract>, IHubContract
{
    public async Task<string> HubMethod1(string user, string message)
    {
        var instance = new UserDefinedType()
        {
            Id = Guid.NewGuid(),
            DateTime = DateTime.Now,
        };

        // broadcast
        await this.Clients.All.ClientMethod1(user, message, instance);
        return "OK!";
    }

    public async Task HubMethod2()
    {
        await this.Clients.Caller.ClientMethod2();
    }
}
```

## Recommendation
### Sharing a Project
I recommend that these interfaces be shared between the client-side and server-side project, for example, by project references.

```
server.csproj --> shared.csproj <-- client.csproj
```

### Client Code Format
It is easier to handle if we write client code in the following format.

```cs
class Client : IReceiver, IHubConnectionObserver, IDisposable
{
    private readonly IHub _hubProxy;
    private readonly IDisposable _subscription;
    private readonly CancellationTokenSource _cancellationTokenSource = new();

    public Client(HubConnection connection)
    {
        _hubProxy = connection.CreateHubProxy<IHub>(_cancellationTokenSource.Token);
        _subscription = connection.Register<IReceiver>(this);
    }

    // implementation
}
```

## Streaming Support

SignalR supports both [server-to-client streaming and client-to-server streaming](https://docs.microsoft.com/en-us/aspnet/core/signalr/streaming?view=aspnetcore-6.0).

TypedSignalR.Client supports both server-to-client streaming and client-to-server streaming.
If you use `IAsyncEnumerable<T>`, `Task<IAsyncEnumerable<T>>`, or `Task<ChannelReader<T>>` for the method return type, it is analyzed as server-to-client streaming.
And if `IAsyncEnumerable<T>` or `ChannelReader<T>` is used in the method parameter, it is analyzed as client-to-server streaming.

When using server-to-client streaming, a single `CancellationToken` can be used as a method parameter (Note: `CancellationToken` cannot be used as a parameter except for server-to-client streaming).

## Client Results Support

.NET 7 and later, you can use [client results](https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs?view=aspnetcore-7.0#client-results).

TypedSignalR.Client supports client results.
If you use `Task<T>` for the method return type in the receiver interface, you can use client results.

## Compile-Time Error Support
This library has some restrictions, including those that come from server-side implementations.

- Type argument of the `CreateHubProxy/Register` method must be an interface.
- Only method definitions are allowed in the interface used for `CreateHubProxy/Register`.
  - It is forbidden to define properties and events.
- The return type of the method in the interface used for `CreateHubProxy` must be `Task` or `Task<T>`.
- The return type of the method in the interface used for `Register` must be `Task`.

It is complicated for humans to comply with these restrictions properly.
So, this library looks for parts that do not follow the restriction and report detailed errors at compile time. 
Therefore, no runtime error occurs. 

![compile-time-error](https://user-images.githubusercontent.com/27144255/155505022-0a13bf1b-643c-472c-882e-8508e52c2b63.png)

## Generated Source Code
TypedSignalR.Client checks the type argument of a methods `CreateHubProxy` and `Register` and generates source code.
Generated source code can be seen in Visual Studio. 

![generated-code-visible-from-solution-explorer](https://user-images.githubusercontent.com/27144255/154827948-dca0b9b1-0a1b-4833-8b32-3d5ceaa41414.png)

## Related Work
- [nenoNaninu/TypedSignalR.Client.TypeScript](https://github.com/nenoNaninu/TypedSignalR.Client.TypeScript)
  - TypeScript source generator to provide strongly typed SignalR clients by analyzing C# type definitions.
- [nenoNaninu/TypedSignalR.Client.DevTools](https://github.com/nenoNaninu/TypedSignalR.Client.DevTools)
  - SignalR development tools inspired by SwaggerUI.
- [nenoNaninu/AspNetCore.SignalR.OpenTelemetry](https://github.com/nenoNaninu/AspNetCore.SignalR.OpenTelemetry)
  - SignalR instrumentation library for OpenTelemetry.


:::

### About
:::note

Creating typed Signal R clients


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TypedSignalR.Client**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Microsoft.AspNetCore.SignalR.Client" Version="6.0.1" />
		<PackageReference Include="TypedSignalR.Client" Version="3.6.0">
		  <PrivateAssets>all</PrivateAssets>
		  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
	</ItemGroup>

	<ItemGroup>
	  <ProjectReference Include="..\TestSignalRCommon\TestSignalRCommon.csproj" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedSignalR.Client\src\TestSignalRConsole\Program.cs" label="Program.cs" >

  This is the use of **TypedSignalR.Client** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.SignalR.Client;
using TestSignalRCommon;
using TestSignalRConsole;

Console.WriteLine("Hello, World!");
await Task.Delay(5_000);
HubConnection _connection = new HubConnectionBuilder()
    .WithUrl("https://localhost:7302/ChatHub")
    .Build();
await _connection.StartAsync();

_connection.On<string, string>("ReceiveMessage", (user, message) =>
{
    Console.WriteLine($" from not typed {user}: {message}");
});

await Task.Delay(30_000);
var h = TypedSignalR.Client.HubConnectionExtensions.CreateHubProxy<IHubMessage>(_connection);
await h.SendMessage("console", "message");
//TypedSignalR.Client.HubConnectionExtensions.Register<IHubMessage>(_connection,new ReceiverMessage());

Console.WriteLine("waiting for messages from Windows App");
var message = Console.ReadLine();



```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedSignalR.Client\src\TestSignalRConsole\obj\GX\TypedSignalR.Client\TypedSignalR.Client.SourceGenerator\TypedSignalR.Client.Components.Generated.cs" label="TypedSignalR.Client.Components.Generated.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY TypedSignalR.Client
// </auto-generated>
#nullable enable
#pragma warning disable CS1591
namespace TypedSignalR.Client
{
    internal interface IHubConnectionObserver
    {
        global::System.Threading.Tasks.Task OnClosed(global::System.Exception? exception);
        global::System.Threading.Tasks.Task OnReconnected(string? connectionId);
        global::System.Threading.Tasks.Task OnReconnecting(global::System.Exception? exception);
    }

    internal interface IHubInvoker
    {
    }

    internal interface IHubInvokerFactory
    {
    }

    internal interface IHubInvokerFactory<out T> : IHubInvokerFactory
    {
        T CreateHubInvoker(global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, global::System.Threading.CancellationToken cancellationToken);
    }

    internal interface IReceiverBinder
    {
    }

    internal interface IReceiverBinder<in T> : IReceiverBinder
    {
        global::System.IDisposable Bind(global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, T receiver);
    }
}
#pragma warning restore CS1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedSignalR.Client\src\TestSignalRConsole\obj\GX\TypedSignalR.Client\TypedSignalR.Client.SourceGenerator\TypedSignalR.Client.HubConnectionExtensions.Binder.Generated.cs" label="TypedSignalR.Client.HubConnectionExtensions.Binder.Generated.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY TypedSignalR.Client
// </auto-generated>
#nullable enable
#pragma warning disable CS1591
#pragma warning disable CS8767
#pragma warning disable CS8613
namespace TypedSignalR.Client
{
    internal static partial class HubConnectionExtensions
    {
        private static partial global::System.Collections.Generic.Dictionary<global::System.Type, IReceiverBinder> CreateBinders()
        {
            var binders = new global::System.Collections.Generic.Dictionary<global::System.Type, IReceiverBinder>();


            return binders;
        }
    }
}
#pragma warning restore CS8613
#pragma warning restore CS8767
#pragma warning restore CS1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedSignalR.Client\src\TestSignalRConsole\obj\GX\TypedSignalR.Client\TypedSignalR.Client.SourceGenerator\TypedSignalR.Client.HubConnectionExtensions.Generated.cs" label="TypedSignalR.Client.HubConnectionExtensions.Generated.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY TypedSignalR.Client
// </auto-generated>
#nullable enable
#pragma warning disable CS1591
namespace TypedSignalR.Client
{
    internal static partial class HubConnectionExtensions
    {
        public static THub CreateHubProxy<THub>(this global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, global::System.Threading.CancellationToken cancellationToken = default)
        {
            var factory = HubInvokerFactoryProvider.GetHubInvokerFactory<THub>();

            if (factory is null)
            {
                throw new global::System.InvalidOperationException($"Failed to create a hub proxy. TypedSignalR.Client did not generate source code to create a hub proxy, which type is {typeof(THub)}.");
            }

            return factory.CreateHubInvoker(connection, cancellationToken);
        }

        public static global::System.IDisposable Register<TReceiver>(this global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, TReceiver receiver)
        {
            if (receiver is null)
            {
                throw new global::System.ArgumentNullException(nameof(receiver));
            }

            if (typeof(TReceiver) == typeof(IHubConnectionObserver))
            {
                return new HubConnectionObserverSubscription(connection, (IHubConnectionObserver)receiver);
            }

            var binder = ReceiverBinderProvider.GetReceiverBinder<TReceiver>();

            if (binder is null)
            {
                throw new global::System.InvalidOperationException($"Failed to register a receiver. TypedSignalR.Client did not generate source code to register a receiver, which type is {typeof(TReceiver)}.");
            }

            var subscription = binder.Bind(connection, receiver);

            if (receiver is IHubConnectionObserver hubConnectionObserver)
            {
                subscription = new CompositeDisposable(new[] { subscription, new HubConnectionObserverSubscription(connection, hubConnectionObserver) });
            }

            return subscription;
        }
    }

    internal static partial class HubConnectionExtensions
    {
        private static partial global::System.Collections.Generic.Dictionary<global::System.Type, IHubInvokerFactory> CreateFactories();
        private static partial global::System.Collections.Generic.Dictionary<global::System.Type, IReceiverBinder> CreateBinders();

        private static class HubInvokerFactoryProvider
        {
            private static readonly global::System.Collections.Generic.Dictionary<global::System.Type, IHubInvokerFactory> Factories;

            static HubInvokerFactoryProvider()
            {
                Factories = CreateFactories();
            }

            public static IHubInvokerFactory<T>? GetHubInvokerFactory<T>()
            {
                return Cache<T>.HubInvokerFactory;
            }

            private static class Cache<T>
            {
                public static readonly IHubInvokerFactory<T>? HubInvokerFactory = default;

                static Cache()
                {
                    if (Factories.TryGetValue(typeof(T), out var hubInvokerFactory))
                    {
                        HubInvokerFactory = hubInvokerFactory as IHubInvokerFactory<T>;
                    }
                }
            }
        }

        private static class ReceiverBinderProvider
        {
            private static readonly global::System.Collections.Generic.Dictionary<global::System.Type, IReceiverBinder> Binders;

            static ReceiverBinderProvider()
            {
                Binders = CreateBinders();
            }

            public static IReceiverBinder<T>? GetReceiverBinder<T>()
            {
                return Cache<T>.ReceiverBinder;
            }

            private static class Cache<T>
            {
                public static readonly IReceiverBinder<T>? ReceiverBinder = default;

                static Cache()
                {
                    if (Binders.TryGetValue(typeof(T), out var receiverBinder))
                    {
                        ReceiverBinder = receiverBinder as IReceiverBinder<T>;
                    }
                }
            }
        }

        private sealed class HubConnectionObserverSubscription : global::System.IDisposable
        {
            private readonly global::Microsoft.AspNetCore.SignalR.Client.HubConnection _connection;
            private readonly IHubConnectionObserver _hubConnectionObserver;

            private int _disposed = 0;

            public HubConnectionObserverSubscription(global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, IHubConnectionObserver hubConnectionObserver)
            {
                _connection = connection;
                _hubConnectionObserver = hubConnectionObserver;

                _connection.Closed += hubConnectionObserver.OnClosed;
                _connection.Reconnected += hubConnectionObserver.OnReconnected;
                _connection.Reconnecting += hubConnectionObserver.OnReconnecting;
            }

            public void Dispose()
            {
                if (global::System.Threading.Interlocked.Exchange(ref _disposed, 1) == 0)
                {
                    _connection.Closed -= _hubConnectionObserver.OnClosed;
                    _connection.Reconnected -= _hubConnectionObserver.OnReconnected;
                    _connection.Reconnecting -= _hubConnectionObserver.OnReconnecting;
                }
            }
        }

        private sealed class CompositeDisposable : global::System.IDisposable
        {
            private readonly object _gate = new object();
            private readonly global::System.Collections.Generic.List<global::System.IDisposable> _disposables;

            private bool _disposed;

            public CompositeDisposable()
            {
                _disposables = new global::System.Collections.Generic.List<global::System.IDisposable>();
            }

            public CompositeDisposable(global::System.IDisposable[] disposables)
            {
                _disposables = new global::System.Collections.Generic.List<global::System.IDisposable>(disposables);
            }

            public CompositeDisposable(int capacity)
            {
                if (capacity < 0)
                {
                    throw new global::System.ArgumentOutOfRangeException(nameof(capacity));
                }

                _disposables = new global::System.Collections.Generic.List<global::System.IDisposable>(capacity);
            }

            public void Add(global::System.IDisposable item)
            {
                bool shouldDispose = false;

                lock (_gate)
                {
                    shouldDispose = _disposed;

                    if (!_disposed)
                    {
                        _disposables.Add(item);
                    }
                }

                if (shouldDispose)
                {
                    item.Dispose();
                }
            }

            public void Dispose()
            {
                var currentDisposables = default(global::System.Collections.Generic.List<global::System.IDisposable>);

                lock (_gate)
                {
                    if (_disposed)
                    {
                        return;
                    }

                    _disposed = true;
                    currentDisposables = _disposables;
                }

                foreach (var item in currentDisposables)
                {
                    if (item is not null)
                    {
                        item.Dispose();
                    }
                }

                currentDisposables.Clear();
            }
        }

        // It is not possible to avoid boxing.
        // This is a limitation caused by the SignalR implementation.
        private static class HandlerConverter
        {
            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert(global::System.Func<global::System.Threading.Tasks.Task> handler)
            {
                return args => handler();
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1>(global::System.Func<T1, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2>(global::System.Func<T1, T2, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3>(global::System.Func<T1, T2, T3, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4>(global::System.Func<T1, T2, T3, T4, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5>(global::System.Func<T1, T2, T3, T4, T5, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6>(global::System.Func<T1, T2, T3, T4, T5, T6, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, (T15)args[14]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, (T15)args[14]!, (T16)args[15]!);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert(global::System.Func<global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler(default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1>(global::System.Func<T1, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2>(global::System.Func<T1, T2, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3>(global::System.Func<T1, T2, T3, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4>(global::System.Func<T1, T2, T3, T4, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5>(global::System.Func<T1, T2, T3, T4, T5, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6>(global::System.Func<T1, T2, T3, T4, T5, T6, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> handler)
            {
                return args => handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, (T15)args[14]!, default);
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<TResult>(global::System.Func<global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler().ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, TResult>(global::System.Func<T1, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, TResult>(global::System.Func<T1, T2, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, TResult>(global::System.Func<T1, T2, T3, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, TResult>(global::System.Func<T1, T2, T3, T4, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, TResult>(global::System.Func<T1, T2, T3, T4, T5, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, (T15)args[14]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, (T15)args[14]!, (T16)args[15]!).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<TResult>(global::System.Func<global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler(default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, TResult>(global::System.Func<T1, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, TResult>(global::System.Func<T1, T2, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, TResult>(global::System.Func<T1, T2, T3, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, TResult>(global::System.Func<T1, T2, T3, T4, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, TResult>(global::System.Func<T1, T2, T3, T4, T5, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, default).ConfigureAwait(false);
                    return result;
                };
            }

            public static global::System.Func<object?[], global::System.Threading.Tasks.Task<TResult>> Convert<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, TResult>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TResult>> handler)
            {
                return async args =>
                {
                    var result = await handler((T1)args[0]!, (T2)args[1]!, (T3)args[2]!, (T4)args[3]!, (T5)args[4]!, (T6)args[5]!, (T7)args[6]!, (T8)args[7]!, (T9)args[8]!, (T10)args[9]!, (T11)args[10]!, (T12)args[11]!, (T13)args[12]!, (T14)args[13]!, (T15)args[14]!, default).ConfigureAwait(false);
                    return result;
                };
            }
        }
    }
}
#pragma warning restore CS1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedSignalR.Client\src\TestSignalRConsole\obj\GX\TypedSignalR.Client\TypedSignalR.Client.SourceGenerator\TypedSignalR.Client.HubConnectionExtensions.HubInvoker.Generated.cs" label="TypedSignalR.Client.HubConnectionExtensions.HubInvoker.Generated.cs" >


```csharp showLineNumbers 
// <auto-generated>
// THIS (.cs) FILE IS GENERATED BY TypedSignalR.Client
// </auto-generated>
#nullable enable
#pragma warning disable CS1591
#pragma warning disable CS8767
#pragma warning disable CS8613
namespace TypedSignalR.Client
{
    internal static partial class HubConnectionExtensions
    {
        private sealed class HubInvokerFor_global__TestSignalRCommon_IHubMessage : global::TestSignalRCommon.IHubMessage, IHubInvoker
        {
            private readonly global::Microsoft.AspNetCore.SignalR.Client.HubConnection _connection;
            private readonly global::System.Threading.CancellationToken _cancellationToken;

            public HubInvokerFor_global__TestSignalRCommon_IHubMessage(global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, global::System.Threading.CancellationToken cancellationToken)
            {
                _connection = connection;
                _cancellationToken = cancellationToken;
            }

            public global::System.Threading.Tasks.Task SendMessage(string user, string message)
            {
                return global::Microsoft.AspNetCore.SignalR.Client.HubConnectionExtensions.InvokeCoreAsync(_connection, nameof(SendMessage), new object?[] { user, message }, _cancellationToken);
            }
        }

        private sealed class HubInvokerFactoryFor_global__TestSignalRCommon_IHubMessage : IHubInvokerFactory<global::TestSignalRCommon.IHubMessage>
        {
            public global::TestSignalRCommon.IHubMessage CreateHubInvoker(global::Microsoft.AspNetCore.SignalR.Client.HubConnection connection, global::System.Threading.CancellationToken cancellationToken)
            {
                return new HubInvokerFor_global__TestSignalRCommon_IHubMessage(connection, cancellationToken);
            }
        }

        private static partial global::System.Collections.Generic.Dictionary<global::System.Type, IHubInvokerFactory> CreateFactories()
        {
            var factories = new global::System.Collections.Generic.Dictionary<global::System.Type, IHubInvokerFactory>();

            factories.Add(typeof(global::TestSignalRCommon.IHubMessage), new HubInvokerFactoryFor_global__TestSignalRCommon_IHubMessage());

            return factories;
        }
    }
}
#pragma warning restore CS8613
#pragma warning restore CS8767
#pragma warning restore CS1591

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project TypedSignalR.Client ](/sources/TypedSignalR.Client.zip)

:::


### Share TypedSignalR.Client 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedSignalR.Client&quote=TypedSignalR.Client" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedSignalR.Client&text=TypedSignalR.Client:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedSignalR.Client" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedSignalR.Client&title=TypedSignalR.Client" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedSignalR.Client&title=TypedSignalR.Client&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedSignalR.Client" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TypedSignalR.Client

aaa
<SameCategory />

