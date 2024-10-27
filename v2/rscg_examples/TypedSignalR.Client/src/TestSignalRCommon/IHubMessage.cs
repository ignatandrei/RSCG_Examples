namespace TestSignalRCommon;
public interface IHubMessage
{
    Task SendMessage(string user, string message);
}