using InjectDemo;
using Microsoft.Extensions.DependencyInjection;


var serviceCollection = new ServiceCollection();

serviceCollection.AddDatabaseServices();

var provider = serviceCollection.BuildServiceProvider();

var service = provider.GetService<Database>();

if(service == null)
    throw new Exception("Service not found");
else
    service.Open();