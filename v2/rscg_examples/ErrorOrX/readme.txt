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
public static ErrorOr<User> CreateAdmin(CreateUserRequest req) { }

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
