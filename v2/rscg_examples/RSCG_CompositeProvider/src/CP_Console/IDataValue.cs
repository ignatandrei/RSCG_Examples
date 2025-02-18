using RSCG_CompositeProvider_Common;

namespace CP_Console;
[CompositeProvider]
public interface IDataValue
{
    public string Name { get; set; }
    public Task<string> KeyFromValue(string key, bool defaultValue);

    
}
