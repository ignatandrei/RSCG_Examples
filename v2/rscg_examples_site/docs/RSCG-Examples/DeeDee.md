---
sidebar_position: 350
title: 35 - DeeDee
description: Mediatr generated data
slug: /DeeDee
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# DeeDee  by joh-pot


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/DeeDee?label=DeeDee)](https://www.nuget.org/packages/DeeDee/)
[![GitHub last commit](https://img.shields.io/github/last-commit/joh-pot/DeeDee?label=updated)](https://github.com/joh-pot/DeeDee/)
![GitHub Repo stars](https://img.shields.io/github/stars/joh-pot/DeeDee?style=social)

## Details

### Info
:::info

Name: **DeeDee**

Mediator pattern using source generation for .NET

Author: joh-pot

NuGet: 
*https://www.nuget.org/packages/DeeDee/*   


You can find more details at https://github.com/joh-pot/DeeDee/

Source : https://github.com/joh-pot/DeeDee/

:::

### Original Readme
:::note

# DeeDee
Mediator using source generation for .NET

Send in-process commands/queries to handlers either sync or async. The mechanism for sending is generated during compile time as overloads based on your code.

# Installation
Nuget Package manager>`Install-Package DeeDee`

See [wiki](https://github.com/joh-pot/DeeDee/wiki) for full details


:::

### About
:::note

Mediatr generated data


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DeeDee**
```xml showLineNumbers {14}
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
		<PackageReference Include="DeeDee" Version="2.0.0" />
		<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />
		
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DeeDee\src\MediatorDemo\Program.cs" label="Program.cs" >

  This is the use of **DeeDee** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine("Hello, World!");
ServiceCollection services = new ();
DeeDeeDemo.DeeDee.Generated.IocExtensions.AddDispatcher(services);

services.AddSingleton(typeof(IPipelineAction<Ping, Pong>), typeof(GenericLoggerHandler)); // This will run 1st

var serviceProvider = services.BuildServiceProvider();

var mediator = serviceProvider.GetRequiredService<DeeDeeDemo.DeeDee.Generated.Models.IDispatcher>();
var id = Guid.NewGuid();
var request = new Ping(id);

var response = mediator.Send(request);

Console.WriteLine("-----------------------------------");
Console.WriteLine("ID: " + id);
Console.WriteLine(request);
Console.WriteLine(response);


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DeeDee\src\MediatorDemo\PingPong.cs" label="PingPong.cs" >

  This is the use of **DeeDee** in *PingPong.cs*

```csharp showLineNumbers 
public sealed record Ping(Guid Id) : IRequest<Pong>;

public sealed record Pong(Guid Id);


public sealed class PingHandler : IPipelineAction<Ping, Pong>
{

    public Pong Invoke(Ping request, ref PipelineContext<Pong> context, Next<Pong> next)
    {
        Console.WriteLine("4) Returning pong!");
        return new Pong(request.Id);
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DeeDee\src\MediatorDemo\GenericLoggerHandler.cs" label="GenericLoggerHandler.cs" >

  This is the use of **DeeDee** in *GenericLoggerHandler.cs*

```csharp showLineNumbers 
public sealed class GenericLoggerHandler : IPipelineAction<Ping, Pong>
{
    public Pong Invoke(Ping request, ref PipelineContext<Pong> context, Next<Pong> next)
    {
        Console.WriteLine("1) Running logger handler");
        try
        {
            var response = next(request , ref context);
            Console.WriteLine("5) No error!");
            return response;
        }
        catch (Exception ex)
        {
            Console.WriteLine("error:" + ex.Message);
            throw;
        }
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DeeDee\src\MediatorDemo\obj\GX\DeeDee\DeeDee.SourceGenerator\Dispatcher.cs" label="Dispatcher.cs" >


```csharp showLineNumbers 
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using DeeDee.Models;
using ServiceProvider = DeeDee.Models.ServiceProvider;

namespace DeeDeeDemo.DeeDee.Generated.Models
{
    public class Dispatcher : IDispatcher
    {
        private readonly ServiceProvider _serviceFactory;
        private readonly Lazy<Next<Pong>> _Ping_Pong_lazy;
        public Dispatcher(ServiceProvider service)
        {
            _serviceFactory = service;
            _Ping_Pong_lazy = new Lazy<Next<Pong>>(Build<Ping, Pong>);
        }

        public Pong Send(Ping request)
        {
            var context = new PipelineContext<Pong>();
            Next<Pong> builtPipeline = _Ping_Pong_lazy.Value;
            return builtPipeline(request, ref context);
        }

        private NextAsync BuildAsync<TRequest>()
            where TRequest : IRequest
        {
            {
                var actions = _serviceFactory.GetServices<IPipelineActionAsync<TRequest>>();
                var builtPipeline = actions.Aggregate((NextAsync)((req, ctx, tkn) => Task.CompletedTask), (next, pipeline) => (req, ctx, tkn) => pipeline.InvokeAsync((TRequest)req, ctx, next, tkn));
                return builtPipeline;
            }
        }

        private Next Build<TRequest>()
            where TRequest : IRequest
        {
            {
                var actions = _serviceFactory.GetServices<IPipelineAction<TRequest>>();
                var builtPipeline = actions.Aggregate((Next)((IRequest req, ref PipelineContext ctx) =>
                {
                    {
                    }
                }), (next, pipeline) => (IRequest req, ref PipelineContext ctx) => pipeline.Invoke((TRequest)req, ref ctx, next));
                return builtPipeline;
            }
        }

        private NextAsync<TResponse> BuildAsync<TRequest, TResponse>()
            where TRequest : IRequest<TResponse>
        {
            {
                var actions = _serviceFactory.GetServices<IPipelineActionAsync<TRequest, TResponse>>();
                var builtPipeline = actions.Aggregate((NextAsync<TResponse>)((req, ctx, tkn) => Task.FromResult(ctx.Result)), (next, pipeline) => (req, ctx, tkn) => pipeline.InvokeAsync((TRequest)req, ctx, next, tkn));
                return builtPipeline;
            }
        }

        private Next<TResponse> Build<TRequest, TResponse>()
            where TRequest : IRequest<TResponse>
        {
            {
                var actions = _serviceFactory.GetServices<IPipelineAction<TRequest, TResponse>>();
                var builtPipeline = actions.Aggregate((Next<TResponse>)((IRequest<TResponse> req, ref PipelineContext<TResponse> ctx) => ctx.Result), (next, pipeline) => (IRequest<TResponse> req, ref PipelineContext<TResponse> ctx) => pipeline.Invoke((TRequest)req, ref ctx, next));
                return builtPipeline;
            }
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DeeDee\src\MediatorDemo\obj\GX\DeeDee\DeeDee.SourceGenerator\IDispatcher.cs" label="IDispatcher.cs" >


```csharp showLineNumbers 
using System;
using System.Threading;
using System.Threading.Tasks;
using DeeDee.Models;

namespace DeeDeeDemo.DeeDee.Generated.Models
{
    public interface IDispatcher
    {
        public Pong Send(Ping request);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DeeDee\src\MediatorDemo\obj\GX\DeeDee\DeeDee.SourceGenerator\IocExtensions.cs" label="IocExtensions.cs" >


```csharp showLineNumbers 

            using System;
            using System.Linq;
            using System.Reflection;
            using DeeDee.Models;
            using DeeDeeDemo.DeeDee.Generated.Models;
            using Microsoft.Extensions.DependencyInjection;
            using ServiceProvider = DeeDee.Models.ServiceProvider;
            namespace DeeDeeDemo.DeeDee.Generated

            {
                internal static class IocExtensions
                {
                    public static IServiceCollection AddDispatcher(this IServiceCollection services, Lifetime lifetime = Lifetime.Singleton)
                    {
                        switch(lifetime)
                        {
                            case Lifetime.Singleton:
                                services.AddSingleton<IDispatcher, Dispatcher>();
                                services.AddSingleton<ServiceProvider>(ctx => ctx.GetRequiredService);
                                break;

                            case Lifetime.Scoped:
                                services.AddScoped<IDispatcher, Dispatcher>();
                                services.AddScoped<ServiceProvider>(ctx => ctx.GetRequiredService);
                                break;

                            case Lifetime.Transient:
                                services.AddTransient<IDispatcher, Dispatcher>();
                                services.AddTransient<ServiceProvider>(ctx => ctx.GetRequiredService);
                                break;
                        }
                        
                        RegisterPipelineActions(services);
                        
                        return services;
                    }

                    private static void RegisterPipelineActions(IServiceCollection services)
                    {
                        var pipelineTypes = AppDomain
                            .CurrentDomain
                            .GetAssemblies()
                            .SelectMany
                            (
                                a => a.GetTypes().Where
                                (
                                   x => !x.IsInterface &&
                                        !x.IsAbstract &&
                                        x.GetInterfaces()
                                            .Any
                                            (
                                                y => y.Name.Equals(typeof(IPipelineActionAsync<,>).Name,
                                                         StringComparison.InvariantCulture) ||
                                                     y.Name.Equals(typeof(IPipelineActionAsync<>).Name,
                                                         StringComparison.InvariantCulture) ||
                                                     y.Name.Equals(typeof(IPipelineAction<>).Name,
                                                         StringComparison.InvariantCulture) ||
                                                     y.Name.Equals(typeof(IPipelineAction<,>).Name, StringComparison.InvariantCulture)
                                            )
                                ).GroupBy(type => type.GetInterfaces()[0]).SelectMany(g => g.OrderByDescending(s => s.GetCustomAttribute<StepAttribute>()?.Order))
                            );

                        foreach (var type in pipelineTypes)
                        {
                            foreach (var implementedInterface in type.GetInterfaces())
                            {
                                var bindAs = type.GetCustomAttribute<BindAsAttribute>();
                                switch (bindAs?.Lifetime)
                                {
                                    case Lifetime.Singleton:
                                        services.AddSingleton(implementedInterface, type);
                                        break;
                                    case Lifetime.Scoped:
                                        services.AddScoped(implementedInterface, type);
                                        break;  
                                    case Lifetime.Transient:
                                        services.AddTransient(implementedInterface, type);
                                        break;
                                    default:
                                        services.AddSingleton(implementedInterface, type);
                                        break;
                                }
                                
                            }
                        } 
                    }
                }
            }
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project DeeDee ](/sources/DeeDee.zip)

:::


### Share DeeDee 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDeeDee&quote=DeeDee" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDeeDee&text=DeeDee:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDeeDee" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDeeDee&title=DeeDee" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDeeDee&title=DeeDee&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDeeDee" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DeeDee

### In the same category (EnhancementProject) - 17 other generators


#### [AutoInvoke.Generator](/docs/AutoInvoke.Generator)


#### [AutoSpectre](/docs/AutoSpectre)


#### [BuildInfo](/docs/BuildInfo)


#### [Com](/docs/Com)


#### [CommandLine](/docs/CommandLine)


#### [LinqGen.Generator](/docs/LinqGen.Generator)


#### [Mediator](/docs/Mediator)


#### [Pekspro.BuildInformationGenerator](/docs/Pekspro.BuildInformationGenerator)


#### [PlantUmlClassDiagramGenerator](/docs/PlantUmlClassDiagramGenerator)


#### [RSCG_AMS](/docs/RSCG_AMS)


#### [RSCG_ExportDiagram](/docs/RSCG_ExportDiagram)


#### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


#### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


#### [RSCG_Wait](/docs/RSCG_Wait)


#### [ThisAssembly](/docs/ThisAssembly)


#### [ThisAssembly.Constants](/docs/ThisAssembly.Constants)


#### [ThisAssembly.Metadata](/docs/ThisAssembly.Metadata)

