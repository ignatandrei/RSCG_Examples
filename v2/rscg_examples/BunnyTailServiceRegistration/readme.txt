# BunnyTail.ServiceRegistrationGenerator

| Package | Info |
|:-|:-|
| BunnyTail.ServiceRegistration | [![NuGet](https://img.shields.io/nuget/v/BunnyTail.ServiceRegistration.svg)](https://www.nuget.org/packages/BunnyTail.ServiceRegistration) |

## What is this?

Service registory method generator.

## Usage

```csharp
using BunnyTail.ServiceRegistration;

using Microsoft.Extensions.DependencyInjection;

internal static class Program
{
    public static void Main()
    {
        using var provider = new ServiceCollection()
            .AddServices()
            .BuildServiceProvider();

        var service = provider.GetRequiredService<TestService>();
    }
}

internal static partial class ServiceCollectionExtensions
{
    [ServiceRegistration(Lifetime.Singleton, "Service$")]
    public static partial IServiceCollection AddServices(this IServiceCollection services);
}

internal sealed class TestService
{
}
```
