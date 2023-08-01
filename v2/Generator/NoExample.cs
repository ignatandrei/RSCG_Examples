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
            if (_nameRSCG == null)
            {


                _nameRSCG = name.Split(" ", StringSplitOptions.RemoveEmptyEntries).First().Trim();

            }
            return _nameRSCG;
        }
    }
    public string SiteRSCG
    {
        get
        {
            return name.Split(" ", StringSplitOptions.RemoveEmptyEntries).Last().Trim();
        }
    }
}