using BunnyTail.ServiceRegistration;
using Microsoft.Extensions.DependencyInjection;

internal static partial class ServiceCollectionExtensions
{
    [ServiceRegistration(Lifetime.Scoped, "Database")]
    public static partial IServiceCollection AddDatabaseServices(this IServiceCollection services);
}