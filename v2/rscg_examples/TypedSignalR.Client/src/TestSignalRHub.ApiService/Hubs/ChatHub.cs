using Microsoft.AspNetCore.SignalR;
using SignalRSwaggerGen.Attributes;

namespace TestSignalRHub.ApiService.Hubs;
[SignalRHub]
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}