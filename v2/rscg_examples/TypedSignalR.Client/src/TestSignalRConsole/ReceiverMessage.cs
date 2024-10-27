using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestSignalRCommon;

namespace TestSignalRConsole;
internal class ReceiverMessage : IHubMessage
{
    public async Task SendMessage(string user, string message)
    {
        await Task.Yield();
        Console.WriteLine($" from strong typing {user}: {message}");
    }
}
