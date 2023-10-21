using Injectio.Attributes;

namespace InjectioDemo;

[RegisterSingleton]
internal class DatabaseCon
{
    public string? Connection { get; set; }
}

