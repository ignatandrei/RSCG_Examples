
namespace CP_Console;

class DataFromHttp : IDataValue
{
    public string Name { get { return "DataFromHttp"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        var http=new HttpClient();
        var result = await http.GetStringAsync("https://www."+ Guid.NewGuid().ToString()+".com/" + key);
        return result;
    }
}


class DataFromMemory : IDataValue
{
    public string Name { get { return "DataFromMemory"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        await Task.Delay(1000);
        return $"this is value for {key} from memory";
    }
}