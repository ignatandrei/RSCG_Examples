﻿
namespace Generator;

public class Description
{
    public int Nr;

    [JsonPropertyName("generator")]
    public Generator Generator { get; set; }

    [JsonPropertyName("data")]
    public Data Data { get; set; }

    [JsonPropertyName("links")]
    public Links Links { get; set; }
    [JsonIgnore]
    public string rootFolder;
    [JsonIgnore]
    public bool HaveAuthorAnswered;
    [JsonIgnore]
    public string authorMD;
}