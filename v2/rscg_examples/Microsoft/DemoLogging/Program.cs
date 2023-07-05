using System.Text.Json;
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory = LoggerFactory.Create(
    builder =>
    //https://learn.microsoft.com/en-us/dotnet/core/extensions/console-log-formatter
    builder.AddSimpleConsole()
    //builder.AddJsonConsole(
    //    options =>
    //    options.JsonWriterOptions = new JsonWriterOptions()
    //    {
    //        Indented = true
    //    })
    ) ;

ILogger<SampleObject> logger = loggerFactory.CreateLogger<SampleObject>();
logger.LogInformation("test");
//https://learn.microsoft.com/en-us/dotnet/core/extensions/logger-message-generator
(new LoggingSample(logger)).TestLogging();
file readonly record struct SampleObject { }
