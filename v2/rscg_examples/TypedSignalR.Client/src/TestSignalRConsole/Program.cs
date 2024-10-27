// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.SignalR.Client;
using TestSignalRCommon;
using TestSignalRConsole;

Console.WriteLine("Hello, World!");
await Task.Delay(5_000);
HubConnection _connection = new HubConnectionBuilder()
    .WithUrl("https://localhost:7302/ChatHub")
    .Build();
await _connection.StartAsync();

_connection.On<string, string>("ReceiveMessage", (user, message) =>
{
    Console.WriteLine($" from not typed {user}: {message}");
});

await Task.Delay(30_000);
var h = TypedSignalR.Client.HubConnectionExtensions.CreateHubProxy<IHubMessage>(_connection);
await h.SendMessage("console", "message");
//TypedSignalR.Client.HubConnectionExtensions.Register<IHubMessage>(_connection,new ReceiverMessage());

Console.WriteLine("waiting for messages from Windows App");
var message = Console.ReadLine();


