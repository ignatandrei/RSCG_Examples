using InjectDemo;
using Microsoft.Extensions.DependencyInjection;
var sc=new ServiceCollection();
sc.AddMyServices();
var sp=sc.BuildServiceProvider();
var con = sp.GetService(typeof(Database)) as IDatabase;
ArgumentNullException.ThrowIfNull(con);
con.Open();



public static partial class MyServiceProvider
{
    [ServiceScan.SourceGenerator.GenerateServiceRegistrations(AssignableTo = typeof(Database),AsSelf =true, Lifetime = ServiceLifetime.Scoped)]

    [ServiceScan.SourceGenerator.GenerateServiceRegistrations(AssignableTo = typeof(IDatabase), Lifetime = ServiceLifetime.Scoped)]
    public static partial IServiceCollection AddMyServices(this IServiceCollection services)
    ;
}