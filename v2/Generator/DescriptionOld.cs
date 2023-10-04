
namespace Generator;

public class DescriptionOld
{
    public int Nr;

    [JsonPropertyName("generator")]
    public Generator? Generator { get; set; }

    [JsonPropertyName("data")]
    public DataOld? Data { get; set; }

    [JsonPropertyName("links")]
    public Links? Links { get; set; }
    [JsonIgnore]
    public string? rootFolder;
    [JsonIgnore]
    public bool HaveAuthorAnswered;
    [JsonIgnore]
    public string? authorMD;

    internal string FindIIncremental()
    {
        //from https://github.com/mrtaikandi/MapTo
        //https://github.com/search?q=repo%3Amrtaikandi%2FMapTo%20IIncremental&type=code
        var split = Generator!.Source!.Split("/", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var repo = split[split.Length - 1];
        var author = split[split.Length - 2];
        if (author == "ignatandrei") return "";
        var url = $"https://github.com/search?q=repo%3A{author}%2F{repo}%20IIncremental&type=code";
        return url;

    }
}
