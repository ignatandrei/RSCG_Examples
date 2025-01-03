﻿public sealed record Ping(Guid Id) : IRequest<Pong>;

public sealed record Pong(Guid Id);


public sealed class PingHandler : IPipelineAction<Ping, Pong>
{

    public Pong Invoke(Ping request, ref PipelineContext<Pong> context, Next<Pong> next)
    {
        Console.WriteLine("4) Returning pong!");
        return new Pong(request.Id);
    }
}
