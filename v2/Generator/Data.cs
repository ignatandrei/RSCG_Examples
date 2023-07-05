

namespace Generator;
public class Data
{
    [JsonPropertyName("goodFor")]
    public string[]? GoodFor { get; set; }

    [JsonPropertyName("csprojDemo")]
    public string? CSProj{ get; set; }

    [JsonPropertyName("csFiles")]
    public string[]? CsFiles { get; set; }

    [JsonIgnore]
    public OutputFiles outputFiles { get; set; } = new();
    public string GeneratedCode()
    {
        //todo : read after compiling CSProj
        return "";
    }
}
