using Tortuga.Shipwright;

namespace MixinConsoleDemo;
internal class Person
{
    [Expose]
    public string Name { get; set; } = string.Empty;
    [Expose] 
    public int Age { get; set; }
    
}
