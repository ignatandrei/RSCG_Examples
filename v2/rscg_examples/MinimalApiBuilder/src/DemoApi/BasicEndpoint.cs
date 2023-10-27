using Microsoft.AspNetCore.Mvc;
using MinimalApiBuilder;

public partial class BasicEndpoint : MinimalApiBuilderEndpoint
{
    private static string Handle([FromServices] BasicEndpoint endpoint)
    {
        return "Hello, World!";
    }
}
