using Microsoft.Extensions.Logging;

public partial class LoggingSample
{
    private readonly ILogger _logger;

    public LoggingSample(ILogger logger)
    {
        _logger = logger;
    }
    //Gnerator:LoggerMessage.g.cs 
    [LoggerMessage(
        EventId = 20,
        Level = LogLevel.Critical,
        Message = "Value is {value:E}")]
    public static partial void UsingFormatSpecifier(
        ILogger logger, double value);

    [LoggerMessage(
        EventId = 9,
        Level = LogLevel.Trace,
        Message = "Fixed message",
        EventName = "CustomEventName")]
    public partial void LogWithCustomEventName();

    [LoggerMessage(
        EventId = 10,
        Message = "Welcome to {city} {province}!")]
    public partial void LogWithDynamicLogLevel(
        string city, LogLevel level, string province);

    public void  TestLogging()
    {
        LogWithCustomEventName();

        LogWithDynamicLogLevel("Vancouver", LogLevel.Warning, "BC");
        LogWithDynamicLogLevel("Vancouver", LogLevel.Information, "BC");

        UsingFormatSpecifier(_logger, 12345.6789);
    }
}