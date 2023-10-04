using System;
using System.Net;
using System.Net.Http;
using System.Net.NetworkInformation;

namespace Generator;
public record NoExample(string name, string why)
{
    private string? _nameRSCG = null;
    public string NameRSCG
    {
        get
        {
            _nameRSCG ??= name.Split(" ", StringSplitOptions.RemoveEmptyEntries).First().Trim();
            return _nameRSCG;
        }
    }
    private string? _site = null;
    public string SiteRSCG
    {
        get
        {
            _site ??= name.Split(" ", StringSplitOptions.RemoveEmptyEntries).Last().Trim();
            return _site;
        }
    }
    public string FindIIncremental()
    {
        //from https://github.com/mrtaikandi/MapTo
        //https://github.com/search?q=repo%3Amrtaikandi%2FMapTo%20IIncremental&type=code
        var split = SiteRSCG.Split("/",StringSplitOptions.RemoveEmptyEntries|StringSplitOptions.TrimEntries);
        var repo = split[split.Length - 1];
        var author= split[split.Length - 2];
        var url = $"https://github.com/search?q=repo%3A{author}%2F{repo}%20IIncremental&type=code";
        return url;
    }
}