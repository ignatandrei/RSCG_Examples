using TeCLI;
using Microsoft.Extensions.DependencyInjection;

Console.WriteLine("Hello, World!");
// execute with makesum sum 10 20

//Do not know how to work those
// --help
// --msg Andrei
// echo --msg Andrei
// sum 10 20

IServiceCollection services = new ServiceCollection();
services.AddCommandDispatcher();

var sp = services.BuildServiceProvider();

var dispatcher = sp.GetRequiredService<CommandDispatcher>();
await dispatcher.DispatchAsync(args);
