
namespace Generator;
public class CSharp
{
    public string FileCsproj;
    public string[] OutputFiles;
}

public class Generator
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("nuget")]
    public string[] Nuget { get; set; }

    [JsonPropertyName("link")]
    public string Link { get; set; }

    [JsonPropertyName("author")]
    public string Author { get; set; }

    [JsonPropertyName("source")]
    public string Source { get; set; }

    public string MarkDownNugetDownloads
    {
        get
        {
            var ret = "";
            if ((Nuget?.Length ?? 0) == 0)
                return ret;
            foreach(var item in Nuget)
            {
                var l = "https://www.nuget.org/packages/".Length;
                var name = item.Substring(l);
                if (name.EndsWith("/"))
                    name = name.Substring(0, name.Length - 1);
                ret+= $"[![Nuget](https://img.shields.io/nuget/dt/{name}?label={name})]({item})";
            }
            return ret;
        }
    }
    public string MarkdownLastCommit
    {
        get
        {
            var strShields = "https://img.shields.io";
            var data = Source.Split("/",StringSplitOptions.RemoveEmptyEntries);
            var site = data[1].Replace(".com", "");
            var user = data[2];
            var repo = data[3];
            return $"[![GitHub last commit]({strShields}/{site}/last-commit/{user}/{repo}?label=updated)]({Source})";
        }
    }
    public string MarkDownStars
    {
        get
        {
            var strShields = "https://img.shields.io";
            var data = Source.Split("/", StringSplitOptions.RemoveEmptyEntries);
            var site = data[1].Replace(".com", "");
            var user = data[2];
            var repo = data[3];
            return $"![GitHub Repo stars]({strShields}/{site}/stars/{user}/{repo}?style=social)";
        }
    }
}
