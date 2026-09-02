
using AOP.Logging.Core.Attributes;
using Microsoft.Extensions.Logging;

namespace DemoLog;

[LogClass]
internal partial class Person
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty; 
    [LogMethod(LogLevel.Warning)]
    public string NameCore() => $"{FirstName} {LastName}";

    [LogMethod(LogLevel.Warning)]
    private async Task<string> WithMiddleName(string middleName)
    {
        await Task.Delay(50);
        return $"{FirstName} {middleName} {LastName}";
    }
}
