
Console.WriteLine("Hello, World!");
ServiceCollection services = new ();
services.AddSingleton<ILoggerFactory, NullLoggerFactory>();
services.AddSingleton(typeof(ILogger<>), typeof(NullLogger<>));
services.AddHandlers();
services.AddBehaviors();
IHandler<Ping, Pong> handler = services.BuildServiceProvider().GetRequiredService<IHandler<Ping, Pong>>();
var id = Guid.NewGuid();
var request = new Ping(id);
var pong = await handler.HandleAsync(request, CancellationToken.None);
Console.WriteLine($"Got pong with id {pong.Id}!");
