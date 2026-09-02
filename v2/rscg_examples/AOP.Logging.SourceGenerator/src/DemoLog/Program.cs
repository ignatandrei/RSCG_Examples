using AOP.Logging.Core.Configuration;
using AOP.Logging.Core.Logging;
using DemoLog;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

#region this is usually done by DI
using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
var logger = factory.CreateLogger<DefaultMethodLogger>();
IOptions<AopLoggingOptions> options = Options.Create(new AopLoggingOptions());
DefaultMethodLogger defaultMethodLogger = new(logger,options);
#endregion

Person p = new();
p.SetMethodLogger(defaultMethodLogger);
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine (p.Name());
Console.WriteLine (await p.WithMiddleNameLogged("G"));