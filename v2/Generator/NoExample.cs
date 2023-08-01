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
}