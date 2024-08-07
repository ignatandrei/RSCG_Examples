﻿Console.WriteLine("Hello, World!");
var services = new ServiceCollection();
services.AddMediator();
services.AddSingleton(typeof(IPipelineBehavior<,>), typeof(GenericLoggerHandler<,>)); // This will run 1st

var serviceProvider = services.BuildServiceProvider();

var mediator = serviceProvider.GetRequiredService<IMediator>();
var id = Guid.NewGuid();
var request = new Ping(id);

var response = await mediator.Send(request);

Console.WriteLine("-----------------------------------");
Console.WriteLine("ID: " + id);
Console.WriteLine(request);
Console.WriteLine(response);

