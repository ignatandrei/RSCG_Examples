using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Protocol;
using SignalRSwaggerGen.Attributes;
using TestSignalRCommon;

namespace TestSignalRHub.ApiService.Hubs;
[SignalRHub]
public class ChatHub : Hub, IHubMessage
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

}