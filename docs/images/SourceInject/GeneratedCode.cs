// <auto-generated />
using Microsoft.Extensions.DependencyInjection;

public static class GeneratedServicesExtension
{
    public static void DiscoverInAutoRegisterBL(this IServiceCollection services) => services.Discover();
    internal static void Discover(this IServiceCollection services)
    {
        services.AddTransient<AutoRegisterBL.Repo>();

    }
}

public static class AutoRegisterBLDiscoverer
{
    public static void Discover(IServiceCollection services) => services.Discover();
}