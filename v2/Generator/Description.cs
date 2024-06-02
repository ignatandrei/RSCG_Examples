
namespace Generator;

public class Description
{
    public int Nr;
    public int ReverseNr;
    [JsonPropertyName("generator")]
    public Generator? Generator { get; set; } 

    [JsonPropertyName("data")]
    public Data? Data { get; set; }

    [JsonPropertyName("links")]
    public Links? Links { get; set; }
    [JsonIgnore]
    public DateTime generatedDate { get; internal set; }
    public string? GeneratorKey { get; internal set; }
    public GeneratorDataRec? GeneratorData { get; internal set; }

    [JsonIgnore]
    public string? rootFolder;
    [JsonIgnore]
    public bool HaveAuthorAnswered;
    [JsonIgnore]
    public string? authorMD;

    [JsonIgnore]
    public string? DescriptionNuget;
    [JsonIgnore]
    public string? OriginalReadme;
}
