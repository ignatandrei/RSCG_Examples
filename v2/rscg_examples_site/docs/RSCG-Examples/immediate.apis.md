---
sidebar_position: 1920
title: 192 - immediate.apis
description: Defining APIs in classes instead of  in minimal API or controllers
slug: /immediate.apis
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# immediate.apis  by Stuart Turner


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/immediate.apis?label=immediate.apis)](https://www.nuget.org/packages/immediate.apis/)
[![GitHub last commit](https://img.shields.io/github/last-commit/immediateplatform/immediate.apis?label=updated)](https://github.com/immediateplatform/immediate.apis)
![GitHub Repo stars](https://img.shields.io/github/stars/immediateplatform/immediate.apis?style=social)

## Details

### Info
:::info

Name: **immediate.apis**

An implementation of the mediator pattern in .NET using source-generation.

Author: Stuart Turner

NuGet: 
*https://www.nuget.org/packages/immediate.apis/*   


You can find more details at https://github.com/immediateplatform/immediate.apis

Source: https://github.com/immediateplatform/immediate.apis

:::

### Original Readme
:::note

# Immediate.Apis

[![NuGet](https://img.shields.io/nuget/v/Immediate.Apis.svg?style=plastic)](https://www.nuget.org/packages/Immediate.Apis/)
[![GitHub release](https://img.shields.io/github/release/viceroypenguin/Immediate.Apis.svg)](https://GitHub.com/viceroypenguin/Immediate.Apis/releases/)
[![GitHub license](https://img.shields.io/github/license/viceroypenguin/Immediate.Apis.svg)](https://github.com/viceroypenguin/Immediate.Apis/blob/master/license.txt) 
[![GitHub issues](https://img.shields.io/github/issues/viceroypenguin/Immediate.Apis.svg)](https://GitHub.com/viceroypenguin/Immediate.Apis/issues/) 
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/viceroypenguin/Immediate.Apis.svg)](https://GitHub.com/viceroypenguin/Immediate.Apis/issues?q=is%3Aissue+is%3Aclosed) 
[![GitHub Actions](https://github.com/viceroypenguin/Immediate.Apis/actions/workflows/build.yml/badge.svg)](https://github.com/viceroypenguin/Immediate.Apis/actions)
---

Immediate.Apis is a source generator for minimal APIs, for
[`Immediate.Handlers`](https://github.com/viceroypenguin/Immediate.Handlers) handlers. Simply add a `[MapGet]` to the
`[Handler]` class and an endpoint will automatically be added.

#### Examples
* [Immediate.Apis.FunctionalTests](https://github.com/immediateplatform/immediate.apis/tests/Immediate.Apis.FunctionalTests)

## Installing Immediate.Apis

You can install [Immediate.Apis with NuGet](https://www.nuget.org/packages/Immediate.Apis):

    Install-Package Immediate.Apis
    
Or via the .NET Core command line interface:

    dotnet add package Immediate.Apis

Either commands, from Package Manager Console or .NET Core CLI, will download and install Immediate.Handlers.

## Using Immediate.Apis
### Creating an Endpoint

Create a Handler and an endpoint by adding the following code:

```cs
[Handler]
[MapGet("/users")]
public static partial class GetUsersQuery
{
    public record Query;

    private static ValueTask<IEnumerable<User>> HandleAsync(
        Query _,
        UsersService usersService,
        CancellationToken token)
    {
        return usersService.GetUsers();
    }
}
```

### Registering the endpoints

In your `Program.cs`, add a call to `app.MapXxxEndpoints()`, where `Xxx` is the shortened form of the project name.
* For a project named `Web`, it will be `app.MapWebEndpoints()`
* For a project named `Application.Web`, it will be `app.MapApplicationWebEndpoints()`

### Customizing the endpoints
#### AsParameters

By default on POST and PUT requests Immediate.Apis will assume that your request class should be treated as a `[FromBody]`. Sometimes, however, this is not desired. For example imagine a PUT request that sits at a route `/api/todos/{id}` and updates a TODO with a given ID. We would want to get the `id` from the route and the properties to update from the body. To do so, we need to create the following request command class:

```cs
public sealed record Command
{
    public sealed record CommandBody
    {
        // props here;
    }
    
    [FromRoute]
    public required int Id { get; init; }
    
    [FromBody]
    public required CommandBody Body { get; init; }
}
```

...and modify the `HandleAsync` method to let Immediate.Apis know we want to treat the outer `Command` class as `[AsParameters]`, like so:

```cs
private static async ValueTask<Results<NoContent, NotFound>> HandleAsync(
    [AsParameters] Command command,
    ExampleDbContext dbContext,
    CancellationToken ct
) 
{
    // ...
}
```

#### Authorization

The `[AllowAnonymous]` and `[Authorized("Policy")]` attributes are supported and will be applied to the endpoint.

```cs
[Handler]
[MapGet("/users")]
[AllowAnonymous]
public static partial class GetUsersQuery
{
    public record Query;

    private static ValueTask<IEnumerable<User>> HandleAsync(
        Query _,
        UsersService usersService,
        CancellationToken token)
    {
        return usersService.GetUsers();
    }
}
```

#### Additional Customization of Endpoint Registration

Additional customization of the endpoint registration can be done by adding a `CustomizeEndpoint` method.

```cs
[Handler]
[MapGet("/users")]
[Authorize(Policies.UserManagement)]
public static partial class GetUsersQuery
{
    internal static void CustomizeGetFeaturesEndpoint(IEndpointConventionBuilder endpoint)
        => endpoint
            .Produces<IEnumerable<User>>(StatusCodes.Status200OK)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status500InternalServerError)
            .WithTags(nameof(User));

    public record Query;

    private static ValueTask<IEnumerable<User>> HandleAsync(
        Query _,
        UsersService usersService,
        CancellationToken token)
    {
        return usersService.GetUsers();
    }
}
```

#### Transforming the handler result into a different type

In some cases, you may wish to transform the result of the handler into a different type; for example, you may wish to return a `Results<>` type which will work with asp.net core to return various status codes. 

You can transform the result of your handler into a different type by adding a `TransformResult` method, like so:

```cs
[Handler]
[MapGet("/users")]
[Authorize(Policies.UserManagement)]
public static partial class GetUsersQuery
{
    internal static Results<Ok<IEnumerable<User>>, NotFound> TransformResult(IEnumerable<User> result)
    {
        return TypedResults.Ok(result);
    }

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


:::

### About
:::note

Defining APIs in classes instead of  in minimal API or controllers


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **immediate.apis**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Immediate.Apis" Version="1.3.0" />
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.4" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\Program.cs" label="Program.cs" >

  This is the use of **immediate.apis** in *Program.cs*

```csharp showLineNumbers 
using APIDemo;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAPIDemoHandlers();
var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapAPIDemoEndpoints();
//app.UseHttpsRedirection();

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\PersonAPI.cs" label="PersonAPI.cs" >

  This is the use of **immediate.apis** in *PersonAPI.cs*

```csharp showLineNumbers 
using Immediate.Apis.Shared;
using Immediate.Handlers.Shared;
using Microsoft.AspNetCore.Http.HttpResults;
namespace APIDemo;

    [Handler]
    [MapGet("/users")]
    public static partial class PersonAPI
    {
        public record Query;

        private static async ValueTask<Person[]> HandleAsync(
            Query _,
            CancellationToken token)
        {
            await Task.Delay(1000);
            return new[] { new Person { FirstName = "Ignat", LastName = "Andrei" } };
         }
    }
    
    

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\Person.cs" label="Person.cs" >

  This is the use of **immediate.apis** in *Person.cs*

```csharp showLineNumbers 
namespace APIDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\obj\GX\Immediate.Apis.Generators\Immediate.Apis.Generators.ImmediateApisGenerator\RouteBuilder.APIDemo_PersonAPI.g.cs" label="RouteBuilder.APIDemo_PersonAPI.g.cs" >


```csharp showLineNumbers 
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

#pragma warning disable CS1591

namespace Microsoft.AspNetCore.Builder
{
	public static partial class APIDemoRoutesBuilder
	{
		private static void MapAPIDemo_PersonAPIEndpoint(IEndpointRouteBuilder app)
		{
			var endpoint = app
				.MapGet(
					"/users",
					async (
						[AsParameters] global::APIDemo.PersonAPI.Query parameters,
						[FromServices] global::APIDemo.PersonAPI.Handler handler,
						CancellationToken token
					) =>
					{
						var ret = await handler.HandleAsync(parameters, token);
						return ret;
					}
				);
		}
	}
}

namespace APIDemo
{

	/// <remarks><see cref="global::APIDemo.PersonAPI.Query" /> registered using <c>[AsParameters]</c></remarks>
	partial class PersonAPI;
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\obj\GX\Immediate.Apis.Generators\Immediate.Apis.Generators.ImmediateApisGenerator\RoutesBuilder.g.cs" label="RoutesBuilder.g.cs" >


```csharp showLineNumbers 
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

#pragma warning disable CS1591

namespace Microsoft.AspNetCore.Builder;

public static partial class APIDemoRoutesBuilder
{
	public static IEndpointRouteBuilder MapAPIDemoEndpoints(
		this IEndpointRouteBuilder app
	)
	{
		MapAPIDemo_PersonAPIEndpoint(app);

		return app;
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\obj\GX\Immediate.Handlers.Generators\Immediate.Handlers.Generators.ImmediateHandlers.ImmediateHandlersGenerator\IH.APIDemo.PersonAPI.g.cs" label="IH.APIDemo.PersonAPI.g.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;

#pragma warning disable CS1591

namespace APIDemo;

partial class PersonAPI
{
	public sealed partial class Handler : global::Immediate.Handlers.Shared.IHandler<global::APIDemo.PersonAPI.Query, global::APIDemo.Person[]>
	{
		private readonly global::APIDemo.PersonAPI.HandleBehavior _handleBehavior;

		public Handler(
			global::APIDemo.PersonAPI.HandleBehavior handleBehavior
		)
		{
			var handlerType = typeof(PersonAPI);

			_handleBehavior = handleBehavior;

		}

		public async global::System.Threading.Tasks.ValueTask<global::APIDemo.Person[]> HandleAsync(
			global::APIDemo.PersonAPI.Query request,
			global::System.Threading.CancellationToken cancellationToken = default
		)
		{
			return await _handleBehavior
				.HandleAsync(request, cancellationToken)
				.ConfigureAwait(false);
		}
	}

	[global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)]
	public sealed class HandleBehavior : global::Immediate.Handlers.Shared.Behavior<global::APIDemo.PersonAPI.Query, global::APIDemo.Person[]>
	{

		public HandleBehavior(
		)
		{
		}

		public override async global::System.Threading.Tasks.ValueTask<global::APIDemo.Person[]> HandleAsync(
			global::APIDemo.PersonAPI.Query request,
			global::System.Threading.CancellationToken cancellationToken
		)
		{
			return await global::APIDemo.PersonAPI
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
		services.Add(new(typeof(global::APIDemo.PersonAPI.Handler), typeof(global::APIDemo.PersonAPI.Handler), lifetime));
		services.Add(new(typeof(global::Immediate.Handlers.Shared.IHandler<global::APIDemo.PersonAPI.Query, global::APIDemo.Person[]>), typeof(global::APIDemo.PersonAPI.Handler), lifetime));
		services.Add(new(typeof(global::APIDemo.PersonAPI.HandleBehavior), typeof(global::APIDemo.PersonAPI.HandleBehavior), lifetime));
		return services;
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Immediate.APIs\src\APIDemo\obj\GX\Immediate.Handlers.Generators\Immediate.Handlers.Generators.ImmediateHandlers.ImmediateHandlersGenerator\IH.ServiceCollectionExtensions.g.cs" label="IH.ServiceCollectionExtensions.g.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

#pragma warning disable CS1591

namespace APIDemo;

public static class HandlerServiceCollectionExtensions
{
	public static IServiceCollection AddAPIDemoBehaviors(
		this IServiceCollection services)
	{
		
		return services;
	}

	public static IServiceCollection AddAPIDemoHandlers(
		this IServiceCollection services,
		ServiceLifetime lifetime = ServiceLifetime.Scoped
	)
	{
		global::APIDemo.PersonAPI.AddHandlers(services, lifetime);
		
		return services;
	}
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project immediate.apis ](/sources/immediate.apis.zip)

:::


### Share immediate.apis 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fimmediate.apis&quote=immediate.apis" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fimmediate.apis&text=immediate.apis:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fimmediate.apis" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fimmediate.apis&title=immediate.apis" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fimmediate.apis&title=immediate.apis&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fimmediate.apis" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/immediate.apis

### In the same category (API) - 9 other generators


#### [Microsoft.Extensions.Configuration.Binder](/docs/Microsoft.Extensions.Configuration.Binder)


#### [MinimalApiBuilder](/docs/MinimalApiBuilder)


#### [MinimalApis.Discovery](/docs/MinimalApis.Discovery)


#### [MinimalHelpers.Routing.Analyzers](/docs/MinimalHelpers.Routing.Analyzers)


#### [RDG](/docs/RDG)


#### [Refit](/docs/Refit)


#### [RSCG_WebAPIExports](/docs/RSCG_WebAPIExports)


#### [SafeRouting](/docs/SafeRouting)


#### [SkinnyControllersCommon](/docs/SkinnyControllersCommon)

