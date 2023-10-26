# MinimalApiBuilder

[![nuget](https://badgen.net/nuget/v/MinimalApiBuilder)](https://www.nuget.org/packages/MinimalApiBuilder)

Reflectionless, source-generated, thin abstraction layer over
the [ASP.NET Core Minimal APIs](https://learn.microsoft.com/en-gb/aspnet/core/fundamentals/minimal-apis/overview)
interface.

## How to Use

Based on the Vertical Slice Architecture with `Feature` folder.
There is one class for every API endpoint. A basic example looks like the following:

```csharp
using Microsoft.AspNetCore.Mvc;
using MinimalApiBuilder;

public partial class BasicEndpoint : MinimalApiBuilderEndpoint
{
    private static string Handle([FromServices] BasicEndpoint endpoint)
    {
        return "Hello, World!";
    }
}
```

The endpoint class must be `partial`, inherit from `MinimalApiBuilderEndpoint`,
and have a `Handle` or `HandleAsync` method with the containing type passed
from dependency injection.
The endpoint is mapped through the typical `IEndpointRouteBuilder` `Map<Verb>` extension methods:

```csharp
app.MapGet<BasicEndpoint>("/hello");
```

The above is functionally equivalent to:

```csharp
app.MapGet("/hello", static () => "Hello, World!");
```

This library depends on [`FluentValidation >= 11`](https://github.com/FluentValidation/FluentValidation). An endpoint can have a validated request object:

```csharp
public struct BasicRequest
{
    public required string Name { get; init; }
}

public partial class BasicRequestEndpoint : MinimalApiBuilderEndpoint
{
    private static string Handle([FromServices] BasicRequestEndpoint endpoint,
        [AsParameters] BasicRequest request)
    {
        return $"Hello, {request.Name}!";
    }
}

public class BasicRequestValidator : AbstractValidator<BasicRequest>
{
    public BasicRequestValidator()
    {
        RuleFor(static request => request.Name).MinimumLength(2);
    }
}
```

```csharp
app.MapGet<BasicRequestEndpoint>("/hello/{name}");
```

The incremental generator will generate code to validate the request object before the handler is called and return a `400 Bad Request` response if the validation fails.
In `Program.cs` the below

```csharp
builder.Services.AddMinimalApiBuilderEndpoints();
```

needs to be added to register the necessary types with dependency injection.
