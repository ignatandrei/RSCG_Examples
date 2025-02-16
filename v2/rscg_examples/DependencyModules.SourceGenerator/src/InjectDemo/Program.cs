using DependencyModules.Runtime;
using InjectDemo;
using Microsoft.Extensions.DependencyInjection;


var serviceCollection = new ServiceCollection();

serviceCollection.AddModule<MyModule>();

var provider = serviceCollection.BuildServiceProvider();

var service = provider.GetService<Database>();

if(service == null)
    throw new Exception("Service not found");
else
    service.Open();