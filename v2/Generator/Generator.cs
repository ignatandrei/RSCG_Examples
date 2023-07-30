
namespace Generator;

public class Generator
{
    [JsonIgnore]
    public string NameForBookmark
    {
        get 
        {
            ArgumentNullException.ThrowIfNull(Name);
            var bookmark = Name.ToLower();
            bookmark = bookmark.Replace(" + ", "--");
            bookmark = bookmark.Replace(" ", "-");
            return bookmark;
        }
    }
    public string NugetFirst
    {
        get
        {
            ArgumentNullException.ThrowIfNull(Nuget);
            if(Nuget.Length == 0)
                throw new ArgumentOutOfRangeException(nameof(Nuget));
            return Nuget[0];
        }
    }
    public string NameNugetFirst()
    {
        return this.NamePackage(this.NugetFirst);
    }
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("nuget")]
    public string[]? Nuget { get; set; }

    [JsonPropertyName("link")]
    public string? Link { get; set; }

    [JsonPropertyName("author")]
    public string? Author { get; set; }

    [JsonPropertyName("source")]
    public string? Source { get; set; }
    public string NamePackage(string item)
    {
        var l = "https://www.nuget.org/packages/".Length;
        var name = item.Substring(l);
        if (name.EndsWith("/"))
            name = name.Substring(0, name.Length - 1);

        return name;
    }
    public string MarkDownNugetDownloads
    {
        get
        {
            var ret = "";
            if ((Nuget?.Length ?? 0) == 0)
                return ret;
            ArgumentNullException.ThrowIfNull(Nuget);
            foreach (var item in Nuget)
            {
                if (string.IsNullOrWhiteSpace(item))
                    continue;
                var name = this.NamePackage(item);
                //var l = "https://www.nuget.org/packages/".Length;
                //var name = item.Substring(l);
                //if (name.EndsWith("/"))
                //    name = name.Substring(0, name.Length - 1);
                ret+= $"[![Nuget](https://img.shields.io/nuget/dt/{name}?label={name})]({item})";
            }
            return ret;
        }
    }
    public string MarkdownLastCommit
    {
        get
        {
            if ((Source?.Length ?? 0) == 0)
                return "";
            ArgumentNullException.ThrowIfNull(Source);
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
            if ((Source?.Length ?? 0) == 0)
                return "";
            ArgumentNullException.ThrowIfNull(Source);
            var strShields = "https://img.shields.io";
            var data = Source.Split("/", StringSplitOptions.RemoveEmptyEntries);
            var site = data[1].Replace(".com", "");
            var user = data[2];
            var repo = data[3];
            return $"![GitHub Repo stars]({strShields}/{site}/stars/{user}/{repo}?style=social)";
        }
    }
}
