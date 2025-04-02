---
sidebar_position: 1620
title: 162 - MinimalHelpers.Routing.Analyzers
description: Controller like API registering
slug: /MinimalHelpers.Routing.Analyzers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# MinimalHelpers.Routing.Analyzers  by Maroc Minerva


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/MinimalHelpers.Routing.Analyzers?label=MinimalHelpers.Routing.Analyzers)](https://www.nuget.org/packages/MinimalHelpers.Routing.Analyzers/)
[![GitHub last commit](https://img.shields.io/github/last-commit/marcominerva/MinimalHelpers?label=updated)](https://github.com/marcominerva/MinimalHelpers)
![GitHub Repo stars](https://img.shields.io/github/stars/marcominerva/MinimalHelpers?style=social)

## Details

### Info
:::info

Name: **MinimalHelpers.Routing.Analyzers**

A library that provides a Source Generator for automatic endpoints registration in Minimal API projects

Author: Maroc Minerva

NuGet: 
*https://www.nuget.org/packages/MinimalHelpers.Routing.Analyzers/*   


You can find more details at https://github.com/marcominerva/MinimalHelpers

Source : https://github.com/marcominerva/MinimalHelpers

:::

### Original Readme
:::note

# Minimal APIs Helpers

[![Lint Code Base](https://github.com/marcominerva/MinimalHelpers/actions/workflows/linter.yml/badge.svg)](https://github.com/marcominerva/MinimalHelpers/actions/workflows/linter.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/marcominerva/MinimalHelpers/blob/master/LICENSE)

A collection of helpers libraries for Minimal API projects.

## MinimalHelpers.Routing

[![Nuget](https://img.shields.io/nuget/v/MinimalHelpers.Routing)](https://www.nuget.org/packages/MinimalHelpers.Routing)
[![Nuget](https://img.shields.io/nuget/dt/MinimalHelpers.Routing)](https://www.nuget.org/packages/MinimalHelpers.Routing)

A library that provides Routing helpers for Minimal API projects for automatic endpoints registration using Reflection.

### Installation

The library is available on [NuGet](https://www.nuget.org/packages/MinimalHelpers.Routing). Just search for *MinimalHelpers.Routing* in the **Package Manager GUI** or run the following command in the **.NET CLI**:

```shell
dotnet add package MinimalHelpers.Routing
```

### Usage

Create a class to hold your route handlers registration and make it implementing the `IEndpointRouteHandlerBuilder` interface:

**.NET 6.0**

```csharp
public class PeopleEndpoints : MinimalHelpers.Routing.IEndpointRouteHandlerBuilder
{
    public void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/people", GetList);
        endpoints.MapGet("/api/people/{id:guid}", Get);
        endpoints.MapPost("/api/people", Insert);
        endpoints.MapPut("/api/people/{id:guid}", Update);
        endpoints.MapDelete("/api/people/{id:guid}", Delete);
    }

    // ...
}
```

**.NET 7.0 or higher**

```csharp
public class PeopleEndpoints : MinimalHelpers.Routing.IEndpointRouteHandlerBuilder
{
    public static void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/people", GetList);
        endpoints.MapGet("/api/people/{id:guid}", Get);
        endpoints.MapPost("/api/people", Insert);
        endpoints.MapPut("/api/people/{id:guid}", Update);
        endpoints.MapDelete("/api/people/{id:guid}", Delete);
    }

    // ...
}
```

> **Note**
Starting from .NET 7.0, the `IEndpointRouteHandlerBuilder` interface exposes the `MapEndpoints` method as static abstract, so it can be called without creating an instance of the handler.

Call the `MapEndpoints()` extension method on the **WebApplication** object inside *Program.cs* before the `Run()` method invocation:

```csharp
// using MinimalHelpers.Routing;
app.MapEndpoints();

app.Run();
```

By default, `MapEndpoints()` will scan the calling Assembly to search for classes that implement the `IEndpointRouteHandlerBuilder` interface. If your route handlers are defined in another Assembly, you have two alternatives:

- Use the `MapEndpoints()` overload that takes the Assembly to scan as argument
- Use the `MapEndpointsFromAssemblyContaining of T()` extension method and specify a type that is contained in the Assembly you want to scan

You can also explicitly decide what types (among the ones that implement the `IRouteEndpointHandlerBuilder` interface) you want to actually map, passing a predicate to the `MapEndpoints` method:

```csharp
app.MapEndpoints(type =>
{
    if (type.Name.StartsWith("Products"))
    {
        return false;
    }

    return true;
});
```

> **Note**
These methods rely on Reflection to scan the Assembly and find the classes that implement the `IEndpointRouteHandlerBuilder` interface. This can have a performance impact, especially in large projects. If you have performance issues, consider using the explicit registration method. Moreover, this solution is incompatibile with Native AOT.

If you're working with .NET 7.0 or higher, the reccommended approach is to use the **MinimalHelpers.Routing.Analyzers** package, that provides a Source Generator for endpoints registration, as described later.

## MinimalHelpers.Routing.Analyzers (.NET 7.0 or higher)

[![Nuget](https://img.shields.io/nuget/v/MinimalHelpers.Routing.Analyzers)](https://www.nuget.org/packages/MinimalHelpers.Routing.Analyzers)
[![Nuget](https://img.shields.io/nuget/dt/MinimalHelpers.Routing.Analyzers)](https://www.nuget.org/packages/MinimalHelpers.Routing.Analyzers)

A library that provides a Source Generator for automatic endpoints registration in Minimal API projects.

### Installation

The library is available on [NuGet](https://www.nuget.org/packages/MinimalHelpers.Routing.Analyzers). Just search for *MinimalHelpers.Routing* in the **Package Manager GUI** or run the following command in the **.NET CLI**:

```shell
dotnet add package MinimalHelpers.Routing.Analyzers
```

### Usage

Create a class to hold your route handlers registration and make it implementing the `IEndpointRouteHandlerBuilder` interface:

```csharp
public class PeopleEndpoints : IEndpointRouteHandlerBuilder
{
    public static void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/people", GetList);
        endpoints.MapGet("/api/people/{id:guid}", Get);
        endpoints.MapPost("/api/people", Insert);
        endpoints.MapPut("/api/people/{id:guid}", Update);
        endpoints.MapDelete("/api/people/{id:guid}", Delete);
    }

    // ...
}
```

> **Note**
You only need to use the **MinimalHelpers.Routing.Analyzers** package. With this Source Generator, the `IEndpointRouteHandlerBuilder` interface is auto-generated.

Call the `MapEndpoints()` extension method on the **WebApplication** object inside *Program.cs* before the `Run()` method invocation:

```csharp
app.MapEndpoints();

app.Run();
```

> **Note**
The `MapEndpoints` method is generated by the Source Generator.

## MinimalHelpers.OpenApi

[![Nuget](https://img.shields.io/nuget/v/MinimalHelpers.OpenApi)](https://www.nuget.org/packages/MinimalHelpers.OpenApi)
[![Nuget](https://img.shields.io/nuget/dt/MinimalHelpers.OpenApi)](https://www.nuget.org/packages/MinimalHelpers.OpenApi)

A library that provides OpenApi helpers for Minimal API projects.

### Installation

The library is available on [NuGet](https://www.nuget.org/packages/MinimalHelpers.OpenApi). Just search for *MinimalHelpers.OpenApi* in the **Package Manager GUI** or run the following command in the **.NET CLI**:

```shell
dotnet add package MinimalHelpers.OpenApi
```

### Usage

***Extension methods for OpenApi***

This library provides some extensions methods that simplify the OpenAPI configuration in Minimal API projects. For example, it is possible to customize the description of a response using its status code:

```csharp
endpoints.MapPost("login", LoginAsync)
    .AllowAnonymous()
    .WithValidation<LoginRequest>()
    .Produces<LoginResponse>(StatusCodes.Status200OK)
    .Produces<LoginResponse>(StatusCodes.Status206PartialContent)
    .Produces(StatusCodes.Status403Forbidden)
    .ProducesValidationProblem()
    .WithOpenApi(operation =>
    {
        operation.Summary = "Performs the login of a user";

        operation.Response(StatusCodes.Status200OK).Description = "Login successful";
        operation.Response(StatusCodes.Status206PartialContent).Description = "The user is logged in, but the password has expired and must be changed";
        operation.Response(StatusCodes.Status400BadRequest).Description = "Incorrect username and/or password";
        operation.Response(StatusCodes.Status403Forbidden).Description = "The user was blocked due to too many failed logins";

        return operation;
    });
 ```

 ***Extension methods for RouteHandlerBuilder***

 Often we have endpoints with multiple 4xx return values, each of which produces a `ProblemDetails` response:

 ```csharp
 endpoints.MapGet("/api/people/{id:guid}", Get)
    .ProducesProblem(StatusCodes.Status400BadRequest)
    .ProducesProblem(StatusCodes.Status401Unauthorized)
    .ProducesProblem(StatusCodes.Status403Forbidden)
    .ProducesProblem(StatusCodes.Status404NotFound);
 ```

 To avoid multiple calls to `ProducesProblem`, we can use the `ProducesDefaultProblem` extension method provided by the library:

 ```csharp
endpoints.MapGet("/api/people/{id:guid}", Get)
    .ProducesDefaultProblem(StatusCodes.Status400BadRequest, StatusCodes.Status401Unauthorized,
        StatusCodes.Status403Forbidden, StatusCodes.Status404NotFound);
 ```

## MinimalHelpers.Validation

[![Nuget](https://img.shields.io/nuget/v/MinimalHelpers.Validation)](https://www.nuget.org/packages/MinimalHelpers.Validation)
[![Nuget](https://img.shields.io/nuget/dt/MinimalHelpers.Validation)](https://www.nuget.org/packages/MinimalHelpers.Validation)

A library that provides an Endpoint filter for Minimal API projects to perform validation with Data Annotations, using the <a href="https://github.com/DamianEdwards/MiniValidation">MiniValidation</a> library.

### Installation

The library is available on [NuGet](https://www.nuget.org/packages/MinimalHelpers.Validation). Just search for *MinimalHelpers.Validation* in the **Package Manager GUI** or run the following command in the **.NET CLI**:

```shell
dotnet add package MinimalHelpers.Validation
```

### Usage

Decorates a class with attributes to define the validation rules:

```csharp
using System.ComponentModel.DataAnnotations;

public class Person
{
    [Required]
    [MaxLength(20)]
    public string? FirstName { get; set; }

    [Required]
    [MaxLength(20)]
    public string? LastName { get; set; }

    [MaxLength(50)]
    public string? City { get; set; }
}
```

Add the `WithValidation of T()` extension method to enable the validation filter:

```csharp
using MinimalHelpers.Validation;

app.MapPost("/api/people", (Person person) =>
    {
        // ...
    })
    .WithValidation<Person>();
```

If the validation fails, the response will be a `400 Bad Request` with a `ValidationProblemDetails` object containing the validation errors, for example:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred",
  "status": 400,
  "instance": "/api/people",
  "traceId": "00-009c0162ba678cae2ee391815dbbb59d-0a3a5b0c16d053e6-00",
  "errors": {
    "FirstName": [
      "The field FirstName must be a string or array type with a maximum length of '20'."
    ],
    "LastName": [
      "The LastName field is required."
    ]
  }
}
```

If you want to customize validation, you can use the `ConfigureValidation` extension method:

```csharp
using MinimalHelpers.Validation;

builder.Services.ConfigureValidation(options =>
{
    // If you want to get errors as a list instead of a dictionary.
    options.ErrorResponseFormat = ErrorResponseFormat.List;

    // The default is "One or more validation errors occurred"
    options.ValidationErrorTitleMessageFactory =
        (context, errors) => $"There was {errors.Values.Sum(v => v.Length)} error(s)";
});
```

You can use the `ValidationErrorTitleMessageFactory`, for example, if you want to localized the `title` property of the response using a RESX file.

## MinimalHelpers.FluentValidation

[![Nuget](https://img.shields.io/nuget/v/MinimalHelpers.FluentValidation)](https://www.nuget.org/packages/MinimalHelpers.FluentValidation)
[![Nuget](https://img.shields.io/nuget/dt/MinimalHelpers.FluentValidation)](https://www.nuget.org/packages/MinimalHelpers.FluentValidation)

A library that provides an Endpoint filter for Minimal API projects to perform validation using <a href="https://fluentvalidation.net">FluentValidation</a>.

### Installation

The library is available on [NuGet](https://www.nuget.org/packages/MinimalHelpers.FluentValidation). Just search for *MinimalHelpers.FluentValidation* in the **Package Manager GUI** or run the following command in the **.NET CLI**:

```shell
dotnet add package MinimalHelpers.FluentValidation
```

### Usage

Create a class that extends AbstractValidator of T and define the validation rules:

```csharp
using FluentValidation;

public record class Product(string Name, string Description, double UnitPrice);

public class ProductValidator : AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(p => p.Name).NotEmpty().MaximumLength(50).EmailAddress();
        RuleFor(p => p.Description).MaximumLength(500);
        RuleFor(p => p.UnitPrice).GreaterThan(0);
    }
}
```

Register validators in the Service Collection:

```csharp
using FluentValidation;

// Assuming the validators are in the same assembly as the Program class
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

```

Add the `WithValidation of T()` extension method to enable the validation filter:

```csharp
using MinimalHelpers.FluentValidation;

app.MapPost("/api/products", (Product product) =>
    {
        // ...
    })
    .WithValidation<Product>();
```

If the validation fails, the response will be a `400 Bad Request` with a `ValidationProblemDetails` object containing the validation errors, for example:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred",
  "status": 400,
  "instance": "/api/products",
  "traceId": "00-f4ced0ae470424dd04cbcebe5f232dc5-bbdcc59f310ebfb8-00",
  "errors": {
    "Name": [
      "'Name' cannot be empty."
    ],
    "UnitPrice": [
      "'Unit Price' must be grater than '0'."
    ]
  }
}
```

If you want to customize validation, you can use the `ConfigureValidation` extension method:

```csharp
using MinimalHelpers.Validation;

builder.Services.ConfigureValidation(options =>
{
    // If you want to get errors as a list instead of a dictionary.
    options.ErrorResponseFormat = ErrorResponseFormat.List;

    // The default is "One or more validation errors occurred"
    options.ValidationErrorTitleMessageFactory =
        (context, errors) => $"There was {errors.Values.Sum(v => v.Length)} error(s)";
});
```

You can use the `ValidationErrorTitleMessageFactory`, for example, if you want to localized the `title` property of the response using a RESX file.


**Contribute**

The project is constantly evolving. Contributions are welcome. Feel free to file issues and pull requests on the repo and we'll address them as we can. 


:::

### About
:::note

Controller like API registering


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MinimalHelpers.Routing.Analyzers**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.4" />
    <PackageReference Include="MinimalHelpers.Routing.Analyzers" Version="1.0.13" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalHelpers.Routing.Analyzers\src\APIDemo\PersonAPI.cs" label="PersonAPI.cs" >

  This is the use of **MinimalHelpers.Routing.Analyzers** in *PersonAPI.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Http.HttpResults;
namespace APIDemo;

public class PersonAPI : IEndpointRouteHandlerBuilder
{
    public static void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        var grp = endpoints.MapGroup("/api/Person");
        grp.MapGet("", GetFromId);
        grp.MapGet("{id:int}", GetFromId);
        //todo: add more routes
    }
    public static async Task<Person[]> GetAll()
    {       
        await Task.Delay(1000);
        return new[] { new Person { FirstName = "Ignat", LastName = "Andrei" } };
    }

    public static async Task<Results<Ok<Person>,NotFound<string>>> GetFromId(int id)
    {
        await Task.Delay(1000);
        if (id == 1)
        {
            return TypedResults.Ok<Person>(new Person { FirstName = "Ignat", LastName = "Andrei" });
        }
        return TypedResults.NotFound<string>("Person not found");
    }


}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalHelpers.Routing.Analyzers\src\APIDemo\Person.cs" label="Person.cs" >

  This is the use of **MinimalHelpers.Routing.Analyzers** in *Person.cs*

```csharp showLineNumbers 
namespace APIDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalHelpers.Routing.Analyzers\src\APIDemo\Program.cs" label="Program.cs" >

  This is the use of **MinimalHelpers.Routing.Analyzers** in *Program.cs*

```csharp showLineNumbers 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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

app.MapEndpoints();

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalHelpers.Routing.Analyzers\src\APIDemo\obj\GX\MinimalHelpers.Routing.Analyzers\MinimalHelpers.Routing.Analyzers.EndpointRouteHandlerGenerator\EndpointRouteBuilderExtensions.g.cs" label="EndpointRouteBuilderExtensions.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
namespace Microsoft.AspNetCore.Routing;

#nullable enable annotations
#nullable disable warnings

/// <summary>
/// Provides extension methods for <see cref="IEndpointRouteBuilder" /> to add route handlers.
/// </summary>
public static class EndpointRouteBuilderExtensions
{
    /// <summary>
    /// Automatically registers all the route endpoints defined in classes that implement the <see cref="IEndpointRouteHandlerBuilder "/> interface.
    /// </summary>
    /// <param name="endpoints">The <see cref="IEndpointRouteBuilder" /> to add routes to.</param>
    public static IEndpointRouteBuilder MapEndpoints(this IEndpointRouteBuilder endpoints)
    {            
        global::APIDemo.PersonAPI.MapEndpoints(endpoints);

        return endpoints;
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalHelpers.Routing.Analyzers\src\APIDemo\obj\GX\MinimalHelpers.Routing.Analyzers\MinimalHelpers.Routing.Analyzers.EndpointRouteHandlerGenerator\IEndpointRouteHandlerBuilder.g.cs" label="IEndpointRouteHandlerBuilder.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
namespace Microsoft.AspNetCore.Routing;

#nullable enable annotations
#nullable disable warnings                

/// <summary>
/// Defines a contract for a class that holds one or more route handlers that must be registered by the application.
/// </summary>
public interface IEndpointRouteHandlerBuilder
{
    /// <summary>
    /// Maps route endpoints to the corresponding handlers.
    /// </summary>
    static abstract void MapEndpoints(IEndpointRouteBuilder endpoints);
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project MinimalHelpers.Routing.Analyzers ](/sources/MinimalHelpers.Routing.Analyzers.zip)

:::


### Share MinimalHelpers.Routing.Analyzers 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalHelpers.Routing.Analyzers&quote=MinimalHelpers.Routing.Analyzers" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalHelpers.Routing.Analyzers&text=MinimalHelpers.Routing.Analyzers:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalHelpers.Routing.Analyzers" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalHelpers.Routing.Analyzers&title=MinimalHelpers.Routing.Analyzers" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalHelpers.Routing.Analyzers&title=MinimalHelpers.Routing.Analyzers&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalHelpers.Routing.Analyzers" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MinimalHelpers.Routing.Analyzers

### In the same category (API) - 9 other generators


#### [immediate.apis](/docs/immediate.apis)


#### [Microsoft.Extensions.Configuration.Binder](/docs/Microsoft.Extensions.Configuration.Binder)


#### [MinimalApiBuilder](/docs/MinimalApiBuilder)


#### [MinimalApis.Discovery](/docs/MinimalApis.Discovery)


#### [RDG](/docs/RDG)


#### [Refit](/docs/Refit)


#### [RSCG_WebAPIExports](/docs/RSCG_WebAPIExports)


#### [SafeRouting](/docs/SafeRouting)


#### [SkinnyControllersCommon](/docs/SkinnyControllersCommon)

