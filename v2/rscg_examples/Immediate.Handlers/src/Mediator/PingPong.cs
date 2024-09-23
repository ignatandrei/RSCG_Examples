using Immediate.Handlers.Shared;

public sealed record Ping(Guid Id);// : IRequest<Pong>;

public sealed record Pong(Guid Id);


[Handler]
[Behaviors(
    typeof(LoggingBehavior<,>)
)]
public static partial class PingHandler //: IPipelineAction<Ping, Pong>
{

    private static async ValueTask<Pong> HandleAsync(Ping request, CancellationToken token)
    {
        await Task.Delay(1000);
        Console.WriteLine("Returning pong!");
        return new Pong(request.Id);
    }
}
