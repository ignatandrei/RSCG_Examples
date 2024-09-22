
public sealed class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>>? logger)
    : Behavior<TRequest, TResponse>
{
    public override async ValueTask<TResponse> HandleAsync(TRequest request, CancellationToken cancellationToken)
    {
        Console.WriteLine("I am a logging behaviour");
        logger?.LogInformation("LoggingBehavior.Enter");
        var response = await Next(request, cancellationToken);
        logger?.LogInformation("LoggingBehavior.Exit");
        return response;
    }
}