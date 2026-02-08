---
sidebar_position: 2540
title: 254 - ErrorOrX
description: API results from Functional returns of ErroOrX
slug: /ErrorOrX
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAPI.mdx';

# ErrorOrX  by Alexander Nachtmanns


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ErrorOrX?label=ErrorOrX)](https://www.nuget.org/packages/ErrorOrX/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ANcpLua/ErrorOrX?label=updated)](https://github.com/ANcpLua/ErrorOrX/)
![GitHub Repo stars](https://img.shields.io/github/stars/ANcpLua/ErrorOrX?style=social)

## Details

### Info
:::info

Name: **ErrorOrX**

A discriminated union type for .NET with source-generated ASP.NET Core Minimal API integration. Zero boilerplate, full AOT support.

Author: Alexander Nachtmanns

NuGet: 
*https://www.nuget.org/packages/ErrorOrX/*   


You can find more details at https://github.com/ANcpLua/ErrorOrX/

Source: https://github.com/ANcpLua/ErrorOrX/

:::

### Author
:::note
Alexander Nachtmanns 
![Alt text](https://github.com/ANcpLua.png)
:::

### Original Readme
:::note

# ErrorOrX

[![NuGet](https://img.shields.io/nuget/v/ErrorOrX.Generators.svg)](https://www.nuget.org/packages/ErrorOrX.Generators/)
[![NuGet Downloads](https://img.shields.io/nuget/dt/ErrorOrX.Generators.svg)](https://www.nuget.org/packages/ErrorOrX.Generators/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Railway-Oriented Programming for .NET with source-generated ASP.NET Core Minimal API integration. Zero boilerplate, full
Native AOT support.

## Features

- **Discriminated Unions** - `ErrorOr<T>` represents success or a list of typed errors
- **Fluent API** - Chain operations with `Then`, `Else`, `Match`, `Switch`, and `FailIf`
- **Nullable Extensions** - Convert nullable values with `OrNotFound()`, `OrValidation()`, and more
- **Source Generator** - Auto-generates `MapErrorOrEndpoints()` from attributed static methods
- **Smart Binding** - Automatic parameter inference based on HTTP method and type
- **OpenAPI Ready** - Typed `Results<...>` unions for complete API documentation
- **Native AOT** - Reflection-free code generation with JSON serialization contexts
- **Middleware Support** - Translates ASP.NET Core attributes to Minimal API fluent calls (authorization, rate limiting,
  caching)
- **API Versioning** - Integrates with Asp.Versioning.Http for versioned endpoint groups
- **41 Analyzers** - Real-time IDE feedback for route conflicts, binding errors, AOT compatibility

## What the Generator Produces

The source generator transforms your handler methods into complete ASP.NET Core Minimal API endpoints.
You write the business logic, the generator handles everything else.

### Endpoint Wiring

For each `[Get]`, `[Post]`, `[Put]`, `[Delete]`, `[Patch]` method:

- Registers endpoint with `app.MapGet()`, `app.MapPost()`, etc.
- Applies route constraints (`{id:guid}`, `{count:int}`)
- Sets operation name (`.WithName()`) and tags (`.WithTags()`)

[See EndpointMetadataEmitter.cs](src/ErrorOrX.Generators/Emitters/EndpointMetadataEmitter.cs)

### Parameter Binding

Automatic inference based on type and HTTP method:

| Source  | Inference Rule                                                        |
|---------|-----------------------------------------------------------------------|
| Route   | Parameter name matches `{param}` in route                             |
| Query   | Primitive type not in route                                           |
| Body    | POST/PUT/PATCH with complex type                                      |
| Service | Interface, abstract, or DI naming pattern (`*Service`, `*Repository`) |
| Special | `HttpContext`, `CancellationToken`, `IFormFile`                       |

[See BindingCodeEmitter.cs](src/ErrorOrX.Generators/Emitters/BindingCodeEmitter.cs)

### Error-to-HTTP Mapping

Converts `ErrorOr` errors to proper HTTP responses with [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807)
ProblemDetails:

| ErrorType    | HTTP Status | Response                              |
|--------------|-------------|---------------------------------------|
| Validation   | 400         | `ValidationProblem` with field errors |
| Unauthorized | 401         | `Unauthorized()`                      |
| Forbidden    | 403         | `Forbid()`                            |
| NotFound     | 404         | `NotFound<ProblemDetails>`            |
| Conflict     | 409         | `Conflict<ProblemDetails>`            |
| Failure      | 500         | `InternalServerError<ProblemDetails>` |
| Unexpected   | 500         | `InternalServerError<ProblemDetails>` |
| Custom(422)  | 422         | `UnprocessableEntity<ProblemDetails>` |

[See ErrorMapping.cs](src/ErrorOrX.Generators/Models/ErrorMapping.cs)

### Request Validation

Generated code validates before calling your handler:

- Required parameters (returns 400 if missing)
- Type parsing (Guid, int, etc. with format errors)
- JSON deserialization (catches `JsonException`)
- Content-Type checking (returns 415 for wrong type)

### OpenAPI Metadata

Full OpenAPI documentation without manual attributes:

- Response types via `ProducesResponseTypeMetadata`
- Accept types via `AcceptsMetadata`
- Tags from class name
- Operation IDs from method name
- XML doc comments extracted to summaries

[See OpenApiTransformerGenerator.cs](src/ErrorOrX.Generators/OpenApiTransformerGenerator.cs)

### Builder API

Fluent configuration following ASP.NET Core patterns:

```csharp
builder.Services.AddErrorOrEndpoints()
    .UseJsonContext<AppJsonSerializerContext>()  // AOT JSON
    .WithCamelCase()                              // Property naming
    .WithIgnoreNulls();                           // Skip null values

app.MapErrorOrEndpoints()
    .RequireAuthorization()                       // Global auth
    .RequireRateLimiting("api");                  // Global rate limit
```

### Analyzers (38 Diagnostics)

Real-time IDE feedback covering:

| Category   | Diagnostics | Examples                                                             |
|------------|-------------|----------------------------------------------------------------------|
| Core       | EOE001-007  | Invalid return type, non-static handler, unbound route param         |
| Binding    | EOE008-021  | Multiple body sources, invalid `[FromRoute]` type, ambiguous binding |
| Results    | EOE022-024  | Too many result types, unknown error factory, undocumented interface |
| AOT/JSON   | EOE025-026  | Missing camelCase, missing JsonSerializerContext                     |
| Versioning | EOE027-031  | Version-neutral conflict, undeclared version, invalid format         |
| Naming     | EOE032-033  | Duplicate route binding, non-PascalCase handler                      |
| AOT Safety | EOE034-038  | `Activator.CreateInstance`, `dynamic`, `Expression.Compile()`        |

[See Descriptors.cs](src/ErrorOrX.Generators/Analyzers/Descriptors.cs)

## Installation

```bash
dotnet add package ErrorOrX.Generators
```

This package includes both the source generator and the `ErrorOrX` runtime library.

## Quick Start

```csharp
// Program.cs
var app = WebApplication.CreateSlimBuilder(args).Build();
app.MapErrorOrEndpoints();
app.Run();
```

```csharp
// TodoApi.cs
using ErrorOr;

public static class TodoApi
{
    [Get("/todos/{id:guid}")]
    public static ErrorOr<Todo> GetById(Guid id, ITodoService svc)
        => svc.GetById(id).OrNotFound($"Todo {id} not found");

    [Post("/todos")]
    public static ErrorOr<Todo> Create(CreateTodoRequest req, ITodoService svc)
        => svc.Create(req);  // 201 Created

    [Delete("/todos/{id:guid}")]
    public static ErrorOr<Deleted> Delete(Guid id, ITodoService svc)
        => svc.Delete(id) ? Result.Deleted : Error.NotFound();
}
```

## Error Types

Create structured errors mapped to HTTP status codes:

```csharp
Error.Validation("User.InvalidEmail", "Email format is invalid")   // 400
Error.Unauthorized("Auth.InvalidToken", "Token has expired")       // 401
Error.Forbidden("Auth.InsufficientRole", "Admin role required")    // 403
Error.NotFound("User.NotFound", "User does not exist")             // 404
Error.Conflict("User.Duplicate", "Email already registered")       // 409
Error.Failure("Db.ConnectionFailed", "Database unavailable")       // 500
Error.Unexpected("Unknown", "An unexpected error occurred")        // 500
Error.Custom(422, "Validation.Complex", "Complex validation failed")
```

## Nullable-to-ErrorOr Extensions

Convert nullable values to `ErrorOr<T>` with auto-generated error codes:

```csharp
// Error code auto-generated from type name (e.g., "Todo.NotFound")
return _todos.Find(t => t.Id == id).OrNotFound($"Todo {id} not found");
return user.OrUnauthorized("Invalid credentials");
return record.OrValidation("Record is invalid");

// Custom errors
return value.OrError(Error.Custom(422, "Custom.Code", "Custom message"));
return value.OrError(() => BuildExpensiveError());  // Lazy evaluation
```

| Extension           | Error Type   | HTTP | Description              |
|---------------------|--------------|------|--------------------------|
| `.OrNotFound()`     | NotFound     | 404  | Resource not found       |
| `.OrValidation()`   | Validation   | 400  | Input validation failed  |
| `.OrUnauthorized()` | Unauthorized | 401  | Authentication required  |
| `.OrForbidden()`    | Forbidden    | 403  | Insufficient permissions |
| `.OrConflict()`     | Conflict     | 409  | State conflict           |
| `.OrFailure()`      | Failure      | 500  | Operational failure      |
| `.OrUnexpected()`   | Unexpected   | 500  | Unexpected error         |
| `.OrError(Error)`   | Any          | Any  | Custom error             |
| `.OrError(Func)`    | Any          | Any  | Lazy custom error        |

## Fluent API

Chain operations using railway-oriented programming patterns:

```csharp
// Chain operations - errors short-circuit the pipeline
var result = ValidateOrder(request)
    .Then(order => ProcessPayment(order))
    .Then(order => CreateShipment(order))
    .FailIf(order => order.Total <= 0, Error.Validation("Order.InvalidTotal", "Total must be positive"));

// Handle both cases
return result.Match(
    order => Ok(order),
    errors => BadRequest(errors.First().Description));

// Provide fallback on error
var user = GetUser(id).Else(errors => DefaultUser);

// Side effects
GetUser(id).Switch(
    user => Console.WriteLine($"Found: {user.Name}"),
    errors => Logger.LogError(errors.First().Description));
```

## Result Markers

Use semantic markers for endpoints without response bodies:

```csharp
Result.Success   // 200 OK (no body)
Result.Created   // 201 Created (no body)
Result.Updated   // 204 No Content
Result.Deleted   // 204 No Content
```

## Interface Types with `[ReturnsError]`

Document possible errors on interface methods for OpenAPI generation:

```csharp
public interface ITodoService
{
    [ReturnsError(ErrorType.NotFound, "Todo.NotFound")]
    [ReturnsError(ErrorType.Validation, "Todo.Invalid")]
    ErrorOr<Todo> GetById(Guid id);
}

[Get("/todos/{id:guid}")]
public static ErrorOr<Todo> GetById(Guid id, ITodoService svc) =>
    svc.GetById(id);
// Generates: Results<Ok<Todo>, NotFound<ProblemDetails>, ValidationProblem>
```

The generator reads `[ReturnsError]` attributes from interface/abstract methods to build the complete `Results<...>`
union for OpenAPI documentation.

## Smart Parameter Binding

The generator automatically infers parameter sources:

```csharp
[Post("/todos")]
public static ErrorOr<Todo> Create(
    CreateTodoRequest req,    // -> Body (POST + complex type)
    ITodoService svc)         // -> Service (interface)
    => svc.Create(req);

[Get("/todos/{id:guid}")]
public static ErrorOr<Todo> GetById(
    Guid id,                  // -> Route (matches {id})
    ITodoService svc)         // -> Service
    => svc.GetById(id).OrNotFound();
```

## Middleware Attributes

Standard ASP.NET Core attributes on your handler methods are translated to Minimal API fluent calls:

```csharp
[Post("/admin")]
[Authorize("Admin")]                    // ASP.NET Core authorization
[EnableRateLimiting("fixed")]           // Microsoft.AspNetCore.RateLimiting
[OutputCache(Duration = 60)]            // ASP.NET Core output caching
public static ErrorOr<User> CreateAdmin(CreateUserRequest req) \{ }

// Generator emits:
// app.MapPost("/admin", handler)
//    .RequireAuthorization("Admin")
//    .RequireRateLimiting("fixed")
//    .CacheOutput(policy => policy.Expire(TimeSpan.FromSeconds(60)));
```

## Native AOT

Fully compatible with `PublishAot=true`. Create a `JsonSerializerContext` with your endpoint types:

```csharp
[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(Todo))]
[JsonSerializable(typeof(CreateTodoRequest))]
[JsonSerializable(typeof(ProblemDetails))]
internal partial class AppJsonSerializerContext : JsonSerializerContext;
```

Register it with ErrorOrEndpoints:

```csharp
var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddErrorOrEndpoints()
    .UseJsonContext<AppJsonSerializerContext>();  // Uses options from [JsonSourceGenerationOptions]

var app = builder.Build();
app.MapErrorOrEndpoints();
app.Run();
```

The `[JsonSourceGenerationOptions]` on your context controls serialization behavior (camelCase, null handling).
The builder methods `WithCamelCase()` and `WithIgnoreNulls()` are only needed if you want to override at runtime.

## Packages

| Package               | Target           | Description                          |
|-----------------------|------------------|--------------------------------------|
| `ErrorOrX.Generators` | `netstandard2.0` | Source generator (includes ErrorOrX) |
| `ErrorOrX`            | `net10.0`        | Runtime library (auto-referenced)    |

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.


:::

### About
:::note

API results from Functional returns of ErroOrX


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ErrorOrX**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="ErrorOrX" Version="3.5.0" />
    <PackageReference Include="ErrorOrX.Generators" Version="3.5.0" />
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.2" />
    <PackageReference Include="OpenAPISwaggerUI" Version="9.2024.1215.2209" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\Program.cs" label="Program.cs" >

  This is the use of **ErrorOrX** in *Program.cs*

```csharp showLineNumbers 
using OpenAPISwaggerUI;

var builder = WebApplication.CreateBuilder(args);

//instead of this
//builder.Services.AddOpenApi();
builder.Services.AddErrorOrOpenApi();
builder.Services.AddErrorOrEndpoints();
var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseOpenAPISwaggerUI();
}
app.MapErrorOrEndpoints();
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
.WithName("GetWeatherForecast");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\PersonAPI.cs" label="PersonAPI.cs" >

  This is the use of **ErrorOrX** in *PersonAPI.cs*

```csharp showLineNumbers 
using ErrorOr;

namespace DemoFuncAPI;

public static class PersonAPI
{

    [Get("/todos/{id}")]
    public static ErrorOr<Person> GetById(int id)
    {
        try
        {
            return GetPersonById(id).OrNotFound();
        }
        catch (Exception ex)
        {
            return Error.Failure(description: ex.Message);
        }
    }

    static Person? GetPersonById(int id) =>
    
        id switch
        {
            1 => new Person(1, "John Doe"),
            2 => throw new Exception("person does not exists"),
            _ => null
        };
    
}

public record Person(int Id, string Name)   ;

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\obj\GX\ErrorOrX.Generators\ErrorOr.Generators.ErrorOrEndpointGenerator\ErrorOrEndpointAttributes.Mappings.g.cs" label="ErrorOrEndpointAttributes.Mappings.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace ErrorOr
{
    /// <summary>
    /// Marks a static method as an ErrorOr endpoint with explicit HTTP method and route.
    /// Prefer using [Get], [Post], [Put], [Delete], or [Patch] for standard HTTP methods.
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class ErrorOrEndpointAttribute : global::System.Attribute
    {
        public ErrorOrEndpointAttribute(string httpMethod, string route)
        {
            HttpMethod = httpMethod;
            Route = route;
        }
        public string HttpMethod \{ get; }
        public string Route \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class GetAttribute : global::System.Attribute
    {
        public GetAttribute(string route) => Route = route;
        public string Route \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class PostAttribute : global::System.Attribute
    {
        public PostAttribute(string route) => Route = route;
        public string Route \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class PutAttribute : global::System.Attribute
    {
        public PutAttribute(string route) => Route = route;
        public string Route \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class DeleteAttribute : global::System.Attribute
    {
        public DeleteAttribute(string route) => Route = route;
        public string Route \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class PatchAttribute : global::System.Attribute
    {
        public PatchAttribute(string route) => Route = route;
        public string Route \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ProducesErrorAttribute : global::System.Attribute
    {
        public ProducesErrorAttribute(int statusCode, string errorType)
        {
            StatusCode = statusCode;
            ErrorType = errorType;
        }
        public int StatusCode \{ get; }
        public string ErrorType \{ get; }
    }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = false)]
    public sealed class AcceptedResponseAttribute : global::System.Attribute \{ }

    [global::System.AttributeUsage(global::System.AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ReturnsErrorAttribute : global::System.Attribute
    {
        public ReturnsErrorAttribute(global::ErrorOr.ErrorType errorType, string errorCode)
        {
            ErrorType = errorType;
            ErrorCode = errorCode;
        }
        public ReturnsErrorAttribute(int statusCode, string errorCode)
        {
            StatusCode = statusCode;
            ErrorCode = errorCode;
            ErrorType = null;
        }
        public global::ErrorOr.ErrorType? ErrorType \{ get; }
        public int? StatusCode \{ get; }
        public string ErrorCode \{ get; }
    }

    /// <summary>
    /// Marks a class as a route group for versioned API endpoints.
    /// All endpoints in the class will be mapped under the specified path prefix
    /// using the eShop-style NewVersionedApi() pattern when combined with [ApiVersion].
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Class, AllowMultiple = false)]
    public sealed class RouteGroupAttribute : global::System.Attribute
    {
        public RouteGroupAttribute(string path) => Path = path;
        public string Path \{ get; }
        public string? ApiName \{ get; set; }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\obj\GX\ErrorOrX.Generators\ErrorOr.Generators.ErrorOrEndpointGenerator\ErrorOrEndpointMappings.cs" label="ErrorOrEndpointMappings.cs" >
```csharp showLineNumbers 
// <auto-generated/>
// This file was auto-generated by ErrorOr.Generators.
// Do not modify this file directly.

#nullable enable
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace ErrorOr.Generated
{
    /// <summary>
    /// Generated endpoint mappings for all [ErrorOrEndpoint] handlers in this assembly.
    /// </summary>
    public static class ErrorOrEndpointMappings
    {
        /// <summary>
        /// Maps all ErrorOr endpoints to the application's routing table.
        /// </summary>
        /// <param name="app">The endpoint route builder to add mappings to.</param>
        /// <returns>A convention builder for applying global conventions to all endpoints.</returns>
        /// <exception cref="InvalidOperationException">
        /// Thrown when AddErrorOrEndpoints() was not called during service registration.
        /// </exception>
        /// <remarks>
        /// This follows ASP.NET Core's convention builder pattern, enabling global
        /// endpoint configuration like RequireAuthorization() or RequireRateLimiting().
        /// </remarks>
        /// <example>
        /// <code>
        /// app.MapErrorOrEndpoints()
        ///    .RequireAuthorization()
        ///    .RequireRateLimiting("api");
        /// </code>
        /// </example>
        public static IEndpointConventionBuilder MapErrorOrEndpoints(this IEndpointRouteBuilder app)
        {
            // Validate that AddErrorOrEndpoints() was called
            var marker = app.ServiceProvider.GetService<ErrorOrEndpointsMarkerService>();
            if (marker is null)
            {
                throw new InvalidOperationException(
                    "Unable to find the required services. " +
                    "Please add all the required services by calling 'IServiceCollection.AddErrorOrEndpoints()' " +
                    "in the application startup code.");
            }

            var __endpointBuilders = new System.Collections.Generic.List<IEndpointConventionBuilder>();

            // GET /todos/{id} -> global::DemoFuncAPI.PersonAPI.GetById
            var __ep0 = app.MapGet(@"/todos/{id}", (Delegate)Invoke_Ep0)
                .WithName("DemoFuncAPI_PersonAPI_GetById")
                .WithTags("PersonAPI")
                .WithMetadata(new global::Microsoft.AspNetCore.Http.ProducesResponseTypeMetadata(200, typeof(global::DemoFuncAPI.Person), new[] \{ "application/json" }))
                .WithMetadata(new global::Microsoft.AspNetCore.Http.ProducesResponseTypeMetadata(400, typeof(global::Microsoft.AspNetCore.Http.HttpValidationProblemDetails), new[] \{ "application/problem+json" }))
                .WithMetadata(new global::Microsoft.AspNetCore.Http.ProducesResponseTypeMetadata(500, typeof(global::Microsoft.AspNetCore.Mvc.ProblemDetails), new[] \{ "application/problem+json" }))
                ;
            __endpointBuilders.Add(__ep0);


            return new CompositeEndpointConventionBuilder(__endpointBuilders);
        }

        /// <summary>
        /// Registers ErrorOr endpoint services and returns a builder for configuration.
        /// </summary>
        /// <param name="services">The service collection to configure.</param>
        /// <returns>A builder for further configuration.</returns>
        /// <remarks>
        /// This follows ASP.NET Core's builder pattern (like AddRazorComponents())
        /// enabling fluent extension method chaining without callback nesting.
        /// </remarks>
        /// <example>
        /// <code>
        /// builder.Services.AddErrorOrEndpoints()
        ///     .UseJsonContext&lt;AppJsonSerializerContext&gt;()
        ///     .WithCamelCase()
        ///     .WithIgnoreNulls();
        /// </code>
        /// </example>
        public static IErrorOrEndpointsBuilder AddErrorOrEndpoints(this IServiceCollection services)
        {
            // Register marker service for validation in MapErrorOrEndpoints()
            services.AddSingleton<ErrorOrEndpointsMarkerService>();
            return new ErrorOrEndpointsBuilder(services);
        }

        private static async Task<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>> Invoke_Ep0(HttpContext ctx)
        {
            return await Invoke_Ep0_Core(ctx);
        }

        private static Task<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>> Invoke_Ep0_Core(HttpContext ctx)
        {
            static global::Microsoft.AspNetCore.Mvc.ProblemDetails CreateBindProblem(string param, string reason) => new()
            {
                Title = "Bad Request",
                Detail = $"Parameter '{param}' {reason}.",
                Status = 400,
                Type = "https://httpstatuses.io/400",
            };

            static Task<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>> BindFail(string param, string reason)
                => Task.FromResult<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>>(global::Microsoft.AspNetCore.Http.TypedResults.BadRequest(CreateBindProblem(param, reason)));

            if (!TryGetRouteValue(ctx, "id", out var p0Raw) || !int.TryParse(p0Raw, out var p0)) return BindFail("id", "has invalid format");
            var result = global::DemoFuncAPI.PersonAPI.GetById(p0);
            if (result.IsError)
            {
                if (result.Errors.Count is 0) return Task.FromResult<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>>(global::Microsoft.AspNetCore.Http.TypedResults.InternalServerError(new global::Microsoft.AspNetCore.Mvc.ProblemDetails \{ Title = "Error", Detail = "An error occurred but no details were provided.", Status = 500 }));
                var first = result.Errors[0];
                var problem = new global::Microsoft.AspNetCore.Mvc.ProblemDetails
                {
                    Title = first.Code,
                    Detail = first.Description,
                    Status = first.Type switch \{ global::ErrorOr.ErrorType.Validation => 400, global::ErrorOr.ErrorType.Unauthorized => 401, global::ErrorOr.ErrorType.Forbidden => 403, global::ErrorOr.ErrorType.NotFound => 404, global::ErrorOr.ErrorType.Conflict => 409, global::ErrorOr.ErrorType.Failure => 500, global::ErrorOr.ErrorType.Unexpected => 500, _ => (int)first.Type is >= 100 and <= 599 ? (int)first.Type : 500 }
                };
                problem.Type = $"https://httpstatuses.io/{problem.Status}";

                switch (first.Type)
                {
                    case global::ErrorOr.ErrorType.Failure:
                        return Task.FromResult<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>>(global::Microsoft.AspNetCore.Http.TypedResults.InternalServerError(problem));
                    default:
                        return Task.FromResult<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>>(global::Microsoft.AspNetCore.Http.TypedResults.InternalServerError(problem));
                }
            }

            return Task.FromResult<global::Microsoft.AspNetCore.Http.HttpResults.Results<global::Microsoft.AspNetCore.Http.HttpResults.Ok<global::DemoFuncAPI.Person>, global::Microsoft.AspNetCore.Http.HttpResults.BadRequest<global::Microsoft.AspNetCore.Mvc.ProblemDetails>, global::Microsoft.AspNetCore.Http.HttpResults.InternalServerError<global::Microsoft.AspNetCore.Mvc.ProblemDetails>>>(global::Microsoft.AspNetCore.Http.TypedResults.Ok(result.Value));
        }

        private static bool TryGetRouteValue(HttpContext ctx, string name, out string? value)
        {
            if (!ctx.Request.RouteValues.TryGetValue(name, out var raw) || raw is null) \{ value = null; return false; }
            value = raw.ToString(); return value is not null;
        }

        private static bool TryGetQueryValue(HttpContext ctx, string name, out string? value)
        {
            if (!ctx.Request.Query.TryGetValue(name, out var raw) || raw.Count is 0) \{ value = null; return false; }
            value = raw.ToString(); return value is not null;
        }

        private static global::Microsoft.AspNetCore.Http.IResult ToProblem(global::System.Collections.Generic.IReadOnlyList<global::ErrorOr.Error> errors)
        {
            if (errors.Count is 0) return global::Microsoft.AspNetCore.Http.TypedResults.Problem();
            var hasValidation = false;
            for (var i = 0; i < errors.Count; i++) if (errors[i].Type == global::ErrorOr.ErrorType.Validation) \{ hasValidation = true; break; }
            if (hasValidation)
            {
                var dict = new global::System.Collections.Generic.Dictionary<string, string[]>();
                foreach (var e in errors)
                {
                    if (e.Type != global::ErrorOr.ErrorType.Validation) continue;
                    if (!dict.TryGetValue(e.Code, out var existing))
                        dict[e.Code] = new[] \{ e.Description };
                    else
                    {
                        var arr = new string[existing.Length + 1];
                        existing.CopyTo(arr, 0);
                        arr[existing.Length] = e.Description;
                        dict[e.Code] = arr;
                    }
                }
                return global::Microsoft.AspNetCore.Http.TypedResults.ValidationProblem(dict);
            }
            var first = errors[0];
            var problem = new global::Microsoft.AspNetCore.Mvc.ProblemDetails
            {
                Title = first.Code,
                Detail = first.Description,
                Status = first.Type switch \{ global::ErrorOr.ErrorType.Validation => 400, global::ErrorOr.ErrorType.Unauthorized => 401, global::ErrorOr.ErrorType.Forbidden => 403, global::ErrorOr.ErrorType.NotFound => 404, global::ErrorOr.ErrorType.Conflict => 409, global::ErrorOr.ErrorType.Failure => 500, global::ErrorOr.ErrorType.Unexpected => 500, _ => (int)first.Type is >= 100 and <= 599 ? (int)first.Type : 500 }
            };
            problem.Type = $"https://httpstatuses.io/{problem.Status}";
            return problem.Status switch
            {
                400 => global::Microsoft.AspNetCore.Http.TypedResults.BadRequest(problem),
                401 => global::Microsoft.AspNetCore.Http.TypedResults.Unauthorized(),
                403 => global::Microsoft.AspNetCore.Http.TypedResults.Forbid(),
                404 => global::Microsoft.AspNetCore.Http.TypedResults.NotFound(problem),
                409 => global::Microsoft.AspNetCore.Http.TypedResults.Conflict(problem),
                422 => global::Microsoft.AspNetCore.Http.TypedResults.UnprocessableEntity(problem),
                500 => global::Microsoft.AspNetCore.Http.TypedResults.InternalServerError(problem),
                _ => global::Microsoft.AspNetCore.Http.TypedResults.Problem(detail: first.Description, statusCode: problem.Status ?? 500, title: first.Code, type: problem.Type)
            };
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\obj\GX\ErrorOrX.Generators\ErrorOr.Generators.ErrorOrEndpointGenerator\ErrorOrEndpointOptions.g.cs" label="ErrorOrEndpointOptions.g.cs" >
```csharp showLineNumbers 
// <auto-generated>
// This file was generated by ErrorOr.Generators source generator.
// </auto-generated>

#nullable enable

namespace ErrorOr.Generated
{
    /// <summary>
    /// Marker service to verify that AddErrorOrEndpoints() was called.
    /// </summary>
    /// <remarks>
    /// This follows the ASP.NET Core pattern used by RazorComponentsMarkerService
    /// to provide clear error messages when the service registration is missing.
    /// </remarks>
    internal sealed class ErrorOrEndpointsMarkerService \{ }

    /// <summary>
    /// Builder interface for configuring ErrorOr endpoints.
    /// </summary>
    /// <remarks>
    /// This pattern follows ASP.NET Core's IRazorComponentsBuilder design,
    /// enabling fluent extension method chaining without callback nesting.
    /// </remarks>
    public interface IErrorOrEndpointsBuilder
    {
        /// <summary>
        /// Gets the service collection being configured.
        /// </summary>
        global::Microsoft.Extensions.DependencyInjection.IServiceCollection Services \{ get; }
    }

    /// <summary>
    /// Default implementation of <see cref="IErrorOrEndpointsBuilder"/>.
    /// </summary>
    internal sealed class ErrorOrEndpointsBuilder : IErrorOrEndpointsBuilder
    {
        public ErrorOrEndpointsBuilder(global::Microsoft.Extensions.DependencyInjection.IServiceCollection services)
        {
            Services = services;
        }

        public global::Microsoft.Extensions.DependencyInjection.IServiceCollection Services \{ get; }
    }

    /// <summary>
    /// Extension methods for <see cref="IErrorOrEndpointsBuilder"/>.
    /// </summary>
    public static class ErrorOrEndpointsBuilderExtensions
    {
        /// <summary>
        /// Registers a JsonSerializerContext for AOT-compatible JSON serialization.
        /// </summary>
        /// <typeparam name="TContext">The JsonSerializerContext type.</typeparam>
        /// <param name="builder">The builder instance.</param>
        /// <returns>The builder instance for chaining.</returns>
        public static IErrorOrEndpointsBuilder UseJsonContext<TContext>(this IErrorOrEndpointsBuilder builder)
            where TContext : global::System.Text.Json.Serialization.JsonSerializerContext, new()
        {
            builder.Services.ConfigureHttpJsonOptions(options =>
            {
                options.SerializerOptions.TypeInfoResolverChain.Insert(0, new TContext());
            });
            return builder;
        }

        /// <summary>
        /// Uses camelCase for JSON property names.
        /// </summary>
        /// <param name="builder">The builder instance.</param>
        /// <param name="enabled">Whether to enable camelCase (default: true).</param>
        /// <returns>The builder instance for chaining.</returns>
        public static IErrorOrEndpointsBuilder WithCamelCase(this IErrorOrEndpointsBuilder builder, bool enabled = true)
        {
            if (enabled)
            {
                builder.Services.ConfigureHttpJsonOptions(options =>
                {
                    options.SerializerOptions.PropertyNamingPolicy = global::System.Text.Json.JsonNamingPolicy.CamelCase;
                });
            }
            return builder;
        }

        /// <summary>
        /// Ignores null values when serializing JSON.
        /// </summary>
        /// <param name="builder">The builder instance.</param>
        /// <param name="enabled">Whether to ignore nulls (default: true).</param>
        /// <returns>The builder instance for chaining.</returns>
        public static IErrorOrEndpointsBuilder WithIgnoreNulls(this IErrorOrEndpointsBuilder builder, bool enabled = true)
        {
            if (enabled)
            {
                builder.Services.ConfigureHttpJsonOptions(options =>
                {
                    options.SerializerOptions.DefaultIgnoreCondition = global::System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
                });
            }
            return builder;
        }
    }

    /// <summary>
    /// Composite convention builder that applies conventions to multiple endpoints.
    /// </summary>
    /// <remarks>
    /// This follows the ASP.NET Core pattern for applying global conventions
    /// to all endpoints registered by MapErrorOrEndpoints().
    /// </remarks>
    internal sealed class CompositeEndpointConventionBuilder : global::Microsoft.AspNetCore.Builder.IEndpointConventionBuilder
    {
        private readonly global::System.Collections.Generic.List<global::Microsoft.AspNetCore.Builder.IEndpointConventionBuilder> _builders;

        public CompositeEndpointConventionBuilder(global::System.Collections.Generic.List<global::Microsoft.AspNetCore.Builder.IEndpointConventionBuilder> builders)
        {
            _builders = builders;
        }

        public void Add(global::System.Action<global::Microsoft.AspNetCore.Builder.EndpointBuilder> convention)
        {
            foreach (var builder in _builders)
            {
                builder.Add(convention);
            }
        }

        public void Finally(global::System.Action<global::Microsoft.AspNetCore.Builder.EndpointBuilder> finallyConvention)
        {
            foreach (var builder in _builders)
            {
                builder.Finally(finallyConvention);
            }
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\obj\GX\ErrorOrX.Generators\ErrorOr.Generators.ErrorOrEndpointGenerator\ErrorOrEndpoints.GlobalUsings.g.cs" label="ErrorOrEndpoints.GlobalUsings.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
global using ErrorOr.Generated;
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ErrorOrX\src\DemoFuncAPI\obj\GX\ErrorOrX.Generators\ErrorOr.Generators.OpenApiTransformerGenerator\OpenApiTransformers.g.cs" label="OpenApiTransformers.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using System;
using System.Collections.Frozen;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi;

namespace ErrorOr.Generated;

/// <summary>
/// Document transformer for tag: PersonAPI
/// Generated from: [ErrorOrEndpoint] attribute on *PersonAPIEndpoints class
/// </summary>
file sealed class Tag_PersonAPI_Transformer : IOpenApiDocumentTransformer
{
    public Task TransformAsync(
        OpenApiDocument document,
        OpenApiDocumentTransformerContext context,
        CancellationToken cancellationToken)
    {
        document.Tags ??= new HashSet<OpenApiTag>();
        document.Tags.Add(new OpenApiTag \{ Name = "PersonAPI" });
        return Task.CompletedTask;
    }
}

/// <summary>
/// Operation transformer that applies XML documentation and parameter definitions to operations.
/// Each entry is a strict 1:1 mapping from handler signature to operation metadata.
/// </summary>
file sealed class XmlDocOperationTransformer : IOpenApiOperationTransformer
{
    // Pre-computed metadata from XML docs (compile-time extraction)
    private static readonly FrozenDictionary<string, (string? Summary, string? Description)> OperationDocs =
        new Dictionary<string, (string? Summary, string? Description)>
        {
        }.ToFrozenDictionary(StringComparer.Ordinal);

    // Pre-computed parameter descriptions from XML <param> tags
    private static readonly FrozenDictionary<string, FrozenDictionary<string, string>> ParameterDocs =
        new Dictionary<string, FrozenDictionary<string, string>>
        {
        }.ToFrozenDictionary(StringComparer.Ordinal);

    // Pre-computed parameter definitions from handler signatures
    private static readonly FrozenDictionary<string, (string Name, ParameterLocation Location, bool Required, JsonSchemaType SchemaType, string? SchemaFormat)[]> ParameterDefs =
        new Dictionary<string, (string, ParameterLocation, bool, JsonSchemaType, string?)[]>
        {
            ["DemoFuncAPI_PersonAPI_GetById"] = [("id", ParameterLocation.Path, true, JsonSchemaType.Integer, "int32")],
        }.ToFrozenDictionary(StringComparer.Ordinal);

    public Task TransformAsync(
        OpenApiOperation operation,
        OpenApiOperationTransformerContext context,
        CancellationToken cancellationToken)
    {
        string? operationId = null;
        var metadata = context.Description.ActionDescriptor?.EndpointMetadata;
        if (metadata is not null)
        {
            for (var i = 0; i < metadata.Count; i++)
            {
                if (metadata[i] is IEndpointNameMetadata nameMetadata)
                {
                    operationId = nameMetadata.EndpointName;
                    break;
                }
            }
        }

        if (operationId is null)
            return Task.CompletedTask;

        // Apply summary and description
        if (OperationDocs.TryGetValue(operationId, out var docs))
        {
            if (docs.Summary is not null)
                operation.Summary ??= docs.Summary;
            if (docs.Description is not null)
                operation.Description ??= docs.Description;
        }

        // Add parameter definitions from handler signatures
        if (ParameterDefs.TryGetValue(operationId, out var paramDefs))
        {
            operation.Parameters ??= [];
            foreach (var (pName, pLocation, pRequired, pSchemaType, pSchemaFormat) in paramDefs)
            {
                var schema = new OpenApiSchema \{ Type = pSchemaType };
                if (pSchemaFormat is not null) schema.Format = pSchemaFormat;
                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = pName,
                    In = pLocation,
                    Required = pRequired,
                    Schema = schema
                });
            }
        }

        // Apply parameter descriptions
        if (ParameterDocs.TryGetValue(operationId, out var paramDocs) && operation.Parameters is not null)
        {
            foreach (var param in operation.Parameters)
            {
                if (param.Name is not null && paramDocs.TryGetValue(param.Name, out var paramDesc))
                {
                    param.Description ??= paramDesc;
                }
            }
        }

        return Task.CompletedTask;
    }
}

/// <summary>
/// Schema transformer that applies type XML documentation to schemas.
/// Each entry is a strict 1:1 mapping from XML doc to schema description.
/// AOT-safe: Uses Type as dictionary key (no runtime reflection).
/// </summary>
file sealed class XmlDocSchemaTransformer : IOpenApiSchemaTransformer
{
    // Pre-computed type descriptions from XML docs (AOT-safe: Type keys resolved at compile-time)
    private static readonly FrozenDictionary<Type, string> TypeDescriptions =
        new Dictionary<Type, string>
        {
            [typeof(global::ErrorOr.ErrorOrEndpointAttribute)] = "Marks a static method as an ErrorOr endpoint with explicit HTTP method and route.     Prefer using [Get], [Post], [Put], [Delete], or [Patch] for standard HTTP methods.",
            [typeof(global::ErrorOr.RouteGroupAttribute)] = "Marks a class as a route group for versioned API endpoints.     All endpoints in the class will be mapped under the specified path prefix     using the eShop-style NewVersionedApi() pattern when combined with [ApiVersion].",
        }.ToFrozenDictionary();

    public Task TransformAsync(
        OpenApiSchema schema,
        OpenApiSchemaTransformerContext context,
        CancellationToken cancellationToken)
    {
        var type = context.JsonTypeInfo.Type;
        // For generic types, lookup the generic type definition
        var lookupType = type.IsGenericType ? type.GetGenericTypeDefinition() : type;
        if (TypeDescriptions.TryGetValue(lookupType, out var description))
        {
            schema.Description ??= description;
        }
        return Task.CompletedTask;
    }
}

/// <summary>
/// Extension methods for registering generated OpenAPI transformers.
/// </summary>
public static class GeneratedOpenApiExtensions
{
    /// <summary>
    /// Adds OpenAPI with generated transformers for ErrorOr endpoints.
    /// Each transformer is registered following the strict 1:1 mapping rule.
    /// </summary>
    public static IServiceCollection AddErrorOrOpenApi(
        this IServiceCollection services,
        string documentName = "v1")
    {
        services.AddOpenApi(documentName, options =>
        {
            // Tag: PersonAPI
            options.AddDocumentTransformer(new Tag_PersonAPI_Transformer());

            // XML doc summaries → operation metadata
            options.AddOperationTransformer(new XmlDocOperationTransformer());

            // XML doc summaries → schema descriptions
            options.AddSchemaTransformer(new XmlDocSchemaTransformer());
        });

        return services;
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project ErrorOrX ](/sources/ErrorOrX.zip)

:::


### Share ErrorOrX 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FErrorOrX&quote=ErrorOrX" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FErrorOrX&text=ErrorOrX:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FErrorOrX" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FErrorOrX&title=ErrorOrX" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FErrorOrX&title=ErrorOrX&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FErrorOrX" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ErrorOrX

<SameCategory />

