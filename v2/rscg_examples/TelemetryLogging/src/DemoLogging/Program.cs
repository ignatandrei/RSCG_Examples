using System.Text.Json;
using Microsoft.Extensions.Logging;

using ILoggerFactory loggerFactory = LoggerFactory.Create(
    builder =>
    {
        //builder.AddSimpleConsole();
        builder.AddJsonConsole(
            options =>
            options.JsonWriterOptions = new JsonWriterOptions()
            {
                Indented = true
            });
    }
        
    ) ;

ILogger<Person> logger = loggerFactory.CreateLogger<Person>();
logger.LogInformation("test");
(new LoggingSample(logger)).TestLogging();
public record Person (string firstName, string LastName)
{
}
