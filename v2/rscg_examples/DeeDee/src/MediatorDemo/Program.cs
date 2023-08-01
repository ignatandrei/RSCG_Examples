Console.WriteLine("Hello, World!");
ServiceCollection services = new ();
MediatorDemo.DeeDee.Generated.IocExtensions.AddDispatcher(services);

services.AddSingleton(typeof(IPipelineAction<Ping, Pong>), typeof(GenericLoggerHandler)); // This will run 1st

var serviceProvider = services.BuildServiceProvider();

var mediator = serviceProvider.GetRequiredService<MediatorDemo.DeeDee.Generated.Models.IDispatcher>();
var id = Guid.NewGuid();
var request = new Ping(id);

var response = mediator.Send(request);

Console.WriteLine("-----------------------------------");
Console.WriteLine("ID: " + id);
Console.WriteLine(request);
Console.WriteLine(response);

