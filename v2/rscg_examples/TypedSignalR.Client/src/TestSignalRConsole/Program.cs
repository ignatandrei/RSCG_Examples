// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.SignalR.Client;

Console.WriteLine("Hello, World!");
await Task.Delay(5_000);
HubConnection _connection = new HubConnectionBuilder()
    .WithUrl("https://localhost:7302/ChatHub")
    .Build();
await _connection.StartAsync();

_connection.On<string, string>("ReceiveMessage", (user, message) =>
{
    Console.WriteLine($"{user}: {message}");
});
while (true)
{
    await Task.Delay(1_000);
    Console.WriteLine("what message do you want to send?");
    var message = Console.ReadLine();
    await _connection.InvokeAsync("SendMessage", "Console", message);
}